Ext.define('security.view.group.GroupManagePanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.groupmanagepanel',
	requires : [ 'security.view.group.GroupTree',
			'security.view.account.AccountGrid',
			'security.view.group.RootGroupGrid' ],

	title : '部门管理',
	closable : true,
	layout : {
		type : 'hbox',
		align : 'stretch'
	},
	//bodyPadding : 1,

	initComponent : function(arguments) {

		var me = this;

		Ext.applyIf(me, {
			defaults: {
                border: true,
                margin: '1 1 1 1'
            },
			items : [ {
				xtype : 'rootgroupgrid',
				hasToolbar : this.hasToolbar,
				operable : this.operable,
				pagable : this.pagable,
				width : 350
			}, {
				xtype : 'grouptree',
				flex : 1
			}, {
				xtype : 'accountgrid',
				flex : 1
			} ]
		});

		me.callParent(arguments);
	}
});