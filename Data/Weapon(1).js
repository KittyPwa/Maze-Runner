function Weapon(entity) {
    this.type = equipementEnum.WEAPON;

    this.entity = entity

    this.getDamage = function() {
        return Random(this.entity.minDamage, this.entity.maxDamage);
    }
}

function fists() {
    this.name = 'Fists'

    this.equipHands = handEquipEnum.DOUBLE;

    this.minDamage = 1;

    this.maxDamage = 2;

    //1 second
    this.attackSpeed = 1000;

    this.damageType = damageTypeEnum.BLUNT

    this.damageElementType = damageElementTypeEnum.BASIC
}