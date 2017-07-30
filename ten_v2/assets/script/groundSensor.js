cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {

    },
    
    onBeginContact: function (contact, selfCollider, otherCollider) {
       this.touch(otherCollider);
    },

    touch: function(otherCollider){
       otherCollider.getComponent('unit').touchGround();
    }
});
