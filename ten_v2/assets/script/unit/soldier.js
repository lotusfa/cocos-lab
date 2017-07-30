let unit = require('unit');

let AttackType = cc.Enum({
    attack1B1 : -1,
    attackAll : -1,
    fireBullet : -1,
});
 
let unitType  = {
    2 : {
        HP : 500,
        moveSpeed: 1,
        attack_rang : 100,
        attack_value : 100,
        attack_duration : 1000,
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
        HP : 300,
        moveSpeed: 1.3,
        attack_rang : 300,
        attack_value : 50,
        attack_duration : 1500,
        attack_type : AttackType.fireBullet,
        size : 50,
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
        attack_rang : 500,
        attack_value : 100,
        attack_duration : 3000,
        attack_type : 3 ,
        size : 100,
    },
    6.5 : {
        HP : 100,
        moveSpeed: 1,
        attack_rang : 100,
        attack_value : 50,
        attack_duration : 1000,
        attack_type : AttackType.attack1B1,
        size : 30,
    },
    7 : {
        HP : 500,
        moveSpeed: 2.5,
        attack_rang : 100,
        attack_value : 60,
        attack_duration : 500,
        attack_type : AttackType.attack1B1,
        size : 80,
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
        img6 : cc.Sprite,
    },
    setSoldier : function(arr){
     
        this._type = arr.type;
        
        let unitValue = {
            team : arr.team,
            HP : unitType[arr.type].HP,
            moveSpeed: unitType[arr.type].moveSpeed,
            attack_rang : unitType[arr.type].attack_rang,
            attack_value : unitType[arr.type].attack_value,
            attack_duration : unitType[arr.type].attack_duration,
            attack_type : unitType[arr.type].attack_type,
            size : unitType[arr.type].size,
        };
        
        this.setUnit(unitValue);
        
        //set image and label
        if(arr.type == "2" ) {
            this.img2.node.active = true;
            this.img2.node.scale = this._size*2 /100;
            this.box_label.node.color = cc.color(255,255,255);
        }
        
        else if(arr.type == "3" ) {
            this.img3.node.active = true;
            this.img3.node.scale = this._size*2 /100;
            this.box_label.node.color = cc.color(255,255,255);
        }
        else if(arr.type == "4" ) {
            this.img4.node.active = true;
            this.img4.node.scale = this._size*2 / 100;
            this.box_label.node.color = cc.color(255,255,255);
        }
        else if(arr.type == "5" ) {
            this.img5.node.scale = this._size*2 / 100;
            this.img5.node.active = true;
            this.box_label.node.color = cc.color(255,255,255);
        }
        else if(arr.type == "6" ||  arr.type == "6.5" ) {
            this.img6.node.scale = this._size*2 / 100;
            this.img6.node.active = true;
            this.box_label.node.color = cc.color(255,255,255);
        }
        
        else if(Number(arr.type) > 6.5 ) {
            this.img1.node.scale = this._size*2 / 100;
            this.img1.node.active = true;
        }
        
        this.box_label.node.scale = this._size*2 / 100;
        
        this.node._components[2].radius = this._size;
        this.box_label.string = arr.team;
        
        //initPosition
        let x = ( arr.team == "A" )? 40:920;
        this.setPosition(x);
    },
    
    die : function(){
        this._die();
        if(this._team === "B") D.scoreManager.score_add(this._type);
    },
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this._updateMove();
        this.node.opacity = this._HP/unitType[this._type].HP*255;
    },
});
