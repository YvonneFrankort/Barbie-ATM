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
    QString site_url=environment::base_url()+"/balance/"+cardNum;
    QNetworkRequest request(site_url);
    request.setRawHeader(QByteArray("Authorization"),(webToken));
    manager = new QNetworkAccessManager(this);

    connect(manager, &QNetworkAccessManager::finished, this, &MainInterface::myBalanceSlot);

    reply = manager->get(request);

}

void MainInterface::myBalanceSlot(QNetworkReply *reply)
{

}


void MainInterface::handleTransactionsBtn()
{
    qDebug() << "Transactions button clicked.";
}

void MainInterface::handleDepositBtn()
{
    qDebug() << "Deposit button clicked.";
}

void MainInterface::handleWithdrawBtn()
{
    qDebug() << "Withdraw button clicked.";
}

void MainInterface::handleTransferBtn()
{
    qDebug() << "Transfer button clicked.";
}

void MainInterface::handleLogOutBtn()
{
    qDebug() << "Log out button clicked";
}

