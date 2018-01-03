#include <Arduino.h>

class Peizo
{
  char printValue;
  int pin;
  int threshold;
  unsigned long timeout;
  unsigned long lastMillis = 0;

public:
  Peizo(char paramPrintValue, int paramPin, int paramThreshold, unsigned long paramTimeout)
  {
    printValue = paramPrintValue;
    pin = paramPin;
    threshold = paramThreshold;
    timeout = paramTimeout;
  }

  void Update()
  {
    unsigned long currentMillis = millis();

    if ((currentMillis - lastMillis >= timeout) && (analogRead(pin) > threshold))
    {
      lastMillis = currentMillis;
      Serial.print(printValue);
    }
  };
};
