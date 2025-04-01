#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include "reader.h"
#include "pinui.h"
#include "maininterface.h"

#include <QtNetwork>                // http
#include <QNetworkAccessManager>    // http
#include <QJsonDocument>            // http
#include <QMessageBox>              // Include QMessageBox

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

    void on_btnLogin_clicked();
    void loginSlot(QNetworkReply *response); // http POST


private:
    Ui::MainWindow *ui;
    Reader * reader;
    PinUi*pinui;
    MainInterface *logout;

    QNetworkAccessManager *manager; // http POST
    QNetworkReply *reply;           // http POST
    QByteArray response_data;       // http POST

    QMessageBox objMessageBox;      // Login ErrorBox
    int remainingAttempts = 3;      // Attempts variable, initialized at 3

    void handleLoginError(const QString &message);
    void updateAttemptsDisplay();
};
#endif // MAINWINDOW_H
