#include <Arduino.h>

class Toggle
{
  char printValueOn;
  char printValueOff;
  int pin;
  bool currentState;

public:
  Toggle(char paramPrintValueOn, char paramPrintValueOff, int paramPin)
  {
    printValueOn = paramPrintValueOn;
    printValueOff = paramPrintValueOff;
    pin = paramPin;
    currentState = false;
  }

  void Setup()
  {
    pinMode(pin, INPUT);

    currentState = digitalRead(pin);
    _printState();
  }

  void Update()
  {
    bool newState = digitalRead(pin);
    if (newState != currentState)
    {
      currentState = newState;
      _printState();
    }
  };

private:
  void _printState()
  {
    if (currentState)
    {
      Serial.print(printValueOn);
    }
    else
    {
      Serial.print(printValueOff);
    }
  }
};
