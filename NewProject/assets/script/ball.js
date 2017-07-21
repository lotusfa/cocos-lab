cc.Class({
    extends: cc.Component,
    
    properties: {
        init_speed_x : 1000,
        init_speed_y : 1000,
        box_label : {
            default : null,
            type: cc.Label
        },
        opacity_selected_on : 250,
        opacity_selected_off : 150,
        value : 0
    },

    // use this for initialization
    onLoad: function () {
        
        this.generateRandomNumber();
        
        var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        this.node._components[1]._linearVelocity.x = this.init_speed_x*Math.random()*plusOrMinus;
        this.node._components[1]._linearVelocity.y = -1*this.init_speed_y*Math.random();
        this.offSelected();
        
    },
        
    generateRandomNumber : function(){
        let str = Math.round(Math.random()*4)+1;
        this.value = str;
        this.box_label.string = str;
    },
    
    onSelected : function(){
        this.node.opacity = this.opacity_selected_on;
    },
    
    offSelected : function(){
        this.node.opacity = this.opacity_selected_off;
    },
    
    touchGround : function(){
        this.die();
        D.lifeManager.life_edit(-1);
    },
    
    die : function(){
        D.ballManager.despawnBall(this);
        //this.game.getComponent('game').ballPool.put(this.node);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
