Ext.define('security.view.account.AccountGrid2', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.accountgrid2',
    requires: ['security.view.account.AccountWin'],

    title: '用户账号',

    initComponent: function(arguments) {
        
        var me = this,
        	store = Ext.create('security.store.Account');

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
            },{
                xtype: 'actioncolumn',
                text: '操作',
                align: 'center',
                width: 50,
                items: [{
                    icon: 'images/cog_edit.png',
                    tooltip: '编辑'
                },{
                    icon: 'images/delete.gif',
                    tooltip: '删除'
                }]
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
            
