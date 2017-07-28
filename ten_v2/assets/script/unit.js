var State = cc.Enum({
    Move: -1,
    Fight : -1
});


let unit_index = 10;

let AttackType = cc.Enum({
    attack1B1 : -1,
    attackAll : -1
});

let unitType = D.unitType = {
    2 : {
        HP : 300,
        moveSpeed: 1.3,
        attack_rang : 300,
        attack_value : 50,
        attack_duration : 1500,
        attack_type : AttackType.attack1B1,
        size : 50,
    },
    3 : {
        HP : 500,
        moveSpeed: 1,
        attack_rang : 100,
        attack_value : 100,
        attack_duration : 1000,
        attack_type : AttackType.attack1B1,
        size : 50,
    },
    4 : {
        HP : 500,
        moveSpeed: 2.5,
        attack_rang : 100,
        attack_value : 60,
        attack_duration : 500,
        attack_type : AttackType.attack1B1,
        size : 80,
    },
    5 : {
        HP : 1500,
        moveSpeed: 0.5,
        attack_rang : 200,
        attack_value : 200,
        attack_duration : 4000,
        attack_type : AttackType.attackAll,
        size : 150,
    },
    6 : {
        HP : 2000,
        moveSpeed: 0.5,
        attack_rang : 100,
        attack_value : 100,
        attack_duration : 1500,
        attack_type : AttackType.attack1B1,
        size : 100,
    },
    7 : {
        HP : 2000,
        moveSpeed: 0.5,
        attack_rang : 100,
        attack_value : 100,
        attack_duration : 1500,
        attack_type : AttackType.attack1B1,
        size : 100,
    },
    8 : {
        HP : 2000,
        moveSpeed: 0.5,
        attack_rang : 100,
        attack_value : 100,
        attack_duration : 1500,
        attack_type : AttackType.attack1B1,
        size : 100,
    },
    9 : {
        HP : 2000,
        moveSpeed: 0.5,
        attack_rang : 100,
        attack_value : 100,
        attack_duration : 1500,
        attack_type : AttackType.attack1B1,
        size : 100,
    },
    10 : {
        HP : 2000,
        moveSpeed: 0.5,
        attack_rang : 100,
        attack_value : 100,
        attack_duration : 1500,
        attack_type : AttackType.attack1B1,
        size : 100,
    },
};

cc.Class({
    extends: cc.Component,
        
    properties: {
        box_label : {
            default : null,
            type: cc.Label
        },
        
        img1 : cc.Sprite,
        img2 : cc.Sprite,
        img3 : cc.Sprite,
        img4 : cc.Sprite,
        img5 : cc.Sprite,
        
        type : 0,
        moveSpeed: 1,
        team: null,
        _HP : 1000,
        attack_rang : 200,
        attack_value : 100,
        attack_duration : 2000,
        attack_type : AttackType.attack1B1,
        size : 100,
        
        _state : State.Move,
        _speedX : 0,
        _left : false,
        _right : false,
        _enemys : [],
        _interval : [],
    },
    
    // use this for initialization
    onLoad: function () {
        this._unitID = unit_index;
        unit_index++;
    },
    
    setUnit : function(arr){
        
        this.team = arr.team;
        this.type = arr.type;
        
        this._state = State.Move;
        
        //initPosition
        let x = ( arr.team == "A" )? 40:920;
        this.node.position =  cc.p(x ,10);
        
        //set group
        this.node.group = (arr.team == "B")?"unitB":"unitA";
        
        //set move direction 
        this._left = (arr.team == "B")?true:false;
        this._right = (arr.team == "A")?true:false;
        
        //setType
        this.box_label.string = arr.type + this.team;
        
        //set unit basic value
        this._HP = unitType[this.type].HP;
        this.moveSpeed = unitType[this.type].moveSpeed;
        this.attack_rang= unitType[this.type].attack_rang;
        this.attack_value = unitType[this.type].attack_value;
        this.attack_duration = unitType[this.type].attack_duration;
        this.attack_type = unitType[this.type].attack_type;
        this.size = unitType[this.type].size;
        
        //set image and label
        if(arr.type == "2" ) {
            this.img2.node.active = true;
            this.img2.node.scale = this.size*2 /100;
            this.box_label.node.color = cc.color(255,255,255);
        }
        
        else if(arr.type == "3" ) {
            this.img3.node.active = true;
            this.img3.node.scale = this.size*2 /100;
            this.box_label.node.color = cc.color(255,255,255);
        }
        else if(arr.type == "4" ) {
            this.img4.node.active = true;
            this.img4.node.scale = this.size*2 / 100;
            this.box_label.node.color = cc.color(255,255,255);
        }
        else if(arr.type == "5" ) {
            this.img5.node.scale = this.size*2 / 100;
            this.img5.node.active = true;
            this.box_label.node.color = cc.color(255,255,255);
        }
        
        else if(Number(arr.type) > 5 ) {
            this.img1.node.scale = this.size*2 / 100;
            this.img1.node.active = true;
        }
        
        this.node._components[2].radius = this.size;
        this.node._components[3].radius = this.attack_rang;
        console.log(this.node._components[3].radius);
    },
    
    onBeginContact: function (contact, selfCollider, otherCollider) {

        if(otherCollider.node.name == "unit" 
        && otherCollider.sensor === false 
        && otherCollider.getComponent('unit').team != this.team){
            
            let enemy = otherCollider.getComponent('unit');
            this._enemys[enemy._unitID] = enemy;
            this.fight();
        }
        

        if(otherCollider.node.name == "house" 
        && otherCollider.sensor === false 
        && otherCollider.getComponent('house').team != this.team){
            
            let enemy = otherCollider.getComponent('house');
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
                if(enemy !== null ) numberOfEnemy++;
            });
            if (numberOfEnemy === 0){ 
                console.log(this.team,"fight End");
                this.fight_end();
            }
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
        this._state = State.Move;
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
        if(unit.getComponent('unit'))
            unit.getComponent('unit').be_attack(this.attack_value);
        else if(unit.getComponent('house'))
            unit.getComponent('house').be_attack(this.attack_value);
        
    },
    
    be_attack : function(value){
        
        if (this._HP > 0 ) this._HP -= value;
        else this.die();
    },

    move : function(dir) {
        this._speedX = dir;
    },
    
    touchGround : function(){
        this.die();
    },
    
    die : function(){
        console.log(this._unitID,"die");
        for(var item in this._interval) {
				clearInterval(this._interval[item]);
		}
		this._interval = [];
        D.unitManager.despawnUnit(this);
        
        if(this.team === "B") D.scoreManager.score_add(this.type);
    },
    
    update: function (dt) {
        this._updatePosition();
        this._updateMove();
        this.node.opacity = this._HP/unitType[this.type].HP*255
    },
    
    _updateMove : function () {
        if(this._state == State.Move){
            if (this._left) {
                this.move(-1*this.moveSpeed);
            } else if (this._right) {
                this.move(this.moveSpeed);
            } 
        }else{
            this.move(0);
        }
    },
    
    _updatePosition : function() {
        if (this._speedX !== 0) {
            this.node.x += this._speedX;
        }
    },
    
});
