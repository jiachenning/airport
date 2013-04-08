Ext.define('security.view.dictionary.DictionaryTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.dictionarytree',

    title: '字典树',
    useArrows: true,
    autoScroll: true, 
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			store: Ext.create('security.store.Dictionary')
		});
		
		me.callParent(arguments);
	},
	
});
