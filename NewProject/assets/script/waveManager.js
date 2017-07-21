cc.Class({
    extends: cc.Component,
    properties: {
        wave: 1,
        wave_Label: cc.Label,
    },

    // use this for initialization
    onLoad: function () {
        D.waveManager = this;
    },
    
    startWave () {
        this.waveController(1,2000);
    },
    
    stopWave () {
        clearTimeout(this.t);
    },
    
    waveController : function(num,time){
        let self = this;
        this.t = setTimeout(function() {
             D.ballManager.ball_drop(num);
            let n = Math.round(Math.random()*self.wave)+1;
            let baseTime = 5000*Math.random();
            let t = 7000*Math.random()/self.wave + baseTime + 2000;
            self.waveController(n,t);
        }, time);
    },
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.wave_Label.getComponent("cc.Label").string = 'Wave: ' + this.wave.toString();
    },
});
