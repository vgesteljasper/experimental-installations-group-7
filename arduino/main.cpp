#include <Arduino.h>

#include <classes/Peizo.cpp>
#include <classes/SliderPot.cpp>
#include <classes/Toggle.cpp>

const int baudRate = 9600;

Peizo cutting_board('d', PIN_A0, 100, 50);
Peizo discard_lever('l', PIN_A1, 10, 200);
SliderPot smudge_wiper('s', PIN_A2, 0.3, 300);
Toggle pressure_plate('1', '0', 7, 500);

void setup()
{
  Serial.begin(baudRate);
}

void loop()
{
  cutting_board.Update();
  discard_lever.Update();
  smudge_wiper.Update();
  pressure_plate.Update();
}
