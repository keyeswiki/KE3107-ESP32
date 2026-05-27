#include <Stepper.h>    // 步进电机控制库
#include <WiFi.h>       // ESP32 WiFi功能库
#include <WebServer.h>  // 网页服务器库
#include <Adafruit_GFX.h> // OLED库
#include <Adafruit_SH110X.h>

// 电机参数（28BYJ-48）
const int STEPS_PER_REV = 2038;  // 实际步数/圈
const int MOTOR_PIN1 = 14;       // IN1
const int MOTOR_PIN2 = 27;       // IN2
const int MOTOR_PIN3 = 16;       // IN3
const int MOTOR_PIN4 = 17;       // IN4

// 固定参数
const int motorSpeed = 10;      // 固定转速10rpm
const int rotationCount = 2;    // 固定旋转2圈

// 设置WiFi名称和WIFI密码
const char* ssid = "YourWiFiSSID";         // 修改为你自己的WiFi名称
const char* password = "YourWiFiPassword"; // 修改为你自己的WiFi密码

// 初始化步进电机（请注意引脚顺序：IN1 - IN3 - IN2 - IN4）
Stepper myStepper(STEPS_PER_REV, MOTOR_PIN1, MOTOR_PIN3, MOTOR_PIN2, MOTOR_PIN4);

// OLED 配置
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1  // 共享 I2C 重置操作
#define I2C_ADDRESS 0x3C  // 默认0x3C地址

// 创建一个显示对象
Adafruit_SH1106G display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

WebServer server(80);  // 在端口80上创建Web服务器

void setup() {
  Serial.begin(9600);
  
  Wire.begin(); // 初始化I2C总线
  
  // 初始化 OLED
  if(!display.begin(I2C_ADDRESS, true)) {  // 真正的分辨率是 128x64
    Serial.println("SH1106初始化失败");
    while(1);  // 陷入困境且无法继续前进
  }

  // 清空屏幕并设置文本属性
  display.clearDisplay();
  display.setTextSize(1);      // 文本尺寸
  display.setTextColor(SH110X_WHITE);  // 单色显示
  display.setCursor(0, 0);   // 设定起始位置

  // 连接到 WiFi
  WiFi.begin(ssid, password);
  Serial.print("正在连接WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("已连接Wi-Fi.");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP()); // 打印获取到的IP地址
  display.print("IP: ");
  display.println(WiFi.localIP()); // OLED显示获取到的IP地址
  display.display();
  
  // 设置路由器
  server.on("/", handleRoot);
  server.on("/forward", []() {
    rotateMotor(rotationCount, false);
    server.send(200, "text/plain", "");
  });
  server.on("/reverse", []() {
    rotateMotor(rotationCount, true);
    server.send(200, "text/plain", "");
  });
  
  server.begin();
  Serial.println("HTTP服务器已启动.");
}

void loop() {
  server.handleClient();
}

// 电机旋转功能
void rotateMotor(int turns, bool reverse) {
  myStepper.setSpeed(motorSpeed);
  int steps = STEPS_PER_REV * turns * (reverse ? -1 : 1);
  myStepper.step(steps);
}

// 网页界面（中文版）
void handleRoot() {
  String html = R"=====(
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ESP32 窗帘控制</title>
  <style>
    body { 
      font-family: Arial; 
      text-align: center; 
      margin: 0 auto; 
      padding: 20px; 
      max-width: 400px;
    }
    .control-panel {
      margin: 20px auto;
      padding: 20px;
      background: #f5f5f5;
      border-radius: 10px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .btn {
      display: inline-block;
      padding: 12px 24px;
      margin: 10px;
      background: #3498db;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      border: none;
      font-size: 16px;
      cursor: pointer;
      transition: background 0.3s;
    }
    .btn:hover {
      background: #2980b9;
    }
    .btn-reverse {
      background: #e74c3c;
    }
    .btn-reverse:hover {
      background: #c0392b;
    }
  </style>
</head>
<body>
  <div class="control-panel">
    <h2>ESP32 窗帘控制</h2>
    <p>固定设置：转速 10 转/分钟，每次 2 圈</p>
    <button class="btn" onclick="controlMotor('forward')">拉开窗帘</button>
    <button class="btn btn-reverse" onclick="controlMotor('reverse')">关闭窗帘</button>
  </div>

  <script>
    function controlMotor(direction) {
      fetch('/' + direction)
        .catch(err => console.log('请求失败', err));
    }
  </script>
</body>
</html>
)=====";
  
  server.send(200, "text/html", html);
}