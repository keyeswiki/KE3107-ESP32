#include <Wire.h>
#include <AHT20.h>
AHT20 aht20;

void setup(){
  Serial.begin(9600);

  Wire.begin(); // 加入 I2C 总线
  // 检查 AHT20 是否会作出回应
  if (aht20.begin() == false){
    Serial.println("AHT20 未检测到。请检查接线.");
    while (1);
  }
  Serial.println("AHT20 已确认.");
}

void loop(){
  // 获取新的温度和湿度值
  float temperature = aht20.getTemperature();
  float humidity = aht20.getHumidity();
  
  // 串口打印结果
  Serial.print("温度: ");
  Serial.print(temperature, 2);
  Serial.print(" C\t");
  Serial.print("湿度: ");
  Serial.print(humidity, 2);
  Serial.print("% RH");
  Serial.println();
  // AHT20 每约 50 毫秒就能给出一次读数。然而，读取时间过长可能会导致芯片温度比
  // 周围环境温度高出约 1.0 摄氏度. 数据手册建议每 2 秒进行一次读取.
  delay(2000);
}