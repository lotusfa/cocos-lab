var AttackType = cc.Enum({
    attack1B1 : -1,
    attackAll : -1
});

let unit = require('unit');

// var State = cc.Enum({
//     StandBy: -1,
//     Fight : -1
// });

cc.Class({
    extends: unit,
        
    properties: {
        box_label : {
            default : null,
            type: cc.Label
        },

        team: "B",
        HP : 1000,
        attack_rang : 200,
        attack_value : 100,
        attack_duration : 2000,
        attack_type : AttackType.attack1B1,
        size: 100
    },
    
    // use this for initialization
    onLoad: function () {
        this.initHouse();
    },
    
    setHouse : function(arr){
        if (arr.team) this.team = arr.team;
        if (arr.HP) this.HP = arr.HP;
        if (arr.attack_rang) this.attack_rang = arr.attack_rang;
        if (arr.attack_value) this.attack_value = arr.attack_value;
        if (arr.attack_duration) this.attack_duration = arr.attack_duration;
        if (arr.attack_type) this.attack_type = arr.attack_type;
        if (arr.size) this.size = arr.size;
        this.initHouse();
    },
    
    initHouse: function(){
        
            let unitValue = {
                team : this.team,
                HP : this.HP,
                moveSpeed: 0,
                attack_rang : this.attack_rang,
                attack_value : this.attack_value,
                attack_duration : this.attack_duration,
                attack_type : this.attack_type,
                size : this.size,
            };
            
            this.setUnit(unitValue);
            
            //initPosition
            let x = ( this.team == "A" )? 100:860;
            this.setPosition(x, 10);
    },
    
    resetHouse: function (){
        this._HP = this.HP;
        this.fight_end();
    },
    
    be_attack : function(value){
        if (this._HP > 0 ) {
            this._HP -= value; 
            if( this.team === "B") D.scoreManager.score_add(value/100); 
            if (this._HP <= 0) D.game.gameOver();
        }
    },
    
    update: function (dt) {
        this.box_label.string = this._HP;
    },
    
});

