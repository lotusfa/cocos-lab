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
        this.waveController(2,2000);
        this.wave = 1;
    },
    
    stopWave () {
        clearTimeout(this.t);
    },
    
    waveController : function(num,time){
        let self = this;
        this.t = setTimeout(function() {
            D.unitManager.spawnUnit(num,"B");
            let level_index = self.wave/2;
            if (level_index >= 5) level_index = 5;
            let n = Math.round(Math.random()*level_index)+2;
            let baseTime = 2000*Math.random();
            let t = 5000*Math.random()/self.wave + baseTime + 2000;
            self.waveController(n,t);
        }, time);
    },
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.wave_Label.getComponent("cc.Label").string = this.wave.toString();
    },
});
