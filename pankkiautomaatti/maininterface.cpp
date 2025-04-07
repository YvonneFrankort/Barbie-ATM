#include "maininterface.h"
#include "mainwindow.h"
#include "ui_maininterface.h"
#include "environment.h"
#include "pinui.h"
#include <QDialog>
#include <QInputDialog>
#include <QMessageBox>
#include <QJsonObject>
#include <QJsonDocument>
#include <QDebug>

MainInterface::MainInterface(QWidget *parent)
    : QDialog(parent), ui(new Ui::MainInterface) // soundManager(new sound(this))
{
    qDebug() << "MainInterface aukaistu!!!";
    ui->setupUi(this);
    // soundManager->playBackgroundMusic();

    manager = new QNetworkAccessManager(this);

    connect(ui->balanceBtn, &QPushButton::clicked,
            this, &MainInterface::handleBalanceBtn);
    connect(ui->transactionsBtn, &QPushButton::clicked,
            this, &MainInterface::handleTransactionsBtn);
    connect(ui->depositBtn, &QPushButton::clicked,
            this, &MainInterface::handleDepositBtn);
    connect(ui->withdrawBtn, &QPushButton::clicked,
            this, &MainInterface::handleWithdrawBtn);
    connect(ui->transferBtn, &QPushButton::clicked,
            this, &MainInterface::handleTransferBtn);
    connect(ui->logOutBtn, &QPushButton::clicked,
            this, &MainInterface::handleLogOutBtn);

}

MainInterface::~MainInterface()
{
    qDebug()<<"MainInterFace TUHOTTU!!!";
    delete ui;
    // delete soundManager;
}


void MainInterface::setWebToken(const QByteArray &newWebtoken)
{
    webToken = newWebtoken;
    qDebug() << webToken;
}

void MainInterface::setCardNum(const QString &newCardNum)
{
    cardNum = newCardNum;
    ui->cardNumLabel->setText(cardNum);
    // ui->nameLabel->setText();
}



void MainInterface::handleBalanceBtn()
{
    qDebug() << "Balance button clicked.";


    QString site_url="http://localhost:3000/balance/"+cardNum;
    QNetworkRequest request(site_url);

    QByteArray myToken=webToken;
    request.setRawHeader(QByteArray("Authorization"),(myToken));

    manager = new QNetworkAccessManager(this);

    connect(manager, &QNetworkAccessManager::finished, this, &MainInterface::getBalanceSlot);

    reply = manager->get(request);
}

void MainInterface::getBalanceSlot(QNetworkReply *reply)
{
    QByteArray response_data=reply->readAll();
    qDebug() << "DATA: " << response_data;

    QJsonDocument json_doc = QJsonDocument::fromJson(response_data);

    if(!json_doc.isNull() && json_doc.isObject()){
        QJsonObject json_obj = json_doc.object();
        QString balance = json_obj.value("balance").toString();

        QMessageBox msgBox;
        msgBox.setText("Your balance is: "+balance+" euros");
        msgBox.exec();
    }
    reply->deleteLater();
    manager->deleteLater();
}


void MainInterface::handleTransactionsBtn()
{
    qDebug() << "Transactions button clicked.";

    QString site_url="http://localhost:3000/transaction/rfid/"+cardNum;
    QNetworkRequest request(site_url);

    QByteArray myToken=webToken;
    request.setRawHeader(QByteArray("Authorization"),(myToken));

    manager = new QNetworkAccessManager(this);

    connect(manager, &QNetworkAccessManager::finished, this, &MainInterface::getTransactions);

    reply = manager->get(request);
}

void MainInterface::getTransactions(QNetworkReply *reply)
{
    QByteArray response_data=reply->readAll();
    qDebug() << "DATA: " << response_data;

    QJsonDocument json_doc = QJsonDocument::fromJson(response_data);

    if (!json_doc.isNull() && json_doc.isArray()) {
        QJsonArray json_array = json_doc.array();
        QString transactions;

        for (int i = 0; i < json_array.size(); ++i) {
            QJsonObject obj = json_array.at(i).toObject();

            QString rawDate = obj.value("date").toString();
            QDateTime dateTime = QDateTime::fromString(rawDate, Qt::ISODate);
            QString formattedDate = dateTime.toString("dd/MM/yyyy - hh:mm");

            QString transaction = QString("Date: %1 \n Type: %2 \n Summa: %3 euros \n")
                                      // .arg(obj.value("transaction_id").toInt())
                                      .arg(formattedDate)
                                      .arg(obj.value("transaction_type").toString())
                                      .arg(obj.value("summa").toString());
            transactions += transaction + "\n";
        }

        QMessageBox msgBox;
        msgBox.setText("Your 10 latest transactions are: "+transactions);
        msgBox.exec();
    }
    reply->deleteLater();
    manager->deleteLater();
}

void MainInterface::handleDepositBtn()
{
    qDebug() << "Deposit button clicked.";

    // Ask user to enter deposit amount
    bool ok;
    double amount = QInputDialog::getDouble(
        this,
        "Enter Deposit Amount",
        "Amount (€):",
        0,     // default value
        0,     // min value
        10000, // max value
        2,     // decimals
        &ok
    );

    // If user pressed OK
    if (ok)
    {
        QJsonObject jsonObj;
        jsonObj.insert("rfid_code", cardNum);
        jsonObj.insert("amount", amount);

        QString site_url = "http://localhost:3000/deposit";
        QNetworkRequest request(site_url);
        request.setHeader(QNetworkRequest::ContentTypeHeader, "application/json");

        QByteArray myToken = webToken;
        request.setRawHeader("Authorization", myToken);

        manager = new QNetworkAccessManager(this);
        connect(manager, &QNetworkAccessManager::finished, this, &MainInterface::addDeposit);

        reply = manager->post(request, QJsonDocument(jsonObj).toJson());
    }
    else
    {
        qDebug() << "User canceled deposit input.";
    }
}

void MainInterface::addDeposit(QNetworkReply *reply)
{
    response_data = reply->readAll();
    qDebug() << response_data;

    QJsonDocument doc = QJsonDocument::fromJson(response_data);
    QString message = doc.object().value("message").toString();

    QMessageBox::information(this, "Deposit Status", message);

    reply->deleteLater();
    manager->deleteLater();
}

void MainInterface::handleWithdrawBtn()
{
    qDebug() << "Withdraw button clicked.";

    double amount = 0;
    QMessageBox msgBox;
    msgBox.setWindowTitle("Select Withdraw Amount");
    msgBox.setText("Choose an amount to withdraw:");

    QPushButton *btn10 = msgBox.addButton("10 €", QMessageBox::ActionRole);
    QPushButton *btn20 = msgBox.addButton("20 €", QMessageBox::ActionRole);
    QPushButton *btn50 = msgBox.addButton("50 €", QMessageBox::ActionRole);
    QPushButton *btn100 = msgBox.addButton("100 €", QMessageBox::ActionRole);
    QPushButton *btn200 = msgBox.addButton("200 €", QMessageBox::ActionRole);
    QPushButton *btnOther = msgBox.addButton("Other", QMessageBox::ActionRole);
    QPushButton *btnCancel = msgBox.addButton(QMessageBox::Cancel);

    msgBox.exec();

    if (msgBox.clickedButton() == btn10) amount = 10;
    else if (msgBox.clickedButton() == btn20) amount = 20;
    else if (msgBox.clickedButton() == btn50) amount = 50;
    else if (msgBox.clickedButton() == btn100) amount = 100;
    else if (msgBox.clickedButton() == btn200) amount = 200;
    else if (msgBox.clickedButton() == btnOther)
    {
        bool ok;
        amount = QInputDialog::getDouble(this, "Enter Amount", "Amount (€):", 0, 0, 10000, 2, &ok);
        if (!ok || fmod(amount, 10) != 0)
        {
            QMessageBox::warning(this, "Invalid Amount", "Please enter an amount that is a multiple of 10 (10, 20, 50, 100, 200, etc.).");
            return;
        }
    }
    else
    {
        qDebug() << "User canceled withdraw input.";
        return;
    }

    QJsonObject jsonObj;
    jsonObj.insert("rfid_code", cardNum);
    jsonObj.insert("amount", amount);

    QString site_url = "http://localhost:3000/withdraw";
    QNetworkRequest request(site_url);
    request.setHeader(QNetworkRequest::ContentTypeHeader, "application/json");

    QByteArray myToken = webToken;
    request.setRawHeader("Authorization", myToken);

    manager = new QNetworkAccessManager(this);
    connect(manager, &QNetworkAccessManager::finished, this, &MainInterface::addWithdraw);

    reply = manager->post(request, QJsonDocument(jsonObj).toJson());
}

void MainInterface::addWithdraw(QNetworkReply *reply)
{
    response_data = reply->readAll();
    qDebug() << response_data;

    QJsonDocument doc = QJsonDocument::fromJson(response_data);
    QString message = doc.object().value("message").toString();

    QMessageBox::information(this, "Withdraw Status", message);

    reply->deleteLater();
    manager->deleteLater();
}

void MainInterface::handleTransferBtn()
{
    qDebug() << "Transfer button clicked.";
}

void MainInterface::handleLogOutBtn()
{
    qDebug() << "Log out button clicked";

    close();
}



