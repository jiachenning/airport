Ext.define('security.view.group.RootGroupWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.rootgroupwin',
    id: 'deptwin',
    title: '维护组织部门',
    modal: true,
    constrainHeader: true,
    plain: true,
    bodyPadding: 1,
    closeAction: 'hide',
    width: 300,
    layout: 'fit',
    
    initComponent: function (arguments) {
        var me = this;
        Ext.applyIf(me, {
            items: [{
                xtype: 'form',
                bodyPadding: 5,
                frame: true,
                fieldDefaults: {
                    labelWidth: 65,
                    labelAlign: 'top'
                },
                defaults: {
                    xtype: 'textfield',
                    allowBlank: false,
                    anchor: '100%'
                },
                items: [{
                    fieldLabel: '部门名称',
                    name: 'name'
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
                    xtype: 'textarea',
                    allowBlank: true,
                    fieldLabel: '描述',
                    name: 'description'
                }]
            }],
            buttonAlign: 'center',
            buttons: [{
                text: '保存',
                tooltip: '保存',
                icon: 'icons/accept.png'
            }, {
                text: '关闭',
                icon: 'icons/cancel.png',
                scope: this,
                handler: function () {
                    this.hide();
                }
            }]
        });
        me.callParent(arguments);
    }
});