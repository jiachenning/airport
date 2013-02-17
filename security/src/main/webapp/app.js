Ext.example = function(){
    var msgCt;

    function createBox(t, s){
       return '<div class="msg"><h3>' + t + '</h3><p>' + s + '</p></div>';
    }
    return {
        msg : function(title, format){
            if(!msgCt){
                msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
            }
            var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
            var m = Ext.DomHelper.append(msgCt, createBox(title, s), true);
            m.hide();
            m.slideIn('t').ghost("t", { delay: 2000, remove: true});
        },

        init : function(){
            if(!msgCt){
                msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
            }
        }
    };
}();

Ext.onReady(Ext.example.init, Ext.example);

Ext.Ajax.on('requestexception', function(conn, response, options, eOpts) {
	Ext.example.msg('系统异常', response.responseText);
});

Ext.application({
    
    refs: [{
        ref: 'tabs',
        selector: 'tabpanel'
    }],

    controllers: ['UserController'],
    
    name: 'security',
    paths: {'Ext.ux': 'extjs/ux'},
    autoCreateViewport: true
});
