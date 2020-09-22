/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function() {

    // Define template paths to load
    const templatePaths = [
  
      // Actor Sheet Partials
      "systems/frostgrave/templates/actor/partials/actor-header.html",
      "systems/frostgrave/templates/actor/partials/actor-stats.html",
      "systems/frostgrave/templates/actor/partials/actor-tab-navigation.html",
      "systems/frostgrave/templates/actor/partials/actor-tab-notes.html",
      "systems/frostgrave/templates/actor/partials/actor-tab-experience.html",
      "systems/frostgrave/templates/actor/partials/actor-tab-homebase.html",
      "systems/frostgrave/templates/actor/partials/actor-tab-items.html",
      "systems/frostgrave/templates/actor/partials/actor-tab-spells.html"
  
      // Item Sheet Partials
    
    ];
  
    // Load the template parts
    return loadTemplates(templatePaths);
  };
  