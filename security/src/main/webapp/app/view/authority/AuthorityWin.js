Ext.define('security.view.authority.AuthorityWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.authoritywin',
    title: '维护资源',
    modal: true,
    constrainHeader: true,
    plain: true,
    bodyPadding: 1,
    closeAction: 'hide',
    width: 300,
    layout: 'fit',
    
    initComponent: function() {
        
        var me = this;
        
        Ext.applyIf(me, {
            items: [{
                xtype: 'form',
                bodyPadding: 5,
                frame: true,
                fieldDefaults: {
                    labelWidth: 75,
                },
                defaults: {
                    xtype: 'textfield',
                    allowBlank: false,
                    anchor: '100%'
                },
                items: [{
                    fieldLabel: '父节点资源',
                    name: 'parentName',
                    disabled: true//父节点不可修改
                },{
                    fieldLabel: '资源名称',
                    name: 'name',
                    maxLength:80
                },{
                    fieldLabel: '资源代码',
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
                    xtype: 'combobox',
                    fieldLabel: '资源类型',
                    name: 'type',
                    queryMode: 'local',
                    forceSelection: true,
                    store: [
                        ['0', '菜单'],
                        ['1', '功能']
                    ]
                },{
                    xtype: 'numberfield',
                    fieldLabel: '排序',
                    name: 'ordernum',
                    minValue: 0,
                    maxValue: 500
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
            	tooltip: '关闭',
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
