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
        //this.waveController(2,2000);
        this.wave = 1;
        
        D.unitManager.spawnHouse({ team : "A", HP : 25000});
        
        D.unitManager.spawnHouse({ team : "B", HP : 50000});
        
        // D.unitManager.spawnUnit(6,"B");
        // D.unitManager.spawnUnit(6,"B");
        // D.unitManager.spawnUnit(6,"B");
        // D.unitManager.spawnUnit(7,"A");
        // D.unitManager.spawnUnit(5,"A");
        this.waveController(3, 1000);
    },
    
    stopWave () {
        clearTimeout(this.t);
    },
    
    waveController : function(num,time){
        let self = this;
        this.t = setTimeout(function() {
            D.unitManager.spawnUnit(num,"B");
            // D.unitManager.spawnUnit(num,"A");
            let level_index = self.wave/2;
            if (level_index >= 3) level_index = 3;
            let n = Math.round(Math.random()*level_index)+2;
            let baseTime = 1000*Math.random();
            let t = 7000*Math.random()/self.wave + baseTime + 1000;
            self.waveController(n,t);
        }, time);
    },
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.wave_Label.getComponent("cc.Label").string = this.wave.toString();
    },
});
