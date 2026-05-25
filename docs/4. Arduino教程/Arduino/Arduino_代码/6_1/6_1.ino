const int obstacle_avoidance = 18; // 定义避障传感器引脚
int val = 0; // 定义变量val

void setup() {
  Serial.begin(9600);   
  pinMode(obstacle_avoidance, INPUT);    
}

void loop() {
  val = digitalRead(obstacle_avoidance);  //读取数字电平
  Serial.print(val);  //打印读取的电平信号
  if (val == 0) {  //障碍物检测
    Serial.println("\t 检测到障碍物");
    delay(100);
  }
  else {  //未发现障碍物
    Serial.println("\t 未检测到障碍物");
    delay(100);
  }
}