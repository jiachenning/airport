Ext.define('security.view.role.RoleListWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.rolelistwin',
    requires: ['security.view.role.RoleGrid'],

    id: 'rolelistwin',
    title: '角色列表',
    modal: true,
    width: 600,
    height: 350,
    constrainHeader: true,
    closeAction: 'hide',
    layout: 'fit',

    initComponent: function(arguments) {

        var me = this;

        Ext.applyIf(me, {
            items: {
                xtype: 'rolegrid',
                preventHeader: true,
                searchable: true,
                selectable: true,
                pagable: true
            },
            buttonAlign: 'center',
            buttons: [{
                text: '确定',
                tooltip: '确定',
                icon: 'icons/accept.png'
            },{
                text: '关闭',
                tooltip: '关闭',
                icon: 'icons/cancel.png',
                scope: this,
                handler: function() {
                    this.hide();
                }
            }]
        });

        me.callParent(arguments);
    }

});
