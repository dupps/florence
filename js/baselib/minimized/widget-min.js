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
(function(){var a="-",b="*[data-qx-class]",c="qx.ui.website.Widget",d="*",f="qx-",g="config",h="data-qx-class",i="$$qx-widget-initialized",j="-context",k="qx",l="disabled",m="templates",n=".",o="qx-widget",p="_";qx.Bootstrap.define(c,{extend:qxWeb,statics:{widget:function(){var q=new qx.ui.website.Widget(this);q.init();return q;}
,create:function(r){return new qx.ui.website.Widget(qxWeb.create(r));}
,onWidget:function(x,v,u,s){var t=this.classname.replace(/\./g,a)+j;if(!this.getProperty(t)){this.setProperty(t,u);}
;var w=this.getProperty(t);if(!this.hasListener(x,v,w)){this.on(x,v,w,s);}
;return this;}
,offWidget:function(z,y,C,B){var A=this.classname.replace(/\./g,a)+j;this._forEachElementWrapped(function(D){var E=D.getProperty(A);D.off(z,y,E,B);}
);return this;}
,initWidgets:function(){qxWeb(b)._forEachElementWrapped(function(F){F.init();}
);}
},construct:function(I,H){var G=qxWeb.call(this,I,H);Array.prototype.push.apply(this,Array.prototype.slice.call(G,0,G.length));}
,members:{__wS:null,init:function(){if(this.getProperty(i)){return false;}
;this.setAttribute(h,this.classname);this.addClass(o);this.addClass(this.getCssPrefix());this.setProperty(i,true);return true;}
,getCssPrefix:function(){if(!this.__wS){var J=this.classname.split(n);this.__wS=f+J[J.length-1].toLowerCase();}
;return this.__wS;}
,setEnabled:function(K){this.setAttribute(l,!K);this.find(d).setAttribute(l,!K);return this;}
,getEnabled:function(){return !this.getProperty(l);}
,setTemplate:function(name,L){return this._setData(m,name,L);}
,setConfig:function(name,M){return this._setData(g,name,M);}
,_setData:function(N,name,O){this.forEach(function(P){if(!P[N]){P[N]={};}
;P[N][name]=O;}
);return this;}
,getTemplate:function(name){return this._getData(m,name);}
,getConfig:function(name){return this._getData(g,name);}
,_getData:function(R,name){var S=this.getProperty(R);var Q;if(S){Q=S[name];}
;if(Q===undefined&&R==g){var T=k+qxWeb.string.firstUp(R)+qxWeb.string.firstUp(name);Q=this.getData(T);if(!this[0]||(!this[0].dataset&&Q===null)){Q=undefined;}
;try{Q=JSON.parse(Q);}
catch(e){}
;}
;if(Q===undefined&&this.constructor[p+R]){return this.constructor[p+R][name];}
;return Q;}
,render:function(){return this;}
,dispose:function(){this.removeAttribute(h);this.setProperty(g,undefined);this.setProperty(m,undefined);var U=this.classname.replace(/\./g,a)+j;this.setProperty(U,undefined);this.setProperty(i,undefined);this.removeClass(o);this.removeClass(this.getCssPrefix());for(var name in this.constructor.$$events){this.allOff(name);}
;return qxWeb.$init(this,qxWeb);}
},defer:function(V){qxWeb.$attach({onWidget:V.onWidget,offWidget:V.offWidget,widget:V.widget});qxWeb.$attachStatic({initWidgets:V.initWidgets});}
});}
)();

})();