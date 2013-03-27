Ext.define('security.view.dictionary.DictionaryGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.dictionarygrid',
    requires: ['Ext.ux.form.SearchField'],
    uses: ['security.store.DictionaryManage'],

    title: '字典管理列表',
    columnLines: true,
    forceFit : true,
    initComponent: function(arguments) {
        
        var me = this;
            store = me.store,
            storeConfig = me.storeConfig || {};
        if (!store) {
            store = Ext.create('security.store.DictionaryManage', storeConfig);
            me.store = store;
        }

        me.columns = me.getGridColumns();
        me.dockedItems  = me.getGridDockedItems();
        
        me.callParent(arguments);
    },

    getGridColumns: function() {

        var columns = [{
            xtype: 'rownumberer'
        },{
            text: '字典名称',
            dataIndex: 'name'
        },{
            text: '字典描述',
            dataIndex: 'description',
            width: 200
        },{
            text: '字典类型',
            dataIndex: 'typecode',
            width: 80
        }];
        
        if (this.operable) {
            columns.push({
                xtype: 'actioncolumn',
                text: '操作',
                align: 'center',
                width: 80,
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
        if (dockedItems.length == 0) {
        	
	        if (this.searchable) {
	            dockedItems.push({
	                xtype: 'toolbar',
	                items: [{
	                    xtype: 'searchfield',
	                    paramName: 'search_name_like',
	                    emptyText: '请输入一个字典名！',
	                    width: 200,
	                    store: this.store
	                },'-', {
	                	tooltip: '添加',
	                	icon: 'icons/application_add.png'
                    }]
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
            
