#include "mainwindow.h"
#include "ui_mainwindow.h"
#include "maininterface.h"
#include "pinui.h"
#include "reader.h"
#include <QDebug>

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    logout = new MainInterface(this);

    //connect(lähettäjänosoite, lähettäjänsignaalifunktionosoite,
    //        vastaanottajanosoite, vastaanottajansignaaliFunktiosoite
    connect(ui->card, &QPushButton::clicked,        // Card button connection
            this, &MainWindow::handleCardButton);
    connect(ui->pin, &QPushButton::clicked,         // Pin button connection
            this, &MainWindow::handlePinButton);



}

MainWindow::~MainWindow()
{
    delete ui;
    delete reader;
}



void MainWindow::handleCardButton()
{
    reader = new Reader(this);
    connect(reader,&Reader::sendCardNum,
            this,&MainWindow::handleCardNum);
    //sitte kun RFID muuta osoite (?)

    qDebug() <<"Card Button is pressed";
    reader->open();
    qDebug()<<"aukesiko reader";
}

void MainWindow::handlePinButton()
{
    pinui = new PinUi(this);        // HOX! Muista alustaa pointteri :)
    connect(pinui,&PinUi::sendPinNum,
            this,&MainWindow::handlePinNum);
    connect(pinui,&PinUi::PinuiTimeOut,
            this, &MainWindow::handlePinuiTimeOut);

    qDebug() <<"Pin Button is pressed";
    pinui->open();
    qDebug()<<"aukesiko pinui"; //tehään kaikesta DYNAAMINEN (alustus -> destruktori -> CONNECT MUISTA CONNECT (?)
}

void MainWindow::handleCardNum(QString s)
{
    qDebug()<<"Vastaanotettiin kortin numero";
    ui->cardNum->setText(s);
    reader->close();
    delete reader;
}

void MainWindow::handlePinNum(QString s)
{
    qDebug()<<"Vastaanotettiin pin numero";
    ui->pinNum->setText(s);
    void setEchoMode(QLineEdit::EchoMode);
    ui->pinNum->setEchoMode(QLineEdit::PasswordEchoOnEdit); // Hashing tapahtuu tässä
    pinui->close();
    delete pinui;
}

void MainWindow::handlePinuiTimeOut()
{
    qDebug()<<"Vastaanotettiin pinUI TIMEOUT ";
    pinui->close();
    delete pinui;
}

void MainWindow::on_btnLogin_clicked()
{
    qDebug()<<"Login clicked";

    QJsonObject jsonObj;
    jsonObj.insert("rfid_code", ui->cardNum->text());
    jsonObj.insert("pin_code",ui->pinNum->text());

    QString site_url="http://localhost:3000/login";
    QNetworkRequest request(site_url);
    request.setHeader(QNetworkRequest::ContentTypeHeader, "application/json");

    manager = new QNetworkAccessManager(this);
    connect(manager, &QNetworkAccessManager::finished,
            this, &MainWindow::loginSlot);

    reply = manager->post(request, QJsonDocument(jsonObj).toJson());
}

void MainWindow::loginSlot(QNetworkReply *reply)
{
    response_data = reply->readAll();
    qDebug() << response_data;

    ui->attemptsLeft->setText(QString::number(remainingAttempts));

    if(response_data.length()<2 || response_data == "db_error"){
        qDebug()<<"Virhe yhteydessä, Connection Error.";
        handleLoginError("Connection error.");
        return;
    }
    if(response_data == "false"){
        remainingAttempts--;
        updateAttemptsDisplay();

        if(remainingAttempts <= 0){
            ui->btnLogin->setEnabled(false);
            handleLoginError("Login denied");
        }
        else {
            handleLoginError("Login failed. RFID or PIN incorrect.");
        }
        return;
    }
    // Login onnistuu
    QByteArray token = "Bearer " + response_data;
    qDebug() << "Token received from login:" << token;

    MainInterface *objMainInterface = new MainInterface(this);
    objMainInterface->setCardNum(ui->cardNum->text());
    objMainInterface->setWebToken(token);
    objMainInterface->open(); // Should i use show, open or exec (?)
    // this->hide();

    ui->cardNum->clear();
    ui->pinNum->clear();
    ui->attemptsLeft->clear();

    reply->deleteLater();
    manager->deleteLater();
}

void MainWindow::handleLoginError(const QString &message)
{
    qDebug() << message;
    objMessageBox.setText(message);
    objMessageBox.exec();

}

void MainWindow::updateAttemptsDisplay()
{
    ui->attemptsLeft->setText(QString::number(remainingAttempts));
}
