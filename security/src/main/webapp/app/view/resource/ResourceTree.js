Ext.define('security.view.resource.ResourceTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.resourcetree',

    title: '资源树',
    useArrows: true,
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			store: 'Resource'
		});

		me.callParent(arguments);
	}
});
