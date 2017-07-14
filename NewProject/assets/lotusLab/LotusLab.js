cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        zeroNode: {
            default: null,
            type: cc.Node
        },
        
        boxPrefab: {
            default: null,
            type: cc.Prefab
        },
        
        load_Box: 50
    },

    // use this for initialization
    onLoad: function () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enable = true;
        
        for (var i = 0; i < this.load_Box ; i++) { 
            
            
            this.spawnNewBox( this.node.width/2 ,this.node.height);
        }
        
        this.node.on('touchstart', function (event) {
          this.spawnNewBox(event.getLocationX(),event.getLocationY());
        }, this);
        
        
    },
    
    spawnNewBox: function(x,y) {
        
        var newBox = cc.instantiate(this.boxPrefab);
        
        this.zeroNode.addChild(newBox);
        
        newBox.setPosition(cc.p(x,y));
    },
    
    
    


    update: function (dt) {
        
    },
});
