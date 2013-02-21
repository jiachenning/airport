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
                text: '名称',
                dataIndex: 'name'
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
                    xtype: 'searchfield',
                    width: 200,
                    store: Ext.StoreMgr.lookup('Role')
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
