#ifndef MAININTERFACE_H
#define MAININTERFACE_H
#include <QDialog>
#include <QNetworkAccessManager>

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
    void myBalanceSlot(QNetworkReply *reply);

    void handleTransactionsBtn();
    void handleDepositBtn();
    void handleWithdrawBtn();
    void handleTransferBtn();
    void handleLogOutBtn();

private:
    Ui::MainInterface *ui;
    QByteArray webToken;
    QString cardNum;

    QNetworkAccessManager *manager;
    QByteArray response_data;
    QNetworkReply *reply;
    };

#endif // MAININTERFACE_H
