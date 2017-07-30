var State = cc.Enum({
    Move: -1,
    Fight : -1
});

let AttackType = cc.Enum({
    attack1B1 : -1,
    attackAll : -1,
    fireBullet : -1,
    spanSoldier : -1,
});

cc.Class({
    extends: cc.Component,
        
    properties: {
        
        type : 0,
        moveSpeed: 1,
        _team: null,
        _HP : 1000,
        _attack_rang : 200,
        _attack_value : 100,
        _attack_duration : 2000,
        _attack_type : AttackType.attack1B1,
        _size : 100,
        _type : 4,
        _state : State.Move,
        _speedX : 0,
        _left : false,
        _right : false,
        _enemys : [],
        _interval : [],
    },
    
    setUnit : function(arr){
        this._unitID = D.unitManager.unit_index;
        D.unitManager.unit_index++;
        
        //set unit basic value
        this._team = arr.team;
        this._HP = arr.HP;
        this.moveSpeed = arr.moveSpeed;
        this._attack_rang= arr.attack_rang;
        this._attack_value = arr.attack_value;
        this._attack_duration = arr.attack_duration;
        this._attack_type = arr.attack_type;
        this._size = arr.size;
        
        this._state = State.Move;
        
        //initPosition
        let x = ( arr.team == "A" )? 40:920;
        this.node.position =  cc.p(x ,10);
        
        //set group
        if (!this.getComponent('bullet')) this.node.group = (arr.team == "B")?"unitB":"unitA";
        else this.node.group = (arr.team == "B")?"bulletB":"bulletA";
        
        //set move direction 
        this._left = (arr.team == "B")?true:false;
        this._right = (arr.team == "A")?true:false;
        
        this.node._components[3].radius = this._attack_rang;
    },
    
    setPosition : function (x,y = 10 ){
        this.node.position =  cc.p(x,y);
    },
    
    onBeginContact: function (contact, selfCollider, otherCollider) {
        if(this._checkEnemy(otherCollider)){
            let enemy = otherCollider.getComponent('unit');
            this._enemys[enemy._unitID] = enemy;
            this.fight();
        }
    },
    
    onEndContact: function (contact, selfCollider, otherCollider) {
        if(this._checkEnemy(otherCollider)){
            let enemy = otherCollider.getComponent('unit');
            this._enemys[enemy._unitID] = null;
            
            let numberOfEnemy = 0;
            this._enemys.forEach((enemy)=>{
                if(enemy !== null ) numberOfEnemy++;
            });
            if (numberOfEnemy === 0){ 
                console.log(this._team,"fight End");
                this.fight_end();
            }
        }
    },
    
    _checkEnemy: function(otherCollider){
        return (otherCollider.getComponent('unit') 
        && !otherCollider.getComponent('bullet') 
        && otherCollider.sensor === false 
        && otherCollider.getComponent('unit')._team != this._team );
    },
    
    fight : function(){
        this._state = State.Fight;
        
        if(!this._interval.fightt){
            if(this._attack_type == AttackType.attack1B1 ){ this.attackOneByOne(); }
            else if(this._attack_type == AttackType.attackAll ){ this.attackAll(); }
            else if(this._attack_type == AttackType.fireBullet ){ this.fireBullet(); }
            else if(this._attack_type == AttackType.spanSoldier ){ this.spanSoldier(); }
        }
    },
    
    fight_end : function(){
        this._state = State.Move;
        clearInterval(this._interval.fightt);
        this._interval.fightt = false;
    },
    
    attack : function(unit){
        if(unit.getComponent('unit'))
            unit.getComponent('unit').be_attack(this._attack_value);
    },
    
    fireBullet : function(){
        
        this._interval.fightt = setInterval( ()=>{ 
            D.unitManager.spawnBullet ({ 
                type : this._type, 
                team : this._team
        } ,this.node.x,10);
        }, this._attack_duration);
    },
    
    spanSoldier : function (num = 6.5 ,t = this._team , x = this.node.x ){
        this._interval.fightt = setInterval( ()=>{ 
            D.unitManager.spawnUnit (num,t,x);
        }, this._attack_duration);
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
        }, this._attack_duration);
    },
    
    attackAll : function(){
        this._interval.fightt = setInterval( ()=>{ 
            this._enemys.forEach((enemy)=>{
                if(enemy !== null ){
                    this.attack(enemy);
                    console.log(this._unitID,"->",enemy._unitID," which have ", enemy._HP);
                }
            });
        }, this._attack_duration);
    },
    
    be_attack : function(value){
        if (this._HP > 0 ) {
            this._HP -= value; 
            if (this._HP <= 0) {this.die();this._HP = 0}
        }
    },
    
    move : function(dir) {
        this._speedX = dir;
    },
    
    touchGround : function(){
        this.die();
    },
    
    die : function(){
        this._die();
    },
    
    _die : function(){
        for(var item in this._interval) {
				clearInterval(this._interval[item]);
		}
		this._interval = [];
        D.unitManager.despawnUnit(this);
    },
    
    update: function (dt) {
        this._updateMove();
    },
    
    _updateMove : function () {
        //console.log(this._state ,this._left, this._right, this._speedX, this._team);
        if(this._state == State.Move){
            if (this._left) {
                this.move(-1*this.moveSpeed);
            } else if (this._right) {
                this.move(this.moveSpeed);
            } 
        }else{
            this.move(0);
        }
        
        if (this._speedX !== 0) {
            this.node.x += this._speedX;
        }
    },
    
});
