Ext.define('security.view.user.UserTab2', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.usertab2',
    requires: [
        'security.view.user.UserGrid2',
        'security.view.account.AccountGrid2'
    ],
    
    title: '用户帐号维护',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    bodyPadding: 1,
    
    initComponent: function(arguments) {
        
        var me = this;
        
        Ext.applyIf(me, {
            items: [{
                xtype: 'usergrid2',
                flex: 2
            },{
                xtype: 'splitter',
                defaultSplitMin: 100
            },{
                xtype: 'accountgrid2',
                flex: 3
            }]
        });
        
        me.callParent(arguments);
    }
});
