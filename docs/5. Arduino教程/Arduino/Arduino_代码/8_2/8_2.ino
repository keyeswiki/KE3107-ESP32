// 引入SoftwareSerial库，用于创建软串口
#include <SoftwareSerial.h>

// 创建软串口对象：RX引脚为IO25、TX引脚为IO26, 用于连接语音识别模块
// 定义引脚常量
const int RX_PIN = 25; // 引脚 IO25 为 RX
const int TX_PIN = 26; // 引脚 IO26 为 TX

SoftwareSerial mySerial(RX_PIN, TX_PIN); // 定义软件串口引脚(RX, TX)

// 定义变量用于存储从语音模块接收到的控制码
volatile int Voice_Control = 0;  // 初始化为0, 确保首次判断时不触发任何指令

const int buzzerPin = 19;     // 蜂鸣器模块连接引脚为19
const int ledPin = 12;       // 定义LED的GPIO引脚为12

void setup() {
  // 初始化硬件串口，用于调试输出
  Serial.begin(9600);
  // 初始化软串口，用于连接语音模块
  mySerial.begin(9600);
  //设置引脚的模式
  pinMode(buzzerPin,OUTPUT);
  pinMode(ledPin,OUTPUT);
}

void loop() {
  if (mySerial.available()) {  // 检查软串口是否有来自语音模块的数据可读
    Voice_Control = mySerial.read();  // 从软串口读取多个字节的数据
    Serial.println(Voice_Control);  // 将接收到的数据通过硬件串口输出到串口监视器，便于调试
  } 
  if (Voice_Control == 68){  // 根据接收到的指令值21,执行相应操作
     digitalWrite(ledPin,HIGH);  // LED点亮
     tone(buzzerPin,100);    // 蜂鸣器鸣叫
     delay(100);
  } else if(Voice_Control == 22){  // 根据接收到的指令值22,执行相应操作
     noTone(buzzerPin);  // 蜂鸣器不响
     digitalWrite(ledPin,LOW);  // LED熄灭
  }
  // 清除指令，避免重复执行
  Voice_Control = 0;
}