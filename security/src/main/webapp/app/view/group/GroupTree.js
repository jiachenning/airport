Ext.define('security.view.group.GroupTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.grouptree',

    title: '组织机构',
    padding: 1,
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
