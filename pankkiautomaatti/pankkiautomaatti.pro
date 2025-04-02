QT       += core gui
QT += network   # http
QT += serialport

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

CONFIG += c++17

# You can make your code fail to compile if it uses deprecated APIs.
# In order to do so, uncomment the following line.
#DEFINES += QT_DISABLE_DEPRECATED_BEFORE=0x060000    # disables all the APIs deprecated before Qt 6.0.0

SOURCES += \
    environment.cpp \
    main.cpp \
    maininterface.cpp \
    mainwindow.cpp \
    pinui.cpp

HEADERS += \
    environment.h \
    maininterface.h \
    mainwindow.h \
    pinui.h

FORMS += \
    maininterface.ui \
    mainwindow.ui \
    pinui.ui



win32: LIBS += -L$$PWD/RFID_DLL/build/debug/ -lRFID_DLL

INCLUDEPATH += $$PWD/RFID_DLL
DEPENDPATH += $$PWD/RFID_DLL
