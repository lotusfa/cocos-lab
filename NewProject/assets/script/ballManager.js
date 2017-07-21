cc.Class({ 
    extends: cc.Component,
    properties: {
        ballPrefab: cc.Prefab,
        init_Ball: 20,
        //-- 创建ball需要的时间
        spawnInterval: 0
        
    },
    onLoad () {
        D.ballManager = this;
        this.balls = [];
        this.selected_ball = [];
    },
    
    init () {
        this.clear_all ();
        
        //this.schedule(this.spawnBall, this.spawnInterval);
        this.node.on('touchstart',  (event) => {
            this.touchOn(event);
        }, this);

        this.node.on('touchmove',  (event)=>  {
            this.touchOn(event);
        }, this);
        
        this.node.on('touchend',  (event)=>  {
            this.touchOff();
        }, this);
        
        this.node.on('touchcancel',  (event)=>  {
            this.touchOff();
        }, this);
        
        this.ball_drop (this.init_Ball);
    },

    ball_check_dist (ballObj,touch_event,callback) {
        var dist = cc.pDistance(touch_event.getLocation(), ballObj.position);
        if(dist < ballObj.height/2 ){
            callback(ballObj);
        }
    },
    
    touchOn (touch_event) {
        this.node._children.forEach( (ballObj)=>{
            var dist = cc.pDistance(touch_event.getLocation(), ballObj.position);

            if(dist < ballObj.height/2 ) 
                this.ball_select(ballObj);
        });
    },
    
    touchOff (touch_event) {
        let sum = 0;
        
        this.selected_ball.forEach((ball)=>{
            sum += ball.getComponent('ball').value;
        });
        
        if(sum == 10){
            this.selected_ball.forEach((ball)=>{
                D.scoreManager.score_add(1);
                ball.getComponent('ball').die();
                if(this.node._children.length < 5 ) this.ball_less_than_5 ();
            });
        }
        
        this.ball_unselect();
    },
    
    ball_less_than_5 () {
        D.scoreManager.score_add(10);
        this.ball_drop(10);
    },
    
    ball_select (ball) {
        
        if(!containsObject(ball, this.selected_ball)){
            this.selected_ball.push(ball);
            ball.getComponent('ball').onSelected();
        }
        
        //to check obj is in array/list
        function containsObject(obj, list) {
            var i;
            for (i = 0; i < list.length; i++) 
                if (list[i] === obj)  return true;
            return false;
        }
    },
    
    ball_unselect (){
        this.selected_ball.forEach((ball)=>{
            ball.getComponent('ball').offSelected();
        });
        
        this.selected_ball = [];
    },
    
    ball_drop (num) {
        for (var i = 0; i < num ; i++) { 
            this.spawnBall();
        }
    },
    
    clear_all () {
        this.balls.forEach( (ballObj)=>{
            if(ballObj.node.active == true){
                ballObj.getComponent('ball').die();
            }
        });
        this.balls = [];
    },
    
    //-- Add Ball
    spawnBall () {
        
        let ball = null;
        if (cc.pool.hasObject(ball))    ball = cc.pool.getFromPool(ball);
        else     ball = cc.instantiate(this.ballPrefab).getComponent('ball');
        
        this.balls.push(ball);
        
        this.node.addChild(ball.node);
        ball.node.active = true;
        ball.node.position = cc.p(this.node.width/2 ,this.node.height);
    },
    
    despawnBall (ball) {
        ball.node.removeFromParent();
        ball.node.active = false;
        cc.pool.putInPool(ball);
    },
    
});
