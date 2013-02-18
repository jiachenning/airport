Ext.define('security.view.account.AccountWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.accountwin',
    requires: ['Ext.ux.TreePicker'],
    
    id: 'accountwin',
    title: '维护用户帐号',
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
                    fieldLabel: '登录名',
                    name: 'loginName'
                },{
                    fieldLabel: '密码',
                    name: 'password'
                },{
                    xtype: 'treepicker',
                    fieldLabel: '组织机构',
                    displayField: 'text',
                    store: Ext.create('security.store.Group'),
                    name: 'group.id'
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
