Ext.define('security.view.role.RoleWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.rolewin',
    
    id: 'rolewin',
    title: '维护用户角色',
    modal: true,
    constrainHeader: true,
    plain: true,
    bodyPadding: 1,
    closeAction: 'hide',
    width: 300,
    layout: 'fit',
    
    initComponent: function(arguments) {
        
        var me = this;
        
        Ext.applyIf(me, {
            items: [{
                xtype: 'form',
                url: 'users',
                bodyPadding: 5,
                frame: true,
                fieldDefaults: {
                    labelWidth: 65
                },
                defaults: {
                    xtype: 'textfield',
                    allowBlank: false,
                    anchor: '100%'
                },
                items: [{
                    fieldLabel: '名称',
                    name: 'name',
                    maxLength:80
                },{
                    fieldLabel: '代码',
                    name: 'code',
                    regex:/^\w{0,79}$/,
                    regexText:'请输入长度不超过80，由数字，字母，下划线组成的字符串'
                },{
                    xtype: 'combobox',
                    fieldLabel: '是否启用',
                    name: 'enabled',
                    queryMode: 'local',
                    forceSelection: true,
                    store: [
                        [true, '是'],
                        [false, '否']
                    ]
                },{
                    xtype: 'textarea',
                    allowBlank: true,
                    fieldLabel: '描述',
                    name: 'description',
                    maxLength:200
                }]
            }],
            buttonAlign: 'center',
            buttons: [{
            	text: '保存',
                tooltip: '保存',
                icon: 'icons/accept.png'
            },{
            	text: '关闭',
                icon: 'icons/cancel.png',
				scope: this,
				handler: function() {
					this.hide();
				}
            }]
        });
        
        me.callParent(arguments);
    }
});
