(function()
{
  // Make 'qx' available within this closure
  var qx = window.qxWeb.$$qx;

  // Make sure the namespaces are created with the correct root. In order to
  // isolate the qx within the closure we have to make sure that every new class
  // is created under the correct root (window.qxWeb.$$qx in this case)
  qx.Bootstrap.setRoot({ qx: window.qxWeb.$$qx,
                         baselib: window.baselib,
                         qui: window.qui });
  
  qx.$$packageData['0']={"locales":{},"resources":{},"translations":{"C":{},"en":{}}};
(function(){var a="qx.module.Dataset";qx.Bootstrap.define(a,{statics:{setData:function(name,b){this._forEachElement(function(c){qx.bom.element.Dataset.set(c,name,b);}
);return this;}
,getData:function(name){if(this[0]&&this[0].nodeType===1){return qx.bom.element.Dataset.get(this[0],name);}
;}
,getAllData:function(){if(this[0]&&this[0].nodeType===1){return qx.bom.element.Dataset.getAll(this[0]);}
;return {};}
,removeData:function(name){if(this[0]&&this[0].nodeType===1){qx.bom.element.Dataset.remove(this[0],name);}
;return this;}
},defer:function(d){qxWeb.$attach({"getData":d.getData,"setData":d.setData,"removeData":d.removeData,"getAllData":d.getAllData});}
});}
)();
(function(){var a="qx.bom.element.Dataset",b="data-",c="^data-(.*)";qx.Bootstrap.define(a,{statics:{set:function(e,name,d){if(e.dataset){name=qx.lang.String.camelCase(name);if(d==null){delete e.dataset[name];}
else {e.dataset[name]=d;}
;}
else {if(d===undefined){d=null;}
;qx.bom.element.Attribute.set(e,b+qx.lang.String.hyphenate(name),d);}
;}
,get:function(g,name){if(g.dataset){name=qx.lang.String.camelCase(name);return g.dataset[name];}
else {var f=b+qx.lang.String.hyphenate(name);return g.hasAttribute(f)?qx.bom.element.Attribute.get(g,f):undefined;}
;}
,getAll:function(l){if(l.dataset){return l.dataset;}
else {var h={},j=l.attributes;for(var i=0;i<j.length;i++ ){if(j[i].name.match(RegExp(c))){var k=RegExp.$1;h[qx.lang.String.camelCase(k)]=l.getAttribute(j[i].name);}
;}
;return h;}
;}
,remove:function(m,name){this.set(m,name,undefined);}
}});}
)();

})();