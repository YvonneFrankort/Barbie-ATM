#include "reader.h"
#include "ui_reader.h"
#include <QDebug>

Reader::Reader(QWidget *parent)
    : QDialog(parent)
    , ui(new Ui::Reader)
{
    ui->setupUi(this);
    connect(ui->card, &QPushButton::clicked,
            this,&Reader::handleCardNum);

    qDebug()<<"Reader luotu!!";

}

Reader::~Reader()
{
    qDebug()<<"Reader tuhottu!!";
    delete ui;
}

void Reader::handleCardNum()
{
//tähän pitää tehdä constructori
    qDebug()<<"Readerin slot funktiossa";
QString number = ui->cardNumLineEdit->text(); //tämä noutaa tiedon
    emit sendCardNum(number); //tämä lähettää tiedon muuttujaan
}

