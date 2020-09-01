"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.frostgraveItemSheet = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
var frostgraveItemSheet =
/*#__PURE__*/
function (_ItemSheet) {
  _inherits(frostgraveItemSheet, _ItemSheet);

  function frostgraveItemSheet() {
    _classCallCheck(this, frostgraveItemSheet);

    return _possibleConstructorReturn(this, _getPrototypeOf(frostgraveItemSheet).apply(this, arguments));
  }

  _createClass(frostgraveItemSheet, [{
    key: "getData",

    /* -------------------------------------------- */

    /** @override */
    value: function getData() {
      var data = _get(_getPrototypeOf(frostgraveItemSheet.prototype), "getData", this).call(this);

      return data;
    }
    /* -------------------------------------------- */

    /** @override */

  }, {
    key: "setPosition",
    value: function setPosition() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var position = _get(_getPrototypeOf(frostgraveItemSheet.prototype), "setPosition", this).call(this, options);

      var sheetBody = this.element.find(".sheet-body");
      var bodyHeight = position.height - 192;
      sheetBody.css("height", bodyHeight);
      return position;
    }
    /* -------------------------------------------- */

    /** @override */

  }, {
    key: "activateListeners",
    value: function activateListeners(html) {
      _get(_getPrototypeOf(frostgraveItemSheet.prototype), "activateListeners", this).call(this, html); // Everything below here is only needed if the sheet is editable


      if (!this.options.editable) return; // Roll handlers, click handlers, etc. would go here.
    }
  }, {
    key: "template",

    /** @override */
    get: function get() {
      var path = "systems/frostgrave/templates/item"; // Return a single sheet for all item types.
      // return `${path}/item-sheet.html`;
      // Alternatively, you could use the following return statement to do a
      // unique item sheet by type, like `weapon-sheet.html`.

      return "".concat(path, "/item-").concat(this.item.data.type, "-sheet.html");
    }
  }], [{
    key: "defaultOptions",

    /** @override */
    get: function get() {
      return mergeObject(_get(_getPrototypeOf(frostgraveItemSheet), "defaultOptions", this), {
        classes: ["frostgrave", "sheet", "item"],
        width: 450,
        height: 500,
        tabs: [{
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "attributes"
        }]
      });
    }
  }]);

  return frostgraveItemSheet;
}(ItemSheet);

exports.frostgraveItemSheet = frostgraveItemSheet;