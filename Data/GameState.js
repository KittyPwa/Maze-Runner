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

	this.entities.set((playerTypes.CHARACTER).toString(), this.characters)
	this.entities.set((playerTypes.MONSTER).toString(), this.monsters)
	this.entities.set((playerTypes.ALLY).toString(), this.allies)
	
	this.clearEntries = function() {
		this.clearCharacters();
		this.clearMonsters();
		this.clearAllies();
	}
	
	this.clearAllButCharacter = function() {
		this.clearMonsters();
		this.clearAllies();
	}
	
	this.updateCharacter = function(character) {
		this.characters[0] = character
		this.entities.set((playerTypes.CHARACTER).toString(), this.characters)
	}

	this.addCharacter = function(character) {
		this.characters.push(character)
		this.entities.set((playerTypes.CHARACTER).toString(), this.characters)
	}
	
	this.clearCharacters = function() {
		this.characters = [];
		this.entities.set((playerTypes.CHARACTER).toString(), this.characters)
	}

	this.getCharacter = function() {
		return this.characters[0]
	}
	
	this.removeCharacter = function(character) {
		Remove(this.characters, character);
		this.entities.set((playerTypes.CHARACTER).toString(), this.characters)
	}
	
	this.getMonsters = function() {
		return this.monsters;
	}

	this.addMonster = function(monster) {
		this.monsters.push(monster)
		this.entities.set((playerTypes.MONSTER).toString(), this.monsters)
	}
	
	this.clearMonsters = function() {
		this.monsters = [];
		this.entities.set((playerTypes.MONSTER).toString(), this.monsters)
	}
	
	this.removeMonsters = function(monster) {
		Remove(this.monsters, monster);
		this.entities.set((playerTypes.MONSTER).toString(), this.monsters)
	}

	this.getMonsters = function() {
		return this.monsters
	}

	this.addAlly = function(ally) {
		this.allies.push(ally)
		this.entities.set((playerTypes.ALLY).toString(), this.allies)
	}
	
	this.clearAllies = function() {
		this.allies = [];		
		this.entities.set((playerTypes.ALLY).toString(), this.allies)
	}
	
	this.removeAlly = function(ally) {
		Remove(this.allies, ally);
		this.entities.set((playerTypes.ALLY).toString(), this.allies)
	}

	this.getAllies = function() {
		return this.allies
	}
	
	this.removeEntity = function(entity, key) {
		remove(this.entities.get(key.toString()), entity)
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

}
typeMap.set('GameState', GameState)

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
        var entries = this.gameStates.entries();
        var entry = entries.next()
        while(!entry.done) {
            existingGameStates.push(entry.value[1])
            entry = entries.next()
        }
        return existingGameStates
	}
}
typeMap.set('Games', Games)

function saveGame() {
	store(game)
}

function loadGame() {
	var game = load("game")
	if (game == null) {
		game = new Games()
	}
	return game
}