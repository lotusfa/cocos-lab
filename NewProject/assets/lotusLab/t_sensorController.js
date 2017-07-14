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
        
        touchObjs : []
    },

    // use this for initialization
    onLoad: function () {
        this.touchObjs = [];
    },
    
   onBeginContact: function (contact, selfCollider, otherCollider) {
       this.touch(otherCollider);
    },

    onEndContact: function (contact, selfCollider, otherCollider) {
        this.touch(otherCollider);
    },
    
    touch: function(otherCollider){
        console.log(otherCollider.getComponent('box').value);
    }

    // // 每次将要处理碰撞体接触逻辑时被调用
    // onPreSolve: function (contact, selfCollider, otherCollider) {
    //     console.log("p");
    // },

    // // 每次处理完碰撞体接触逻辑时被调用
    // onPostSolve: function (contact, selfCollider, otherCollider) {
    //     console.log("s");
    // }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
