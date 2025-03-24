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

private slots:
    void handleClick();

private:
    Ui::PinUi *ui;
    QTimer * timer;
};

#endif // PINUI_H
