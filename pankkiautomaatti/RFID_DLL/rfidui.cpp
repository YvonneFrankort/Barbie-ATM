
#include "rfidui.h"
#include "ui_rfidui.h"
#include <QDebug>

rfidui::rfidui(QWidget *parent)
    : QDialog(parent)
    , ui(new Ui::rfidui)
{
    ui->setupUi(this);
    port = new QSerialPort(this);
    connect(port,&QSerialPort::readyRead,
            this, &rfidui::handleReader);

    openPort();
    show();
}

rfidui::~rfidui()
{
    delete ui;
    delete info;
}

bool rfidui::openPort()
{
    qDebug()<<"openPort funktiossa AAAAAAAAAAAAAAAAAAAAAAAAAAa";

    const auto serialPortInfos = QSerialPortInfo::availablePorts();

    port->setPortName("");



    for (const QSerialPortInfo &portInfo : serialPortInfos) {


        qDebug() << "bool-funktiossa rfidui:ssaBBBBBBBBBBBBBBBBBBBBBBBBBBB";

        /*meri huomauttaa: Kokeilin ajaa kaikenlaiset pysäytykset jotta tää ei tulostuis kahdesti ja kun siinä onnistuin, mikään ei enää toiminut. Kuuluuko tämän sitten pyörähtää kaksi kertaa että kaikki toimii?? Jätin näin enkä kadu asiaa enempää*/


        if(portInfo.manufacturer() == "Microsoft") {
            port->setPortName(portInfo.portName());
        }
    }


    if(port->portName() == "") {
        qDebug()<<"RFID kortinlukijaa ei löydyCCCCCCCCCCCCCCCCCCCCCCCCC";
        return false;
    } if(port->open(QIODeviceBase::ReadOnly)==false) {
        qDebug()<<"Portti aukea poopoo";
        return false;
    }

    qDebug()<<"PORTIT AUKEAVAT";
    return true;

}

void rfidui::closePort()
{
    qDebug()<<"closePort funktiossa (rfidui.cpp)";
    //port->close();
}

void rfidui::handleReader()
{
    qDebug()<<"Kortti lukijassa luetaan numero: ";

    QByteArray byteArray = port->readAll(); //QByteArray byteArray = port->readAll().trimmed();
    QString str = QString::fromUtf8(byteArray);
    str = str.sliced(3,11); // https://doc.qt.io/qt-6/qstring.html#sliced
    //QString str = byteArray.toHex().toUpper();
    emit sendSignalToExe(str);
}
