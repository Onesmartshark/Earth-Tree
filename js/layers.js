addLayer("d", {
    name: "dirt", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "Brown",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "dirt", // Name of prestige currency
    baseResource: "grass", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('d', 14)) mult = mult.times(upgradeEffect('d', 14))
        if (hasUpgrade('s', 12)) mult = mult.times(upgradeEffect('s', 12))
        if (hasUpgrade('s', 13)) mult = mult.times(2)
        if (hasUpgrade('s', 22)) mult = mult.times(2)
        if (hasUpgrade('s', 21)) mult = mult.times(3)
        if (hasMilestone('sl', 2)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "d", description: "D: Reset for dirt", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Grass Seeds",
            description: "Double your grass gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Dirty Grass",
            description: "Grass gain is boosted by dirt.",
            cost: new Decimal(3),
            effect() {
                return player[this.layer].points.add(1).pow(0.25)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect     
            unlocked() { return hasUpgrade("d", 11) },   
        },
        13: {
            title: "Grass Seeds II",
            description: "Double your grass gain.",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade("d", 12) },
        },
        14: {
            title: "Grass-Covered Dirt",
            description: "Dirt gain is slightly boosted by grass.",
            cost: new Decimal(25),
            effect() {
                return player.points.add(1).pow(0.015)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked() { return hasUpgrade("d", 13) },
        },
        21: {
            title: "Grass Sprout",
            description: "Triple your grass gain.",
            cost: new Decimal(100),
            unlocked() { return hasUpgrade("s", 23) && hasUpgrade("d", 11) },
        },
        22: {
            title: "Mining Moss",
            description: "Double your stone gain.",
            cost: new Decimal(500),
            unlocked() { return hasUpgrade("d", 21) },
        },
        23: {
            title: "Gardening",
            description: "Quadruple your grass gain.",
            cost: new Decimal(1250),
            unlocked() { return hasUpgrade("d", 22) },
        },
        24: {
            title: "Shovels",
            description: "Double your grass gain.",
            cost: new Decimal(2500),
            unlocked() { return hasUpgrade("d", 23) },
        },
        31: {
            title: "Grass Sapling",
            description: "Sextuple your grass gain.",
            cost: new Decimal(7777),
            unlocked() { return hasUpgrade("d", 24) },
        },
    },
})
addLayer("s", {
    name: "stone", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
       
    }},
    color: "Gray",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "stone", // Name of prestige currency
    baseResource: "dirt", // Name of resource prestige is based on
    baseAmount() {return player.d.points}, // Get the current amount of baseResource

    
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('s', 14)) mult = mult.times(2)
        if (hasUpgrade('c', 13)) mult = mult.times(2)
        if (hasUpgrade('d', 22)) mult = mult.times(2)
        if (hasUpgrade('co', 13)) gain = gain.times(2)
        if (hasMilestone('sl', 0)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for Stone", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.d.unlocked},
    upgrades: {
        11: {
            title: "Stone Plants",
            description: "Double your grass gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Buried Dirt",
            description: "Dirt gain is slightly boosted by stone.",
            cost: new Decimal(1),
            effect() {
                return player[this.layer].points.add(1).pow(0.075)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect    
            unlocked() { return hasUpgrade("s", 11) },       
        },
        13: {
            title: "Rocky Dirt",
            description: "Double your dirt gain.",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("s", 12) },
        },
        14: {
            title: "Sharpened Stone",
            description: "Double stone gain.",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade("s", 13) },
        },
        21: {
            title: "More Dirt",
            description: "Triple dirt gain.",
            cost: new Decimal(7),
            unlocked() { return hasUpgrade("s", 14) },
        },
        22: {
            title: "Smooth Dirt",
            description: "Double dirt gain.",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade("s", 21) },
        },
        23: {
            title: "Dirt*2",
            description: "Unlock more dirt upgrades",
            cost: new Decimal(25),
            unlocked() { return hasUpgrade("s", 22) },
        },
    },
})
addLayer("sl", {
    name: "Slate", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Sl", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
       
    }},
    color: "#454545",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "slate", // Name of prestige currency
    baseResource: "stone", // Name of resource prestige is based on
    baseAmount() {return player.s.points}, // Get the current amount of baseResource

    
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "S", description: "S+Shift: Reset for Slate", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.s.unlocked},
    milestones: {
        0: {
            requirementDescription: "1 Slate",
            done() { return player.sl.points.gte(1) },
            effectDescription: "Double stone.",
        },
        1: {
            requirementDescription: "2 Slate",
            done() { return player.sl.points.gte(2) },
            effectDescription: "Double clay.",
        },
        2: {
            requirementDescription: "3 Slate",
            done() { return player.sl.points.gte(3) },
            effectDescription: "Double dirt.",
        },
        3: {
            requirementDescription: "4 Slate",
            done() { return player.sl.points.gte(4) },
            effectDescription: "Double grass.",
        },
        4: {
            requirementDescription: "5 Slate",
            done() { return player.sl.points.gte(5) },
            effectDescription: "Unlock coal upgrades.",
        },
        5: {
            requirementDescription: "6 Slate",
            done() { return player.sl.points.gte(6) },
            effectDescription: "Double coal.",
        },
    },
    upgrades: {
        11: {
            title: "Marbled Grass",
            description: "Double your grass gain.",
            cost: new Decimal(2),
        },
    }
})
addLayer("c", {
    name: "clay", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
       
    }},
    color: "Gray",
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "clay", // Name of prestige currency
    baseResource: "dirt", // Name of resource prestige is based on
    baseAmount() {return player.d.points}, // Get the current amount of baseResource

    
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('c', 12)) mult = mult.times(4)
        if (hasMilestone('sl', 1)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "C: Reset for Clay", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.d.unlocked},

    upgrades: {
        11: {
            title: "Overgrown Bricks",
            description: "Double your grass gain",
            cost: new Decimal(1),
        },
        12: {
            title: "Clay Block",
            description: "Quadruple your clay gain.",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade("c", 11)}, 
        },
        13: {
            title: "Claystone",
            description: "Double stone gain.",
            cost: new Decimal(20),
            unlocked() { return hasUpgrade("c", 12)}, 
        },
    },
})
addLayer("co", {
    name: "coal", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Co", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        
    }},
    color: "#1c1c1c",
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "coal", // Name of prestige currency
    baseResource: "stone", // Name of resource prestige is based on
    baseAmount() {return player.s.points}, // Get the current amount of baseResource

    
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('co', 12)) mult = mult.times(2)
        if (hasMilestone('sl', 5)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "C", description: "C+Shift: Reset for Coal", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.sl.unlocked},

    upgrades: {
        11: {
            title: "Boulders",
            description: "Double your stone gain.",
            cost: new Decimal(1),
            unlocked() { return hasMilestone('sl', 4)}, 
        },
        12: {
            title: "Vein Finder",
            description: "Double your coal gain.",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade("co", 11)}, 
        },
        13: {
            title: "Fire-Infused Tools",
            description: "0.5x Grass, 2x Stone, Unlock glass (soon).",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade("co", 12)}, 
        },
    },
})
