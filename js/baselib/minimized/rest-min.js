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
(function(){var a="function",b="=?(\\w+)?}",c="' is invalid",d="loadEnd",f="Parameter '",g="GET",h="Method with name of action (",i="'",j="error",k="fail",l="get",m="{",n="success",o=") doesn't support other HTTP methods than 'GET'",p=") already exists",q="Error",r="",s="qx.bom.rest.Resource",t="Request (",u="Missing parameter '",v="Success",w="Content-Type",x="undefined",y="No route for action ";qx.Bootstrap.define(s,{extend:qx.event.Emitter,construct:function(z){this.__ec={};this.__ed={};this.__ee={};this.__ef={};try{if(typeof z!==x){{}
;this.__eo(z);}
;}
catch(e){this.dispose();throw e;}
;}
,events:{"success":s,"actionSuccess":s,"error":s,"actionError":s},statics:{POLL_THROTTLE_LIMIT:100,POLL_THROTTLE_COUNT:30,REQUIRED:true,placeholdersFromUrl:function(A){var C=/\{(\w+)(=\w+)?\}/g,D,B=[];while((D=C.exec(A))){B.push(D[1]);}
;return B;}
},members:{__ec:null,__ed:null,__eg:null,__ee:null,__ef:null,__eh:null,__ei:null,__ej:null,setRequestFactory:function(E){this.__ej=E;}
,setRequestHandler:function(F){this.__ei=F;}
,_getRequestHandler:function(){return (this.__ei===null)?{onsuccess:{callback:function(H,G){return function(){var I={"id":parseInt(H.toHashCode(),10),"response":H.getResponse(),"request":H,"action":G};this.emit(G+v,I);this.emit(n,I);}
;}
,context:this},onfail:{callback:function(K,J){return function(){var L={"id":parseInt(K.toHashCode(),10),"response":K.getResponse(),"request":K,"action":J};this.emit(J+q,L);this.emit(j,L);}
;}
,context:this},onloadend:{callback:function(N,M){return function(){N.dispose();}
;}
,context:this}}:this.__ei;}
,getRequestsByAction:function(O){var P=(this.__ec!==null&&O in this.__ec);return P?this.__ec[O]:null;}
,configureRequest:function(Q){this.__eh=Q;}
,_getRequest:function(){return (this.__ej===null)?new qx.bom.request.SimpleXhr():this.__ej();}
,__ek:function(R){var S=this._getRequest();if(!qx.lang.Type.isArray(this.__ec[R])){this.__ec[R]=[];}
;this.__ec[R].push(S);return S;}
,map:function(U,W,T,V){this.__ed[U]=[W,T,V];this.__ec[U]=[];if(U==l){this[U]=undefined;}
;if(typeof this[U]!==x&&this[U]!==null&&this[U].action!==true){throw new Error(h+U+p);}
;this.__ep(U+v);this.__ep(U+q);this[U]=qx.lang.Function.bind(function(){Array.prototype.unshift.call(arguments,U);return this.invoke.apply(this,arguments);}
,this);this[U].action=true;}
,invoke:function(bc,ba,X){var Y=this.__ek(bc),ba=ba==null?{}:ba,bd=this._getRequestConfig(bc,ba);this.__ed[bc].params=ba;this.__el(ba,bd.check);this.__em(Y,bd,X);if(this.__eh){this.__eh.call(this,Y,bc,ba,X);}
;this.__en(Y,bd,X);var bb=this._getRequestHandler();Y.addListenerOnce(n,bb.onsuccess.callback(Y,bc),bb.onsuccess.context);Y.addListenerOnce(k,bb.onfail.callback(Y,bc),bb.onfail.context);Y.addListenerOnce(d,bb.onloadend.callback(Y,bc),bb.onloadend.context);Y.send();return parseInt(Y.toHashCode(),10);}
,setBaseUrl:function(be){this.__eg=be;}
,__el:function(bf,bg){if(typeof bg!==x){{}
;Object.keys(bg).forEach(function(bh){{}
;if(bg[bh]===qx.bom.rest.Resource.REQUIRED&&typeof bf[bh]===x){throw new Error(u+bh+i);}
;if(!(bg[bh]&&typeof bg[bh].test==a)){return;}
;if(!bg[bh].test(bf[bh])){throw new Error(f+bh+c);}
;}
);}
;}
,__em:function(bj,bi,bk){bj.setUrl(bi.url);if(!bj.setMethod&&bi.method!==g){throw new Error(t+bj.classname+o);}
;if(bj.setMethod){bj.setMethod(bi.method);}
;if(bk){bj.setRequestData(bk);}
;}
,__en:function(bn,bl,bm){if(bm){var bo=bn.getRequestHeader(w);if(bn.getMethod&&qx.util.Request.methodAllowsRequestBody(bn.getMethod())){if(/application\/.*\+?json/.test(bo)){bm=qx.lang.Json.stringify(bm);bn.setRequestData(bm);}
;}
;}
;}
,abort:function(br){if(qx.lang.Type.isNumber(br)){var bu=br;var bt=qx.core.ObjectRegistry.getPostId();var bp=qx.core.ObjectRegistry.fromHashCode(bu+bt);if(bp){bp.abort();}
;}
else {var bs=br;var bq=this.__ec[bs];if(this.__ec[bs]){bq.forEach(function(bv){bv.abort();}
);}
;}
;}
,refresh:function(bw){this.invoke(bw,this.__ed[bw].params);}
,poll:function(bx,bz,bA,by){if(this.__ee[bx]){this.stopPollByAction(bx);}
;if(typeof bA==x){bA=this.__ed[bx].params;}
;if(by){this.invoke(bx,bA);}
;var bB=(function(bC){return function(){var bD=bC.__ec[bx][0];if(!by&&!bD){bC.invoke(bx,bA);return;}
;if(bD.isDone()||bD.isDisposed()){bC.refresh(bx);}
;}
;}
)(this);this._startPoll(bx,bB,bz);}
,_startPoll:function(bE,bF,bG){this.__ee[bE]={"id":window.setInterval(bF,bG),"interval":bG,"listener":bF};}
,stopPollByAction:function(bH){if(bH in this.__ee){var bI=this.__ee[bH].id;window.clearInterval(bI);}
;}
,restartPollByAction:function(bJ){if(bJ in this.__ee){var bK=this.__ee[bJ];this.stopPollByAction(bJ);this._startPoll(bJ,bK.listener,bK.interval);}
;}
,longPoll:function(bP){var bM=this,bO,bQ=0;function bL(){var bR=bO&&((new Date())-bO)<bM._getThrottleLimit();if(bR){bQ+=1;if(bQ>bM._getThrottleCount()){{}
;return true;}
;}
;if(!bR){bQ=0;}
;return false;}
;var bN=this.__ef[bP]=this.addListener(bP+v,function bS(){if(bM.isDisposed()){return;}
;if(!bL()){bO=new Date();bM.refresh(bP);}
;}
);this.invoke(bP);return bN;}
,_getRequestConfig:function(bX,bW){var bU=this.__ed[bX];var bW=qx.lang.Object.clone(bW);if(!qx.lang.Type.isArray(bU)){throw new Error(y+bX);}
;var bV=bU[0],bT=this.__eg!==null?this.__eg+bU[1]:bU[1],ca=bU[2],bY=qx.bom.rest.Resource.placeholdersFromUrl(bT);bW=bW||{};bY.forEach(function(cd){var cb=new RegExp(m+cd+b),cc=bT.match(cb)[1];if(typeof bW[cd]===x){if(cc){bW[cd]=cc;}
else {bW[cd]=r;}
;}
;bT=bT.replace(cb,bW[cd]);}
);return {method:bV,url:bT,check:ca};}
,_getThrottleLimit:function(){return qx.bom.rest.Resource.POLL_THROTTLE_LIMIT;}
,_getThrottleCount:function(){return qx.bom.rest.Resource.POLL_THROTTLE_COUNT;}
,__eo:function(ce){Object.keys(ce).forEach(function(cg){var ch=ce[cg],cj=ch.method,cf=ch.url,ci=ch.check;{}
;this.map(cg,cj,cf,ci);}
,this);}
,__ep:function(ck){if(!this.constructor.$$events){this.constructor.$$events={};}
;if(!this.constructor.$$events[ck]){this.constructor.$$events[ck]=s;}
;}
,isDisposed:function(){return this.$$disposed||false;}
,dispose:function(){if(this.$$disposed){return;}
;this.$$disposed=true;{}
;this.destruct();{var cm,cn,cl,co;}
;}
,destruct:function(){var cp;for(cp in this.__ec){if(this.__ec[cp]){this.__ec[cp].forEach(function(cr){cr.dispose();}
);}
;}
;if(this.__ee){for(cp in this.__ee){this.stopPollByAction(cp);}
;}
;if(this.__ef){for(cp in this.__ef){var cq=this.__ef[cp];this.removeListenerById(cq);}
;}
;this.__ec=this.__ed=this.__ee=null;}
}});}
)();
(function(){var a="baselib.Rest",b="object";qx.Bootstrap.define(a,{extend:qx.bom.rest.Resource,construct:function(c){this.__eq={};this.__er={};this.__es=c;var d=baselib.Rest;for(var p in c){if(c[p].headers){this.__eq[p]=c[p].headers;}
;if(d.__eu&&c[p].mock){this.__er[p]=c[p].mock;qxWeb.dev.fakeServer.configure(this.__ev());}
;}
;qx.bom.rest.Resource.apply(this,arguments);this.__et=false;for(var o in c){(function(o,self){if(self[o]){var e=self[o];self[o]=function(){if(!self.__et){var f=this.__configureRequestCallback;self.configureRequest(function(g){for(var h in self.__eq[o]){g.setRequestHeader(h,self.__eq[o][h]);}
;if(f){f.apply(self,arguments);}
;}
);self.__et=true;}
;e.apply(self,arguments);}
;}
;}
)(o,this);}
;}
,statics:{__eu:(typeof qxWeb.dev===b&&typeof qxWeb.dev.fakeServer===b),resource:function(i){return new baselib.Rest(i);}
},members:{__es:null,__eq:null,__er:null,__et:false,setRequestHeaders:function(j){for(var k in j){this.__eq[k]=j[k];}
;}
,fakeRequests:function(l){if(baselib.Rest.__eu){this.__er=l;qxWeb.dev.fakeServer.configure(this.__ev());}
;}
,restoreRequest:function(m){if(this.__es[m]){qxWeb.dev.fakeServer.removeResponse(this.__es[m].method,this.__es[m].url);}
;}
,restoreAll:function(){for(var n in this.__es){this.restoreRequest(n);}
;}
,__ev:function(){var r=[],q={},s={};for(var t in this.__er){q={};s=this.__er[t];if(this.__es[t]){q.method=this.__es[t].method;q.url=this.__es[t].url;q.response=[s.status,s.headers,qx.lang.Json.stringify(s.responseData)];r.push(q);}
;}
;return r;}
},defer:function(u){qxWeb.$attachStatic({rest:u.resource});}
});}
)();
(function(){var a="function",b="plugin.silverlight.version",c="Silverlight",d="Skype.Detection",f="QuickTimeCheckObject.QuickTimeCheck.1",g="Adobe Acrobat",h="plugin.windowsmedia",k="QuickTime",l="plugin.silverlight",m="pdf",n="wmv",o="qx.bom.client.Plugin",p="application/x-skype",q="plugin.divx",r="Chrome PDF Viewer",s="divx",t="Windows Media",u="",v="mshtml",w="skype.click2call",x="plugin.skype",y="plugin.gears",z="plugin.quicktime",A="plugin.windowsmedia.version",B="quicktime",C="DivX Web Player",D="AgControl.AgControl",E="Microsoft.XMLHTTP",F="silverlight",G="plugin.pdf",H="plugin.pdf.version",I="MSXML2.DOMDocument.6.0",J="WMPlayer.OCX.7",K="AcroPDF.PDF",L="plugin.activex",M="plugin.quicktime.version",N="plugin.divx.version",O="npdivx.DivXBrowserPlugin.1",P="object";qx.Bootstrap.define(o,{statics:{getGears:function(){return !!(window.google&&window.google.gears);}
,getActiveX:function(){if(typeof window.ActiveXObject===a){return true;}
;try{return (typeof (new window.ActiveXObject(E))===P||typeof (new window.ActiveXObject(I))===P);}
catch(Q){return false;}
;}
,getSkype:function(){if(qx.bom.client.Plugin.getActiveX()){try{new ActiveXObject(d);return true;}
catch(e){}
;}
;var R=navigator.mimeTypes;if(R){if(p in R){return true;}
;for(var i=0;i<R.length;i++ ){var S=R[i];if(S.type.indexOf(w)!=-1){return true;}
;}
;}
;return false;}
,__ew:{quicktime:{plugin:[k],control:f},wmv:{plugin:[t],control:J},divx:{plugin:[C],control:O},silverlight:{plugin:[c],control:D},pdf:{plugin:[r,g],control:K}},getQuicktimeVersion:function(){var T=qx.bom.client.Plugin.__ew[B];return qx.bom.client.Plugin.__ex(T.control,T.plugin);}
,getWindowsMediaVersion:function(){var U=qx.bom.client.Plugin.__ew[n];return qx.bom.client.Plugin.__ex(U.control,U.plugin);}
,getDivXVersion:function(){var V=qx.bom.client.Plugin.__ew[s];return qx.bom.client.Plugin.__ex(V.control,V.plugin);}
,getSilverlightVersion:function(){var W=qx.bom.client.Plugin.__ew[F];return qx.bom.client.Plugin.__ex(W.control,W.plugin);}
,getPdfVersion:function(){var X=qx.bom.client.Plugin.__ew[m];return qx.bom.client.Plugin.__ex(X.control,X.plugin);}
,getQuicktime:function(){var Y=qx.bom.client.Plugin.__ew[B];return qx.bom.client.Plugin.__ey(Y.control,Y.plugin);}
,getWindowsMedia:function(){var ba=qx.bom.client.Plugin.__ew[n];return qx.bom.client.Plugin.__ey(ba.control,ba.plugin);}
,getDivX:function(){var bb=qx.bom.client.Plugin.__ew[s];return qx.bom.client.Plugin.__ey(bb.control,bb.plugin);}
,getSilverlight:function(){var bc=qx.bom.client.Plugin.__ew[F];return qx.bom.client.Plugin.__ey(bc.control,bc.plugin);}
,getPdf:function(){var bd=qx.bom.client.Plugin.__ew[m];return qx.bom.client.Plugin.__ey(bd.control,bd.plugin);}
,__ex:function(bl,bh){var be=qx.bom.client.Plugin.__ey(bl,bh);if(!be){return u;}
;if(qx.bom.client.Engine.getName()==v){var bf=new ActiveXObject(bl);try{var bj=bf.versionInfo;if(bj!=undefined){return bj;}
;bj=bf.version;if(bj!=undefined){return bj;}
;bj=bf.settings.version;if(bj!=undefined){return bj;}
;}
catch(bm){return u;}
;return u;}
else {var bk=navigator.plugins;var bi=/([0-9]\.[0-9])/g;for(var i=0;i<bk.length;i++ ){var bg=bk[i];for(var j=0;j<bh.length;j++ ){if(bg.name.indexOf(bh[j])!==-1){if(bi.test(bg.name)||bi.test(bg.description)){return RegExp.$1;}
;}
;}
;}
;return u;}
;}
,__ey:function(bq,bo){if(qx.bom.client.Engine.getName()==v){var bn=window.ActiveXObject;if(!bn){return false;}
;try{new ActiveXObject(bq);}
catch(br){return false;}
;return true;}
else {var bp=navigator.plugins;if(!bp){return false;}
;var name;for(var i=0;i<bp.length;i++ ){name=bp[i].name;for(var j=0;j<bo.length;j++ ){if(name.indexOf(bo[j])!==-1){return true;}
;}
;}
;return false;}
;}
},defer:function(bs){qx.core.Environment.add(y,bs.getGears);qx.core.Environment.add(z,bs.getQuicktime);qx.core.Environment.add(M,bs.getQuicktimeVersion);qx.core.Environment.add(h,bs.getWindowsMedia);qx.core.Environment.add(A,bs.getWindowsMediaVersion);qx.core.Environment.add(q,bs.getDivX);qx.core.Environment.add(N,bs.getDivXVersion);qx.core.Environment.add(l,bs.getSilverlight);qx.core.Environment.add(b,bs.getSilverlightVersion);qx.core.Environment.add(G,bs.getPdf);qx.core.Environment.add(H,bs.getPdfVersion);qx.core.Environment.add(L,bs.getActiveX);qx.core.Environment.add(x,bs.getSkype);}
});}
)();
(function(){var a="prop",b="qx.bom.client.Json",c="repl",d="JSON",e='{"x":1}',f="json",g="val";qx.Bootstrap.define(b,{statics:{getJson:function(){return (qx.Bootstrap.getClass(window.JSON)==d&&JSON.parse(e).x===1&&JSON.stringify({"prop":g},function(k,v){return k===a?c:v;}
).indexOf(c)>0);}
},defer:function(h){qx.core.Environment.add(f,h.getJson);}
});}
)();
(function(){var a="\x00\b\n\f\r\t",b="-",c="function",d="[null,null,null]",e="T",f="+",g=",\n",h="constructor",i="{\n",j='"+275760-09-13T00:00:00.000Z"',k="true",l="\\n",m="false",n='"-271821-04-20T00:00:00.000Z"',o="json",p='object',q='""',r="qx.lang.Json",s="{}",t="hasOwnProperty",u="@",v="prototype",w='hasOwnProperty',x='"',y="toLocaleString",z="0",A='function',B="",C='\\"',D="\t",E="string",F="}",G="\r",H="toJSON",I=":",J="[\n 1,\n 2\n]",K="\\f",L='"1969-12-31T23:59:59.999Z"',M="/",N="\\b",O="Z",P="\\t",Q="\b",R="[object Number]",S="isPrototypeOf",T="{",U="toString",V="0x",W="[1]",X="\\r",Y="]",bH=",",bI="null",bO="\\u00",bL="\n",bM="json-stringify",bG="[]",bN="1",bR="000000",bT="[object Boolean]",bS="valueOf",cb="\\\\",bP="[object String]",bJ="json-parse",bK="bug-string-char-index",bQ="[object Array]",bW="$",cm="[\n",bX='"-000001-01-01T00:00:00.000Z"',bY="[",bU="[null]",cj="\\",ca="[object Date]",bV='{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}',cc="a",cd=" ",ce=".",cf="[object Function]",ci="01",ck='"\t"',cl="propertyIsEnumerable",cg="\f",ch="object";qx.Bootstrap.define(r,{statics:{stringify:null,parse:null}});(function(window){var co={}.toString,cD,cN,cz;var cv=typeof define===c&&define.amd,cu=typeof exports==ch&&exports;if(cu||cv){if(typeof JSON==ch&&JSON){if(cu){cu.stringify=JSON.stringify;cu.parse=JSON.parse;}
else {cu=JSON;}
;}
else if(cv){cu=window.JSON={};}
;}
else {cu=window.JSON||(window.JSON={});}
;var cR=new Date(-3509827334573292);try{cR=cR.getUTCFullYear()==-109252&&cR.getUTCMonth()===0&&cR.getUTCDate()===1&&cR.getUTCHours()==10&&cR.getUTCMinutes()==37&&cR.getUTCSeconds()==6&&cR.getUTCMilliseconds()==708;}
catch(cW){}
;function cG(name){if(name==bK){return cc[0]!=cc;}
;var db,da=bV,de=name==o;if(de||name==bM||name==bJ){if(name==bM||de){var cX=cu.stringify,dd=typeof cX==c&&cR;if(dd){(db=function(){return 1;}
).toJSON=db;try{dd=cX(0)===z&&cX(new Number())===z&&cX(new String())==q&&cX(co)===cz&&cX(cz)===cz&&cX()===cz&&cX(db)===bN&&cX([db])==W&&cX([cz])==bU&&cX(null)==bI&&cX([cz,co,null])==d&&cX({"a":[db,true,false,null,a]})==da&&cX(null,db)===bN&&cX([1,2],null,1)==J&&cX(new Date(-8.64e15))==n&&cX(new Date(8.64e15))==j&&cX(new Date(-621987552e5))==bX&&cX(new Date(-1))==L;}
catch(df){dd=false;}
;}
;if(!de){return dd;}
;}
;if(name==bJ||de){var dc=cu.parse;if(typeof dc==c){try{if(dc(z)===0&&!dc(false)){db=dc(da);var cY=db[cc].length==5&&db[cc][0]===1;if(cY){try{cY=!dc(ck);}
catch(dg){}
;if(cY){try{cY=dc(ci)!==1;}
catch(dh){}
;}
;}
;}
;}
catch(di){cY=false;}
;}
;if(!de){return cY;}
;}
;return dd&&cY;}
;}
;if(!cG(o)){var cS=cf;var cK=ca;var cs=R;var cV=bP;var cO=bQ;var cC=bT;var cB=cG(bK);if(!cR){var cA=Math.floor;var cJ=[0,31,59,90,120,151,181,212,243,273,304,334];var cU=function(dj,dk){return cJ[dk]+365*(dj-1970)+cA((dj-1969+(dk=+(dk>1)))/4)-cA((dj-1901+dk)/100)+cA((dj-1601+dk)/400);}
;}
;if(!(cD={}.hasOwnProperty)){cD=function(dl){var dm={},dn;if((dm.__bD=null,dm.__bD={"toString":1},dm).toString!=co){cD=function(dp){var dq=this.__bD,dr=dp in (this.__bD=null,this);this.__bD=dq;return dr;}
;}
else {dn=dm.constructor;cD=function(ds){var parent=(this.constructor||dn).prototype;return ds in this&&!(ds in parent&&this[ds]===parent[ds]);}
;}
;dm=null;return cD.call(this,dl);}
;}
;var cE={'boolean':1,'number':1,'string':1,'undefined':1};var cM=function(dv,dt){var du=typeof dv[dt];return du==p?!!dv[dt]:!cE[du];}
;cN=function(dw,dx){var dC=0,dB,dz,dA,dy;(dB=function(){this.valueOf=0;}
).prototype.valueOf=0;dz=new dB();for(dA in dz){if(cD.call(dz,dA)){dC++ ;}
;}
;dB=dz=null;if(!dC){dz=[bS,U,y,cl,S,t,h];dy=function(dE,dF){var dG=co.call(dE)==cS,dH,length;var dD=!dG&&typeof dE.constructor!=A&&cM(dE,w)?dE.hasOwnProperty:cD;for(dH in dE){if(!(dG&&dH==v)&&dD.call(dE,dH)){dF(dH);}
;}
;for(length=dz.length;dH=dz[ --length];dD.call(dE,dH)&&dF(dH));}
;}
else if(dC==2){dy=function(dM,dI){var dL={},dJ=co.call(dM)==cS,dK;for(dK in dM){if(!(dJ&&dK==v)&&!cD.call(dL,dK)&&(dL[dK]=1)&&cD.call(dM,dK)){dI(dK);}
;}
;}
;}
else {dy=function(dQ,dN){var dO=co.call(dQ)==cS,dP,dR;for(dP in dQ){if(!(dO&&dP==v)&&cD.call(dQ,dP)&&!(dR=dP===h)){dN(dP);}
;}
;if(dR||cD.call(dQ,(dP=h))){dN(dP);}
;}
;}
;return dy(dw,dx);}
;if(!cG(bM)){var cQ={'92':cb,'34':C,'8':N,'12':K,'10':l,'13':X,'9':P};var cF=bR;var cT=function(dS,dT){return (cF+(dT||0)).slice(-dS);}
;var cy=bO;var cI=function(dV){var dX=x,dU=0,length=dV.length,dY=length>10&&cB,dW;if(dY){dW=dV.split(B);}
;for(;dU<length;dU++ ){var ea=dV.charCodeAt(dU);switch(ea){case 8:case 9:case 10:case 12:case 13:case 34:case 92:dX+=cQ[ea];break;default:if(ea<32){dX+=cy+cT(2,ea.toString(16));break;}
;dX+=dY?dW[dU]:cB?dV.charAt(dU):dV[dU];};}
;return dX+x;}
;var cp=function(ew,el,et,ei,eh,eu,ep){var eq=el[ew],es,ef,ec,eo,ev,em,ex,ek,ej,eb,er,eg,length,ed,en,ee;try{eq=el[ew];}
catch(ey){}
;if(typeof eq==ch&&eq){es=co.call(eq);if(es==cK&&!cD.call(eq,H)){if(eq>-1/0&&eq<1/0){if(cU){eo=cA(eq/864e5);for(ef=cA(eo/365.2425)+1970-1;cU(ef+1,0)<=eo;ef++ );for(ec=cA((eo-cU(ef,0))/30.42);cU(ef,ec+1)<=eo;ec++ );eo=1+eo-cU(ef,ec);ev=(eq%864e5+864e5)%864e5;em=cA(ev/36e5)%24;ex=cA(ev/6e4)%60;ek=cA(ev/1e3)%60;ej=ev%1e3;}
else {ef=eq.getUTCFullYear();ec=eq.getUTCMonth();eo=eq.getUTCDate();em=eq.getUTCHours();ex=eq.getUTCMinutes();ek=eq.getUTCSeconds();ej=eq.getUTCMilliseconds();}
;eq=(ef<=0||ef>=1e4?(ef<0?b:f)+cT(6,ef<0?-ef:ef):cT(4,ef))+b+cT(2,ec+1)+b+cT(2,eo)+e+cT(2,em)+I+cT(2,ex)+I+cT(2,ek)+ce+cT(3,ej)+O;}
else {eq=null;}
;}
else if(typeof eq.toJSON==c&&((es!=cs&&es!=cV&&es!=cO)||cD.call(eq,H))){eq=eq.toJSON(ew);}
;}
;if(et){eq=et.call(el,ew,eq);}
;if(eq===null){return bI;}
;es=co.call(eq);if(es==cC){return B+eq;}
else if(es==cs){return eq>-1/0&&eq<1/0?B+eq:bI;}
else if(es==cV){return cI(B+eq);}
;if(typeof eq==ch){for(length=ep.length;length-- ;){if(ep[length]===eq){throw TypeError();}
;}
;ep.push(eq);eb=[];ed=eu;eu+=eh;if(es==cO){for(eg=0,length=eq.length;eg<length;en||(en=true),eg++ ){er=cp(eg,eq,et,ei,eh,eu,ep);eb.push(er===cz?bI:er);}
;ee=en?(eh?cm+eu+eb.join(g+eu)+bL+ed+Y:(bY+eb.join(bH)+Y)):bG;}
else {cN(ei||eq,function(ez){var eA=cp(ez,eq,et,ei,eh,eu,ep);if(eA!==cz){eb.push(cI(ez)+I+(eh?cd:B)+eA);}
;en||(en=true);}
);ee=en?(eh?i+eu+eb.join(g+eu)+bL+ed+F:(T+eb.join(bH)+F)):s;}
;ep.pop();return ee;}
;}
;cu.stringify=function(eH,eG,eI){var eC,eD,eF;if(typeof eG==c||typeof eG==ch&&eG){if(co.call(eG)==cS){eD=eG;}
else if(co.call(eG)==cO){eF={};for(var eB=0,length=eG.length,eE;eB<length;eE=eG[eB++ ],((co.call(eE)==cV||co.call(eE)==cs)&&(eF[eE]=1)));}
;}
;if(eI){if(co.call(eI)==cs){if((eI-=eI%1)>0){for(eC=B,eI>10&&(eI=10);eC.length<eI;eC+=cd);}
;}
else if(co.call(eI)==cV){eC=eI.length<=10?eI:eI.slice(0,10);}
;}
;return cp(B,(eE={},eE[B]=eH,eE),eD,eF,eC,B,[]);}
;}
;if(!cG(bJ)){var cx=String.fromCharCode;var cw={'92':cj,'34':x,'47':M,'98':Q,'116':D,'110':bL,'102':cg,'114':G};var cn,cr;var ct=function(){cn=cr=null;throw SyntaxError();}
;var cP=function(){var eL=cr,length=eL.length,eK,eJ,eN,eM,eO;while(cn<length){eO=eL.charCodeAt(cn);switch(eO){case 9:case 10:case 13:case 32:cn++ ;break;case 123:case 125:case 91:case 93:case 58:case 44:eK=cB?eL.charAt(cn):eL[cn];cn++ ;return eK;case 34:for(eK=u,cn++ ;cn<length;){eO=eL.charCodeAt(cn);if(eO<32){ct();}
else if(eO==92){eO=eL.charCodeAt( ++cn);switch(eO){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:eK+=cw[eO];cn++ ;break;case 117:eJ= ++cn;for(eN=cn+4;cn<eN;cn++ ){eO=eL.charCodeAt(cn);if(!(eO>=48&&eO<=57||eO>=97&&eO<=102||eO>=65&&eO<=70)){ct();}
;}
;eK+=cx(V+eL.slice(eJ,cn));break;default:ct();};}
else {if(eO==34){break;}
;eO=eL.charCodeAt(cn);eJ=cn;while(eO>=32&&eO!=92&&eO!=34){eO=eL.charCodeAt( ++cn);}
;eK+=eL.slice(eJ,cn);}
;}
;if(eL.charCodeAt(cn)==34){cn++ ;return eK;}
;ct();default:eJ=cn;if(eO==45){eM=true;eO=eL.charCodeAt( ++cn);}
;if(eO>=48&&eO<=57){if(eO==48&&((eO=eL.charCodeAt(cn+1)),eO>=48&&eO<=57)){ct();}
;eM=false;for(;cn<length&&((eO=eL.charCodeAt(cn)),eO>=48&&eO<=57);cn++ );if(eL.charCodeAt(cn)==46){eN= ++cn;for(;eN<length&&((eO=eL.charCodeAt(eN)),eO>=48&&eO<=57);eN++ );if(eN==cn){ct();}
;cn=eN;}
;eO=eL.charCodeAt(cn);if(eO==101||eO==69){eO=eL.charCodeAt( ++cn);if(eO==43||eO==45){cn++ ;}
;for(eN=cn;eN<length&&((eO=eL.charCodeAt(eN)),eO>=48&&eO<=57);eN++ );if(eN==cn){ct();}
;cn=eN;}
;return +eL.slice(eJ,cn);}
;if(eM){ct();}
;if(eL.slice(cn,cn+4)==k){cn+=4;return true;}
else if(eL.slice(cn,cn+5)==m){cn+=5;return false;}
else if(eL.slice(cn,cn+4)==bI){cn+=4;return null;}
;ct();};}
;return bW;}
;var cH=function(eR){var eQ,eP;if(eR==bW){ct();}
;if(typeof eR==E){if((cB?eR.charAt(0):eR[0])==u){return eR.slice(1);}
;if(eR==bY){eQ=[];for(;;eP||(eP=true)){eR=cP();if(eR==Y){break;}
;if(eP){if(eR==bH){eR=cP();if(eR==Y){ct();}
;}
else {ct();}
;}
;if(eR==bH){ct();}
;eQ.push(cH(eR));}
;return eQ;}
else if(eR==T){eQ={};for(;;eP||(eP=true)){eR=cP();if(eR==F){break;}
;if(eP){if(eR==bH){eR=cP();if(eR==F){ct();}
;}
else {ct();}
;}
;if(eR==bH||typeof eR!=E||(cB?eR.charAt(0):eR[0])!=u||cP()!=I){ct();}
;eQ[eR.slice(1)]=cH(cP());}
;return eQ;}
;ct();}
;return eR;}
;var cL=function(eS,eT,eU){var eV=cq(eS,eT,eU);if(eV===cz){delete eS[eT];}
else {eS[eT]=eV;}
;}
;var cq=function(eW,eX,fa){var eY=eW[eX],length;if(typeof eY==ch&&eY){if(co.call(eY)==cO){for(length=eY.length;length-- ;){cL(eY,length,fa);}
;}
else {cN(eY,function(fb){cL(eY,fb,fa);}
);}
;}
;return fa.call(eW,eX,eY);}
;cu.parse=function(fc,ff){var fd,fe;cn=0;cr=B+fc;fd=cH(cP());if(cP()!=bW){ct();}
;cn=cr=null;return ff&&co.call(ff)==cS?cq((fe={},fe[B]=fd,fe),B,ff):fd;}
;}
;}
;if(cv){define(function(){return cu;}
);}
;}
(this));qx.lang.Json.stringify=window.JSON.stringify;qx.lang.Json.parse=window.JSON.parse;}
)();
(function(){var a='<\?xml version="1.0" encoding="utf-8"?>\n<',b="MSXML2.DOMDocument.3.0",c="qx.xml.Document",d="",e=" />",f="xml.domparser",g="SelectionLanguage",h="'",j="MSXML2.XMLHTTP.3.0",k="plugin.activex",m="No XML implementation available!",n="MSXML2.XMLHTTP.6.0",o="xml.implementation",p=" xmlns='",q="text/xml",r="XPath",s="MSXML2.DOMDocument.6.0",t="HTML";qx.Bootstrap.define(c,{statics:{DOMDOC:null,XMLHTTP:null,isXmlDocument:function(u){if(u.nodeType===9){return u.documentElement.nodeName!==t;}
else if(u.ownerDocument){return this.isXmlDocument(u.ownerDocument);}
else {return false;}
;}
,create:function(v,w){if(qx.core.Environment.get(k)){var x=new ActiveXObject(this.DOMDOC);if(this.DOMDOC==b){x.setProperty(g,r);}
;if(w){var y=a;y+=w;if(v){y+=p+v+h;}
;y+=e;x.loadXML(y);}
;return x;}
;if(qx.core.Environment.get(o)){return document.implementation.createDocument(v||d,w||d,null);}
;throw new Error(m);}
,fromString:function(A){if(qx.core.Environment.get(k)){var B=qx.xml.Document.create();B.loadXML(A);return B;}
;if(qx.core.Environment.get(f)){var z=new DOMParser();return z.parseFromString(A,q);}
;throw new Error(m);}
},defer:function(D){if(qx.core.Environment.get(k)){var C=[s,b];var E=[n,j];for(var i=0,l=C.length;i<l;i++ ){try{new ActiveXObject(C[i]);new ActiveXObject(E[i]);}
catch(F){continue;}
;D.DOMDOC=C[i];D.XMLHTTP=E[i];break;}
;}
;}
});}
)();
(function(){var a="function",b="xml.implementation",c="xml.attributens",d="xml.selectnodes",e="<a></a>",f="xml.getqualifieditem",g="SelectionLanguage",h="xml.getelementsbytagnamens",i="qx.bom.client.Xml",j="xml.domproperties",k="xml.selectsinglenode",l="1.0",m="xml.createnode",n="xml.domparser",o="getProperty",p="undefined",q="XML",r="string",s="xml.createelementns";qx.Bootstrap.define(i,{statics:{getImplementation:function(){return document.implementation&&document.implementation.hasFeature&&document.implementation.hasFeature(q,l);}
,getDomParser:function(){return typeof window.DOMParser!==p;}
,getSelectSingleNode:function(){return typeof qx.xml.Document.create().selectSingleNode!==p;}
,getSelectNodes:function(){return typeof qx.xml.Document.create().selectNodes!==p;}
,getElementsByTagNameNS:function(){return typeof qx.xml.Document.create().getElementsByTagNameNS!==p;}
,getDomProperties:function(){var t=qx.xml.Document.create();return (o in t&&typeof t.getProperty(g)===r);}
,getAttributeNS:function(){var u=qx.xml.Document.fromString(e).documentElement;return typeof u.getAttributeNS===a&&typeof u.setAttributeNS===a;}
,getCreateElementNS:function(){return typeof qx.xml.Document.create().createElementNS===a;}
,getCreateNode:function(){return typeof qx.xml.Document.create().createNode!==p;}
,getQualifiedItem:function(){var v=qx.xml.Document.fromString(e).documentElement;return typeof v.attributes.getQualifiedItem!==p;}
},defer:function(w){qx.core.Environment.add(b,w.getImplementation);qx.core.Environment.add(n,w.getDomParser);qx.core.Environment.add(k,w.getSelectSingleNode);qx.core.Environment.add(d,w.getSelectNodes);qx.core.Environment.add(h,w.getElementsByTagNameNS);qx.core.Environment.add(j,w.getDomProperties);qx.core.Environment.add(c,w.getAttributeNS);qx.core.Environment.add(s,w.getCreateElementNS);qx.core.Environment.add(m,w.getCreateNode);qx.core.Environment.add(f,w.getQualifiedItem);}
});}
)();
(function(){var a="error",b="",c="loadEnd",d="application/x-www-form-urlencoded",f="Cache-Control",g="Content-Type",h="fail",i="GET",j="success",k="undefined",l="POST",m="timeout",n="qx.bom.request.SimpleXhr",o="abort";qx.Bootstrap.define(n,{extend:Object,construct:function(p,q){if(p!==undefined){this.setUrl(p);}
;this.useCaching(true);this.setMethod((q!==undefined)?q:i);this._transport=this._registerTransportListener(this._createTransport());qx.core.ObjectRegistry.register(this);this.__ez={};this.__eA=this._createResponseParser();}
,members:{setRequestHeader:function(r,s){this.__ez[r]=s;return this;}
,getRequestHeader:function(t){return this.__ez[t];}
,setUrl:function(u){if(qx.lang.Type.isString(u)){this.__dn=u;}
;return this;}
,getUrl:function(){return this.__dn;}
,setMethod:function(v){if(qx.util.Request.isMethod(v)){this.__eB=v;}
;return this;}
,getMethod:function(){return this.__eB;}
,setRequestData:function(w){if(qx.lang.Type.isString(w)||qx.lang.Type.isObject(w)){this.__eC=w;}
;return this;}
,getRequestData:function(){return this.__eC;}
,getResponse:function(){if(this.__eD!==null){return this.__eD;}
else {return (this._transport.responseXML!==null)?this._transport.responseXML:this._transport.responseText;}
;return null;}
,getTransport:function(){return this._transport;}
,setParser:function(x){return this.__eA.setParser(x);}
,setTimeout:function(y){if(qx.lang.Type.isNumber(y)){this.__dt=y;}
;return this;}
,getTimeout:function(){return this.__dt;}
,useCaching:function(z){if(qx.lang.Type.isBoolean(z)){this.__d=z;}
;return this;}
,isCaching:function(){return this.__d;}
,isDone:function(){return (this._transport.readyState===qx.bom.request.Xhr.DONE);}
,toHashCode:function(){return this.$$hash;}
,isDisposed:function(){return !!this.__ds;}
,send:function(){var F=this.getTimeout(),C=(this.getRequestData()!==null),D=this.__ez.hasOwnProperty(f),A=qx.util.Request.methodAllowsRequestBody(this.getMethod()),G=this.getRequestHeader(g),B=this._serializeData(this.getRequestData(),G);if(this.getMethod()===i&&C){this.setUrl(qx.util.Uri.appendParamsToUrl(this.getUrl(),B));}
;if(this.isCaching()===false&&!D){this.setUrl(qx.util.Uri.appendParamsToUrl(this.getUrl(),{nocache:new Date().valueOf()}));}
;if(F){this._transport.timeout=F;}
;this._transport.open(this.getMethod(),this.getUrl(),true);for(var E in this.__ez){this._transport.setRequestHeader(E,this.__ez[E]);}
;if(!A){this._transport.send();}
else {if(typeof G===k){this._transport.setRequestHeader(g,d);}
;this._transport.send(B);}
;}
,abort:function(){this._transport.abort();return this;}
,dispose:function(){if(this._transport.dispose()){this.__eA=null;this.__ds=true;return true;}
;return false;}
,_transport:null,_createTransport:function(){return new qx.bom.request.Xhr();}
,_registerTransportListener:function(H){H.onreadystatechange=qx.lang.Function.bind(this._onReadyStateChange,this);H.onloadend=qx.lang.Function.bind(this._onLoadEnd,this);H.ontimeout=qx.lang.Function.bind(this._onTimeout,this);H.onerror=qx.lang.Function.bind(this._onError,this);H.onabort=qx.lang.Function.bind(this._onAbort,this);return H;}
,_createResponseParser:function(){return new qx.util.ResponseParser();}
,_setResponse:function(I){this.__eD=I;}
,_serializeData:function(M,L){var J=this.getMethod()===l,K=/application\/.*\+?json/.test(L);if(!M){return null;}
;if(qx.lang.Type.isString(M)){return M;}
;if(K&&(qx.lang.Type.isObject(M)||qx.lang.Type.isArray(M))){return qx.lang.Json.stringify(M);}
;if(qx.lang.Type.isObject(M)){return qx.util.Uri.toParameter(M,J);}
;return null;}
,__ez:null,__eC:null,__eB:b,__dn:b,__eD:null,__eA:null,__d:null,__dt:null,__ds:null,addListenerOnce:function(name,N,O){this._transport._emitter.once(name,N,O);return this;}
,_onReadyStateChange:function(){{}
;if(this.isDone()){this.__eE();}
;}
,__eE:function(){{}
;var Q=this._transport.responseText;var P=this._transport.getResponseHeader(g);if(qx.util.Request.isSuccessful(this._transport.status)){{}
;this._setResponse(this.__eA.parse(Q,P));this._transport._emit(j);}
else {try{this._setResponse(this.__eA.parse(Q,P));}
catch(e){}
;if(this._transport.status!==0){this._transport._emit(h);}
;}
;}
,_onLoadEnd:function(){this._transport._emit(c);}
,_onAbort:function(){this._transport._emit(o);}
,_onTimeout:function(){this._transport._emit(m);this._transport._emit(h);}
,_onError:function(){this._transport._emit(a);this._transport._emit(h);}
}});}
)();
(function(){var c="-",d="",e="qx.core.ObjectRegistry",f="Disposed ",g="$$hash",h="-0",j=" objects",k="Could not dispose object ",m=": ";qx.Bootstrap.define(e,{statics:{inShutDown:false,__eF:{},__bx:0,__by:[],__bz:d,__eG:{},register:function(n){var q=this.__eF;if(!q){return;}
;var p=n.$$hash;if(p==null){var o=this.__by;if(o.length>0&&true){p=o.pop();}
else {p=(this.__bx++ )+this.__bz;}
;n.$$hash=p;{}
;}
;{}
;q[p]=n;}
,unregister:function(r){var s=r.$$hash;if(s==null){return;}
;var t=this.__eF;if(t&&t[s]){delete t[s];this.__by.push(s);}
;try{delete r.$$hash;}
catch(u){if(r.removeAttribute){r.removeAttribute(g);}
;}
;}
,toHashCode:function(v){{}
;var x=v.$$hash;if(x!=null){return x;}
;var w=this.__by;if(w.length>0){x=w.pop();}
else {x=(this.__bx++ )+this.__bz;}
;return v.$$hash=x;}
,clearHashCode:function(y){{}
;var z=y.$$hash;if(z!=null){this.__by.push(z);try{delete y.$$hash;}
catch(A){if(y.removeAttribute){y.removeAttribute(g);}
;}
;}
;}
,fromHashCode:function(B){return this.__eF[B]||null;}
,shutdown:function(){this.inShutDown=true;var D=this.__eF;var F=[];for(var C in D){F.push(C);}
;F.sort(function(a,b){return parseInt(b,10)-parseInt(a,10);}
);var E,i=0,l=F.length;while(true){try{for(;i<l;i++ ){C=F[i];E=D[C];if(E&&E.dispose){E.dispose();}
;}
;}
catch(G){qx.Bootstrap.error(this,k+E.toString()+m+G,G);if(i!==l){i++ ;continue;}
;}
;break;}
;qx.Bootstrap.debug(this,f+l+j);delete this.__eF;}
,getRegistry:function(){return this.__eF;}
,getNextHash:function(){return this.__bx;}
,getPostId:function(){return this.__bz;}
,getStackTraces:function(){return this.__eG;}
},defer:function(H){if(window&&window.top){var frames=window.top.frames;for(var i=0;i<frames.length;i++ ){if(frames[i]===window){H.__bz=c+(i+1);return;}
;}
;}
;H.__bz=h;}
});}
)();
(function(){var a="HEAD",b="CONNECT",c="OPTIONS",d="PUT",e="GET",f="PATCH",g="//",h="DELETE",i="POST",j="TRACE",k="qx.util.Request";qx.Bootstrap.define(k,{statics:{isCrossDomain:function(l){var n=qx.util.Uri.parseUri(l),location=window.location;if(!location){return false;}
;var m=location.protocol;if(!(l.indexOf(g)!==-1)){return false;}
;if(m.substr(0,m.length-1)==n.protocol&&location.host===n.host&&location.port===n.port){return false;}
;return true;}
,isSuccessful:function(status){return (status>=200&&status<300||status===304);}
,isMethod:function(p){var o=[e,i,d,h,a,c,j,b,f];return (o.indexOf(p)!==-1)?true:false;}
,methodAllowsRequestBody:function(q){return !((/^(GET|HEAD)$/).test(q));}
}});}
)();
(function(){var a="function",b="qx.util.ResponseParser",c="";qx.Bootstrap.define(b,{construct:function(d){if(d!==undefined){this.setParser(d);}
;}
,statics:{PARSER:{json:qx.lang.Json.parse,xml:qx.xml.Document.fromString}},members:{__eA:null,parse:function(g,f){var e=this._getParser(f);if(typeof e===a){if(g!==c){return e.call(this,g);}
;}
;return g;}
,setParser:function(h){if(typeof qx.util.ResponseParser.PARSER[h]===a){return this.__eA=qx.util.ResponseParser.PARSER[h];}
;{}
;return this.__eA=h;}
,_getParser:function(j){var i=this.__eA,l=c,k=c;if(i){return i;}
;l=j||c;k=l.replace(/;.*$/,c);if(/^application\/(\w|\.)*\+?json$/.test(k)){i=qx.util.ResponseParser.PARSER.json;}
;if(/^application\/xml$/.test(k)){i=qx.util.ResponseParser.PARSER.xml;}
;if(/[^\/]+\/[^\+]+\+xml$/.test(l)){i=qx.util.ResponseParser.PARSER.xml;}
;return i;}
}});}
)();

})();