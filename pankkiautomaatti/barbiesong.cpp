#include "barbiesong.h"

sound::sound(QObject *parent) : QObject(parent) {

    backgroundMusic = new QMediaPlayer(this);
    audioOutput = new QAudioOutput(this);
    backgroundMusic->setAudioOutput(audioOutput);
    backgroundMusic->setSource(QUrl("qrc:/barbieSONG/barbieSONG.mp3"));
    backgroundMusic->setLoops(QMediaPlayer::Infinite);
    audioOutput->setVolume(0.5);

    clickSoundEffect = new QMediaPlayer(this);
    clickAudioOutput = new QAudioOutput(this);
    clickSoundEffect->setAudioOutput(clickAudioOutput);
    clickSoundEffect->setSource(QUrl("qrc:/new/sound/Media/clicksound.mp3"));
    clickSoundEffect->setLoops(QMediaPlayer::Once);
    clickAudioOutput->setVolume(1.0);

    screenChangeSoundEffect = new QMediaPlayer(this);
    screenChangeAudioOutput = new QAudioOutput(this);
    screenChangeSoundEffect->setAudioOutput(screenChangeAudioOutput);
    screenChangeSoundEffect->setSource(QUrl("qrc:/new/sound/Media/screenChange.mp3"));
    screenChangeSoundEffect->setLoops(QMediaPlayer::Once);
    screenChangeAudioOutput->setVolume(1.0);


    notificationSoundEffect = new QMediaPlayer(this);
    notificationAudioOutput = new QAudioOutput(this);
    notificationSoundEffect->setAudioOutput(notificationAudioOutput);
    notificationSoundEffect->setSource(QUrl("qrc:/new/sound/Media/notificationSound.mp3"));
    notificationSoundEffect->setLoops(QMediaPlayer::Once);
    notificationAudioOutput->setVolume(1.0);

}

sound::~sound() {

    delete backgroundMusic;
    delete audioOutput;
    delete clickSoundEffect;
    delete clickAudioOutput;
    delete screenChangeSoundEffect;
    delete screenChangeAudioOutput;
}

void sound::playBackgroundMusic() {

    backgroundMusic->play();
}

void sound::stopBackgroundMusic() {

    backgroundMusic->stop();
}

void sound::playClickSound(){

    clickSoundEffect->play();
}

void sound::playScreenChangeSound()
{
    screenChangeSoundEffect->play();
}

void sound::playNotificationSound() {

    notificationSoundEffect->play();
}
