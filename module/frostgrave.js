// Import Modules
import { frostgraveActor } from "./actor/actor.js";
import { frostgraveActorSheet } from "./actor/actor-sheet.js";
import { frostgraveItem } from "./item/item.js";
import { frostgraveItemSheet } from "./item/item-sheet.js";
import { preloadHandlebarsTemplates } from "./templates.js";

Hooks.once("init", async function () {
  game.frostgrave = {
    frostgraveActor,
    frostgraveItem,
  };

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d20",
    decimals: 2,
  };

  // Define custom Entity classes
  CONFIG.Actor.entityClass = frostgraveActor;
  CONFIG.Item.entityClass = frostgraveItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("frostgrave", frostgraveActorSheet, {
    makeDefault: true,
  });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("frostgrave", frostgraveItemSheet, {
    types: ["item", "feature", "spell"],
    makeDefault: true,
  });

  // If you need to add Handlebars helpers, here are a few useful examples:
  Handlebars.registerHelper("concat", function () {
    var outStr = "";
    for (var arg in arguments) {
      if (typeof arguments[arg] != "object") {
        outStr += arguments[arg];
      }
    }
    return outStr;
  });

  Handlebars.registerHelper("toLowerCase", function (str) {
    return str.toLowerCase();
  });


// Preload Handlebars Templates
preloadHandlebarsTemplates();

});
