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
                    labelWidth: 65,
                },
                defaults: {
                    xtype: 'textfield',
                    allowBlank: false,
                    anchor: '100%'
                },
                items: [{
                    fieldLabel: '用户名',
                    name: 'username'
                },{
                    xtype: 'numberfield',
                    fieldLabel: '年龄',
                    name: 'age',
                    minValue: 0,
                    maxValue: 100
                },{
                    xtype: 'datefield',
                    fieldLabel: '出生年月',
                    name: 'birthday',
                    format: 'Y-m-d',
                    value: new Date()
                },{
                    xtype: 'combobox',
                    fieldLabel: '用户类型',
                    name: 'userType',
                    queryMode: 'local',
                    forceSelection: true,
                    store: [
                        ['NORMAL', 'NORMAL'],
                        ['ADVINCED', 'ADVINCED'],
                        ['ADMINISTRATOR', 'ADMINISTRATOR']
                    ],
                    value: 'NORMAL'
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
