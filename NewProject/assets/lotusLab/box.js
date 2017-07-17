cc.Class({
    extends: cc.Component,
    
    properties: {
        init_speed : 1000,
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
        
        this.node._components[1]._linearVelocity.x = this.init_speed*Math.random()*(-1)^Math.random();
        this.node._components[1]._linearVelocity.y = -1*this.init_speed*Math.random();
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

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
