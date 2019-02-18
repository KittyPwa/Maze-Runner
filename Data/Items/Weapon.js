function Weapon(entity = new Fists()) {
    this.key = entity.name;

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
typeMap.set('Weapon', Weapon)

function Fists() {
    this.name = 'Fists'

    this.description = 'Your own fists. Not the most effective of tools.'

    this.equipHands = handEquipEnum.DOUBLE;

    this.minDamage = 1;

    this.maxDamage = 2;

    //1.5 second
    this.attackSpeed = 1500;

    this.damageType = damageTypeEnum.BLUNT

    this.damageElementType = damageElementTypeEnum.BASIC
}
typeMap.set('Fists', Fists)

function Claws() {
    this.name = 'Claws'
    
    this.description = 'Vicious claws that will easily tear through flesh and bones.'
	
	this.equipHands = handEquipEnum.DOUBLE;

    this.minDamage = 5;

    this.maxDamage = 10;

    /*this.minDamage = 1;

    this.maxDamage = 1;*/

    //2 second
    this.attackSpeed = 2000;

    this.damageType = damageTypeEnum.PIERCING

    this.damageElementType = damageElementTypeEnum.BASIC
}
typeMap.set('Claws', Claws)