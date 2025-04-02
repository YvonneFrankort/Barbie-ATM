#include "rfid_dll.h"
#include <QDebug>

RFID_DLL::RFID_DLL(QObject * parent) : QObject(parent) {

    qDebug()<<"RFID DLL komponentti luotu";
   // port = new QSerialPort;

}

RFID_DLL::~RFID_DLL()
{
    qDebug()<<"RFID DLL komponentti TUHOTTU!!";

}



/* void RFID_DLL::test()
{
    qDebug()<<"RFID dll test funktio";
   const auto serialPortInfos = QSerialPortInfo::availablePorts();

    QString lastSerialNumber;

    for (const QSerialPortInfo &portInfo : serialPortInfos) {
        qDebug()<<"rfid_dll.cpp funktossa OOOOOOOOOOOOOOOO";
        qDebug() << "\n"
                 << "Port:" << portInfo.portName() << "\n"
                 << "Location:" << portInfo.systemLocation() << "\n"
                 << "Description:" << portInfo.description() << "\n"
                 << "Manufacturer:" << portInfo.manufacturer() << "\n"
                 << "Serial number:" << portInfo.serialNumber() << "\n"
                 << "Vendor Identifier:"
                 << (portInfo.hasVendorIdentifier()
                         ? QByteArray::number(portInfo.vendorIdentifier(), 16)
                         : QByteArray()) << "\n"
                 << "Product Identifier:"
                 << (portInfo.hasProductIdentifier()
                         ? QByteArray::number(portInfo.productIdentifier(), 16)
                         : QByteArray());
        lastSerialNumber = portInfo.serialNumber();

    }
    qDebug()<<"lähetetään signaalia EXEEEEEEEEEEEEEEN";
    emit sendSignalToExe(lastSerialNumber);
 //rfid->openPort();
}*/ //MERI POISTI TÄMÄN KÄYTÖSTÄ 310325-1306 syy: löytyy rfidui.cpp:stä


