// 导入库文件
#include <SoftwareSerial.h>
#include <DFRobot_ENS160.h>
#include <Wire.h>
#include <AHT20.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SH110X.h>

 // 定义光敏电阻传感器引脚
const int PhotoresistorPin = 34;

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
const unsigned long updateInterval = 1000; // 1秒更新间隔

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
   if(millis() - lastUpdate >= updateInterval) {
     lastUpdate = millis();
    
     Temperature = aht20.getTemperature();  // 直接从AHT20传感器读取温度数据
     Humidity = aht20.getHumidity();  // 直接从AHT20传感器读取湿度数据
     Intensity = analogRead(PhotoresistorPin);  // 获取光敏电阻传感器检测的光照强度
     uint8_t Status = ENS160.getENS160Status();  // 获取ENS160传感器工作状态
     uint8_t AQI = ENS160.getAQI();  // 获取ENS160传感器检测的空气质量指数(1-5)
     uint16_t TVOC = ENS160.getTVOC();  // 获取ENS160传感器检测的TVOC浓度(0-65000 ppb)
     uint16_t ECO2 = ENS160.getECO2();  // 获取ENS160传感器检测的等效CO2浓度(400-65000 ppm)
    
     // 更新显示
     display.clearDisplay();
     // OLED 对应位置(0, 0)显示AQI
     display.setCursor(0, 0);
     display.print("AQI:");
     display.print(AQI);
     // OLED 对应位置(0, 10)显示TVOC
     display.setCursor(0, 10);
     display.print("TVOC:");
     display.print(TVOC);
     display.println("ppm");
     // OLED 对应位置(0, 20)显示eCO2
     display.setCursor(0, 20);
     display.print("eCO2:");
     display.print(ECO2);
     display.println("ppb");
     // OLED 对应位置(0, 30)显示温度
     display.setCursor(0, 30);
     display.print("Temp:");
     display.print(Temperature);
     display.cp437(true);
     display.write(248); // °符号
     display.println("C");
     // OLED 对应位置(0, 40)显示湿度
     display.setCursor(0, 40);
     display.print("Humid:");
     display.print(Humidity);
     display.println("%");
     // OLED 对应位置(0, 50)显示光照强度
     display.setCursor(0, 50);
     display.print("Light:");
     display.print(Intensity);
     display.println("Lux");
    
     display.display();
   
    if (mySerial.available() > 0) {  // 持续检查软串口是否有来自语音模块的数据
      Voice_Control = mySerial.read();  // 读取多个字节的数据
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
      _uart_bozhensgshu(Humidity);  // 语音播报当前检测到的湿度值
      delay(1 * 1000);
    } else if (Voice_Control == 50) { // 判断接收到的指令数值50,并执行相应操作
      delay(3 * 1000);
      _uart_bobao5();
      delay(2 * 1000);
      _uart_bozhensgshu(Intensity); // 语音播报当前检测到的光照强度值
      delay(1 * 1000);
    } else if (Voice_Control == 65) { // 判断接收到的指令数值65,并执行相应操作
      delay(4 * 1000);
      _uart_bobao19();
      delay(4 * 1000);
      _uart_bozhensgshu(TVOC);  // 语音播报当前检测到的总挥发性有机物浓度
      delay(1 * 1000);
    } else if (Voice_Control == 66) { // 判断接收到的指令数值66,并执行相应操作
      delay(3 * 1000);
      _uart_bobao20();
      delay(3 * 1000);
      _uart_bozhensgshu(ECO2);  // 语音播报当前二氧化碳浓度
      delay(1 * 1000);
    } else if (Voice_Control == 67) { // 判断接收到的指令数值67,并执行相应操作
      delay(3 * 1000);
      _uart_bobao21();
      delay(3 * 1000);
      _uart_bozhensgshu(AQI); // 语音播报当前空气质量指数
      delay(1 * 1000);
    } 
    // 清除指令，避免重复执行
    Voice_Control = 0; 
  }
}


