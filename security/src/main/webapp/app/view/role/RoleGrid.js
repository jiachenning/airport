Ext.define('security.view.role.RoleGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.rolegrid',
    requires: ['Ext.ux.form.SearchField'],
    uses: ['security.store.Role'],

    title: '用户角色',
    columnLines: true,

    initComponent: function(arguments) {

        var me = this,
            store = me.store,
            storeConfig = me.storeConfig || {};

        
        if (!store) {
            store = Ext.create('security.store.Role', storeConfig);
            me.store = store;
        }

        me.columns = me.getGridColumns();
        me.dockedItems = me.getGridDockedItems();

        me.callParent(arguments);
    },

    getGridColumns: function() {

        var columns = [{
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
        
        var me = this,
            dockedItems = me.dockedItems || []; 

        if (dockedItems.length == 0) {

            var toolItems = [{
                xtype: 'searchfield',
                paramName: 'search_code_like',
                width: 200,
                store: this.store
            }];

            if (this.operable) {
                toolItems.push(
                    '-', 
                    {text: '添加', tooltip: '添加'}, 
                    '-', 
                    {text: '维护帐号角色', tooltip: '维护帐号角色'}
                );
            }

            if (this.searchable) {
                dockedItems.push({
                    xtype: 'toolbar',
                    items: toolItems
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
        }

        return dockedItems;
    }

});
