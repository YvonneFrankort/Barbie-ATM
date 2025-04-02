#ifndef BARBIESONG_H
#define BARBIESONG_H

#include <QObject>
#include <QMediaPlayer>
#include <QAudioOutput>
#include <QSoundEffect>
#include <QDebug>

class sound : public QObject
{
    Q_OBJECT

public:
    explicit sound(QObject *parent = nullptr);
    ~sound();

    void playBackgroundMusic();
    void stopBackgroundMusic();
    void playSoundEffect(const QString &soundFile);
    void playClickSound();
    void playScreenChangeSound();
    void playNotificationSound();

private:
    QMediaPlayer *backgroundMusic;
    QAudioOutput *audioOutput;

    QMediaPlayer *clickSoundEffect;
    QAudioOutput *clickAudioOutput;

    QMediaPlayer *screenChangeSoundEffect;
    QAudioOutput *screenChangeAudioOutput;

    QMediaPlayer *notificationSoundEffect;
    QAudioOutput *notificationAudioOutput;
};

#endif // BARBIESONG_H
