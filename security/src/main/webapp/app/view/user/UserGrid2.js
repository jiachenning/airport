Ext.define('security.view.user.UserGrid2', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.usergrid2',
    requires: ['Ext.ux.form.SearchField'],

    title: '用户通信录',

    initComponent: function(arguments) {
        
        var me = this,
        	store = Ext.create('security.store.UserStore');

        Ext.applyIf(me, {
            store: store,
            columnLines: true,
            columns: [{
                xtype: 'rownumberer'
            },{
                text: '用户名',
                dataIndex: 'username'
            },{
                text: '年龄',
                dataIndex: 'age'
            },{
                xtype: 'datecolumn',
                text: '出生年月',
                dataIndex: 'birthday',
                format: 'Y-m-d'
            },{
                text: '用户类型',
                dataIndex: 'userType',
                flex: 1
            }],
            dockedItems: [{
                xtype: 'toolbar',
                items: [{
                    xtype: 'searchfield',
                    paramName: 'search_username_like',
                    width: 200,
                    store: store
                }]
            },{
                xtype: 'pagingtoolbar',
                store: store,
                displayInfo: true,
                dock: 'bottom'
            }]
        });

        me.callParent(arguments);
    }

});
            
