/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/block.js":
/*!*****************************!*\
  !*** ./src/blocks/block.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Button_readState": () => (/* binding */ Button_readState),
/* harmony export */   "Button_readValue": () => (/* binding */ Button_readValue),
/* harmony export */   "LED_setLEDState": () => (/* binding */ LED_setLEDState),
/* harmony export */   "aht20_read": () => (/* binding */ aht20_read),
/* harmony export */   "bbrgbLedStrip_init": () => (/* binding */ bbrgbLedStrip_init),
/* harmony export */   "buzzer_music": () => (/* binding */ buzzer_music),
/* harmony export */   "buzzer_notone": () => (/* binding */ buzzer_notone),
/* harmony export */   "buzzer_tone_d": () => (/* binding */ buzzer_tone_d),
/* harmony export */   "ens160_read": () => (/* binding */ ens160_read),
/* harmony export */   "infrared_readValue": () => (/* binding */ infrared_readValue),
/* harmony export */   "ks_servo_angle": () => (/* binding */ ks_servo_angle),
/* harmony export */   "led_analog": () => (/* binding */ led_analog),
/* harmony export */   "lightSensor_readValue": () => (/* binding */ lightSensor_readValue),
/* harmony export */   "motor130": () => (/* binding */ motor130),
/* harmony export */   "oled_clear": () => (/* binding */ oled_clear),
/* harmony export */   "oled_image": () => (/* binding */ oled_image),
/* harmony export */   "oled_init": () => (/* binding */ oled_init),
/* harmony export */   "oled_print": () => (/* binding */ oled_print),
/* harmony export */   "oled_refresh": () => (/* binding */ oled_refresh),
/* harmony export */   "oled_setCursor": () => (/* binding */ oled_setCursor),
/* harmony export */   "oled_setText": () => (/* binding */ oled_setText),
/* harmony export */   "pir_readValue": () => (/* binding */ pir_readValue),
/* harmony export */   "rc522_init": () => (/* binding */ rc522_init),
/* harmony export */   "rc522_read": () => (/* binding */ rc522_read),
/* harmony export */   "rgbLedStrip_clear": () => (/* binding */ rgbLedStrip_clear),
/* harmony export */   "rgbLedStrip_color": () => (/* binding */ rgbLedStrip_color),
/* harmony export */   "rgbLedStrip_fill": () => (/* binding */ rgbLedStrip_fill),
/* harmony export */   "rgbLedStrip_setBrightness": () => (/* binding */ rgbLedStrip_setBrightness),
/* harmony export */   "rgbLedStrip_setPixelColor": () => (/* binding */ rgbLedStrip_setPixelColor),
/* harmony export */   "rgbLedStrip_show": () => (/* binding */ rgbLedStrip_show),
/* harmony export */   "stepper_init": () => (/* binding */ stepper_init),
/* harmony export */   "stepper_step": () => (/* binding */ stepper_step),
/* harmony export */   "wifi_client_connected": () => (/* binding */ wifi_client_connected),
/* harmony export */   "wifi_client_init": () => (/* binding */ wifi_client_init),
/* harmony export */   "wifi_init": () => (/* binding */ wifi_init),
/* harmony export */   "wifi_read_data": () => (/* binding */ wifi_read_data),
/* harmony export */   "wifi_read_ip": () => (/* binding */ wifi_read_ip),
/* harmony export */   "wifi_send_data": () => (/* binding */ wifi_send_data)
/* harmony export */ });
/* harmony import */ var blockly_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! blockly/core */ "blockly/core");
/* harmony import */ var blockly_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(blockly_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var profile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! profile */ "profile");
/* harmony import */ var profile__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(profile__WEBPACK_IMPORTED_MODULE_1__);



// 各分类颜色（HSV 色相值）
const HUE_LED      = 200;   // 蓝色   - LED 灯
const HUE_RGB      = 160;   // 青绿色 - RGB 灯带
const HUE_BUZZER   = 45;    // 橙黄色 - 蜂鸣器
const HUE_SENSOR   = 120;   // 绿色   - 传感器（按钮/PIR/红外/光线/AHT20/ENS160）
const HUE_MOTOR    = 0;     // 红色   - 舵机 & 电机 & 步进电机
const HUE_RFID     = 280;   // 紫色   - RFID
const HUE_OLED     = 230;   // 深蓝色 - OLED 屏幕
const HUE_WIFI     = 20;    // 橙色   - WiFi

// ==================== LED ====================
const LED_setLEDState = {
    init: function () {
        this.setColour(HUE_LED);
        this.appendDummyInput("")
            .appendField("设置 LED");
        this.appendValueInput("pin")
            .appendField("引脚 #")
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField("输出")
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldDropdown([[blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.Kids_ON, "HIGH"], [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.Kids_OFF, "LOW"]]), "state");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

const led_analog = {
    init: function () {
        this.setColour(HUE_LED);
        this.appendDummyInput("")
            .appendField("LED 模拟输出");
        this.appendValueInput("PIN")
            .appendField("引脚 #")
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField("通道")
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldDropdown([
                ['CH0 (LT0)', '0'], ['CH1 (LT0)', '1'], ['CH2 (LT1)', '2'], ['CH3 (LT1)', '3'],
                ['CH4 (LT2)', '4'], ['CH5 (LT2)', '5'], ['CH6 (LT3)', '6'], ['CH7 (LT3)', '7'],
                ['CH8 (HT0)', '8'], ['CH9 (HT0)', '9'], ['CH10 (HT1)', '10'], ['CH11 (HT1)', '11'],
                ['CH12 (HT2)', '12'], ['CH13 (HT2)', '13'], ['CH14 (HT3)', '14'], ['CH15 (HT3)', '15']
            ]), "CH");
        this.appendValueInput("VAL")
            .appendField("值")
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

// ==================== RGB LED Strip ====================
const bbrgbLedStrip_init = {
    init: function () {
        this.setColour(HUE_RGB);
        this.appendDummyInput("")
            .appendField("初始化 RGB 灯带");
        this.appendValueInput("PIN")
            .appendField("引脚 #")
            .setCheck(Number);
        this.appendValueInput("LEN")
            .appendField("灯数")
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

const rgbLedStrip_setPixelColor = {
    init: function () {
        this.setColour(HUE_RGB);
        this.appendDummyInput("")
            .appendField("设置像素");
        this.appendValueInput("NO")
            .appendField("灯号 #")
            .setCheck(Number);
        this.appendValueInput("COLOR")
            .appendField("颜色")
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

const rgbLedStrip_fill = {
    init: function () {
        this.setColour(HUE_RGB);
        this.appendDummyInput("")
            .appendField("填充像素");
        this.appendValueInput("FIRST")
            .appendField("从灯号 #")
            .setCheck(Number);
        this.appendValueInput("COUNT")
            .appendField("共")
            .setCheck(Number);
        this.appendValueInput("COLOR")
            .appendField("颜色")
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

const rgbLedStrip_color = {
    init: function () {
        this.setColour(HUE_RGB);
        this.appendDummyInput("")
            .appendField("RGB 颜色");
        this.appendValueInput("R")
            .appendField("R")
            .setCheck(Number);
        this.appendValueInput("G")
            .appendField("G")
            .setCheck(Number);
        this.appendValueInput("B")
            .appendField("B")
            .setCheck(Number);
        this.setInputsInline(true);
        this.setOutput(true, Number);
    }
};

const rgbLedStrip_setBrightness = {
    init: function () {
        this.setColour(HUE_RGB);
        this.appendDummyInput("")
            .appendField("设置亮度");
        this.appendValueInput("BRT")
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

const rgbLedStrip_clear = {
    init: function () {
        this.setColour(HUE_RGB);
        this.appendDummyInput("")
            .appendField("清除所有像素");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

const rgbLedStrip_show = {
    init: function () {
        this.setColour(HUE_RGB);
        this.appendDummyInput("")
            .appendField("刷新显示");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

// ==================== Buzzer ====================
const buzzer_tone_d = {
    init: function () {
        this.setColour(HUE_BUZZER);
        this.appendDummyInput("")
            .appendField("播放音调");
        this.appendValueInput("PIN")
            .appendField("引脚 #")
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField("音调")
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldDropdown([
                ['NOTE_C3', '131'], ['NOTE_D3', '147'], ['NOTE_E3', '165'], ['NOTE_F3', '175'],
                ['NOTE_G3', '196'], ['NOTE_A3', '220'], ['NOTE_B3', '247'], ['NOTE_C4', '262'],
                ['NOTE_D4', '294'], ['NOTE_E4', '330'], ['NOTE_F4', '349'], ['NOTE_G4', '392'],
                ['NOTE_A4', '440'], ['NOTE_B4', '494'], ['NOTE_C5', '532'], ['NOTE_D5', '587'],
                ['NOTE_E5', '659'], ['NOTE_F5', '698'], ['NOTE_G5', '784'], ['NOTE_A5', '880'],
                ['NOTE_B5', '988']
            ]), "fre");
        this.appendValueInput("dur")
            .appendField("节拍")
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

const buzzer_music = {
    init: function () {
        this.setColour(HUE_BUZZER);
        this.appendDummyInput("")
            .appendField("播放音乐");
        this.appendValueInput("PIN")
            .appendField("引脚 #")
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldDropdown([
                ['生日快乐', 'Music.birthday();'],
                ['俄罗斯方块', 'Music.tetris();'],
                ['欢乐颂', 'Music.Ode_to_Joy();'],
                ['圣诞节', 'Music.christmas();'],
                ['超级马里奥', 'Music.super_mario();'],
                ['星球大战', 'Music.star_war_tone();']
            ]), "mus");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

const buzzer_notone = {
    init: function () {
        this.setColour(HUE_BUZZER);
        this.appendDummyInput("")
            .appendField("停止音调");
        this.appendValueInput("PIN")
            .appendField("引脚 #")
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

// ==================== Button ====================
const Button_readState = {
    init: function () {
        this.setColour(HUE_SENSOR);
        this.appendDummyInput("")
            .appendField("按钮");
        this.appendValueInput("pin")
            .appendField("引脚 #")
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField("是否被按下？");
        this.setInputsInline(true);
        this.setOutput(true, Boolean);
    }
};

const Button_readValue = {
    init: function () {
        this.setColour(HUE_SENSOR);
        this.appendDummyInput("")
            .appendField("读取按钮状态");
        this.appendValueInput("pin")
            .appendField("引脚 #")
            .setCheck(Number);
        this.setInputsInline(true);
        this.setOutput(true, Number);
    }
};

// ==================== PIR ====================
const pir_readValue = {
    init: function () {
        this.setColour(HUE_SENSOR);
        this.appendDummyInput("")
            .appendField("读取 PIR 传感器");
        this.appendValueInput("pin")
            .appendField("引脚 #")
            .setCheck(Number);
        this.setInputsInline(true);
        this.setOutput(true, Boolean);
    }
};

// ==================== Infrared ====================
const infrared_readValue = {
    init: function () {
        this.setColour(HUE_SENSOR);
        this.appendDummyInput("")
            .appendField("读取避障传感器");
        this.appendValueInput("pin")
            .appendField("引脚 #")
            .setCheck(Number);
        this.setInputsInline(true);
        this.setOutput(true, Boolean);
    }
};

// ==================== Light Sensor ====================
const lightSensor_readValue = {
    init: function () {
        this.setColour(HUE_SENSOR);
        this.appendDummyInput("")
            .appendField("读取光线值");
        this.appendValueInput("pin")
            .appendField("引脚 #")
            .setCheck(Number);
        this.setInputsInline(true);
        this.setOutput(true, Number);
    }
};

// ==================== AHT20 ====================
const aht20_read = {
    init: function () {
        this.setColour(HUE_SENSOR);
        this.appendDummyInput("")
            .appendField("读取 AHT20")
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldDropdown([
                ['温度', 'aht20.getTemperature()'],
                ['湿度', 'aht20.getHumidity()']
            ]), "data");
        this.setOutput(true, Number);
    }
};

// ==================== ENS160 ====================
const ens160_read = {
    init: function () {
        this.setColour(HUE_SENSOR);
        this.appendDummyInput("")
            .appendField("读取空气质量")
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldDropdown([
                ['AQI 空气质量指数', 'myENS.getAQI()'],
                ['TVOC 挥发有机物', 'myENS.getTVOC()'],
                ['eCO2 二氧化碳', 'myENS.getECO2()']
            ]), "unit");
        this.setOutput(true, Number);
    }
};

// ==================== Servo ====================
const ks_servo_angle = {
    init: function () {
        this.setColour(HUE_MOTOR);
        this.appendDummyInput("")
            .appendField("舵机");
        this.appendValueInput("pin")
            .appendField("引脚 #")
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField("通道")
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldDropdown([
                ['CH0 (LT0)', '0'], ['CH1 (LT0)', '1'], ['CH2 (LT1)', '2'], ['CH3 (LT1)', '3'],
                ['CH4 (LT2)', '4'], ['CH5 (LT2)', '5'], ['CH6 (LT3)', '6'], ['CH7 (LT3)', '7'],
                ['CH8 (HT0)', '8'], ['CH9 (HT0)', '9'], ['CH10 (HT1)', '10'], ['CH11 (HT1)', '11'],
                ['CH12 (HT2)', '12'], ['CH13 (HT2)', '13'], ['CH14 (HT3)', '14'], ['CH15 (HT3)', '15']
            ]), "CH");
        this.appendValueInput("angle")
            .appendField("角度")
            .setCheck(Number);
        this.appendValueInput("time")
            .appendField("延时(ms)")
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

// ==================== Motor 130 ====================
const motor130 = {
    init: function () {
        this.setColour(HUE_MOTOR);
        this.appendDummyInput("")
            .appendField("电机");
        this.appendValueInput("IN1")
            .appendField("INA 引脚 #")
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField("电平")
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldDropdown([
                ['LOW', 'LOW'],
                ['HIGH', 'HIGH']
            ]), "state1");
        this.appendValueInput("IN2")
            .appendField("INB 引脚 #")
            .setCheck(Number);
        this.appendValueInput("SPEED2")
            .appendField("模拟值")
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

// ==================== Stepper Motor 28BYJ-48 ====================
const stepper_init = {
    init: function () {
        this.setColour(HUE_MOTOR);
        this.appendDummyInput("")
            .appendField("初始化步进电机 28BYJ-48");
        this.appendValueInput("IN1")
            .appendField("IN1 #")
            .setCheck(Number);
        this.appendValueInput("IN2")
            .appendField("IN2 #")
            .setCheck(Number);
        this.appendValueInput("IN3")
            .appendField("IN3 #")
            .setCheck(Number);
        this.appendValueInput("IN4")
            .appendField("IN4 #")
            .setCheck(Number);
        this.appendValueInput("steps")
            .appendField("每转步数")
            .setCheck(Number);
        this.appendValueInput("speed")
            .appendField("速度")
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

const stepper_step = {
    init: function () {
        this.setColour(HUE_MOTOR);
        this.appendDummyInput("")
            .appendField("步进电机运转");
        this.appendValueInput("stepsNum")
            .appendField("步数")
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

// ==================== RC522 RFID ====================
const rc522_init = {
    init: function () {
        this.setColour(HUE_RFID);
        this.appendDummyInput("")
            .appendField("初始化 RFID");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

const rc522_read = {
    init: function () {
        this.setColour(HUE_RFID);
        this.appendDummyInput("")
            .appendField("读取 RFID 卡片值");
        this.setOutput(true, String);
    }
};

// ==================== OLED ====================
const oled_init = {
    init: function () {
        this.setColour(HUE_OLED);
        this.appendDummyInput("")
            .appendField("初始化 OLED 屏幕");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

const oled_setText = {
    init: function () {
        this.setColour(HUE_OLED);
        this.appendDummyInput("")
            .appendField("设置字体大小")
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldDropdown([
                ['6x8', '1'], ['12x16', '2'], ['18x24', '3'], ['24x32', '4'],
                ['30x40', '5'], ['36x48', '6'], ['42x56', '7'], ['48x64', '8']
            ]), "SIZE");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

const oled_setCursor = {
    init: function () {
        this.setColour(HUE_OLED);
        this.appendDummyInput("")
            .appendField("设置光标");
        this.appendValueInput("X")
            .appendField("X")
            .setCheck(Number);
        this.appendValueInput("Y")
            .appendField("Y")
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

const oled_print = {
    init: function () {
        this.setColour(HUE_OLED);
        this.appendDummyInput("")
            .appendField("OLED 打印");
        this.appendValueInput("DATA")
            .setCheck([String, Number]);
        this.appendDummyInput("")
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldDropdown([
                ['换行', 'warp'],
                ['不换行', 'noWarp']
            ]), "EOL");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

const oled_image = {
    init: function () {
        this.setColour(HUE_OLED);
        this.appendDummyInput("")
            .appendField("OLED 显示图像")
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldDropdown([
                ['❤ 爱心', 'heart'], ['∩_∩ 笑脸', 'smile'], ['T_T 哭脸', 'cry'],
                ['↑ 上箭头', 'arrow_up'], ['↓ 下箭头', 'arrow_down'],
                ['← 左箭头', 'arrow_light'], ['→ 右箭头', 'arrow_right']
            ]), "IMAGE");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

const oled_clear = {
    init: function () {
        this.setColour(HUE_OLED);
        this.appendDummyInput("")
            .appendField("清除 OLED");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

const oled_refresh = {
    init: function () {
        this.setColour(HUE_OLED);
        this.appendDummyInput("")
            .appendField("刷新 OLED");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

// ==================== WiFi ====================
const wifi_init = {
    init: function () {
        this.setColour(HUE_WIFI);
        this.appendDummyInput("")
            .appendField("连接 WiFi");
        this.appendValueInput("SSID")
            .appendField("SSID 名称")
            .setCheck(String);
        this.appendValueInput("PASSWD")
            .appendField("密码")
            .setCheck(String);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

const wifi_read_ip = {
    init: function () {
        this.setColour(HUE_WIFI);
        this.appendDummyInput("")
            .appendField("WiFi 读取 IP");
        this.setOutput(true, String);
    }
};

const wifi_client_init = {
    init: function () {
        this.setColour(HUE_WIFI);
        this.appendDummyInput("")
            .appendField("WiFi 初始化客户端");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

const wifi_client_connected = {
    init: function () {
        this.setColour(HUE_WIFI);
        this.appendDummyInput("")
            .appendField("WiFi 客户端未连接");
        this.setOutput(true, Boolean);
    }
};

const wifi_read_data = {
    init: function () {
        this.setColour(HUE_WIFI);
        this.appendDummyInput("")
            .appendField("WiFi 读取数据");
        this.setOutput(true, String);
    }
};

const wifi_send_data = {
    init: function () {
        this.setColour(HUE_WIFI);
        this.appendDummyInput("")
            .appendField("WiFi 发送数据");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};


/***/ }),

/***/ "./src/generators/generator.js":
/*!*************************************!*\
  !*** ./src/generators/generator.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Button_readState": () => (/* binding */ Button_readState),
/* harmony export */   "Button_readValue": () => (/* binding */ Button_readValue),
/* harmony export */   "LED_setLEDState": () => (/* binding */ LED_setLEDState),
/* harmony export */   "aht20_read": () => (/* binding */ aht20_read),
/* harmony export */   "bbrgbLedStrip_init": () => (/* binding */ bbrgbLedStrip_init),
/* harmony export */   "buzzer_music": () => (/* binding */ buzzer_music),
/* harmony export */   "buzzer_notone": () => (/* binding */ buzzer_notone),
/* harmony export */   "buzzer_tone_d": () => (/* binding */ buzzer_tone_d),
/* harmony export */   "ens160_read": () => (/* binding */ ens160_read),
/* harmony export */   "infrared_readValue": () => (/* binding */ infrared_readValue),
/* harmony export */   "ks_servo_angle": () => (/* binding */ ks_servo_angle),
/* harmony export */   "led_analog": () => (/* binding */ led_analog),
/* harmony export */   "lightSensor_readValue": () => (/* binding */ lightSensor_readValue),
/* harmony export */   "motor130": () => (/* binding */ motor130),
/* harmony export */   "oled_clear": () => (/* binding */ oled_clear),
/* harmony export */   "oled_image": () => (/* binding */ oled_image),
/* harmony export */   "oled_init": () => (/* binding */ oled_init),
/* harmony export */   "oled_print": () => (/* binding */ oled_print),
/* harmony export */   "oled_refresh": () => (/* binding */ oled_refresh),
/* harmony export */   "oled_setCursor": () => (/* binding */ oled_setCursor),
/* harmony export */   "oled_setText": () => (/* binding */ oled_setText),
/* harmony export */   "pir_readValue": () => (/* binding */ pir_readValue),
/* harmony export */   "rc522_init": () => (/* binding */ rc522_init),
/* harmony export */   "rc522_read": () => (/* binding */ rc522_read),
/* harmony export */   "rgbLedStrip_clear": () => (/* binding */ rgbLedStrip_clear),
/* harmony export */   "rgbLedStrip_color": () => (/* binding */ rgbLedStrip_color),
/* harmony export */   "rgbLedStrip_fill": () => (/* binding */ rgbLedStrip_fill),
/* harmony export */   "rgbLedStrip_setBrightness": () => (/* binding */ rgbLedStrip_setBrightness),
/* harmony export */   "rgbLedStrip_setPixelColor": () => (/* binding */ rgbLedStrip_setPixelColor),
/* harmony export */   "rgbLedStrip_show": () => (/* binding */ rgbLedStrip_show),
/* harmony export */   "stepper_init": () => (/* binding */ stepper_init),
/* harmony export */   "stepper_step": () => (/* binding */ stepper_step),
/* harmony export */   "wifi_client_connected": () => (/* binding */ wifi_client_connected),
/* harmony export */   "wifi_client_init": () => (/* binding */ wifi_client_init),
/* harmony export */   "wifi_init": () => (/* binding */ wifi_init),
/* harmony export */   "wifi_read_data": () => (/* binding */ wifi_read_data),
/* harmony export */   "wifi_read_ip": () => (/* binding */ wifi_read_ip),
/* harmony export */   "wifi_send_data": () => (/* binding */ wifi_send_data)
/* harmony export */ });
// LED
const LED_setLEDState = function (block, generator) {
    const pin = generator.valueToCode(block, 'pin', generator.ORDER_ATOMIC) || '0';
    const state = block.getFieldValue('state');
    generator.setups_[`Led_init_${pin}`] = `pinMode(${pin}, OUTPUT);`;
    return `digitalWrite(${pin}, ${state});\n`;
};

const led_analog = function (block, generator) {
    const pin = generator.valueToCode(block, 'PIN', generator.ORDER_ATOMIC) || '0';
    const val = generator.valueToCode(block, 'VAL', generator.ORDER_ATOMIC) || '0';
    const ch = block.getFieldValue('CH') || '1';
    generator.setups_[`led_ch_${pin}_${ch}`] = `ledcSetup(${ch}, 490, 8);\nledcAttachPin(${pin}, ${ch});`;
    return `ledcWrite(${ch}, ${val});\n`;
};

// RGB LED Strip
const bbrgbLedStrip_init = function (block, generator) {
    const len = generator.valueToCode(block, 'LEN', generator.ORDER_ATOMIC) || '4';
    const pin = generator.valueToCode(block, 'PIN', generator.ORDER_ATOMIC) || '26';
    generator.definitions_['include_Adafruit_NeoPixel'] = `#include <Adafruit_NeoPixel.h>`;
    generator.definitions_.rgbLedStrip_init = `Adafruit_NeoPixel ledStrip(${len}, ${pin}, NEO_GRB + NEO_KHZ800);`;
    generator.setups_.rgbLedStrip_begin = `ledStrip.begin();`;
    return '';
};

const rgbLedStrip_setPixelColor = function (block, generator) {
    const no = generator.valueToCode(block, 'NO', generator.ORDER_ATOMIC) || '0';
    const colour = generator.valueToCode(block, 'COLOR', generator.ORDER_ATOMIC) || '0';
    return `ledStrip.setPixelColor(${no}, ${colour});\n`;
};

const rgbLedStrip_fill = function (block, generator) {
    const first = generator.valueToCode(block, 'FIRST', generator.ORDER_ATOMIC) || '0';
    const count = generator.valueToCode(block, 'COUNT', generator.ORDER_ATOMIC) || '3';
    const colour = generator.valueToCode(block, 'COLOR', generator.ORDER_ATOMIC) || '0';
    return `ledStrip.fill(${colour}, ${first}, ${count});\n`;
};

const rgbLedStrip_color = function (block, generator) {
    const r = generator.valueToCode(block, 'R', generator.ORDER_ATOMIC) || '255';
    const g = generator.valueToCode(block, 'G', generator.ORDER_ATOMIC) || '255';
    const b = generator.valueToCode(block, 'B', generator.ORDER_ATOMIC) || '255';
    return [`ledStrip.Color(${r}, ${g}, ${b})`, generator.ORDER_ATOMIC];
};

const rgbLedStrip_setBrightness = function (block, generator) {
    const brightness = generator.valueToCode(block, 'BRT', generator.ORDER_ATOMIC) || '255';
    return `ledStrip.setBrightness(${brightness});\n`;
};

const rgbLedStrip_clear = function () {
    return `ledStrip.clear();\n`;
};

const rgbLedStrip_show = function () {
    return `ledStrip.show();\n`;
};

// Buzzer
const buzzer_tone_d = function (block, generator) {
    const pin = generator.valueToCode(block, 'PIN', generator.ORDER_ATOMIC) || '25';
    const fre = block.getFieldValue('fre');
    const dur = generator.valueToCode(block, 'dur', generator.ORDER_ATOMIC) || '131';
    generator.setups_[`buzzer_${pin}`] = `pinMode(${pin}, OUTPUT);`;
    return `tone((uint8_t)(${pin}), ${fre}, ${dur});\n`;
};

const buzzer_music = function (block, generator) {
    const pin = generator.valueToCode(block, 'PIN', generator.ORDER_ATOMIC) || '25';
    const mus = block.getFieldValue('mus');
    generator.definitions_['include_music_init'] = `#include <ESP32Tone.h>\n#include <musicESP32.h>`;
    generator.definitions_[`music_${pin}`] = `music Music(${pin});`;
    generator.setups_[`buzzer_${pin}`] = `pinMode(${pin}, OUTPUT);`;
    return `${mus}\n`;
};

const buzzer_notone = function (block, generator) {
    const pin = generator.valueToCode(block, 'PIN', generator.ORDER_ATOMIC) || '25';
    generator.setups_[`buzzer_${pin}`] = `pinMode(${pin}, OUTPUT);`;
    return `noTone((uint8_t)(${pin}));\n`;
};

// Button
const Button_readState = function (block, generator) {
    const pin = generator.valueToCode(block, 'pin', generator.ORDER_ATOMIC) || '3';
    generator.setups_[`Button_init_${pin}`] = `pinMode(${pin}, INPUT);`;
    return [`(digitalRead(${pin}) == 1)`, generator.ORDER_ATOMIC];
};

const Button_readValue = function (block, generator) {
    const pin = generator.valueToCode(block, 'pin', generator.ORDER_ATOMIC) || '3';
    generator.setups_[`Button_init_${pin}`] = `pinMode(${pin}, INPUT);`;
    return [`digitalRead(${pin})`, generator.ORDER_ATOMIC];
};

// PIR
const pir_readValue = function (block, generator) {
    const pin = generator.valueToCode(block, 'pin', generator.ORDER_ATOMIC) || '3';
    generator.setups_[`pir_init_${pin}`] = `pinMode(${pin}, INPUT);`;
    return [`digitalRead(${pin})`, generator.ORDER_ATOMIC];
};

// Infrared
const infrared_readValue = function (block, generator) {
    const pin = generator.valueToCode(block, 'pin', generator.ORDER_ATOMIC) || '3';
    generator.setups_[`ir_init_${pin}`] = `pinMode(${pin}, INPUT);`;
    return [`digitalRead(${pin})`, generator.ORDER_ATOMIC];
};

// Light Sensor
const lightSensor_readValue = function (block, generator) {
    const pin = generator.valueToCode(block, 'pin', generator.ORDER_ATOMIC) || '33';
    return [`analogRead(${pin})`, generator.ORDER_ATOMIC];
};

// AHT20
const aht20_read = function (block, generator) {
    generator.definitions_['include_aht20_init'] = `#include <Wire.h>\n#include <AHT20.h>`;
    generator.definitions_[`aht20`] = `AHT20 aht20;`;
    generator.setups_['aht20_getdata'] = `Wire.begin();\naht20.begin();`;
    const data = block.getFieldValue('data');
    return [`${data}`, generator.ORDER_ATOMIC];
};

// ENS160
const ens160_read = function (block, generator) {
    generator.definitions_['include_ens160_init'] = `#include <ENS160.h>\n#include <Wire.h>`;
    generator.definitions_[`ens160_1`] = `ENS160 myENS;`;
    generator.setups_['ens160_setup'] = `Wire.begin();\nif (myENS.begin()) {\n  myENS.setOperatingMode(SFE_ENS160_STANDARD);\n} else {\n  while (1) Serial.println("Comm fail!");\n}`;
    const unit = block.getFieldValue('unit');
    return [`${unit}`, generator.ORDER_ATOMIC];
};

// Servo
const ks_servo_angle = function (block, generator) {
    const pin = generator.valueToCode(block, 'pin', generator.ORDER_ATOMIC) || '5';
    const angle = generator.valueToCode(block, 'angle', generator.ORDER_ATOMIC) || '90';
    const time = generator.valueToCode(block, 'time', generator.ORDER_ATOMIC) || '200';
    const ch = block.getFieldValue('CH') || '1';
    generator.definitions_[`servo_func_${pin}`] = `int set_angle_${pin}(int angle) {\n  int servo_angle = map(angle, 0, 180, 25, 128);\n  return servo_angle;\n}`;
    generator.setups_[`servo_init_${pin}_${ch}`] = `ledcSetup(${ch}, 50, 10);\nledcAttachPin(${pin}, ${ch});`;
    return `ledcWrite(${ch}, set_angle_${pin}(${angle}));\ndelay(${time});\n`;
};

// Motor 130
const motor130 = function (block, generator) {
    const pin1 = generator.valueToCode(block, 'IN1', generator.ORDER_ATOMIC) || '18';
    const pin2 = generator.valueToCode(block, 'IN2', generator.ORDER_ATOMIC) || '19';
    const state1 = block.getFieldValue('state1');
    const val2 = generator.valueToCode(block, 'SPEED2', generator.ORDER_ATOMIC) || '255';
    const ch = '1';
    generator.setups_[`motor130_${pin1}_${pin2}`] = `pinMode(${pin1}, OUTPUT);\nledcSetup(${ch}, 490, 8);\nledcAttachPin(${pin2}, ${ch});`;
    return `digitalWrite(${pin1}, ${state1});\nledcWrite(${ch}, ${val2});\n`;
};

// Stepper Motor 28BYJ-48
const stepper_init = function (block, generator) {
    const IN1 = generator.valueToCode(block, 'IN1', generator.ORDER_ATOMIC) || '8';
    const IN2 = generator.valueToCode(block, 'IN2', generator.ORDER_ATOMIC) || '9';
    const IN3 = generator.valueToCode(block, 'IN3', generator.ORDER_ATOMIC) || '10';
    const IN4 = generator.valueToCode(block, 'IN4', generator.ORDER_ATOMIC) || '11';
    const steps = generator.valueToCode(block, 'steps', generator.ORDER_ATOMIC) || '2048';
    const speed = generator.valueToCode(block, 'speed', generator.ORDER_ATOMIC) || '10';
    generator.definitions_['include_stepper'] = `#include <Stepper.h>`;
    generator.definitions_['stepper_def'] = `Stepper mystepper(${steps}, ${IN1}, ${IN3}, ${IN2}, ${IN4});`;
    generator.setups_['stepper_setup'] = `mystepper.setSpeed(${speed});`;
    return '';
};

const stepper_step = function (block, generator) {
    const stepNum = generator.valueToCode(block, 'stepsNum', generator.ORDER_ATOMIC) || '0';
    return `mystepper.step(${stepNum});\n`;
};

// RC522
const rc522_init = function (block, generator) {
    generator.definitions_['include_rc522_init'] = `#include <Wire.h>\n#include <MFRC522_I2C.h>`;
    generator.definitions_[`rc522_var`] = `MFRC522 mfrc522(0x28);\nString rfid_str = "";`;
    generator.definitions_[`rc522_data_func`] = `String return_rfid_data() {\n  if ( ! mfrc522.PICC_IsNewCardPresent() || ! mfrc522.PICC_ReadCardSerial() ) {\n    delay(50);\n    return "0";\n  }\n  rfid_str = "";\n  for (byte i = 0; i < mfrc522.uid.size; i++) {\n    rfid_str = rfid_str + String(mfrc522.uid.uidByte[i], HEX);\n  }\n  return rfid_str;\n}`;
    generator.setups_['rc522_setup'] = `Wire.begin();\nmfrc522.PCD_Init();`;
    return '';
};

const rc522_read = function (block, generator) {
    return [`return_rfid_data()`, generator.ORDER_ATOMIC];
};

// OLED
const oled_init = function (block, generator) {
    generator.definitions_['include_oled_init'] = `#include <GyverOLED.h>\n#include "img.h"`;
    generator.definitions_['oled_init'] = `GyverOLED<SSH1106_128x64> oled;`;
    generator.setups_['oled_init'] = `oled.init();`;
    return '';
};

const oled_setText = function (block, generator) {
    const size = block.getFieldValue('SIZE');
    return `oled.setScale(${size});\n`;
};

const oled_setCursor = function (block, generator) {
    const x = generator.valueToCode(block, 'X', generator.ORDER_ATOMIC) || '0';
    const y = generator.valueToCode(block, 'Y', generator.ORDER_ATOMIC) || '0';
    return `oled.setCursor(${x}, ${y});\n`;
};

const oled_print = function (block, generator) {
    const data = generator.valueToCode(block, 'DATA', generator.ORDER_ATOMIC) || '""';
    const eol = block.getFieldValue('EOL');
    if (eol === 'warp') {
        return `oled.println(${data});\n`;
    }
    return `oled.print(${data});\n`;
};

const oled_image = function (block, generator) {
    const image = block.getFieldValue('IMAGE');
    return `oled.drawBitmap(0, 0, (${image}), 128, 64);\n`;
};

const oled_clear = function (block, generator) {
    return `oled.clear();\n`;
};

const oled_refresh = function (block, generator) {
    return `oled.update();\n`;
};

// WiFi
const wifi_init = function (block, generator) {
    const ssid = generator.valueToCode(block, 'SSID', generator.ORDER_ATOMIC) || '""';
    const passwd = generator.valueToCode(block, 'PASSWD', generator.ORDER_ATOMIC) || '""';
    generator.definitions_['include_wifi_init'] = `#include <WiFi.h>\n#include <ESPmDNS.h>\n#include <WiFiClient.h>`;
    generator.definitions_['wifi_init'] = `const char* ssid = ${ssid};\nconst char* password = ${passwd};`;
    generator.setups_['wifi_setup'] = `WiFi.begin(ssid, password);\n   while (WiFi.status() != WL_CONNECTED) {\n   delay(500);}`;
    return '';
};

const wifi_read_ip = function (block, generator) {
    return [`WiFi.localIP().toString()`, generator.ORDER_ATOMIC];
};

const wifi_client_init = function (block, generator) {
    return `WiFiClient client = server.available();\n`;
};

const wifi_client_connected = function (block, generator) {
    generator.definitions_['wifi_client_connected'] = `WiFiServer server(80);`;
    generator.setups_['wifi_client_connected'] = `server.begin();`;
    return [`(client)`, generator.ORDER_ATOMIC];
};

const wifi_read_data = function (block, generator) {
    return [`request`, generator.ORDER_ATOMIC];
};

const wifi_send_data = function (block, generator) {
    generator.definitions_['include_dht'] = `#include <DHT.h>`;
    generator.definitions_['wifi_send_data'] = `DHT dht_1(17, 11);`;
    generator.setups_['wifi_send_data'] =
        `pinMode(27, OUTPUT);\n` +
        `pinMode(35, INPUT);\n` +
        `pinMode(34, INPUT);\n` +
        `pinMode(32, INPUT);\n` +
        `pinMode(33, INPUT);\n` +
        `pinMode(19, OUTPUT);\n` +
        `dht_1.begin();`;
    generator.definitions_[`dataHandle_`] =
        `String dataHandle(int data) {\n` +
        `  int percentage = (data / 4095.0) * 100;\n` +
        `  char hexString[3];\n` +
        `  sprintf(hexString, "%02X", percentage);\n` +
        `  return hexString;\n` +
        `}`;
    return (
        `String request = "";\n` +
        `if (client.available()) {\n` +
        `  request = client.readStringUntil('s');\n` +
        `}\n` +
        `String dataBuffer = "";\n` +
        `dataBuffer += String((int(dht_1.readTemperature())), HEX);\n` +
        `dataBuffer += String((int(dht_1.readHumidity())), HEX);\n` +
        `dataBuffer += dataHandle(analogRead(32) * 1.8);\n` +
        `dataBuffer += dataHandle(analogRead(34));\n` +
        `dataBuffer += dataHandle(analogRead(33) * 1.8);\n` +
        `dataBuffer += dataHandle(analogRead(35));\n` +
        `client.print(dataBuffer);\n` +
        `delay(500);\n`
    );
};


/***/ }),

/***/ "./src/language/en.js":
/*!****************************!*\
  !*** ./src/language/en.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EnCatgories": () => (/* binding */ EnCatgories),
/* harmony export */   "EnMsg": () => (/* binding */ EnMsg)
/* harmony export */ });
const EnMsg = {};

EnMsg.LED_SET_LED_STATE = 'Set LED pin output';
EnMsg.LED_ANALOG = 'LED analog output pin';
EnMsg.BBRGBLEDSTRIP_INIT = 'Init RGB strip pin';
EnMsg.BBRGBLEDSTRIP_SETPIXELCOLOR = 'Set pixel color';
EnMsg.BBRGBLEDSTRIP_FILL = 'Fill pixels with color';
EnMsg.BBRGBLEDSTRIP_COLOR = 'RGB color R G B';
EnMsg.BBRGBLEDSTRIP_SETBRIGHTNESS = 'Set brightness';
EnMsg.BBRGBLEDSTRIP_CLEAR = 'Clear all';
EnMsg.BBRGBLEDSTRIP_SHOW = 'Refresh';
EnMsg.BUZZER_TONE_D = 'Play tone pin frequency beat';
EnMsg.BUZZER_MUSIC = 'Music pin play';
EnMsg.BUZZER_NOTONE = 'Stop tone pin';
EnMsg.BUTTON_READ_STATE = 'Is button on interface pressed?';
EnMsg.BUTTON_READ_VALUE = 'Read button state on interface';
EnMsg.PIR_READ_VALUE = 'Read PIR sensor on interface';
EnMsg.INFRARED_READ_VALUE = 'Read obstacle sensor on interface';
EnMsg.LIGHTSENSOR_READ_VALUE = 'Read light value on interface';
EnMsg.AHT20_READ = 'Read AHT20 temperature/humidity';
EnMsg.ENS160_READ = 'Read air quality value';
EnMsg.KS_SERVO_ANGLE = 'Servo pin channel angle delay(ms)';
EnMsg.MOTOR130 = 'Motor INA pin level INB pin analog value';
EnMsg.STEPPER_INIT = 'Init Stepper 28BYJ-48';
EnMsg.STEPPER_STEP = 'Stepper run';
EnMsg.STEPPER_STEPS_PER_REV = 'Steps/Rev';
EnMsg.STEPPER_STEPS_NUM = 'Steps';
EnMsg.RC522_INIT = 'Init RFID';
EnMsg.RC522_READ = 'Read card value';
EnMsg.OLED_INIT = 'Init OLED screen';
EnMsg.OLED_SETTEXT = 'Set font size';
EnMsg.OLED_SETCURSOR = 'Set cursor x y';
EnMsg.OLED_PRINT = 'Print';
EnMsg.OLED_EOL_WARP = 'Wrap';
EnMsg.OLED_EOL_NOWARP = 'No wrap';
EnMsg.OLED_IMAGE = 'OLED display image';
EnMsg.OLED_CLEAR = 'Clear OLED';
EnMsg.OLED_REFRESH = 'Refresh OLED';
EnMsg.WIFI_INIT = 'Connect WiFi';
EnMsg.WIFI_READ_IP = 'WiFi read IP';
EnMsg.WIFI_CLIENT_INIT = 'WiFi init client';
EnMsg.WIFI_CLIENT_CONNECTED = 'WiFi client not connected';
EnMsg.WIFI_READ_DATA = 'WiFi read data';
EnMsg.WIFI_SEND_DATA = 'WiFi send data';

// Extension-specific keys
EnMsg.Kids_ON = 'HIGH';
EnMsg.Kids_OFF = 'LOW';
EnMsg.MIXLY_CHANNEL = 'Channel';
EnMsg.MIXLY_VALUE2 = 'Set to';
EnMsg.MIXLY_RGB_NUM = 'LED No. #';
EnMsg.MIXLY_RGB_COUNT = 'LED Count';
EnMsg.MIXLY_RGB_COLOR = 'Color';
EnMsg.kids_tone = 'Tone';
EnMsg.kids_beat = 'Beat';

const EnCatgories = {};

EnCatgories.smart_school = 'ESP32 Smart School';
EnCatgories.smart_school_led = 'LED';
EnCatgories.smart_school_rgb = 'RGB Strip';
EnCatgories.smart_school_buzzer = 'Buzzer';
EnCatgories.smart_school_sensor = 'Sensors';
EnCatgories.smart_school_motor = 'Servo & Motor';
EnCatgories.smart_school_stepper = 'Stepper Motor';
EnCatgories.smart_school_rfid = 'RFID';
EnCatgories.smart_school_oled = 'OLED Screen';
EnCatgories.smart_school_wifi = 'WiFi';


/***/ }),

/***/ "./src/language/zh-hans.js":
/*!*********************************!*\
  !*** ./src/language/zh-hans.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZhHansCatgories": () => (/* binding */ ZhHansCatgories),
/* harmony export */   "ZhHansMsg": () => (/* binding */ ZhHansMsg)
/* harmony export */ });
const ZhHansMsg = {};

ZhHansMsg.LED_SET_LED_STATE = '设置 LED 灯接口 引脚 输出';
ZhHansMsg.LED_ANALOG = 'LED 模拟输出 引脚';
ZhHansMsg.BBRGBLEDSTRIP_INIT = '初始化 RGB 灯带 引脚';
ZhHansMsg.BBRGBLEDSTRIP_SETPIXELCOLOR = '设置像素颜色';
ZhHansMsg.BBRGBLEDSTRIP_FILL = '从像素开始填充颜色';
ZhHansMsg.BBRGBLEDSTRIP_COLOR = 'RGB 颜色 R G B';
ZhHansMsg.BBRGBLEDSTRIP_SETBRIGHTNESS = '设置亮度';
ZhHansMsg.BBRGBLEDSTRIP_CLEAR = '清除所有';
ZhHansMsg.BBRGBLEDSTRIP_SHOW = '刷新显示';
ZhHansMsg.BUZZER_TONE_D = '播放音调 引脚 频率 节拍';
ZhHansMsg.BUZZER_MUSIC = '音乐 引脚 播放音乐';
ZhHansMsg.BUZZER_NOTONE = '停止音调 引脚';
ZhHansMsg.BUTTON_READ_STATE = '接口上的按钮是否被按下？';
ZhHansMsg.BUTTON_READ_VALUE = '读取接口上的按钮状态值';
ZhHansMsg.PIR_READ_VALUE = '读取接口 PIR 传感器';
ZhHansMsg.INFRARED_READ_VALUE = '读取接口避障传感器';
ZhHansMsg.LIGHTSENSOR_READ_VALUE = '读取接口光线值';
ZhHansMsg.AHT20_READ = '读取 AHT20 温湿度';
ZhHansMsg.ENS160_READ = '读取空气质量值';
ZhHansMsg.KS_SERVO_ANGLE = '舵机 引脚 通道 角度 延时(ms)';
ZhHansMsg.MOTOR130 = '电机 INA 引脚 电平 INB 引脚 模拟输出值';
ZhHansMsg.STEPPER_INIT = '初始化步进电机 28BYJ-48';
ZhHansMsg.STEPPER_STEP = '步进电机运转';
ZhHansMsg.STEPPER_STEPS_PER_REV = '每转步数';
ZhHansMsg.STEPPER_STEPS_NUM = '步数';
ZhHansMsg.RC522_INIT = '初始化 RFID';
ZhHansMsg.RC522_READ = '读取卡片值';
ZhHansMsg.OLED_INIT = '初始化 OLED 屏幕';
ZhHansMsg.OLED_SETTEXT = '设置字体大小';
ZhHansMsg.OLED_SETCURSOR = '设置光标 x y';
ZhHansMsg.OLED_PRINT = '打印';
ZhHansMsg.OLED_EOL_WARP = '换行';
ZhHansMsg.OLED_EOL_NOWARP = '不换行';
ZhHansMsg.OLED_IMAGE = 'OLED 显示图像';
ZhHansMsg.OLED_CLEAR = '清除 OLED';
ZhHansMsg.OLED_REFRESH = '刷新 OLED';
ZhHansMsg.WIFI_INIT = '连接 WiFi';
ZhHansMsg.WIFI_READ_IP = 'WiFi 读取 IP';
ZhHansMsg.WIFI_CLIENT_INIT = 'WiFi 初始化客户端';
ZhHansMsg.WIFI_CLIENT_CONNECTED = 'WiFi 客户端未连接';
ZhHansMsg.WIFI_READ_DATA = 'WiFi 读取数据';
ZhHansMsg.WIFI_SEND_DATA = 'WiFi 发送数据';

// 扩展库自定义 key
ZhHansMsg.Kids_ON = '高';
ZhHansMsg.Kids_OFF = '低';
ZhHansMsg.MIXLY_CHANNEL = '通道';
ZhHansMsg.MIXLY_VALUE2 = '赋值为';
ZhHansMsg.MIXLY_RGB_NUM = '灯号 #';
ZhHansMsg.MIXLY_RGB_COUNT = '灯数';
ZhHansMsg.MIXLY_RGB_COLOR = '颜色';
ZhHansMsg.kids_tone = '音调';
ZhHansMsg.kids_beat = '节拍';

const ZhHansCatgories = {};

ZhHansCatgories.smart_school = 'ESP32 智慧校园';
ZhHansCatgories.smart_school_led = 'LED 灯';
ZhHansCatgories.smart_school_rgb = 'RGB 灯带';
ZhHansCatgories.smart_school_buzzer = '蜂鸣器';
ZhHansCatgories.smart_school_sensor = '传感器';
ZhHansCatgories.smart_school_motor = '舵机 & 电机';
ZhHansCatgories.smart_school_stepper = '步进电机';
ZhHansCatgories.smart_school_rfid = 'RFID';
ZhHansCatgories.smart_school_oled = 'OLED 屏幕';
ZhHansCatgories.smart_school_wifi = 'WiFi';


/***/ }),

/***/ "blockly/core":
/*!**************************!*\
  !*** external "Blockly" ***!
  \**************************/
/***/ ((module) => {

module.exports = Blockly;

/***/ }),

/***/ "profile":
/*!**************************!*\
  !*** external "profile" ***!
  \**************************/
/***/ ((module) => {

module.exports = profile;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var blockly_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! blockly/core */ "blockly/core");
/* harmony import */ var blockly_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(blockly_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _language_zh_hans__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./language/zh-hans */ "./src/language/zh-hans.js");
/* harmony import */ var _language_en__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./language/en */ "./src/language/en.js");
/* harmony import */ var _generators_generator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./generators/generator */ "./src/generators/generator.js");
/* harmony import */ var _blocks_block__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./blocks/block */ "./src/blocks/block.js");






// 载入语言文件
Object.assign(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Lang.ZhHans, _language_zh_hans__WEBPACK_IMPORTED_MODULE_1__.ZhHansMsg);
Object.assign(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Lang.En, _language_en__WEBPACK_IMPORTED_MODULE_2__.EnMsg);
Object.assign(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Lang.ZhHans.MSG, _language_zh_hans__WEBPACK_IMPORTED_MODULE_1__.ZhHansCatgories);
Object.assign(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Lang.En.MSG, _language_en__WEBPACK_IMPORTED_MODULE_2__.EnCatgories);

// 载入图形化模块外观定义文件
Object.assign(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Blocks, _blocks_block__WEBPACK_IMPORTED_MODULE_4__);

// 载入图形化模块代码生成定义文件
Object.assign(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Arduino.forBlock, _generators_generator__WEBPACK_IMPORTED_MODULE_3__);

})();

/******/ })()
;
//# sourceMappingURL=main.bundle.js.map