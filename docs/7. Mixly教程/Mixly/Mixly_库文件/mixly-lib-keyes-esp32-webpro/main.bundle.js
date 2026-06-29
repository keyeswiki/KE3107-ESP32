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
/* harmony export */   QH_variables_get: () => (/* binding */ QH_variables_get),
/* harmony export */   espdashpro_add_page: () => (/* binding */ espdashpro_add_page),
/* harmony export */   espdashpro_add_statistics: () => (/* binding */ espdashpro_add_statistics),
/* harmony export */   espdashpro_display_components: () => (/* binding */ espdashpro_display_components),
/* harmony export */   espdashpro_display_components1: () => (/* binding */ espdashpro_display_components1),
/* harmony export */   espdashpro_get_component_value: () => (/* binding */ espdashpro_get_component_value),
/* harmony export */   espdashpro_get_joystick_value: () => (/* binding */ espdashpro_get_joystick_value),
/* harmony export */   espdashpro_set_component_page: () => (/* binding */ espdashpro_set_component_page),
/* harmony export */   espdashpro_set_title: () => (/* binding */ espdashpro_set_title),
/* harmony export */   espdashpro_setting_permissions: () => (/* binding */ espdashpro_setting_permissions),
/* harmony export */   espdashpro_state_component: () => (/* binding */ espdashpro_state_component),
/* harmony export */   espdashpro_update_chart: () => (/* binding */ espdashpro_update_chart)
/* harmony export */ });
/* harmony import */ var blockly_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! blockly/core */ "blockly/core");
/* harmony import */ var blockly_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(blockly_core__WEBPACK_IMPORTED_MODULE_0__);
/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */


const WEB_COLOR = 120;

// Display Components
const espdashpro_display_components = {
    init: function () {
        this.setColour(WEB_COLOR);
        this.appendDummyInput("")
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.espdashpro_display_components)
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldImage(__webpack_require__(/*! ../media/web.png */ "./src/media/web.png"), 52, 40));
        
        this.appendValueInput("Label")
            .setCheck(String)
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.MIXLY_Label);

        this.appendValueInput("unit")
            .setCheck(String)
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.MIXLY_Unit);

        this.appendDummyInput("")
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.MIXLY_TYPE)
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldDropdown([
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.temperature, '1'],
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.humidity, '2'],
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.air_pressure, '3'],
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.energy, '4'],
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.progress_bar, '6'],
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.tags, '7']
            ]), 'type');

        this.appendDummyInput("")
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.MIXLY_ID)
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldDropdown([
                ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"],
                ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"],
                ["9", "9"], ["10", "10"], ["11", "11"],
                ["12", "12"], ["13", "13"], ["14", "14"],
                ["15", "15"], ["16", "16"]
            ]), 'id');

        this.appendValueInput("value")
            .setCheck(Number)
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.MIXLY_VALUE2);

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
// 设置状态组件块
const espdashpro_state_component = {
    init: function() {
        this.setColour(WEB_COLOR); // 设置颜色

        this.appendDummyInput("")
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.espdashpro_state_component) // 块标题
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldImage(__webpack_require__(/*! ../media/web.png */ "./src/media/web.png"), 39, 32)); // 添加图像

        this.appendValueInput("Label")
            .setCheck(String)
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.MIXLY_Label); // 组件标签输入框

        this.appendDummyInput("")
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.MIXLY_icon) // 状态类型
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldDropdown([
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.success, 'success'],
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.warning, 'warning'],
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.danger, 'danger'],
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.idle, 'idle']
            ]), "type"); // 状态下拉框

        this.appendDummyInput("")
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.MIXLY_ID) // 组件ID
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldDropdown([
                ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"],
                ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"],
                ["9", "9"], ["10", "10"], ["11", "11"],
                ["12", "12"], ["13", "13"], ["14", "14"],
                ["15", "15"], ["16", "16"]
            ]), "id"); // ID下拉框

        this.appendValueInput("value")
            .setCheck(String) // 值输入框
            .appendField("值为");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

// 更新图表组件块
const espdashpro_update_chart = {
    init: function() {
        this.setColour(WEB_COLOR); // 设置颜色
        
        this.appendDummyInput("")
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldImage(__webpack_require__(/*! ../media/web.png */ "./src/media/web.png"), 39, 32)) // 添加图像
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.espdashpro_update_chart); // 块标题

        this.appendValueInput("Label")
            .setCheck(String)
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.MIXLY_header); // 组件标签输入框

        this.appendDummyInput("")
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.MIXLY_TYPE) // 图表类型
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldDropdown([
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.BAR_CHART, '1'],
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.LINE_CHART, '2'],
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.AREA_CHART, '3'],
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.PIE_CHART, '4']
            ]), "type"); // 类型下拉框

        this.appendDummyInput("")
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.MIXLY_ID) // 组件 ID
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldDropdown([
                ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"],
                ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"],
                ["9", "9"], ["10", "10"], ["11", "11"],
                ["12", "12"], ["13", "13"], ["14", "14"],
                ["15", "15"], ["16", "16"]
            ]), "id"); // ID下拉框

        this.appendValueInput("abscissa")
            .setCheck(Number) // 数据源X输入框
            .appendField("数据源X");

        this.appendValueInput("ordinate")
            .setCheck(Number) // 数据源Y输入框
            .appendField("数据源Y");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

// 更新组件块
const espdashpro_display_components1 = {
    init: function() {
        this.setColour(WEB_COLOR); // 设置颜色

        this.appendDummyInput("")
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldImage(__webpack_require__(/*! ../media/web.png */ "./src/media/web.png"), 39, 32)) // 添加图像
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.espdashpro_display_components1); // 块标题

        this.appendValueInput("Label")
            .setCheck(String)
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.MIXLY_Label); // 组件标签输入框

        this.appendDummyInput("")
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.MIXLY_TYPE) // 组件类型
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldDropdown([
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.BUTTON_CARD, '1'],
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.SLIDER_CARD, '2'],
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.TEXT_INPUT_CARD, '3']
            ]), "type"); // 类型下拉框

        this.appendDummyInput("")
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.MIXLY_ID) // 组件 ID
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldDropdown([
                ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"],
                ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"],
                ["9", "9"], ["10", "10"], ["11", "11"],
                ["12", "12"], ["13", "13"], ["14", "14"],
                ["15", "15"], ["16", "16"]
            ]), "id"); // ID下拉框
        this.appendValueInput("value")
            .setCheck(Number)
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.MIXLY_VALUE2);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null); // 支持前驱块
        this.setNextStatement(true, null); // 支持后继块
    }
};
// 获取组件值块
const espdashpro_get_component_value = {
    init: function() {
        this.setColour(WEB_COLOR);
        this.appendDummyInput()
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldImage(__webpack_require__(/*! ../media/web.png */ "./src/media/web.png"), 39, 32))
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.espdashpro_get_component_value);
        this.appendValueInput("Label")
            .setCheck(String)
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.MIXLY_Label); // 组件标签输入框
        this.appendDummyInput()
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.MIXLY_TYPE)
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldDropdown([
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.BUTTON_CARD, '1'],
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.SLIDER_CARD, '2'],
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.TEXT_INPUT_CARD, '3']
            ]), "type");
        this.appendDummyInput()
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.MIXLY_ID)
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldDropdown([
                ["1","1"], ["2","2"], ["3","3"], ["4","4"], ["5","5"], ["6","6"], 
                ["7","7"], ["8","8"], ["9","9"], ["10","10"], ["11","11"], ["12","12"], 
                ["13","13"], ["14","14"], ["15","15"], ["16","16"]
            ]), "id");
        this.appendStatementInput("function");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

// 获取摇杆值块
const espdashpro_get_joystick_value = {
    init: function() {
        this.setColour(WEB_COLOR);
        this.appendDummyInput()
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldImage(__webpack_require__(/*! ../media/web.png */ "./src/media/web.png"), 39, 32))
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.espdashpro_get_joystick_value);
        this.appendValueInput("Label")
            .setCheck(String)
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.MIXLY_Label); // 组件标签输入框
        this.appendDummyInput()
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.MIXLY_TYPE)
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldDropdown([
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.bothway, '1'],
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.lockx, '2'],
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.locky, '3']
            ]), "type");
        this.appendDummyInput()
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.MIXLY_ID)
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldDropdown([
                ["1","1"], ["2","2"], ["3","3"], ["4","4"], ["5","5"], ["6","6"], 
                ["7","7"], ["8","8"], ["9","9"], ["10","10"], ["11","11"], ["12","12"], 
                ["13","13"], ["14","14"], ["15","15"], ["16","16"]
            ]), "id");
        this.appendStatementInput("function");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

// 设置标题块
const espdashpro_set_title = {
    init: function() {
        this.setColour(WEB_COLOR);
        this.appendDummyInput()
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldImage(__webpack_require__(/*! ../media/web.png */ "./src/media/web.png"), 39, 32));
        this.appendValueInput("title")
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.espdashpro_set_title);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

// 设置权限块
const espdashpro_setting_permissions = {
    init: function() {
        this.setColour(WEB_COLOR);
        this.appendDummyInput()
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldImage(__webpack_require__(/*! ../media/web.png */ "./src/media/web.png"), 39, 32));
        this.appendValueInput("name")
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.espdashpro_setting_name);
        this.appendValueInput("pass")
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.espdashpro_setting_password);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

// 添加页面块
const espdashpro_add_page = {
    init: function() {
        this.setColour(WEB_COLOR);
        this.appendDummyInput()
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldImage(__webpack_require__(/*! ../media/web.png */ "./src/media/web.png"), 39, 32));
        this.appendValueInput("page")
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.espdashpro_add_page);
        this.appendDummyInput()
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.MIXLY_PAGE_ID)
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldDropdown([
                ["1","1"], ["2","2"], ["3","3"], ["4","4"], ["5","5"], ["6","6"], 
                ["7","7"], ["8","8"], ["9","9"], ["10","10"], ["11","11"], ["12","12"], 
                ["13","13"], ["14","14"], ["15","15"], ["16","16"]
            ]), "id");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

// 添加统计块
const espdashpro_add_statistics = {
    init: function() {
        this.setColour(WEB_COLOR);
        this.appendDummyInput()
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldImage(__webpack_require__(/*! ../media/web.png */ "./src/media/web.png"), 39, 32))
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.espdashpro_add_statistics);
        this.appendValueInput("Statistic")
            .setCheck(String)
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.MIXLY_tongji); // 组件标签输入框
        this.appendValueInput("Value")
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.espdashpro_set_value);
        this.appendDummyInput()
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.MIXLY_tongji_ID)
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldDropdown([
                ["1","1"], ["2","2"], ["3","3"], ["4","4"], ["5","5"], ["6","6"], 
                ["7","7"], ["8","8"], ["9","9"], ["10","10"], ["11","11"], ["12","12"], 
                ["13","13"], ["14","14"], ["15","15"], ["16","16"]
            ]), "id");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

// 设置组件页面块
const espdashpro_set_component_page = {
    init: function() {
        this.setColour(WEB_COLOR);
        this.appendDummyInput()
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldImage(__webpack_require__(/*! ../media/web.png */ "./src/media/web.png"), 39, 32))
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.espdashpro_set_component_page);
        this.appendDummyInput()
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.MIXLY_TYPE)
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldDropdown([
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.temperature, "temp"],
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.humidity, "hum"],
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.air_pressure, "air"],
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.energy, "energy"],
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.status, "status"],
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.progress_bar, "progress"],
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.tags, "generic"],
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.BUTTON_CARD, "button"],
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.SLIDER_CARD, "slider"],
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.TEXT_INPUT_CARD, "text"],
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.joystick, "joystick"],
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.BAR_CHART, "bar"],
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.LINE_CHART, "line"],
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.AREA_CHART, "area"],
                [blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.PIE_CHART, "pie"]
            ]), "type");
        this.appendDummyInput()
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.MIXLY_ID)
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldDropdown([
                ["1","1"], ["2","2"], ["3","3"], ["4","4"], ["5","5"], ["6","6"], 
                ["7","7"], ["8","8"], ["9","9"], ["10","10"], ["11","11"], ["12","12"], 
                ["13","13"], ["14","14"], ["15","15"], ["16","16"]
            ]), "id");
        this.appendDummyInput()
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.page_id)
            .appendField(new blockly_core__WEBPACK_IMPORTED_MODULE_0__.FieldDropdown([
                ["1","1"], ["2","2"], ["3","3"], ["4","4"], ["5","5"], ["6","6"], 
                ["7","7"], ["8","8"], ["9","9"], ["10","10"], ["11","11"], ["12","12"], 
                ["13","13"], ["14","14"], ["15","15"], ["16","16"]
            ]), "page_id");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

// 变量获取块
const QH_variables_get = {
    init: function() {
        this.setColour(WEB_COLOR);
        this.appendValueInput("VAR")
            .appendField(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.get_variable);
        this.setOutput(true, Number);
        this.setTooltip(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Msg.get_variable_tooltip);
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
/* harmony export */   QH_variables_get: () => (/* binding */ QH_variables_get),
/* harmony export */   espdashpro_add_page: () => (/* binding */ espdashpro_add_page),
/* harmony export */   espdashpro_add_statistics: () => (/* binding */ espdashpro_add_statistics),
/* harmony export */   espdashpro_display_components: () => (/* binding */ espdashpro_display_components),
/* harmony export */   espdashpro_display_components1: () => (/* binding */ espdashpro_display_components1),
/* harmony export */   espdashpro_get_component_value: () => (/* binding */ espdashpro_get_component_value),
/* harmony export */   espdashpro_get_joystick_value: () => (/* binding */ espdashpro_get_joystick_value),
/* harmony export */   espdashpro_set_component_page: () => (/* binding */ espdashpro_set_component_page),
/* harmony export */   espdashpro_set_title: () => (/* binding */ espdashpro_set_title),
/* harmony export */   espdashpro_setting_permissions: () => (/* binding */ espdashpro_setting_permissions),
/* harmony export */   espdashpro_state_component: () => (/* binding */ espdashpro_state_component),
/* harmony export */   espdashpro_update_chart: () => (/* binding */ espdashpro_update_chart)
/* harmony export */ });
//////////////////////// ESPDashPro 仪表盘组件 //////////////////////////
const espdashpro_display_components = function(block, generator) {
    var Label = generator.valueToCode(block, 'Label', generator.ORDER_ATOMIC);
    var unit = generator.valueToCode(block, 'unit', generator.ORDER_ATOMIC);
    var id = block.getFieldValue('id');
    var type = block.getFieldValue('type');
    var value = generator.valueToCode(block, 'value', generator.ORDER_ATOMIC);
    
    generator.definitions_['include_webPro'] = '#include <webPro.h>';
    generator.definitions_['var_declare_webPro'] = 'AsyncWebServer server(80);\nESPDash dashboard(&server, 1);\n';
    
    switch(type) {
    case '1':
        generator.definitions_[`var_declare_webPro1_${type}${id}`] = `Card temp_${id}(&dashboard, TEMPERATURE_CARD, ${Label}, ${unit});\n`;
        break;
    case '2':
        generator.definitions_[`var_declare_webPro1_${type}${id}`] = `Card hum_${id}(&dashboard, HUMIDITY_CARD, ${Label}, ${unit});\n`;
        break;
    case '3':
        generator.definitions_[`var_declare_webPro1_${type}${id}`] = `Card air_${id}(&dashboard, AIR_CARD, ${Label}, ${unit});\n`;
        break;
    case '4':
        generator.definitions_[`var_declare_webPro1_${type}${id}`] = `Card energy_${id}(&dashboard, ENERGY_CARD, ${Label}, ${unit});\n`;
        break;
    case '5':
        generator.definitions_[`var_declare_webPro1_${type}${id}`] = `Card status_${id}(&dashboard, STATUS_CARD, ${Label}, ${unit});\n`;
        break;
    case '6':
        generator.definitions_[`var_declare_webPro1_${type}${id}`] = `Card progress_${id}(&dashboard, PROGRESS_CARD, ${Label}, ${unit}, 0, 100);\n`;
        break;
    case '7':
        generator.definitions_[`var_declare_webPro1_${type}${id}`] = `Card generic_${id}(&dashboard, GENERIC_CARD, ${Label}, ${unit});\n`;
        break;
    }
    
    generator.setups_['var_webPro'] = 'server.begin();';
    
    let updateCode = '';
    switch(type) {
    case '1': updateCode = `temp_${id}.update((int)${value});\n`; break;
    case '2': updateCode = `hum_${id}.update((int)${value});\n`; break;
    case '3': updateCode = `air_${id}.update((int)${value});\n`; break;
    case '4': updateCode = `energy_${id}.update((int)${value});\n`; break;
    case '5': updateCode = `status_${id}.update((int)${value});\n`; break;
    case '6': updateCode = `progress_${id}.update((int)${value});\n`; break;
    case '7': updateCode = `generic_${id}.update((int)${value});\n`; break;
    }
    
    return updateCode + 'dashboard.sendUpdates();\n';
};

//////////////////////// ESPDashPro 状态组件 //////////////////////////
const espdashpro_state_component = function(block, generator) {
    var type = block.getFieldValue('type');
    var Label = generator.valueToCode(block, 'Label', generator.ORDER_ATOMIC);
    var id = block.getFieldValue('id');
    var value = generator.valueToCode(block, 'value', generator.ORDER_ATOMIC);
    
    generator.definitions_['include_webPro'] = '#include <webPro.h>';
    generator.definitions_['var_declare_webPro'] = 'AsyncWebServer server(80);\nESPDash dashboard(&server, 1);\n';
    generator.definitions_[`var_declare_webPro2_${id}`] = `Card status_${id}(&dashboard, STATUS_CARD, ${Label}, "success");\n`;
    generator.setups_['var_webPro'] = 'server.begin();';
    
    return `status_${id}.update(${value}, "${type}");\ndashboard.sendUpdates();\n`;
};

//////////////////////// ESPDashPro 更新图表 //////////////////////////
const espdashpro_update_chart = function(block, generator) {
    var abscissa = generator.valueToCode(block, 'abscissa', generator.ORDER_ATOMIC);
    var ordinate = generator.valueToCode(block, 'ordinate', generator.ORDER_ATOMIC);
    var id = block.getFieldValue('id');
    var type = block.getFieldValue('type');
    var Label = generator.valueToCode(block, 'Label', generator.ORDER_ATOMIC);
    
    generator.definitions_['include_webPro'] = '#include <webPro.h>';
    generator.definitions_['var_declare_webPro'] = 'AsyncWebServer server(80);\nESPDash dashboard(&server, 1);\n';
    
    switch(type) {
    case '1':
        generator.definitions_[`var_declare_webPro3_${type}${id}`] = `Chart bar_${id}(&dashboard, BAR_CHART, ${Label});\n`;
        break;
    case '2':
        generator.definitions_[`var_declare_webPro3_${type}${id}`] = `Chart line_${id}(&dashboard, LINE_CHART, ${Label});\n`;
        break;
    case '3':
        generator.definitions_[`var_declare_webPro3_${type}${id}`] = `Chart area_${id}(&dashboard, AREA_CHART, ${Label});\n`;
        break;
    case '4':
        generator.definitions_[`var_declare_webPro3_${type}${id}`] = `Chart pie_${id}(&dashboard, PIE_CHART, ${Label});\n`;
        break;
    }
    
    generator.setups_['var_webPro'] = 'server.begin();';
    
    let updateCode = '';
    switch(type) {
    case '1': 
        updateCode = `bar_${id}.updateX(${abscissa}, sizeof(${abscissa})/sizeof(${abscissa}[0]));\nbar_${id}.updateY(${ordinate}, sizeof(${ordinate})/sizeof(${ordinate}[0]));\n`;
        break;
    case '2': 
        updateCode = `line_${id}.updateX(${abscissa}, sizeof(${abscissa})/sizeof(${abscissa}[0]));\nline_${id}.updateY(${ordinate}, sizeof(${ordinate})/sizeof(${ordinate}[0]));\n`;
        break;
    case '3': 
        updateCode = `area_${id}.updateX(${abscissa}, sizeof(${abscissa})/sizeof(${abscissa}[0]));\narea_${id}.updateY(${ordinate}, sizeof(${ordinate})/sizeof(${ordinate}[0]));\n`;
        break;
    case '4': 
        updateCode = `pie_${id}.updateX(${abscissa}, sizeof(${abscissa})/sizeof(${abscissa}[0]));\npie_${id}.updateY(${ordinate}, sizeof(${ordinate})/sizeof(${ordinate}[0]));\n`;
        break;
    }
    
    return updateCode + 'dashboard.sendUpdates();\n';
};

//////////////////////// ESPDashPro 显示组件 //////////////////////////
const espdashpro_display_components1 = function(block, generator) {
    var id = block.getFieldValue('id');
    var type = block.getFieldValue('type');
    var Label = generator.valueToCode(block, 'Label', generator.ORDER_ATOMIC);
    var value = generator.valueToCode(block, 'value', generator.ORDER_ATOMIC);
    
    generator.definitions_['include_webPro'] = '#include <webPro.h>';
    generator.definitions_['var_declare_webPro'] = 'AsyncWebServer server(80);\nESPDash dashboard(&server, 1);\n';
    
    switch(type) {
    case '1':
        generator.definitions_[`var_declare_webPro4_${type}${id}`] = `Card button_${id}(&dashboard, BUTTON_CARD, ${Label});\n`;
        break;
    case '2':
        generator.definitions_[`var_declare_webPro4_${type}${id}`] = `Card slider_${id}(&dashboard, SLIDER_CARD, ${Label}, "", 0, 255);\n`;
        break;
    case '3':
        generator.definitions_[`var_declare_webPro4_${type}${id}`] = `Card text_${id}(&dashboard, TEXT_INPUT_CARD, ${Label});\n`;
        break;
    }
    
    generator.setups_['var_webPro'] = 'server.begin();';
    
    let updateCode = '';
    switch(type) {
    case '1': updateCode = `button_${id}.update((int)${value});\n`; break;
    case '2': updateCode = `slider_${id}.update((int)${value});\n`; break;
    case '3': updateCode = `text_${id}.update(String(${value}));\n`; break;
    }
    
    return updateCode + 'dashboard.sendUpdates();\n';
};

//////////////////////// ESPDashPro 设置标题 //////////////////////////
const espdashpro_set_title = function(block, generator) {
    var title = generator.valueToCode(block, 'title', generator.ORDER_ATOMIC);
    
    generator.definitions_['include_webPro'] = '#include <webPro.h>';
    generator.definitions_['var_declare_webPro'] = 'AsyncWebServer server(80);\nESPDash dashboard(&server, 1);\n';
    generator.setups_['var_webPro'] = 'server.begin();';
    
    return `dashboard.setTitle(${title});\n`;
};

//////////////////////// ESPDashPro 设置权限 //////////////////////////
const espdashpro_setting_permissions = function(block, generator) {
    var name = generator.valueToCode(block, 'name', generator.ORDER_ATOMIC);
    var pass = generator.valueToCode(block, 'pass', generator.ORDER_ATOMIC);
    
    generator.definitions_['include_webPro'] = '#include <webPro.h>';
    generator.definitions_['var_declare_webPro'] = 'AsyncWebServer server(80);\nESPDash dashboard(&server, 1);\n';
    generator.setups_['var_webPro'] = 'server.begin();';
    
    return `dashboard.setAuthentication(${name}, ${pass});\n`;
};

//////////////////////// ESPDashPro 添加页面 //////////////////////////
const espdashpro_add_page = function(block, generator) {
    var id = block.getFieldValue('id');
    var page = generator.valueToCode(block, 'page', generator.ORDER_ATOMIC);
    
    generator.definitions_['include_webPro'] = '#include <webPro.h>';
    generator.definitions_['var_declare_webPro'] = 'AsyncWebServer server(80);\nESPDash dashboard(&server, 1);\n';
    generator.definitions_[`var_declare_webPro5_${id}`] = `Tab settings_${id}(&dashboard, ${page});\n`;
    generator.setups_['var_webPro'] = 'server.begin();';
    
    return '';
};

//////////////////////// ESPDashPro 添加统计 //////////////////////////
const espdashpro_add_statistics = function(block, generator) {
    var id = block.getFieldValue('id');
    var Statistic = generator.valueToCode(block, 'Statistic', generator.ORDER_ATOMIC);
    var Value = generator.valueToCode(block, 'Value', generator.ORDER_ATOMIC);
    
    generator.definitions_['include_webPro'] = '#include <webPro.h>';
    generator.definitions_['var_declare_webPro'] = 'AsyncWebServer server(80);\nESPDash dashboard(&server, 1);\n';
    generator.definitions_[`var_declare_webPro6_${id}`] = `Statistic stat_${id}(&dashboard, ${Statistic}, ${Value});\n`;
    generator.setups_['var_webPro'] = 'server.begin();';
    
    return '';
};

//////////////////////// ESPDashPro 设置组件页面 //////////////////////////
const espdashpro_set_component_page = function(block, generator) {
    var id = block.getFieldValue('id');
    var page_id = block.getFieldValue('page_id');
    var type = block.getFieldValue('type');
    
    generator.definitions_['include_webPro'] = '#include <webPro.h>';
    generator.definitions_['var_declare_webPro'] = 'AsyncWebServer server(80);\nESPDash dashboard(&server, 1);\n';
    generator.setups_['var_webPro'] = 'server.begin();';
    
    return `${type}_${id}.setTab(&settings_${page_id});\n`;
};

//////////////////////// ESPDashPro 获取组件值 //////////////////////////
const espdashpro_get_component_value = function(block, generator) {
    var type = block.getFieldValue('type');
    var id = block.getFieldValue('id');
    var Label = generator.valueToCode(block, 'Label', generator.ORDER_ATOMIC);
    var branch = generator.statementToCode(block, 'function');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "");
    
    generator.definitions_['include_webPro'] = '#include <webPro.h>';
    generator.definitions_['var_declare_webPro'] = 'AsyncWebServer server(80);\nESPDash dashboard(&server, 1);\n';
    
    switch(type) {
    case '1':
        generator.setups_[`var_declare_webPro_${type}${id}`] = 
            `button_${id}.attachCallback([&](int value) {\n` +
            `${branch}\n` +
            `    button_${id}.update(value);\n` +
            `    dashboard.sendUpdates();\n` +
            `});\n`;
        generator.definitions_[`var_declare_webPro4_${type}${id}`] = `Card button_${id}(&dashboard, BUTTON_CARD, ${Label});\n`;
        break;
    case '2':
        generator.setups_[`var_declare_webPro_${type}${id}`] = 
            `slider_${id}.attachCallback([&](int value) {\n` +
            `${branch}\n` +
            `    slider_${id}.update(value);\n` +
            `    dashboard.sendUpdates();\n` +
            `});\n`;
        generator.definitions_[`var_declare_webPro4_${type}${id}`] = `Card slider_${id}(&dashboard, SLIDER_CARD, ${Label}, "", 0, 255);\n`;
        break;
    case '3':
        generator.setups_[`var_declare_webPro_${type}${id}`] = 
            `text_${id}.attachCallback([&](const char* value) {\n` +
            `${branch}\n` +
            `    text_${id}.update(value);\n` +
            `    dashboard.sendUpdates();\n` +
            `});\n`;
        generator.definitions_[`var_declare_webPro4_${type}${id}`] = `Card text_${id}(&dashboard, TEXT_INPUT_CARD, ${Label});\n`;
        break;
    }
    
    generator.setups_['var_webPro'] = 'server.begin();';
    return '';
};

//////////////////////// ESPDashPro 获取摇杆值 //////////////////////////
const espdashpro_get_joystick_value = function(block, generator) {
    var type = block.getFieldValue('type');
    var id = block.getFieldValue('id');
    var Label = generator.valueToCode(block, 'Label', generator.ORDER_ATOMIC);
    var branch = generator.statementToCode(block, 'function');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "");
    
    generator.definitions_['include_webPro'] = '#include <webPro.h>';
    generator.definitions_['var_declare_webPro'] = 'AsyncWebServer server(80);\nESPDash dashboard(&server, 1);\n';
    
    generator.setups_[`var_declare_webPro_${type}${id}`] = 
        `joystick_${id}.attachCallback([&](int8_t x, int8_t y) {\n` +
        `${branch}\n` +
        `});\n`;
    
    switch(type) {
    case '1':
        generator.definitions_[`var_declare_webPro6_${type}${id}`] = `Card joystick_${id}(&dashboard, JOYSTICK_CARD, ${Label});\n`;
        break;
    case '2':
        generator.definitions_[`var_declare_webPro6_${type}${id}`] = `Card joystick_${id}(&dashboard, JOYSTICK_CARD, ${Label}, "lockX");\n`;
        break;
    case '3':
        generator.definitions_[`var_declare_webPro6_${type}${id}`] = `Card joystick_${id}(&dashboard, JOYSTICK_CARD, ${Label}, "lockY");\n`;
        break;
    }
    
    generator.setups_['var_webPro'] = 'server.begin();';
    return '';
};

//////////////////////// 变量获取 //////////////////////////
const QH_variables_get = function(block, generator) {
    var name = generator.valueToCode(block, 'VAR', generator.ORDER_ATOMIC) || ' ';
    name = name.replace(/"/g, '');
    return [name, generator.ORDER_NONE];
};

/***/ }),

/***/ "./src/language/en.js":
/*!****************************!*\
  !*** ./src/language/en.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EnCatgories: () => (/* binding */ EnCatgories),
/* harmony export */   EnMsg: () => (/* binding */ EnMsg)
/* harmony export */ });
const EnMsg = {};

EnMsg.espdashpro_display_components = 'Display Component';
EnMsg.espdashpro_display_components = 'Update Components';
EnMsg.MIXLY_Label = 'Component Label';
EnMsg.MIXLY_Unit = 'Component Unit';
EnMsg.MIXLY_TYPE = 'Component Type';
EnMsg.temperature = 'Temperature';
EnMsg.humidity = 'Humidity';
EnMsg.air_pressure = 'Air Pressure';
EnMsg.energy = 'Energy';
EnMsg.progress_bar = 'Progress Bar';
EnMsg.tags = 'Tags';
EnMsg.MIXLY_ID = 'Component ID';
EnMsg.MIXLY_VALUE2 = 'Value is';
EnMsg.espdashpro_state_component = 'Set State Component';
EnMsg.MIXLY_icon = 'Component Icon';
EnMsg.success = 'Normal';
EnMsg.warning = 'Error';
EnMsg.danger = 'Danger';
EnMsg.idle = 'Warning';
EnMsg.espdashpro_update_chart = 'Update Chart';
EnMsg.MIXLY_header = 'Chart Header';
EnMsg.BAR_CHART = 'Bar Chart';
EnMsg.LINE_CHART = 'Line Chart';
EnMsg.AREA_CHART = 'Area Chart';
EnMsg.PIE_CHART = 'Pie Chart';
EnMsg.MIXLY_abscissa = 'Abscissa';
EnMsg.MIXLY_ordinate = 'Ordinate';
EnMsg.espdashpro_display_components1 = 'Update Components';
EnMsg.BUTTON_CARD = 'Button';
EnMsg.SLIDER_CARD = 'Slider';
EnMsg.TEXT_INPUT_CARD = 'Text Input';
EnMsg.espdashpro_get_component_value = 'Get Component Value';
EnMsg.espdashpro_get_joystick_value = 'Get Joystick Value';
EnMsg.bothway = 'Bidirectional';
EnMsg.lockx = 'Horizontal';
EnMsg.locky = 'Vertical';
EnMsg.espdashpro_set_title = 'Set Web Page Title to';
EnMsg.MIXLY_title = 'Title';
EnMsg.espdashpro_setting_name = 'Set Access Username';
EnMsg.espdashpro_setting_password = 'Set Access Password';
EnMsg.MIXLY_name = 'Username';
EnMsg.MIXLY_password = 'Password';
EnMsg.espdashpro_add_page = 'Add Page';
EnMsg.MIXLY_PAGE_ID = 'Page ID';
EnMsg.espdashpro_add_statistics = 'Add Statistics Information';
EnMsg.MIXLY_Statistic = 'Statistic Item';
EnMsg.MIXLY_tongji = 'Statistic Label';
EnMsg.espdashpro_set_value = 'Value';
EnMsg.MIXLY_tongji_ID = 'Statistic ID';
EnMsg.espdashpro_set_component_page = 'Set Component Page';
EnMsg.status = 'Status';
EnMsg.joystick = 'Joystick';
EnMsg.page_id = 'Set to Page ID';
EnMsg.MIXLY_GET_VAR = 'Get Variable';

const EnCatgories = {};

/***/ }),

/***/ "./src/language/zh-hans.js":
/*!*********************************!*\
  !*** ./src/language/zh-hans.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ZhHansCatgories: () => (/* binding */ ZhHansCatgories),
/* harmony export */   ZhHansMsg: () => (/* binding */ ZhHansMsg)
/* harmony export */ });
const ZhHansMsg = {};

ZhHansMsg.espdashpro_display_components = '更新组件';
ZhHansMsg.MIXLY_Label = '组件标签';
ZhHansMsg.MIXLY_Unit = '组件单位';
ZhHansMsg.MIXLY_TYPE = '组件类型';
ZhHansMsg.temperature = '温度';
ZhHansMsg.humidity = '湿度';
ZhHansMsg.air_pressure = '气压';
ZhHansMsg.energy = '能量';
ZhHansMsg.progress_bar = '进度条';
ZhHansMsg.tags = '标签';
ZhHansMsg.MIXLY_ID = '组件ID';
ZhHansMsg.MIXLY_VALUE2 = '值为';
ZhHansMsg.espdashpro_state_component = '设置状态组件';
ZhHansMsg.MIXLY_icon = '组件图标';
ZhHansMsg.success = '正常';
ZhHansMsg.warning = '错误';
ZhHansMsg.danger = '危险';
ZhHansMsg.idle = '警告';
ZhHansMsg.espdashpro_update_chart = '更新图表';
ZhHansMsg.MIXLY_header = '图表表头';
ZhHansMsg.BAR_CHART = '条形图';
ZhHansMsg.LINE_CHART = '折线图';
ZhHansMsg.AREA_CHART = '区域图';
ZhHansMsg.PIE_CHART = '饼图';
ZhHansMsg.MIXLY_abscissa = '横坐标';
ZhHansMsg.MIXLY_ordinate = '纵坐标';
ZhHansMsg.espdashpro_display_components1 = '更新组件';
ZhHansMsg.BUTTON_CARD = '按钮';
ZhHansMsg.SLIDER_CARD = '滑块';
ZhHansMsg.TEXT_INPUT_CARD = '文本输入';
ZhHansMsg.espdashpro_get_component_value = '获取组件值';
ZhHansMsg.espdashpro_get_joystick_value = '获取摇杆值';
ZhHansMsg.bothway = '双向';
ZhHansMsg.lockx = '横向';
ZhHansMsg.locky = '纵向';
ZhHansMsg.espdashpro_set_title = '设置网页标题为';
ZhHansMsg.MIXLY_title = '标题';
ZhHansMsg.espdashpro_setting_name = '设置访问用户名';
ZhHansMsg.espdashpro_setting_password = '设置访问密码';
ZhHansMsg.MIXLY_name = '用户名';
ZhHansMsg.MIXLY_password = '密码';
ZhHansMsg.espdashpro_add_page = '添加页面';
ZhHansMsg.MIXLY_PAGE_ID = '页面ID';
ZhHansMsg.espdashpro_add_statistics = '添加统计信息';
ZhHansMsg.MIXLY_Statistic = '统计项';
ZhHansMsg.MIXLY_tongji = '统计标签';
ZhHansMsg.espdashpro_set_value = '值';
ZhHansMsg.MIXLY_tongji_ID = '统计ID';
ZhHansMsg.espdashpro_set_component_page = '设置组件页面';
ZhHansMsg.status = '状态';
ZhHansMsg.joystick = '摇杆';
ZhHansMsg.page_id = '设置为页面ID';
ZhHansMsg.MIXLY_GET_VAR = '获取变量';

const ZhHansCatgories = {};

/***/ }),

/***/ "./src/language/zh-hant.js":
/*!*********************************!*\
  !*** ./src/language/zh-hant.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ZhHantCatgories: () => (/* binding */ ZhHantCatgories),
/* harmony export */   ZhHantMsg: () => (/* binding */ ZhHantMsg)
/* harmony export */ });
const ZhHantMsg = {};

ZhHantMsg.espdashpro_display_components = '更新組件';
ZhHantMsg.MIXLY_Label = '組件標籤';
ZhHantMsg.MIXLY_Unit = '組件單位';
ZhHantMsg.MIXLY_TYPE = '組件類型';
ZhHantMsg.temperature = '溫度';
ZhHantMsg.humidity = '濕度';
ZhHantMsg.air_pressure = '氣壓';
ZhHantMsg.energy = '能源';
ZhHantMsg.progress_bar = '進度條';
ZhHantMsg.tags = '標籤';
ZhHantMsg.MIXLY_ID = '組件ID';
ZhHantMsg.MIXLY_VALUE2 = '值為';
ZhHantMsg.espdashpro_state_component = '設置狀態組件';
ZhHantMsg.MIXLY_icon = '組件圖示';
ZhHantMsg.success = '正常';
ZhHantMsg.warning = '錯誤';
ZhHantMsg.danger = '危險';
ZhHantMsg.idle = '警告';
ZhHantMsg.espdashpro_update_chart = '更新圖表';
ZhHantMsg.MIXLY_header = '圖表表頭';
ZhHantMsg.BAR_CHART = '條形圖';
ZhHantMsg.LINE_CHART = '折線圖';
ZhHantMsg.AREA_CHART = '區域圖';
ZhHantMsg.PIE_CHART = '餅圖';
ZhHantMsg.MIXLY_abscissa = '橫坐標';
ZhHantMsg.MIXLY_ordinate = '縱坐標';
ZhHantMsg.espdashpro_display_components1 = '更新組件';
ZhHantMsg.BUTTON_CARD = '按鈕';
ZhHantMsg.SLIDER_CARD = '滑塊';
ZhHantMsg.TEXT_INPUT_CARD = '文本輸入';
ZhHantMsg.espdashpro_get_component_value = '獲取組件值';
ZhHantMsg.espdashpro_get_joystick_value = '獲取搖桿值';
ZhHantMsg.bothway = '雙向';
ZhHantMsg.lockx = '橫向';
ZhHantMsg.locky = '縱向';
ZhHantMsg.espdashpro_set_title = '設置網頁標題為';
ZhHantMsg.MIXLY_title = '標題';
ZhHantMsg.espdashpro_setting_name = '設置訪問用戶名';
ZhHantMsg.espdashpro_setting_password = '設置訪問密碼';
ZhHantMsg.MIXLY_name = '用戶名';
ZhHantMsg.MIXLY_password = '密碼';
ZhHantMsg.espdashpro_add_page = '添加頁面';
ZhHantMsg.MIXLY_PAGE_ID = '頁面ID';
ZhHantMsg.espdashpro_add_statistics = '添加統計信息';
ZhHantMsg.MIXLY_Statistic = '統計項';
ZhHantMsg.MIXLY_tongji = '統計標籤';
ZhHantMsg.espdashpro_set_value = '值';
ZhHantMsg.MIXLY_tongji_ID = '統計ID';
ZhHantMsg.espdashpro_set_component_page = '設置組件頁面';
ZhHantMsg.status = '狀態';
ZhHantMsg.joystick = '搖桿';
ZhHantMsg.page_id = '設置為頁面ID';
ZhHantMsg.MIXLY_GET_VAR = '獲取變量';

const ZhHantCatgories = {};

/***/ }),

/***/ "./src/media/web.png":
/*!***************************!*\
  !*** ./src/media/web.png ***!
  \***************************/
/***/ ((module) => {

module.exports = "data:image/png;base64,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";

/***/ }),

/***/ "blockly/core":
/*!**************************!*\
  !*** external "Blockly" ***!
  \**************************/
/***/ ((module) => {

module.exports = Blockly;

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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var blockly_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! blockly/core */ "blockly/core");
/* harmony import */ var blockly_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(blockly_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _language_zh_hans__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./language/zh-hans */ "./src/language/zh-hans.js");
/* harmony import */ var _language_zh_hant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./language/zh-hant */ "./src/language/zh-hant.js");
/* harmony import */ var _language_en__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./language/en */ "./src/language/en.js");
/* harmony import */ var _generators_generator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./generators/generator */ "./src/generators/generator.js");
/* harmony import */ var _blocks_block__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./blocks/block */ "./src/blocks/block.js");







// 载入语言文件
Object.assign(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Lang.ZhHans, _language_zh_hans__WEBPACK_IMPORTED_MODULE_1__.ZhHansMsg);
Object.assign(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Lang.ZhHant, _language_zh_hant__WEBPACK_IMPORTED_MODULE_2__.ZhHantMsg);
Object.assign(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Lang.En, _language_en__WEBPACK_IMPORTED_MODULE_3__.EnMsg);
Object.assign(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Lang.ZhHans.MSG, _language_zh_hans__WEBPACK_IMPORTED_MODULE_1__.ZhHansCatgories);
Object.assign(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Lang.ZhHant.MSG, _language_zh_hant__WEBPACK_IMPORTED_MODULE_2__.ZhHantCatgories);
Object.assign(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Lang.En.MSG, _language_en__WEBPACK_IMPORTED_MODULE_3__.EnCatgories);

// 载入图形化模块外观定义文件
Object.assign(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Blocks, _blocks_block__WEBPACK_IMPORTED_MODULE_5__);

// 载入图形化模块代码生成定义文件
Object.assign(blockly_core__WEBPACK_IMPORTED_MODULE_0__.Arduino.forBlock, _generators_generator__WEBPACK_IMPORTED_MODULE_4__);
})();

/******/ })()
;
//# sourceMappingURL=main.bundle.js.map