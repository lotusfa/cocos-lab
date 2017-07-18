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
        
        init_Ball: 50,
        
        wave_label : {
            default: null,
            type: cc.Label
        },
        
        sore_label : {
            default: null,
            type: cc.Label
        },
        
        life_label : {
            default: null,
            type: cc.Label
        },
        
        score : 0 ,
        
        wave: 1,
        
        life: 50,
    },

    // use this for initialization
    onLoad: function () {
        let self = this;

        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enable = true;
        
        this.ballPool = new cc.NodePool();
        this.selected_ball = [];
        
        //init ball
        this.ball_drop(this.init_Ball);
        
        //waveStart
        this.waveController(1,2000);
        
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
        
        this.node.on('touchGround', function (event) {
            event.stopPropagation();
            self.ball_kill(event.target);
            self.life--;
        });
        
    },
    
    waveController : function(num,time){
        let self = this;
        setTimeout(function() {
            self.ball_drop(num);
            let n = Math.round(Math.random()*self.wave)+1;
            let baseTime = 5000*Math.random();
            let t = 7000*Math.random()/self.wave + baseTime + 2000;
            self.waveController(n,t);
        }, time);
    },
    
    ball_drop : function(num){
        for (var i = 0; i < num ; i++) { 
            this.ball_span_new( this.node.width/2 ,this.node.height);
        }
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
            self.score_add(100);
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
        
        if( this.zeroNode._children.length < 6 ){
            this.bonus_ball_ls_5();
        }
    },
    
    bonus_ball_ls_5: function(){
        this.score_add(1000);
        this.ball_drop(10);
    },
    
    ball_span_new: function(x,y) {
        
        let newBox = null;
        console.log(this.ballPool.size());
        if(this.ballPool.size() > 0){
            
            newBox = this.ballPool.get();
            
            newBox.getComponent('box').onLoad();
            
        }else newBox = cc.instantiate(this.boxPrefab);
        
        this.zeroNode.addChild(newBox);
        
        newBox.setPosition(cc.p(x,y));
    },
    
    score_add: function(s){
        this.score += s;
        
        if(this.score >= this.score_next_level())
            this.wave++;
    },
    
    score_next_level : function(){
        return (Math.pow(this.wave,2))*300;
    },
    
    update: function (dt) {
        this.sore_label.string = 'Score: ' + this.score.toString() + "/" + this.score_next_level();
        this.wave_label.string = 'Wave: ' + this.wave.toString();
        this.life_label.string = 'HP: ' + this.life.toString();
    },
    
});
