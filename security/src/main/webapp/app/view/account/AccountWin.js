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
        
        var me = this,
        	loginName = me.loginName,
        	accountStore = Ext.create('security.store.Account',{
        		proxy: {
                    type: 'rest',
                    url: 'accounts/findByUserLoginNameNot',
                    extraParams:{
                    	loginName: loginName
                    }
                }
        	});
        
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
                    anchor: '100%'
                },
                items: [{
                    xtype: 'radiogroup',
                    fieldLabel: '选择',
                    cls: 'x-check-group-alt',
                    items: [
                        {boxLabel: '新增账号', name: 'rb', inputValue: 1, checked: true},
                        {boxLabel: '现有账号', name: 'rb', inputValue: 2}
                    ],
                    listeners:{
                    	change: function(rg){
                    		var value = rg.getValue(),
                    			f = me.child('form').getForm(),
                    			combo = f.findField('accountId'),
                    			name = f.findField('name'),
	            				groupId = f.findField('groupId'),
	            				groupName = f.findField('groupName');
                    		if(value.rb == 1){
                    			combo.setVisible(false);
                    			groupName.setVisible(false);
                    			groupId.setVisible(true);
                    			combo.reset();
                    			name.reset();
                    			groupId.reset();
                    			groupName.reset();
                    			name.setReadOnly(false);
                    		}else {
                    			combo.setVisible(true);
                    			groupId.setVisible(false);
                    			groupName.setVisible(true);
                    			name.setReadOnly(true);
    	    	            	groupName.setReadOnly(true);
                    		}
                    	}
                    }
                },{
                	xtype: 'combobox',
                    fieldLabel: '现有账号',
                    name: 'accountId',
                    valueField: 'id',
                    displayField: 'name',
                    editable: false,
                    store: accountStore,
                    listeners: {
    	    	    	afterrender : function(field) {
    	                    field.setVisible(false);
    	                },
    	                select: function(combo, records){
    	                	var f = me.child('form').getForm(),
	            				name = f.findField('name'),
	            				groupId = f.findField('groupId'),
	            				groupName = f.findField('groupName');
	    	            	name.setValue(records[0].get('name'));
	    	            	groupId.setValue(records[0].get('group').id);
	    	            	groupName.setValue(records[0].get('group').name);
    	                }
    	            }
                },{
                    fieldLabel: '名称',
                    name: 'name',
                    allowBlank: false
                },{
                    xtype: 'treepicker',
                    fieldLabel: '组织机构',
                    displayField: 'text',
                    store: Ext.create('security.store.Group'),
                    name: 'groupId'
                },{
                	fieldLabel: '组织机构',
                	name: 'groupName',
                	hidden: true
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
