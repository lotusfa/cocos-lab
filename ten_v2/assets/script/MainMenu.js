var MainMenu = cc.Class({
    //-- 继承
    extends: cc.Component,
    //-- 属性
    properties: {
        icon_node : cc.Node,
        icon_moveDuration : 0.3,
        icon_moveHight : 200,
        Tutorial: cc.Node,
        Main: cc.Node,
    },
    
    onLoad: function () {
        // 初始化跳跃动作
        this.m = this.setMoveAction();
        this.icon_node.runAction(this.m);
        this.home();
    },
    // 加载Game场景(重新开始游戏)
    startGame: function () {
        D.game.runGame();
    },
    
    home : function () {
        this.Main.active = true;
        this.Tutorial.active = false;
    },
    
    about : function () {
        this.Main.active = false;
        this.Tutorial.active = true;
    },
    
    setMoveAction : function(){
        var jumpUp = cc.moveBy(this.icon_moveDuration, cc.p(0, this.icon_moveHight)).easing(cc.easeCubicActionOut());
        // 下落
        var jumpDown = cc.moveBy(this.icon_moveDuration, cc.p(0, -this.icon_moveHight)).easing(cc.easeCubicActionIn());
        // 不断重复
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
    },
    
    update: function () {
        
    }
});
