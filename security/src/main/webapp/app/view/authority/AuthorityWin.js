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
                    name: 'parentName'
                },{
                    fieldLabel: '资源名称',
                    name: 'name'
                },{
                    fieldLabel: '资源代码',
                    name: 'code'
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
                    store: [
                        ['0', '菜单'],
                        ['1', '功能']
                    ]
                },{
                    xtype: 'textarea',
                    allowBlank: true,
                    fieldLabel: '描述',
                    name: 'description'
                }]
            }],
            buttonAlign: 'center',
            buttons: [{
                text: '保存',
                tooltip: '保存'
            },{
                text: '重置',
                handler: function() {
                    this.up('window').child('form').getForm().reset();
                }
            }]
        });
        
        me.callParent(arguments);
    }
});
