Ext.define('security.view.authority.AuthorityCheckedTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.authority-checked-tree',
    title: '资源树',
    useArrows: true,
    autoScroll: true, 
    rootVisible: false,
    setChildNode:function(childNodes,checked){
        var node;
        for(var i=0;i<childNodes.length;i++){
         node= childNodes[i];
         node.set('checked', checked);  
         if(node.childNodes.length>0){
         this.setChildNode(node.childNodes, checked); 
         }
        }
   },
   setParentNode:function(node,checked){
     node.set('checked', checked);  
     if(node.parentNode!=null){
     this.setParentNode(node.parentNode, checked); 
     }
      
   },
   listeners:{
    checkchange:function(node, checked,eOpts ){
      if(checked){
        if(node.parentNode!=null){
         this.setParentNode(node.parentNode,checked);
        }
       node.expand();
      }else{
      // node.collapse();
      }
      if(node.childNodes.length>0){
       this.setChildNode(node.childNodes,checked);
      }
    }    
   },
   initComponent : function(arguments) {
		var me = this;

		Ext.applyIf(me, {
			store: Ext.create('security.store.AuthorityChecked')
		});
		
		me.callParent(arguments);
		me.expandAll();
	}
});
