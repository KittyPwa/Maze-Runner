function Inventory (){	
    this.items = new Map();

	this.activeItem = null;

	this.addItem = function(item, quantity = 1) {
		addTextToConsole('You gain : ' + item.entity.name + ' x' + quantity);
		if (this.items.has(item.key)) {
			this.items.get(item.key).addEntity(quantity);
		} else {
			this.items.set(item.key, item)
		}
		if (this.activeItem == null && item.entity.itemType != itemTypeEnum.ITEM) {
			this.activeItem = item;
		}
		if (gameState.getCharacter() != null) {
			updateInventory();
			updateActiveItem();
		}
	}

	this.removeItem = function(item,quantity = 1) {
		item = this.items.get(item.key);
		addTextToConsole('You lose : ' + item.entity.name + ' x' + quantity);
		item.totalUses = item.totalUses >= quantity ? item.totalUses - quantity : 0;
		if (item.totalUses == 0) {
			this.items.delete(item.key)
			if (this.activeItem != null && this.activeItem.key == item.key) {
				this.activateNextItem();
			}
		}
		if (gameState.getCharacter() != null) {
			updateInventory();
			updateActiveItem();
		}
	}

	this.activateNextItem = function() {
		if (this.activeItem != null) {
			var entries = this.items.entries();
			var entry = entries.next()
			while(!entry.done && entry.value[0] != this.activeItem.key ) {
				entry = entries.next()
			}
			entry = entries.next()
			if (entry.done) {
				entries = this.items.entries();
				entry = entries.next()
			}
			if (!entry.done) {
				while (!entry.done && entry.value[1].entity.itemType == itemTypeEnum.ITEM) {
					entry = entries.next()
				}
			}
			if (entry.done) {
				entries = this.items.entries();
				entry = entries.next()
				while (!entry.done && entry.value[1].entity.itemType == itemTypeEnum.ITEM) {
					entry = entries.next()
				}
			} 
			if(entry.done) {
				this.activeItem = null
			} else {
				this.activeItem = entry.value[1]
			}
		}
		updateActiveItem();
	}

	this.activatePreviousItem = function() {
		if (this.activeItem != null) {
			var entries = this.items.entries();
			var entry = entries.next()
			var previousEntry = entry;
			if (entry.value[0] == this.activeItem.key) {
				entry = entries.next()
			}
			itemToFind = this.activeItem;
			do {
				while(entry.done || entry.value[0] != itemToFind.key) {
					if (!entry.done) {
						previousEntry = entry;
					}
					entry = entries.next()
					if (entry.done) {
						entries = this.items.entries();
						entry = entries.next()
					}
				}
				itemToFind = previousEntry.value[1]
			} while(previousEntry.value[1].entity.itemType == itemTypeEnum.ITEM);
			if(previousEntry.done) {
				this.activeItem = null
			} else {
				this.activeItem = previousEntry.value[1]
			}
		}
		updateActiveItem();
	}

	this.useItem = function(room, maze, item = null) {
		var usingItem = this.activeItem;
		if (item != null) {
			usingItem = item;
		}
		if (usingItem != null) {
			var used = usingItem.useConsumable(room,maze)
			if (used) {
				this.removeItem(usingItem);
			}
		}
	}

	this.pickUpItem = function(room) {
		var item = room.removeAndReturnItem();
		this.addItem(item);
	}
}
typeMap.set('Inventory', Inventory)