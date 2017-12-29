#include <Arduino.h>

int peizoPin = A0;
int minValue = 100;
int peizoValue = 0;

void setup() {
  Serial.begin(9600); 
}

void loop() {
  peizoValue = analogRead(peizoPin);
  if (peizoValue > minValue) {
    Serial.println("drum-hit");
    delay(50);
  }
}
