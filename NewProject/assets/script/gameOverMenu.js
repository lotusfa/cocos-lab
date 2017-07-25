var GameOverMenu = cc.Class({
    //-- 继承
    extends: cc.Component,
    //-- 属性
    properties: {
        score: cc.Label,
        level_label: cc.Label
    },
    // 加载Game场景(重新开始游戏)
    restart : function () {
        D.game.runGame();
    },
    
    Home : function () {
        D.game.startMenu();
    },
    
    update: function () {
        this.score.getComponent('cc.Label').string =  D.scoreManager.score;
        this.level_label.getComponent('cc.Label').string = "Level " + D.waveManager.wave;
    }
});
