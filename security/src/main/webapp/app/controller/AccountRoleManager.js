Ext.define('security.controller.AccountRoleManager', {
    extend: 'Ext.app.Controller',

    views: ['maintain.AccountRoleMaintainPanel'],
    
    refs: [{
        ref: 'accountGrid',
        selector: 'panel[title="维护帐号角色"] > accountgrid'
    },{
        ref: 'roleGrid',
        selector: 'panel[title="维护帐号角色] > rolegrid'
    }],
    
    init: function() {
        this.control({
            'account-role-maintain > accountgrid': {
                selectionchange: this.onAccountGridSelectionChange
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

    }

});
