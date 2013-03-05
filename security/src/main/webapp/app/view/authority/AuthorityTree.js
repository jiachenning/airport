Ext.define('security.view.authority.AuthorityTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.authoritytree',

    title: '资源树',
    useArrows: true,
    autoScroll: true, 
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			store: 'Authority'
		});
		
		me.callParent(arguments);
	}
});
