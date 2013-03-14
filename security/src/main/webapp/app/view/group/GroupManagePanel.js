Ext.define('security.view.group.GroupManagePanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.groupmanagepanel',
	requires: ['security.view.group.GroupTree', 
	           'security.view.account.AccountGrid',
	           'security.view.group.RootGroupGrid'],
	
	title: '部门管理',
	closable: true,
	layout: {
		type: 'hbox',
		align: 'stretch'
	},
	
	initComponent: function(arguments) {
		
		var me = this;
		
		Ext.applyIf(me, {
			items: [{
				xtype: 'rootgroupgrid',
				hasToolbar: this.hasToolbar,
			    operable: this.operable,
			    pagable: this.pagable,
				flex: 32
			},{
                xtype: 'splitter',
                defaultSplitMin: 100
            },{
				xtype: 'grouptree',
				border: 1,
				padding: 1,
				flex: 25
			},{
                xtype: 'splitter',
                defaultSplitMin: 100
            },{
				xtype: 'accountgrid',
				border: 1,
				padding: 1,
				flex: 43
			}]
		});
		
		me.callParent(arguments);
	}
});