#ifndef MAININTERFACE_H
#define MAININTERFACE_H
#include <QDialog>
#include <QNetworkAccessManager>
#include <QMessageBox>

namespace Ui {
class MainInterface;
}

class MainInterface : public QDialog
{
    Q_OBJECT

public:
    explicit MainInterface(QWidget *parent = nullptr);
    ~MainInterface();

    void setWebToken(const QByteArray &newWebtoken);
    void setCardNum(const QString &newCardNum);


private slots:
    void handleBalanceBtn();
    void getBalanceSlot(QNetworkReply *reply);

    void handleTransactionsBtn();

    void handleDepositBtn();
    void addDeposit(QNetworkReply *reply);


    void handleWithdrawBtn();
    void addWithdraw(QNetworkReply *reply);

    void handleTransferBtn();
    void handleLogOutBtn();

private:
    Ui::MainInterface *ui;
    QByteArray webToken;
    QString cardNum;

    QNetworkAccessManager *manager;
    QNetworkReply *reply;
    QByteArray response_data;
    QMessageBox objMessageBox;
    };

#endif // MAININTERFACE_H
