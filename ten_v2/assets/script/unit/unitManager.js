cc.Class({ 
    extends: cc.Component,
    properties: {
        soldierPrefab: cc.Prefab,
        housePrefab: cc.Prefab,
        bulletPrefab: cc.Prefab,
        unit_index : 0,
    },
    onLoad () {
        D.unitManager = this;
        this.units = [];
    },
    
    init () {
        this.clear_all ();
        
        this.unit_index = 10;
        
        this.node.on('touchstart',  (event) => {
            this.spawnUnit ("2", "B" );
            //this.spawnBullet(null,event.getLocation().x,event.getLocation().y);
        }, this);

        this.node.on('touchmove',  (event)=>  {
        }, this);
        
        this.node.on('touchend',  (event)=>  {
        }, this);
        
        this.node.on('touchcancel',  (event)=>  {
        }, this);
    },

    clear_all () {
        this.units.forEach( (unitObj)=>{
            if(unitObj.node.active === true){
                unitObj.getComponent('unit').die();
            }
        });
        this.units = [];
    },
    
    spawnHouse (arr = null) {
        let house = null;
        
        if (cc.pool.hasObject("house"))    house = cc.pool.getFromPool("house");
        else house = cc.instantiate(this.housePrefab).getComponent('house');
        
        house.setHouse(arr);
        
        this.units.push(house);
        this.node.addChild(house.node);
        house.node.active = true;
        
    },
    
    spawnBullet (arr = null,x = 500,y = 100) {
        let bullet = null;
        
        if (cc.pool.hasObject("bullet"))    unit = cc.pool.getFromPool("bullet");
        else     bullet = cc.instantiate(this.bulletPrefab).getComponent('bullet');
        
        //let arr = {'team':team,'type':str};
        if (arr !== null) bullet.setBullet(arr);
        else bullet.setBullet();
        bullet.setPosition(x,y);
        this.units.push(bullet);
        this.node.addChild(bullet.node);
        bullet.node.active = true;
        
    },
    
    spawnUnit (str, team = "A" , x = null) {
        let unit = null;
        
        if (cc.pool.hasObject("soldier"))    unit = cc.pool.getFromPool("soldier");
        else     unit = cc.instantiate(this.soldierPrefab).getComponent('soldier');
        
        let arr = {'team':team,'type':str};
        unit.setSoldier(arr);
        if(x != null ) { unit.setPosition(x); }
        this.units.push(unit);
        this.node.addChild(unit.node);
        unit.node.active = true;
        
    },
    
    despawnUnit (unit) {
        unit.node.removeFromParent();
        unit.node.active = false;
        cc.pool.putInPool(unit);
    },
    
});
