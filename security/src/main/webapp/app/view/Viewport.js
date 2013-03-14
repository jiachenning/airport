Ext.define('security.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: ['Ext.ux.TabCloseMenu'],

    layout: 'border',
    items: [{
        region: 'north',
        xtype: 'toolbar',
        margin: '0 0 4 0',
        items: [{
            text: '注销',
            icon: 'icons/logout.png',
        	tooltip: '退出系统',
            handler: function() {
                location.replace('j_spring_security_logout');
            }
        }]
    },{
    	region: 'west',
        title: '功能导航栏',
        width: 220,
        collapsible: true,
        split: true,
        margin: '0 0 0 2',
        layout: 'fit',
        loader: {
        	url: 'security-nav.html',
        	autoLoad: true
        }
    },{
        region: 'center',
        xtype: 'tabpanel',
        plain: true,
        plugins: [{
            ptype: 'tabclosemenu',
            closeTabText: '关闭标签',
            closeOthersTabsText: '关闭其它标签',
            closeAllTabsText: '关闭所有标签'
        }]
    },{
        region: 'south',
        xtype: 'toolbar',
        items: '',
        margin: '4 0 0 0'
    }]
});
