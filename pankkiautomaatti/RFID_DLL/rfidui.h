#ifndef RFIDUI_H
#define RFIDUI_H

#include <QDialog>
#include "RFID_DLL_global.h"
#include <QSerialPort>
#include <QSerialPortInfo>

namespace Ui {
class rfidui;
}

class RFID_DLL_EXPORT rfidui : public QDialog
{
    Q_OBJECT

public:
    explicit rfidui(QWidget *parent = nullptr);
    ~rfidui();
    bool openPort();
    void closePort();

signals:
    void sendSignalToExe(QString);


private slots:
   void handleReader();



private:
    Ui::rfidui *ui;
    QSerialPort * port;
    QSerialPortInfo * info;
};

#endif // RFIDUI_H
