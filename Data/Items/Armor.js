function Armor(entity = new leatherArmor()){
	this.id = uuidv4();
	
	this.key = entity.name;

	this.itemType = itemTypeEnum.ARMOR;
	
	this.name = entity.name

    this.entity = entity

    this.getDefense = function() {
        return this.entity.defense
    }

}
typeMap.set('Armor', Armor)

function monsterHide() {
	this.name = 'monster Hide'

	this.description = 'The monster\s hide is so thick, it could be considered to be an armor in itself'

	this.bodyPart = bodyPartEquipEnum.TORSO

    this.defense = 2;

	this.usabilityType = usabilityTypeEnum.MONSTER;

	this.defenseType = defenseTypeEnum.LEATHER

    this.damageElementType = damageElementTypeEnum.BASIC
}
typeMap.set('monsterHide', monsterHide)

function leatherArmor() {	
	this.name = 'Leather Armor'

	this.description = 'Armor made of leather, worn by every trainee adventurer'

	this.bodyPart = bodyPartEquipEnum.TORSO

	this.rarity = rarityEnum.COMMON;

    this.subRarity = subRarityEnum.COMMON;

	this.defense = 1;
	
	this.usabilityType = usabilityTypeEnum.HUMAN;

	this.defenseType = defenseTypeEnum.LEATHER

    this.damageElementType = damageElementTypeEnum.BASIC
}
typeMap.set('leatherArmor', leatherArmor)

function leatherPants() {
	this.name = 'Leather Pants'

	this.description = 'Pants made of leather, worn by every trainee adventurer'

	this.bodyPart = bodyPartEquipEnum.LEGS;

	this.rarity = rarityEnum.COMMON;

    this.subRarity = subRarityEnum.COMMON;

	this.defense = 1;
	
	this.usabilityType = usabilityTypeEnum.HUMAN;

	this.defenseType = defenseTypeEnum.LEATHER

    this.damageElementType = damageElementTypeEnum.BASIC
}
typeMap.set('leatherPants', leatherPants)