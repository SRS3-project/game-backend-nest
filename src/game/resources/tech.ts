export const techs = {
    picks:{
      name: "Picks",
      description:"Each level of this technology increases metal production by 1%",
      type: "base",
      icon: "general",
      level: 0,
      cost:{
        minerals: 800,
          wood: 400,
          gold: 0,
          food: 0
      },
      seconds: 180,
      unlock: false
    },
    axes:{
        name: "Axes",
        description:"Each level of this technology increases wood production by 1%",
        type:"base",
        icon: "general",
        level: 0,
        cost:{
            minerals: 800,
            wood: 400,
            gold: 0,
            food: 0
        },
        seconds: 180,
        unlock: false
    },
    crucible:{
        name: "Crucible",
        description:"Each level of this technology increases gold production by 1%",
        type: "base",
        icon: "general",
        level: 0,
        cost:{
            minerals: 1600,
            wood: 0,
            gold: 0,
            food: 0
        },
        seconds: 180,
        unlock: false
    },
    storage:{
        name: "Storage",
        description:"Each level of this technology increases food production by 1%",
        type: "base",
        icon: "general",
        level: 0,
        cost:{
            minerals: 1600,
            wood: 800,
            gold: 400,
            food: 0
        },
        seconds:360,
        unlock: false
    },
    wagons:{
        name: "Wagons Enhancing",
        description:"Each level of this technology increases Civilian's Units speed by 10%",
        type: "movement",
        icon: "general",
        level: 0,
        cost:{
            minerals: 200,
            wood: 400,
            gold: 60,
            food: 0
        },
        seconds:150,
        unlock: false
    },
    mounts:{
        name: "Mounts Training",
        description:"Each level of this technology increases Military's Units speed by 10%",
        type: "movement",
        icon: "general",
        level: 0,
        cost:{
            minerals: 600,
            wood: 0,
            gold: 900,
            food: 0
        },
        seconds:300,
        unlock: false
    },
    eagles:{
        name: "Eagles Training",
        description:"Each level of this technology increases All Units speed by 20%",
        type: "movement",
        icon: "general",
        level: 0,
        cost:{
            minerals: 10000,
            wood: 20000,
            gold: 6000,
            food: 0
        },
        seconds:5,
        unlock: false
    },
    spaceandtime:{
        name: "Power of the Space and Time",
        description:"Allows instant troop transfer through linked portals",
        type: "movement",
        icon: "general",
        level: 0,
        cost:{
            minerals: 2000000,
            wood: 1000000,
            gold: 2000000,
            food: 0
        },
        seconds:86400,
        unlock: false
    },
    weapons:{
        name: "Melee Weapons",
        description:"Each level of this technology increases Units attack power by 10%",
        type: "military",
        level: 0,
        icon: "general",
        cost:{
            minerals: 800,
            wood: 200,
            gold: 0,
            food: 0
        },
        seconds:285,
        unlock: false
    },
    armors:{
        name: "Armors",
        description:"Each level of this technology increases All's Units defence by 10%",
        type: "military",
        icon: "general",
        level: 0,
        cost:{
            minerals: 1600,
            wood: 0,
            gold: 0,
            food: 0
        },
        seconds:285,
        unlock: false
    },
    arcanomancy:{
        name: "Arcanomancy",
        description:"Each level of this technology increases All's Units statistics by 20%",
        type: "military",
        icon: "general",
        level: 0,
        cost:{
            minerals: 8000,
            wood: 6000,
            gold: 4000,
            food: 0
        },
        seconds:2850,
        unlock: false
    },
    espionage:{
        name: "Espionage",
        description: "Raising the level of this technology helps to provide more and more information on the activities of enemy troops in your territory.",
        type: "advanced",
        icon: "general",
        level: 0,
        cost:{
          minerals: 200,
          wood: 1000,
          gold: 200,
          food: 0
        },
        seconds:330,
        unlock: false
    },
    logistic:{
        name: "Logistic",
        description:"Raising the level of this technology increase Units storage by 5% per level.",
        type: "advanced",
        icon: "general",
        level: 0,
        cost:{
            minerals: 1000,
            wood: 300,
            gold: 100,
            food: 0
        },
        seconds:293,
        unlock: false
    },
    strategy:{
        name: "Strategy",
        description: "The higher the level of this technology, the more places you will have in the fleet. Each additional level allows you to have an extra place in your fleet.",
        type: "advanced",
        icon: "general",
        level: 0,
        cost:{
            minerals: 0,
            wood: 400,
            gold: 600,
            food: 0
        },
        seconds:150,
        unlock: false
    },
    exploration:{
        name: "Exploration",
        description: "With explorer training, units can take part in long expeditions. Each second level of this technology will allow the colonization of an additional territory.",
        type: "advanced",
        icon: "general",
        level: 0,
        cost:{
            minerals: 4000,
            wood: 8000,
            gold: 4000,
            food: 0
        },
        seconds:2700,
        unlock: false
    },
    tartarus:{
        name: "Portal of Tartarus",
        description: "By sacrificing a huge amount of food and materials, it is possible to ask the Gods to open a breach in Tartarus from which to summon the sealed minor Titans.",
        type: "advanced",
        icon: "general",
        level: 0,
        cost:{
            minerals: 0,
            wood: 0,
            gold: 0,
            food: 300000
        },
        seconds:2700,
        unlock: false
    }
}