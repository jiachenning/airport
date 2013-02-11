Ext.define('security.view.account.AccountGrid2', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.accountgrid2',

    title: '用户账号',

    initComponent: function(arguments) {
        
        var me = this,
        	store = Ext.create('security.store.AccountStore');

        Ext.applyIf(me, {
            store: store,
            columnLines: true,
            columns: [{
                xtype: 'rownumberer'
            },{
                text: '登录名',
                dataIndex: 'loginName',
                width: 150
            },{
                xtype: 'booleancolumn',
                text: '是否启用',
                trueText: '是',
                falseText: '否',
                dataIndex: 'enabled',
                flex: 1
            }],
            dockedItems: [{
                xtype: 'toolbar',
                items: [{
                    text: '添加',
                    tooltip: '添加'
                }]
            }]
        });

        me.callParent(arguments);
    }

});
            
