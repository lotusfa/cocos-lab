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
        
        this.selected_ball = [];
        
        for (var i = 0; i < this.load_Box ; i++) { 
            this.ball_span_new( this.node.width/2 ,this.node.height);
        }
        
        this.node.on('touchstart', function (event) {
            this.ball_get_touched(event,function(ball){
                self.ball_select(ball);
            });
        }, this);
            

        this.node.on('touchmove', function (event) {
            this.ball_get_touched(event,function(ball){
                self.ball_select(ball);
            });
        }, this);
        
        this.node.on('touchend', function (event) {
            if(this.selected_balls_check_10()){
                this.selected_balls_kill_all();
            }
            self.selected_ball_clear();
        }, this);
        
        this.node.on('touchcancel', function (event) {
            self.selected_ball_clear();
        }, this);
        
    },
    
    selected_balls_check_10 : function(){
        let sum = 0;
        this.selected_ball.forEach(function(ball) {
            sum += ball.getComponent('box').value;
        });
        return (sum == 10);
    },
    
    selected_balls_kill_all : function(){
        let self = this;
        this.selected_ball.forEach(function(ball) {
            self.ball_kill(ball);
        });
    },
    
    //to push ball to selected ball list 
    ball_select : function (ball){
        
        if(!containsObject(ball, this.selected_ball)){
            this.selected_ball.push(ball);
            ball.getComponent('box').onSelected();
        }
        
        //to check obj is in array/list
        function containsObject(obj, list) {
            var i;
            for (i = 0; i < list.length; i++) 
                if (list[i] === obj)  return true;
            return false;
        }
    },
    
    selected_ball_clear : function () {
        let self = this;
        this.selected_ball.forEach(function(ball) {
             ball.getComponent('box').offSelected();
        });
        this.selected_ball = [];
    },
    
    ball_for_each : function(callback){
        this.zeroNode._children.forEach(function(element) {
            callback(element);
        });
    },
    
    ball_check_dist : function(ballObj,touch_event,callback){
        var dist = cc.pDistance(touch_event.getLocation(), ballObj.position);
        if(dist < ballObj.height/2 ){
            callback(ballObj);
        }
    },
    
    ball_get_touched : function(touch_event,callback){
        let self = this;
        self.ball_for_each(function(element){
            self.ball_check_dist(element,touch_event,function(ballObj){
                callback(ballObj);
            });
        });
    },
    
    ball_kill : function (ball){
        this.ballPool.put(ball);
        this.ball_span_new( this.node.width/2 ,this.node.height);
    },
        
    ball_span_new: function(x,y) {
        
        let newBox = null;
        
        if(this.ballPool.size() > 0){
            
            newBox = this.ballPool.get();
            
            newBox.getComponent('box').onLoad();
            
        }else newBox = cc.instantiate(this.boxPrefab);
        
        this.zeroNode.addChild(newBox);
        
        newBox.setPosition(cc.p(x,y));
    },
    
    update: function (dt) {
        
    },
});
