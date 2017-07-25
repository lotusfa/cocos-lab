cc.Class({
    extends: cc.Component,
    properties: {
        score: 0,
        score_Label : cc.Label
    },

    // use this for initialization
    onLoad: function () {
        D.scoreManager = this;
    },
    
    score_next_level : function(){
        return (Math.pow(D.waveManager.wave,2))*3;
    },
    
    bonus_ball_ls_5: function(){
        this.score_add(10);
        this.ball_drop(10);
    },
    
    score_add: function(s){
        if( D.game.state == 1) this.score += s;
        if(this.score >= this.score_next_level())
            D.waveManager.wave++;
    },
    
    // called every frame, uncomment this function to activate update callback + "/" + this.score_next_level()
    update: function (dt) {
         this.score_Label.getComponent("cc.Label").string = this.score.toString() ;
    },
});

