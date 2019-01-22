function ElementMaps() {
    this.ConsumableMap = new Map();

    this.addNewKeyElementToMap = function(map, key, element) {
        map.set(key,element);
    }

    this.getConsumableMap = function() {
        return this.ConsumableMap;
    }

    this.toJSON  = function(){
		let obj= {
            ConsumableMap: mapToObjectRec(this.ConsumableMap),
		}
		return obj
	}
}

function returnElementFromMap (map, key) {
    return map.get(key);
}