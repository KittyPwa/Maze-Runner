//Game operations
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

//Menu operations

function toggleHideAndSelectGame() {
    loadGames()
    toggleHideSelectGame()
    selects = document.getElementsByClassName('chooseGame');
    gameStates = game.getAllGameStates()
    for (var i = 0; i < gameStates.length; i++) {
        selects[i].setAttribute('gameId',gameStates[i].id)
        selects[i].setAttribute('value', 'Continue')
    }
}

function toggleHideAndStartGame(gameId) {
    var id = gameId.getAttribute('gameId')
    if (id == 'null') {
        newGame()
    }
    startVars(id)
    gameState.winGame()
    gameState.removeMaze()
    toggleHideStartGame()
}

function toggleHiddenAndShowShop() {
    updateMerchant()
    toggleHiddenShowShop()
}

function toggleHiddenAndStartMaze() {
    initializeGame()
    toggleHiddenStartMaze()
    startGame();
}

//initialization
function startVars(id) {
    if (id != 'null') {
        gameState = game.getGameState(id)
    }
    shop = gameState.shop
    loadImgs();
    saveGame();
    updateCharacterInfo()
    updateActiveItem()
}


function createPlayer() {
    clearText();
    gameState.addGameTimer(new gameTimer(null, 50));
    player = new Player()
    var Char = new Character('blue', charSpeed, player);
    Char.type.addItem(new Item(new Key()))
    for (var i = 0; i < 2; i++) {
        Char.type.addItem(new Item(new HealthPotion()))
    }
    gameState.updateCharacter(Char);
}

//update
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

function updatePlayerVisuals() {
    var Char = gameState.getCharacter()
    var startRoom = gameState.maze.getStartRoom();
    Char.updateCanvasChar(startRoom.x,startRoom.y)
    updateCharacterInfo();
    updateActiveItem()
    Char.CanvasChar.teleport(Char.CanvasChar.posX, Char.CanvasChar.posY);
    gameState.updateCharacter(Char);
}


//Game actions

function resetLocalStorage() {
    if (confirm("Are you certain you want to continue? All saved data will be lost.")) {
        localStorage.clear();
    }
}

function previousActiveItem() {
    var Char = gameState.getCharacter().type;
    Char.activatePreviousItem()
    updateActiveItem()
}

function nextActiveItem() {
    var Char = gameState.getCharacter().type;
    Char.activateNextItem()
    updateActiveItem()
}

function useItem(node) {
    $(node).tooltip('hide')
    $(node).tooltip('show')
    var item = gameState.getCharacter().type.activeItem;
    var maze = gameState.getMaze();
    var room = maze != null ? maze.getRoomFromChar(gameState.getCharacter().CanvasChar) : null
    gameState.getCharacter().type.useItem(maze, room, item)
    updateActiveItem()
    if (maze == null) {
        saveGame()
    }
}

function checkReturnToTown() {
    gameState.pauseGame();
    if (confirm("Are you certain you want to return to town? All current progress will be lost.")) {
        gameState.loseGame();
        returnFromMaze();
    } else {
        gameState.continueGame()
    }
    blurElement('showShopGameScreen');
}

function returnFromMaze() {
    clearText()
    gameState.maze.deactivatePassiveEntities()
    initializeGame()
    if (gameState.state != gameStateEnum.VICTORY) {
        createPlayer()  
    }
    gameState.clearAllButCharacter();
    gameState.getCharacter().rest()
    gameState.getCharacter().clearTemporaryModifiers()
    if (gameState.state == gameStateEnum.VICTORY) {
        var entries = gameState.getCharacter().attributs.entries();
        var entry = entries.next()
        while(!entry.done) {
            gameState.getCharacter().updateModifiedAttribut(entry.value[1])
            entry = entries.next()
        }
    }
    updateCharacterInfo()
    saveGame()
    toggleHiddenAndVillage();
}

