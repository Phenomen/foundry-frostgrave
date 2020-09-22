/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class frostgraveActorSheet extends ActorSheet {
    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["frostgrave", "sheet", "actor"],
            template: "systems/frostgrave/templates/actor/actor-sheet.html",
            width: 650,
            height: 650,
            tabs: [{
                navSelector: ".sheet-tabs",
                contentSelector: ".sheet-body",
                initial: "items",
            }, ],
        });
    }

    /* -------------------------------------------- */

    /** @override */
    getData() {
        const data = super.getData();
        data.dtypes = ["String", "Number", "Boolean"];
        //for (let attr of Object.values(data.data.attributes)) {
        //  attr.isCheckbox = attr.dtype === "Boolean";
        // }

        // Prepare items.
        if (this.actor.data.type == "character") {
            this._prepareCharacterItems(data);
        }

        return data;
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        // Everything below here is only needed if the sheet is editable
        if (!this.options.editable) return;

        // Add Inventory Item
        html.find(".item-create").click(this._onItemCreate.bind(this));

        // Edit Inventory Item
        html.find(".item-edit").click((ev) => {
            const card = $(ev.currentTarget).parents(".item-card");
            const item = this.actor.getOwnedItem(card.data("item-id"));
            item.sheet.render(true);
        });

        // Delete Inventory Item
        html.find(".item-delete").click((ev) => {
            const card = $(ev.currentTarget).parents(".item-card");
            this.actor.deleteOwnedItem(card.data("item-id"));
        });

        // Rollable abilities.
        html.find(".rollable").click(this._onRoll.bind(this));
    }

    /* -------------------------------------------- */

    /**
     * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
     * @param {Event} event   The originating click event
     * @private
     */
    _onItemCreate(event) {
        event.preventDefault();
        const header = event.currentTarget;
        // Get the type of item to create.
        const type = header.dataset.type;
        // Grab any data associated with this control.
        const data = duplicate(header.dataset);
        // Initialize a default name.
        const name = `New ${type.capitalize()}`;
        // Prepare the item object.
        const itemData = {
            name: name,
            type: type,
            data: data,
        };
        // Remove the type from the dataset since it's in the itemData.type prop.
        delete itemData.data["type"];

        // Finally, create the item!
        return this.actor.createOwnedItem(itemData);
    }

    /**
     * Handle clickable rolls.
     * @param {Event} event   The originating click event
     * @private
     */
    _onRoll(event) {
        event.preventDefault();
        const element = event.currentTarget;
        const dataset = element.dataset;

        if (dataset.roll) {
            let roll = new Roll(dataset.roll, this.actor.data.data);
            let damage = parseInt(roll.roll().total) + parseInt(dataset.bonus);
            let rollflavor = `${dataset.label} Roll: ` + roll.total;

            if (dataset.label == "Combat" || dataset.label == "Shooting") {
                let damageflavor = `<br>Damage: ` + damage;
                rollflavor = rollflavor + damageflavor;
            }

            roll.toMessage({
                speaker: ChatMessage.getSpeaker({
                    actor: this.actor
                }),
                flavor: rollflavor,
            });
        }

        if (dataset.spell) {

            let alignment = dataset.alignment;
            let empowerment = this.actor.data.data.empowerment;



            let alignmentmod;
            let selfdamage;
            let castresult;

            if (alignment == "Native") {
                alignmentmod = 0;
            } else if (alignment == "Aligned") {
                alignmentmod = 2;
            } else if (alignment == "Neutral") {
                alignmentmod = 4;
            } else {
                alignmentmod = 6;
            };

            let difficulty = dataset.bcn - dataset.improved + alignmentmod;
            let roll = new Roll(`1d20+` + empowerment);
            //let roll = new Roll(`(1d20+` + empowerment + `)ms>=` + difficulty);

            roll.roll();

            let rollresult = difficulty - roll.total;

            if (rollresult >= 20) {
                selfdamage = 5;
            } else if (rollresult >= 10) {
                selfdamage = 2;
            } else if (rollresult >= 5) {
                selfdamage = 1;
            } else {
                selfdamage = 0;
            };



            selfdamage = selfdamage + empowerment;

            if (rollresult <= 0) {
                castresult = '<strong style="color: green; font-size: 18px;">SUCCESS</strong>';
            } else {
                castresult = '<strong style="color: red; font-size: 18px;">FAILURE</strong>';
            };


            let rollflavor = `Casting <strong>${dataset.label}</strong> vs Difficulty <strong>` + difficulty + `</strong><br>` + castresult +
                `<br>BCN: ${dataset.bcn} | Alignment: +` + alignmentmod + ` | Improved: -${dataset.improved}
                <br>Empowerment: ` + empowerment + ` | Self Damage: ` + selfdamage;


            roll.toMessage({
                speaker: ChatMessage.getSpeaker({
                    actor: this.actor
                }),
                flavor: rollflavor,
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
    _prepareCharacterItems(sheetData) {
        const actorData = sheetData.actor;

        // Initialize containers.
        const gear = [];
        const features = [];
        const spells = [];

        // Iterate through items, allocating to containers
        // let totalWeight = 0;
        for (let i of sheetData.items) {
            let item = i.data;
            i.img = i.img || DEFAULT_TOKEN;
            // Append to gear.
            if (i.type === "item") {
                gear.push(i);
            }
            // Append to features.
            else if (i.type === "feature") {
                features.push(i);
            }
            // Append to spells.
            else if (i.type === "spell") {
                spells.push(i);
            }
        }

        // Assign and return
        actorData.gear = gear;
        actorData.features = features;
        actorData.spells = spells;
    }
}