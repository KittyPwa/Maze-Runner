function toggleHideSelectGame() {
    toggleHidden(['MainMenu'], ['ChooseGame'])
}

function toggleHideStartGame() {
    toggleHidden(['ChooseGame'], ['playerInfo','Village','playerConsoleId'])
}

function toggleHiddenShowShop() {
    toggleHidden(['Village','showShopGameScreen'], ['shopTable','playerConsoleId'])
}

function toggleHiddenAndReturnShop() {
    toggleHidden(['playerInfo','GameScreen', 'canvasId'],['shopTable'])
}

function toggleHiddenStartMaze() {
    toggleHidden(['Village'], ['GameScreen','canvasId'])
}

function toggleHiddenAndVillage() {
    toggleHidden(['canvasId','showShopGameScreen', 'GameScreen'], ['Village','playerConsoleId'])
}

function switchPlayerInfoTab(elem, newTab) {
    var parent = elem.parentNode;
    var toHide = []
    for (var child of parent.children) {
        if (child.className.indexOf('toggleShow') !== -1) {
            toHide.push(child.id)
        }
    }
    toggleHidden(toHide,[newTab])
}

function loadImgs() {
    var base_image = new Image();
    //ITEMS
    base_image.src = 'Visual/img/key.png';
    imageBase.putImg(new Item(new Key()).key, base_image);
    var base_image = new Image();
    base_image.src = 'Visual/img/AncientVase.png';
    imageBase.putImg(new Item(new AncientVase()).key, base_image);
    var base_image = new Image();
    base_image.src = 'Visual/img/diamondVase.png';
    imageBase.putImg(new Item(new DiamondSetVase()).key, base_image);
    var base_image = new Image();
    base_image.src = 'Visual/img/shinyBauble.png';
    imageBase.putImg(new Item(new ShinyBaubble()).key, base_image);
    var base_image = new Image();
    base_image.src = 'Visual/img/Rubis.png';
    imageBase.putImg(new Item(new Ruby()).key, base_image);
    var base_image = new Image();
    base_image.src = 'Visual/img/Sapphire.png';
    imageBase.putImg(new Item(new Sapphire()).key, base_image);
    var base_image = new Image();
    base_image.src = 'Visual/img/healingPotion.png';
    imageBase.putImg(new Item(new HealthPotion()).key, base_image);
    var base_image = new Image();
    base_image.src = 'Visual/img/vigorPotion.png';
    imageBase.putImg(new Item(new VigorPotion()).key, base_image);
    //WEAPONS
    var base_image = new Image();
    base_image.src = 'Visual/img/fists.png';
    imageBase.putImg(new Weapon(new Fists()).key, base_image);
    //ARMORS
    var base_image = new Image();
    base_image.src = 'Visual/img/leatherArmor.png';
    imageBase.putImg(new Armor(new leatherArmor()).key, base_image);
    var base_image = new Image();
    base_image.src = 'Visual/img/joker.png';
    imageBase.putImg(new Armor(new leatherPants()).key, base_image);
    //ACTIVATABLE ENTITIES
    var base_image = new Image();
    base_image.src = 'Visual/img/Chest.png';
    imageBase.putImg(activatableState.ACTIVE + ' ' + new ActivatableEntity(new TreasureChest()).type, base_image);
    var base_image = new Image();
    base_image.src = 'Visual/img/openChest.png';
    imageBase.putImg(activatableState.UNACTIVE + ' ' + new ActivatableEntity(new TreasureChest()).key, base_image);
    var base_image = new Image();
    base_image.src = 'Visual/img/altar.png';
    imageBase.putImg(activatableState.ACTIVE + ' ' + activatableEntityTypes.ALTAR, base_image);
    var base_image = new Image();
    base_image.src = 'Visual/img/oldKnightsAltar.png';
    imageBase.putImg(activatableState.UNACTIVE + ' ' + new ActivatableEntity(new AltarOfTheOldKnight()).key, base_image);
    var base_image = new Image();
    base_image.src = 'Visual/img/oldKnightsAltar.png';
    imageBase.putImg(activatableState.UNACTIVE + ' ' + new ActivatableEntity(new AltarOfTheThunderLord()).key, base_image);
    //PASSIVE ENTITIES
    var base_image = new Image();
    base_image.src = 'Visual/img/darkPortal.png';
    imageBase.putImg(new PassiveEntity(new DarkPortal()).key, base_image);
}

function updateEquipement() {
    var tableCloned = document.getElementById('equipementTrToClone');
    var Char = gameState.getCharacter()
    var weaponMap = Char.equipements.weapons;
    var armorMap = Char.equipements.armors;
    var elementMaps = new Map();
    elementMaps.set('weapon',weaponMap);
    elementMaps.set('armor', armorMap);
    
    for (var [key, value] of elementMaps) {
        var tableHead = document.getElementsByClassName(key + 'Head')[0];
        var parentNode = tableHead.parentNode
        var trToDelete = parentNode.getElementsByClassName('equipementTr');
        for (var i = 0; i < trToDelete.length; i++) {
            emptyChildNodes(trToDelete[i])
        }
        var elem;
        
        for (var [mapkey,mapvalue] of value) {
            elem = tableCloned.cloneNode(true);
            elem.id = ''

            var elemType = elem.getElementsByClassName('itemKey')[0];
            var textNode = document.createTextNode(mapvalue.itemType)
            elemType.appendChild(textNode)

            var itemPlayerQuantity = elem.getElementsByClassName('itemType')[0];
            var textNode = document.createTextNode(mapkey)
            itemPlayerQuantity.appendChild(textNode)

            var elemImageTd = elem.getElementsByClassName('itemImage')[0];
            var itemImage = imageBase.getImg( mapvalue.key)
            var itemImageSrc = itemImage.getAttribute('src')
            elemImageTd.setAttribute('src', itemImageSrc);
            elemImageTd.setAttribute('key', mapkey);
            elemImageTd.setAttribute('id', mapvalue.id);
            updateImage(elemImageTd, mapvalue)

            parentNode.insertBefore(elem,tableHead.nextSibling);
        }
    }
}

function updateInventory() {
    var parentNode = document.getElementById('InventoryTable')
    var trToDelete = parentNode.getElementsByClassName('inventoryTr');
    for (var i = 0; i < trToDelete.length; i++) {
        emptyChildNodes(trToDelete[i])
    }
    var tableCloned = document.getElementById('inventoryTrToClone');
    var elem;
    var Char = gameState.getCharacter()
    var inventoryMap = Char.type.inventory.items;
    for (var [key,value] of inventoryMap) {
        elem = tableCloned.cloneNode(true);
        elem.id = ''

        var elemType = elem.getElementsByClassName('itemKey')[0];
        var textNode = document.createTextNode(value.itemType)
        elemType.appendChild(textNode)

        var elemImageTd = elem.getElementsByClassName('itemImage')[0];
        var itemImage = imageBase.getImg(key)
        var itemImageSrc = itemImage.getAttribute('src')
        elemImageTd.setAttribute('src', itemImageSrc);
        elemImageTd.setAttribute('key', key);
        elemImageTd.setAttribute('id', value.id);
        updateImage(elemImageTd, value)

        var itemPlayerQuantity = elem.getElementsByClassName('itemPlayerQuantity')[0];
        var textNode = document.createTextNode(Char.type.inventory.items.get(key).getAmount())
        itemPlayerQuantity.appendChild(textNode)

        parentNode.appendChild(elem);
    }
}

function updateMerchant() {
    var shopHead = document.getElementsByClassName('shopHead')[0];
    var parentNode = shopHead.parentNode;
    var trToDelete = parentNode.getElementsByClassName('shopTr');
    for (var i = 0; i < trToDelete.length; i++) {
        emptyChildNodes(trToDelete[i])
    }
    var tableCloned = document.getElementById('shopTrToClone');
    var elem;
    var itemsMap = shop.getMapFromKey(itemTypeEnum.CONSUMABLE);
    var Char = gameState.getCharacter()
    for (var [key,value] of itemsMap) {
        playerQty = Char.type.inventory.items.has(key) ? Char.type.inventory.items.get(key).getAmount() : 0
        if (playerQty > 0 || value.quantity > 0) {
            elem = tableCloned.cloneNode(true);
            elem.id = ''

            var elemType = elem.getElementsByClassName('itemKey')[0];
            var textNode = document.createTextNode(value.item.type)
            elemType.appendChild(textNode)

            var elemImageTd = elem.getElementsByClassName('itemImage')[0];
            var itemImage = imageBase.getImg(key)
            var itemImageSrc = itemImage.getAttribute('src')
            elemImageTd.setAttribute('src', itemImageSrc);
            elemImageTd.setAttribute('key', key);
            elemImageTd.setAttribute('id', value.id);
            updateImage(elemImageTd, value.item)
           
            var elemQty = elem.getElementsByClassName('itemQuantity')[0];
            textNode = document.createTextNode(value.quantity)
            elemQty.appendChild(textNode)

            var elemBuyPrice = elem.getElementsByClassName('itemBuy')[0].getElementsByClassName('submitAction')[0];
            elemBuyPrice.value = value.item.entity.buyPrice;
            
            var elemSellPrice = elem.getElementsByClassName('itemSell')[0].getElementsByClassName('submitAction')[0];
            elemSellPrice.value = value.item.entity.sellPrice;

            var itemPlayerQuantity = elem.getElementsByClassName('itemPlayerQuantity')[0];
            textNode = document.createTextNode(playerQty)
            itemPlayerQuantity.appendChild(textNode)

            parentNode.insertBefore(elem,shopHead.nextSibling);
        }
    }
    var merchantGold = document.getElementById("merchantGold");
    textNode = document.createTextNode(shop.merchantGold);
    emptyChildNodes(merchantGold)
    merchantGold.appendChild(textNode)

    var playerGold = document.getElementById("playerGold");
    textNode = document.createTextNode(Char.type.goldAmount);
    emptyChildNodes(playerGold)
    playerGold.appendChild(textNode)
}

function updateImage(node, value) {
    var tempNode = document.createElement("div")
    var cardCloned = document.getElementById('cardToClone')
    cardElem = cardCloned.cloneNode(true);
    cardElem.id = ''

    itemName = cardElem.getElementsByClassName('itemName')[0];
    itemName.innerText = value.entity.name
    itemDescription = cardElem.getElementsByClassName('itemDescription')[0];
    itemDescription.innerText = value.entity.description
    
    emptyNode(tempNode)
    tempNode.appendChild(cardElem)
    node.setAttribute('title', tempNode.innerHTML)
    node.removeAttribute('data-original-title')
    node.addEventListener("contextmenu", function(e) {
        var menu = document.querySelector(".menu");
        var options = menu.getElementsByClassName('context-option');
        toggleHiddenNodes(options, [])
        var parentNode = this.parentNode
        //go back up to a trElement element
        while (parentNode.className.indexOf('trElement') === -1) {
            parentNode = parentNode.parentNode
        }
        var itemKey = parseInt(parentNode.getElementsByClassName('itemKey')[0].textContent.trim());
        var itemName = this.getAttribute('key');
        itemName = itemName.trim()
        var itemId = this.getAttribute('id').trim()
        var item = gameState.getItem(itemId);
        
        var useNode = menu.getElementsByClassName('contextUse')[0]
        var equipNode = menu.getElementsByClassName('contextEquip')[0]
        var unequipNode = menu.getElementsByClassName('contextUnequip')[0]
        var noAction = menu.getElementsByClassName('noAction')[0]
        var showNodes = []
        var character = gameState.getCharacter()


        switch (itemKey) {
            case(itemTypeEnum.CONSUMABLE) : 
                if (character.type.inventory.items.has(itemName)) {
                    useNode.setAttribute('onclick', 'contextUseItem(\''+ itemId.toString() + '\')')
                    showNodes.push(useNode)
                } else {
                    showNodes.push(noAction)
                } 
                break;
            case(itemTypeEnum.ITEM) : 
                showNodes.push(noAction)
                break;
            case(itemTypeEnum.WEAPON) : 
                if (character.equipements.weaponIsEquipped(item)) {
                    unequipNode.setAttribute('onclick', 'contextUnequipWeapon(\''+ itemId.toString() + '\')')
                    showNodes.push(unequipNode)
                } else {
                    if (character.type.inventory.items.has(itemName)) {
                        unequipNode.setAttribute('onclick', 'contextEquipWeapon(\''+ itemId.toString() + '\')')
                        showNodes.push(equipNode)
                    } else {
                        showNodes.push(noAction)
                    }
                }
                break;
            case(itemTypeEnum.ARMOR) : 
                if (character.equipements.armorIsEquipped(item)) {
                    unequipNode.setAttribute('onclick', 'contextUnequipArmor(\''+ itemId.toString() + '\')')
                    showNodes.push(unequipNode)
                } else {
                    if (character.type.inventory.items.has(itemName)) {
                        unequipNode.setAttribute('onclick', 'contextEquipArmor(\''+ itemId.toString() + '\')')
                        showNodes.push(equipNode)
                    } else {
                        showNodes.push(noAction)
                    }
                }
                break;
            default :
                break;
        }

        toggleHiddenNodes([], showNodes)
        $(this).tooltip('hide')
        e.preventDefault();
        const origin = {
          left: e.pageX,
          top: e.pageY
        };
        setPosition(origin);
        return false;
      });
    activateTooltip()
}

function toggleHidden(hideArrayStr, showArrayStr) {
    var hideArray = [];
    for (var i = 0; i < hideArrayStr.length; i++) {	
        hideArray.push(document.getElementById(hideArrayStr[i]));
    }

    var showArray = [];
    for (var i = 0; i < showArrayStr.length; i++) {
        showArray.push(document.getElementById(showArrayStr[i]));
    }	
    
    toggleHiddenNodes(hideArray, showArray)
}

function toggleHiddenNodes(hideArray, showArray) {
    for (var i = 0; i < hideArray.length; i++) {
        hideArray[i].className = hideArray[i].className.split("toggleShow").join(' toggleHide ');
    }

	for (var i = 0; i < showArray.length; i++) {
        showArray[i].className = showArray[i].className.split("toggleHide").join(' toggleShow ');
    }
}

function setCharacterInfo() {
    var character = gameState.getCharacter()
    var updatableInfo = document.getElementsByClassName('updatableInfo')
    for (var i = 0; i < updatableInfo.length; i++) {
        var attribut = character.attributs.get(updatableInfo[i].getAttribute('name'))
        updatableInfo[i].setAttribute('aria-valuenow',attribut.currentValue)
        updatableInfo[i].setAttribute('aria-valuemin',attribut.minValue)
        updatableInfo[i].setAttribute('aria-valuemax',attribut.maxValue)
    }
}
function updateCharacterInfo() {
    var character = gameState.getCharacter()
    var updatableInfo = document.getElementsByClassName('updatableInfo')
    for (var i = 0; i < updatableInfo.length; i++) {
        var attribut = character.attributs.get(updatableInfo[i].getAttribute('name'))
        updatableInfo[i].setAttribute('style', 'width: ' + attribut.currentValue / attribut.maxValue * 100 + '%')
        if (attribut.critique) {
            if (updatableInfo[i].className.split("bg-info").length > 1) {
                updatableInfo[i].className = updatableInfo[i].className.split("bg-info").join(' bg-danger ');
            }
        } else {
            if (updatableInfo[i].className.split("bg-danger").length > 1) {
                updatableInfo[i].className = updatableInfo[i].className.split("bg-danger").join(' bg-info ');
            }
        }
        var currentValue = updatableInfo[i].parentNode.getElementsByClassName('currentValue')[0]
        currentValue.innerHTML = Math.floor(attribut.currentValue)
        var maxValue = updatableInfo[i].parentNode.getElementsByClassName('maxValue')[0]
        maxValue.innerHTML = attribut.maxValue
        var goldAmount = document.getElementById('goldAmount')
        goldAmount.innerHTML = character.type.goldAmount
    }
}

function updateActiveItem() {
    var character = gameState.getCharacter()
    var oldactivatebleItem = document.getElementById('activeItem')
    var activatebleItem = oldactivatebleItem.cloneNode(true);
    var parentNode = oldactivatebleItem.parentNode;
    parentNode.replaceChild(activatebleItem, oldactivatebleItem)
    var activeItemAmount = document.getElementById('activeItemAmount')
    var activeItem = character.type.inventory.activeItem
    if (activeItem != null) {
        toggleHidden([],['activeItem'])
        var itemImage = imageBase.getImg(activeItem.key)
        var itemImageSrc = itemImage.getAttribute('src')
        activatebleItem.setAttribute('src', itemImageSrc);
        updateImage(activatebleItem, activeItem)
        activeItemAmount.innerText = ' x' + activeItem.totalUses;
    } else {
        toggleHidden(['activeItem'], [])
        activeItemAmount.innerText = 'No Item'
    }
    activateTooltip()
}

function activateTooltip() {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })
}

function emptyNode(myNode) {
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

//contextMenu 

let menuVisible = false;

const toggleMenu = command => {
var menu = document.querySelector(".menu");
  menu.style.display = command === "show" ? "block" : "none";
  menuVisible = command === "show";
};

const setPosition = ({ top, left }) => {
  var menu = document.querySelector(".menu");
  var left  = `${left}`
  menu.style.left = left + 'px';
  menu.style.top = `${top}px`;
  
  toggleMenu("show");
};

window.addEventListener("click", e => {
  if(menuVisible)toggleMenu("hide");
});
