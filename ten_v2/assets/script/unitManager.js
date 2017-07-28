cc.Class({ 
    extends: cc.Component,
    properties: {
        unitPrefab: cc.Prefab,
        house_A: cc.Node,
        house_B: cc.Node,
    },
    onLoad () {
        D.unitManager = this;
        this.units = [];
    },
    
    init () {
        this.clear_all ();
        
        this.node.on('touchstart',  (event) => {
            this.spawnUnit ("2", "B" );
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
        
        this.house_A.getComponent('house').resetHouse();
        this.house_B.getComponent('house').resetHouse();
        
        this.units = [];
    },
    
    spawnUnit (str, team = "A" ) {
        let unit = null;
        
        if (cc.pool.hasObject("unit"))    unit = cc.pool.getFromPool("unit");
        else     unit = cc.instantiate(this.unitPrefab).getComponent('unit');
        
        let arr = {'team':team,'type':str};
        unit.setUnit(arr);
        
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
