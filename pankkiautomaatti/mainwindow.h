#ifndef MAINWINDOW_H
#define MAINWINDOW_H
#include "rfid_dll.h"
#include "rfidui.h"
#include <QMainWindow>
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
    //void handleCardButton(); TURHAAAAA -meri 290325-2200
    void handlePinButton();
    //void handleCardNum();//QString poistettu sulkujen sisältä. Okei this is useless... Meri 290325-2158. Mun puolesta voi poistaa varmaan kaikki handleCardNum systeemit koodista.
    void handlePinNum(QString);
    void handlePinuiTimeOut();
    void handleSignal(QString); //ehkä sama asia kuin cardnum

    void on_btnLogin_clicked();
    void loginSlot(QNetworkReply *response); // http POST

    void on_changeCard_clicked();

private:
    Ui::MainWindow *ui;
    PinUi*pinui;
    MainInterface *logout;

    QNetworkAccessManager *manager; // http POST
    QNetworkReply *reply;           // http POST
    QByteArray response_data;       // http POST

    QMessageBox objMessageBox;      // Login ErrorBox
    int remainingAttempts = 3;      // Attempts variable, initialized at 3

    RFID_DLL * ptrRFID; //kirjasto
    rfidui * rfid;


    void handleLoginError(const QString &message);
    void updateAttemptsDisplay();
};
#endif // MAINWINDOW_H
