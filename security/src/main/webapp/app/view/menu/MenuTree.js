Ext.define('security.view.menu.MenuTree', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.menutree',
    title: '菜单树',
    initComponent: function(arguments) {

        var me = this;
		
        Ext.applyIf(me, {
			items : [ {
				xtype : 'button',
				text : '资管管理',
				listeners : {
					click : {
						fn : me.onButtonClick,
						scope : me
					}
				}
			} ]
		});

        me.callParent(arguments);
    },
	onButtonClick: function(button, e, options) {
	    var tabs = security.getApplication().getTabs();
	    tabs.setActiveTab(tabs.add({
	        xtype: 'resourcemgrpanel',
	        closable: true
	    }));
	}
});
