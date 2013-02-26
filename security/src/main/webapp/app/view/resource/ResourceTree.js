Ext.define('security.view.resource.ResourceTree', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.resourcetree',
    requires: [
        'security.view.account.AccountGrid',
        'security.view.role.RoleGrid'
    ],

    title: '维护资源树',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    bodyPadding: 1,

    initComponent: function(arguments) {

        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'accountgrid',
                flex: 2
            },{
                xtype: 'splitter',
                defaultSplitMin: 100,
                collapsible: true
            },{
                xtype: 'rolegrid',
                flex: 3
            }]
        });

        me.callParent(arguments);
    }
});
