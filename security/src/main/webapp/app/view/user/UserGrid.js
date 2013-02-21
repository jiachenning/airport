Ext.define('security.view.user.UserGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.usergrid',
    requires: [
        'Ext.ux.form.SearchField',
        'security.view.user.UserWin'
    ],

    title: '用户通信录',
    store: 'User',
    columnLines: true,

    initComponent: function(arguments) {
        
        var me = this;

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
                    width: 200,
                    store: Ext.StoreMgr.lookup('User')
                },'-',{
                    text: '添加',
                    tooltip: '添加'
                },'-',{
                    text: '维护用户账号',
                    tooltip: '维护用户账号'
                }]
            });
        }
        
        if (this.pagable) {
            dockedItems.push({
                xtype: 'pagingtoolbar',
                store: 'User',
                displayInfo: true,
                dock: 'bottom'
            });
        }

        return dockedItems;
    }

});
            
