#include <WiFi.h>
#include <WebServer.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SH110X.h>

// 设置WiFi名称和WiFi密码
const char* ssid = "YourWiFiSSID";         // 修改为你自己的WiFi名称
const char* password = "YourWiFiPassword"; // 修改为你自己的WiFi密码

WebServer server(80);  // 创建Web服务器对象，端口80

// 光敏电阻连接的引脚
const int lightSensorPin = 34;

// 存储传感器值
int sensorValue = 0;

// OLED 配置
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1  // 共享 I2C 重置操作
#define I2C_ADDRESS 0x3C  // 默认0x3C地址

// 创建一个显示对象
Adafruit_SH1106G display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

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
  
  // 连接WiFi
  WiFi.begin(ssid, password);
  Serial.println("正在连接WiFi...");
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("");
  Serial.println("WiFi已连接");
  Serial.println("IP: ");
  Serial.println(WiFi.localIP());
  display.print("IP: ");
  display.println(WiFi.localIP());
  display.display();

  // 设置路由器
  server.on("/", handleRoot);  // 返回HTML页面
  server.on("/readLight", handleLightRead); // 返回传感器数据
  
  // 启动服务器
  server.begin();
  Serial.println("HTTP服务器已启动.");
}

void loop() {
  server.handleClient();
}

void handleRoot() {
  String html = R"=====(
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ESP32 光敏传感器</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      margin: 0;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    h1 {
      color: #333;
    }
    .sensor-value {
      font-size: 24px;
      margin: 20px 0;
      padding: 10px;
      background-color: #f0f0f0;
      border-radius: 5px;
    }
    button {
      background-color: #4CAF50;
      color: white;
      border: none;
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 10px 2px;
      cursor: pointer;
      border-radius: 5px;
    }
    button:hover {
      background-color: #45a049;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>ESP32 光敏传感器</h1>
    <div class="sensor-value" id="sensorValue">--</div>
    <button onclick="readSensor()">读取传感器数据</button>
    <button onclick="startAutoRead()">自动刷新</button>
    <button onclick="stopAutoRead()">停止自动刷新</button>
  </div>
  
  <script>
    let autoReadInterval;
    
    function readSensor() {
      fetch('/readLight')
        .then(response => response.text())
        .then(data => {
          document.getElementById('sensorValue').innerText = data;
        });
    }
    
    function startAutoRead() {
      stopAutoRead(); // 先停止任何现有的自动刷新
      readSensor();   // 立即读取一次
      autoReadInterval = setInterval(readSensor, 2000); // 每2秒读取一次
    }
    
    function stopAutoRead() {
      if (autoReadInterval) {
        clearInterval(autoReadInterval);
        autoReadInterval = null;
      }
    }
  </script>
</body>
</html>
)=====";

  server.send(200, "text/html", html);
}

void handleLightRead() {
  sensorValue = analogRead(lightSensorPin);  // 读取光照值
  String valueStr = String(sensorValue);
  server.send(200, "text/plain", valueStr); // 返回纯文本数据
  Serial.println("光照强度: " + valueStr);
}