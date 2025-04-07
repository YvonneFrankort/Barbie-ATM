#ifndef RFID_DLL_H
#define RFID_DLL_H

#include "RFID_DLL_global.h"
#include <QtSerialPort/QSerialPort>
#include <QtSerialPort/QSerialPortInfo>
#include <QObject>

class RFID_DLL_EXPORT RFID_DLL : public QObject
{
    Q_OBJECT
public:
    RFID_DLL(QObject * parent = nullptr);
    ~RFID_DLL();

     bool openPort();

    void test();
    QSerialPort * port;

signals:
     void sendSignalToExe(QString);


};

//kari poisti tän + rfid_dll.cpp luennolla

#endif // RFID_DLL_H
