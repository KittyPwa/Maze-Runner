
var timerBooleans = {
	CYCLENEXTACTIVEITEM: 0,
	CYCLEPREVIOUSACTIVEITEM: 1,
	USEACTIVEITEM: 2,
	USEACTIVATABLEENTITY: 3
}

var playerTypes = {
	CHARACTER: 1,
	MONSTER: 2,
	ALLY: 3
}

var rarityEnum = {
    RARE: 5,
    UNCOMMON: 35,
    COMMON: 115,
};

var subRarityEnum = {
	RARE: 1,
	UNCOMMON: 2,
	COMMON: 3
};

var consumableType = {
    SELF: 1,
    ROOM: 2
};

var monsterMovementType = {
	ROAMER: 1,
	PATROLLER: 2
};

var gameStateEnum = {
	VICTORY: 'You exit the labyrinth safely',
	DEFEAT: 'The monster pounces on you, devouring you whole. You are dead',
	CONTINUE: 'Go on',
	PAUSE: 'The Game is paused' 
};

var activatableEntityTypes = {
	ALTAR: 'Altar',
	CAMP: 'Camp',
	END: 'End',
	TREASURE: 'Treasure',
	DOOR: 'Door'
}

var modifierTypes = {
	ADDITIF: 1,
	MULTIPLICATIF: 2
}

var activatableState = {
	ACTIVE: 1,
	UNACTIVE: 2
}

var characterStates = {
	PARALYZED: 1
}

var hostilityEnum = {
	ALLY: 1,
	ENEMY: 2
}

var itemTypeEnum = {
	CONSUMABLE: 1,
	ITEM: 2,
	WEAPON: 3,
	ARMOR: 4
}

var durationType = {
	PERMANENT: 1,
	TEMPORARY: 2
}

var handEquipEnum = {
	LEFT: 'Left',
	RIGHT: 'Right',
	DOUBLE: 'Dual wielding',
	NONE: 'None'
}

var bodyPartEquipEnum = {
	HEAD: 'Head',
	TORSO: 'Chest',
	ARMS: 'Arms',
	HANDS: 'Hands',
	LEGS: 'Legs',
	FEET: 'Feet'
}

var damageTypeEnum = {
	BLUNT: 1,
	PIERCING: 2,
	SLASHING: 3
}

var defenseTypeEnum = {
	LEATHER: 1
}

var damageElementTypeEnum = {
	BASIC: 1
}

var usabilityTypeEnum = {
	MONSTER: 1,
	HUMAN: 2
}