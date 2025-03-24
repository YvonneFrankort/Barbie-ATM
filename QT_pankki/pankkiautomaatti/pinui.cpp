#include "pinui.h"
#include "ui_pinui.h"
#include <QDebug>

PinUi::PinUi(QWidget *parent)
    : QDialog(parent)
    , ui(new Ui::PinUi)
{
    ui->setupUi(this);

    connect(ui->pushButton, &QPushButton::clicked,
            this, &PinUi::handleClick);

       qDebug()<<"Pinui luotu!!";
}

PinUi::~PinUi()
{

    qDebug()<<"Pinui tuhottu!!";
    delete ui;
}

void PinUi::handleClick()
{
    qDebug()<<"pinui klikkailtu";
    QString pin = ui->lineEdit->text(); //tämä noutaa tiedon
    qDebug()<<"pin lahetelty";
    emit sendPinNum(pin);
}
