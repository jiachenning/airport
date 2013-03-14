Ext.define('security.view.dictionary.DictionaryTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.dictionarytree',

    title: '字典树',
    useArrows: true,
    autoScroll: true, 
	initComponent : function() {
		var me = this;
		me.dockedItems  = me.getTreeDockedItems();

		Ext.applyIf(me, {
			store: 'Dictionary'
		});
		
		me.callParent(arguments);
	},
	
	getTreeDockedItems: function() {
        var dockedItems = [];
        if (dockedItems.length == 0) {
	        if (this.operable) {
	            dockedItems.push({
	                xtype: 'toolbar',
	                items: [{
	                	tooltip: '添加',
	                	icon: 'icons/application_add.png'
	                },'-',{
	                	tooltip: '删除',
	                	icon: 'icons/application_delete.png'
	                }]
	            });
	        }
	        
	    }
	    return dockedItems;
	    
	}
	    
});
