Ext.define('security.view.user.UserWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.userwin',
    
    id: 'userwin',
    title: '维护用户通信录',
    modal: true,
    constrainHeader: true,
    plain: true,
    bodyPadding: 1,
    closeAction: 'hide',
    width: 320,
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
                    fieldLabel: '姓名',
                    name: 'username'
                },{
                    fieldLabel: '登录名',
                    name: 'loginName'
                },{
                    fieldLabel: '密码',
                    name: 'password'
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
                    xtype: 'combobox',
                    fieldLabel: '性别',
                    name: 'gender',
                    queryMode: 'local',
                    forceSelection: true,
                    store: [
                        ['MALE', '男'],
                        ['FEMALE', '女']
                    ]
                },{
                    fieldLabel: '电话',
                    name: 'telephone',
                    allowBlank: true
                },{
                    fieldLabel: '地址',
                    name: 'address',
                    allowBlank: true
                },{
                    xtype: 'datefield',
                    fieldLabel: '出生年月',
                    name: 'birthday',
                    format: 'Y-m-d'
                },{
                    xtype: 'combobox',
                    fieldLabel: '用户类型',
                    name: 'userType',
                    queryMode: 'local',
                    forceSelection: true,
                    store: [
                        ['NORMAL', '普通用户'],
                        ['ADVINCED', '管理员'],
                        ['ADMINISTRATOR', '超级管理员']
                    ]
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
