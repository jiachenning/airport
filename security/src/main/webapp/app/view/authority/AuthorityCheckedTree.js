Ext.define('security.view.authority.AuthorityCheckedTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.authority-checked-tree',
    title: '资源树',
    useArrows: true,
    autoScroll: true, 
    rootVisible: false,
	initComponent : function(arguments) {
		var me = this;

		Ext.applyIf(me, {
			store: 'AuthorityChecked',
			
		});
		
		me.callParent(arguments);
		me.expandAll();
	}
});
