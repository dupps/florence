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
(function(){var a="Microsoft.XMLHTTP",b="xhr",c="io.ssl",d="io.xhr",e="",f="file:",g="https:",h="webkit",i="gecko",j="activex",k="opera",l=".",m="io.maxrequests",n="qx.bom.client.Transport";qx.Bootstrap.define(n,{statics:{getMaxConcurrentRequestCount:function(){var p;var r=qx.bom.client.Engine.getVersion().split(l);var o=0;var s=0;var q=0;if(r[0]){o=r[0];}
;if(r[1]){s=r[1];}
;if(r[2]){q=r[2];}
;if(window.maxConnectionsPerServer){p=window.maxConnectionsPerServer;}
else if(qx.bom.client.Engine.getName()==k){p=8;}
else if(qx.bom.client.Engine.getName()==h){p=4;}
else if(qx.bom.client.Engine.getName()==i&&((o>1)||((o==1)&&(s>9))||((o==1)&&(s==9)&&(q>=1)))){p=6;}
else {p=2;}
;return p;}
,getSsl:function(){return window.location.protocol===g;}
,getXmlHttpRequest:function(){var t=window.ActiveXObject?(function(){if(window.location.protocol!==f){try{new window.XMLHttpRequest();return b;}
catch(u){}
;}
;try{new window.ActiveXObject(a);return j;}
catch(v){}
;}
)():(function(){try{new window.XMLHttpRequest();return b;}
catch(w){}
;}
)();return t||e;}
},defer:function(x){qx.core.Environment.add(m,x.getMaxConcurrentRequestCount);qx.core.Environment.add(c,x.getSsl);qx.core.Environment.add(d,x.getXmlHttpRequest);}
});}
)();
(function(){var a="baselib.Xhr";qx.Bootstrap.define(a,{statics:{xhr:function(b,f){if(!f){f={};}
;var d=new qx.bom.request.Xhr();d.open(f.method,b,f.async);if(f.header){var c=f.header;for(var e in c){d.setRequestHeader(e,c[e]);}
;}
;return d;}
},defer:function(g){qxWeb.$attachStatic({io:{xhr:g.xhr},xhr:g.xhr});}
});}
)();
(function(){var a="activex",b="No XHR support available.",c="If-None-Match",d="xhr",f="If-Modified-Since",g="engine.version",h="onunload",i="GET",j="-1",k="qx.debug.io",l="error",m="loadend",n="load",o="abort",p="browser.documentmode",q="",r="engine.name",s="Microsoft.XMLHTTP",t="Already disposed",u="browser.version",v="opera",w="qx.bom.request.Xhr",x="Not enough arguments",y="gecko",z="If-Match",A="mshtml",B="readystatechange",C="Microsoft.XMLDOM",D="file:",E="If-Range",F="Content-Type",G="io.xhr",H="on",I="timeout",J="undefined",K="Native XHR object doesn't support overrideMimeType.";qx.Bootstrap.define(w,{extend:Object,construct:function(){var L=qx.Bootstrap.bind(this.__dw,this);if(qx.event&&qx.event.GlobalError&&qx.event.GlobalError.observeMethod){this.__dg=qx.event.GlobalError.observeMethod(L);}
else {this.__dg=L;}
;this.__dh=qx.Bootstrap.bind(this.__dv,this);this.__di=qx.Bootstrap.bind(this.__dA,this);this.__du();this._emitter=new qx.event.Emitter();if(window.attachEvent){this.__dj=qx.Bootstrap.bind(this.__dD,this);window.attachEvent(h,this.__dj);}
;}
,statics:{UNSENT:0,OPENED:1,HEADERS_RECEIVED:2,LOADING:3,DONE:4},events:{"readystatechange":w,"error":w,"loadend":w,"timeout":w,"abort":w,"load":w},members:{readyState:0,responseText:q,responseXML:null,status:0,statusText:q,timeout:0,open:function(Q,M,N,P,O){this.__dF();if(typeof M===J){throw new Error(x);}
else if(typeof Q===J){Q=i;}
;this.__dk=false;this.__dl=false;this.__dm=false;this.__dn=M;if(typeof N==J){N=true;}
;this.__do=N;if(!this.__dE()&&this.readyState>qx.bom.request.Xhr.UNSENT){this.dispose();this.__du();}
;this.__dq.onreadystatechange=this.__dg;try{{}
;this.__dq.open(Q,M,N,P,O);}
catch(R){if(!qx.util.Request.isCrossDomain(M)){throw R;}
;if(!this.__do){this.__dp=R;}
;if(this.__do){if(window.XDomainRequest){this.readyState=4;this.__dq=new XDomainRequest();this.__dq.onerror=qx.Bootstrap.bind(function(){this._emit(B);this._emit(l);this._emit(m);}
,this);{}
;this.__dq.open(Q,M,N,P,O);return;}
;window.setTimeout(qx.Bootstrap.bind(function(){if(this.__ds){return;}
;this.readyState=4;this._emit(B);this._emit(l);this._emit(m);}
,this));}
;}
;if(qx.core.Environment.get(r)===A&&qx.core.Environment.get(p)<9&&this.__dq.readyState>0){this.__dq.setRequestHeader(f,j);}
;if(qx.core.Environment.get(r)===y&&parseInt(qx.core.Environment.get(g),10)<2&&!this.__do){this.readyState=qx.bom.request.Xhr.OPENED;this._emit(B);}
;}
,setRequestHeader:function(S,T){this.__dF();if(S==z||S==f||S==c||S==E){this.__dm=true;}
;this.__dq.setRequestHeader(S,T);return this;}
,send:function(U){this.__dF();if(!this.__do&&this.__dp){throw this.__dp;}
;if(qx.core.Environment.get(r)===v&&this.timeout===0){this.timeout=10000;}
;if(this.timeout>0){this.__dr=window.setTimeout(this.__di,this.timeout);}
;U=typeof U==J?null:U;try{{}
;this.__dq.send(U);}
catch(W){if(!this.__do){throw W;}
;if(this._getProtocol()===D){this.readyState=2;this.__dx();var V=this;window.setTimeout(function(){if(V.__ds){return;}
;V.readyState=3;V.__dx();V.readyState=4;V.__dx();}
);}
;}
;if(qx.core.Environment.get(r)===y&&!this.__do){this.__dw();}
;this.__dl=true;return this;}
,abort:function(){this.__dF();this.__dk=true;this.__dq.abort();if(this.__dq){this.readyState=this.__dq.readyState;}
;return this;}
,_emit:function(event){if(this[H+event]){this[H+event]();}
;this._emitter.emit(event,this);}
,onreadystatechange:function(){}
,onload:function(){}
,onloadend:function(){}
,onerror:function(){}
,onabort:function(){}
,ontimeout:function(){}
,on:function(name,X,Y){this._emitter.on(name,X,Y);return this;}
,getResponseHeader:function(ba){this.__dF();return this.__dq.getResponseHeader(ba);}
,getAllResponseHeaders:function(){this.__dF();return this.__dq.getAllResponseHeaders();}
,overrideMimeType:function(bb){this.__dF();if(this.__dq.overrideMimeType){this.__dq.overrideMimeType(bb);}
else {throw new Error(K);}
;return this;}
,getRequest:function(){return this.__dq;}
,dispose:function(){if(this.__ds){return false;}
;window.clearTimeout(this.__dr);if(window.detachEvent){window.detachEvent(h,this.__dj);}
;try{this.__dq.onreadystatechange;}
catch(bd){return false;}
;var bc=function(){}
;this.__dq.onreadystatechange=bc;this.__dq.onload=bc;this.__dq.onerror=bc;this.abort();this.__dq=null;this.__ds=true;return true;}
,isDisposed:function(){return !!this.__ds;}
,_createNativeXhr:function(){var be=qx.core.Environment.get(G);if(be===d){return new XMLHttpRequest();}
;if(be==a){return new window.ActiveXObject(s);}
;qx.Bootstrap.error(this,b);}
,_getProtocol:function(){var bf=this.__dn;var bg=/^(\w+:)\/\//;if(bf!==null&&bf.match){var bh=bf.match(bg);if(bh&&bh[1]){return bh[1];}
;}
;return window.location.protocol;}
,__dq:null,__do:null,__dg:null,__dh:null,__dj:null,__di:null,__dl:null,__dn:null,__dk:null,__dt:null,__ds:null,__dr:null,__dp:null,__dm:null,__du:function(){this.__dq=this._createNativeXhr();this.__dq.onreadystatechange=this.__dg;if(this.__dq.onabort){this.__dq.onabort=this.__dh;}
;this.__ds=this.__dl=this.__dk=false;}
,__dv:function(){if(!this.__dk){this.abort();}
;}
,__dw:function(){var bi=this.__dq,bj=true;{}
;if(this.readyState==bi.readyState){return;}
;this.readyState=bi.readyState;if(this.readyState===qx.bom.request.Xhr.DONE&&this.__dk&&!this.__dl){return;}
;if(!this.__do&&(bi.readyState==2||bi.readyState==3)){return;}
;this.status=0;this.statusText=this.responseText=q;this.responseXML=null;if(this.readyState>=qx.bom.request.Xhr.HEADERS_RECEIVED){try{this.status=bi.status;this.statusText=bi.statusText;this.responseText=bi.responseText;this.responseXML=bi.responseXML;}
catch(bk){bj=false;}
;if(bj){this.__dB();this.__dC();}
;}
;this.__dx();if(this.readyState==qx.bom.request.Xhr.DONE){if(bi){bi.onreadystatechange=function(){}
;}
;}
;}
,__dx:function(){var bl=this;if(this.readyState===qx.bom.request.Xhr.DONE){window.clearTimeout(this.__dr);}
;if(qx.core.Environment.get(r)==A&&qx.core.Environment.get(p)<8){if(this.__do&&!this.__dl&&this.readyState>=qx.bom.request.Xhr.LOADING){if(this.readyState==qx.bom.request.Xhr.LOADING){return;}
;if(this.readyState==qx.bom.request.Xhr.DONE){window.setTimeout(function(){if(bl.__ds){return;}
;bl.readyState=3;bl._emit(B);bl.readyState=4;bl._emit(B);bl.__dy();}
);return;}
;}
;}
;this._emit(B);if(this.readyState===qx.bom.request.Xhr.DONE){this.__dy();}
;}
,__dy:function(){if(this.__dt){this._emit(I);if(qx.core.Environment.get(r)===v){this._emit(l);}
;this.__dt=false;}
else {if(this.__dk){this._emit(o);}
else {if(this.__dz()){this._emit(l);}
else {this._emit(n);}
;}
;}
;this._emit(m);}
,__dz:function(){var bm;if(this._getProtocol()===D){bm=!this.responseText;}
else {bm=!this.statusText;}
;return bm;}
,__dA:function(){var bn=this.__dq;this.readyState=qx.bom.request.Xhr.DONE;this.__dt=true;bn.abort();this.responseText=q;this.responseXML=null;this.__dx();}
,__dB:function(){var bo=this.readyState===qx.bom.request.Xhr.DONE;if(this._getProtocol()===D&&this.status===0&&bo){if(!this.__dz()){this.status=200;}
;}
;if(this.status===1223){this.status=204;}
;if(qx.core.Environment.get(r)===v){if(bo&&this.__dm&&!this.__dk&&this.status===0){this.status=304;}
;}
;}
,__dC:function(){if(qx.core.Environment.get(r)==A&&(this.getResponseHeader(F)||q).match(/[^\/]+\/[^\+]+\+xml/)&&this.responseXML&&!this.responseXML.documentElement){var bp=new window.ActiveXObject(C);bp.async=false;bp.validateOnParse=false;bp.loadXML(this.responseText);this.responseXML=bp;}
;}
,__dD:function(){try{if(this){this.dispose();}
;}
catch(e){}
;}
,__dE:function(){var name=qx.core.Environment.get(r);var bq=qx.core.Environment.get(u);return !(name==A&&bq<9||name==y&&bq<3.5);}
,__dF:function(){if(this.__ds){throw new Error(t);}
;}
},defer:function(){qx.core.Environment.add(k,false);}
});}
)();

})();