#include <WiFi.h>
#include <WebServer.h>
#include <Wire.h>
#include <AHT20.h>
#include <Stepper.h>
#include <ESP32Servo.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SH110X.h>
#include <Adafruit_NeoPixel.h>


// 设置WiFi名称和WiFi密码
const char* ssid = "YourWiFiSSID";         // 修改为你自己的WiFi名称
const char* password = "YourWiFiPassword"; // 修改为你自己的WiFi密码

// OLED 配置
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1  // 共享 I2C 重置操作
#define I2C_ADDRESS 0x3C  // 默认0x3C地址

// 定义引脚
#define LIGHT_SENSOR_PIN 34
#define LED_PIN 12
#define RGB_LED_PIN 4
#define SERVO_PIN 32

// 配置 RGB
#define RGB_LED_COUNT 4
Adafruit_NeoPixel rgbLeds(RGB_LED_COUNT, RGB_LED_PIN, NEO_GRB + NEO_KHZ800);

// 创建一个显示对象
Adafruit_SH1106G display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

// 设置步进电机
const int STEPS_PER_REV = 2038;  // 每回合的实际步数
const int MOTOR_PIN1 = 14;       // IN1
const int MOTOR_PIN2 = 27;       // IN2  
const int MOTOR_PIN3 = 16;       // IN3
const int MOTOR_PIN4 = 17;       // IN4

// 设置蜂鸣器连接至GPIO19（必须是支持PWM的引脚）
const int BUZZER_PIN = 19; 

// 设置电机驱动板的引脚
const int MOTOR_IB = 13;  // B-IB
const int MOTOR_IA = 5;   // B-IA

// 初始化步进电机（请注意引脚顺序：IN1 - IN3 - IN2 - IN4）
Stepper myStepper(STEPS_PER_REV, MOTOR_PIN1, MOTOR_PIN3, MOTOR_PIN2, MOTOR_PIN4);

// 舵机
Servo myservo;
int servoAngle = 90;

// 传感器实例
AHT20 aht20;

// 网络服务器实例
WebServer server(80);

// 设置 RGB亮白灯
void setRGBWhite() {
  for (int i = 0; i < RGB_LED_COUNT; i++) {
    rgbLeds.setPixelColor(i, rgbLeds.Color(255, 255, 255));
  }
  rgbLeds.show();
}

// 关闭RGB
void setRGBOff() {
  for (int i = 0; i < RGB_LED_COUNT; i++) {
    rgbLeds.setPixelColor(i, rgbLeds.Color(0, 0, 0));
  }
  rgbLeds.show();
}

void setup() {
  Serial.begin(9600);

  // 初始化LED引脚
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);
  
  // 初始化 SK6812 RGB 灯带
  rgbLeds.begin();
  rgbLeds.setBrightness(100);
  setRGBOff(); // SK6812 RGB初始状态是关闭的。
  
  // 初始化步进电机的速度
  myStepper.setSpeed(10);
  
  // 初始化电机驱动板
  pinMode(MOTOR_IA, OUTPUT);
  pinMode(MOTOR_IB, OUTPUT);
  digitalWrite(MOTOR_IA, LOW); // 不转
  digitalWrite(MOTOR_IB, LOW);
  
  // 初始化无源蜂鸣器
  pinMode(BUZZER_PIN, OUTPUT);
  
  // 初始化舵机
  myservo.attach(SERVO_PIN);
  myservo.write(servoAngle);

  Wire.begin(); // 初始化I2C总线
  
  // 检查 AHT20 是否连接正确
  if (aht20.begin() == false) {
    Serial.println("AHT20 not detected. Please check wiring.");
    while (1);
  }
  Serial.println("AHT20 acknowledged");

  // 初始化 OLED
  if(!display.begin(I2C_ADDRESS, true)) {  // 真正的分辨率是 128x64
    Serial.println("SH1106初始化失败");
    while(1);  // 陷入困境且无法继续前进
  }

  // 清空屏幕并设置文本属性
  display.clearDisplay();
  display.setTextSize(1);      // 文本尺寸
  display.setTextColor(SH110X_WHITE);  // 单色显示
  display.setCursor(0, 0);   // 设定起始位置（中心位置）

  // 连接 Wi-Fi
  WiFi.begin(ssid, password);
  Serial.print("正在连接WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("已连接Wi-Fi.");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());
  display.print("IP: ");
  display.println(WiFi.localIP());
  display.display();

  // 设置服务路由器
  server.on("/", handleRoot);       // 根路径
  server.on("/data", handleData);   // 数据 API 路径
  server.on("/control", handleControl); // 控制路径

  // 启动服务器
  server.begin();
  Serial.println("HTTP服务器已启动.");
}

void loop() {
  server.handleClient();  // 处理客户请求
}

// 处理根路径请求
void handleRoot() {
  String html = R"=====(
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>WIFI智慧学校控制系统</title>
  <style>
    body { 
      font-family: Arial, sans-serif; 
      text-align: center; 
      margin: 0; 
      padding: 20px; 
      background: #f0f8ff;
    }
    .container { 
      max-width: 1000px; 
      margin: 0 auto; 
      background: white; 
      padding: 20px; 
      border-radius: 10px; 
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    h1 { 
      color: #2c3e50; 
      margin-bottom: 20px;
    }
    .dashboard {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin: 20px 0;
    }
    .card {
      background: #f9f9f9;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .card h2 {
      color: #3498db;
      margin-top: 0;
      margin-bottom: 15px;
    }
    .value {
      font-size: 28px;
      font-weight: bold;
      color: #2c3e50;
      margin: 10px 0;
    }
    .btn {
      padding: 12px 20px;
      margin: 5px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
    }
    .btn-on {
      background: #2ecc71;
      color: white;
    }
    .btn-off {
      background: #e74c3c;
      color: white;
    }
    .update-time {
      color: #95a5a6;
      margin-top: 20px;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>WiFi智慧学校控制系统</h1>
    
    <div class="dashboard">
      <div class="card">
        <h2>温度监测</h2>
        <div class="value" id="temperature">--</div>
      </div>
      
      <div class="card">
        <h2>湿度监测</h2>
        <div class="value" id="humidity">--</div>
      </div>
      
      <div class="card">
        <h2>光照强度</h2>
        <div class="value" id="light-value">--</div>
      </div>
      
      <div class="card">
        <h2>路灯</h2>
        <div>
          <button class="btn btn-on" onclick="controlDevice('led', 'on')">打开</button>
          <button class="btn btn-off" onclick="controlDevice('led', 'off')">关闭</button>
        </div>
      </div>
      
      <div class="card">
        <h2>教室灯</h2>
        <div>
          <button class="btn btn-on" onclick="controlDevice('rgb', 'on')">亮白灯</button>
          <button class="btn btn-off" onclick="controlDevice('rgb', 'off')">关闭</button>
        </div>
      </div>
      
      <div class="card">
        <h2>窗帘控制</h2>
        <div>
          <button class="btn btn-on" onclick="controlDevice('stepper', 'forward')">拉开窗帘</button>
          <button class="btn btn-off" onclick="controlDevice('stepper', 'reverse')">关闭窗帘</button>
        </div>
      </div>
      
      <div class="card">
        <h2>校门控制</h2>
        <div>
          <button class="btn btn-on" onclick="controlDevice('servo', '180')">开门</button>
          <button class="btn btn-off" onclick="controlDevice('servo', '90')">关门</button>
        </div>
      </div>

      <div class="card">
        <h2>课堂铃声</h2>
        <div>
          <button class="btn btn-on" onclick="controlDevice('buzzer', 'on')">铃响</button>
          <button class="btn btn-off" onclick="controlDevice('buzzer', 'off')">不响</button>
        </div>
      </div>
      
      <div class="card">
        <h2>降旗控制</h2>
        <div>
          <button class="btn btn-on" onclick="controlDevice('motor1', 'on')">降旗</button>
          <button class="btn btn-off" onclick="controlDevice('motor1', 'off')">停止</button>
        </div>
      </div>
     
      <div class="card">
        <h2>升旗控制</h2>
        <div>
          <button class="btn btn-on" onclick="controlDevice('motor2', 'on')">升旗</button>
          <button class="btn btn-off" onclick="controlDevice('motor2', 'off')">停止</button>
        </div>
      </div>
    </div>
          
    <p class="update-time">最新更新:  <span id="update-time">--</span></p>
  </div>

  <script>
    function controlDevice(device, state) {
      fetch('/control?device=' + device + '&state=' + state)
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Control error:', error));
    }

    function refreshData() {
      fetch('/data')
        .then(response => response.json())
        .then(data => {
          document.getElementById('temperature').innerHTML = data.temperature.toFixed(1) + ' &deg;C';
          document.getElementById('humidity').textContent = data.humidity.toFixed(0) + '%';
          document.getElementById('light-value').textContent = data.light;
          
          const now = new Date();
          document.getElementById('update-time').textContent = now.toLocaleTimeString();
        })
        .catch(error => console.error('Obtain dara failed:', error));
    }
    
    // Obtain data when the page is loading
    window.onload = refreshData;
    
    // Refresh the data every 2 seconds
    setInterval(refreshData, 2000);
  </script>
</body>
</html>
)=====";

  server.send(200, "text/html", html);
}

// 处理数据 API 请求
void handleData() {
  // 获取传感器数据
  float temperature = 0;
  float humidity = 0;
  int lightValue = 0;
  
  // 直接从 AHT20 传感器读取数据
  temperature = aht20.getTemperature();
  humidity = aht20.getHumidity();
  
  lightValue = analogRead(LIGHT_SENSOR_PIN);

  // 创建一个 JSON 响应
  String json = "{";
  json += "\"temperature\":" + String(temperature) + ",";
  json += "\"humidity\":" + String(humidity) + ",";
  json += "\"light\":" + String(lightValue);
  json += "}";
  
  server.send(200, "application/json", json);
}

// 处理控制请求
void handleControl() {
  if (server.hasArg("device") && server.hasArg("state")) {
    String device = server.arg("device");
    String state = server.arg("state");
    
    if (device == "led") {
      if (state == "on") {
        digitalWrite(LED_PIN, HIGH);
        server.send(200, "text/plain", "OK");
      } else if (state == "off") {
        digitalWrite(LED_PIN, LOW);
        server.send(200, "text/plain", "OK");
      }
    }
    else if (device == "rgb") {
      if (state == "on") {
        setRGBWhite();
        server.send(200, "text/plain", "OK");
      } else if (state == "off") {
        setRGBOff();
        server.send(200, "text/plain", "OK");
      }
    }
    else if (device == "stepper") {
      if (state == "forward") {
        // 正向旋转 2 圈
        myStepper.step(STEPS_PER_REV * 2);
        server.send(200, "text/plain", "OK");
      } else if (state == "reverse") {
        // 反向旋转 2 圈
        myStepper.step(STEPS_PER_REV * -2);
        server.send(200, "text/plain", "OK");
      }
    }
    else if (device == "servo") {
      servoAngle = state.toInt();
      myservo.write(servoAngle);
      delay(100);
      server.send(200, "text/plain", "OK");
    }
    else if (device == "buzzer") {
      if (state == "on") {
        tone(BUZZER_PIN, 1000);  // 频率1000Hz
        delay(100);  
        server.send(200, "text/plain", "OK");
      } else if (state == "off") {
        noTone(BUZZER_PIN);
        server.send(200, "text/plain", "OK");
      }
    }
    else if (device == "motor1") {
      if (state == "on") {
        analogWrite(MOTOR_IA, 0); // 反转
        analogWrite(MOTOR_IB, 150);
        delay(800);
        analogWrite(MOTOR_IA, 0); // 不转
        analogWrite(MOTOR_IB, 0);
        server.send(200, "text/plain", "OK");
      } else if (state == "off") {
        analogWrite(MOTOR_IA, 0); // 不转
        analogWrite(MOTOR_IB, 0);
        server.send(200, "text/plain", "OK");
      }
    }
    else if (device == "motor2") {
      if (state == "on") {
        analogWrite(MOTOR_IA, 150); // 正转
        analogWrite(MOTOR_IB, 0);
        delay(800);
        analogWrite(MOTOR_IA, 0); // 不转
        analogWrite(MOTOR_IB, 0);
        server.send(200, "text/plain", "OK");
      } else if (state == "off") {
        analogWrite(MOTOR_IA, 0); // 不转
        analogWrite(MOTOR_IB, 0);
        server.send(200, "text/plain", "OK");
      }
    }
  }
}