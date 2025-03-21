#include "reader.h"
#include "ui_reader.h"

Reader::Reader(QWidget *parent)
    : QDialog(parent)
    , ui(new Ui::Reader)
{
    ui->setupUi(this);
    connect(ui->card, &QPushButton::clicked,
            this,&Reader::handleCardNum);
}

Reader::~Reader()
{
    delete ui;
}

void Reader::handleCardNum()
{
//tähän pitää tehdä constructori
}
