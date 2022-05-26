export const units = {
    wanderers: {
        name: "Wanderers ",
        resume: "Wanderers  are very agile units used to transport resources from one territory to another.",
        description: "Wanderers are, roughly, like archers, but have less efficient equipment and weaponry to provide more space for transportation. Therefore, the wanderers, should be employed in battle only if supported by strong ships in combat. As the search for wagons reaches level 5, wanderers are equipped with small tow carts, therefore their base speed increases.",
        icon: "general",
        type:"civilian",
        stats: {
          health: 4000,
          armor: 10,
          attack: 5,
          speed: 5000,
          backpack: 5000,
          hunger: 10
        },
        cost: {
          minerals: 2000,
          wood: 2000,
          gold: 0,
          food: 0
        },
        unlocked: false,
        quantity: 0
      },
      caravan: {
        name: "Caravan",
        resume: "Caravan drivers are a specialization of the wanderers, making more space available for cargo and greater speed given the use of large wagons pulled by animals",
        description: "This type of unit should never do missions alone because it does not have serious weapons or other technologies, in order to provide maximum space for transport. Caravans can quickly supply planets thanks to their large chariots. Of course this unit is used in armies to recover as many resources as possible from the attacked territories.",
        icon: "general",
        type:"civilian",
        stats: {
          health: 12000,
          armor: 25,
          attack: 5,
          speed: 7500,
          backpack: 25000,
          hunger: 50
        },
        cost: {
          minerals: 6000,
          wood: 6000,
          gold: 0,
          food: 0
        },
        unlocked: false,
        quantity: 0
      },
      settlers: {
        name: "Family of Settlers",
        resume: "Empty territories can be colonized thanks to this unit.",
        description: "One of the first things that the human species understood is that its growth would depend on the colonization of other territories. The survival instinct and hope guide these Settlers. This unit is used to prepare a newly discovered territory for colonization. As soon as he arrives at his destination, he creates a base camp, to assist the settlers during the population of the new territory. The maximum number of colonizable territories is determined by the progress in the Exploration research. Two new levels of Exploration allow the colonization of a new territory.",
        icon: "general",
        type:"civilian",
        stats: {
          health: 30000,
          armor: 100,
          attack: 50,
          speed: 2500,
          backpack: 7500,
          hunger: 1000
        },
        cost: {
          minerals: 10000,
          wood: 20000,
          gold: 10000,
          food: 0
        },
        unlocked: false,
        quantity: 0
      },
      spy: {
        name: "Spy",
        resume: "Lespies are small familiar animals trained to be exceptionally fast and operate in the shadows. They are used to spy on foreign territories.",
        description: "Spies are small familiars who can send spying information from great distances in seconds. They use their animal aspect to gather information and, at the same time, redirect to their homeland. While in enemy territory, they are particularly easy to detect. Having no cover, armor or weapons, they are particularly vulnerable to defensive structures and enemy armies if identified.",
        icon: "general",
        type:"civilian",
        stats: {
          health: 1000,
          armor: 0,
          attack: 0,
          speed: 100000000,
          backpack: 0,
          hunger: 1
        },
        cost: {
          minerals: 0,
          wood: 1000,
          gold: 0,
          food: 0
        },
        unlocked: false,
        quantity: 0
      },
      jackal: {
        name: "Jackals",
        resume: "Jackals are units used to collect debris that form on battlefields and recycle useful resources.",
        description: "Fights have always been a great source of material. Thousands of units had already been lost and their remains seemed to have scattered across the battlefield. The wanderers and caravans were unable to get close enough to these fields without running the risk of being attacked or collateral damage. Further progress in the development of civilian militias made it possible to solve the problem efficiently. In fact, a new class of militiamen very similar to caravaners was born: the jackals. These units allow apparently lost resources to be collected and reused. Thanks to the new equipment, abandoned battlefields no longer pose any threat to troops. As soon as horse training reaches level 17 through research, it becomes part of the jackal's equipment. As soon as eagle training reaches level 15 via research, they become part of the jackal's equipment.",
        icon: "general",
        type:"civilian",
        stats: {
          health: 16000,
          armor: 10,
          attack: 1,
          speed: 2000,
          backpack: 20000,
          hunger: 300
        },
        cost: {
          minerals: 10000,
          wood: 6000,
          gold: 2000,
          food: 0
        },
        unlocked: false,
        quantity: 0
      },
      archer: {
        name: "Archers",
        resume: "The prison is a maneuverable infantry unit found on nearly every kingdom. The costs are not particularly high but at the same time the strength of the armor and the space for transport are very limited.",
        description: "Due to their light armor and rudimentary weapons, archers belong to the support units in battle. Their agility and speed coupled with the amount of units they attack can make them appear as a diversion from larger troops who are not as maneuverable.",
        icon: "general",
        type:"military",
        stats: {
          health: 4000,
          armor: 10,
          attack: 50,
          speed: 12500,
          backpack: 50,
          hunger: 20
        },
        cost: {
          minerals: 3000,
          wood: 1000,
          gold: 0,
          food: 0
        },
        unlocked: false,
        quantity: 0
      },
      infantryman: {
        name: "Infantryman",
        resume: "The infantry soldier is the direct counterpart of the archer and offers greater armor and greater attack power.",
        description: "During the training of the infantry units the blacksmiths reached the point where the forging techniques reached their limits. To provide the necessary agility for new soldiers, a new type of material was used for the first time. Despite the additional cost and complexity, new possibilities have been revealed in part due to the higher cost of the materials generally used. Through the use of horse hide and river dragon scales, more lightness and hardness have been made available for weapons and armor. Improved armor and superior armament make this unit a much greater threat than normal archery units.",
        icon: "general",
        type:"military",
        stats: {
          health: 10000,
          armor: 25,
          attack: 150,
          speed: 10000,
          backpack: 100,
          hunger: 75
        },
        cost: {
          minerals: 6000,
          wood: 4000,
          gold: 0,
          food: 0
        },
        unlocked: false,
        quantity: 0
      },
      crossbowman: {
        name: "Crossbowman",
        resume: "Crossbowmen are at least three times more armored than archers and have more than double the firepower at their disposal. Their speed of movement is likewise superior to anything else seen before.",
        description: "With the emergence of armored soldiers and wizards, simple combat units were increasingly overwhelmed. Despite the many changes, equipment and armor could not be improved enough to deal with these new types of battle. This is why it was chosen to develop a completely new type of unit, providing more armor and more precise and longer range weapons. Thus was born the crossbowman. Crossbowmen have at least three times more armor than archers and have more than double the firepower at their disposal. Their cruising speed is likewise superior to anything else seen before. There is practically no better ship against light and medium craft and therefore crossbowmen have been widely adopted around the world for at least a hundred years. Unfortunately with the recruitment of new and powerful units such as the War Eagles or the Ground Trolls, the reign of the crossbowmen soon ended. Nowadays they are still used to fight against archer and infantry battalions given the effective equipment against the latter",
        icon: "general",
        type:"military",
        stats: {
          health: 27000,
          armor: 50,
          attack: 400,
          speed: 15000,
          backpack: 800,
          hunger: 300
        },
        cost: {
          minerals: 20000,
          wood: 7000,
          gold: 2000,
          food: 0
        },
        unlocked: false,
        quantity: 0
      },
      knight: {
        name: "Knights",
        resume: "The Knights are the backbone of any military group. Reinforced armor, heavy weaponry and high displacement speeds make this unit, together with the large space for resources, a difficult enemy to defeat.",
        description: "The Knights are the backbone of any military battalion. Their reinforced armor, combined with heavy armament, and a high cruising speed, make this unit indispensable for any empire. It also has a large load capacity which is great in hostile situations.",
        icon: "general",
        type:"military",
        stats: {
          health: 60000,
          armor: 200,
          attack: 1000,
          speed: 10000,
          backpack: 1500,
          hunger: 500
        },
        cost: {
          minerals: 45000,
          wood: 15000,
          gold: 0,
          food: 0
        },
        unlocked: false,
        quantity: 0
      },
      wareagle: {
        name: "War Eagle",
        resume: "The War Eagles are highly specialized in intercepting enemy fleets.",
        description: "This unit, which seems to have come out of the tales, is deadly when used to destroy attack fleets. With her adamantine claws and excellent flight capability, she holds a privileged position among the heavy units, which she is deputed to destroy. Due to its small size and the need to keep it light for flight, the load capacity is minimal; but this is offset by the low consumption of food supplies as it is rare for an eagle to land exhausted.",
        icon: "general",
        type:"military",
        stats: {
          health: 70000,
          armor: 400,
          attack: 700,
          speed: 10000,
          backpack: 750,
          hunger: 250
        },
        cost: {
          minerals: 30000,
          wood: 40000,
          gold: 15000,
          food: 0
        },
        unlocked: false,
        quantity: 0
      },
      neuromancer: {
        name: "Neuromancer",
        resume: "The neuromancer is a special mystical unit developed to break through and incapacitate enemy defenses.",
        description: "The Neuromancer is a special mystical unit developed to incapacitate heavy enemy defenses. Thanks to a great knowledge in the art of neuromancy, they can directly attack the minds of enemy defenders, causing enormous destruction among the enemy units. Neuromancers base speed is increased as soon as level 8 Eagle Training is researched as they become capable of riding these majestic birds.",
        icon: "general",
        type:"military",
        stats: {
          health: 1,
          armor: 1,
          attack: 1,
          speed: 1,
          backpack: 1,
          hunger: 1
        },
        cost: {
          minerals: 50000,
          wood: 25000,
          gold: 15000,
          food: 0
        },
        unlocked: false,
        quantity: 0
      },
      groundtroll: {
        name: "Ground Troll",
        resume: "The Ground Troll is the heaviest unit ever seen and has a power never matched before.",
        description: "The Ground Troll the lord of all war units enters the arena. In addition to its fearsome bulk and superhuman strength, the platform installed on its array and equipped with heavy ballistae and crossbowman posts allow them to eliminate enemy infantry with a 99% success margin. The size of the Ground Troll is on the other hand its disadvantage since maneuverability is limited, making this unit more of a siege engine than a war unit. The consumption in terms of food of these immense and lethal units is however as high as their firepower ...",
        icon: "general",
        type:"military",
        stats: {
          health: 110000,
          armor: 500,
          attack: 2000,
          speed: 5000,
          backpack: 2000,
          hunger: 1000
        },
        cost: {
          minerals: 60000,
          wood: 50000,
          gold: 15000,
          food: 0
        },
        unlocked: false,
        quantity: 0
      },
      dragon: {
        name: "Dragon",
        resume: "Dragon units are a powerful tool of destruction capable of plundering resources immediately after battles.",
        description: "Draconic units are the rulers of war units: it combines power, rugged armor, speed and skill. Furthermore, it is the only one able to instantly exploit part of the resources created after the battle. Their impressive speed is balanced by a considerable cost in terms of food.",
        icon: "general",
        type:"military",
        stats: {
          health: 140000,
          armor: 700,
          attack: 2800,
          speed: 21000,
          backpack: 10000,
          hunger: 3300
        },
        cost: {
          minerals: 85000,
          wood: 55000,
          gold: 20000,
          food: 0
        },
        unlocked: false,
        quantity: 0
      },
      titan: {
        name: "Titan",
        resume: "There is nothing as big and dangerous as an approaching titan.",
        description: "The titan is a single gigantic being able to destroy pretty much anything with a single hit, whether they are armies or outposts. The magical resources to summon this unity are innumerable. The size of the Titan also limits its speed when moving, which is very low. General is said to often help push it to increase its speed. Only vast and advanced empires have the manpower and extensive knowledge required to be able to summon a unit the size of a castle.",
        icon: "general",
        type:"military",
        stats: {
          health: 1,
          armor: 1,
          attack: 1,
          speed: 1,
          backpack: 1,
          hunger: 1
        },
        cost: {
          minerals: 5000000,
          wood: 4000000,
          gold: 1000000,
          food: 0
        },
        unlocked: false,
        quantity: 0
      }
}