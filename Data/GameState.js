function GameState() {
	this.state = null;

	this.id = uuidv4();

	this.pauseGame = function() {
		this.state = gameStateEnum.PAUSE;
	}

	this.continueGame = function() {
		this.state = gameStateEnum.CONTINUE;
	}

	this.loseGame = function() {
		this.state = gameStateEnum.DEFEAT;
	}

	this.winGame = function() {
		this.state = gameStateEnum.VICTORY;
	}

	this.maze = null;

	this.updateMaze = function(maze) {
		this.maze = maze;
	}

	this.removeMaze = function() {
		this.maze = null;
	}
	
	this.characters = [];
	
	this.monsters = [];
	
	this.allies = [];
	
	this.entities = new Map();
	this.clearEntries = function() {
		this.clearCharacters();
		this.clearMonsters();
		this.clearAllies();
	}
	
	this.clearAllButCharacter = function() {
		this.clearMonsters();
		this.clearAllies();
	}
	
	this.createCharacter = function(character) {
		this.characters[0] = character
	}

	this.addCharacter = function(character) {
		this.characters.push(character)
	}
	
	this.clearCharacters = function() {
		this.caracters = [];
		this.entities.set(playerTypes.CHARACTER,this.characters)
	}
	
	this.removeCharacter = function(character) {
		Remove(this.characters, character);
	}
	
	this.addMonster = function(monster) {
		this.monsters.push(monster)
	}
	
	this.clearMonsters = function() {
		this.monsters = [];
		this.entities.set(playerTypes.MONSTER,this.monsters)
	}
	
	this.removeMonsters = function(monster) {
		Remove(this.monsters, monster);
	}
	
	this.addAlly = function(ally) {
		this.allies.push(ally)
	}
	
	this.clearAllies = function() {
		this.allies = [];		
		this.entities.set(playerTypes.ALLY,this.allies)
	}
	
	this.removeAlly = function(ally) {
		Remove(this.allies, ally);
	}
	
	this.removeEntity = function(entity, key) {
		remove(this.entities.get(key), entity)
	}

	this.shop = null;

	this.addShop = function(shop) {
		this.shop = shop
	}

	this.removeShop = function() {
		this.shop = null
	}

	//timerBooleansArray = [cycleActiveItem,useActiveItem,useActivatableEntity,sprint]
	this.timerBooleansArray= [false,false,false,false];

	this.toJSON  = function(){
		let obj= {
			entities: mapToObjectRec(this.entities),
			id:this.id,
			maze:this.maze,
			characters:this.characters,
			monsters:this.monsters,
			allies:this.allies,
			shop:this.shop,
		}
		return obj
	}
}

function Games() {
	this.gameStates = new Map()

	this.id = "game";

	this.addGameState = function(gameState) {
		this.gameStates.set(gameState.id, gameState)
		console.log(this)
	}

	this.removeGameState = function(gameState) {
		this.gameStates.delete(gameState.id)
	}

	this.getGameState = function(id) {
		return this.gameStates.get(id)
	}

	this.getAllGameStates = function() {
		var existingGameStates = [];
		console.log(this)
		console.log(this.gameStates.entries)
        var entries = this.gameStates.entries();
        var entry = entries.next()
        while(!entry.done) {
            existingGameStates.push(entry.value[1])
            entry = entries.next()
        }
        return existingGameStates
	}

	this.toJSON  = function(){
		let obj= {
			gameStates: mapToObjectRec(this.gameStates),
			id:this.id,
		}
		return obj
	}
}

function saveGame() {
	store(game)
}

function loadGame() {
	return load("game")
}