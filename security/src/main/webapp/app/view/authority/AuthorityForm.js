Ext.define('security.view.authority.AuthorityForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.authorityform',

    title: '资源详细',
    border : true,
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			defaults: {
                xtype: 'textfield',
                readOnly: true,
                anchor: '90%'
            },
			items : [ {
				name: 'text',
				fieldLabel : '资源名称'
			}, {
				name: 'code',
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
            }, {
                xtype: 'combobox',
                fieldLabel: '资源类型',
                name: 'type',
                queryMode: 'local',
                store: [
                    ['0', '菜单'],
                    ['1', '功能']
                ]
            }, {
                xtype: 'numberfield',
                fieldLabel: '排序',
                name: 'ordernum'
            }, {
                xtype: 'textarea',
                fieldLabel: '描述',
                name: 'description'
            }]
		});

		me.callParent(arguments);
	}
});
