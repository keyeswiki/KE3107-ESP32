// 导入库文件
#include <SoftwareSerial.h>
#include <DFRobot_ENS160.h>
#include <BuzzerESP32.h> 
#include <Wire.h>
#include <AHT20.h>
#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
 #include <avr/power.h> // 需要 16 MHz Adafruit Trinket
#endif
#include <Adafruit_GFX.h>
#include <Adafruit_SH110X.h>
#include <Stepper.h>   // 提供了控制步进电机的基本功能
#include <ESP32Servo.h> 
Servo myservo;  // 创建舵机对象来控制舵机,在ESP32上可以创建16个舵机对象

// 定义光敏电阻传感器引脚
const int PhotoresistorPin = 34;
// 定义LED引脚 
const int LED_PIN = 12;  
// 定义无源蜂鸣器引脚
BuzzerESP32 buzzer(19); 
// 步进电机驱动板参数（28BYJ-48）
const int STEPS_PER_REV = 2038;  // 实际步数/圈（不同电机可能有差异）
const int MOTOR_PIN1 = 14;       // IN1
const int MOTOR_PIN2 = 27;       // IN2
const int MOTOR_PIN3 = 16;       // IN3
const int MOTOR_PIN4 = 17;       // IN4

// 用户可调参数(步进电机)
int motorSpeed = 10;      // 转速(RPM)，建议5-12，超过15极易堵转
int rotationCount = 2;    // 转动圈数
bool reverseDirection = false; // 反转标志位

// 初始化步进电机（注意引脚顺序IN1-IN3-IN2-IN4）
Stepper myStepper(STEPS_PER_REV, MOTOR_PIN1, MOTOR_PIN3, MOTOR_PIN2, MOTOR_PIN4);

// 电机控制状态
bool motorRunning = false;
unsigned long motorStartTime = 0;
const unsigned long MOTOR_DURATION = 800;  // 0.8秒
int currentDirection = 0;  // 0:停止, 1:正转, 2:反转

#define RGB_PIN 4      // 控制信号引脚
#define LED_COUNT 4    // LED 灯珠数量

// 创建 NeoPixel 对象
Adafruit_NeoPixel strip(LED_COUNT, RGB_PIN, NEO_GRB + NEO_KHZ800);

// 电机驱动引脚定义
const int INA = 5;  
const int INB = 13; 

const int ServoPin = 32; // 舵机的引脚

const int RX_PIN = 25; // 引脚 GPIO25 为 RX
const int TX_PIN = 26; // 引脚 GPIO26 为 TX

SoftwareSerial mySerial(RX_PIN, TX_PIN); // 定义软件串口引脚（RX, TX）

// 定义变量用于存储从语音模块接收到的控制码
volatile int Voice_Control = 0;  // 初始化为0，确保首次判断时不触发任何指令

// OLED配置
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1  // 共用I2C复位
#define I2C_ADDRESS 0x3C  // SH1106默认地址

// 创建对象
AHT20 aht20;
DFRobot_ENS160_I2C ENS160(&Wire, 0x53);
Adafruit_SH1106G display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

// 定义变量
int Temperature = 0;
int Humidity = 0;
int Intensity = 0;

// 上次更新时间
unsigned long lastUpdate = 0; // 记录上次更新时间
const unsigned long updateInterval = 500; // 0.5秒更新间隔

// 串口发送消息最大长度
#define UART_SEND_MAX      32
#define UART_MSG_HEAD_LEN  2
#define UART_MSG_FOOT_LEN  2

// 串口发送消息号
#define U_MSG_bozhensgshu      1
#define U_MSG_boxiaoshu      2
#define U_MSG_bobao1      3
#define U_MSG_bobao2      4
#define U_MSG_bobao3      5
#define U_MSG_bobao4      6
#define U_MSG_bobao5      7
#define U_MSG_bobao6      8
#define U_MSG_bobao7      9
#define U_MSG_bobao8      10
#define U_MSG_bobao9      11
#define U_MSG_bobao10      12
#define U_MSG_bobao11      13
#define U_MSG_bobao12      14
#define U_MSG_bobao13      15
#define U_MSG_bobao14      16
#define U_MSG_bobao15      17
#define U_MSG_bobao16      18
#define U_MSG_bobao17      19
#define U_MSG_bobao18      20
#define U_MSG_bobao19      21
#define U_MSG_bobao20      22
#define U_MSG_bobao21      23

// 串口消息参数类型
typedef union {
  double d_double;
  int d_int;
  unsigned char d_ucs[8];
  char d_char;
  unsigned char d_uchar;
  unsigned long d_long;
  short d_short;
  float d_float;}uart_param_t;

// 串口发送函数实现
void _uart_send_impl(unsigned char* buff, int len) {
  // TODO: 调用项目实际的串口发送函数
  for(int i=0;i<len;i++){
    mySerial.write (*buff++);
  }
}

// 串口通信消息尾
const unsigned char g_uart_send_foot[] = {
  0x55, 0xaa
};

// 十六位整数转32位整数
void _int16_to_int32(uart_param_t* param) {
  if (sizeof(int) >= 4)
    return;
  unsigned long value = param->d_long;
  unsigned long sign = (value >> 15) & 1;
  unsigned long v = value;
  if (sign)
    v = 0xFFFF0000 | value;
  uart_param_t p;  p.d_long = v;
  param->d_ucs[0] = p.d_ucs[0];
  param->d_ucs[1] = p.d_ucs[1];
  param->d_ucs[2] = p.d_ucs[2];
  param->d_ucs[3] = p.d_ucs[3];
}

// 浮点数转双精度
void _float_to_double(uart_param_t* param) {
  if (sizeof(int) >= 4)
    return;
  unsigned long value = param->d_long;
  unsigned long sign = value >> 31;
  unsigned long M = value & 0x007FFFFF;
  unsigned long e =  ((value >> 23 ) & 0xFF) - 127 + 1023;
  uart_param_t p0, p1;
  p1.d_long = ((sign & 1) << 31) | ((e & 0x7FF) << 20) | (M >> 3);
  param->d_ucs[0] = p0.d_ucs[0];
  param->d_ucs[1] = p0.d_ucs[1];
  param->d_ucs[2] = p0.d_ucs[2];
  param->d_ucs[3] = p0.d_ucs[3];
  param->d_ucs[4] = p1.d_ucs[0];
  param->d_ucs[5] = p1.d_ucs[1];
  param->d_ucs[6] = p1.d_ucs[2];
  param->d_ucs[7] = p1.d_ucs[3];
}

// 串口通信消息头
const unsigned char g_uart_send_head[] = {
  0xaa, 0x55
};

// 播报函数1
void _uart_bobao1() {
  uart_param_t param;
    int i = 0;
    unsigned char buff[UART_SEND_MAX] = {0};
    for (i = 0; i < UART_MSG_HEAD_LEN; i++) {
        buff[i + 0] = g_uart_send_head[i];
    }
    buff[2] = U_MSG_bobao1;
    for (i = 0; i < UART_MSG_FOOT_LEN; i++) {
        buff[i + 3] = g_uart_send_foot[i];
    }
    _uart_send_impl(buff, 5);
}

// 播报函数2
void _uart_bobao2() {
  uart_param_t param;
    int i = 0;
    unsigned char buff[UART_SEND_MAX] = {0};
    for (i = 0; i < UART_MSG_HEAD_LEN; i++) {
        buff[i + 0] = g_uart_send_head[i];
    }
    buff[2] = U_MSG_bobao2;
    for (i = 0; i < UART_MSG_FOOT_LEN; i++) {
        buff[i + 3] = g_uart_send_foot[i];
    }
    _uart_send_impl(buff, 5);
}
// 播报函数4
void _uart_bobao4() {
  uart_param_t param;
  int i = 0;
  unsigned char buff[UART_SEND_MAX] = {0};
  for (i = 0; i < UART_MSG_HEAD_LEN; i++) {
       buff[i + 0] = g_uart_send_head[i];
    }
  buff[2] = U_MSG_bobao4;
  for (i = 0; i < UART_MSG_FOOT_LEN; i++) {
       buff[i + 3] = g_uart_send_foot[i];
   }
  _uart_send_impl(buff, 5);
}

// 播报函数5
void _uart_bobao5() {
  uart_param_t param;
  int i = 0;
  unsigned char buff[UART_SEND_MAX] = {0};
  for (i = 0; i < UART_MSG_HEAD_LEN; i++) {
       buff[i + 0] = g_uart_send_head[i];
    }
  buff[2] = U_MSG_bobao5;
  for (i = 0; i < UART_MSG_FOOT_LEN; i++) {
       buff[i + 3] = g_uart_send_foot[i];
   }
  _uart_send_impl(buff, 5);
}

// 播报函数19
void _uart_bobao19() {
  uart_param_t param;
  int i = 0;
  unsigned char buff[UART_SEND_MAX] = {0};
  for (i = 0; i < UART_MSG_HEAD_LEN; i++) {
       buff[i + 0] = g_uart_send_head[i];
    }
  buff[2] = U_MSG_bobao19;
  for (i = 0; i < UART_MSG_FOOT_LEN; i++) {
       buff[i + 3] = g_uart_send_foot[i];
   }
  _uart_send_impl(buff, 5);
}

// 播报函数20
void _uart_bobao20() {
  uart_param_t param;
  int i = 0;
  unsigned char buff[UART_SEND_MAX] = {0};
  for (i = 0; i < UART_MSG_HEAD_LEN; i++) {
       buff[i + 0] = g_uart_send_head[i];
    }
  buff[2] = U_MSG_bobao20;
  for (i = 0; i < UART_MSG_FOOT_LEN; i++) {
       buff[i + 3] = g_uart_send_foot[i];
   }
  _uart_send_impl(buff, 5);
}

// 播报函数21
void _uart_bobao21() {
  uart_param_t param;
  int i = 0;
  unsigned char buff[UART_SEND_MAX] = {0};
  for (i = 0; i < UART_MSG_HEAD_LEN; i++) {
       buff[i + 0] = g_uart_send_head[i];
    }
  buff[2] = U_MSG_bobao21;
  for (i = 0; i < UART_MSG_FOOT_LEN; i++) {
       buff[i + 3] = g_uart_send_foot[i];
   }
  _uart_send_impl(buff, 5);
}

// 播报整数
void _uart_bozhensgshu(int zhengshu) {
  uart_param_t param;
    int i = 0;
    unsigned char buff[UART_SEND_MAX] = {0};
    for (i = 0; i < UART_MSG_HEAD_LEN; i++) {
        buff[i + 0] = g_uart_send_head[i];
    }
    buff[2] = U_MSG_bozhensgshu;
    param.d_int = zhengshu;
    _int16_to_int32(&param);
    buff[3] = param.d_ucs[0];
    buff[4] = param.d_ucs[1];
    buff[5] = 0;
    buff[6] = 0;
    for (i = 0; i < UART_MSG_FOOT_LEN; i++) {
        buff[i + 7] = g_uart_send_foot[i];
    }
    _uart_send_impl(buff, 9);
}

void setup(){
   Serial.begin(9600); // 硬件串口（与电脑通信）
   mySerial.begin(9600); // 软件串口（与外设通信）
   Wire.begin(); // 初始化I2C总线
   
   // 初始化LED引脚
   pinMode(LED_PIN, OUTPUT);
   digitalWrite(LED_PIN, LOW);

   // 初始化步进电机的速度
   myStepper.setSpeed(10);
   pinMode(INA, OUTPUT);
   pinMode(INB, OUTPUT);
   
   // 调整旗帜的等待时间
   stopMotor();
   delay(3000);
   
   myservo.attach(ServoPin);   // 将引脚io23上的舵机连接到舵机对象上
   myservo.write(90); // 舵机角度为90°
   delay(1000); // 延时1s
   
   #if defined(__AVR_ATtiny85__) && (F_CPU == 16000000)
     clock_prescale_set(clock_div_1);
   #endif
   strip.begin();           // 初始化新像素条
   strip.show();            // 关闭所有像素
   strip.setBrightness(100); // 设置亮度（最大255）
   
   // 初始化OLED
   display.begin(I2C_ADDRESS, true);
   display.clearDisplay();
   display.setTextSize(1);
   display.setTextColor(SH110X_WHITE);
  
   // 初始化传感器
   aht20.begin();
   ENS160.begin();
   ENS160.setPWRMode(ENS160_STANDARD_MODE);
}

void loop(){
  // 非阻塞电机运行控制
  if (motorRunning && (millis() - motorStartTime >= MOTOR_DURATION)) {
    stopMotor();
    motorRunning = false;
    currentDirection = 0;
  }
  if (millis() - lastUpdate >= updateInterval) {
    lastUpdate = millis();

    Temperature = aht20.getTemperature(); // 直接从AHT20传感器读取温度数据
    Humidity = aht20.getHumidity(); // 直接从AHT20传感器读取湿度数据
    Intensity = analogRead(PhotoresistorPin); // 获取光敏电阻传感器检测的光照强度
    uint8_t Status = ENS160.getENS160Status(); // 获取ENS160传感器工作状态
    uint8_t AQI = ENS160.getAQI(); // 获取ENS160传感器检测的空气质量指数(1-5)
    uint16_t TVOC = ENS160.getTVOC(); // 获取ENS160传感器检测的TVOC浓度(0-65000 ppb)
    uint16_t ECO2 = ENS160.getECO2(); // 获取ENS160传感器检测的等效CO2浓度(400-65000 ppm)
    // 精简的OLED显示更新
    display.clearDisplay();
    display.setTextSize(1);
    display.setCursor(20, 0);
    display.println("Voice-controlled");
    display.setCursor(30, 20);
    display.println("Smart School");
    display.display();
    if (mySerial.available() > 0) {  // 持续检查软串口是否有来自语音模块的数据
      Voice_Control = mySerial.read();  // 读取一个字节的数据
      Serial.println(Voice_Control);   // 将接收到的数据通过硬件串口输出，便于调试和监控
    } 
    if (Voice_Control == 47) { // 判断接收到的指令数值47,并执行相应操作
      delay(2 * 1000);
      _uart_bobao1();
      delay(2 * 1000);
      _uart_bozhensgshu(Temperature); // 语音播报当前检测到的温度值
      delay(2 * 1000);
      _uart_bobao2();
      delay(1 * 1000);
    } else if (Voice_Control == 48) { // 判断接收到的指令数值48,并执行相应操作
      delay(2 * 1000);
      _uart_bobao4();
      delay(2 * 1000);
      _uart_bozhensgshu(Humidity); // 语音播报当前检测到的湿度值
      delay(1 * 1000);
    } else if (Voice_Control == 50) { // 判断接收到的指令数值50,并执行相应操作
      delay(2 * 1000);
      _uart_bobao5();
      delay(2 * 1000);
      _uart_bozhensgshu(Intensity); // 语音播报当前检测到的光照强度值
      delay(1 * 1000);
    } else if (Voice_Control == 65) { // 判断接收到的指令数值65,并执行相应操作
      delay(4 * 1000);
      _uart_bobao19();
      delay(4 * 1000);
      _uart_bozhensgshu(TVOC); // 语音播报当前检测到的总挥发性有机物浓度
      delay(1 * 1000);
    } else if (Voice_Control == 66) {  // 判断接收到的指令数值66,并执行相应操作
      delay(3 * 1000);
      _uart_bobao20();
      delay(3 * 1000);
      _uart_bozhensgshu(ECO2); // 语音播报当前二氧化碳浓度
      delay(1 * 1000);
    } else if (Voice_Control == 67) { // 判断接收到的指令数值67,并执行相应操作
      delay(3 * 1000);
      _uart_bobao21();
      delay(2 * 1000);
      _uart_bozhensgshu(AQI); // 语音播报当前空气质量指数
      delay(1 * 1000);
    } else if (Voice_Control == 1) { // 接收到的数据(命令参数)为1, 并执行相应操作
      digitalWrite(LED_PIN, HIGH); // 打开LED,灯点亮
    } else if (Voice_Control == 2) { // 接收到的数据为2,并执行相应操作
      digitalWrite(LED_PIN, LOW); // 关闭LED
    } else if (Voice_Control == 21) { // 接收到的数据为21,并执行相应操作
      buzzer.playTone(532, 250);  // 蜂鸣器鸣叫
      delay(100);
      buzzer.playTone(0, 0);  // 蜂鸣器不响
      delay(100);
    } else if (Voice_Control == 22) { // 接收到的数据为22,并执行相应操作
      buzzer.playTone(0, 0);   
    } else if (Voice_Control == 59) { // 接收到的数据为59,并执行相应操作
      myservo.write(180); // 舵机转动,开门
      delay(1000);
    } else if (Voice_Control == 60) { // 接收到的数据为60,并执行相应操作
      myservo.write(90); // 舵机转动,关门
      delay(1000);
    } else if (Voice_Control == 62) { // 接收到的数据为62,并执行相应操作
      startMotor(2); // 降旗
    } else if (Voice_Control == 61) { // 接收到的数据为61,并执行相应操作
      startMotor(1); // 升旗
    } else if (Voice_Control == 63) { // 接收到的数据为63,并执行相应操作
      myStepper.step(STEPS_PER_REV * 2); // 拉开窗帘
    } else if (Voice_Control == 64) { // 接收到的数据为64,并执行相应操作
      myStepper.step(STEPS_PER_REV * -2); // 关闭窗帘
    } else if (Voice_Control == 11) { // 接收到的数据为11,并执行相应操作
      birthday(); // 蜂鸣器播放音乐
    } else if (Voice_Control == 12) { // 接收到的数据为12,并执行相应操作
      buzzer.playTone(0, 0); // 蜂鸣器不响
    } else if (Voice_Control == 13) { // 接收到的数据为13,并执行相应操作
      colorWipe(strip.Color(255, 0, 0), 50); // SK6812 RGB灯亮红灯
    } else if (Voice_Control == 14) { // 接收到的数据为14,并执行相应操作
      colorWipe(strip.Color(0, 0, 0), 50); // SK6812 RGB灯熄灭
    } else if (Voice_Control == 15) { // 接收到的数据为15,并执行相应操作
      colorWipe(strip.Color(0, 255, 0), 50);  // SK6812 RGB灯亮绿灯
    } else if (Voice_Control == 16) { // 接收到的数据为16,并执行相应操作
      colorWipe(strip.Color(0, 0, 0), 50);
    } else if (Voice_Control == 17) { // 接收到的数据为17,并执行相应操作
      colorWipe(strip.Color(0, 0, 255), 50); // SK6812 RGB灯亮蓝灯
    } else if (Voice_Control == 18) { // 接收到的数据为18,并执行相应操作
      colorWipe(strip.Color(0, 0, 0), 50);
    }
   // 清除指令，避免重复执行
   Voice_Control = 0; 
  }
}

// 用一种颜色填充灯带
void colorWipe(uint32_t color, int wait) {
  for(int i=0; i<strip.numPixels(); i++) { 
    strip.setPixelColor(i, color); // 设置像素颜色
    strip.show();                  // 更新灯带
    delay(wait);                   // 暂停
  }
}

void startMotor(int direction) {
  stopMotor();     // 停止当前动作
  if (direction == 1) {
    analogWrite(INA, 150);
    analogWrite(INB, 0);
  } else if (direction == 2) {
    analogWrite(INA, 0);
    analogWrite(INB, 150);
  }
  motorRunning = true;
  motorStartTime = millis();
  currentDirection = direction;
}

void stopMotor() {
  analogWrite(INA, 0);
  analogWrite(INB, 0);
}

void birthday() {
  // 演奏生日旋律 - 参数为（频率，持续时间）
  buzzer.playTone(294, 250);  // D4
  buzzer.playTone(440, 250);  // A4
  buzzer.playTone(392, 250);  // G4
  buzzer.playTone(532, 250);  // C5  
  buzzer.playTone(494, 250);  // B4
  buzzer.playTone(392, 250);  // G4
  buzzer.playTone(440, 250);  // A4
  buzzer.playTone(392, 250);  // G4
  buzzer.playTone(587, 250);  // D5
  buzzer.playTone(532, 250);  // C5  
  buzzer.playTone(392, 250);  // G4
  buzzer.playTone(784, 250);  // G5
  buzzer.playTone(659, 250);  // E5
  buzzer.playTone(532, 250);  // C5  
  buzzer.playTone(494, 250);  // B4
  buzzer.playTone(440, 250);  // A4
  buzzer.playTone(698, 250);  // F5
  buzzer.playTone(659, 250);  // E5
  buzzer.playTone(532, 250);  // C5  
  buzzer.playTone(587, 250);  // D5
  buzzer.playTone(532, 500);  // C5   - 长时
  buzzer.playTone(0, 0);      // 关闭蜂鸣器
}