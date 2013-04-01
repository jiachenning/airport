Ext.define('security.view.group.RootGroupGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.rootgroupgrid',
    requires: ['Ext.ux.form.SearchField'],
    uses: ['security.store.RootGroup'],
    title: '组织部门列表',
    columnLines: true,
    
    initComponent: function (arguments) {
        var me = this;
        me.store = Ext.create('security.store.RootGroup');
        me.columns = me.getGridColumns();
        me.dockedItems = me.getGridDockedItems();
        me.callParent(arguments);
    },
    
    getGridColumns: function () {
        var columns = [{
            xtype: 'rownumberer'
        }, {
            text: '部门名称',
            dataIndex: 'name'
        }, {
            text: '部门编号',
            dataIndex: 'groupcode'
        }, {
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
                }, {
                    icon: 'images/delete.gif',
                    tooltip: '删除'
                }]
            });
        }
        return columns;
    },
    
    getGridDockedItems: function () {
        var dockedItems = [];
        if (this.hasToolbar) {
            dockedItems.push({
                xtype: 'toolbar',
                items: [{
                    xtype: 'searchfield',
                    paramName: 'search_name_like',
                    emptyText: '请输入一个组织部门名！',
                    width: 200,
                    store: this.store
                }, '-', {
                    tooltip: '添加',
                    icon: 'icons/application_add.png'
                }]
            });
        }
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