Ext.define('security.view.authority.AuthorityAccountWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.authority-account-win',
    requires: ['security.view.authority.AuthorityCheckedTree'],
    title: '账号授权',
    modal: true,
    constrainHeader: true,
    plain: true,
    bodyPadding: 1,
    closeAction: 'hide',
    width: 400,
    height: 500,
    layout: 'fit',
    
    initComponent: function() {
        
        var me = this,
        	record = me.record; 
        
        Ext.applyIf(me, {
            items: [{
                xtype: 'authority-checked-tree'
            }],
            buttonAlign: 'center',
            buttons: [{
                text: '授权',
                tooltip: '授权'
            },{
                text: '重置',
                handler: function() {
                	var root = me.child('authority-checked-tree').getRootNode();
	          		root.cascadeBy(function(node){
	    				node.set('checked', false);
	    			});
                }
            }]
        });
        me.callParent(arguments);
    }

});
