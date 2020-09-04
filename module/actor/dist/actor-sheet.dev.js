"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.frostgraveActorSheet = void 0;

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
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
var frostgraveActorSheet =
/*#__PURE__*/
function (_ActorSheet) {
  _inherits(frostgraveActorSheet, _ActorSheet);

  function frostgraveActorSheet() {
    _classCallCheck(this, frostgraveActorSheet);

    return _possibleConstructorReturn(this, _getPrototypeOf(frostgraveActorSheet).apply(this, arguments));
  }

  _createClass(frostgraveActorSheet, [{
    key: "getData",

    /* -------------------------------------------- */

    /** @override */
    value: function getData() {
      var data = _get(_getPrototypeOf(frostgraveActorSheet.prototype), "getData", this).call(this);

      data.dtypes = ["String", "Number", "Boolean"]; //for (let attr of Object.values(data.data.attributes)) {
      //  attr.isCheckbox = attr.dtype === "Boolean";
      // }
      // Prepare items.

      if (this.actor.data.type == "character") {
        this._prepareCharacterItems(data);
      }

      return data;
    }
    /** @override */

  }, {
    key: "activateListeners",
    value: function activateListeners(html) {
      var _this = this;

      _get(_getPrototypeOf(frostgraveActorSheet.prototype), "activateListeners", this).call(this, html); // Everything below here is only needed if the sheet is editable


      if (!this.options.editable) return; // Add Inventory Item

      html.find(".item-create").click(this._onItemCreate.bind(this)); // Edit Inventory Item

      html.find(".item-edit").click(function (ev) {
        var card = $(ev.currentTarget).parents(".item-card");

        var item = _this.actor.getOwnedItem(card.data("item-id"));

        item.sheet.render(true);
      }); // Delete Inventory Item

      html.find(".item-delete").click(function (ev) {
        var card = $(ev.currentTarget).parents(".item-card");

        _this.actor.deleteOwnedItem(card.data("item-id"));
      }); // Rollable abilities.

      html.find(".rollable").click(this._onRoll.bind(this));
    }
    /* -------------------------------------------- */

    /**
     * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
     * @param {Event} event   The originating click event
     * @private
     */

  }, {
    key: "_onItemCreate",
    value: function _onItemCreate(event) {
      event.preventDefault();
      var header = event.currentTarget; // Get the type of item to create.

      var type = header.dataset.type; // Grab any data associated with this control.

      var data = duplicate(header.dataset); // Initialize a default name.

      var name = "New ".concat(type.capitalize()); // Prepare the item object.

      var itemData = {
        name: name,
        type: type,
        data: data
      }; // Remove the type from the dataset since it's in the itemData.type prop.

      delete itemData.data["type"]; // Finally, create the item!

      return this.actor.createOwnedItem(itemData);
    }
    /**
     * Handle clickable rolls.
     * @param {Event} event   The originating click event
     * @private
     */

  }, {
    key: "_onRoll",
    value: function _onRoll(event) {
      event.preventDefault();
      var element = event.currentTarget;
      var dataset = element.dataset;

      if (dataset.roll) {
        var roll = new Roll(dataset.roll, this.actor.data.data);
        var damage = parseInt(roll.roll().total) + parseInt(dataset.bonus);
        var rollflavor = "".concat(dataset.label, " Roll: ") + roll.total;

        if (dataset.label == "Combat" || dataset.label == "Shooting") {
          var damageflavor = "<br>Damage: " + damage;
          rollflavor = rollflavor + damageflavor;
        }

        roll.toMessage({
          speaker: ChatMessage.getSpeaker({
            actor: this.actor
          }),
          flavor: rollflavor
        });
      }
    }
    /**
     * Organize and classify Items for Character sheets.
     *
     * @param {Object} actorData The actor to prepare.
     *
     * @return {undefined}
     */

  }, {
    key: "_prepareCharacterItems",
    value: function _prepareCharacterItems(sheetData) {
      var actorData = sheetData.actor; // Initialize containers.

      var gear = [];
      var features = [];
      var spells = []; // Iterate through items, allocating to containers
      // let totalWeight = 0;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = sheetData.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var i = _step.value;
          var item = i.data;
          i.img = i.img || DEFAULT_TOKEN; // Append to gear.

          if (i.type === "item") {
            gear.push(i);
          } // Append to features.
          else if (i.type === "feature") {
              features.push(i);
            } // Append to spells.
            else if (i.type === "spell") {
                spells.push(i);
              }
        } // Assign and return

      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      actorData.gear = gear;
      actorData.features = features;
      actorData.spells = spells;
    }
  }], [{
    key: "defaultOptions",

    /** @override */
    get: function get() {
      return mergeObject(_get(_getPrototypeOf(frostgraveActorSheet), "defaultOptions", this), {
        classes: ["frostgrave", "sheet", "actor"],
        template: "systems/frostgrave/templates/actor/actor-sheet.html",
        width: 600,
        height: 650,
        tabs: [{
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "items"
        }]
      });
    }
  }]);

  return frostgraveActorSheet;
}(ActorSheet);

exports.frostgraveActorSheet = frostgraveActorSheet;