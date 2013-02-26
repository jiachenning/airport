Ext.define('security.view.group.GroupManagerPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.groupmgrpanel',
	requires: ['security.view.group.GroupTree'],
	
	title: '组织机构管理',
	closable: true,
	layout: {
		type: 'hbox',
		align: 'stretch'
	},
	
	initComponent: function(arguments) {
		
		var me = this;
		
		Ext.applyIf(me, {
			items: [{
				xtype: 'grouptree',
				flex: 1
			},{
                xtype: 'splitter',
                defaultSplitMin: 100
            },{
				title: 'aaaaaaaaa',
				html: 'aaaaaaaaaa',
				border: 1,
				flex: 1
			}]
		});
		
		me.callParent(arguments);
	}
});