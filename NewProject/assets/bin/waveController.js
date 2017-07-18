cc.Class({
    extends: cc.Component,

    properties: {
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
        setTimeout(function() {
            self.ball_span_new(self.node.position);
        }, 5000);
    },
    
    ball_span_new: function(p) {
        
        let newBox = null;
        
        if(this.ballPool.size() > 0){
            
            newBox = this.ballPool.get();
            
            newBox.getComponent('box').onLoad();
            
        }else newBox = cc.instantiate(this.boxPrefab);
        
        this.zeroNode.addChild(newBox);
        
        newBox.setPosition(p);
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
