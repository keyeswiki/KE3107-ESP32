#include <WiFi.h>        // 提供ESP32的WiFi连接功能
#include <WebServer.h>   // 提供ESP32的Web服务器功能
#include <ESP32Servo.h>  // 专门用于ESP32的舵机控制库
#include <Adafruit_GFX.h> // 专门用于OLED控制库
#include <Adafruit_SH110X.h> // 专门用于OLED控制库

// 设置WiFi名称和WiFi密码
const char* ssid = "YourWiFiSSID";         // 修改为你自己的WiFi名称
const char* password = "YourWiFiPassword"; // 修改为你自己的WiFi密码

WebServer server(80);
Servo myServo;

// 舵机控制引脚
const int servoPin = 32;

// OLED 配置
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1  // 共享 I2C 重置操作
#define I2C_ADDRESS 0x3C  // 默认0x3C地址

// 创建一个显示对象
Adafruit_SH1106G display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

void handleRoot() {
  // 发送 HTML 页面
  String html = R"rawliteral(
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ESP32 Servo Control</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 400px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
        }
        .btn {
            display: inline-block;
            padding: 15px 30px;
            margin: 10px;
            font-size: 18px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .open-btn {
            background-color: #4CAF50;
            color: white;
        }
        .close-btn {
            background-color: #f44336;
            color: white;
        }
        .btn:hover {
            opacity: 0.9;
        }
        .status {
            margin-top: 20px;
            padding: 10px;
            border-radius: 5px;
            font-weight: bold;
        }
        .open {
            background-color: #d4edda;
            color: #155724;
        }
        .closed {
            background-color: #f8d7da;
            color: #721c24;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>校门控制</h1>
        <button class="btn open-btn" onclick="controlServo(180)">打开校门</button>
        <button class="btn close-btn" onclick="controlServo(90)">关闭校门</button>
        <div id="status" class="status">状态: 不知道</div>
    </div>

    <script>
        function controlServo(angle) {
            // Update status display
            const statusElem = document.getElementById('status');
            statusElem.textContent = angle === 180 ? '状态: 校门开...' : '状态: 校门关...';
            statusElem.className = 'status';
            
            // Send a request to ESP32
            fetch(`/control?angle=${angle}`)
                .then(response => response.text())
                .then(data => {
                    statusElem.textContent = `状态: ${angle === 180 ? '校门开' : '校门关'}`;
                    statusElem.className = `status ${angle === 180 ? 'open' : 'closed'}`;
                })
                .catch(error => {
                    console.error('Error:', error);
                    statusElem.textContent = 'Operation failed. Please try again';
                    statusElem.className = 'status';
                });
        }
    </script>
</body>
</html>
)rawliteral";
  
  server.send(200, "text/html", html);
}

void handleControl() {
  if (server.hasArg("angle")) {
    int angle = server.arg("angle").toInt();
    
    // 控制舵机使其旋转至指定角度
    myServo.write(angle);
    
    // 接收回复
    String message = angle == 180 ? "Door opened" : "Door closed"; // 原始字符串字面量
    server.send(200, "text/plain", message); // 发送HTML响应
    
    Serial.print("Servo rotates to: ");
    Serial.print(angle);
    Serial.println("°");
  } else {
    server.send(400, "text/plain", "参数错误");
  }
}

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

  // 允许 ESP32 使用舵机
  ESP32PWM::allocateTimer(0);
  ESP32PWM::allocateTimer(1);
  ESP32PWM::allocateTimer(2);
  ESP32PWM::allocateTimer(3);
  
  // 连接WiFi
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
  
  // 设置舵机
  myServo.setPeriodHertz(50);    // 标准 50 赫兹舵机系统
  myServo.attach(servoPin, 500, 2400); // 连接到舵机引脚，并设置最小和最大脉冲宽度
  
  // 将舵机的位置初始化至校门关闭状态(90°)
  myServo.write(90);
  
  // 设置路由器
  server.on("/", handleRoot);
  server.on("/control", handleControl);
  
  // 启动服务器
  server.begin();
  Serial.println("HTTP服务器已启动");
}

void loop() {
  server.handleClient();
}