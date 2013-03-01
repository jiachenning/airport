Ext.define('security.controller.GroupController', {
    extend: 'Ext.app.Controller',
    requires: ['security.view.group.GroupWin'],

    stores: ['Group'],
    
    models: ['Group'],

    views: [
        'group.GroupTree',
        'group.GroupWin',
        'account.AccountGrid',
        'group.GroupManagerPanel'      
    ],
    
    refs: [{
        ref: 'groupTree',
        selector: 'grouptree'
    },{
        ref: 'accountGrid',
        selector: 'panel[title="组织机构管理"] > accountgrid'
    }],

    init: function() {
    	
    	this.control({
    		'groupmgrpanel > grouptree': {
    			itemcontextmenu: this.onGroupTreeItemcontextmenu
    		},
    		'groupwin button[text="保存"]': {
                click: this.saveGroup
            },
            'panel[title="组织机构管理"] > grouptree': {
                selectionchange: this.onGroupTreeSelectionChange
            }
    	});
    },
    
    onGroupTreeItemcontextmenu: function(view, record, item, index, e, eOpts ) {
    	if(!this.ctmenu) {
			this.ctmenu = Ext.widget('menu', {
				width: 80,
				items:[{
					text: '添加部门',
					iconCls: 'silk-group_add',
					scope: this,
					handler: function(menuItem) {
						this.showGroupWin(menuItem, 'add');
					}
		        },'-',{
		        	text: '编辑部门',
		        	iconCls: 'silk-group_edit',
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
//            Ext.Ajax.request({
//                url: 'accounts/findByGroupId',
//                params: {
//                	groupId: groupId
//                },
//                success: function(response, options) {
//
//                	accountStore.reload();
//                },
//                scope: this
//            });
		}
    }

});
