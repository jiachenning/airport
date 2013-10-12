Ext.define('security.controller.DictionaryController', {
    extend: 'Ext.app.Controller',

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
            var typecode = f.findField('typecode');
            if (!rec) {
                rec = Ext.create('security.model.DictionaryManage');
                win.setTitle('新增字典');
                typecode.setVisible(true);
            }else{
            	win.setTitle('编辑字典');
            	typecode.setVisible(false);
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
				'parentName': node.get('text'),
				'typecode': node.get('typecode')
			});
			f.loadRecord(record);
		}else if(opts == 'update'){
			win.option = 'update';
			if (node.isRoot()){
				Ext.Msg.alert('提示','根节点不能修改!');
				return;
			}else {
				node.set('parent', {id: node.parentNode.get('id')});
				node.set('parentName', node.parentNode.get('text'));
			}
			f.loadRecord(node);
		}
		
        win.show(btn);
    },
    
    onDictionaryTreeItemcontextmenu: function(view, record, item, index, e, eOpts ) {
    	if(!this.ctmenu) {
			this.ctmenu = Ext.widget('menu', {
				width: 80,
				items:[{
					text: '添加字典',
					icon: 'icons/group_add.png',
					scope: this,
					handler: function(menuItem) {
						this.showDictionaryWin(menuItem, 'add');
					}
		        },'-',{
		        	text: '编辑字典',
		        	icon: 'icons/group_edit.png',
		        	scope: this,
					handler: function(menuItem) {
						this.showDictionaryWin(menuItem, 'update');
					}
		        },'-',{
		        	text: '删除字典',
		        	scope: this,
		        	icon: 'icons/group_delete.png',
					handler: function(menuItem) {
						this.deleteDictionary(menuItem);
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
			Ext.Ajax.request({
	            url: 'dictionary/validateDictionaryCode',
	            method: 'get',
	            params: {
	            	code : dictionary.get('code'),
	                id: dictionary.get('id')
	            },
	            success: function(response, options) {
	            	var respText = Ext.JSON.decode(response.responseText),
	            		json = eval('(' + respText + ')');
	            	if(json.success){
	            		dictionary.save({
	                        success: function() {
	                        	if(option == 'add'){
	                            	if (selectedNode.isLeaf()) {
	                					selectedNode.set('leaf',false);
	                				}
	                            	var store = tree.getStore();
	                            	store.load({
	                            		node: selectedNode
	                            	});
	                            	Ext.Msg.alert('提示','新增成功!');
	                            }else if(option == 'update'){
	                                selectedNode.set('text', dictionary.get('name'));
	                                selectedNode.set('version', dictionary.get('version')+1);
	                            	Ext.Msg.alert('提示','更新成功!');
	                            }
	                            win.hide();
	                        }
	                    });
              		}else 
              			Ext.Msg.alert('失败', '该字典代码已存在!');
	            }
	        });
			
		}
    },
    
    saveDictionaryManage: function(btn) {   
		var win = this.getDictionaryManageWin(),
			f = win.child('form').getForm(),
			gridStore = this.getDictionaryGrid().getStore();
		var id ;
		if(win.title == '编辑字典') {
			id = f.getRecord().get('id');
		} else {
			id = '999999';
		}
		
		
		if(f.isValid()){
			f.updateRecord();
			var dictionaryManage = f.getRecord(),
				dictionaryId = dictionaryManage.get('dictionaryId');
			dictionaryManage.set('dictionary',{id:dictionaryId});
			var id = dictionaryManage.get('id');
			Ext.Ajax.request({
	            url: 'dictionaryManage/validateDictionaryNameWithoutSelf',
	            method: 'get',
	            params: {
	            	name : dictionaryManage.get('name'),
	            	id : id 
	            },
	            success: function(response, options) {
	            	var respText = Ext.JSON.decode(response.responseText),
	            		json = eval('(' + respText + ')');
	            	if(json.success){
	            		dictionaryManage.save({
	                        success: function() {
	                            win.hide();
	                            gridStore.loadPage(1);
	                        }
	                    });
              		}else 
              			Ext.Msg.alert('失败', '该字典名称已存在!');
	            }
	        });
					
			//Ext.Msg.alert('提示','新增成功!');
		}
    },
    
    doAction: function(grid, cell, row, col, e, eOpts) {
        var rec = grid.getStore().getAt(row),
        	action = e.target.getAttribute('class');
        
        if (action.indexOf("x-action-col-0") != -1) { // edit dictionary
            this.showDictionaryManageWin(e.target, e, eOpts, rec);
        } else if (action.indexOf("x-action-col-1") != -1) { // delete dictionary
            this.deleteDictionaryManage(rec);
        } 
    },
    deleteDictionaryManage: function(rec) {
    	var gridStore = this.getDictionaryGrid().getStore();
    	Ext.Ajax.request({
            url: 'dictionary/isTypecodeExist',
            method: 'get',
            params: {
            	typecode : rec.get('typecode'),
            },
            success: function(response, options) {
            	var respText = Ext.JSON.decode(response.responseText),
            		json = eval('(' + respText + ')');
            	if(json.success){
            		Ext.Msg.confirm('提示', '你确定要删除吗?', function(btn) {
                        if (btn == 'yes') {
                            Ext.create('security.model.DictionaryManage', {
                                id: rec.get('id')
                            }).destroy({
                                success: function() {
                                	gridStore.loadPage(1);
                                }
                            });
                        }
                    });
          		}else 
          			Ext.Msg.alert('失败', '该字典类型有记录,请先删除记录!');
            }
        });
        
    },
    onDictionaryGridSelectionChange: function(model, selected, eOpts) {
    	if (selected.length) {
    		var tree = this.getDictionaryTree();
    		var store = tree.getStore();
    		store.setProxy({
    			type: 'rest',
    	        url: 'dictionary/findByParentId',
    	        extraParams:{
    	        	typecode : selected[0].get('typecode')
    	        }
    		});
    		tree.setRootNode({
		        text: selected[0].get('name'),
		        typecode: selected[0].get('typecode'),
		        id: 1,
		        expanded: true
		    });
    	}
    },
    deleteDictionary: function(menuItem) {
		var selectedNode = this.getDictionaryTree().getSelectionModel().getLastSelected(),
			parentNode = selectedNode.parentNode;
		if(selectedNode.isRoot()){
			Ext.Msg.alert('提示','根节点无法删除!');
			return;
		}
		if(selectedNode != null){
	        var isLeaf = selectedNode.isLeaf();
			if(isLeaf){
				Ext.Msg.show({
					title:'提示',
					msg: '确定删除节点?',
					buttons: Ext.Msg.YESNO,
					icon: Ext.Msg.QUESTION,
					fn: function(btn){
                        if(btn=='yes'){
                        	selectedNode.destroy({
                        		success: function() {
                        			if(parentNode.childNodes.length == 0 ){
                                		parentNode.set('leaf',true);
                                	}
                                }
                            });
				    	}
				    }
				});
			}else{
				Ext.Msg.alert('提示','请选择子节点删除!');
			}
		}else{
			Ext.Msg.alert('提示','请先选择一个节点!');
		}
    }
	
});
