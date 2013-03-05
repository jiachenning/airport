Ext.define('security.controller.RoleController', {
    extend: 'Ext.app.Controller',
    uses: ['security.controller.AccountRoleManager'],
    stores: ['AuthorityChecked'],
    views: [
        'role.RoleGrid',
        'role.RoleWin',
        'authority.AuthorityRoleWin'
    ],

    refs: [{
        ref: 'roleGrid',
        selector: 'rolegrid[closable]'
    },{
        ref: 'roleWin',
        selector: 'rolewin'
    },{
    	ref: 'authorityRoleWin',
        selector: 'authority-role-win'
    }],

    init: function() {
        this.control({
            'rolegrid[closable] button[text="添加"]': {
                click: this.showRoleWin
            },
            'rolegrid[closable] button[text="维护帐号角色"]': {
                click: this.maintainAccRole
            },
            'rolegrid[closable] actioncolumn': {
                click: this.doAction
            },
            'rolewin button[text="保存"]': {
                click: this.saveRole
            },
            'authority-role-win button[text="授权"]': {
            	click: this.addRoleAuthority
            }
        });
    },

    showRoleWin: function(btn, e, eOpts, rec) {
        var win = Ext.getCmp('rolewin');
        if (!win) {
            win = Ext.widget('rolewin');
        }
    	win.show(btn, function() {
            var f = win.child('form').getForm();
            if (!rec) {
                rec = Ext.create('security.model.Role');
            }
            f.loadRecord(rec);
        });
    },

    maintainAccRole: function(btn) {
        this.getController('AccountRoleManager');
        var tabs = security.getApplication().getTabs();
        tabs.setActiveTab(tabs.add({
        	xtype: 'account-role-maintain',
        	closable: true
        }));
    },

    doAction: function(grid, cell, row, col, e, eOpts) {
        var rec = grid.getStore().getAt(row),
        	action = e.target.getAttribute('class');
        
        if (action.indexOf("x-action-col-0") != -1) { // edit user
            this.showRoleWin(e.target, e, eOpts, rec);
        } else if (action.indexOf("x-action-col-1") != -1) { // delete user
            this.deleteRole(rec.get('id'));
        } else if (action.indexOf("x-action-col-2") != -1) {
            this.authorityRole(e.target, rec);
        }
    },

    deleteRole: function(id) {
        Ext.Msg.confirm('确认', '你确定要删除吗?', function(btn) {
            if (btn == 'yes') {
                var roleStore = this.getRoleGrid().getStore();
                Ext.create('security.model.Role', {
                    id: id
                }).destroy({
                    success: function() {
                    	roleStore.loadPage(1);
                    }
                });
            }
        }, this);
    },

    saveRole: function(btn) {
        var win = this.getRoleWin(),
            f = win.child('form').getForm();
        
        if (f.isValid()) {
            f.updateRecord();
            var roleStore = this.getRoleGrid().getStore(),
                role = f.getRecord();
            
            role.save({
                success: function(role) {
                    win.hide();
                    roleStore.loadPage(1);
                }
            });
        }
    },
    
    authorityRole: function(btn, rec) {
    	var win = Ext.getCmp('authorityRolewin');
    	if (!win) {
    		win = Ext.widget('authority-role-win');
        }
      	win.show(btn, function() {
      		var authoritytree = win.child('authority-checked-tree');
      		var root = authoritytree.getRootNode();
//      		root.cascadeBy(function(node){
//				node.set('checked', false);
//			});
      		Ext.Ajax.request({
                url: 'roles/findRoleAuthority',
                method: 'get',
                params: {
                    roleId: rec.get('id')
                },
                success: function(response, options) {
                	var responseText = response.responseText.replace(/[\"]/ig,''),
                		authIds = responseText.split(',');
                	
                	if(authIds.length > 0){
						root.cascadeBy(function(node){
							node.set('checked', false);
							for (var i = 0; i < authIds.length; i++) {
								if(node.get('id') == authIds[i]){
									node.set('checked', true);
    								break;
    							}
                            }
						});
					}
                }
            });
      		
        });
    },
    
    addRoleAuthority: function(btn) {
	    var roleId = this.getRoleGrid().getSelectionModel().getLastSelected().get('id'),
	    	win = this.getAuthorityRoleWin(),
	    	authoritytree = win.child('authority-checked-tree'),
	    	records = authoritytree.getView().getChecked(),
	    	authIds = [];
	    
	    Ext.Array.each(records, function(rec){
	    	authIds.push(rec.get('id'));
	    });
	    
	    Ext.Ajax.request({
            url: 'roles/addRoleAuthority',
            params: {
                roleId: roleId,
                authIds: authIds
            },
            success: function(response, options) {
            	Ext.Msg.alert('提示','授权成功!');
                win.close();
            }
        });
	}

});
