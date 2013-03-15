Ext.define('security.controller.UserAccountManager', {
    extend: 'Ext.app.Controller',
    uses: ['security.view.user.UserWin'],

    views: ['user.UserGrid', 'account.AccountGrid', 'user.UserManagerPanel', 
            'account.AccountWin', 'authority.AuthorityAccountWin'],
    
    refs: [{
        ref: 'userGrid1',
        selector: 'panel[title="用户管理"] > usergrid'
    },{
        ref: 'userGrid2',
        selector: 'panel[title="用户账号维护"] > usergrid'
    },{
        ref: 'accountGrid1',
        selector: 'panel[title="用户管理"] > accountgrid'
    },{
        ref: 'accountGrid2',
        selector: 'panel[title="用户账号维护"] > accountgrid'
    },{
       ref: 'userWin',
       selector: 'userwin'
    },{
    	ref: 'accountWin',
    	selector: 'accountwin'
    },{
    	ref: 'authorityAccountWin',
        selector: 'authority-account-win'
    }],
    
    init: function() {
        this.control({
            'panel[title="用户管理"] > usergrid': {
                selectionchange: this.onUserGridSelectionChange1
            },
            'panel[title="用户账号维护"] > usergrid': {
                selectionchange: this.onUserGridSelectionChange2
            },
            'usergrid actioncolumn': {
                click: this.doAction
            },
            'usergrid button[tooltip="添加"]': {
                click: this.showUserWin
            },
            'usergrid button[tooltip="维护用户账号"]': {
                click: this.maintainUserAccount
            },
            'userwin button[text="保存"]': {
                click: this.saveUser
            },
            'accountgrid button[tooltip="添加"]': {
                click: this.showAccountWin
            },
            'accountgrid actioncolumn': {
                click: this.doAction2
            },
            'authority-account-win button[tooltip="授权"]': {
            	click: this.addAccountAuthority
            },
            'accountwin button[text="保存"]': {
            	click: this.saveAccount
            }
        });
    },
    
    onUserGridSelectionChange1: function(model, selected, eOpts) {

        if (selected.length) {
        	
            var userId = selected[0].get('id'),
                accountStore = this.getAccountGrid1().getStore();
            
            accountStore.getProxy().setExtraParam('userId', userId);
            accountStore.load();
        }
    },

    onUserGridSelectionChange2: function(model, selected, eOpts) {

        if (selected && selected.length) {
        	
            var record = selected[0],
                userId = record.get('id'),
                accountStore = this.getAccountGrid2().getStore();
            
            accountStore.getProxy().setExtraParam('userId', userId);
            accountStore.load();
        }
    },
    
    doAction: function(grid, cell, row, col, e, eOpts) {
        var rec = grid.getStore().getAt(row),
        	action = e.target.getAttribute('class');
        
        if (action.indexOf("x-action-col-0") != -1) { // edit user
            this.showUserWin(e.target, e, eOpts, rec);
        } else if (action.indexOf("x-action-col-1") != -1) { // delete user
            this.deleteUser(rec.get('id'));
        }
    },
    
    showUserWin: function(btn, e, eOpts, rec) {
        var win = Ext.getCmp('userwin');
        if (!win) {
            win = Ext.create('security.view.user.UserWin');
        }
    	win.show(btn, function() {
            var f = win.child('form').getForm();
            if (!rec) {
                rec = Ext.create('security.model.User');
            }
            f.loadRecord(rec);
        });
    },

    deleteUser: function(id) {
        Ext.Msg.confirm('确认', '你确定要删除吗?', function(btn) {
            if (btn == 'yes') {
                var userStore = this.getUserGrid1().getStore();
                Ext.create('security.model.User', {
                    id: id
                }).destroy({
                    success: function() {
                    	userStore.loadPage(1);
                    }
                });
            }
        }, this);
    },

    maintainUserAccount: function(btn) {
        var tabs = security.getApplication().getTabs();
        tabs.setActiveTab(tabs.add({
            title: '用户账号维护',
            closable: true,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            bodyPadding: 1,
            items: [{
                xtype: 'usergrid',
                searchable: true,
                pagable: true,
                flex: 5
            },{
                xtype: 'splitter',
                defaultSplitMin: 100
            },{
                xtype: 'accountgrid',
                operable: false,
                dockedItems: [{
                    xtype: 'toolbar',
                    items: {
                        tooltip: '添加',
                        icon: 'icons/application_add.png'
                    }
                }],
                flex: 2
            }]
        }));
    },

    saveUser: function(btn) {
        var win = this.getUserWin(),
            f = win.child('form').getForm();
        
        if (f.isValid()) {
            f.updateRecord();
            var userStore = this.getUserGrid1().getStore(),
                user = f.getRecord();
            
            user.save({
                success: function(user) {
                    win.hide();
                    userStore.loadPage(1);
                }
            });
        }
    },

    doAction2: function(grid, cell, row, col, e, eOpts) {
        
    	var rec = grid.getStore().getAt(row),
        	action = e.target.getAttribute('class');
        
        if (action.indexOf("x-action-col-0") != -1) { // edit account
            this.showAccountWin(e.target, e, eOpts, rec);
        } else if (action.indexOf("x-action-col-1") != -1) { // delete account
            this.deleteAccount(rec.get('id'));
        } else if (action.indexOf("x-action-col-2") != -1) { // add authority
        	this.authorityAccount(e.target, rec);
        }
    },
    
    showAccountWin: function(btn, e, eOpts, rec) {
    	
    	var record = this.getUserGrid2().getSelectionModel().getLastSelected();
    	
    	if (record) {
	        var win = Ext.getCmp('accountwin');
	        
	        if (!win) {
	            win = Ext.create('security.view.account.AccountWin');
	        }
	    	win.show(btn, function() {
	            var f = win.child('form').getForm();
	            if (!rec) {
	                rec = Ext.create('security.model.Account');
	            }
	            f.loadRecord(rec);
	        });
    	} else {
			Ext.Msg.alert("提示","请选择一个用户进行帐号新增!");
		}
    },
    
    deleteAccount: function(id) {
        Ext.Msg.confirm('确认', '你确定要删除吗?', function(btn) {
            if (btn == 'yes') {
                var accountStore = this.getAccountGrid2().getStore();
                var account = Ext.create('security.model.Account', {
                    id: id
                });
                account.destroy({
                    success: function() {
                    	accountStore.loadPage(1);
                    }
                });
            }
        }, this);
    },
    
    authorityAccount: function(btn, rec) {
    	var win = Ext.getCmp('authorityAccountwin');
    	if (!win) {
    		win = Ext.widget('authority-account-win');
    		win.record = rec;
        }
      	win.show(btn, function() {
      		var authoritytree = win.child('authority-checked-tree');
      		var root = authoritytree.getRootNode();
      		Ext.Ajax.request({
                url: 'accounts/findAccountAuthority',
                method: 'get',
                params: {
                    accountId: rec.get('id')
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
    
    addAccountAuthority: function(btn) {
    	
	    var	win = this.getAuthorityAccountWin(),
	    	accountId = win.record.get('id'),
	    	authoritytree = win.child('authority-checked-tree'),
	    	records = authoritytree.getView().getChecked(),
	    	authIds = [];
	    Ext.Array.each(records, function(rec){
	    	authIds.push(rec.get('id'));
	    });
	    
	    Ext.Ajax.request({
            url: 'accounts/addAccountAuthority',
            params: {
                accountId: accountId,
                authIds: authIds
            },
            success: function(response, options) {
            	Ext.Msg.alert('提示','授权成功!');
                win.close();
            }
        });
	},
	
	saveAccount: function(btn) {
		
		var win = this.getAccountWin(), 
			f = win.child('form').getForm(),
			userId = this.getUserGrid2().getSelectionModel().getLastSelected().get('id');
		
		if (f.isValid()) {
			
			f.updateRecord();
			
			var account = f.getRecord(),
				accountStore = this.getAccountGrid2().getStore();
			
			account.set('user',  {id: userId});
			account.set('group', {id: f.findField('groupId').value});
				
			account.save({
				success : function(user) {
					win.hide();
					accountStore.getProxy().setExtraParam('userId', userId);
					accountStore.load();
				}
			});
		}
	}
});
