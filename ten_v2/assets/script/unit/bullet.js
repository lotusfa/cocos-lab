let unit = require('unit');

let AttackType = cc.Enum({
    hit : -1,
    explode : -1
});
 
let bulletType  = {
    
};

cc.Class({
    extends: unit,
 
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
    },
    
    setBullet : function(arr = { type : 4 , team : "A" , moveSpeed : 4, attack_rang : 40, attack_value : 100, attack_type : AttackType.hit , size : 10 }){
        
        this._type = arr.type;
        
        this.setUnit({
            team : arr.team,
            HP : -99,
            moveSpeed: arr.moveSpeed,
            attack_rang : arr.attack_rang,
            attack_value : arr.attack_value,
            attack_duration : -99,
            attack_type : arr.attack_type,
            size : arr.size,
        });
        
        //set image and label
        if(arr.type == "4" ) {
            this.img4.node.active = true;
            this.img4.node.scale = this._size*2 / 100;
            this.box_label.node.scale = this._size*2 / 100;
            this.box_label.node.color = cc.color(255,255,255);
        }
        
        this.node._components[2].radius = this._size;
        this.box_label.string = arr.team;
    },
    
    onBeginContact: function (contact, selfCollider, otherCollider) {
        if(this._checkEnemy(otherCollider)){
            let enemy = otherCollider.getComponent('unit');
            this._enemys[enemy._unitID] = enemy;
        }
        
        if(this._checkEnemy(otherCollider) && selfCollider.sensor === false){
            this.fight();
        }
    },
    
    fight : function(){
        console.log("bullet fight ",this._team );
        if(this._attack_type == AttackType.hit ){ this.hit(); }
        else if(this._attack_type == AttackType.explode ){ this.explode(); }
    },
    
    hit : function (){
        let x = 0;
        this._enemys.forEach((enemy)=>{
            if(enemy !== null && x===0 ){
                this.attack(enemy);
                console.log("hit",enemy._unitID," which have ", enemy._HP);
                x++;
            }
        });
        
        this.die();
    },
    
    explode : function () {
        this._enemys.forEach((enemy)=>{
            if(enemy !== null){
                this.attack(enemy);
                console.log("explode",enemy._unitID," which have ", enemy._HP);
            }
        });
        
        this.die();
    },
    
    die : function(){
        this._die();
    },
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this._updateMove();
    },
});
