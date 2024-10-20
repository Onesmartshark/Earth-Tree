addLayer("d", {
    name: "dirt", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(10),
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
        if (hasUpgrade('s', 13)) mult = mult.times(2)
        if (hasUpgrade('s', 15)) mult = mult.times(2)
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
        },
        13: {
            title: "Grass Plants",
            description: "Double your grass gain.",
            cost: new Decimal(10),
        },
        14: {
            title: "Grass-Covered Dirt",
            description: "Dirt gain is slightly boosted by grass.",
            cost: new Decimal(25),
            effect() {
                return player.points.add(1).pow(0.015)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
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
            cost: new Decimal(2),
            effect() {
                return player[this.layer].points.add(1).pow(0.075)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect        
        },
        13: {
            title: "Rocky Dirt",
            description: "Double your dirt gain.",
            cost: new Decimal(3),
        },
        14: {
            title: "Sharpened Stone",
            description: "Double stone gain.",
            cost: new Decimal(5),
        },
        15: {
            title: "Smooth Dirt",
            description: "Double dirt gain.",
            cost: new Decimal(25),
        },
    },
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
        },
        13: {
            title: "Claystone",
            description: "Double stone gain.",
            cost: new Decimal(20),
        },
    },
})
