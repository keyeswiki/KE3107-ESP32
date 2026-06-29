#include<musicESP32.h>

 music player(14);

void setup() {
  // put your setup code here, to run once:
  player.birthday();
  delay(2000);
  player.star_war_tone();
  delay(2000);
  player.tetris();
  delay(2000);
  player.super_mario();
  delay(2000);
  player.Ode_to_Joy();
  delay(2000);
  player.christmas();
}

void loop() {
  // put your main code here, to run repeatedly:

}