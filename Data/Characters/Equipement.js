function Equipements() {

    this.weapons = new Map();

    this.armors = new Map();

    this.addWeapon = function(hand, equipement) {
        this.weapons.set(hand, equipement)
    }

    this.addArmor = function(bodyPart, equipement) {
        this.armors.set(bodyPart, equipement)
    }

	//WEAPONS
	this.getTotalAttackSpeed = function() {
		var attackSpeed = 0;
		for (var [key, value] of this.weapons) {
			attackSpeed += value.entity.attackSpeed
		}
		return attackSpeed / weapons.length
	}

    this.getTotalDamage = function() {
        var totalDamage = 0;
        for (var [key, value] of this.weapons) {
            totalDamage += value.getDamage()
        }
        return totalDamage
    }

    //ARMOR
    this.getTotalArmor = function() {
        var totalDefense = 0;
        for (var [key, value] of this.armors) {
            totalDefense += value.getDefense()
        }
        return totalDefense;
    }

}
typeMap.set('Equipements', Equipements)