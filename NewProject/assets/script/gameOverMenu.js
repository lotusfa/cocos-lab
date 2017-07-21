var GameOverMenu = cc.Class({
    //-- 继承
    extends: cc.Component,
    //-- 属性
    properties: {
        score: cc.Label
    },
    // 加载Game场景(重新开始游戏)
    restart : function () {
        D.game.runGame();
    },
    
    Home : function () {
        cc.director.loadScene('game');
    },
    
    update: function () {
        this.score.getComponent('cc.Label').string = "Score: " + D.scoreManager.score;
    }
});
