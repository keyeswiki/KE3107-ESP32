//导入相关库文件
#include <SoftwareSerial.h>

// 创建软串口对象：RX引脚为IO25，TX引脚为IO26，用于连接小智语音模块
// 定义小智语音模块的引脚常量
const int RX_PIN = 25; // 引脚 GPIO25 为 RX
const int TX_PIN = 26; // 引脚 GPIO26 为 TX

SoftwareSerial mySerial(RX_PIN, TX_PIN); // 定义软件串口引脚（RX, TX）

// 定义变量用于存储从语音模块接收到的控制码
volatile int Voice_Control = 0;  // 初始化为0，确保首次判断时不触发任何指令

// 定义电机驱动板的引脚常量
const int INA = 5;  //定义B-IA引脚为IO5
const int INB = 13; //定义B-IB引脚为IO13

// 电机控制状态
bool motorRunning = false;
unsigned long motorStartTime = 0;
const unsigned long MOTOR_DURATION = 800;  // 0.8秒
int currentDirection = 0;  // 0:停止, 1:正转, 2:反转

void setup() {
  Serial.begin(9600); // 硬件串口（与电脑通信）
  mySerial.begin(9600); // 软件串口（与外设通信）
  pinMode(INA, OUTPUT); // B-IA为输出模式
  pinMode(INB, OUTPUT); // B-IB为输出模式
  stopMotor();
}

void loop() {
  // 非阻塞电机运行控制
  if (motorRunning && (millis() - motorStartTime >= MOTOR_DURATION)) {
    stopMotor();
    motorRunning = false;
    currentDirection = 0;
  }

  if (mySerial.available()) { // 检查软串口是否有来自语音模块的数据可读
     Voice_Control = mySerial.read(); // 从软串口读取一个字节的数据      
     Serial.println(Voice_Control); // 将接收到的数据通过硬件串口输出到串口监视器，便于调试  
  }
  if (Voice_Control == 61) {  // 根据接收到的指令值61,执行相应操作
  // 当接收到值61时，升旗
    startMotor(1);
  } else if (Voice_Control == 62) {  // 根据接收到的指令值62,执行相应操作
  // 当接收到值62时，降旗
    startMotor(2);
  }
  // 清除指令，避免重复执行
  Voice_Control = 0;
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