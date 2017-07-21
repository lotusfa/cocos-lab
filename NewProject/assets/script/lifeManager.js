cc.Class({
    extends: cc.Component,
    properties: {
        life: 0,
        life_Label: cc.Label
    },

    // use this for initialization
    onLoad: function () {
        D.lifeManager = this;
    },
    
    life_edit: function(s){
        
        if( this.life >0 ) this.life--;
        
        if(this.life <= 0){
            D.game.gameOver();
        }
    },
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
         this.life_Label.getComponent("cc.Label").string = 'HP: ' + this.life.toString();
    },
});
