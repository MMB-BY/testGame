/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Gamefield/Gamefield.js":
/*!************************************!*\
  !*** ./src/Gamefield/Gamefield.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gamefield": () => (/* binding */ Gamefield)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants.js");
/* harmony import */ var _helpers_RNG__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/RNG */ "./src/helpers/RNG.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


var Gamefield = /*#__PURE__*/function () {
  function Gamefield(images) {
    _classCallCheck(this, Gamefield);
    this.blocks = _constants__WEBPACK_IMPORTED_MODULE_0__.types.map(function (type) {
      return {
        type: type,
        img: images.find(function (_ref) {
          var imgType = _ref.type;
          return imgType === type;
        })
      };
    });
    this.canvas = document.getElementById("canvas");
    this.rng = new _helpers_RNG__WEBPACK_IMPORTED_MODULE_1__.RNG();
    this.animInProgress = false;
    this.win = false;
    this.lose = false;
  }
  _createClass(Gamefield, [{
    key: "tickDrop",
    value: function tickDrop(data, time) {
      var _this = this;
      var deltaTime = new Date().getTime() - time;
      data.forEach(function (elem) {
        if (elem.move > 0) {
          elem.y += elem.move / _constants__WEBPACK_IMPORTED_MODULE_0__.animDuration * deltaTime;
          elem.move -= elem.move / _constants__WEBPACK_IMPORTED_MODULE_0__.animDuration * deltaTime;
        } else {
          elem.y = Math.round(elem.y);
          elem.move = 0;
        }
      });
      this.render(data);
      if (deltaTime < _constants__WEBPACK_IMPORTED_MODULE_0__.animDuration) {
        requestAnimationFrame(function () {
          return _this.tickDrop(data, time);
        });
      } else {
        this.animInProgress = false;
      }
    }
  }, {
    key: "tickRemove",
    value: function tickRemove(data, time) {
      var _this2 = this;
      var deltaTime = new Date().getTime() - time;
      data.forEach(function (elem) {
        var removed = false;
        if (!elem.toRemove) return;
        var frameDelta = 1 / (_constants__WEBPACK_IMPORTED_MODULE_0__.animDuration / 2) * deltaTime / 10;
        if (elem.scale > 0 && !removed) {
          elem.scale -= frameDelta;
        } else {
          removed = true;
        }
      });
      this.render(data);
      if (deltaTime < _constants__WEBPACK_IMPORTED_MODULE_0__.animDuration / 2) {
        requestAnimationFrame(function () {
          return _this2.tickRemove(data, time);
        });
      }
    }
  }, {
    key: "animDrop",
    value: function animDrop(field) {
      var _this3 = this;
      var time = new Date().getTime();
      var data = field.flat();
      data.forEach(function (elem) {
        if (elem.move > 0) {
          elem.y -= elem.move;
        }
      });
      requestAnimationFrame(function () {
        return _this3.tickDrop(data, time);
      });
    }
  }, {
    key: "animRemove",
    value: function animRemove(field) {
      var _this4 = this;
      this.animInProgress = true;
      var time = new Date().getTime();
      var data = field.flat();
      requestAnimationFrame(function () {
        return _this4.tickRemove(data, time);
      });
    }
  }, {
    key: "dropAll",
    value: function dropAll(field) {
      var _this5 = this;
      this.animInProgress = true;
      var time = new Date().getTime();
      var data = field.flat();
      data.forEach(function (elem) {
        elem.move = 1000;
      });
      requestAnimationFrame(function () {
        return _this5.tickDrop(data, time);
      });
    }
  }, {
    key: "animWin",
    value: function animWin(field) {
      this.win = true;
      this.dropAll(field);
    }
  }, {
    key: "animLose",
    value: function animLose(field) {
      this.lose = true;
      this.dropAll(field);
    }
  }, {
    key: "render",
    value: function render(field) {
      var _this6 = this;
      var ctx = this.canvas.getContext("2d");
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      var data = field.flat();
      data.forEach(function (_ref2) {
        var x = _ref2.x,
          y = _ref2.y,
          width = _ref2.width,
          height = _ref2.height,
          type = _ref2.type,
          scale = _ref2.scale;
        if (!type) return;
        var block = _this6.blocks.find(function (block) {
          return block.type === type;
        });
        var image = new Image(_constants__WEBPACK_IMPORTED_MODULE_0__.blockSize.width, _constants__WEBPACK_IMPORTED_MODULE_0__.blockSize.height);
        if (block.img) {
          image.src = block.img.src;
          ctx.drawImage(image, x + width * (0.5 - scale / 2) + _constants__WEBPACK_IMPORTED_MODULE_0__.canvasPadding / 2, y + height * (0.5 - scale / 2) + _constants__WEBPACK_IMPORTED_MODULE_0__.canvasPadding / 2, width * scale, height * scale);
        }
      });
      if (this.win) {
        ctx.fillStyle = "#ffffff";
        ctx.font = "100px serif";
        ctx.fillText("WIN", this.canvas.width / 2 - 100, this.canvas.height / 2 + 25);
      }
      if (this.lose) {
        ctx.fillStyle = "#ffffff";
        ctx.font = "100px serif";
        ctx.fillText("Lose", this.canvas.width / 2 - 100, this.canvas.height / 2 + 25);
      }
    }
  }]);
  return Gamefield;
}();

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "M": () => (/* binding */ M),
/* harmony export */   "N": () => (/* binding */ N),
/* harmony export */   "animDuration": () => (/* binding */ animDuration),
/* harmony export */   "blockSize": () => (/* binding */ blockSize),
/* harmony export */   "bombBonus": () => (/* binding */ bombBonus),
/* harmony export */   "bombRadius": () => (/* binding */ bombRadius),
/* harmony export */   "canvasPadding": () => (/* binding */ canvasPadding),
/* harmony export */   "colors": () => (/* binding */ colors),
/* harmony export */   "horizontalBonus": () => (/* binding */ horizontalBonus),
/* harmony export */   "minDelAmount": () => (/* binding */ minDelAmount),
/* harmony export */   "nukeBonus": () => (/* binding */ nukeBonus),
/* harmony export */   "shuffleTimes": () => (/* binding */ shuffleTimes),
/* harmony export */   "types": () => (/* binding */ types),
/* harmony export */   "verticalBonus": () => (/* binding */ verticalBonus)
/* harmony export */ });
var N = 10; //height
var M = 9; //width
var minDelAmount = 2;
var blockSize = {
  width: 410 / M,
  height: 450 / N
};
var colors = ["green", "yellow", "red", "purple", "blue"];
var types = [].concat(colors, ["bomb", "horizontal", "vertical", "nuke"]);
var horizontalBonus = 6;
var verticalBonus = 7;
var bombBonus = 8;
var nukeBonus = 10;
var bombRadius = 2;
var animDuration = 400;
var canvasPadding = 25;
var shuffleTimes = 3;

/***/ }),

/***/ "./src/game/game.js":
/*!**************************!*\
  !*** ./src/game/game.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Game": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _Gamefield_Gamefield__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Gamefield/Gamefield */ "./src/Gamefield/Gamefield.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./src/constants.js");
/* harmony import */ var _helpers_RNG__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/RNG */ "./src/helpers/RNG.js");
/* harmony import */ var _moves__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./moves */ "./src/game/moves.js");
/* harmony import */ var _score__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./score */ "./src/game/score.js");
/* harmony import */ var _shuffle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shuffle */ "./src/game/shuffle.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }






var Game = /*#__PURE__*/function () {
  function Game(images, aim, steps) {
    _classCallCheck(this, Game);
    this.canvas = document.getElementById("canvas");
    this.score = new _score__WEBPACK_IMPORTED_MODULE_4__.Score(aim);
    this.moves = new _moves__WEBPACK_IMPORTED_MODULE_3__.Moves(steps);
    this.shuffle = new _shuffle__WEBPACK_IMPORTED_MODULE_5__.Shuffle();
    this.rng = new _helpers_RNG__WEBPACK_IMPORTED_MODULE_2__.RNG();
    this.gamefield = new _Gamefield_Gamefield__WEBPACK_IMPORTED_MODULE_0__.Gamefield(images);
    this.field = [];
    this.group = new Array(_constants__WEBPACK_IMPORTED_MODULE_1__.M).fill(null).map(function () {
      return new Array(_constants__WEBPACK_IMPORTED_MODULE_1__.N).fill(null);
    });
    this.removeIds = [];
    this.gameOver = false;
    this.selectedIds = null;
  }
  _createClass(Game, [{
    key: "initGroup",
    value: function initGroup() {
      this.group = new Array(_constants__WEBPACK_IMPORTED_MODULE_1__.M).fill(null).map(function () {
        return new Array(_constants__WEBPACK_IMPORTED_MODULE_1__.N).fill(null);
      });
    }
  }, {
    key: "setField",
    value: function setField() {
      this.field = [];
      for (var i = 0; i < _constants__WEBPACK_IMPORTED_MODULE_1__.M; i++) {
        var column = [];
        for (var j = _constants__WEBPACK_IMPORTED_MODULE_1__.N - 1; j >= 0; j--) {
          column.push({
            x: _constants__WEBPACK_IMPORTED_MODULE_1__.blockSize.width * i,
            y: _constants__WEBPACK_IMPORTED_MODULE_1__.blockSize.height * j,
            width: _constants__WEBPACK_IMPORTED_MODULE_1__.blockSize.width,
            height: _constants__WEBPACK_IMPORTED_MODULE_1__.blockSize.height + _constants__WEBPACK_IMPORTED_MODULE_1__.blockSize.height * 0.1,
            type: this.rng.getType(),
            move: 0,
            toRemove: false,
            scale: 1
          });
        }
        this.field.push(column);
      }
    }
  }, {
    key: "selectBlock",
    value: function selectBlock(x, y) {
      var pos = {
        columnId: -1,
        rowId: -1
      };
      this.field.forEach(function (column, columnId) {
        column.forEach(function (elem, rowId) {
          var elemX = elem.x,
            elemY = elem.y,
            width = elem.width,
            height = elem.height;
          if (x >= elemX && x <= elemX + width && y >= elemY && y <= elemY + height) {
            pos = {
              columnId: columnId,
              rowId: rowId
            };
          }
        });
      });
      return pos;
    }
  }, {
    key: "checkGroup",
    value: function checkGroup(columnId, rowId) {
      if (this.group[columnId][rowId]) {
        return false;
      }
      return true;
    }
  }, {
    key: "addToGroup",
    value: function addToGroup(columnId, rowId, value) {
      if (columnId >= 0 && columnId < _constants__WEBPACK_IMPORTED_MODULE_1__.M && rowId >= 0 && rowId < _constants__WEBPACK_IMPORTED_MODULE_1__.N) this.group[columnId][rowId] = value;
    }
  }, {
    key: "checkNeighbour",
    value: function checkNeighbour(columnId, rowId, direction, value) {
      switch (direction) {
        case "top":
          if (rowId === _constants__WEBPACK_IMPORTED_MODULE_1__.N - 1) return;
          var topRowId = rowId + 1;
          if (this.field[columnId][topRowId] && this.field[columnId][topRowId].type === value) {
            if (this.checkGroup(columnId, topRowId)) {
              this.addToGroup(columnId, topRowId, value);
              this.collectNeighbours(columnId, topRowId);
            }
          }
          break;
        case "bottom":
          if (rowId === 0) return;
          var bottom = rowId - 1;
          if (this.field[columnId][bottom] && this.field[columnId][bottom].type === value) {
            if (this.checkGroup(columnId, bottom)) {
              this.addToGroup(columnId, bottom, value);
              this.collectNeighbours(columnId, bottom);
            }
          }
          break;
        case "right":
          if (columnId === _constants__WEBPACK_IMPORTED_MODULE_1__.M - 1) return;
          var rightColumnId = columnId + 1;
          if (this.field[rightColumnId][rowId]) {
            if (this.field[rightColumnId][rowId].type === value) {
              if (this.checkGroup(rightColumnId, rowId)) {
                this.addToGroup(rightColumnId, rowId, value);
                this.collectNeighbours(rightColumnId, rowId);
              }
            }
          }
          break;
        case "left":
          if (columnId === 0) return;
          var leftColumnId = columnId - 1;
          if (this.field[leftColumnId][rowId] && this.field[leftColumnId][rowId].type === value) {
            if (this.checkGroup(leftColumnId, rowId)) {
              this.addToGroup(leftColumnId, rowId, value);
              this.collectNeighbours(leftColumnId, rowId);
            }
          }
          break;
      }
    }
  }, {
    key: "collectNeighbours",
    value: function collectNeighbours(columnId, rowId) {
      var state = this.field[columnId][rowId].type;
      this.checkNeighbour(columnId, rowId, "top", state);
      this.checkNeighbour(columnId, rowId, "bottom", state);
      this.checkNeighbour(columnId, rowId, "right", state);
      this.checkNeighbour(columnId, rowId, "left", state);
    }
  }, {
    key: "findGroup",
    value: function findGroup(columnId, rowId) {
      var state = this.field[columnId][rowId].type;
      switch (state) {
        case "bomb":
          for (var i = -_constants__WEBPACK_IMPORTED_MODULE_1__.bombRadius; i <= _constants__WEBPACK_IMPORTED_MODULE_1__.bombRadius; i++) {
            for (var j = -_constants__WEBPACK_IMPORTED_MODULE_1__.bombRadius; j <= _constants__WEBPACK_IMPORTED_MODULE_1__.bombRadius; j++) {
              this.addToGroup(columnId - i, rowId - j, state);
              this.selectedIds = null;
            }
          }
          break;
        case "horizontal":
          for (var _i = 0; _i < _constants__WEBPACK_IMPORTED_MODULE_1__.M; _i++) {
            this.addToGroup(_i, rowId, state);
            this.selectedIds = null;
          }
          this.addToGroup(columnId, rowId, state);
          break;
        case "vertical":
          for (var _i2 = 0; _i2 < _constants__WEBPACK_IMPORTED_MODULE_1__.N; _i2++) {
            this.addToGroup(columnId, _i2, state);
            this.selectedIds = null;
          }
          this.addToGroup(columnId, rowId, state);
          break;
        case "nuke":
          for (var _i3 = 0; _i3 <= _constants__WEBPACK_IMPORTED_MODULE_1__.M; _i3++) {
            for (var _j = 0; _j <= _constants__WEBPACK_IMPORTED_MODULE_1__.N; _j++) {
              this.addToGroup(_i3, _j, state);
              this.selectedIds = null;
            }
          }
          break;
        default:
          this.addToGroup(columnId, rowId, state);
          this.selectedIds = {
            col: columnId,
            row: rowId
          };
          this.collectNeighbours(columnId, rowId);
      }
    }
  }, {
    key: "checkBonuses",
    value: function checkBonuses() {
      if (this.selectedIds) {
        var selected = this.field[this.selectedIds.col][this.selectedIds.row];
        if (this.removeIds.length >= _constants__WEBPACK_IMPORTED_MODULE_1__.nukeBonus) {
          selected.type = "nuke";
          selected.toRemove = false;
          return;
        }
        if (this.removeIds.length >= _constants__WEBPACK_IMPORTED_MODULE_1__.bombBonus) {
          selected.type = "bomb";
          selected.toRemove = false;
          return;
        }
        if (this.removeIds.length >= _constants__WEBPACK_IMPORTED_MODULE_1__.verticalBonus) {
          selected.type = "vertical";
          selected.toRemove = false;
          return;
        }
        if (this.removeIds.length >= _constants__WEBPACK_IMPORTED_MODULE_1__.horizontalBonus) {
          selected.type = "horizontal";
          selected.toRemove = false;
          return;
        }
      }
    }
  }, {
    key: "removeBlocks",
    value: function removeBlocks() {
      var _this = this;
      if (this.removeIds.length >= _constants__WEBPACK_IMPORTED_MODULE_1__.minDelAmount) {
        this.moves.decrement();
        this.removeIds.forEach(function (_ref) {
          var CI = _ref.CI,
            RI = _ref.RI;
          _this.field[CI][RI].toRemove = true;
          _this.score.increase();
        });
        this.gamefield.animRemove(this.field);
        window.setTimeout(function () {
          _this.updateField();
        }, _constants__WEBPACK_IMPORTED_MODULE_1__.animDuration / 2);
      }
      this.checkBonuses();
      this.initGroup();
      this.removeIds = [];
    }
  }, {
    key: "updateField",
    value: function updateField() {
      var _this2 = this;
      this.field.forEach(function (column, ci) {
        var tcol = column.filter(function (_ref2) {
          var toRemove = _ref2.toRemove;
          return !toRemove;
        });
        column.forEach(function (row, ri) {
          if (tcol[ri]) {
            row.type = tcol[ri].type;
            row.move = row.y - tcol[ri].y;
            row.scale = 1;
            row.toRemove = false;
          } else {
            row.scale = 1;
            row.toRemove = false;
            row.type = _this2.rng.getType();
            row.move = _constants__WEBPACK_IMPORTED_MODULE_1__.blockSize.height * (ri + 2);
          }
        });
      });
      this.gamefield.animDrop(this.field);
      this.checkGame();
    }
  }, {
    key: "clickCB",
    value: function clickCB(event) {
      var _this3 = this;
      var canvasLeft = this.canvas.offsetLeft + this.canvas.clientLeft + _constants__WEBPACK_IMPORTED_MODULE_1__.canvasPadding / 2;
      var canvasTop = this.canvas.offsetTop + this.canvas.clientTop + _constants__WEBPACK_IMPORTED_MODULE_1__.canvasPadding / 2;
      if (this.gamefield.animInProgress || this.gameOver) return;
      var x = event.pageX - canvasLeft;
      var y = event.pageY - canvasTop;
      var _this$selectBlock = this.selectBlock(x, y),
        columnId = _this$selectBlock.columnId,
        rowId = _this$selectBlock.rowId;
      if (columnId >= 0 && rowId >= 0) {
        this.findGroup(columnId, rowId);
        this.group.forEach(function (column, CI) {
          column.forEach(function (row, RI) {
            if (row) {
              _this3.removeIds.push({
                CI: CI,
                RI: RI
              });
            }
          });
        });
        this.removeBlocks();
      }
    }
  }, {
    key: "addListener",
    value: function addListener() {
      var _this4 = this;
      this.canvas.addEventListener("click", function (event) {
        return _this4.clickCB(event);
      });
    }
  }, {
    key: "checkGame",
    value: function checkGame() {
      var isWin = this.score.checkWin();
      var isLose = this.moves.checkLose();
      if (isWin) this.win();
      if (isLose) this.lose();
    }
  }, {
    key: "win",
    value: function win() {
      this.gameOver = true;
      this.gamefield.animWin(this.field);
      this.canvas.removeEventListener("click", this.clickCB);
      document.getElementById("restart").style.display = "flex";
      this.shuffle.getShuffleButton().style.display = "none";
    }
  }, {
    key: "lose",
    value: function lose() {
      this.gameOver = true;
      this.gamefield.animLose(this.field);
      this.canvas.removeEventListener("click", this.clickCB);
      document.getElementById("restart").style.display = "flex";
      this.shuffle.getShuffleButton().style.display = "none";
    }
  }, {
    key: "shuffleCB",
    value: function shuffleCB() {
      this.setField();
      this.gamefield.render(this.field);
      this.shuffle.decrement();
      if (this.shuffle.check()) {
        document.getElementById("restart").style.display = "flex";
      }
    }
  }, {
    key: "initGame",
    value: function initGame() {
      var _this5 = this;
      this.score.init();
      this.moves.init();
      this.shuffle.init();
      this.shuffle.getShuffleButton().addEventListener("click", function () {
        return _this5.shuffleCB();
      });
      this.setField();
      this.initGroup();
      this.gamefield.render(this.field);
      this.addListener();
    }
  }]);
  return Game;
}();

/***/ }),

/***/ "./src/game/moves.js":
/*!***************************!*\
  !*** ./src/game/moves.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Moves": () => (/* binding */ Moves)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Moves = /*#__PURE__*/function () {
  function Moves(movesSet) {
    _classCallCheck(this, Moves);
    this.moves = movesSet;
    this.movesField = document.getElementById("moves");
  }
  _createClass(Moves, [{
    key: "set",
    value: function set() {
      this.movesField.innerText = this.moves;
    }
  }, {
    key: "init",
    value: function init() {
      if (this.moves < 5) this.moves = 5;
      if (this.moves > 100) this.moves = 100;
      this.set();
    }
  }, {
    key: "decrement",
    value: function decrement() {
      this.moves--;
      this.set();
    }
  }, {
    key: "checkLose",
    value: function checkLose() {
      return this.moves <= 0;
    }
  }]);
  return Moves;
}();

/***/ }),

/***/ "./src/game/score.js":
/*!***************************!*\
  !*** ./src/game/score.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Score": () => (/* binding */ Score)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Score = /*#__PURE__*/function () {
  function Score(aimSet) {
    _classCallCheck(this, Score);
    this.aim = aimSet;
    this.score = 0;
    this.scoreField = document.getElementById("score");
    this.pointsField = document.getElementById("points");
  }
  _createClass(Score, [{
    key: "set",
    value: function set() {
      this.scoreField.style.transform = "translateX(-".concat(100 - this.score / this.aim * 100, "%)");
      this.pointsField.innerText = this.score;
    }
  }, {
    key: "init",
    value: function init() {
      if (this.aim < 1) this.aim = 1;
      if (this.aim > 1000) this.aim = 1000;
      this.set();
    }
  }, {
    key: "increase",
    value: function increase() {
      this.score++;
      this.set();
    }
  }, {
    key: "checkWin",
    value: function checkWin() {
      return this.score >= this.aim;
    }
  }]);
  return Score;
}();

/***/ }),

/***/ "./src/game/shuffle.js":
/*!*****************************!*\
  !*** ./src/game/shuffle.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Shuffle": () => (/* binding */ Shuffle)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var Shuffle = /*#__PURE__*/function () {
  function Shuffle() {
    _classCallCheck(this, Shuffle);
    this.times = _constants__WEBPACK_IMPORTED_MODULE_0__.shuffleTimes;
    this.timesField = document.getElementById("shuffleTimes");
    this.shuffleButton = document.getElementById("shuffle");
  }
  _createClass(Shuffle, [{
    key: "set",
    value: function set() {
      this.timesField.innerText = this.times;
    }
  }, {
    key: "init",
    value: function init() {
      this.shuffleButton.style.display = "flex";
      this.shuffleButton.style.opacity = 1;
      this.set();
    }
  }, {
    key: "getShuffleButton",
    value: function getShuffleButton() {
      return this.shuffleButton;
    }
  }, {
    key: "check",
    value: function check() {
      if (this.times <= 0) {
        this.shuffleButton.style.opacity = 0.5;
        this.shuffleButton.replaceWith(this.shuffleButton.cloneNode(true));
      }
      return this.times <= 0;
    }
  }, {
    key: "decrement",
    value: function decrement() {
      this.times--;
      this.set();
      this.check();
    }
  }]);
  return Shuffle;
}();

/***/ }),

/***/ "./src/helpers/RNG.js":
/*!****************************!*\
  !*** ./src/helpers/RNG.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RNG": () => (/* binding */ RNG)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var RNG = /*#__PURE__*/function () {
  function RNG() {
    _classCallCheck(this, RNG);
  }
  _createClass(RNG, [{
    key: "generateNumber",
    value: function generateNumber(n) {
      return Math.floor(Math.random() * (n + 1));
    }
  }, {
    key: "getType",
    value: function getType() {
      var colorId = this.generateNumber(_constants__WEBPACK_IMPORTED_MODULE_0__.colors.length - 1);
      return _constants__WEBPACK_IMPORTED_MODULE_0__.colors[colorId];
    }
  }]);
  return RNG;
}();

/***/ }),

/***/ "./src/helpers/assetsLoading/getAssetsData.js":
/*!****************************************************!*\
  !*** ./src/helpers/assetsLoading/getAssetsData.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAssetsData": () => (/* binding */ getAssetsData)
/* harmony export */ });
/* harmony import */ var _assets_blue_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assets/blue.png */ "./src/assets/blue.png");
/* harmony import */ var _assets_green_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../assets/green.png */ "./src/assets/green.png");
/* harmony import */ var _assets_purple_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../assets/purple.png */ "./src/assets/purple.png");
/* harmony import */ var _assets_red_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../assets/red.png */ "./src/assets/red.png");
/* harmony import */ var _assets_yellow_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../assets/yellow.png */ "./src/assets/yellow.png");
/* harmony import */ var _assets_bomb_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../assets/bomb.png */ "./src/assets/bomb.png");
/* harmony import */ var _assets_horizontalArrow_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../assets/horizontalArrow.png */ "./src/assets/horizontalArrow.png");
/* harmony import */ var _assets_verticalArrow_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../assets/verticalArrow.png */ "./src/assets/verticalArrow.png");
/* harmony import */ var _assets_nuke_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../assets/nuke.png */ "./src/assets/nuke.png");









var getAssetsData = function getAssetsData() {
  return [{
    link: _assets_blue_png__WEBPACK_IMPORTED_MODULE_0__,
    type: "blue"
  }, {
    link: _assets_green_png__WEBPACK_IMPORTED_MODULE_1__,
    type: "green"
  }, {
    link: _assets_purple_png__WEBPACK_IMPORTED_MODULE_2__,
    type: "purple"
  }, {
    link: _assets_red_png__WEBPACK_IMPORTED_MODULE_3__,
    type: "red"
  }, {
    link: _assets_yellow_png__WEBPACK_IMPORTED_MODULE_4__,
    type: "yellow"
  }, {
    link: _assets_bomb_png__WEBPACK_IMPORTED_MODULE_5__,
    type: "bomb"
  }, {
    link: _assets_horizontalArrow_png__WEBPACK_IMPORTED_MODULE_6__,
    type: "horizontal"
  }, {
    link: _assets_verticalArrow_png__WEBPACK_IMPORTED_MODULE_7__,
    type: "vertical"
  }, {
    link: _assets_nuke_png__WEBPACK_IMPORTED_MODULE_8__,
    type: "nuke"
  }];
};

/***/ }),

/***/ "./src/helpers/assetsLoading/loadAssets.js":
/*!*************************************************!*\
  !*** ./src/helpers/assetsLoading/loadAssets.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadAssets": () => (/* binding */ loadAssets)
/* harmony export */ });
/* harmony import */ var _getAssetsData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getAssetsData */ "./src/helpers/assetsLoading/getAssetsData.js");
/* harmony import */ var _loadImage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loadImage */ "./src/helpers/assetsLoading/loadImage.js");


var loadAssets = function loadAssets() {
  var imgs = (0,_getAssetsData__WEBPACK_IMPORTED_MODULE_0__.getAssetsData)();
  var assetsLoaded = imgs.map(function (data) {
    return (0,_loadImage__WEBPACK_IMPORTED_MODULE_1__.loadImage)(data);
  });
  return Promise.all(assetsLoaded);
};

/***/ }),

/***/ "./src/helpers/assetsLoading/loadImage.js":
/*!************************************************!*\
  !*** ./src/helpers/assetsLoading/loadImage.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadImage": () => (/* binding */ loadImage)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ "./src/constants.js");

var loadImage = function loadImage(_ref) {
  var link = _ref.link,
    type = _ref.type;
  return new Promise(function (resolve) {
    var img = new Image();
    img.onerror = function (e) {
      return reject("".concat(link, " failed to load"));
    };
    img.onload = function (e) {
      return resolve(img);
    };
    img.src = link;
    img.size = _constants__WEBPACK_IMPORTED_MODULE_0__.blockSize;
    img.type = type;
  });
};

/***/ }),

/***/ "./src/helpers/displayGameScreen.js":
/*!******************************************!*\
  !*** ./src/helpers/displayGameScreen.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayGameScreen": () => (/* binding */ displayGameScreen)
/* harmony export */ });
var displayGameScreen = function displayGameScreen() {
  document.querySelector(".homeScreen").style.display = "none";
  document.querySelector(".gameScreen").style.display = "flex";
};

/***/ }),

/***/ "./src/helpers/displayStartScreen.js":
/*!*******************************************!*\
  !*** ./src/helpers/displayStartScreen.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayStartScreen": () => (/* binding */ displayStartScreen)
/* harmony export */ });
var displayStartScreen = function displayStartScreen() {
  document.querySelector(".gameScreen").style.display = "none";
  document.querySelector(".homeScreen").style.display = "flex";
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss ***!
  \***********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/panelScore.png */ "./src/assets/panelScore.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/button.png */ "./src/assets/button.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/button2.png */ "./src/assets/button2.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/fieldBackground.png */ "./src/assets/fieldBackground.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/progressBackground.png */ "./src/assets/progressBackground.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/progressBarBackground.png */ "./src/assets/progressBarBackground.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_6___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/progressBar.png */ "./src/assets/progressBar.png"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_5___);
var ___CSS_LOADER_URL_REPLACEMENT_6___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_6___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  user-select: none;\n  font-family: \"Marvin\", sans-serif;\n  color: #dddddd;\n}\n\nbody {\n  background-color: rgba(0, 0, 0, 0.37);\n}\n\n.homeScreen {\n  height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.homeScreen__start {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 20px;\n}\n.homeScreen__start label {\n  font-size: 24px;\n}\n.homeScreen__start input {\n  color: black;\n  width: 120px;\n  padding: 5px;\n  border-radius: 10px;\n  font-size: 24px;\n}\n.homeScreen__start button {\n  width: 150px;\n  height: 70px;\n  font-size: 36px;\n  border-radius: 10px;\n  color: black;\n  cursor: pointer;\n}\n.homeScreen__start button:hover {\n  color: #dddddd;\n}\n\n.gameScreen {\n  flex-direction: column;\n  display: none;\n}\n.gameScreen .gameField {\n  display: flex;\n  justify-content: space-evenly;\n}\n.gameScreen .gameField__controls {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-around;\n}\n.gameScreen .gameField__controls .panelScore {\n  width: 278px;\n  height: 260px;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-size: contain;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 40px;\n  color: #dddddd;\n  font-weight: 700;\n  font-size: 24px;\n}\n.gameScreen .gameField__controls .panelScore__moves {\n  font-size: 60px;\n}\n.gameScreen .gameField__controls .panelScore__points {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-between;\n  gap: 5px;\n}\n.gameScreen .gameField__controls .restart {\n  width: 230px;\n  height: 74px;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n  background-size: contain;\n  display: none;\n  justify-content: center;\n  align-items: center;\n  font-weight: 700;\n  cursor: pointer;\n}\n.gameScreen .gameField__controls .shuffle {\n  width: 115px;\n  height: 50px;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n  background-size: contain;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-weight: 700;\n  font-size: 12px;\n  cursor: pointer;\n}\n\ncanvas {\n  border-radius: 25px;\n  border: 1px solid #dddddd;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ");\n  background-size: cover;\n}\n\n.progress {\n  width: 400px;\n  height: 80px;\n  margin: 0 auto;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ");\n  background-size: cover;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 50px;\n}\n.progress__title {\n  text-transform: uppercase;\n  font-size: 20px;\n  font-weight: 800;\n}\n.progress__PB-background {\n  width: 360px;\n  height: 30px;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ");\n  border-radius: 30px;\n  background-size: cover;\n  overflow: hidden;\n}\n.progress #score {\n  width: 360px;\n  height: 30px;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_6___ + ");\n  background-size: contain;\n}", "",{"version":3,"sources":["webpack://./src/styles/main.scss"],"names":[],"mappings":"AAGA;EACE,SAAA;EACA,UAAA;EACA,sBAAA;EACA,iBAAA;EACA,iCAAA;EACA,cARa;AAMf;;AAKA;EACE,qCAbgB;AAWlB;;AAKA;EACE,aAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;AAFF;AAGE;EACE,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,uBAAA;EACA,SAAA;AADJ;AAGI;EACE,eAAA;AADN;AAII;EACE,YAAA;EACA,YAAA;EACA,YAAA;EACA,mBAAA;EACA,eAAA;AAFN;AAKI;EACE,YAAA;EACA,YAAA;EACA,eAAA;EACA,mBAAA;EACA,YAAA;EACA,eAAA;AAHN;AAKM;EACE,cAhDO;AA6Cf;;AASA;EACE,sBAAA;EACA,aAAA;AANF;AAQE;EACE,aAAA;EACA,6BAAA;AANJ;AAQI;EACE,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,6BAAA;AANN;AAOM;EACE,YAAA;EACA,aAAA;EACA,yDAAA;EACA,wBAAA;EAEA,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,uBAAA;EACA,SAAA;EACA,cA9EO;EA+EP,gBAAA;EACA,eAAA;AANR;AAQQ;EACE,eAAA;AANV;AASQ;EACE,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,8BAAA;EACA,QAAA;AAPV;AAWM;EACE,YAAA;EACA,YAAA;EACA,yDAAA;EACA,wBAAA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,gBAAA;EACA,eAAA;AATR;AAYM;EACE,YAAA;EACA,YAAA;EACA,yDAAA;EACA,wBAAA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,gBAAA;EACA,eAAA;EACA,eAAA;AAVR;;AAgBA;EACE,mBAAA;EACA,yBAAA;EACA,yDAAA;EACA,sBAAA;AAbF;;AAgBA;EACE,YAAA;EACA,YAAA;EACA,cAAA;EACA,yDAAA;EACA,sBAAA;EACA,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,uBAAA;EACA,mBAAA;AAbF;AAeE;EACE,yBAAA;EACA,eAAA;EACA,gBAAA;AAbJ;AAgBE;EACE,YAAA;EACA,YAAA;EACA,yDAAA;EACA,mBAAA;EACA,sBAAA;EACA,gBAAA;AAdJ;AAiBE;EACE,YAAA;EACA,YAAA;EACA,yDAAA;EACA,wBAAA;AAfJ","sourcesContent":["$background-main: rgba(0, 0, 0, 0.37);\r\n$primary-grey: #dddddd;\r\n\r\n* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n  user-select: none;\r\n  font-family: \"Marvin\", sans-serif;\r\n  color: $primary-grey;\r\n}\r\n\r\nbody {\r\n  background-color: $background-main;\r\n}\r\n\r\n.homeScreen {\r\n  height: 100vh;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  &__start {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: center;\r\n    gap: 20px;\r\n\r\n    label {\r\n      font-size: 24px;\r\n    }\r\n\r\n    input {\r\n      color: black;\r\n      width: 120px;\r\n      padding: 5px;\r\n      border-radius: 10px;\r\n      font-size: 24px;\r\n    }\r\n\r\n    button {\r\n      width: 150px;\r\n      height: 70px;\r\n      font-size: 36px;\r\n      border-radius: 10px;\r\n      color: black;\r\n      cursor: pointer;\r\n\r\n      &:hover {\r\n        color: $primary-grey;\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n.gameScreen {\r\n  flex-direction: column;\r\n  display: none;\r\n\r\n  .gameField {\r\n    display: flex;\r\n    justify-content: space-evenly;\r\n\r\n    &__controls {\r\n      display: flex;\r\n      flex-direction: column;\r\n      align-items: center;\r\n      justify-content: space-around;\r\n      .panelScore {\r\n        width: 278px;\r\n        height: 260px;\r\n        background-image: url(../assets/panelScore.png);\r\n        background-size: contain;\r\n\r\n        display: flex;\r\n        flex-direction: column;\r\n        align-items: center;\r\n        justify-content: center;\r\n        gap: 40px;\r\n        color: $primary-grey;\r\n        font-weight: 700;\r\n        font-size: 24px;\r\n\r\n        &__moves {\r\n          font-size: 60px;\r\n        }\r\n\r\n        &__points {\r\n          display: flex;\r\n          flex-direction: column;\r\n          align-items: center;\r\n          justify-content: space-between;\r\n          gap: 5px;\r\n        }\r\n      }\r\n\r\n      .restart {\r\n        width: 230px;\r\n        height: 74px;\r\n        background-image: url(../assets/button.png);\r\n        background-size: contain;\r\n        display: none;\r\n        justify-content: center;\r\n        align-items: center;\r\n        font-weight: 700;\r\n        cursor: pointer;\r\n      }\r\n\r\n      .shuffle {\r\n        width: 115px;\r\n        height: 50px;\r\n        background-image: url(../assets/button2.png);\r\n        background-size: contain;\r\n        display: flex;\r\n        justify-content: center;\r\n        align-items: center;\r\n        font-weight: 700;\r\n        font-size: 12px;\r\n        cursor: pointer;\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\ncanvas {\r\n  border-radius: 25px;\r\n  border: 1px solid $primary-grey;\r\n  background-image: url(../assets/fieldBackground.png);\r\n  background-size: cover;\r\n}\r\n\r\n.progress {\r\n  width: 400px;\r\n  height: 80px;\r\n  margin: 0 auto;\r\n  background-image: url(../assets/progressBackground.png);\r\n  background-size: cover;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  margin-bottom: 50px;\r\n\r\n  &__title {\r\n    text-transform: uppercase;\r\n    font-size: 20px;\r\n    font-weight: 800;\r\n  }\r\n\r\n  &__PB-background {\r\n    width: 360px;\r\n    height: 30px;\r\n    background-image: url(../assets/progressBarBackground.png);\r\n    border-radius: 30px;\r\n    background-size: cover;\r\n    overflow: hidden;\r\n  }\r\n\r\n  #score {\r\n    width: 360px;\r\n    height: 30px;\r\n    background-image: url(../assets/progressBar.png);\r\n    background-size: contain;\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles/main.scss":
/*!******************************!*\
  !*** ./src/styles/main.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./main.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/blue.png":
/*!*****************************!*\
  !*** ./src/assets/blue.png ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "blue.png";

/***/ }),

/***/ "./src/assets/bomb.png":
/*!*****************************!*\
  !*** ./src/assets/bomb.png ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "bomb.png";

/***/ }),

/***/ "./src/assets/button.png":
/*!*******************************!*\
  !*** ./src/assets/button.png ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "button.png";

/***/ }),

/***/ "./src/assets/button2.png":
/*!********************************!*\
  !*** ./src/assets/button2.png ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "button2.png";

/***/ }),

/***/ "./src/assets/fieldBackground.png":
/*!****************************************!*\
  !*** ./src/assets/fieldBackground.png ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "fieldBackground.png";

/***/ }),

/***/ "./src/assets/green.png":
/*!******************************!*\
  !*** ./src/assets/green.png ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "green.png";

/***/ }),

/***/ "./src/assets/horizontalArrow.png":
/*!****************************************!*\
  !*** ./src/assets/horizontalArrow.png ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "horizontalArrow.png";

/***/ }),

/***/ "./src/assets/nuke.png":
/*!*****************************!*\
  !*** ./src/assets/nuke.png ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "nuke.png";

/***/ }),

/***/ "./src/assets/panelScore.png":
/*!***********************************!*\
  !*** ./src/assets/panelScore.png ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "panelScore.png";

/***/ }),

/***/ "./src/assets/progressBackground.png":
/*!*******************************************!*\
  !*** ./src/assets/progressBackground.png ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "progressBackground.png";

/***/ }),

/***/ "./src/assets/progressBar.png":
/*!************************************!*\
  !*** ./src/assets/progressBar.png ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "progressBar.png";

/***/ }),

/***/ "./src/assets/progressBarBackground.png":
/*!**********************************************!*\
  !*** ./src/assets/progressBarBackground.png ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "progressBarBackground.png";

/***/ }),

/***/ "./src/assets/purple.png":
/*!*******************************!*\
  !*** ./src/assets/purple.png ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "purple.png";

/***/ }),

/***/ "./src/assets/red.png":
/*!****************************!*\
  !*** ./src/assets/red.png ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "red.png";

/***/ }),

/***/ "./src/assets/verticalArrow.png":
/*!**************************************!*\
  !*** ./src/assets/verticalArrow.png ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "verticalArrow.png";

/***/ }),

/***/ "./src/assets/yellow.png":
/*!*******************************!*\
  !*** ./src/assets/yellow.png ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "yellow.png";

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
/******/ 			id: moduleId,
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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"bundle": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
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
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/main.scss */ "./src/styles/main.scss");
/* harmony import */ var _helpers_assetsLoading_loadAssets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/assetsLoading/loadAssets */ "./src/helpers/assetsLoading/loadAssets.js");
/* harmony import */ var _game_game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game/game */ "./src/game/game.js");
/* harmony import */ var _helpers_displayStartScreen__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/displayStartScreen */ "./src/helpers/displayStartScreen.js");
/* harmony import */ var _helpers_displayGameScreen__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helpers/displayGameScreen */ "./src/helpers/displayGameScreen.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





var init = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(aim, steps) {
    var images, game;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          (0,_helpers_displayGameScreen__WEBPACK_IMPORTED_MODULE_4__.displayGameScreen)();
          _context.next = 3;
          return (0,_helpers_assetsLoading_loadAssets__WEBPACK_IMPORTED_MODULE_1__.loadAssets)();
        case 3:
          images = _context.sent;
          game = new _game_game__WEBPACK_IMPORTED_MODULE_2__.Game(images, aim, steps);
          game.initGame();
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function init(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var startButton = document.getElementById("gameStart");
var restartButton = document.getElementById("restart");
startButton.addEventListener("click", function () {
  var aim = document.getElementById("aimSet").value;
  var steps = document.getElementById("stepsSet").value;
  init(aim, steps);
});
restartButton.addEventListener("click", function () {
  (0,_helpers_displayStartScreen__WEBPACK_IMPORTED_MODULE_3__.displayStartScreen)();
  document.getElementById("restart").style.display = "none";
});
})();

/******/ })()
;
//# sourceMappingURL=bundlee57802f6042f77332e68.js.map