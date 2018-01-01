#include <Arduino.h>

int peizoPin = A0;
int sliderPin = A1;
int minPeizoValue = 100;
int peizoValue = 0;
int sliderValue = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  peizoValue = analogRead(peizoPin);
  if (peizoValue > minPeizoValue) {
    Serial.println("drum-hit");
    delay(50);
  }

  sliderValue = analogRead(sliderPin);
  Serial.println("[sliderValue] %p\n", sliderValue);
}
