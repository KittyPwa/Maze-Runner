(function () {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

var entities = [];
var mazeMaker;
var i = 0;
var j = 0;
var EventFilter = 0;
var game;
var gameState;
var shop;
var imageBase = new Images();
var keys = [];
var mazeSize = 20;
var gameDifficulty = 5;
var charSpeed = 3;
var radius;
var currentAnimationReq = null;
var CSize = 600;
var globalTimer = null;
var timer = null;

function loadGames() {
    game = loadGame();
}


function newGame() {
    gameState = new GameState();
    game.addGameState(gameState);
    createPlayer();
    shop = new Shop();
    shop.InitializeShop();
    gameState.addShop(shop);
}

function startVars(id) {
    if (id != 'null') {
        gameState = game.getGameState(id)
    }
    shop = gameState.shop
    loadImgs();
    saveGame()
}

function updateGlobalValues() {
    e = document.getElementById("cSizeSelect");
    windowSize = getWindowSize()
    windowSize[1] -= windowSize[1] % 100 
    windowSize[0] -= windowSize[0] % 100 
    CSize = windowSize[0] > windowSize[1] ? windowSize[1] : windowSize[0];
    CSize -= 20;
    e = document.getElementById("playerSpeedSelect");
	charSpeed = parseInt(e.options[e.selectedIndex].value)
    e = document.getElementById("gameLengthSelect");
	mazeSize = parseInt(e.options[e.selectedIndex].value)
    e = document.getElementById("gameDifficultySelect");
	gameDifficulty = parseInt(e.options[e.selectedIndex].value)
}

function createPlayer() {
    if (gameState.state != gameStateEnum.VICTORY) {
        clearText();
        globalTimer = new gameTimer(null, 50)
        player = new Player()
        Char = new Character(null,null, null, radius, 'blue', charSpeed, player);
        Char.type.addItem(new Item(new Key()))
        gameState.updateCharacter(Char);
    }
}

function initializeGame() {
	document.getElementById('newGameId').blur()
	updateGlobalValues();
	cancelAnimationFrame(currentAnimationReq);
	mazeMaker = null;	
    myGameArea.start();
    myGameArea.clear();
    mazeMaker = new MazeMaker(mazeSize);
    mazeMaker.MakeMaze();
    gameState.updateMaze(mazeMaker.Maze)
	if (gameState.state != gameStateEnum.VICTORY) {
		gameState.clearEntries();
	} else {
		gameState.clearAllButCharacter();
	}
    if (mazeMaker.Notify) {
        var startRoom = gameState.maze.getStartRoom();
        radius = Math.floor(startRoom.CanvasRoom.roomSize / 6);
        if (gameState.state != gameStateEnum.VICTORY) {
            clearText();
            globalTimer = new gameTimer(null, 50)
            player = new Player()
            Char = new Character(startRoom.CanvasRoom.posX,startRoom.CanvasRoom.posY, gameState.maze, radius, 'blue', charSpeed, player);
            gameState.updateCharacter(Char);
        }
        Char = gameState.getCharacter()
        Char.updateCanvasChar(startRoom.CanvasRoom.posX,startRoom.CanvasRoom.posY, gameState.maze)
        Char.updateDrawnAttributs();
        Char.CanvasChar.teleport(startRoom.x, startRoom.y);
        gameState.updateCharacter(Char)
        console.log(gameState)
        var patrollerAmount = Random(1,(mazeSize / gameDifficulty) / 3)
        for (var i = 0; i < mazeSize / gameDifficulty; i++) {
        //for (var i = 0; i < 1; i++) {
            var randomRoom = gameState.maze.getRandomNonSpecialRoom(mazeMaker)
            var monsterSpeed = Random(1,charSpeed);
            var type = monsterMovementType.ROAMER;
            if (patrollerAmount > 0) {
                patrollerAmount--;
                type = monsterMovementType.PATROLLER
            }
            player = new Monster(type)
            monster = new Character(randomRoom.CanvasRoom.posX, randomRoom.CanvasRoom.posY, gameState.maze, radius, 'red', monsterSpeed, player);
			gameState.addMonster(monster);
        }
		var rooms = gameState.maze.Rooms;
		for (var i = 0; i < rooms.length; i++) {
			for (var j = 0; j < rooms[i].length; j++) {
				rooms[i][j].initializeSightMap()
			}
        }
    }		
}

function startGame() {   
    gameState.getCharacter().CanvasChar.drawAttributs(Char.type.activeItem, Char.type.goldAmount)
	addTextToConsole('You\'ve entered the maze')
	if (timer != null) {
		clearTimeout(timer)
	}
    timer = launchTimer(globalTimer);
    passiveEntityRooms = gameState.maze.getPassiveEntityRooms();
    for (var i = 0; i < passiveEntityRooms.length; i++) {
        passiveEntityRooms[i].passiveEntity.effect(passiveEntityRooms[i])
    }
    gameState.state = gameStateEnum.CONTINUE;
    gameState.maze.drawMaze()
    setCharacterInfo()
    requestAnimationFrame(updateGameArea);
}

function keyPress() { 
    var x=0;
    var y=0;
    //left
    if (keys[37]) {
        x = -1;
        y = 0;
    }
    //up
    if (keys[38]) {
        x = 0;
        y = -1;
    }
    //right
    if (keys[39]) {
        x = 1;
        y = 0;
    }
    //down
    if (keys[40]) {
        x = 0;
        y = 1;
    }
	//E : use item
    if (keys[69]) {
		if (!gameState.timerBooleansArray[timerBooleans.USEACTIVEITEM]) {
			gameState.timerBooleansArray[timerBooleans.USEACTIVEITEM] = true;
            Char = gameState.getCharacter()
			charRoom = gameState.maze.getRoomFromChar(Char.CanvasChar)
			Char.type.useItem(charRoom, gameState.maze);
			Char.CanvasChar.drawCharacter();
			Char.updateDrawnAttributs()
			setTimeout(function() {
                if (gameState.timerBooleansArray[timerBooleans.USEACTIVEITEM]) {
                    gameState.timerBooleansArray[timerBooleans.USEACTIVEITEM] = false;
                }
            }, 750)
		}
    }

    //SPACE : use activatable entity
    if (keys[32]) {
		if (!gameState.timerBooleansArray[timerBooleans.USEACTIVATABLEENTITY]) {
			gameState.timerBooleansArray[timerBooleans.USEACTIVATABLEENTITY] = true;
			Char = gameState.getCharacter()
			charRoom = gameState.maze.getRoomFromChar(Char.CanvasChar)
			Char.type.useActivatableEntity(charRoom, gameState.maze,gameState.getMonsters());
			Char.CanvasChar.drawCharacter();
			Char.updateDrawnAttributs();
			setTimeout(function() {
                if (gameState.timerBooleansArray[timerBooleans.USEACTIVATABLEENTITY]) {
                    gameState.timerBooleansArray[timerBooleans.USEACTIVATABLEENTITY] = false;
                }
            }, 750)
		}
    }

    //Z : cycle item
    if (keys[90]) {
        if (!timerBooleans[timerBooleans.CYCLEACTIVEITEM]) {
            timerBooleans[0] = true;
            Char = gameState.getCharacter()
            Char.type.activateNextItem();
            setTimeout(function() {
                if (timerBooleans[0]) {
                    timerBooleans[0] = false;
                }
            }, 500)
        }
    }

    if (keys[16] && (x != 0 || y != 0)) {
        gameState.getCharacter().sprint()
    } else {
        gameState.getCharacter().walk()
    }
    //any other key
    if (!keys[37] &&!keys[38] && !keys[39] && !keys[40]) {
        x = 0;
        y = 0;
        Char.CanvasChar.Stop(); 
    }
    moveChar(x,y,Char, gameState.maze);
}

function updateGameArea() {
    updateCharacterInfo()
    var oldlightRooms = gameState.maze.getLightRooms();
    gameState.maze.resetLightRooms()
    this.keyPress();
    checkConflicts();
    var drawRooms = [];
    for (var [key,playerArray] of gameState.entities) {
        if (key != playerTypes.CHARACTER) {
            for (var i = 0; i < playerArray.length; i++) {                
				if (playerArray[i].type.toBeRemoved) {
					playerRoom = gameState.maze.getRoomFromChar(playerArray[i].CanvasChar)
					gameState.removeEntity(playerArray[i],key)
				} else {
                    returnAndToggleSeenRooms(playerArray[i])
                    //drawRooms.push(gameState.maze.getRoomFromChar(playerArray[i].CanvasChar))
                    moveAI(playerArray[i], mazeMaker);
                    //drawRooms.push(gameState.maze.getRoomFromChar(playerArray[i].CanvasChar))
                }   
			}
        } else {
            returnAndToggleSeenRooms(playerArray[0])
        }
    }
    var lightRooms = gameState.maze.getLightRooms();
    toggleOldLightRooms(oldlightRooms, lightRooms, gameState.getCharacter())
    for (var i = 0; i < lightRooms.length; i++) {
        remove(oldlightRooms, lightRooms[i]);
        remove(drawRooms, lightRooms[i])
    }
    lightRooms = lightRooms.concat(oldlightRooms);
    drawRooms = drawRooms.concat(lightRooms);
	var linkedRooms = []
	for(var i = 0; i < drawRooms.length; i++) {
		linkedIJRooms = gameState.maze.getLinkedRoom(drawRooms[i].x, drawRooms[i].y)
		for (var j = 0; j < linkedIJRooms.length; j++) {
			var room = gameState.maze.Rooms[linkedIJRooms[j][0]][linkedIJRooms[j][1]];
			var go = true;
			for (var k = 0; k < linkedRooms.length;k++) {
				go = go && (linkedRooms[k].x != room.x || linkedRooms[k].y != room.y)
			}
			if (go) {
				linkedRooms.push(room)
			}
		} 
	}
	for (var i = 0; i < drawRooms.length; i++) {
		remove(linkedRooms, drawRooms[i]);
	}
	for (var i = 0; i < linkedRooms.length; i++) {
        linkedRooms[i].CanvasRoom.drawRoom(linkedRooms[i].x,linkedRooms[i].y);
    }
    for (var i = 0; i < drawRooms.length; i++) {
        drawRooms[i].CanvasRoom.drawRoom(drawRooms[i].x,drawRooms[i].y);
    }
    for (var [key,playerArray] of gameState.entities) {
        for (var i = 0; i < playerArray.length; i++) {
            playerRoom = gameState.maze.getRoomFromChar(playerArray[i].CanvasChar)
            if (!playerRoom.isRoomInDark()) {
                playerArray[i].CanvasChar.clear();
                playerArray[i].CanvasChar.drawCharacter();
            }
        }
    }
    checkConflicts()
	if (gameState.getCharacter().health.currentValue <= 0) {
		gameState.loseGame()
    }
	switch (gameState.state) {
        case gameStateEnum.CONTINUE :
			currentAnimationReq = requestAnimationFrame(updateGameArea);
            break;
        case gameStateEnum.PAUSE : 
            break;
        default :
            //Manually put all pressed down keys to up
            for (var i = 0; i < keys.length; i++) {
                keys[i] = false;
            }
            addTextToConsole(gameState.state)
            clearTimeout(timer);
            returnFromMaze();
	}
}