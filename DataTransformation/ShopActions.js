function sellThis(element) {
	var grandParent = element.parentNode.parentNode;
	var itemKey = grandParent.getElementsByClassName('itemKey')[0].textContent;
	var itemName = grandParent.getElementsByClassName('itemName')[0].textContent;
	var itemSell = grandParent.getElementsByClassName('itemSell')[0];
	var quantity = itemSell.getElementsByClassName('inputAmount')[0].value;
	sellItem(itemName, itemKey,quantity, Char);
}

function buyThis(element) {
	var grandParent = element.parentNode.parentNode;
	var itemKey = grandParent.getElementsByClassName('itemKey')[0].textContent;
	var itemName = grandParent.getElementsByClassName('itemName')[0].textContent;
	var itemBuy = grandParent.getElementsByClassName('itemBuy')[0];
	var quantity = itemBuy.getElementsByClassName('inputAmount')[0].value;
	buyItem(itemName, itemKey,quantity, Char);
}