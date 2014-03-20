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
(function(){var a="anonymous",b="...",c="qx.dev.StackTrace",d="",e="\n",f="?",g="/source/class/",h="Error created at",j="ecmascript.error.stacktrace",k="Backtrace:",l="stack",m=":",n=".",o="function",p="prototype",q="stacktrace";qx.Bootstrap.define(c,{statics:{FILENAME_TO_CLASSNAME:null,FORMAT_STACKTRACE:null,getStackTrace:function(){var t=[];try{throw new Error();}
catch(G){if(qx.dev.StackTrace.hasEnvironmentCheck&&qx.core.Environment.get(j)){var y=qx.dev.StackTrace.getStackTraceFromError(G);var B=qx.dev.StackTrace.getStackTraceFromCaller(arguments);qx.lang.Array.removeAt(y,0);t=B.length>y.length?B:y;for(var i=0;i<Math.min(B.length,y.length);i++ ){var w=B[i];if(w.indexOf(a)>=0){continue;}
;var s=null;var C=w.split(n);var v=/(.*?)\(/.exec(C[C.length-1]);if(v&&v.length==2){s=v[1];C.pop();}
;if(C[C.length-1]==p){C.pop();}
;var E=C.join(n);var u=y[i];var F=u.split(m);var A=F[0];var z=F[1];var r;if(F[2]){r=F[2];}
;var x=null;if(qx.Class&&qx.Class.getByName(A)){x=A;}
else {x=E;}
;var D=x;if(s){D+=n+s;}
;D+=m+z;if(r){D+=m+r;}
;t[i]=D;}
;}
else {t=this.getStackTraceFromCaller(arguments);}
;}
;return t;}
,getStackTraceFromCaller:function(K){var J=[];var M=qx.lang.Function.getCaller(K);var H={};while(M){var L=qx.lang.Function.getName(M);J.push(L);try{M=M.caller;}
catch(N){break;}
;if(!M){break;}
;var I=qx.core.ObjectRegistry.toHashCode(M);if(H[I]){J.push(b);break;}
;H[I]=M;}
;return J;}
,getStackTraceFromError:function(bd){var T=[];var R,S,ba,Q,P,bf,bb;var bc=qx.dev.StackTrace.hasEnvironmentCheck?qx.core.Environment.get(j):null;if(bc===l){if(!bd.stack){return T;}
;R=/@(.+):(\d+)$/gm;while((S=R.exec(bd.stack))!=null){bb=S[1];Q=S[2];ba=this.__bA(bb);T.push(ba+m+Q);}
;if(T.length>0){return this.__bC(T);}
;R=/at (.*)/gm;var be=/\((.*?)(:[^\/].*)\)/;var Y=/(.*?)(:[^\/].*)/;while((S=R.exec(bd.stack))!=null){var X=be.exec(S[1]);if(!X){X=Y.exec(S[1]);}
;if(X){ba=this.__bA(X[1]);T.push(ba+X[2]);}
else {T.push(S[1]);}
;}
;}
else if(bc===q){var U=bd.stacktrace;if(!U){return T;}
;if(U.indexOf(h)>=0){U=U.split(h)[0];}
;R=/line\ (\d+?),\ column\ (\d+?)\ in\ (?:.*?)\ in\ (.*?):[^\/]/gm;while((S=R.exec(U))!=null){Q=S[1];P=S[2];bb=S[3];ba=this.__bA(bb);T.push(ba+m+Q+m+P);}
;if(T.length>0){return this.__bC(T);}
;R=/Line\ (\d+?)\ of\ linked\ script\ (.*?)$/gm;while((S=R.exec(U))!=null){Q=S[1];bb=S[2];ba=this.__bA(bb);T.push(ba+m+Q);}
;}
else if(bd.message&&bd.message.indexOf(k)>=0){var W=bd.message.split(k)[1].trim();var V=W.split(e);for(var i=0;i<V.length;i++ ){var O=V[i].match(/\s*Line ([0-9]+) of.* (\S.*)/);if(O&&O.length>=2){Q=O[1];bf=this.__bA(O[2]);T.push(bf+m+Q);}
;}
;}
else if(bd.sourceURL&&bd.line){T.push(this.__bA(bd.sourceURL)+m+bd.line);}
;return this.__bC(T);}
,__bA:function(bh){if(typeof qx.dev.StackTrace.FILENAME_TO_CLASSNAME==o){var bg=qx.dev.StackTrace.FILENAME_TO_CLASSNAME(bh);{}
;return bg;}
;return qx.dev.StackTrace.__bB(bh);}
,__bB:function(bk){var bl=g;var bi=bk.indexOf(bl);var bm=bk.indexOf(f);if(bm>=0){bk=bk.substring(0,bm);}
;var bj=(bi==-1)?bk:bk.substring(bi+bl.length).replace(/\//g,n).replace(/\.js$/,d);return bj;}
,__bC:function(bn){if(typeof qx.dev.StackTrace.FORMAT_STACKTRACE==o){bn=qx.dev.StackTrace.FORMAT_STACKTRACE(bn);{}
;}
;return bn;}
},defer:function(bo){bo.hasEnvironmentCheck=qx.bom.client.EcmaScript&&qx.bom.client.EcmaScript.getStackTrace;}
});}
)();
(function(){var a="qx.util.RingBuffer";qx.Bootstrap.define(a,{extend:Object,construct:function(b){this.setMaxEntries(b||50);}
,members:{__jo:0,__jp:0,__jq:false,__jr:0,__js:null,__jt:null,setMaxEntries:function(c){this.__jt=c;this.clear();}
,getMaxEntries:function(){return this.__jt;}
,addEntry:function(d){this.__js[this.__jo]=d;this.__jo=this.__ju(this.__jo,1);var e=this.getMaxEntries();if(this.__jp<e){this.__jp++ ;}
;if(this.__jq&&(this.__jr<e)){this.__jr++ ;}
;}
,mark:function(){this.__jq=true;this.__jr=0;}
,clearMark:function(){this.__jq=false;}
,getAllEntries:function(){return this.getEntries(this.getMaxEntries(),false);}
,getEntries:function(f,j){if(f>this.__jp){f=this.__jp;}
;if(j&&this.__jq&&(f>this.__jr)){f=this.__jr;}
;if(f>0){var h=this.__ju(this.__jo,-1);var g=this.__ju(h,-f+1);var i;if(g<=h){i=this.__js.slice(g,h+1);}
else {i=this.__js.slice(g,this.__jp).concat(this.__js.slice(0,h+1));}
;}
else {i=[];}
;return i;}
,clear:function(){this.__js=new Array(this.getMaxEntries());this.__jp=0;this.__jr=0;this.__jo=0;}
,__ju:function(n,l){var k=this.getMaxEntries();var m=(n+l)%k;if(m<0){m+=k;}
;return m;}
}});}
)();
(function(){var a="qx.log.appender.RingBuffer";qx.Bootstrap.define(a,{extend:qx.util.RingBuffer,construct:function(b){this.setMaxMessages(b||50);}
,members:{setMaxMessages:function(c){this.setMaxEntries(c);}
,getMaxMessages:function(){return this.getMaxEntries();}
,process:function(d){this.addEntry(d);}
,getAllLogEvents:function(){return this.getAllEntries();}
,retrieveLogEvents:function(e,f){return this.getEntries(e,f);}
,clearHistory:function(){this.clear();}
}});}
)();
(function(){var a="qx.log.Logger",b="[",c="...(+",d="array",e=")",f="info",g="node",h="instance",j="string",k="null",m="error",n="#",o="class",p=": ",q="warn",r="document",s="{...(",t="",u="number",v="stringify",w="]",x="date",y="unknown",z="function",A="text[",B="[...(",C="boolean",D="\n",E=")}",F="debug",G=")]",H="map",I="undefined",J="object";qx.Bootstrap.define(a,{statics:{__jv:F,setLevel:function(K){this.__jv=K;}
,getLevel:function(){return this.__jv;}
,setTreshold:function(L){this.__jx.setMaxMessages(L);}
,getTreshold:function(){return this.__jx.getMaxMessages();}
,__jw:{},__cx:0,register:function(P){if(P.$$id){return;}
;var M=this.__cx++ ;this.__jw[M]=P;P.$$id=M;var N=this.__jy;var O=this.__jx.getAllLogEvents();for(var i=0,l=O.length;i<l;i++ ){if(N[O[i].level]>=N[this.__jv]){P.process(O[i]);}
;}
;}
,unregister:function(Q){var R=Q.$$id;if(R==null){return;}
;delete this.__jw[R];delete Q.$$id;}
,debug:function(T,S){qx.log.Logger.__jz(F,arguments);}
,info:function(V,U){qx.log.Logger.__jz(f,arguments);}
,warn:function(X,W){qx.log.Logger.__jz(q,arguments);}
,error:function(ba,Y){qx.log.Logger.__jz(m,arguments);}
,trace:function(bb){var bc=qx.dev.StackTrace.getStackTrace();qx.log.Logger.__jz(f,[(typeof bb!==I?[bb].concat(bc):bc).join(D)]);}
,deprecatedMethodWarning:function(bf,bd){{var be;}
;}
,deprecatedClassWarning:function(bi,bg){{var bh;}
;}
,deprecatedEventWarning:function(bl,event,bj){{var bk;}
;}
,deprecatedMixinWarning:function(bn,bm){{var bo;}
;}
,deprecatedConstantWarning:function(bs,bq,bp){{var self,br;}
;}
,deprecateMethodOverriding:function(bv,bu,bw,bt){{var bx;}
;}
,clear:function(){this.__jx.clearHistory();}
,__jx:new qx.log.appender.RingBuffer(50),__jy:{debug:0,info:1,warn:2,error:3},__jz:function(bz,bB){var bE=this.__jy;if(bE[bz]<bE[this.__jv]){return;}
;var by=bB.length<2?null:bB[0];var bD=by?1:0;var bA=[];for(var i=bD,l=bB.length;i<l;i++ ){bA.push(this.__jB(bB[i],true));}
;var bF=new Date;var bG={time:bF,offset:bF-qx.Bootstrap.LOADSTART,level:bz,items:bA,win:window};if(by){if(by.$$hash!==undefined){bG.object=by.$$hash;}
else if(by.$$type){bG.clazz=by;}
else if(by.constructor){bG.clazz=by.constructor;}
;}
;this.__jx.process(bG);var bC=this.__jw;for(var bH in bC){bC[bH].process(bG);}
;}
,__jA:function(bJ){if(bJ===undefined){return I;}
else if(bJ===null){return k;}
;if(bJ.$$type){return o;}
;var bI=typeof bJ;if(bI===z||bI==j||bI===u||bI===C){return bI;}
else if(bI===J){if(bJ.nodeType){return g;}
else if(bJ instanceof Error||(bJ.name&&bJ.message)){return m;}
else if(bJ.classname){return h;}
else if(bJ instanceof Array){return d;}
else if(bJ instanceof Date){return x;}
else {return H;}
;}
;if(bJ.toString){return v;}
;return y;}
,__jB:function(bP,bO){var bS=this.__jA(bP);var bM=y;var bL=[];switch(bS){case k:case I:bM=bS;break;case j:case u:case C:case x:bM=bP;break;case g:if(bP.nodeType===9){bM=r;}
else if(bP.nodeType===3){bM=A+bP.nodeValue+w;}
else if(bP.nodeType===1){bM=bP.nodeName.toLowerCase();if(bP.id){bM+=n+bP.id;}
;}
else {bM=g;}
;break;case z:bM=qx.lang.Function.getName(bP)||bS;break;case h:bM=bP.basename+b+bP.$$hash+w;break;case o:case v:bM=bP.toString();break;case m:bL=qx.dev.StackTrace.getStackTraceFromError(bP);bM=(bP.basename?bP.basename+p:t)+bP.toString();break;case d:if(bO){bM=[];for(var i=0,l=bP.length;i<l;i++ ){if(bM.length>20){bM.push(c+(l-i)+e);break;}
;bM.push(this.__jB(bP[i],false));}
;}
else {bM=B+bP.length+G;}
;break;case H:if(bO){var bK;var bR=[];for(var bQ in bP){bR.push(bQ);}
;bR.sort();bM=[];for(var i=0,l=bR.length;i<l;i++ ){if(bM.length>20){bM.push(c+(l-i)+e);break;}
;bQ=bR[i];bK=this.__jB(bP[bQ],false);bK.key=bQ;bM.push(bK);}
;}
else {var bN=0;for(var bQ in bP){bN++ ;}
;bM=s+bN+E;}
;break;};return {type:bS,text:bM,trace:bL};}
},defer:function(bT){var bU=qx.Bootstrap.$$logs;for(var i=0;i<bU.length;i++ ){bT.__jz(bU[i][0],bU[i][1]);}
;qx.Bootstrap.debug=bT.debug;qx.Bootstrap.info=bT.info;qx.Bootstrap.warn=bT.warn;qx.Bootstrap.error=bT.error;qx.Bootstrap.trace=bT.trace;}
});}
)();
(function(){var a="Use qx.dev.StackTrace.FORMAT_STACKTRACE instead",b="function",c="<span class='object'>",d="]:",e="&gt;",f="<span class='object' title='Object instance with hash code: ",g="FORMAT_STACK",h="string",k="level-",l="0",m="&lt;",n="<span class='offset'>",o="</span> ",p="}",q=":",r="qx.log.appender.Util",s="&amp;",t="&#39;",u="DIV",v="",w="]",x="'>",y="<span>",z="[",A=", ",B="</span>",C="\n",D="&quot;",E="<span class='type-key'>",F="{",G="</span>:<span class='type-",H="</span>: ",I=" ",J="]</span>: ",K="map",L="?",M="<span class='type-";qx.Bootstrap.define(r,{statics:{toHtml:function(V){var X=[];var T,W,O,Q;X.push(n,this.formatOffset(V.offset,6),o);if(V.object){var N=V.win.qx.core.ObjectRegistry.fromHashCode(V.object);if(N){X.push(f+N.$$hash+x,N.classname,z,N.$$hash,J);}
;}
else if(V.clazz){X.push(c+V.clazz.classname,H);}
;var P=V.items;for(var i=0,U=P.length;i<U;i++ ){T=P[i];W=T.text;if(W instanceof Array){var Q=[];for(var j=0,S=W.length;j<S;j++ ){O=W[j];if(typeof O===h){Q.push(y+this.escapeHTML(O)+B);}
else if(O.key){Q.push(E+O.key+G+O.type+x+this.escapeHTML(O.text)+B);}
else {Q.push(M+O.type+x+this.escapeHTML(O.text)+B);}
;}
;X.push(M+T.type+x);if(T.type===K){X.push(F,Q.join(A),p);}
else {X.push(z,Q.join(A),w);}
;X.push(B);}
else {X.push(M+T.type+x+this.escapeHTML(W)+o);}
;}
;var R=document.createElement(u);R.innerHTML=X.join(v);R.className=k+V.level;return R;}
,formatOffset:function(bb,length){var ba=bb.toString();var bc=(length||6)-ba.length;var Y=v;for(var i=0;i<bc;i++ ){Y+=l;}
;return Y+ba;}
,escapeHTML:function(bd){return String(bd).replace(/[<>&"']/g,this.__tC);}
,__tC:function(bf){var be={"<":m,">":e,"&":s,"'":t,'"':D};return be[bf]||L;}
,toText:function(bg){return this.toTextArray(bg).join(I);}
,toTextArray:function(bn){var bp=[];bp.push(this.formatOffset(bn.offset,6));if(bn.object){var bh=bn.win.qx.core.ObjectRegistry.fromHashCode(bn.object);if(bh){bp.push(bh.classname+z+bh.$$hash+d);}
;}
else if(bn.clazz){bp.push(bn.clazz.classname+q);}
;var bi=bn.items;var bl,bo;for(var i=0,bm=bi.length;i<bm;i++ ){bl=bi[i];bo=bl.text;if(bl.trace&&bl.trace.length>0){if(typeof (this.FORMAT_STACK)==b){qx.log.Logger.deprecatedConstantWarning(qx.log.appender.Util,g,a);bo+=C+this.FORMAT_STACK(bl.trace);}
else {bo+=C+bl.trace;}
;}
;if(bo instanceof Array){var bj=[];for(var j=0,bk=bo.length;j<bk;j++ ){bj.push(bo[j].text);}
;if(bl.type===K){bp.push(F,bj.join(A),p);}
else {bp.push(z,bj.join(A),w);}
;}
else {bp.push(bo);}
;}
;return bp;}
}});}
)();
(function(){var a="html.console",b="qx.log.appender.Native",c="log";qx.Bootstrap.define(b,{statics:{process:function(d){if(qx.core.Environment.get(a)){var f=console[d.level]?d.level:c;if(console[f]){var e=qx.log.appender.Util.toText(d);console[f](e);}
;}
;}
},defer:function(g){qx.log.Logger.register(g);}
});}
)();
(function(){var a="baselib.Log",b="qx.debug";qx.Bootstrap.define(a,{statics:{debug:function(d,c){if(qxWeb.env.get(b)){qx.Bootstrap.debug(d,c);}
;}
,info:function(f,e){if(qxWeb.env.get(b)){qx.Bootstrap.info(f,e);}
;}
,warn:function(h,g){if(qxWeb.env.get(b)){qx.Bootstrap.warn(h,g);}
;}
,error:function(j,i){if(qxWeb.env.get(b)){qx.Bootstrap.error(j,i);}
;}
,trace:function(k){if(qxWeb.env.get(b)){qx.Bootstrap.trace(k);}
;}
},defer:function(l){qxWeb.$attachStatic({log:{debug:l.debug,info:l.info,warn:l.warn,error:l.error,trace:l.trace}});}
});}
)();

})();