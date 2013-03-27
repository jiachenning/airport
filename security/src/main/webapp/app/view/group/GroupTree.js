Ext.define('security.view.group.GroupTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.grouptree',
    title: '组织部门树',
    bodyPadding: 4,
    useArrows: true,
  
    initComponent: function (arguments) {
        var me = this;
        Ext.applyIf(me, {
            store: 'Group'
        });
        me.callParent(arguments);
    }
});