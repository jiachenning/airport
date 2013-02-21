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
            handler: function() {
                location.replace('j_spring_security_logout');
            }
        }]
    },{
        region: 'west',
        layout: {
            type: 'accordion',
            titleCollapse: true,
            animate: true
        },
        items: [{
            title: 'Panle1',
            html: 'Panel content!'
        },{
            title: 'Panle2',
            html: 'Panel content!'
        },{
            title: 'Panle3',
            html: 'Panel content!'
        }],
        width: 270,
        margin: '0 0 0 4',
        split: true,
        collapsible: true
    },{
        region: 'center',
        xtype: 'tabpanel',
        plain: true,
        items: [{
            xtype: 'usertab',
            closable: true
        },{
            xtype: 'rolegrid',
            closable: true
        }],
        plugins: [{
            ptype: 'tabclosemenu',
            closeTabText: '关闭标签',
            closeOthersTabsText: '关闭其它标签',
            closeAllTabsText: '关闭所有标签'
        }]
    },{
        region: 'south',
        xtype: 'toolbar',
        items: '万达信息股份有限公司版权所有v1.0',
        margin: '4 0 0 0'
    }]
});
