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
        value : 0,
        img1 : cc.Sprite,
        img2 : cc.Sprite,
        img3 : cc.Sprite,
        img4 : cc.Sprite,
        img5 : cc.Sprite
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
        this.s = this.getComponent(cc.Sprite);
        
        if(str == "1" ) {
            this.img1.node.active = true;
        }
        if(str == "2" ) {
            this.img2.node.active = true;
            this.box_label.node.color = cc.color(255,255,255);
        }
        if(str == "3" ) {
            this.img3.node.active = true;
            this.box_label.node.color = cc.color(255,255,255);
        }
        if(str == "4" ) {
            this.img4.node.active = true;
            this.box_label.node.color = cc.color(255,255,255);
        }
        if(str == "5" ) {
            this.img5.node.active = true;
            this.box_label.node.color = cc.color(255,255,255);
        }
    },
    
    onSelected : function(){
        this.node.opacity = this.opacity_selected_on;
    },
    
    offSelected : function(){
        this.node.opacity = this.opacity_selected_off;
    },
    
    touchGround : function(){
        this.die();
    },
    
    die : function(){
        D.ballManager.despawnBall(this);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
