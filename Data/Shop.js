function Shop() {
    this.stock = new Map();
	
	this.merchantGold = Random(250,1000);

	this.investementLevel = [rarityEnum.COMMON, subRarityEnum.COMMON]

    this.InitializeShop = function(){
		var arraysMaps = new Map();
		arraysMaps.set(itemTypeEnum.CONSUMABLE,getConsumableArray());
		arraysMaps.set(itemTypeEnum.ITEM, getItemArray());
        var elementsMap = new ElementMaps()
		var consumableMapstock = elementsMap.getConsumableMap()
		for (var [type, array] of arraysMaps){
			for (var i = 0; i < array.length; i++) {
				var amount = array[i].entity.rarity >= this.investementLevel[0] && array[i].entity.subRarity >= this.investementLevel[1] ? Random(0,5) : 0
				key = array[i].key;
				elementsMap.addNewKeyElementToMap(consumableMapstock, key, new Stock(array[i],amount));
			}
			this.stock.set(type, elementsMap);
		}
    }

    this.getMapFromKey = function(keyMap) {
        return this.stock.get(keyMap).getConsumableMap();
        
    }

    this.getItem = function(keyMap, keyItem) {
		var map = this.stock.get(keyMap).getConsumableMap();
        return returnElementFromMap(map,keyItem);
    } 
}

function sellItem(item, itemKey,quantity, character) {
	var keyMap = parseInt(itemKey.trim());
	var map = gameState.shop.stock.get(keyMap).getConsumableMap();
	item = item.trim()
	var stock = returnElementFromMap(map,item);
	quantity = parseInt(quantity)
	if (character.type.items.has(item)) {
		if (stock.item.entity.sellPrice * quantity <= gameState.shop.merchantGold && character.type.items.get(item).totalUses >= quantity) {
			gameState.shop.merchantGold -= stock.item.entity.sellPrice * quantity;
			stock.quantity += quantity;
			addTextToConsole('You sell : ' + stock.item.entity.name + ' x' + quantity + ' to the merchant');
			character.type.removeItem(stock.item, quantity)
			character.type.goldAmount += stock.item.entity.sellPrice * quantity;
			updateMerchant()
		} else {
			addTextToConsole('Oh dear, I\'m afraid that this transaction isn\'t possible. Anything else?')
		}
	} else {
		addTextToConsole('Oh dear, I\'m afraid that this transaction isn\'t possible. Anything else?')
	}
}

function buyItem(item, itemKey,quantity, character) {
	var keyMap = parseInt(itemKey.trim());
	var map = gameState.shop.stock.get(keyMap).getConsumableMap();
	item = item.trim()
	var stock = returnElementFromMap(map,item);
	quantity = parseInt(quantity)
	if (stock.item.entity.buyPrice * quantity <= character.type.goldAmount && stock.quantity >= quantity) {
		addTextToConsole('You buy : ' + stock.item.entity.name + ' x' + quantity + ' from the merchant');
		character.type.goldAmount -= stock.item.entity.buyPrice * quantity;
		character.type.addItem(stock.item, quantity)
		stock.quantity -= quantity;
		gameState.shop.merchantGold += stock.item.entity.buyPrice * quantity;
		updateMerchant()
	} else {
		addTextToConsole('Oh dear, I\'m afraid that this transaction isn\'t possible. Anything else?')
	}
}