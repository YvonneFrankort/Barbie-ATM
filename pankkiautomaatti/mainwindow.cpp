#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QDebug>

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    //connect(lähettäjänosoite, lähettäjänsignaalifunktionosoite,
    // vastaanottajanosoite, vastaanottajansignaaliFunktiosoite
    connect(ui->card, &QPushButton::clicked,
            this, &MainWindow::handleCardButton);

    connect(ui->pin, &QPushButton::clicked,
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
    //sitte kun RFID muuta osoite

    qDebug() <<"Card Button is pressed";
    //show() mahdollistaa ohjelman suorittamisen muilla funktioilla
    reader->open(); //ohjelma jatkaa suorittamista
    //reader-> exec mahdollistaa pysäyttää ohjelmien suorittamisen siihen asti kunnes on jotain tehty
    qDebug()<<"aukesiko reader";


}

void MainWindow::handlePinButton()
{
    pinui = new PinUi(this); // muista alustaa pointteri
    connect(pinui,&PinUi::sendPinNum,
            this,&MainWindow::handlePinNum);
    connect(pinui,&PinUi::PinuiTimeOut,
            this, &MainWindow::handlePinuiTimeOut);

    qDebug() <<"Pin Button is pressed";
    pinui->open();
     qDebug()<<"aukesiko pinui"; //tehään kaikesta DYNAAMINEN (alustus -> destruktori -> CONNECT MUISTA CONNECT9
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
    ui->pinNum->setEchoMode(QLineEdit::PasswordEchoOnEdit);
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
    connect(manager, &QNetworkAccessManager::finished, this, &MainWindow::loginSlot);

    reply = manager->post(request, QJsonDocument(jsonObj).toJson());
}

void MainWindow::loginSlot(QNetworkReply *reply)
{
    response_data = reply->readAll();
    qDebug()<<response_data;
}
