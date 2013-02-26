Ext.define('security.view.resource.ResourceManagerPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.resourcemgrpanel',
	requires: [
        'security.view.resource.ResourceTree',
        'security.view.resource.ResourceForm'
    ],
	title: '维护资源树',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
	
    initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [ {
				xtype : 'resourcetree',
				flex : 2
			}, {
    	        xtype: 'splitter',
    	        defaultSplitMin: 100,
    	        collapsible: true
    	    }, {
				xtype : 'resourceform',
				flex : 1
			} ]
		});

		me.callParent(arguments);
	}
});