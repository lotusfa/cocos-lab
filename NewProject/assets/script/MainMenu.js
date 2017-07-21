var MainMenu = cc.Class({
    //-- 继承
    extends: cc.Component,
    //-- 属性
    properties: {
    },
    // 加载Game场景(重新开始游戏)
    startGame: function () {
        D.game.runGame();
    },
    update: function () {
    }
});
