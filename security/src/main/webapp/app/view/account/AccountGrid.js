Ext.define('security.view.account.AccountGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.accountgrid',
    uses: ['security.store.Account'],

    title: '用户账号',
    columnLines: true,

    initComponent: function(arguments) {
        
        var me = this;

        me.store = Ext.create('security.store.Account');
        me.columns = this.getGridColumns();

        me.callParent(arguments);
    },

    getGridColumns: function() {

        var columns = [{
            xtype: 'rownumberer'
        },{
            text: '登录名',
            dataIndex: 'loginName',
            width: 150
        },{
            text: '所属机构',
            dataIndex: 'group.name',
            width: 150
        },{
            text: '密码',
            dataIndex: 'password',
            width: 200
        },{
            xtype: 'booleancolumn',
            text: '是否启用',
            trueText: '是',
            falseText: '否',
            dataIndex: 'enabled',
            flex: 1
        }];

        if (this.operable) {
            columns.push({
                xtype: 'actioncolumn',
                text: '操作',
                align: 'center',
                width: 50,
                items: [{
                    icon: 'images/cog_edit.png',
                    tooltip: '编辑'
                },{
                    icon: 'images/delete.gif',
                    tooltip: '删除'
                }]
            });
        }

        return columns;
    }

});
            
