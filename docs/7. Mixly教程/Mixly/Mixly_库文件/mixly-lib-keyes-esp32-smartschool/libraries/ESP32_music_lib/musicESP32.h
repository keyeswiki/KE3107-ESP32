#ifndef _MUSIC_H_
#define _MUSIC_H_ 
#include <Arduino.h>
class music
{
 public:
     music(char pin);
     void birthday(void);
     void tetris(void);
     void Ode_to_Joy(void);
     void christmas(void);
     
     void super_mario(void);   //超级玛丽
     void sing(int s);
     void buzz(int targetPin, long frequency, long length);

     void star_war_tone(void); //星球大战
     void firstSection(void);
     void secondSection(void);
     void beep(int note, int duration);

 private:
     char buzzer_pin;
};
#endif
