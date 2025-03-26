#include "pinui.h"
#include "ui_pinui.h"
#include <QDebug>
#include <QString>
#include <QLineEdit>

PinUi::PinUi(QWidget *parent)
    : QDialog(parent)
    , ui(new Ui::PinUi)
{
    ui->setupUi(this);

    connect(ui->pushButton, &QPushButton::clicked,
            this, &PinUi::handleClick);

       qDebug()<<"Pinui luotu!!";

    timer = new QTimer(this);
    connect(timer, &QTimer::timeout,
            this, &PinUi::timeout);

    //timer->start(3000); // timer käynnistys kun pin kysytään --

}

PinUi::~PinUi()
{

    qDebug()<<"Pinui tuhottu!!";
    delete ui;
}

void PinUi::handleClick()
{
    //timer->start(3000); //miksi tässä? EIHÄN TÄMÄ TOIMI KARI???
    qDebug()<<"pinui klikkailtu";
    QString pin = ui->NumeroJono->text(); //tämä noutaa tiedon
    qDebug()<<"pin lahetelty";
    emit sendPinNum(pin);
}

void PinUi::timeout()
{
    qDebug()<<"pinui timeout handler";
    qDebug()<<"pinui lahettaa timeout signaalin";
    emit PinuiTimeOut();
}

void PinUi::numberClickHandler(int n)
{
    qDebug() << "Valittu numero=" << n;

   // QString numStr = QString::number(n);
   /* QString numStr = QString::number(n);
    numStr = n.append(n);

        qDebug() << "Elementti num1";
        //laita n -> num1
        ui->NumeroJono->setText(numStr); */

    QString numStr = ui->NumeroJono->text(); //haetaan tiedot
    numStr.append(QString::number(n));       //https://doc.qt.io/qt-6/qstring.html#append
    ui->NumeroJono->setText(numStr);         //päivitetään tiedot uuteen numerojonoon
    qDebug() << "Painettu numero on: " << n;
    qDebug() << "Numerojono on tällä hetkellä: " << numStr;

    void setEchoMode(QLineEdit::EchoMode);
    ui->NumeroJono->setEchoMode(QLineEdit::PasswordEchoOnEdit); //https://doc.qt.io/qt-6/qlineedit.html#EchoMode-enum

    // ui->NumeroJono->setVisible(false); yritys numero1
}
void PinUi::on_numero1_clicked()
{
    //timer->start(3000);
    QString str = ui->numero1->text();
    int n = str.toInt();
    numberClickHandler(n);
}

void PinUi::on_numero2_clicked()
{
    QString str = ui->numero2->text();
    int n = str.toInt();
    numberClickHandler(n);
}


void PinUi::on_numero3_clicked()
{
    QString str = ui->numero3->text();
    int n = str.toInt();
    numberClickHandler(n);
}



void PinUi::on_numero4_clicked()
{
    QString str = ui->numero4->text();
    int n = str.toInt();
    numberClickHandler(n);
}



void PinUi::on_numero5_clicked()
{
    QString str = ui->numero5->text();
    int n = str.toInt();
    numberClickHandler(n);
}


void PinUi::on_numero6_clicked()
{
    QString str = ui->numero6->text();
    int n = str.toInt();
    numberClickHandler(n);
}


void PinUi::on_numero7_clicked()
{
    QString str = ui->numero7->text();
    int n = str.toInt();
    numberClickHandler(n);
}


void PinUi::on_numero8_clicked()
{
    QString str = ui->numero8->text();
    int n = str.toInt();
    numberClickHandler(n);
}


void PinUi::on_numero9_clicked()
{
    QString str = ui->numero9->text();
    int n = str.toInt();
    numberClickHandler(n);
}

void PinUi::on_numero0_clicked()
{
    QString str = ui->numero0->text();
    int n = str.toInt();
    numberClickHandler(n);
}


void PinUi::on_Reset_clicked()
{
    ui->NumeroJono->clear();
}

