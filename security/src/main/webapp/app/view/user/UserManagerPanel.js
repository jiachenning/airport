Ext.define('security.view.user.UserManagerPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.usermgrpanel',
	requires: ['security.view.user.UserGrid', 'security.view.account.AccountGrid'],
	
	title: '用户管理',
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	bodyPadding: 1,
	
	initComponent: function(arguments) {
		
		var me = this;
		
		Ext.applyIf(me, {
			items: [{
				xtype: 'usergrid',
				hasToolbar: this.hasToolbar,
			    operable: this.operable,
			    pagable: this.pagable,
				flex: 7
			},{
                xtype: 'splitter',
                defaultSplitMin: 100,
                collapsible: true
            },{
				xtype: 'accountgrid',
				border: 1,
				padding: 1,
				flex: 3
			}]
		});
		
		me.callParent(arguments);
	}
});