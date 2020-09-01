"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.frostgraveActor = void 0;

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
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
var frostgraveActor =
/*#__PURE__*/
function (_Actor) {
  _inherits(frostgraveActor, _Actor);

  function frostgraveActor() {
    _classCallCheck(this, frostgraveActor);

    return _possibleConstructorReturn(this, _getPrototypeOf(frostgraveActor).apply(this, arguments));
  }

  _createClass(frostgraveActor, [{
    key: "prepareData",

    /**
     * Augment the basic actor data with additional dynamic data.
     */
    value: function prepareData() {
      _get(_getPrototypeOf(frostgraveActor.prototype), "prepareData", this).call(this);

      var actorData = this.data;
      var data = actorData.data;
      var flags = actorData.flags; // Make separate methods for each Actor type (character, npc, etc.) to keep
      // things organized.

      if (actorData.type === 'character') this._prepareCharacterData(actorData);
    }
    /**
     * Prepare Character type specific data
     */

  }, {
    key: "_prepareCharacterData",
    value: function _prepareCharacterData(actorData) {
      var data = actorData.data; // Make modifications to data here. For example:

      data.exptotal = data.expscenario + data.expbanked;
    }
  }]);

  return frostgraveActor;
}(Actor);

exports.frostgraveActor = frostgraveActor;