Ext.define('security.view.account.AccountGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.accountgrid',
    requires: ['Ext.ux.form.SearchField'],
    uses: ['security.store.Account'],

    title: '用户账号',
    columnLines: true,

    initComponent: function(arguments) {
        
        var me = this;
            store = me.store,
            storeConfig = me.storeConfig || {};

        if (!store) {
            store = Ext.create('security.store.Account', storeConfig);
            me.store = store;
        }

        me.columns = this.getGridColumns();
        me.dockedItems = this.getGridDockedItems();

        me.callParent(arguments);
    },

    getGridColumns: function() {

        var columns = [{
            xtype: 'rownumberer'
        },{
            text: '登录名',
            dataIndex: 'loginName'
        },{
            text: '所属机构',
            dataIndex: 'group.name'
        },{
            text: '密码',
            dataIndex: 'password',
            width: 150
        },{
            xtype: 'booleancolumn',
            text: '是否启用',
            trueText: '是',
            falseText: '否',
            dataIndex: 'enabled',
            flex: 1
        }];
        
        if (this.operable) {
            columns.push({
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
            });
        }

        return columns;
    },

    getGridDockedItems: function() {
        
        var dockedItems = [];

        if (this.searchable) {
            dockedItems.push({
                xtype: 'toolbar',
                items: {
                    xtype: 'searchfield',
                    paramName: 'search_loginName_like',
                    emptyText: '请输入一个登录名！',
                    width: 200,
                    store: this.store
                }
            });
        }

        if (this.pagable) {
            dockedItems.push({
                xtype: 'pagingtoolbar',
                displayInfo: true,
                store: this.store,
                dock: 'bottom'
            });
        }

        return dockedItems;
    }
    

});
            
