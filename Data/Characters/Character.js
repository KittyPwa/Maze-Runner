function Character( color, maxSpeed, type = new Player()) {
	this.type = type;

	this.id = this.id = uuidv4();

	this.roomsInSight = []

	this.addRoomsInSight = function(rooms) {
		this.roomsInSight = this.roomsInSight.concat(rooms)
	}

	this.removeRoomsInSight = function(rooms) {
		for (var i = 0; i < rooms.length; i++) {
			remove(this.roomsInSight, rooms[i])
		} 
	}

	this.clearRoomsInSight = function() {
		this.roomsInSight = []
	}

	this.modifiers = [];

	this.addModifier = function(modifier) {
		this.modifiers.push(modifier)
	}

	this.removeModifier = function(modifier, key) {
		for (var i = 0; i < this.modifiers.length; i++) {
			if (this.modifiers[i].key == modifier.key && this.modifiers[i].elementKey == key) {
				this.modifiers.splice(i, 1);
				break;
			}
		}
	}

	this.hasModifier = function(modifier, key) {
		for (var i = 0 ; i < this.modifiers.length; i++) {
			if (this.modifiers[i].key == modifier.key && this.modifiers[i].elementKey == key) {
				return true;
			}
		}
		return false;
	}

	this.clearTemporaryModifiers = function() {
		var toRemove = [];
		for (var i = 0; i < this.modifiers.length; i++) {
			if (this.modifiers[i].durationType == durationType.TEMPORARY) {
				toRemove.push(this.modifiers[i])
			}
		}
		for (var i = 0; i < toRemove.length; i++) {
			remove(this.modifiers,toRemove[i])
		}
	}

	this.updateModifiedAttribut = function(attribut) {
		attribut.modifiedMaxValue = updateWithModifier(this.modifiers, attribut.modifiedMaxValue, attribut.maxValue, attribut);
		this.CanvasChar.updateStatsFromChar(attribut.modifiedMaxValue);
	}

	this.addState = function(state) {
		this.states.push(state);
	}

	this.removeState = function(state) {
		remove(this.states, state);
	}
	
	this.equipements = this.type.equipements;

	this.states = []

	this.attributs = new Map()

	this.speed = new Attribut(new Speed(), 1, maxSpeed);

	this.endurance = new Attribut(new Endurance(), 100, 100);

	this.health = new Attribut(new Health(), type.healthAmount, type.healthAmount)
	
	this.attributs.set(this.speed.key, this.speed);
	this.attributs.set(this.endurance.key, this.endurance);
	this.attributs.set(this.health.key, this.health);

	//GENERIC
	this.loseGenericAttribut = function(attribut, amount) {
		attribut.currentValue = (attribut.currentValue - amount >= attribut.minValue ? attribut.currentValue - amount : attribut.minValue);
		this.attributs.set(attribut.key, attribut);
	}

	this.gainGenericAttribut = function(attribut, amount) {
		attribut.currentValue = (attribut.currentValue + amount <= attribut.maxValue ? attribut.currentValue + amount : attribut.maxValue);
		this.attributs.set(attribut.key, attribut);
	}

	//ENDURANCE
	this.loseEndurance = function(amount) {
		this.loseGenericAttribut(this.endurance, amount)
	}

	this.gainEndurance = function(amount) {
		this.gainGenericAttribut(this.endurance, amount)
	}

	this.rest = function() {
		this.gainGenericAttribut(this.endurance, this.endurance.maxValue)
	}

	//HEALTH

	this.loseHealth = function(amount) {
		this.loseGenericAttribut(this.health, amount)
	}

	this.gainHealth = function(amount) {
		this.gainGenericAttribut(this.health, amount)
	}
	//ATTACK

	this.strike = function(foe) {
        if (!foe.type.toBeRemoved) {
			var weapons = this.equipements.getAllEquipementType(equipementEnum.WEAPON)
            for (var i = 0; i < weapons.length; i++){
                if (weapons[i].canStrike) {
					weapons[i].canStrike = false;
					var damage = weapons[i].getDamage();
					foe.recieveDamage(this, weapons[i],damage)
					weapons[i].setAttackTimer()
                }
            }
        }
	}

	this.recieveDamage = function(attacker, weapon, damage) {
		var armors = this.equipements.getAllEquipementType(equipementEnum.ARMOR)
		var finalDamage = damage
		for (var i = 0; i < armors.length; i++) {
			finalDamage = finalDamage - armors[i].getDefense() >= 0 ?  finalDamage - armors[i].getDefense() : 0;
		}
		addTextToConsole(attacker.type.name + ' : ' + weapon.name + ' strikes for : ' + finalDamage + ' damage to ' + this.type.name);
		this.loseHealth(finalDamage)
		if (this.health.currentValue <= 0) {
			this.type.toBeRemoved = true;
        }
    }
	
	//MOVEMENT
	this.sprint = function() {
		if (this.endurance.currentValue > 0 && !this.endurance.critique) {
			if (!gameState.timerBooleansArray[3]) {
				gameState.timerBooleansArray[3] = true;
				var char = this;
				setTimeout(function() {
					gameState.timerBooleansArray[3] = false;
					char.loseEndurance(char.endurance.type.consumeAmount)
					if (char.endurance.currentValue < 1) {
						char.endurance.critique = true;
					}
				}, 50, char)
			}
			var attribut = new Attribut(new Speed)
			var key = attribut.key + ' sprint'
			var speedModifier = new Modifier(attribut.key, modifierTypes.ADDITIF, 2, durationType.TEMPORARY, key);		
			var sprintAcceleration = 0.5
			if (!this.hasModifier(speedModifier, key)) {
				this.addModifier(speedModifier);
				this.CanvasChar.increaseAcceleration(sprintAcceleration)
			}
			this.updateModifiedAttribut(this.speed);
			this.attributs.set(this.speed.key, this.speed);
			this.attributs.set(this.endurance.key, this.endurance);
		} else {
			this.walk()
		}
	}

	this.walk = function() {
		var attribut = new Attribut(new Speed)
		var key = attribut.key + ' sprint'
		var speedModifier = new Modifier(attribut.key, modifierTypes.ADDITIF, 2, durationType.TEMPORARY, key);		
		if (!gameState.timerBooleansArray[3]) {
			gameState.timerBooleansArray[3] = true;
			var char = this;
			var gainAmount = this.endurance.critique ? char.endurance.type.gainAmount / 2: char.endurance.type.gainAmount;
			setTimeout(function() {
				gameState.timerBooleansArray[3] = false;
				char.gainEndurance(gainAmount)
				if (char.endurance.currentValue > 15) {
					char.endurance.critique = false;
				}
			}, 50, char, gainAmount)
		}
		if (this.hasModifier(speedModifier, key)) {
			this.removeModifier(speedModifier, key)
			this.CanvasChar.resetAcceleration();
			this.updateModifiedAttribut(this.speed);
		}
		this.attributs.set(this.speed.key, this.speed);
		this.attributs.set(this.endurance.key, this.endurance);
	}

	this.color = color;
	
	this.CanvasChar = null;

	this.updateCanvasChar = function( i,j) {
		this.CanvasChar = new CanvasCharacter(i,j, this.id, this.type.playerType);
	}

}
typeMap.set('Character', Character)

function Monster(movementType) {
	this.name = 'monster'
	
	this.equipements = new Equipements()
	
	this.equipements.addWeapon(handEquipEnum.DOUBLE, new Weapon(new Claws()))

	this.equipements.addArmor(bodyPartEquipEnum.TORSO, new Armor(new monsterHide()))
	
	this.movementType = movementType;
	
	this.healthAmount = Random(15,30);

	this.sightRadius = 2;

	this.playerType = playerTypes.MONSTER

	this.hostility = hostilityEnum.ALLY

	this.path = null;

	this.destinationFinal = null;

	this.destination = null;

	this.orientation = null;

	this.onTheMove = false;

	this.onTheunt = false;

	this.toBeRemoved = false;

	this.killMonster = function() {
		this.toBeRemoved = true;
	}
}
typeMap.set('Monster', Monster)

function Player() {
	this.name = 'You '
	
	this.equipements = new Equipements()
	
	this.equipements.addWeapon(handEquipEnum.DOUBLE, new Weapon(new Fists()))

	this.equipements.addArmor(bodyPartEquipEnum.TORSO, new Armor(new leatherArmor()))
	
	this.equipements.addArmor(bodyPartEquipEnum.LEGS, new Armor(new leatherPants()))

	this.healthAmount = Random(8,15);

	this.sightRadius = 2;

	this.goldAmount = 0;

	this.playerType = playerTypes.CHARACTER

	this.toBeRemoved = false;

	this.inventory = new Inventory();

	this.clearTreasureRoom = function(room) {
		addTextToConsole('You\'ve found a treasure!');
		var treasure = room.returnAndRemoveTreasure();
		var items = treasure.consumables;
		var goldAmount = treasure.goldAmount;
		for (var i = 0; i < items.length; i++) {
			this.inventory.addItem(items[i]);
		}
		this.addGold(goldAmount);
	}

	this.addGold = function(goldAmount) {
		this.goldAmount += goldAmount;
		addTextToConsole('You pick up ' + goldAmount + ' gold pieces')
	}

	this.removeGold = function(goldAmount) {
		this.goldAmount -= goldAmount;
		addTextToConsole('You lose ' + goldAmount + ' gold pieces')
	}
	
	this.useActivatableEntity = function(charRoom, maze, monsters){
		if (charRoom.hasActivatableEntity()) {
			var activatableEntity = charRoom.returnActivatableEntity();
			activatableEntity.effect(monsters, this, charRoom);
		}
	}
}
typeMap.set('Player', Player)

function ShadowHunter(movementType) {
	this.name = 'Shadow hunter'
	
	this.movementType = movementType;

	this.healthAmount = Random(18,25);

	this.playerType = playerTypes.ALLY

	this.hostility = hostilityEnum.ALLY

	this.path = null;

	this.destinationFinal = null;

	this.destination = null;

	this.orientation = null;

	this.onTheMove = false;

	this.toBeRemoved = false;
	
	this.endEffectText = 'A shrill death cry resounds. A beast has been slain.'

	this.startEffect = function(monster) {
		monster.type.killMonster();
		addTextToConsole(this.endEffectText);
	}

	this.endEffect = function() {
		this.toBeRemoved = true;
	}
	typeMap.set('ShadowHunter', ShadowHunter)
}