cc.Class({
    extends: cc.Component,
    
    
    
    properties: {
        init_speed : 1000,
        box_label : {
            default : null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {
        
        this.generateRandomNumber();
        
        this.node._components[1]._linearVelocity.x = this.init_speed*Math.random()*(-1)^Math.random();
        this.node._components[1]._linearVelocity.y = -1*this.init_speed*Math.random();
        console.log(this.node._components[1]._linearVelocity.y);
        
        let self = this.node;
        this.node.on('touchstart', function (event) {
            this.generateRandomNumber();
            this.node.dispatchEvent( new cc.Event.EventCustom('killMe', true) );
        }, this);
    },
    
    generateRandomNumber : function(){
        let str = Math.round(Math.random()*4)+1;
        this.box_label.string = str;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
