Ext.define('security.controller.AccountRoleManager', {
    extend: 'Ext.app.Controller',

    views: ['maintain.AccountRoleMaintainPanel'],
    
    refs: [{
        ref: 'accountGrid',
        selector: 'account-role-maintain > accountgrid'
    },{
        ref: 'roleGrid',
        selector: 'account-role-maintain > rolegrid'
    }],
    
    init: function() {
        this.control({
            'account-role-maintain > accountgrid': {
                selectionchange: this.onAccountGridSelectionChange
            },
            'account-role-maintain > rolegrid button[text="删除"]': {
                click: this.removeRolesFromAccount
            }
        });
    },

    onAccountGridSelectionChange: function(model, selected, eOpts) {
    	
    	if (selected.length) {

            var accountId = selected[0].get('id'),
                store = this.getRoleGrid().getStore();

            store.getProxy().setExtraParam('accountId', accountId);
            store.loadPage(1);
        }

    },

    removeRolesFromAccount: function() {

        var selectedAccount = this.getAccountGrid().getSelectionModel().getLastSelected(),
            selectedRoles = this.getRoleGrid().getSelectionModel().getSelection(),
            accountId = selectedAccount.get('id');

        if (selectedRoles.length) {

            var roleIds = [];
            Ext.Array.forEach(selectedRoles, function(role) {
                roleIds.push(role.get('id'));
            });

            Ext.Msg.confirm('确认', '你确定要删除吗？', function(btn) {
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url: 'accounts/removeRolesFromAccount',
                        params: {
                            accountId: accountId,
                            roleIds: roleIds
                        },
                        success: function(response, options) {
                            var store = this.getRoleGrid().getStore();
                            store.reload();
                        }
                        scope: this
                    });
                }
            }, this);
        }

    }

});
