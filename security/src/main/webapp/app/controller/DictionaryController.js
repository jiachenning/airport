Ext.define('security.controller.DictionaryController', {
    extend: 'Ext.app.Controller',
    stores: ['Dictionary', 'DictionaryManage'],

    views: [
        'dictionary.DictionaryManagePanel',
        'dictionary.DictionaryManageWin',
        'dictionary.DictionaryWin'
    ],
    
    refs: [{
        ref: 'dictionaryGrid',
        selector: 'dictionarymgrpanel > dictionarygrid'
    },{
        ref: 'dictionaryTree',
        selector: 'dictionarymgrpanel > dictionarytree'
    },{
        ref: 'dictionaryManageWin',
        selector: 'dictionarymgrwin'
    },{
        ref: 'dictionaryWin',
        selector: 'dictionarywin'
    }],

    init: function() {
    	
    	this.control({
    		'dictionarymgrpanel > dictionarytree': {
    			itemcontextmenu: this.onDictionaryTreeItemcontextmenu
    		},
            'dictionarymgrpanel > dictionarygrid button[tooltip="添加"]': {
                click: this.showDictionaryManageWin
            },
            'dictionarymgrpanel > dictionarytree button[tooltip="添加"]': {
                click: this.showDictionaryWin
            },
    		'dictionarywin button[text="保存"]': {
                click: this.saveDictionary
            },
            'dictionarymgrwin button[text="保存"]': {
                click: this.saveDictionaryManage
            },
            'dictionarymgrpanel > dictionarygrid actioncolumn': {
                click: this.doAction
            },'dictionarymgrpanel > dictionarygrid': {
                selectionchange: this.onDictionaryGridSelectionChange
            }
    	});
    },
    
    showDictionaryManageWin: function(btn, e, eOpts, rec) {

        var win = this.getDictionaryManageWin();

        if (!win) {
            win = Ext.widget('dictionarymgrwin');
        }
    	win.show(btn, function() {
            var f = win.child('form').getForm();
            if (!rec) {
                rec = Ext.create('security.model.DictionaryManage');
            }
            f.loadRecord(rec);
        });
    },
    
    showDictionaryWin: function(btn, opts) {

        var win = this.getDictionaryWin(),
        	node = this.getDictionaryTree().getSelectionModel().getLastSelected();
		
        if (node){
        	if (!node.isExpanded()) {
        		node.expand();
        	}
        }

        if (!win) {
            win = Ext.widget('dictionarywin');
        }
        var f = win.child('form').getForm();
        if(opts == 'add'){
        	win.option = 'add';
			var record = Ext.create('security.model.Dictionary', {
				'parent': {id: node.get('id')},
				'parentName': node.get('name')
			});
			f.loadRecord(record);
		}else if(opts == 'update'){
			win.option = 'update';
			node.set('parent', {id: node.parentNode.get('id')});
			node.set('parentName', node.parentNode.get('name'));
			f.loadRecord(node);
		}else {
			win.option = 'new';
			var record = Ext.create('security.model.Dictionary', {
				'parent': {id: '1'},
				'parentName': '根节点'
			});
			f.loadRecord(record);
		}
		
        win.show(btn);
    },
    
    onDictionaryTreeItemcontextmenu: function(view, record, item, index, e, eOpts ) {
    	if(!this.ctmenu) {
			this.ctmenu = Ext.widget('menu', {
				width: 80,
				items:[{
					text: '添加数据',
					icon: 'icons/group_add.png',
					scope: this,
					handler: function(menuItem) {
						this.showDictionaryWin(menuItem, 'add');
					}
		        },'-',{
		        	text: '编辑数据',
		        	icon: 'icons/group_edit.png',
		        	scope: this,
					handler: function(menuItem) {
						this.showDictionaryWin(menuItem, 'update');
					}
		        },'-',{
		        	text: '删除数据',
		        	scope: this,
		        	icon: 'icons/group_delete.png',
					handler: function(menuItem) {
						//this.deleteAuthority(menuItem);
					}
		        }]
		    });
		}
		e.preventDefault();
		this.ctmenu.showAt(e.getXY());
	},
	
	saveDictionary: function(btn) {          
		var win = this.getDictionaryWin(),
			f = win.child('form').getForm(),
			option = win.option,
			tree = this.getDictionaryTree();
		if(f.isValid()){
			f.updateRecord();
			var dictionary = f.getRecord();
			var selectedNode = tree.getSelectionModel().getLastSelected();
			dictionary.save({
                success: function() {
                    win.hide();
                }
            });
			if(option == 'new'){
				tree.setRootNode({
			        text: dictionary.get('name'),
			        id: dictionary.get('id'),
			        expanded: true
			    });
			}else if(option == 'add'){
            	if (selectedNode.isLeaf()) {
					selectedNode.set('leaf',false);
				}
            	Ext.Msg.alert('提示','新增成功!');
            	var store = tree.getStore();
            	store.load({
            		node: selectedNode
            	});
            }else if(option == 'update'){
                selectedNode.set('text', dictionary.get('name'));
                selectedNode.set('version', dictionary.get('version')+1);
            	Ext.Msg.alert('提示','更新成功!');
            }
		}
    },
    
    saveDictionaryManage: function(btn) {   
		var win = this.getDictionaryManageWin(),
			f = win.child('form').getForm(),
			gridStore = this.getDictionaryGrid().getStore();
		
		if(f.isValid()){
			f.updateRecord();
			var dictionaryManage = f.getRecord(),
				dictionaryId = dictionaryManage.get('dictionaryId');
			dictionaryManage.set('dictionary',{id:dictionaryId});
			dictionaryManage.save({
                success: function() {
                    win.hide();
                    gridStore.loadPage(1);
                }
            });
		}
    },
    
    doAction: function(grid, cell, row, col, e, eOpts) {
        var rec = grid.getStore().getAt(row),
        	action = e.target.getAttribute('class');
        
        if (action.indexOf("x-action-col-0") != -1) { // edit dictionary
            this.showDictionaryManageWin(e.target, e, eOpts, rec);
        } else if (action.indexOf("x-action-col-1") != -1) { // delete dictionary
            this.deleteDictionaryManage(rec.get('id'));
        } 
    },
    deleteDictionaryManage: function(id) {
        Ext.Msg.confirm('确认', '你确定要删除吗?', function(btn) {
            if (btn == 'yes') {
                var gridStore = this.getDictionaryGrid().getStore();
                Ext.create('security.model.DictionaryManage', {
                    id: id
                }).destroy({
                    success: function() {
                    	gridStore.loadPage(1);
                    }
                });
            }
        }, this);
    },
    onDictionaryGridSelectionChange: function(model, selected, eOpts) {
    	if (selected.length) {
    		var dictionary = selected[0].get('dictionary'),
    			tree = this.getDictionaryTree();
    		tree.setRootNode({
		        text: dictionary.name,
		        id: dictionary.id,
		        expanded: true
		    });
			//tree.reload();
    	}
    }
	
});
