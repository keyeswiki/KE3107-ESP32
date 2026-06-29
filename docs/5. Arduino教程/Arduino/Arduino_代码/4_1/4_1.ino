#include <Wire.h>
#include <AHT20.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SH110X.h>
#include <DFRobot_ENS160.h>
#include <Adafruit_NeoPixel.h>

// 硬件配置
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1
#define I2C_ADDRESS 0x3C
#define LED_PIN 4
#define LED_COUNT 4

// 环境阈值
#define LIGHT_THRESHOLD 1500
#define TEMP_THRESHOLD 30
#define HUMI_THRESHOLD 60
#define ECO2_THRESHOLD 1000

// 创建对象
AHT20 aht20;
DFRobot_ENS160_I2C ENS160(&Wire, 0x53);
Adafruit_NeoPixel leds(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);
Adafruit_SH1106G display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

// 更新时间控制
unsigned long lastUpdate = 0;
const unsigned long updateInterval = 2000;

const int lightSensorPin = 34; // 定义光敏电阻传感器的引脚

void setup() {
  // 通信协议初始化
  Serial.begin(9600);  // 串口调试
  Wire.begin();  // I2C总线初始化
  
  // 初始化OLED
  display.begin(I2C_ADDRESS, true);  
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SH110X_WHITE);
  
  // 初始化传感器
  aht20.begin(); // 温湿度传感器
  ENS160.begin(); // 空气质量传感器
  ENS160.setPWRMode(ENS160_STANDARD_MODE);
  
  // 初始化RGB
  leds.begin(); // RGB灯带初始化
  leds.setBrightness(100);
  leds.show();
}

void loop() {
  if(millis() - lastUpdate >= updateInterval) {
    lastUpdate = millis();
    
    // 读取传感器数据
    float temperature = aht20.getTemperature();
    float humidity = aht20.getHumidity();
    int illum = analogRead(lightSensorPin);
    uint16_t eco2 = ENS160.getECO2();
    
    // 更新显示
    display.clearDisplay();
    display.setCursor(0, 12);
    display.print("T:");
    display.print(temperature, 1);
    display.cp437(true);
    display.write(248); // °符号
    display.println("C");
    
    display.setCursor(0, 24);
    display.print("H:");
    display.print(humidity, 1);
    display.println("%");
    
    display.setCursor(0, 36);
    display.print("L:");
    display.print(illum);
    display.println(" Lux");
    
    display.setCursor(0, 48);
    display.print("C:");
    display.print(eco2);
    display.println(" ppm");
    
    display.display();
    
    // 控制LED
    setAllLEDs(0, 0, 0); // 先关闭
    
    if(eco2 > ECO2_THRESHOLD) {
      setAllLEDs(255, 255, 0); // 黄色
    } 
    else if(temperature > TEMP_THRESHOLD) {
      setAllLEDs(255, 0, 0);  // 红色
    }
    else if(humidity > HUMI_THRESHOLD) {
      setAllLEDs(0, 0, 255);  // 蓝色
    }
    else if(illum < LIGHT_THRESHOLD) {
      setAllLEDs(0, 255, 0);  // 绿色
    }
  }
}

// 设置LED颜色
void setAllLEDs(uint8_t r, uint8_t g, uint8_t b) {
  for (int i = 0; i < LED_COUNT; i++) {
    leds.setPixelColor(i, leds.Color(r, g, b));
  }
  leds.show();
}