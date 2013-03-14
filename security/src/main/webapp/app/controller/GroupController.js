Ext.define('security.controller.GroupController', {
    extend: 'Ext.app.Controller',
    requires: ['security.view.group.GroupWin', 'security.view.group.RootGroupWin'],

    stores: ['Group', 'RootGroup'],
    
    models: ['Group', 'RootGroup'],

    views: [
        'group.GroupTree',
        'group.GroupWin',
        'account.AccountGrid',
        'group.RootGroupGrid',
        'group.RootGroupWin',
        'group.GroupManagePanel'
    ],
    
    refs: [{
        ref: 'groupTree',
        selector: 'grouptree'
    },{
        ref: 'accountGrid',
        selector: 'panel[title="部门管理"] > accountgrid'
    },{
        ref: 'rootGroupWin',
        selector: 'rootgroupwin'
    },{
        ref: 'rootGroupGrid',
        selector: 'rootgroupgrid'
    },{
    	ref: 'groupTree',
        selector: 'grouptree'
    }],

    init: function() {
    	
    	this.control({
    		'rootgroupgrid button[tooltip="添加"]': {
    			click: this.showRootGroupWin
    		},
    		'rootgroupwin button[text="保存"]': {
    			click: this.saveRootGroup
    		},
    		'rootgroupgrid actioncolumn': {
    			click: this.doAction
    		},
    		'panel[title="部门管理"] > rootgroupgrid': {
    			selectionchange: this.onRootGroupGridSelectionChange
    		},
    		'groupmanagepanel > grouptree': {
    			itemcontextmenu: this.onGroupTreeItemcontextmenu
    		},
    		'groupwin button[text="保存"]': {
                click: this.saveGroup
            },
            'panel[title="部门管理"] > grouptree': {
                selectionchange: this.onGroupTreeSelectionChange
            }
    	});
    },
    
    showRootGroupWin: function(btn, e, eOpts, rec) {
        var win = Ext.getCmp('deptwin');
        if (!win) {
            win = Ext.create('security.view.group.RootGroupWin');
        }
    	win.show(btn, function() {
            var f = win.child('form').getForm();
            if (!rec) {
                rec = Ext.create('security.model.RootGroup');
            }
            f.loadRecord(rec);
        });
    },
    
    saveRootGroup: function() {
    	var win = this.getRootGroupWin(),
        f = win.child('form').getForm();
    
	    if (f.isValid()) {
	        f.updateRecord();
	        var rootGroupStore = this.getRootGroupGrid().getStore(),
	            rootGroup = f.getRecord();
	        
	        rootGroup.set('parent', null);
	        rootGroup.set('nodetype', 'root');
	        
	        rootGroup.save({
	            success: function(rootGroup) {
	                win.hide();
	                rootGroupStore.loadPage(1);
	            }
	        });
	    }
    },
    
    doAction: function(grid, cell, row, col, e, eOpts) {
        var rec = grid.getStore().getAt(row),
        	action = e.target.getAttribute('class');
        
        if (action.indexOf("x-action-col-0") != -1) { // edit user
            this.showRootGroupWin(e.target, e, eOpts, rec);
        } else if (action.indexOf("x-action-col-1") != -1) { // delete user
            this.deleteRootGroup(rec.get('id'));
        }
    },

    deleteRootGroup: function(id) {
        Ext.Msg.confirm('确认', '你确定要删除吗?', function(btn) {
            if (btn == 'yes') {
                var rootGroupStore = this.getRootGroupGrid().getStore();
                Ext.create('security.model.RootGroup', {
                    id: id
                }).destroy({
                    success: function() {
                    	rootGroupStore.loadPage(1);
                    }
                });
            }
        }, this);
    },
    
    onRootGroupGridSelectionChange: function(model, selected, eOpts) {

    	var treeStore = this.getGroupTree().getStore(),
	    accountGridStore = this.getAccountGrid().getStore();
    	
    	if(selected.length != 0) {
	
	    	treeStore.setRootNode({
	            text: selected[0].get('name'),
	            id: selected[0].get('id'),
	            expanded: true
	        });
	    	accountGridStore.removeAll();
    	} else {

    		treeStore.setRootNode({
	            text: '系统组织机构',
	            id: '1',
	            expanded: true
	        });
    	}
    },
    
    onGroupTreeItemcontextmenu: function(view, record, item, index, e, eOpts ) {
    	if(!this.ctmenu) {
			this.ctmenu = Ext.widget('menu', {
				width: 80,
				items:[{
					text: '添加部门',
					icon: 'icons/group_add.png',
					scope: this,
					handler: function(menuItem) {
						this.showGroupWin(menuItem, 'add');
					}
		        },'-',{
		        	text: '编辑部门',
		        	icon: 'icons/group_edit.png',
		        	scope: this,
					handler: function(menuItem) {
						this.showGroupWin(menuItem, 'edit');
					}
		        }]
		    });
		}
		e.preventDefault();
		this.ctmenu.showAt(e.getXY());
	},
	
	showGroupWin: function(menuItem, actionType) {
		
		var node = this.getGroupTree().getSelectionModel().getLastSelected();

		if(node.get('text') == '系统组织机构') { return; }
		
		if(node.get('nodetype') == 'B') {
			
			Ext.Msg.alert("提示","所选为部门，不能对其新增部门!");
			return;
		}
		
		
		if (!node.isExpanded()) {
			node.expand();
		}
		var win = Ext.getCmp('groupwin');
		if(!win) {
			win = Ext.widget('groupwin');
		}
		
		var f = win.child('form').getForm();
		
		if('add' == actionType) {

			var record = Ext.create('security.model.Group', {
				'parent': {id: node.get('id')}
			});
			
			f.loadRecord(record);			
			var parentText = node.get('text');
	        f.findField('parentText').setValue(parentText);
			win.show(menuItem);
		} else {
			
			node.set('parent', {id: node.parentNode.get('id')});
			 
			win.show(menuItem, function() {
	            f.loadRecord(node);	            
	            var parentText = node.parentNode.get('text');
	            f.findField('parentText').setValue(parentText);
	        });
		}
	},
	
    saveGroup: function(btn) {          
        
        var win = Ext.getCmp('groupwin'),
			f = win.child('form').getForm(),
			groupStore = this.getGroupStore();
        
        if (f.isValid()) {
            f.updateRecord();
            var group = f.getRecord();
            
            group.save({
                success: function(group) {
                    win.hide();
                }
            });
            
            if(group.get('id') == ''){
            	Ext.Msg.alert("提示","新增成功!");
            	groupStore.load();
            }else{
            	var node = this.getGroupTree().getSelectionModel().getLastSelected();
            	node.set('text', group.get('name'));
            	node.set('version', group.get('version')+1);
            	Ext.Msg.alert("提示","更新成功!");
            }
        }
    },
    
    onGroupTreeSelectionChange: function(model, selected, eOpts) {
    	
		if (selected && selected.length) {

			var record = selected[0], 
				groupId = record.get('id'), 
				accountStore = this.getAccountGrid().getStore();
			
			accountStore.setProxy({
		        type: 'rest',
		        url: 'accounts/findByGroupId'
		    });
			
			accountStore.getProxy().setExtraParam('groupId', groupId);
			accountStore.reload();
		}
    }

});
