Ext.define('security.view.group.GroupTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.grouptree',

    title: '系统功能导航栏',
    bodyPadding: 4,
    useArrows: true,

    initComponent: function(arguments) {
        var me = this;

        Ext.applyIf(me, {
            store: 'Group'
        });

        me.callParent(arguments);
    }

});
