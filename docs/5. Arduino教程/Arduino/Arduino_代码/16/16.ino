#include <WiFi.h>
#include <WebServer.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SH110X.h>

// 设置WiFi名称和WiFi密码
const char* ssid = "YourWiFiSSID";     // 替换为你自己的WiFi名称
const char* password = "YourWiFiPassword"; // 替换为你自己的WiFi密码

// OLED 配置
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1  // 共享 I2C 重置操作
#define I2C_ADDRESS 0x3C  // 默认0x3C地址

// 定义LED引脚
const int ledPin = 12;  // GPIO12

WebServer server(80);  // 创建Web服务器对象，端口80

// 创建一个显示对象
Adafruit_SH1106G display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

// HTML网页内容（中文版）
const char* htmlContent = R"rawliteral(
<!DOCTYPE HTML>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ESP32 LED 控制</title>
  <style>
    body { 
      font-family: Arial, sans-serif; 
      text-align: center; 
      margin: 0 auto; 
      padding-top: 50px; 
    }
    .button {
      padding: 10px 20px;
      font-size: 16px;
      margin: 10px;
      cursor: pointer;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
    }
    .button-off {
      background-color: #f44336;
    }
  </style>
</head>
<body>
  <h1>ESP32 LED 控制</h1>
  <p>LED 状态：<span id="ledState">%LEDSTATE%</span></p>
  <p>
    <button class="button" onclick="controlLED('ON')">LED 开</button>
    <button class="button button-off" onclick="controlLED('OFF')">LED 关</button>
  </p>
  <script>
    function controlLED(state) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "/" + state, true);
      xhr.send();
      
      // 更新页面状态显示
      document.getElementById("ledState").innerHTML = (state === 'ON') ? '开' : '关';
    }
  </script>
</body>
</html>
)rawliteral";

void handleRoot() {
  // 获取当前LED状态，返回中文
  String ledState = (digitalRead(ledPin)) ? "开" : "关";  // 读取LED状态
  
  // 替换HTML中的占位符
  String html = htmlContent;
  html.replace("%LEDSTATE%", ledState); // 动态更新网页中的LED状态
  
  server.send(200, "text/html", html); // 发送网页给客户端
}

void handleLEDOn() {
  digitalWrite(ledPin, HIGH);  // 打开LED
  server.send(200, "text/plain", "LED已开启");
}

void handleLEDOff() {
  digitalWrite(ledPin, LOW);  // 关闭LED
  server.send(200, "text/plain", "LED已关闭");
}

void handleNotFound() {
  server.send(404, "text/plain", "404: Not found");
}

void setup() {
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW);  // 初始关闭LED
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
  Serial.println("已连接Wi-Fi.");
  Serial.println("IP: ");
  Serial.println(WiFi.localIP());
  display.print("IP: ");
  display.println(WiFi.localIP());
  display.display();
  
  // 设置路由器
  server.on("/", handleRoot);
  server.on("/ON", handleLEDOn);
  server.on("/OFF", handleLEDOff);
  server.onNotFound(handleNotFound);
  
  // 启动服务器
  server.begin();
  Serial.println("HTTP服务器已启动.");
}

void loop() {
  server.handleClient();  // 处理客户端请求
}