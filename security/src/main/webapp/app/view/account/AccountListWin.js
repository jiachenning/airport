Ext.define('security.view.account.AccountListWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.accountlistwin',
    requires: ['security.view.account.AccountGrid'],

    id: 'accountlistwin',
    title: '帐户列表',
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
                xtype: 'accountgrid',
                preventHeader: true,
                searchable: true,
                selectable: true,
                pagable: true
            },
            buttonAlign: 'center',
            buttons: [{
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
