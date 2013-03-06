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

addTabCmp = function(className, title) {
	
	var tabs = security.getApplication().getTabs(),
		tab = tabs.child(Ext.String.format('panel[title="{0}"]', title));
		
	if (!tab) {
		tab = tabs.add(Ext.create(className, {
			title: title,
			closable: true,
			searchable: true,
            operable: true,
            pagable: true,
            hasToolbar: true
		}));
	}
	
	tabs.setActiveTab(tab);
};

Ext.Ajax.on('requestexception', function(conn, response, options, eOpts) {
	Ext.example.msg('系统异常', response.responseText);
});

Ext.application({
    
    refs: [{
        ref: 'tabs',
        selector: 'tabpanel'
    }],

    controllers: [
        'UserAccountManager',
        'RoleController',
        'GroupController',
        'AuthorityController'
    ],
    
    name: 'security',
    paths: {'Ext.ux': 'extjs/ux'},
    autoCreateViewport: true
});
