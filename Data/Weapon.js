function Weapon(entity) {
    this.type = equipementEnum.WEAPON;
	
	this.name = entity.name

    this.entity = entity

    this.getDamage = function() {
        return Random(this.entity.minDamage, this.entity.maxDamage);
    }

    this.canStrike = true;

    this.setAttackTimer = function() {
        var weapon = this
        setTimeout(function() {	
            weapon.canStrike = true;
        }, weapon.entity.attackSpeed, weapon);
    }
}

function Fists() {
    this.name = 'Fists'

    this.equipHands = handEquipEnum.DOUBLE;

    this.minDamage = 1;

    this.maxDamage = 2;

    //1 second
    this.attackSpeed = 1500;

    this.damageType = damageTypeEnum.BLUNT

    this.damageElementType = damageElementTypeEnum.BASIC
}

function Claws() {
	this.name = 'Claws'
	
	this.equipHands = handEquipEnum.DOUBLE;

    /*this.minDamage = 5;

    this.maxDamage = 10;*/

    this.minDamage = 1;

    this.maxDamage = 1;

    //1 second
    this.attackSpeed = 2000;

    this.damageType = damageTypeEnum.PIERCING

    this.damageElementType = damageElementTypeEnum.BASIC
}