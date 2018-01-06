#include <Arduino.h>

class Toggle
{
  char printValueOn;
  char printValueOff;
  int pin;
  unsigned long timeout;
  unsigned long recheckMillis;
  bool currentState;
  bool tempState;

public:
  Toggle(char paramPrintValueOn, char paramPrintValueOff, int paramPin, unsigned long paramTimeout)
  {
    printValueOn = paramPrintValueOn;
    printValueOff = paramPrintValueOff;
    pin = paramPin;
    timeout = paramTimeout;

    pinMode(pin, INPUT);

    currentState = digitalRead(pin);
    tempState = currentState;

    _printState();
  }

  void Update()
  {
    unsigned long currentMillis = millis();

    bool newState = digitalRead(pin);

    if (newState != tempState)
    {
      recheckMillis = currentMillis + timeout;
      tempState = newState;
    }
    else if ((currentMillis >= recheckMillis) && (currentState != tempState))
    {
      currentState = tempState;
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
