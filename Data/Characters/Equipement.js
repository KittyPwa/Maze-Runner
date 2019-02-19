function Equipements() {

    this.weapons = new Map();

    this.armors = new Map();

    //WEAPONS

    this.addWeapon = function(hand, equipement) {
        this.weapons.set(hand, equipement)
    }

    this.removeWeapon = function(hand) {
        this.weapons.delete(hand);
    }

    this.equipWeapon = function(hand, equipement) {
        var character = gameState.getCharacter()
        if (character.type.inventory.hasItem(equipement)) {
            character.type.inventory.removeItem(equipement);
            if (this.weapons.has(hand)) {
                this.unequipWeapon(hand)
            }
            this.addWeapon(hand, equipement)
        }
    }

    this.unequipWeapon = function(hand) {
        var character = gameState.getCharacter()
        if (this.weapons.has(hand)) {
            var unequipy = this.weapons.get(hand);
            this.removeWeapon(hand)
            character.type.inventory.addItem(unequipy);
        }
    }

    this.weaponIsEquipped = function(equipement) {
        for (var i = 0; i < equipement.entity.equipHands.length; i++) {
            if (this.weapons.has(equipement.entity.equipHands[i])) {
                if (this.weapons.get(equipement.entity.equipHands[i]).id == equipement.id) {
                    return true;
                }
            }
        }   
        return false;
    }

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

    this.addArmor = function(bodyPart, equipement) {
        this.armors.set(bodyPart, equipement)
    }

    this.removeArmor = function(bodyPart) {
        this.armors.delete(bodyPart)
    }

    this.equipArmor = function(bodyPart, equipement) {
        var character = gameState.getCharacter()
        if (character.type.inventory.hasItem(equipement)) {
            character.type.inventory.removeItem(equipement);
            if (this.armors.has(bodyPart)) {
                var unequipy = this.armors.get(bodyPart)
                this.unequipArmor(unequipy)
            }
            this.addArmor(bodyPart, equipement)
        }
    }

    this.unequipArmor = function(bodyPart) {
        console.log(bodyPart)
        console.log(this.armors)
        var character = gameState.getCharacter()
        if (this.armors.has(bodyPart)) {
            var unequipy = this.armors.get(bodyPart);
            console.log(unequipy)
            this.removeArmor(bodyPart)
            character.type.inventory.addItem(unequipy);
        }
    }

    this.armorIsEquipped = function(equipement) {
        if (this.armors.has(equipement.entity.bodyPart)) {
            if (this.armors.get(equipement.entity.bodyPart).id == equipement.id) {
                return true;
            }
        }
        return false;
    }

    this.getTotalArmor = function() {
        var totalDefense = 0;
        for (var [key, value] of this.armors) {
            totalDefense += value.getDefense()
        }
        return totalDefense;
    }

}
typeMap.set('Equipements', Equipements)