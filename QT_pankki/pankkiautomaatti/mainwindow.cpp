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

    reader = new Reader(this);
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::handleCardButton()
{
    qDebug() <<"Card Button is pressed";
}

void MainWindow::handlePinButton()
{
    qDebug() <<"Pin Button is pressed";
}
