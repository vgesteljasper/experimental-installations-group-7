#include <Arduino.h>

int peizoPin = A0;
int minPeizoValue = 100;
int peizoValue = 0;

int sliderPin = A1;
int previousSliderValue = 0;

void setup() {
  Serial.begin(9600);
  previousSliderValue = analogRead(sliderPin);
}

void loop() {
  peizoValue = analogRead(peizoPin);
  if (peizoValue > minPeizoValue) {
    Serial.println("drum-hit");
    delay(50);
  }

  int sliderValue = analogRead(sliderPin);
  if(sliderValue - previousSliderValue > 500 || sliderValue - previousSliderValue < -500) {
      Serial.println("slider-move");
  }

  previousSliderValue = sliderValue;
}
