Ext.define('security.view.user.UserTab', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.usertab',
    requires: [
        'security.view.user.UserGrid', 
        'security.view.account.AccountGrid'
    ],
    
    title: '用户通信录维护',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    bodyPadding: 1,
    
    initComponent: function(arguments) {
        
        var me = this;
        
        Ext.applyIf(me, {
            items: [{
                xtype: 'usergrid',
                operable: true,
                pagable: true,
                hasToolbar: true,
                flex: 2
            },{
                xtype: 'splitter',
                defaultSplitMin: 100,
                collapsible: true
            },{
                xtype: 'accountgrid',
                flex: 1
            }]
        });
        
        me.callParent(arguments);
    }
    
});
