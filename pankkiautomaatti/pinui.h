#ifndef PINUI_H
#define PINUI_H

#include <QDialog>
#include <QTimer>

namespace Ui {
class PinUi;
}

class PinUi : public QDialog
{
    Q_OBJECT

public:
    explicit PinUi(QWidget *parent = nullptr);
    ~PinUi();

signals:
    void sendPinNum(QString);
    void PinuiTimeOut();

private slots:
    void handleClick();
    void timeout();

    void on_numero1_clicked();

    void on_numero2_clicked();

    void on_numero3_clicked();

    void on_numero4_clicked();

    void on_numero5_clicked();

    void on_numero6_clicked();

    void on_numero7_clicked();

    void on_numero8_clicked();

    void on_numero9_clicked();

    void on_numero0_clicked();

    void on_Reset_clicked();

private:
    Ui::PinUi *ui;
    QTimer * timer;
    void numberClickHandler(int);
};

#endif // PINUI_H
