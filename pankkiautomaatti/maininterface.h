#ifndef MAININTERFACE_H
#define MAININTERFACE_H

#include <QDialog>

namespace Ui {
class MainInterface;
}

class MainInterface : public QDialog
{
    Q_OBJECT

public:
    explicit MainInterface(QWidget *parent = nullptr);
    ~MainInterface();

    void setWebToken(const QByteArray &token);

private slots:
    void on_dataBtn_clicked();

private:
    Ui::MainInterface *ui;
    QByteArray webToken;
};

#endif // MAININTERFACE_H
