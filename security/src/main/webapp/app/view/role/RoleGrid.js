Ext.define('security.view.role.RoleGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.rolegrid',
    requires: [
        'Ext.ux.form.SearchField'
    ],

    title: '用户角色',

    initComponent: function(arguments) {

        var me = this;
        
        Ext.applyIf(me, {
            store: 'Role',
            columnLines: 'true',
            columns: [{
                xtype: 'rownumberer'
            },{
                text: '代码',
                dataIndex: 'code',
                width: 150
            },{
                text: '名称',
                dataIndex: 'name',
                width: 150
            },{
                xtype: 'booleancolumn',
                text: '是否启用',
                trueText: '是',
                falseText: '否',
                width: 150,
                dataIndex: 'enabled'
            },{
                text: '描述',
                dataIndex: 'description',
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
                    xtype: 'searchfield',
                    paramName: 'search_code_like',
                    width: 200,
                    store: Ext.StoreMgr.lookup('Role')
                },'-',{
                    text: '添加',
                    tooltip: '添加'
                },'-', {
                    text: '维护帐号角色',
                    tooltip: '维护帐号角色'
                }]
            },{
                xtype: 'pagingtoolbar',
                displayInfo: true,
                store: 'Role',
                dock: 'bottom'
            }]
        });

        me.callParent(arguments);
    }

});
