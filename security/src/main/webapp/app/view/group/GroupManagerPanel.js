Ext.define('security.view.group.GroupManagerPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.groupmgrpanel',
	requires: ['security.view.group.GroupTree', 'security.view.account.AccountGrid'],
	
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
				flex: 3
			},{
                xtype: 'splitter',
                defaultSplitMin: 100
            },{
				xtype: 'accountgrid',
				border: 1,
				padding: 1,
				flex: 7
			}]
		});
		
		me.callParent(arguments);
	}
});