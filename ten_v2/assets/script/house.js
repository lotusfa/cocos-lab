var AttackType = cc.Enum({
    attack1B1 : -1,
    attackAll : -1
});

var State = cc.Enum({
    StandBy: -1,
    Fight : -1
});

cc.Class({
    extends: cc.Component,
        
    properties: {
        box_label : {
            default : null,
            type: cc.Label
        },
        
        unitID : "h1",
        _unitID : -1,
        type : 0,
        moveSpeed: 1,
        team: "B",
        HP : 1000,
        _HP : "",
        attack_rang : 200,
        attack_value : 100,
        attack_duration : 2000,
        attack_type : AttackType.attack1B1,
        
        _state : State.StandBy,
        _speedX : 0,
        _left : false,
        _right : false,
        _enemys : [],
        _interval : [],
    },
    
    // use this for initialization
    onLoad: function () {
        
        this._unitID = this.unitID;
        //set group
        this.node.group = (this.team == "B")?"unitB":"unitA";
        this.node._components[3].radius = this.attack_rang;
    },
    
    resetHouse: function (){
        this._HP = this.HP;
        this.fight_end();
    },
    
    onBeginContact: function (contact, selfCollider, otherCollider) {
        
        if(otherCollider.node.name == "unit" 
        && otherCollider.sensor === false 
        && otherCollider.getComponent('unit').team != this.team){
            let enemy = otherCollider.getComponent('unit');
            this._enemys[enemy._unitID] = enemy;
            this.fight();
        }
    },
    
    onEndContact: function (contact, selfCollider, otherCollider) {
        if(otherCollider.node.name == "unit" 
        && otherCollider.sensor === false 
        && otherCollider.getComponent('unit').team != this.team){
            let enemy = otherCollider.getComponent('unit');
            this._enemys[enemy._unitID] = null;
            
            let numberOfEnemy = 0;
            this._enemys.forEach((enemy)=>{
                if(enemy !== null )
                    numberOfEnemy++;
            });
            if (numberOfEnemy === 0){ this.fight_end();}
        }
    },
    
    fight : function(){
        this._state = State.Fight;
        
        if(!this._interval.fightt){
            if(this.attack_type == AttackType.attack1B1 ){ this.attackOneByOne(); }
            else if(this.attack_type == AttackType.attackAll ){ this.attackAll(); }
        }
    },
    
    fight_end : function(){
        this._state = State.StandBy;
        clearInterval(this._interval.fightt);
        this._interval.fightt = false;
    },
    
    attackOneByOne : function(){
        this._interval.fightt = setInterval( ()=>{ 
            let x = 0;
            this._enemys.forEach((enemy)=>{
                if(enemy !== null && x===0 ){
                    this.attack(enemy);
                    console.log(this._unitID,"->",enemy._unitID," which have ", enemy._HP);
                    x++;
                }
            });
        }, this.attack_duration);
    },
    
    attackAll : function(){
        this._interval.fightt = setInterval( ()=>{ 
            this._enemys.forEach((enemy)=>{
                if(enemy !== null ){
                    this.attack(enemy);
                    console.log(this._unitID,"->",enemy._unitID," which have ", enemy._HP);
                }
            });
        }, this.attack_duration);
    },
    
    attack : function(unit){
        unit.getComponent('unit').be_attack(this.attack_value);
    },
    
    be_attack : function(value){
        if (this._HP > 0 ) {
            this._HP -= value; 
            if( this.team === "B") D.scoreManager.score_add(value/100); 
            if (this._HP <= 0)this.die();
        }
    },
    
    die : function(){
        console.log(this.team,"lose");
        D.game.gameOver();
    },
    
    update: function (dt) {
        this.box_label.string = this._HP;
    },
    
});

