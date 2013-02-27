Ext.define('security.view.authority.AuthorityForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.authorityform',

    title: '资源详细',
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			border : true,
			items : [ {
				xtype : 'textfield',
				anchor : '90%',
				fieldLabel : '资源名称'
			}, {
				xtype : 'textfield',
				anchor : '90%',
				fieldLabel : '资源代码'
			}, {
                xtype: 'combobox',
                fieldLabel: '是否启用',
                name: 'enabled',
                queryMode: 'local',
                forceSelection: true,
                store: [
                    [true, '是'],
                    [false, '否']
                ]
            } ]
		});

		me.callParent(arguments);
	}
});
