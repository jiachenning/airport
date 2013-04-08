Ext.define('security.view.dictionary.DictionaryWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.dictionarywin',
    
    title: '添加字典',
    modal: true,
    constrainHeader: true,
    plain: true,
    bodyPadding: 1,
    closeAction: 'hide',
    width: 350,
    layout: 'fit',
    
    initComponent: function(arguments) {
        
        var me = this,
        	option = me.option;
        
        Ext.applyIf(me, {
            items: [{
                xtype: 'form',
                url: 'dictionary',
                bodyPadding: 5,
                frame: true,
                fieldDefaults: {
                    labelWidth: 85
                },
                defaults: {
                    xtype: 'textfield',
                    allowBlank: false,
                    anchor: '100%'
                },
                items: [{
                    fieldLabel: '上级节点名称',
                    name: 'parentName',
        			allowBlank: true,
        			disabled:true
                },{
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
                    xtype: 'numberfield',
                    fieldLabel: '排序',
                    name: 'ordernum',
                    minValue: 0,
                    maxValue: 500
                },{
                    fieldLabel: '字典类型',
                    name: 'typecode',
                    readOnly: true
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
