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
                items: [/*{
                	xtype: 'combobox',
                    fieldLabel: '现有账号',
                    name: 'accountId',
                    valueField: 'id',
                    displayField: 'name',
                    editable: false,
                    store: dictionaryStore
                },*/{
                    fieldLabel: '名称',
                    name: 'name'
                },{
                    xtype: 'treepicker',
                    fieldLabel: '组织机构',
                    displayField: 'text',
                    store: Ext.create('security.store.Group'),
                    name: 'groupId'
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
