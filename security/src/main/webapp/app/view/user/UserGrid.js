Ext.define('security.view.user.UserGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.usergrid',
    requires: [
        'Ext.ux.form.SearchField',
        'Ext.ux.SlidingPager'
    ],

    title: '用户通信录',

    initComponent: function(arguments) {
        
        var me = this;

        Ext.applyIf(me, {
            store: 'UserStore',
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
            },{
                xtype: 'actioncolumn',
                text: '操作',
                align: 'center',
                width: 50,
                items: [{
                    icon: 'images/cog_edit.png',
                    tooltip: '编辑1'
                },{
                    icon: 'images/delete.gif',
                    tooltip: '删除'
                }]
            }],
            dockedItems: [{
                xtype: 'toolbar',
                items: [{
                    xtype: 'searchfield',
                    paramName: 'search_username_like',
                    width: 200,
                    store: Ext.StoreMgr.lookup('UserStore')
                },'-',{
                    text: '添加',
                    tooltip: '添加'
                },'-',{
                    text: '维护用户账号',
                    tooltip: '维护用户账号'
                }]
            },{
                xtype: 'pagingtoolbar',
                store: 'UserStore',
                displayInfo: true,
                dock: 'bottom',
                plugins: Ext.create('Ext.ux.SlidingPager', {})
            }]
        });

        me.callParent(arguments);
    }

});
            
