#include "maininterface.h"
#include "mainwindow.h"
#include "ui_maininterface.h"
#include "environment.h"
#include <QDialog>
#include <QInputDialog>
#include <QMessageBox>
#include <QJsonObject>
#include <QJsonDocument>
#include <QDebug>

MainInterface::MainInterface(QWidget *parent)
    : QDialog(parent)
    , ui(new Ui::MainInterface)
{
    ui->setupUi(this);

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
    delete ui;
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

    // Ask user to enter withdraw amount
    bool ok;
    double amount = QInputDialog::getDouble(
        this,
        "Enter Withdraw Amount",
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

        QString site_url = "http://localhost:3000/withdraw";
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
        qDebug() << "User canceled withdraw input.";
    }
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
}

