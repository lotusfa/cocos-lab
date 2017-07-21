
var State = cc.Enum({
    Menu: -1,
    Run : -1,
    Over: -1
});

var GameManager = cc.Class({
    extends: cc.Component,

    properties: {
        
        gameOverMenu: cc.Node,
        MainMenu: cc.Node,
        
    },
    
    statics: {
        State
    },

    // use this for initialization
    onLoad () {
        D.game = this;
        D.GameManager = GameManager;
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enable = true;
        this.startMenu();
    },
    
    startMenu () {
        this.gameOverMenu.active = false;
        this.MainMenu.active = true;
        this.state = State.Menu;
        //this.runGame ();
    },
    
    runGame () {
        this.gameOverMenu.active = false;
        this.MainMenu.active = false;
        this.state = State.Run;
        D.scoreManager.score = 0;
        D.ballManager.init();
        D.waveManager.startWave();
    },
    
    gameOver () {
        //-- 背景音效停止，死亡音效播放
        // cc.audioEngine.stopMusic(this.gameBgAudio);
        // cc.audioEngine.playEffect(this.dieAudio);
        // cc.audioEngine.playEffect(this.gameOverAudio);
        D.waveManager.stopWave();
        this.state = State.Over;
        this.gameOverMenu.active = true;
    },
    
    
    
    update: function (dt) {
    },
    
});
