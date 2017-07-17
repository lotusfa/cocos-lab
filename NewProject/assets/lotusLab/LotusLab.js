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
        
        load_Box: 50,
    },

    // use this for initialization
    onLoad: function () {
        let self = this;
        
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enable = true;
        
        this.ballPool = new cc.NodePool();
        
        for (var i = 0; i < this.load_Box ; i++) { 
            this.spawnNewBox( this.node.width/2 ,this.node.height);
        }
        
        function check_all_ball_find_kill(event){
            self.zeroNode._children.forEach(function(element) {
                checkDist_then_kill(element,event);
            });
        }
        
        function checkDist_then_kill(element,event){
            var dist = cc.pDistance(event.getLocation(), element.position);
            if(dist < element.height/2 ){
                kill_ball(element);
            }
        }
        
        function kill_ball(ball){
            self.ballPool.put(ball);
            self.spawnNewBox( self.node.width/2 ,self.node.height);
        }
        
        this.node.on('touchstart', function (event) {
            check_all_ball_find_kill(event);
        }, this);
        
        this.node.on('touchmove', function (event) {
            check_all_ball_find_kill(event);
        }, this);
        
        this.node.on('touchend', function (event) {
        }, this);
        
        this.node.on('touchcancel', function (event) {
        }, this);
        
        
        
        this.node.on('killMe', function (event) {
            self.ballPool.put(event.target);
            event.stopPropagation();
            self.spawnNewBox( self.node.width/2 ,self.node.height);
        });
        
    },
    
    spawnNewBox: function(x,y) {
        let newBox = null;
        if(this.ballPool.size() > 0){
            newBox = this.ballPool.get();
        }else{
            newBox = cc.instantiate(this.boxPrefab);
        }
        
        this.zeroNode.addChild(newBox);
        newBox.setPosition(cc.p(x,y));
    },
    
    update: function (dt) {
        
    },
});
