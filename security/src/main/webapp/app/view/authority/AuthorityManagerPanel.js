Ext.define('security.view.authority.AuthorityManagerPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.authoritymgrpanel',
	requires: [
        'security.view.authority.AuthorityTree',
        'security.view.authority.AuthorityForm'
    ],
	title: '维护资源树',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
	bodyPadding: 1,
    initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [ {
				xtype : 'authoritytree',
				flex : 2
			}, {
    	        xtype: 'splitter',
    	        defaultSplitMin: 100,
    	        collapsible: true
    	    }, {
				xtype : 'authorityform',
				flex : 1
			} ]
		});

		me.callParent(arguments);
	}
});