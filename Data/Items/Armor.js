function Armor(entity = new leatherArmor()){
	this.type = equipementEnum.ARMOR;
	
	this.name = entity.name

    this.entity = entity

    this.getDefense = function() {
        return this.entity.defense
    }

}
typeMap.set('Armor', Armor)

function monsterHide() {
	this.name = 'monster Hide'

	this.bodyPart = bodyPartEquipEnum.TORSO

    this.defense = 2;

	this.usabilityType = usabilityTypeEnum.MONSTER;

	this.defenseType = defenseTypeEnum.LEATHER

    this.damageElementType = damageElementTypeEnum.BASIC
}
typeMap.set('monsterHide', monsterHide)

function leatherArmor() {
	this.name = 'Leather Armor'

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

	this.bodyPart = bodyPartEquipEnum.LEGS;

	this.rarity = rarityEnum.COMMON;

    this.subRarity = subRarityEnum.COMMON;

	this.defense = 1;
	
	this.usabilityType = usabilityTypeEnum.HUMAN;

	this.defenseType = defenseTypeEnum.LEATHER

    this.damageElementType = damageElementTypeEnum.BASIC
}
typeMap.set('leatherPants', leatherPants)