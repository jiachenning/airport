Ext.define('security.view.user.UserTab', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.usertab',
	
	title: '用户通信录',
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
				flex: 2
			},{
				xtype: 'splitter',
				defaultSplitMin: 100,
				collapsible: true
			},{
				xtype: 'accountgrid',
				title: '用户帐号列表',
				flex: 1
			}]
		});
		
		me.callParent(arguments);
	}
});