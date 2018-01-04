#include <Arduino.h>

class SliderPot
{
  char printValue;
  int pin;
  float threshold;
  unsigned long timeout;
  unsigned long lastMillis = 0;
  float lastValue = 0.0;

public:
  SliderPot(char paramPrintValue, int paramPin, float paramThreshold, unsigned long paramTimeout)
  {
    printValue = paramPrintValue;
    pin = paramPin;
    threshold = paramThreshold;
    timeout = paramTimeout;
  }

  void Update()
  {
    unsigned long currentMillis = millis();

    if (currentMillis - lastMillis >= timeout)
    {
      lastMillis = currentMillis;

      float currentValue = _logToLinearMap(analogRead(pin));
      if ((currentValue < lastValue - threshold) ||
          (currentValue > lastValue + threshold))
      {
        lastValue = currentValue;
        Serial.print(printValue);
      }
    }
  };

private:
  float _logToLinearMap(int value)
  {
    return 5.0 * pow(value / 1004.0, 5.0);
  }
};
