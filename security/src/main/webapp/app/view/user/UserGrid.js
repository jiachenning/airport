Ext.define('security.view.user.UserGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.usergrid',
    requires: ['Ext.ux.form.SearchField'],
    uses: ['security.store.User'],

    title: '用户通信录',
    columnLines: true,

    initComponent: function(arguments) {
        
        var me = this;
            
        me.store = Ext.create('security.store.User');

        me.columns = me.getGridColumns();
        me.dockedItems = me.getGridDockedItems();

        me.callParent(arguments);
    },

    getGridColumns: function() {

        var columns = [{
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

        if (this.hasToolbar) {
            dockedItems.push({
                xtype: 'toolbar',
                items: [{
                    xtype: 'searchfield',
                    paramName: 'search_username_like',
                    emptyText: '请输入一个用户名！',
                    width: 200,
                    store: this.store
                },'-',{
                    text: '添加',
                    tooltip: '添加'
                },'-',{
                    text: '维护用户账号',
                    tooltip: '维护用户账号'
                }]
            });
        }

//        if (this.searchable) {
//            dockedItems.push({
//                xtype: 'toolbar',
//                items: {
//                    xtype: 'searchfield',
//                    paramName: 'search_username_like',
//                    width: 200,
//                    store: this.store
//                }
//            });
//        }
        
        if (this.pagable) {
            dockedItems.push({
                xtype: 'pagingtoolbar',
                store: this.store,
                displayInfo: true,
                dock: 'bottom'
            });
        }

        return dockedItems;
    }

});
            
