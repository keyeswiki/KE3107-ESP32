#include <Wire.h>             // I2C通信库
#include <Adafruit_GFX.h>     // Adafruit图形库
#include <Adafruit_SH110X.h>  // SH1106 OLED驱动库

#define SCREEN_WIDTH 128      // OLED宽度(像素)
#define SCREEN_HEIGHT 64      // OLED高度(像素)
#define OLED_RESET -1         // 共用I2C复位(无硬件复位)
#define I2C_ADDRESS 0x3C      // SH1106默认I2C地址

// 创建显示对象
Adafruit_SH1106G display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

const int sensorPin = 18; // 定义避障传感器的引脚
volatile int goalCount = 0;  // 使用volatile保证中断安全
unsigned long lastDetectTime = 0; //上次检测时间(用于消抖)
const int debounceTime = 50; // 消抖时间(ms)

void setup() {
  Serial.begin(9600);  // 初始化串口(调试用)

  // 初始化OLED
  if(!display.begin(I2C_ADDRESS, true)) {  // true表示128x64分辨率
    Serial.println("SH1106初始化失败");
    while(1);  // 卡住不再继续
  }

  // 清屏并设置文本属性
  display.clearDisplay();  // OLED清屏
  display.setTextSize(3);  // 文本大小
  display.setTextColor(SH110X_WHITE); // 白色文本
  
  // 配置避障传感器
  pinMode(sensorPin, INPUT);
  attachInterrupt(digitalPinToInterrupt(sensorPin), detectCallback, FALLING);
}

void detectCallback() {  // 计数回调函数
  if (millis() - lastDetectTime > debounceTime) {
    goalCount++;
    lastDetectTime = millis();
  }
}

void loop() {
  // OLED显示计数
  display.clearDisplay();
  display.setCursor(40, 20);  // 居中显示 
  display.println(goalCount);
  display.display();  // 刷新屏幕
}