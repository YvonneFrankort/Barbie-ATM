#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include "reader.h"
#include "pinui.h"

#include <QtNetwork>                // http
#include <QNetworkAccessManager>    // http
#include <QJsonDocument>            // http

QT_BEGIN_NAMESPACE
namespace Ui {
class MainWindow;
}
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private slots:
    void handleCardButton();
    void handlePinButton();
    void handleCardNum(QString);
    void handlePinNum(QString);
    void handlePinuiTimeOut();

    void on_btnLogin_clicked(); // Pekka had this function idk what it does, it was empty
    void loginSlot(QNetworkReply *reply); // http POST

private:
    Ui::MainWindow *ui;
    Reader * reader;
    PinUi*pinui;

    QNetworkAccessManager *manager; // http POST
    QNetworkReply *reply;           // http POST
    QByteArray response_data;       // http POST


};
#endif // MAINWINDOW_H
