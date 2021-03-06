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
(function(){var a="qx.module.dev.FakeServer";qx.Bootstrap.define(a,{statics:{configure:function(b){qx.dev.FakeServer.getInstance().configure(b);}
,removeResponse:function(d,c){qx.dev.FakeServer.getInstance().removeResponse(d,c);}
,addFilter:function(e){qx.dev.FakeServer.getInstance().addFilter(e);}
,removeFilter:function(f){qx.dev.FakeServer.getInstance().removeFilter(f);}
,respondWith:function(i,h,g){qx.dev.FakeServer.getInstance().respondWith(i,h,g);}
,getFakeServer:function(){return qx.dev.FakeServer.getInstance().getFakeServer();}
,restore:function(){qx.dev.FakeServer.getInstance().restore();}
},defer:function(j){qxWeb.$attachStatic({"dev":{"fakeServer":{"configure":j.configure,"removeResponse":j.removeResponse,"addFilter":j.addFilter,"removeFilter":j.removeFilter,"respondWith":j.respondWith,"getFakeServer":j.getFakeServer,"restore":j.restore}}});}
});}
)();
(function(){var a=" is a singleton! It is not possible to instantiate it directly.",b="qx.dev.FakeServer",c=".*?",d="Use the static getInstance() method instead.";qx.Bootstrap.define(b,{extend:Object,construct:function(){var f=qx.dev.FakeServer;if(!f.$$allowconstruct){var e=f+a+d;throw new Error(e);}
;this.getFakeServer();this.__eH=[];}
,statics:{$$instance:null,$$allowconstruct:false,getInstance:function(){if(!this.$$instance){this.$$allowconstruct=true;this.$$instance=new this();delete this.$$allowconstruct;}
;return this.$$instance;}
},members:{__eI:null,__eJ:null,__eH:null,__eK:null,configure:function(h){h.forEach(function(n){var o=n.url instanceof RegExp?n.url:this._getRegExp(n.url);var m=[n.method,o];var k=false;for(var i=0,l=this.__eH.length;i<l;i++ ){var j=this.__eH[i];k=(j[0]==m[0]&&j[1]==m[1]);}
;if(!k){this.__eH.push(m);}
;this.respondWith(n.method,o,n.response);}
.bind(this));var g=this.__eK=this.__eL();this.addFilter(g);}
,addFilter:function(p){{}
;this.__eI.FakeXMLHttpRequest.addFilter(p);}
,removeFilter:function(q){qx.lang.Array.remove(this.__eI.FakeXMLHttpRequest.filters,q);}
,removeResponse:function(t,r){qx.lang.Array.remove(this.__eI.FakeXMLHttpRequest.filters,this.__eK);var s=r instanceof RegExp?r:this._getRegExp(r);this.__eH=this.__eH.filter(function(u){return (u[0]!=t||u[1].toString()!=s.toString());}
);this.__eJ.responses=this.__eJ.responses.filter(function(v){return (v.method!=t||v.url.toString()!=s.toString());}
);this.removeFilter(this.__eK);this.__eK=this.__eL();this.addFilter(this.__eK);}
,respondWith:function(y,x,w){this.__eJ.respondWith(y,x,w);}
,getFakeServer:function(){if(!this.__eJ){var z=this.__eI=qx.dev.unit.Sinon.getSinon();z.FakeXMLHttpRequest.useFilters=true;this.__eJ=z.sandbox.useFakeServer();this.__eJ.autoRespond=true;}
;return this.__eJ;}
,restore:function(){this.__eH=[];this.removeFilter(this.__eK);this.__eK=null;this.__eJ.restore();this.__eJ=null,this.getFakeServer();}
,_getRegExp:function(A){A=A.replace(/\{[^\/]*?\}/g,c);return new RegExp(A);}
,__eL:function(){var B=this.__eH;return function(I,D,F,C,H){for(var i=0,l=B.length;i<l;i++ ){var E=B[i][0];var G=B[i][1];if(I==E&&G.test(D)){return false;}
;}
;return true;}
;}
},destruct:function(){this.restore();this.__eJ=this.__eI=null;}
});}
)();
(function(){var c="html:",d="./sinon/mock",f="expected %n to always be called with match %*%C",g="./sinon/test",j="truthy",n="loadstart",q="at most ",r="\r\n",s="loadend",u="clearInterval",v="Not Acceptable",w="Expectation met: ",x="stub#",y="./sinon/sandbox",z="notCalled",A="stubbed",C="inherit",D="Requested Range Not Satisfiable",E="Date",G="expectedArguments",H='Async',I="expected %n to always be called with %1 as this but was called with %t",J="falsy",K="clock",L="calledOnce",M="', but no object with such a property was passed.",N="Last",O="Payment Required",P="calledWithMatch",Q="expected %n to be called thrice but was called %c%C",R="[object Date]",S="{\n  ",T=" cannot yield since it was not yet invoked.",U=":",V="(",W="sinon.testCase needs an object with test functions",X="called",Y="readystatechange",ba="callArgProps",bb="%",bc="[object Window]",bd="object is null",be="overrideMimeType",bf="hasOwn",bg="calledWith",bh=",\n  ",bi="=\"",bj="Precondition Failed",bk="./util/fake_timers",bl="Use Proxy",bm="any",bn="tick only understands numbers and 'h:m:s'",bo="_",bp="Forbidden",bq="contenteditable",br="path",bs="Request Timeout",bt="Found",bu="expected %n to never be called with match %*%C",bv="expected %n to always be called with exact arguments %*%C",bw="Fake XHR onreadystatechange handler",bx=" which is already wrapped",by="called in order but were called as ",bz="buster-core",bA="Method Not Allowed",bB=" received no arguments, expected ",bC="callbackArguments",bD=", [...",bE=" and at most ",bF=" Received [",bG="Temporary Redirect",bH="Not Found",bI="expected %n to be called with new",bJ=" already called ",bK=";",bL="alwaysCalledWithExactly",bM="    ",bN="Content-Type",bO="undefined",bP=" cannot call arg since it was not yet invoked.",bQ=" as thisValue, expected ",bR="notCalledWithMatch",bS="yieldOn",bT="../sinon",bU="array",bV="Expectation Failed",bW="responseXML",bX="Gone",bY=" is not stubbed",ca="Bad Request",cc="Unauthorized",cd="open",ce="send",cf=" times",cg="expected %n to be called twice but was called %c%C",ch=", expected ",ci="The constructor should be a function.",cj="{ ",ck="toString",cl="number",cm="Request Entity Too Large",cn="expected %n to be called with match %*%C",co="INVALID_STATE_ERR",cp="[",cq="Attempted to wrap ",cr=" received wrong arguments ",cs="alwaysCalledOn",ct="ExpectationError",cu="Matcher expected",cv="Unsupported Media Type",cw="yield",cx="p = (function proxy(",cy="Method wrapper should be function",cz="argument context is not an object",cA="once",cB="Expected type of ",cC='"',cD="null",cE="' is not number",cF="(\"",cG=", which is not a string.",cH="stub",cI="[, ...",cJ=";charset=utf-8",cK="expected %n to always be called with new",cL="AssertError",cM="crypto",cN="MSXML2.XMLHTTP.3.0",cO="mock",cP="util",cQ="setTimeout",cR="verify",cS="addEventListener",cT="function",cU="\n\n",cV=")",cW="Invalid time ",cX="Should wrap property of object",cY="text/plain;charset=utf-8",da="Moved Permanently",db="buster-format",dc="Multiple Choice",dd=" received too many arguments (",de="%n did not throw exception%C",df="assert",dg="Continue",dh="Unexpected call: ",di="server",dj="' since no callback was passed.",dk="yieldTo",dl="callArgWith",dm="export",dn="Not Modified",dp="'",dq=" threw exception: ",dr="sandbox",ds="Unprocessable Entity",dt="expected ",du=" is not a function",dv="threw",dw="method is falsy",dx="Expected ",dy="Switching Protocols",dz="clearTimeout",dA="a,b,c,d,e,f,g,h,i,j,k,l",dB=".and(",dC="boolean",dD="[object Array]",dE="restore",dF="Proxy Authentication Required",dG="expected %n to be called with %1 as this but was called with %t",dH="neverCalledWith",dI="alwaysReturned",dJ="calledWithExactly",dK="div",dL=" but was called %c%C",dM="), expected ",dN=", ",dO="type",dP="<",dQ="setInterval",dR='number',dS="thrice",dT="same(",dU="\n",dV=") { return p.invoke(func, this, slice.call(arguments)); });",dW="./sinon/test_case",dX="OK",dY=" received too few arguments (",ea="expected %n to be called once but was called %c%C",eb="fake is not a spy",ec="expectedThis",ed="twice",ee="sinon fake",ef="sinon.test needs to wrap a test function, got ",eg="InvalidBodyException",eh="./sinon/spy",ei="match(",ej="expected %n to be called with arguments %*%C",ek="callArgOnWith",el="expected %n to never be called with arguments %*%C",em="text/xml",en="TEMP",eo="argument at index ",ep="calledOn",eq=" => ",er="setRequestHeader",es="Gateway Timeout",et="spy",eu="calledWithNew",ev="Object",ew="[object HTMLDocument]",ex=" expected to yield to '",ey="target is null or undefined",ez="callArgAts",eA="defineVersionGetter",eB="calledThrice",eC="callCount",eD="spy#",eE="%n did not always throw exception%C",eF="win32",eG="Error",eH="regexp",eI="./sinon/stub",eJ="typeOf(\"",eK="Request:\n",eL=" property ",eM="expected %n to always be called with arguments %*%C",eN="status",eO="on",eP="getResponseHeader",eQ="\"",eR="at least ",eS="[object global]",eT="./sinon/collection",eU="anonymous mock expectation",eV=" cannot yield to '",eW="now should be milliseconds since UNIX epoch",eX="alwaysThrew",eY="}",fa="Bad Gateway",fb="\")",fc="",fd="yieldToOn",fe="]",ff="has",fg=", but was ",fh="expected %n to not have been called but was called %c%C",fi=" }",fj="Response:\n",fk="Reset Content",fl=">",fm="' is not a number",fo="called ",fp="Call id is not a number",fq="Non-Authoritative Information",fr="Not Implemented",fs="./sinon/assert",ft="Length Required",fu="Fake server response body should be string, but was ",fv="property",fw="load",fx="sha1",fy="Service Unavailable",fz="//",fA=" to be ",fB="callArg",fC="test",fD="Conflict",fE="alwaysCalledWithNew",fF="Anonymous mock",fG=" is not a function: ",fH="Refused to set unsafe header \"",fI="</",fJ="neverCalledWithMatch",fK="match(\"",fL="string",fM="Function requires at least 1 parameter",fN="defined",fO="removeEventListener",fP="returned",fQ='undefined',fR="[...]",fS="Fake server request processing",fT=" called with ",fU="() {}",fV="expected %n to have been called at least once but was never called",fW="instanceOf(",fX="Request-URI Too Long",fY=".or(",ga="alwaysCalledWith",gb="./buster-event-emitter",gc="alwaysCalledWithMatch",gd=" ",ge="No Content",gf="^",gg="callOrder",gh="./define-version-getter",gi="responseText",gj="Created",gk="argument index is not number",gl="requests",gm="statusText",gn="calledTwice",go="abort",gp="qx.dev.unit.Sinon",gq=": ",gr="No headers received",gs="Custom stub should be function",gt=" (",gu=" which is already ",gv="/tmp",gw="date",gx="spied on",gy="getAllResponseHeaders",gz="See Other",gA="Partial Content",gB="Accepted",gC="object",gD="Cannot stub non-existent own property ",gE="[Circular]",gF="callArgOn",gG=" cannot yield since no callback was passed.",gH="] ",gI="hex",gJ="./sinon/match",gK="Internal Server Error",gL="callbackContexts",gM="expected %n to be called with exact arguments %*%C",gN=" as function",gO="function ",gP="Attempted to respond to fake XMLHttpRequest with ",gQ=" !",gR="Request done",gS="Microsoft.XMLHTTP",gT="false",gU="notCalledWith",gV="expected %n to be called ",gW="Microsoft.XMLDOM",gX="' since it was not yet invoked.",gY=" expected to yield, but no callback was passed.",ha=",",hb="never called",hc="HTTP Version Not Supported";qx.Bootstrap.define(gp,{statics:{getSinon:null}});(function(){this.sinon=(function(){var buster=(function(setTimeout,B){var he=typeof require==cT&&typeof module==gC;var hg=typeof document!=bO&&document.createElement(dK);var F=function(){}
;var hd={bind:function hh(hj,hl){var hk=typeof hl==fL?hj[hl]:hl;var hi=Array.prototype.slice.call(arguments,2);return function(){var hm=hi.concat(Array.prototype.slice.call(arguments));return hk.apply(hj,hm);}
;}
,partial:function ho(hp){var hn=[].slice.call(arguments,1);return function(){return hp.apply(this,hn.concat([].slice.call(arguments)));}
;}
,create:function hq(hr){F.prototype=hr;return new F();}
,extend:function hu(ht){if(!ht){return;}
;for(var i=1,l=arguments.length,hs;i<l; ++i){for(hs in arguments[i]){ht[hs]=arguments[i][hs];}
;}
;return ht;}
,nextTick:function hv(hw){if(typeof process!=bO&&process.nextTick){return process.nextTick(hw);}
;setTimeout(hw,0);}
,functionName:function hy(hz){if(!hz)return fc;if(hz.displayName)return hz.displayName;if(hz.name)return hz.name;var hx=hz.toString().match(/function\s+([^\(]+)/m);return hx&&hx[1]||fc;}
,isNode:function hA(hB){if(!hg)return false;try{hB.appendChild(hg);hB.removeChild(hg);}
catch(e){return false;}
;return true;}
,isElement:function hC(hD){return hD&&hD.nodeType===1&&hd.isNode(hD);}
,isArray:function hE(hF){return Object.prototype.toString.call(hF)==dD;}
,flatten:function hI(hG){var hH=[],hG=hG||[];for(var i=0,l=hG.length;i<l; ++i){hH=hH.concat(hd.isArray(hG[i])?hI(hG[i]):hG[i]);}
;return hH;}
,each:function hL(hK,hJ){for(var i=0,l=hK.length;i<l; ++i){hJ(hK[i]);}
;}
,map:function hM(hN,hP){var hO=[];for(var i=0,l=hN.length;i<l; ++i){hO.push(hP(hN[i]));}
;return hO;}
,parallel:function hW(hQ,hV){function hR(hY,hX){if(typeof hV==cT){hV(hY,hX);hV=null;}
;}
;if(hQ.length==0){return hR(null,[]);}
;var hU=hQ.length,hS=[];function hT(ia){return function ib(ie,ic){if(ie){return hR(ie);}
;hS[ia]=ic;if( --hU==0){hR(null,hS);}
;}
;}
;for(var i=0,l=hQ.length;i<l; ++i){hQ[i](hT(i));}
;}
,series:function ih(ig,ik){function im(iq,ip){if(typeof ik==cT){ik(iq,ip);}
;}
;var io=ig.slice();var ii=[];function il(){if(io.length==0)return im(null,ii);var ir=io.shift()(ij);if(ir&&typeof ir.then==cT){ir.then(hd.partial(ij,null),ij);}
;}
;function ij(iu,it){if(iu)return im(iu);ii.push(it);il();}
;il();}
,countdown:function iv(iw,ix){return function(){if( --iw==0)ix();}
;}
};if(typeof process===gC&&typeof require===cT&&typeof module===gC){var crypto=require(cM);var hf=require(br);hd.tmpFile=function(iy){var iz=crypto.createHash(fx);iz.update(iy);var iA=iz.digest(gI);if(process.platform==eF){return hf.join(process.env[en],iA);}
else {return hf.join(gv,iA);}
;}
;}
;if(Array.prototype.some){hd.some=function(iC,iD,iB){return iC.some(iD,iB);}
;}
else {hd.some=function(iF,iG,iE){if(iF==null){throw new TypeError();}
;iF=Object(iF);var iH=iF.length>>>0;if(typeof iG!==cT){throw new TypeError();}
;for(var i=0;i<iH;i++ ){if(iF.hasOwnProperty(i)&&iG.call(iE,iF[i],i,iF)){return true;}
;}
;return false;}
;}
;if(Array.prototype.filter){hd.filter=function(iJ,iK,iI){return iJ.filter(iK,iI);}
;}
else {hd.filter=function(iP,iO){if(this==null){throw new TypeError();}
;var t=Object(this);var iN=t.length>>>0;if(typeof iP!=cT){throw new TypeError();}
;var iM=[];for(var i=0;i<iN;i++ ){if(i in t){var iL=t[i];if(iP.call(iO,iL,i,t)){iM.push(iL);}
;}
;}
;return iM;}
;}
;if(he){module.exports=hd;hd.eventEmitter=require(gb);Object.defineProperty(hd,eA,{get:function(){return require(gh);}
});}
;return hd.extend(B||{},hd);}
(setTimeout,buster));if(typeof buster===bO){var buster={};}
;if(typeof module===gC&&typeof require===cT){buster=require(bz);}
;buster.format=buster.format||{};buster.format.excludeConstructors=[ev,/^.$/];buster.format.quoteStrings=true;buster.format.ascii=(function(){var iT=Object.prototype.hasOwnProperty;var iS=[];if(typeof global!=bO){iS.push({obj:global,value:eS});}
;if(typeof document!=bO){iS.push({obj:document,value:ew});}
;if(typeof window!=bO){iS.push({obj:window,value:bc});}
;function iQ(iV){var k=Object.keys&&Object.keys(iV)||[];if(k.length==0){for(var iW in iV){if(iT.call(iV,iW)){k.push(iW);}
;}
;}
;return k.sort();}
;function iU(iX,iY){if(typeof iX!=gC){return false;}
;for(var i=0,l=iY.length;i<l; ++i){if(iY[i]===iX){return true;}
;}
;return false;}
;function iR(jc,jd,ja){if(typeof jc==fL){var jb=typeof this.quoteStrings!=dC||this.quoteStrings;return jd||jb?cC+jc+cC:jc;}
;if(typeof jc==cT&&!(jc instanceof RegExp)){return iR.func(jc);}
;jd=jd||[];if(iU(jc,jd)){return gE;}
;if(Object.prototype.toString.call(jc)==dD){return iR.array.call(this,jc,jd);}
;if(!jc){return fc+jc;}
;if(buster.isElement(jc)){return iR.element(jc);}
;if(typeof jc.toString==cT&&jc.toString!==Object.prototype.toString){return jc.toString();}
;for(var i=0,l=iS.length;i<l;i++ ){if(jc===iS[i].obj){return iS[i].value;}
;}
;return iR.object.call(this,jc,jd,ja);}
;iR.func=function(je){return gO+buster.functionName(je)+fU;}
;iR.array=function(jf,jg){jg=jg||[];jg.push(jf);var jh=[];for(var i=0,l=jf.length;i<l; ++i){jh.push(iR.call(this,jf[i],jg));}
;return cp+jh.join(dN)+fe;}
;iR.object=function(jl,jp,jj){jp=jp||[];jp.push(jl);jj=jj||0;var jr=[],js=iQ(jl),jm,jq,jo;var jk=fc;var length=3;for(var i=0,l=jj;i<l; ++i){jk+=gd;}
;for(i=0,l=js.length;i<l; ++i){jm=js[i];jo=jl[jm];if(iU(jo,jp)){jq=gE;}
else {jq=iR.call(this,jo,jp,jj+2);}
;jq=(/\s/.test(jm)?cC+jm+cC:jm)+gq+jq;length+=jq.length;jr.push(jq);}
;var ji=iR.constructorName.call(this,jl);var jn=ji?cp+ji+gH:fc;return (length+jj)>80?jn+S+jk+jr.join(bh+jk)+dU+jk+eY:jn+cj+jr.join(dN)+fi;}
;iR.element=function(jw){var jz=jw.tagName.toLowerCase();var jy=jw.attributes,jv,ju=[],jt;for(var i=0,l=jy.length;i<l; ++i){jv=jy.item(i);jt=jv.nodeName.toLowerCase().replace(c,fc);if(jt==bq&&jv.nodeValue==C){continue;}
;if(!!jv.nodeValue){ju.push(jt+bi+jv.nodeValue+eQ);}
;}
;var jx=dP+jz+(ju.length>0?gd:fc);var content=jw.innerHTML;if(content.length>20){content=content.substr(0,20)+fR;}
;var jA=jx+ju.join(gd)+fl+content+fI+jz+fl;return jA.replace(/ contentEditable="inherit"/,fc);}
;iR.constructorName=function(jC){var name=buster.functionName(jC&&jC.constructor);var jB=this.excludeConstructors||buster.format.excludeConstructors||[];for(var i=0,l=jB.length;i<l; ++i){if(typeof jB[i]==fL&&jB[i]==name){return fc;}
else if(jB[i].test&&jB[i].test(name)){return fc;}
;}
;return name;}
;return iR;}
());if(typeof module!=bO){module.exports=buster.format;}
;var sinon=(function(jE){var jL=typeof document!=bO&&document.createElement(dK);var jG=Object.prototype.hasOwnProperty;function jJ(jP){var jQ=false;try{jP.appendChild(jL);jQ=jL.parentNode==jP;}
catch(e){return false;}
finally{try{jP.removeChild(jL);}
catch(e){}
;}
;return jQ;}
;function jK(jR){return jL&&jR&&jR.nodeType===1&&jJ(jR);}
;function jN(jS){return typeof jS===cT||!!(jS&&jS.constructor&&jS.call&&jS.apply);}
;function jO(jU,jT){for(var jV in jT){if(!jG.call(jU,jV)){jU[jV]=jT[jV];}
;}
;}
;function jD(jW){return typeof jW===cT&&typeof jW.restore===cT&&jW.restore.sinon;}
;var jI={wrapMethod:function jX(jY,kd,ke){if(!jY){throw new TypeError(cX);}
;if(typeof ke!=cT){throw new TypeError(cy);}
;var kc=jY[kd];if(!jN(kc)){throw new TypeError(cq+(typeof kc)+eL+kd+gN);}
;if(kc.restore&&kc.restore.sinon){throw new TypeError(cq+kd+bx);}
;if(kc.calledBefore){var kb=!!kc.returns?A:gx;throw new TypeError(cq+kd+gu+kb);}
;var ka=jG.call(jY,kd);jY[kd]=ke;ke.displayName=kd;ke.restore=function(){if(!ka){delete jY[kd];}
;if(jY[kd]===ke){jY[kd]=kc;}
;}
;ke.restore.sinon=true;jO(ke,kc);return ke;}
,extend:function kh(kg){for(var i=1,l=arguments.length;i<l;i+=1){for(var kf in arguments[i]){if(arguments[i].hasOwnProperty(kf)){kg[kf]=arguments[i][kf];}
;if(arguments[i].hasOwnProperty(ck)&&arguments[i].toString!=kg.toString){kg.toString=arguments[i].toString;}
;}
;}
;return kg;}
,create:function ki(kj){var F=function(){}
;F.prototype=kj;return new F();}
,deepEqual:function ko(a,b){if(jI.match&&jI.match.isMatcher(a)){return a.test(b);}
;if(typeof a!=gC||typeof b!=gC){return a===b;}
;if(jK(a)||jK(b)){return a===b;}
;if(a===b){return true;}
;if((a===null&&b!==null)||(a!==null&&b===null)){return false;}
;var kl=Object.prototype.toString.call(a);if(kl!=Object.prototype.toString.call(b)){return false;}
;if(kl==dD){if(a.length!==b.length){return false;}
;for(var i=0,l=a.length;i<l;i+=1){if(!ko(a[i],b[i])){return false;}
;}
;return true;}
;if(kl==R){return a.valueOf()===b.valueOf();}
;var km,kn=0,kk=0;for(km in a){kn+=1;if(!ko(a[km],b[km])){return false;}
;}
;for(km in b){kk+=1;}
;return kn==kk;}
,functionName:function kq(kr){var name=kr.displayName||kr.name;if(!name){var kp=kr.toString().match(/function ([^\s\(]+)/);name=kp&&kp[1];}
;return name;}
,functionToString:function ks(){if(this.getCall&&this.callCount){var kt,ku,i=this.callCount;while(i-- ){kt=this.getCall(i).thisValue;for(ku in kt){if(kt[ku]===this){return ku;}
;}
;}
;}
;return this.displayName||ee;}
,getConfig:function(kv){var kw={};kv=kv||{};var kx=jI.defaultConfig;for(var ky in kx){if(kx.hasOwnProperty(ky)){kw[ky]=kv.hasOwnProperty(ky)?kv[ky]:kx[ky];}
;}
;return kw;}
,format:function(kz){return fc+kz;}
,defaultConfig:{injectIntoThis:true,injectInto:null,properties:[et,cH,cO,K,di,gl],useFakeTimers:true,useFakeServer:true},timesInWords:function kB(kA){return kA==1&&cA||kA==2&&ed||kA==3&&dS||(kA||0)+cf;}
,calledInOrder:function(kC){for(var i=1,l=kC.length;i<l;i++ ){if(!kC[i-1].calledBefore(kC[i])||!kC[i].called){return false;}
;}
;return true;}
,orderByFirstCall:function(kD){return kD.sort(function(a,b){var kE=a.getCall(0);var kH=b.getCall(0);var kG=kE&&kE.callId||-1;var kF=kH&&kH.callId||-1;return kG<kF?-1:1;}
);}
,log:function(){}
,logError:function(kK,kJ){var kI=kK+dq;jI.log(kI+cp+kJ.name+gH+kJ.message);if(kJ.stack){jI.log(kJ.stack);}
;setTimeout(function(){kJ.message=kI+kJ.message;throw kJ;}
,0);}
,typeOf:function(kM){if(kM===null){return cD;}
else if(kM===undefined){return bO;}
;var kL=Object.prototype.toString.call(kM);return kL.substring(8,kL.length-1).toLowerCase();}
,createStubInstance:function(kN){if(typeof kN!==cT){throw new TypeError(ci);}
;return jI.stub(jI.create(kN.prototype));}
,restore:function(kO){if(kO!==null&&typeof kO===gC){for(var kP in kO){if(jD(kO[kP])){kO[kP].restore();}
;}
;}
else if(jD(kO)){kO.restore();}
;}
};var jF=typeof module==gC&&typeof require==cT;if(jF){try{jE={format:require(db)};}
catch(e){}
;module.exports=jI;module.exports.spy=require(eh);module.exports.stub=require(eI);module.exports.mock=require(d);module.exports.collection=require(eT);module.exports.assert=require(fs);module.exports.sandbox=require(y);module.exports.test=require(g);module.exports.testCase=require(dW);module.exports.assert=require(fs);module.exports.match=require(gJ);}
;if(jE){var jM=jI.create(jE.format);jM.quoteStrings=false;jI.format=function(){return jM.ascii.apply(jM,arguments);}
;}
else if(jF){try{var jH=require(cP);jI.format=function(kQ){return typeof kQ==gC&&kQ.toString===Object.prototype.toString?jH.inspect(kQ):kQ;}
;}
catch(e){}
;}
;return jI;}
(typeof buster==gC&&buster));(function(kW){var kR=typeof module==gC&&typeof require==cT;if(!kW&&kR){kW=require(bT);}
;if(!kW){return;}
;function kU(lc,la,name){var lb=kW.typeOf(lc);if(lb!==la){throw new TypeError(cB+name+fA+la+fg+lb);}
;}
;var kT={toString:function(){return this.message;}
};function kV(ld){return kT.isPrototypeOf(ld);}
;function kS(lg,lf){if(lf===null||lf===undefined){return false;}
;for(var lh in lg){if(lg.hasOwnProperty(lh)){var le=lg[lh];var li=lf[lh];if(kX.isMatcher(le)){if(!le.test(li)){return false;}
;}
else if(kW.typeOf(le)===gC){if(!kS(le,li)){return false;}
;}
else if(!kW.deepEqual(le,li)){return false;}
;}
;}
;return true;}
;kT.or=function(ll){if(!kV(ll)){throw new TypeError(cu);}
;var lj=this;var lk=kW.create(kT);lk.test=function(lm){return lj.test(lm)||ll.test(lm);}
;lk.message=lj.message+fY+ll.message+cV;return lk;}
;kT.and=function(lp){if(!kV(lp)){throw new TypeError(cu);}
;var lo=this;var ln=kW.create(kT);ln.test=function(lq){return lo.test(lq)&&lp.test(lq);}
;ln.message=lo.message+dB+lp.message+cV;return ln;}
;var kX=function(ls,lu){var m=kW.create(kT);var lv=kW.typeOf(ls);switch(lv){case gC:if(typeof ls.test===cT){m.test=function(lw){return ls.test(lw)===true;}
;m.message=ei+kW.functionName(ls.test)+cV;return m;}
;var lr=[];for(var lt in ls){if(ls.hasOwnProperty(lt)){lr.push(lt+gq+ls[lt]);}
;}
;m.test=function(lx){return kS(ls,lx);}
;m.message=ei+lr.join(dN)+cV;break;case cl:m.test=function(ly){return ls==ly;}
;break;case fL:m.test=function(lz){if(typeof lz!==fL){return false;}
;return lz.indexOf(ls)!==-1;}
;m.message=fK+ls+fb;break;case eH:m.test=function(lA){if(typeof lA!==fL){return false;}
;return ls.test(lA);}
;break;case cT:m.test=ls;if(lu){m.message=lu;}
else {m.message=ei+kW.functionName(ls)+cV;}
;break;default:m.test=function(lB){return kW.deepEqual(ls,lB);}
;};if(!m.message){m.message=ei+ls+cV;}
;return m;}
;kX.isMatcher=kV;kX.any=kX(function(){return true;}
,bm);kX.defined=kX(function(lC){return lC!==null&&lC!==undefined;}
,fN);kX.truthy=kX(function(lD){return !!lD;}
,j);kX.falsy=kX(function(lE){return !lE;}
,J);kX.same=function(lF){return kX(function(lG){return lF===lG;}
,dT+lF+cV);}
;kX.typeOf=function(lH){kU(lH,fL,dO);return kX(function(lI){return kW.typeOf(lI)===lH;}
,eJ+lH+fb);}
;kX.instanceOf=function(lJ){kU(lJ,cT,dO);return kX(function(lK){return lK instanceof lJ;}
,fW+kW.functionName(lJ)+cV);}
;function kY(lM,lL){return function(lP,lQ){kU(lP,fL,fv);var lN=arguments.length===1;var lO=lL+cF+lP+eQ;if(!lN){lO+=dN+lQ;}
;lO+=cV;return kX(function(lR){if(lR===undefined||lR===null||!lM(lR,lP)){return false;}
;return lN||kW.deepEqual(lQ,lR[lP]);}
,lO);}
;}
;kX.has=kY(function(lT,lS){if(typeof lT===gC){return lS in lT;}
;return lT[lS]!==undefined;}
,ff);kX.hasOwn=kY(function(lV,lU){return lV.hasOwnProperty(lU);}
,bf);kX.bool=kX.typeOf(dC);kX.number=kX.typeOf(cl);kX.string=kX.typeOf(fL);kX.object=kX.typeOf(gC);kX.func=kX.typeOf(cT);kX.array=kX.typeOf(bU);kX.regexp=kX.typeOf(eH);kX.date=kX.typeOf(gw);if(kR){module.exports=kX;}
else {kW.match=kX;}
;}
(typeof sinon==gC&&sinon||null));var commonJSModule=typeof module==gC&&typeof require==cT;if(!this.sinon&&commonJSModule){var sinon=require(bT);}
;(function(ma){function lW(mf,md,me){var mc=ma.functionName(mf)+md;if(me.length){mc+=bF+lY.call(me).join(dN)+fe;}
;throw new Error(mc);}
;var lY=Array.prototype.slice;var lX={calledOn:function mg(mh){if(ma.match&&ma.match.isMatcher(mh)){return mh.test(this.thisValue);}
;return this.thisValue===mh;}
,calledWith:function mi(){for(var i=0,l=arguments.length;i<l;i+=1){if(!ma.deepEqual(arguments[i],this.args[i])){return false;}
;}
;return true;}
,calledWithMatch:function mk(){for(var i=0,l=arguments.length;i<l;i+=1){var mj=this.args[i];var ml=arguments[i];if(!ma.match||!ma.match(ml).test(mj)){return false;}
;}
;return true;}
,calledWithExactly:function mm(){return arguments.length==this.args.length&&this.calledWith.apply(this,arguments);}
,notCalledWith:function mn(){return !this.calledWith.apply(this,arguments);}
,notCalledWithMatch:function mo(){return !this.calledWithMatch.apply(this,arguments);}
,returned:function mp(mq){return ma.deepEqual(mq,this.returnValue);}
,threw:function mr(mt){if(typeof mt===bO||!this.exception){return !!this.exception;}
;return this.exception===mt||this.exception.name===mt;}
,calledWithNew:function mu(mv){return this.thisValue instanceof this.proxy;}
,calledBefore:function(mw){return this.callId<mw.callId;}
,calledAfter:function(mx){return this.callId>mx.callId;}
,callArg:function(my){this.args[my]();}
,callArgOn:function(mz,mA){this.args[mz].apply(mA);}
,callArgWith:function(mB){this.callArgOnWith.apply(this,[mB,null].concat(lY.call(arguments,1)));}
,callArgOnWith:function(mD,mE){var mC=lY.call(arguments,2);this.args[mD].apply(mE,mC);}
,"yield":function(){this.yieldOn.apply(this,[null].concat(lY.call(arguments,0)));}
,yieldOn:function(mG){var mF=this.args;for(var i=0,l=mF.length;i<l; ++i){if(typeof mF[i]===cT){mF[i].apply(mG,lY.call(arguments,1));return;}
;}
;lW(this.proxy,gG,mF);}
,yieldTo:function(mH){this.yieldToOn.apply(this,[mH,null].concat(lY.call(arguments,1)));}
,yieldToOn:function(mK,mJ){var mI=this.args;for(var i=0,l=mI.length;i<l; ++i){if(mI[i]&&typeof mI[i][mK]===cT){mI[i][mK].apply(mJ,lY.call(arguments,2));return;}
;}
;lW(this.proxy,eV+mK+dj,mI);}
,toString:function(){var mL=this.proxy.toString()+V;var mM=[];for(var i=0,l=this.args.length;i<l; ++i){mM.push(ma.format(this.args[i]));}
;mL=mL+mM.join(dN)+cV;if(typeof this.returnValue!=bO){mL+=eq+ma.format(this.returnValue);}
;if(this.exception){mL+=gQ+this.exception.name;if(this.exception.message){mL+=V+this.exception.message+cV;}
;}
;return mL;}
};lX.invokeCallback=lX.yield;function mb(mN,mP,mR,mS,mO,mT){if(typeof mT!==cl){throw new TypeError(fp);}
;var mQ=ma.create(lX);mQ.proxy=mN;mQ.thisValue=mP;mQ.args=mR;mQ.returnValue=mS;mQ.exception=mO;mQ.callId=mT;return mQ;}
;mb.toString=lX.toString;ma.spyCall=mb;}
(typeof sinon==gC&&sinon||null));(function(sinon){var commonJSModule=typeof module==gC&&typeof require==cT;var push=Array.prototype.push;var slice=Array.prototype.slice;var callId=0;function spy(mW,mU){if(!mU&&typeof mW==cT){return spy.create(mW);}
;if(!mW&&!mU){return spy.create(function(){}
);}
;var mV=mW[mU];return sinon.wrapMethod(mW,mU,spy.create(mV));}
;function matchingFake(mY,mX,na){if(!mY){return;}
;var nb=mX.length;for(var i=0,l=mY.length;i<l;i++ ){if(mY[i].matches(mX,na)){return mY[i];}
;}
;}
;function incrementCallCount(){this.called=true;this.callCount+=1;this.notCalled=false;this.calledOnce=this.callCount==1;this.calledTwice=this.callCount==2;this.calledThrice=this.callCount==3;}
;function createCallProperties(){this.firstCall=this.getCall(0);this.secondCall=this.getCall(1);this.thirdCall=this.getCall(2);this.lastCall=this.getCall(this.callCount-1);}
;var vars=dA;function createProxy(func){var p;if(func.length){eval(cx+vars.substring(0,func.length*2-1)+dV);}
else {p=function nc(){return p.invoke(func,this,slice.call(arguments));}
;}
;return p;}
;var uuid=0;var spyApi={reset:function(){this.called=false;this.notCalled=true;this.calledOnce=false;this.calledTwice=false;this.calledThrice=false;this.callCount=0;this.firstCall=null;this.secondCall=null;this.thirdCall=null;this.lastCall=null;this.args=[];this.returnValues=[];this.thisValues=[];this.exceptions=[];this.callIds=[];if(this.fakes){for(var i=0;i<this.fakes.length;i++ ){this.fakes[i].reset();}
;}
;}
,create:function nd(ne){var name;if(typeof ne!=cT){ne=function(){}
;}
else {name=sinon.functionName(ne);}
;var nf=createProxy(ne);sinon.extend(nf,spy);delete nf.create;sinon.extend(nf,ne);nf.reset();nf.prototype=ne.prototype;nf.displayName=name||et;nf.toString=sinon.functionToString;nf._create=sinon.spy.create;nf.id=eD+uuid++ ;return nf;}
,invoke:function ni(nh,nk,nj){var nm=matchingFake(this.fakes,nj);var ng,nl;incrementCallCount.call(this);push.call(this.thisValues,nk);push.call(this.args,nj);push.call(this.callIds,callId++ );try{if(nm){nl=nm.invoke(nh,nk,nj);}
else {nl=(this.func||nh).apply(nk,nj);}
;}
catch(e){push.call(this.returnValues,undefined);ng=e;throw e;}
finally{push.call(this.exceptions,ng);}
;push.call(this.returnValues,nl);createCallProperties.call(this);return nl;}
,getCall:function nn(i){if(i<0||i>=this.callCount){return null;}
;return sinon.spyCall(this,this.thisValues[i],this.args[i],this.returnValues[i],this.exceptions[i],this.callIds[i]);}
,calledBefore:function no(np){if(!this.called){return false;}
;if(!np.called){return true;}
;return this.callIds[0]<np.callIds[np.callIds.length-1];}
,calledAfter:function nr(nq){if(!this.called||!nq.called){return false;}
;return this.callIds[this.callCount-1]>nq.callIds[nq.callCount-1];}
,withArgs:function(){var ns=slice.call(arguments);if(this.fakes){var nu=matchingFake(this.fakes,ns,true);if(nu){return nu;}
;}
else {this.fakes=[];}
;var nt=this;var nv=this._create();nv.matchingAguments=ns;push.call(this.fakes,nv);nv.withArgs=function(){return nt.withArgs.apply(nt,arguments);}
;for(var i=0;i<this.args.length;i++ ){if(nv.matches(this.args[i])){incrementCallCount.call(nv);push.call(nv.thisValues,this.thisValues[i]);push.call(nv.args,this.args[i]);push.call(nv.returnValues,this.returnValues[i]);push.call(nv.exceptions,this.exceptions[i]);push.call(nv.callIds,this.callIds[i]);}
;}
;createCallProperties.call(nv);return nv;}
,matches:function(ny,nw){var nx=this.matchingAguments;if(nx.length<=ny.length&&sinon.deepEqual(nx,ny.slice(0,nx.length))){return !nw||nx.length==ny.length;}
;}
,printf:function(nC){var nz=this;var nA=slice.call(arguments,1);var nB;return (nC||fc).replace(/%(.)/g,function(nE,nD){nB=spyApi.formatters[nD];if(typeof nB==cT){return nB.call(null,nz,nA);}
else if(!isNaN(parseInt(nD),10)){return sinon.format(nA[nD-1]);}
;return bb+nD;}
);}
};function delegateToCalls(nH,nF,nG,nI){spyApi[nH]=function(){if(!this.called){if(nI){return nI.apply(this,arguments);}
;return false;}
;var nK;var nJ=0;for(var i=0,l=this.callCount;i<l;i+=1){nK=this.getCall(i);if(nK[nG||nH].apply(nK,arguments)){nJ+=1;if(nF){return true;}
;}
;}
;return nJ===this.callCount;}
;}
;delegateToCalls(ep,true);delegateToCalls(cs,false,ep);delegateToCalls(bg,true);delegateToCalls(P,true);delegateToCalls(ga,false,bg);delegateToCalls(gc,false,P);delegateToCalls(dJ,true);delegateToCalls(bL,false,dJ);delegateToCalls(dH,false,gU,function(){return true;}
);delegateToCalls(fJ,false,bR,function(){return true;}
);delegateToCalls(dv,true);delegateToCalls(eX,false,dv);delegateToCalls(fP,true);delegateToCalls(dI,false,fP);delegateToCalls(eu,true);delegateToCalls(fE,false,eu);delegateToCalls(fB,false,dl,function(){throw new Error(this.toString()+bP);}
);spyApi.callArgWith=spyApi.callArg;delegateToCalls(gF,false,ek,function(){throw new Error(this.toString()+bP);}
);spyApi.callArgOnWith=spyApi.callArgOn;delegateToCalls(cw,false,cw,function(){throw new Error(this.toString()+T);}
);spyApi.invokeCallback=spyApi.yield;delegateToCalls(bS,false,bS,function(){throw new Error(this.toString()+T);}
);delegateToCalls(dk,false,dk,function(nL){throw new Error(this.toString()+eV+nL+gX);}
);delegateToCalls(fd,false,fd,function(nM){throw new Error(this.toString()+eV+nM+gX);}
);spyApi.formatters={"c":function(nN){return sinon.timesInWords(nN.callCount);}
,"n":function(nO){return nO.toString();}
,"C":function(nP){var nQ=[];for(var i=0,l=nP.callCount;i<l; ++i){var nR=bM+nP.getCall(i).toString();if(/\n/.test(nQ[i-1])){nR=dU+nR;}
;push.call(nQ,nR);}
;return nQ.length>0?dU+nQ.join(dU):fc;}
,"t":function(nS){var nT=[];for(var i=0,l=nS.callCount;i<l; ++i){push.call(nT,sinon.format(nS.thisValues[i]));}
;return nT.join(dN);}
,"*":function(nU,nV){var nW=[];for(var i=0,l=nV.length;i<l; ++i){push.call(nW,sinon.format(nV[i]));}
;return nW.join(dN);}
};sinon.extend(spy,spyApi);spy.spyCall=sinon.spyCall;if(commonJSModule){module.exports=spy;}
else {sinon.spy=spy;}
;}
(typeof sinon==gC&&sinon||null));(function(od){var nX=typeof module==gC&&typeof require==cT;if(!od&&nX){od=require(bT);}
;if(!od){return;}
;function oc(oj,oi,ok){if(!!ok&&typeof ok!=cT){throw new TypeError(gs);}
;var ol;if(ok){ol=od.spy&&od.spy.create?od.spy.create(ok):ok;}
else {ol=oc.create();}
;if(!oj&&!oi){return od.stub.create();}
;if(!oi&&!!oj&&typeof oj==gC){for(var om in oj){if(typeof oj[om]===cT){oc(oj,om);}
;}
;return oj;}
;return od.wrapMethod(oj,oi,ol);}
;function of(oo,oq){var op=oo.callCount-1;var os=oo[oq];var ot=op in os?os[op]:os[os.length-1];oo[oq+N]=ot;return ot;}
;function oe(ow,ou){var ox=of(ow,ez);if(ox<0){var ov=of(ow,ba);for(var i=0,l=ou.length;i<l; ++i){if(!ov&&typeof ou[i]==cT){return ou[i];}
;if(ov&&ou[i]&&typeof ou[i][ov]==cT){return ou[i][ov];}
;}
;return null;}
;return ou[ox];}
;var oa=Array.prototype.join;function og(oy,oB,oA){if(oy.callArgAtsLast<0){var oz;if(oy.callArgPropsLast){oz=od.functionName(oy)+ex+oy.callArgPropsLast+M;}
else {oz=od.functionName(oy)+gY;}
;if(oA.length>0){oz+=bF+oa.call(oA,dN)+fe;}
;return oz;}
;return eo+oy.callArgAtsLast+fG+oB;}
;var nY=(function(){if(typeof process===gC&&typeof process.nextTick===cT){return process.nextTick;}
else if(typeof setImmediate===cT){return setImmediate;}
else {return function(oC){setTimeout(oC,0);}
;}
;}
)();function ob(oD,oG){if(oD.callArgAts.length>0){var oH=oe(oD,oG);if(typeof oH!=cT){throw new TypeError(og(oD,oH,oG));}
;var oF=of(oD,bC);var oE=of(oD,gL);if(oD.callbackAsync){nY(function(){oH.apply(oE,oF);}
);}
else {oH.apply(oE,oF);}
;}
;}
;var oh=0;od.extend(oc,(function(){var oJ=Array.prototype.slice,oL;function oI(oN,oM){if(typeof oN==fL){this.exception=new Error(oM||fc);this.exception.name=oN;}
else if(!oN){this.exception=new Error(eG);}
else {this.exception=oN;}
;return this;}
;oL={create:function oP(){var oO=function(){ob(oO,arguments);if(oO.exception){throw oO.exception;}
else if(typeof oO.returnArgAt==dR){return arguments[oO.returnArgAt];}
else if(oO.returnThis){return this;}
;return oO.returnValue;}
;oO.id=x+oh++ ;var oQ=oO;oO=od.spy.create(oO);oO.func=oQ;oO.callArgAts=[];oO.callbackArguments=[];oO.callbackContexts=[];oO.callArgProps=[];od.extend(oO,oc);oO._create=od.stub.create;oO.displayName=cH;oO.toString=od.functionToString;return oO;}
,resetBehavior:function(){var i;this.callArgAts=[];this.callbackArguments=[];this.callbackContexts=[];this.callArgProps=[];delete this.returnValue;delete this.returnArgAt;this.returnThis=false;if(this.fakes){for(i=0;i<this.fakes.length;i++ ){this.fakes[i].resetBehavior();}
;}
;}
,returns:function oR(oS){this.returnValue=oS;return this;}
,returnsArg:function oT(oU){if(typeof oU!=cl){throw new TypeError(gk);}
;this.returnArgAt=oU;return this;}
,returnsThis:function oV(){this.returnThis=true;return this;}
,"throws":oI,throwsException:oI,callsArg:function oW(oX){if(typeof oX!=cl){throw new TypeError(gk);}
;this.callArgAts.push(oX);this.callbackArguments.push([]);this.callbackContexts.push(undefined);this.callArgProps.push(undefined);return this;}
,callsArgOn:function oY(pa,pb){if(typeof pa!=cl){throw new TypeError(gk);}
;if(typeof pb!=gC){throw new TypeError(cz);}
;this.callArgAts.push(pa);this.callbackArguments.push([]);this.callbackContexts.push(pb);this.callArgProps.push(undefined);return this;}
,callsArgWith:function pc(pd){if(typeof pd!=cl){throw new TypeError(gk);}
;this.callArgAts.push(pd);this.callbackArguments.push(oJ.call(arguments,1));this.callbackContexts.push(undefined);this.callArgProps.push(undefined);return this;}
,callsArgOnWith:function pe(pg,pf){if(typeof pg!=cl){throw new TypeError(gk);}
;if(typeof pf!=gC){throw new TypeError(cz);}
;this.callArgAts.push(pg);this.callbackArguments.push(oJ.call(arguments,2));this.callbackContexts.push(pf);this.callArgProps.push(undefined);return this;}
,yields:function(){this.callArgAts.push(-1);this.callbackArguments.push(oJ.call(arguments,0));this.callbackContexts.push(undefined);this.callArgProps.push(undefined);return this;}
,yieldsOn:function(ph){if(typeof ph!=gC){throw new TypeError(cz);}
;this.callArgAts.push(-1);this.callbackArguments.push(oJ.call(arguments,1));this.callbackContexts.push(ph);this.callArgProps.push(undefined);return this;}
,yieldsTo:function(pi){this.callArgAts.push(-1);this.callbackArguments.push(oJ.call(arguments,1));this.callbackContexts.push(undefined);this.callArgProps.push(pi);return this;}
,yieldsToOn:function(pk,pj){if(typeof pj!=gC){throw new TypeError(cz);}
;this.callArgAts.push(-1);this.callbackArguments.push(oJ.call(arguments,2));this.callbackContexts.push(pj);this.callArgProps.push(pk);return this;}
};for(var oK in oL){if(oL.hasOwnProperty(oK)&&oK.match(/^(callsArg|yields|thenYields$)/)&&!oK.match(/Async/)){oL[oK+H]=(function(pl){return function(){this.callbackAsync=true;return this[pl].apply(this,arguments);}
;}
)(oK);}
;}
;return oL;}
()));if(nX){module.exports=oc;}
else {od.stub=oc;}
;}
(typeof sinon==gC&&sinon||null));(function(po){var pm=typeof module==gC&&typeof require==cT;var pn=[].push;if(!po&&pm){po=require(bT);}
;if(!po){return;}
;function pp(pr){if(!pr){return po.expectation.create(fF);}
;return pp.create(pr);}
;po.mock=pp;po.extend(pp,(function(){function ps(pu,pt){if(!pu){return;}
;for(var i=0,l=pu.length;i<l;i+=1){pt(pu[i]);}
;}
;return {create:function pv(pw){if(!pw){throw new TypeError(bd);}
;var px=po.extend({},pp);px.object=pw;delete px.create;return px;}
,expects:function pB(py){if(!py){throw new TypeError(dw);}
;if(!this.expectations){this.expectations={};this.proxies=[];}
;if(!this.expectations[py]){this.expectations[py]=[];var pA=this;po.wrapMethod(this.object,py,function(){return pA.invokeMethod(py,this,arguments);}
);pn.call(this.proxies,py);}
;var pz=po.expectation.create(py);pn.call(this.expectations[py],pz);return pz;}
,restore:function pC(){var pD=this.object;ps(this.proxies,function(pE){if(typeof pD[pE].restore==cT){pD[pE].restore();}
;}
);}
,verify:function pF(){var pH=this.expectations||{};var pG=[],pI=[];ps(this.proxies,function(pJ){ps(pH[pJ],function(pK){if(!pK.met()){pn.call(pG,pK.toString());}
else {pn.call(pI,pK.toString());}
;}
);}
);this.restore();if(pG.length>0){po.expectation.fail(pG.concat(pI).join(dU));}
else {po.expectation.pass(pG.concat(pI).join(dU));}
;return true;}
,invokeMethod:function pR(pS,pM,pN){var pP=this.expectations&&this.expectations[pS];var length=pP&&pP.length||0,i;for(i=0;i<length;i+=1){if(!pP[i].met()&&pP[i].allowsCall(pM,pN)){return pP[i].apply(pM,pN);}
;}
;var pO=[],pL,pQ=0;for(i=0;i<length;i+=1){if(pP[i].allowsCall(pM,pN)){pL=pL||pP[i];}
else {pQ+=1;}
;pn.call(pO,bM+pP[i].toString());}
;if(pQ===0){return pL.apply(pM,pN);}
;pO.unshift(dh+po.spyCall.toString.call({proxy:pS,args:pN}));po.expectation.fail(pO.join(dU));}
};}
()));var pq=po.timesInWords;po.expectation=(function(){var pV=Array.prototype.slice;var pT=po.spy.invoke;function pY(qa){if(qa==0){return hb;}
else {return fo+pq(qa);}
;}
;function pW(qc){var qe=qc.minCalls;var qb=qc.maxCalls;if(typeof qe==cl&&typeof qb==cl){var qd=pq(qe);if(qe!=qb){qd=eR+qd+bE+pq(qb);}
;return qd;}
;if(typeof qe==cl){return eR+pq(qe);}
;return q+pq(qb);}
;function pU(qf){var qg=typeof qf.minCalls==cl;return !qg||qf.callCount>=qf.minCalls;}
;function pX(qh){if(typeof qh.maxCalls!=cl){return false;}
;return qh.callCount==qh.maxCalls;}
;return {minCalls:1,maxCalls:1,create:function qi(qj){var qk=po.extend(po.stub.create(),po.expectation);delete qk.create;qk.method=qj;return qk;}
,invoke:function qn(qm,qo,ql){this.verifyCallAllowed(qo,ql);return pT.apply(this,arguments);}
,atLeast:function qq(qp){if(typeof qp!=cl){throw new TypeError(dp+qp+cE);}
;if(!this.limitsSet){this.maxCalls=null;this.limitsSet=true;}
;this.minCalls=qp;return this;}
,atMost:function qr(qs){if(typeof qs!=cl){throw new TypeError(dp+qs+cE);}
;if(!this.limitsSet){this.minCalls=null;this.limitsSet=true;}
;this.maxCalls=qs;return this;}
,never:function qt(){return this.exactly(0);}
,once:function qu(){return this.exactly(1);}
,twice:function qv(){return this.exactly(2);}
,thrice:function qw(){return this.exactly(3);}
,exactly:function qy(qz){if(typeof qz!=cl){throw new TypeError(dp+qz+fm);}
;this.atLeast(qz);return this.atMost(qz);}
,met:function qA(){return !this.failed&&pU(this);}
,verifyCallAllowed:function qC(qD,qB){if(pX(this)){this.failed=true;po.expectation.fail(this.method+bJ+pq(this.maxCalls));}
;if(ec in this&&this.expectedThis!==qD){po.expectation.fail(this.method+fT+qD+bQ+this.expectedThis);}
;if(!(G in this)){return;}
;if(!qB){po.expectation.fail(this.method+bB+po.format(this.expectedArguments));}
;if(qB.length<this.expectedArguments.length){po.expectation.fail(this.method+dY+po.format(qB)+dM+po.format(this.expectedArguments));}
;if(this.expectsExactArgCount&&qB.length!=this.expectedArguments.length){po.expectation.fail(this.method+dd+po.format(qB)+dM+po.format(this.expectedArguments));}
;for(var i=0,l=this.expectedArguments.length;i<l;i+=1){if(!po.deepEqual(this.expectedArguments[i],qB[i])){po.expectation.fail(this.method+cr+po.format(qB)+ch+po.format(this.expectedArguments));}
;}
;}
,allowsCall:function qF(qG,qE){if(this.met()&&pX(this)){return false;}
;if(ec in this&&this.expectedThis!==qG){return false;}
;if(!(G in this)){return true;}
;qE=qE||[];if(qE.length<this.expectedArguments.length){return false;}
;if(this.expectsExactArgCount&&qE.length!=this.expectedArguments.length){return false;}
;for(var i=0,l=this.expectedArguments.length;i<l;i+=1){if(!po.deepEqual(this.expectedArguments[i],qE[i])){return false;}
;}
;return true;}
,withArgs:function qH(){this.expectedArguments=pV.call(arguments);return this;}
,withExactArgs:function qI(){this.withArgs.apply(this,arguments);this.expectsExactArgCount=true;return this;}
,on:function qJ(qK){this.expectedThis=qK;return this;}
,toString:function(){var qM=(this.expectedArguments||[]).slice();if(!this.expectsExactArgCount){pn.call(qM,fR);}
;var qL=po.spyCall.toString.call({proxy:this.method||eU,args:qM});var qN=qL.replace(bD,cI)+gd+pW(this);if(this.met()){return w+qN;}
;return dx+qN+gt+pY(this.callCount)+cV;}
,verify:function qO(){if(!this.met()){po.expectation.fail(this.toString());}
else {po.expectation.pass(this.toString());}
;return true;}
,pass:function(qP){po.assert.pass(qP);}
,fail:function(qQ){var qR=new Error(qQ);qR.name=ct;throw qR;}
};}
());if(pm){module.exports=pp;}
else {po.mock=pp;}
;}
(typeof sinon==gC&&sinon||null));(function(qW){var qS=typeof module==gC&&typeof require==cT;var ra=[].push;var qX=Object.prototype.hasOwnProperty;if(!qW&&qS){qW=require(bT);}
;if(!qW){return;}
;function qU(rb){if(!rb.fakes){rb.fakes=[];}
;return rb.fakes;}
;function qY(rc,re){var rd=qU(rc);for(var i=0,l=rd.length;i<l;i+=1){if(typeof rd[i][re]==cT){rd[i][re]();}
;}
;}
;function qT(rf){var rg=qU(rf);var i=0;while(i<rg.length){rg.splice(i,1);}
;}
;var qV={verify:function rh(){qY(this,cR);}
,restore:function ri(){qY(this,dE);qT(this);}
,verifyAndRestore:function rk(){var rj;try{this.verify();}
catch(e){rj=e;}
;this.restore();if(rj){throw rj;}
;}
,add:function rl(rm){ra.call(qU(this),rm);return rm;}
,spy:function rn(){return this.add(qW.spy.apply(qW,arguments));}
,stub:function rs(rp,rt,rq){if(rt){var rv=rp[rt];if(typeof rv!=cT){if(!qX.call(rp,rt)){throw new TypeError(gD+rt);}
;rp[rt]=rq;return this.add({restore:function(){rp[rt]=rv;}
});}
;}
;if(!rt&&!!rp&&typeof rp==gC){var ro=qW.stub.apply(qW,arguments);for(var rr in ro){if(typeof ro[rr]===cT){this.add(ro[rr]);}
;}
;return ro;}
;return this.add(qW.stub.apply(qW,arguments));}
,mock:function rw(){return this.add(qW.mock.apply(qW,arguments));}
,inject:function ry(rx){var rz=this;rx.spy=function(){return rz.spy.apply(rz,arguments);}
;rx.stub=function(){return rz.stub.apply(rz,arguments);}
;rx.mock=function(){return rz.mock.apply(rz,arguments);}
;return rx;}
};if(qS){module.exports=qV;}
else {qW.collection=qV;}
;}
(typeof sinon==gC&&sinon||null));if(typeof sinon==bO){var sinon={};}
;(function(global){var id=1;function addTimer(rC,rD){if(rC.length===0){throw new Error(fM);}
;var rB=id++ ;var rA=rC[1]||0;if(!this.timeouts){this.timeouts={};}
;this.timeouts[rB]={id:rB,func:rC[0],callAt:this.now+rA,invokeArgs:Array.prototype.slice.call(rC,2)};if(rD===true){this.timeouts[rB].interval=rA;}
;return rB;}
;function parseTime(rE){if(!rE){return 0;}
;var rF=rE.split(U);var l=rF.length,i=l;var rG=0,rH;if(l>3||!/^(\d\d:){0,2}\d\d?$/.test(rE)){throw new Error(bn);}
;while(i-- ){rH=parseInt(rF[i],10);if(rH>=60){throw new Error(cW+rE);}
;rG+=rH*Math.pow(60,(l-i-1));}
;return rG*1000;}
;function createObject(rI){var rJ;if(Object.create){rJ=Object.create(rI);}
else {var F=function(){}
;F.prototype=rI;rJ=new F();}
;rJ.Date.clock=rJ;return rJ;}
;sinon.clock={now:0,create:function rK(rL){var rM=createObject(this);if(typeof rL==cl){rM.now=rL;}
;if(!!rL&&typeof rL==gC){throw new TypeError(eW);}
;return rM;}
,setTimeout:function setTimeout(rN,rO){return addTimer.call(this,arguments,false);}
,clearTimeout:function clearTimeout(rP){if(!this.timeouts){this.timeouts=[];}
;if(rP in this.timeouts){delete this.timeouts[rP];}
;}
,setInterval:function setInterval(rQ,rR){return addTimer.call(this,arguments,true);}
,clearInterval:function clearInterval(rS){this.clearTimeout(rS);}
,tick:function rY(rW){rW=typeof rW==cl?rW:parseTime(rW);var rX=this.now,rU=this.now+rW,sa=this.now;var rT=this.firstTimerInRange(rX,rU);var rV;while(rT&&rX<=rU){if(this.timeouts[rT.id]){rX=this.now=rT.callAt;try{this.callTimer(rT);}
catch(e){rV=rV||e;}
;}
;rT=this.firstTimerInRange(sa,rU);sa=rX;}
;this.now=rU;if(rV){throw rV;}
;return this.now;}
,firstTimerInRange:function(sb,sc){var sd,sf,se;for(var sg in this.timeouts){if(this.timeouts.hasOwnProperty(sg)){if(this.timeouts[sg].callAt<sb||this.timeouts[sg].callAt>sc){continue;}
;if(!sf||this.timeouts[sg].callAt<sf){se=this.timeouts[sg];sf=this.timeouts[sg].callAt;sd={func:this.timeouts[sg].func,callAt:this.timeouts[sg].callAt,interval:this.timeouts[sg].interval,id:this.timeouts[sg].id,invokeArgs:this.timeouts[sg].invokeArgs};}
;}
;}
;return sd||null;}
,callTimer:function(timer){if(typeof timer.interval==cl){this.timeouts[timer.id].callAt+=timer.interval;}
else {delete this.timeouts[timer.id];}
;try{if(typeof timer.func==cT){timer.func.apply(null,timer.invokeArgs);}
else {eval(timer.func);}
;}
catch(e){var exception=e;}
;if(!this.timeouts[timer.id]){if(exception){throw exception;}
;return;}
;if(exception){throw exception;}
;}
,reset:function sh(){this.timeouts={};}
,Date:(function(){var si=Date;function sj(so,sl,sp,sk,sq,sm,sn){switch(arguments.length){case 0:return new si(sj.clock.now);case 1:return new si(so);case 2:return new si(so,sl);case 3:return new si(so,sl,sp);case 4:return new si(so,sl,sp,sk);case 5:return new si(so,sl,sp,sk,sq);case 6:return new si(so,sl,sp,sk,sq,sm);default:return new si(so,sl,sp,sk,sq,sm,sn);};}
;return mirrorDateProperties(sj,si);}
())};function mirrorDateProperties(ss,sr){if(sr.now){ss.now=function st(){return ss.clock.now;}
;}
else {delete ss.now;}
;if(sr.toSource){ss.toSource=function su(){return sr.toSource();}
;}
else {delete ss.toSource;}
;ss.toString=function sv(){return sr.toString();}
;ss.prototype=sr.prototype;ss.parse=sr.parse;ss.UTC=sr.UTC;ss.prototype.toUTCString=sr.prototype.toUTCString;return ss;}
;var methods=[E,cQ,dQ,dz,u];function restore(){var sw;for(var i=0,l=this.methods.length;i<l;i++ ){sw=this.methods[i];if(global[sw].hadOwnProperty){global[sw]=this[bo+sw];}
else {delete global[sw];}
;}
;this.methods=[];}
;function stubGlobal(sz,sy){sy[sz].hadOwnProperty=Object.prototype.hasOwnProperty.call(global,sz);sy[bo+sz]=global[sz];if(sz==E){var sx=mirrorDateProperties(sy[sz],global[sz]);global[sz]=sx;}
else {global[sz]=function(){return sy[sz].apply(sy,arguments);}
;for(var sA in sy[sz]){if(sy[sz].hasOwnProperty(sA)){global[sz][sA]=sy[sz][sA];}
;}
;}
;global[sz].clock=sy;}
;sinon.useFakeTimers=function sC(sB){var sD=sinon.clock.create(sB);sD.restore=restore;sD.methods=Array.prototype.slice.call(arguments,typeof sB==cl?1:0);if(sD.methods.length===0){sD.methods=methods;}
;for(var i=0,l=sD.methods.length;i<l;i++ ){stubGlobal(sD.methods[i],sD);}
;return sD;}
;}
(typeof global!=bO&&typeof global!==cT?global:this));sinon.timers={setTimeout:setTimeout,clearTimeout:clearTimeout,setInterval:setInterval,clearInterval:clearInterval,Date:Date};if(typeof module==gC&&typeof require==cT){module.exports=sinon;}
;if(typeof sinon==bO){this.sinon={};}
;(function(){var sE=[].push;sinon.Event=function Event(sH,sG,sF,sI){this.initEvent(sH,sG,sF,sI);}
;sinon.Event.prototype={initEvent:function(sL,sK,sJ,sM){this.type=sL;this.bubbles=sK;this.cancelable=sJ;this.target=sM;}
,stopPropagation:function(){}
,preventDefault:function(){this.defaultPrevented=true;}
};sinon.EventTarget={addEventListener:function addEventListener(event,sN,sO){this.eventListeners=this.eventListeners||{};this.eventListeners[event]=this.eventListeners[event]||[];sE.call(this.eventListeners[event],sN);}
,removeEventListener:function removeEventListener(event,sQ,sP){var sR=this.eventListeners&&this.eventListeners[event]||[];for(var i=0,l=sR.length;i<l; ++i){if(sR[i]==sQ){return sR.splice(i,1);}
;}
;}
,dispatchEvent:function dispatchEvent(event){var sT=event.type;var sS=this.eventListeners&&this.eventListeners[sT]||[];for(var i=0;i<sS.length;i++ ){if(typeof sS[i]==cT){sS[i].call(this,event);}
else {sS[i].handleEvent(event);}
;}
;return !!event.defaultPrevented;}
};}
());if(typeof sinon==bO){this.sinon={};}
;sinon.xhr={XMLHttpRequest:this.XMLHttpRequest};(function(sY){var sW=sinon.xhr;sW.GlobalXMLHttpRequest=sY.XMLHttpRequest;sW.GlobalActiveXObject=sY.ActiveXObject;sW.supportsActiveX=typeof sW.GlobalActiveXObject!=bO;sW.supportsXHR=typeof sW.GlobalXMLHttpRequest!=bO;sW.workingXHR=sW.supportsXHR?sW.GlobalXMLHttpRequest:sW.supportsActiveX?function(){return new sW.GlobalActiveXObject(cN);}
:false;var sU={"Accept-Charset":true,"Accept-Encoding":true,"Connection":true,"Content-Length":true,"Cookie":true,"Cookie2":true,"Content-Transfer-Encoding":true,"Date":true,"Expect":true,"Host":true,"Keep-Alive":true,"Referer":true,"TE":true,"Trailer":true,"Transfer-Encoding":true,"Upgrade":true,"User-Agent":true,"Via":true};function tb(){this.readyState=tb.UNSENT;this.requestHeaders={};this.requestBody=null;this.status=0;this.statusText=fc;var th=this;var ti=[n,fw,go,s];function addEventListener(tj){th.addEventListener(tj,function(event){var tk=th[eO+tj];if(tk&&typeof tk==cT){tk(event);}
;}
);}
;for(var i=ti.length-1;i>=0;i-- ){addEventListener(ti[i]);}
;if(typeof tb.onCreate==cT){tb.onCreate(this);}
;}
;function tc(tl){if(tl.readyState!==tb.OPENED){throw new Error(co);}
;if(tl.sendFlag){throw new Error(co);}
;}
;function td(tn,tm){if(!tn)return;for(var i=0,l=tn.length;i<l;i+=1){tm(tn[i]);}
;}
;function ta(tq,tp){for(var tr=0;tr<tq.length;tr++ ){if(tp(tq[tr])===true)return true;}
;return false;}
;var tf=function(tt,tu,ts){switch(ts.length){case 0:return tt[tu]();case 1:return tt[tu](ts[0]);case 2:return tt[tu](ts[0],ts[1]);case 3:return tt[tu](ts[0],ts[1],ts[2]);case 4:return tt[tu](ts[0],ts[1],ts[2],ts[3]);case 5:return tt[tu](ts[0],ts[1],ts[2],ts[3],ts[4]);};}
;tb.filters=[];tb.addFilter=function(tv){this.filters.push(tv);}
;var sV=/MSIE 6/;tb.defake=function(tA,tz){var ty=new sinon.xhr.workingXHR();td([cd,er,ce,go,eP,gy,cS,be,fO],function(tB){tA[tB]=function(){return tf(ty,tB,arguments);}
;}
);var tx=function(tC){td(tC,function(tD){try{tA[tD]=ty[tD];}
catch(e){if(!sV.test(navigator.userAgent))throw e;}
;}
);}
;var tw=function(){tA.readyState=ty.readyState;if(ty.readyState>=tb.HEADERS_RECEIVED){tx([eN,gm]);}
;if(ty.readyState>=tb.LOADING){tx([gi]);}
;if(ty.readyState===tb.DONE){tx([bW]);}
;if(tA.onreadystatechange)tA.onreadystatechange.call(tA);}
;if(ty.addEventListener){for(var event in tA.eventListeners){if(tA.eventListeners.hasOwnProperty(event)){td(tA.eventListeners[event],function(tE){ty.addEventListener(event,tE);}
);}
;}
;ty.addEventListener(Y,tw);}
else {ty.onreadystatechange=tw;}
;tf(ty,cd,tz);}
;tb.useFilters=false;function tg(tF){if(tF.readyState==tb.DONE){throw new Error(gR);}
;}
;function te(tG){if(tG.async&&tG.readyState!=tb.HEADERS_RECEIVED){throw new Error(gr);}
;}
;function sX(tH){if(typeof tH!=fL){var tI=new Error(gP+tH+cG);tI.name=eg;throw tI;}
;}
;sinon.extend(tb.prototype,sinon.EventTarget,{async:true,open:function open(tP,tK,tN,tJ,tO){this.method=tP;this.url=tK;this.async=typeof tN==dC?tN:true;this.username=tJ;this.password=tO;this.responseText=null;this.responseXML=null;this.requestHeaders={};this.sendFlag=false;if(sinon.FakeXMLHttpRequest.useFilters===true){var tL=arguments;var tM=ta(tb.filters,function(tQ){return tQ.apply(this,tL);}
);if(tM){return sinon.FakeXMLHttpRequest.defake(this,arguments);}
;}
;this.readyStateChange(tb.OPENED);}
,readyStateChange:function tR(tS){this.readyState=tS;if(typeof this.onreadystatechange==cT){try{this.onreadystatechange();}
catch(e){sinon.logError(bw,e);}
;}
;this.dispatchEvent(new sinon.Event(Y));switch(this.readyState){case tb.DONE:this.dispatchEvent(new sinon.Event(fw,false,false,this));this.dispatchEvent(new sinon.Event(s,false,false,this));break;};}
,setRequestHeader:function tU(tT,tV){tc(this);if(sU[tT]||/^(Sec-|Proxy-)/.test(tT)){throw new Error(fH+tT+eQ);}
;if(this.requestHeaders[tT]){this.requestHeaders[tT]+=ha+tV;}
else {this.requestHeaders[tT]=tV;}
;}
,setResponseHeaders:function tX(tW){this.responseHeaders={};for(var tY in tW){if(tW.hasOwnProperty(tY)){this.responseHeaders[tY]=tW[tY];}
;}
;if(this.async){this.readyStateChange(tb.HEADERS_RECEIVED);}
else {this.readyState=tb.HEADERS_RECEIVED;}
;}
,send:function ub(ua){tc(this);if(!/^(get|head)$/i.test(this.method)){if(this.requestHeaders[bN]){var uc=this.requestHeaders[bN].split(bK);this.requestHeaders[bN]=uc[0]+cJ;}
else {this.requestHeaders[bN]=cY;}
;this.requestBody=ua;}
;this.errorFlag=false;this.sendFlag=this.async;this.readyStateChange(tb.OPENED);if(typeof this.onSend==cT){this.onSend(this);}
;this.dispatchEvent(new sinon.Event(n,false,false,this));}
,abort:function ud(){this.aborted=true;this.responseText=null;this.errorFlag=true;this.requestHeaders={};if(this.readyState>sinon.FakeXMLHttpRequest.UNSENT&&this.sendFlag){this.readyStateChange(sinon.FakeXMLHttpRequest.DONE);this.sendFlag=false;}
;this.readyState=sinon.FakeXMLHttpRequest.UNSENT;this.dispatchEvent(new sinon.Event(go,false,false,this));if(typeof this.onerror===cT){this.onerror();}
;}
,getResponseHeader:function uf(ue){if(this.readyState<tb.HEADERS_RECEIVED){return null;}
;if(/^Set-Cookie2?$/i.test(ue)){return null;}
;ue=ue.toLowerCase();for(var h in this.responseHeaders){if(h.toLowerCase()==ue){return this.responseHeaders[h];}
;}
;return null;}
,getAllResponseHeaders:function uh(){if(this.readyState<tb.HEADERS_RECEIVED){return fc;}
;var ug=fc;for(var ui in this.responseHeaders){if(this.responseHeaders.hasOwnProperty(ui)&&!/^Set-Cookie2?$/i.test(ui)){ug+=ui+gq+this.responseHeaders[ui]+r;}
;}
;return ug;}
,setResponseBody:function ul(uj){tg(this);te(this);sX(uj);var un=this.chunkSize||10;var uk=0;this.responseText=fc;do {if(this.async){this.readyStateChange(tb.LOADING);}
;this.responseText+=uj.substring(uk,uk+un);uk+=un;}
while(uk<uj.length);var um=this.getResponseHeader(bN);if(this.responseText&&(!um||/(text\/xml)|(application\/xml)|(\+xml)/.test(um))){try{this.responseXML=tb.parseXML(this.responseText);}
catch(e){}
;}
;if(this.async){this.readyStateChange(tb.DONE);}
else {this.readyState=tb.DONE;}
;}
,respond:function uo(status,uq,up){this.setResponseHeaders(uq||{});this.status=typeof status==cl?status:200;this.statusText=tb.statusCodes[this.status];this.setResponseBody(up||fc);if(typeof this.onload===cT){this.onload();}
;}
});sinon.extend(tb,{UNSENT:0,OPENED:1,HEADERS_RECEIVED:2,LOADING:3,DONE:4});tb.parseXML=function ut(ur){var uu;if(typeof DOMParser!=bO){var us=new DOMParser();uu=us.parseFromString(ur,em);}
else {uu=new ActiveXObject(gW);uu.async=gT;uu.loadXML(ur);}
;return uu;}
;tb.statusCodes={'100':dg,'101':dy,'200':dX,'201':gj,'202':gB,'203':fq,'204':ge,'205':fk,'206':gA,'300':dc,'301':da,'302':bt,'303':gz,'304':dn,'305':bl,'307':bG,'400':ca,'401':cc,'402':O,'403':bp,'404':bH,'405':bA,'406':v,'407':dF,'408':bs,'409':fD,'410':bX,'411':ft,'412':bj,'413':cm,'414':fX,'415':cv,'416':D,'417':bV,'422':ds,'500':gK,'501':fr,'502':fa,'503':fy,'504':es,'505':hc};sinon.useFakeXMLHttpRequest=function(){sinon.FakeXMLHttpRequest.restore=function uv(uw){if(sW.supportsXHR){sY.XMLHttpRequest=sW.GlobalXMLHttpRequest;}
;if(sW.supportsActiveX){sY.ActiveXObject=sW.GlobalActiveXObject;}
;delete sinon.FakeXMLHttpRequest.restore;if(uw!==true){delete sinon.FakeXMLHttpRequest.onCreate;}
;}
;if(sW.supportsXHR){sY.XMLHttpRequest=sinon.FakeXMLHttpRequest;}
;if(sW.supportsActiveX){sY.ActiveXObject=function ActiveXObject(ux){if(ux==gS||/^Msxml2\.XMLHTTP/i.test(ux)){return new sinon.FakeXMLHttpRequest();}
;return new sW.GlobalActiveXObject(ux);}
;}
;return sinon.FakeXMLHttpRequest;}
;sinon.FakeXMLHttpRequest=tb;}
)(this);if(typeof module==gC&&typeof require==cT){module.exports=sinon;}
;if(typeof sinon==bO){var sinon={};}
;sinon.fakeServer=(function(){var uD=[].push;function F(){}
;function uB(uG){F.prototype=uG;return new F();}
;function uA(uH){var uI=uH;if(Object.prototype.toString.call(uH)!=dD){uI=[200,{},uH];}
;if(typeof uI[2]!=fL){throw new TypeError(fu+typeof uI[2]);}
;return uI;}
;var uE=typeof window!==bO?window.location:{};var uy=new RegExp(gf+uE.protocol+fz+uE.host);function uC(uN,uM,uP){var uL=uN.method;var uJ=!uL||uL.toLowerCase()==uM.toLowerCase();var uK=uN.url;var uO=!uK||uK==uP||(typeof uK.test==cT&&uK.test(uP));return uJ&&uO;}
;function uF(uV,uR){var uU=this.getHTTPMethod(uR);var uT=uR.url;if(!/^https?:\/\//.test(uT)||uy.test(uT)){uT=uT.replace(uy,fc);}
;if(uC(uV,this.getHTTPMethod(uR),uT)){if(typeof uV.response==cT){var uQ=uV.url;var uS=[uR].concat(!uQ?[]:uT.match(uQ).slice(1));return uV.response.apply(uV,uS);}
;return true;}
;return false;}
;function uz(uX,uW){var uY;uY=eK+sinon.format(uW)+cU;uY+=fj+sinon.format(uX)+cU;sinon.log(uY);}
;return {create:function(){var va=uB(this);this.xhr=sinon.useFakeXMLHttpRequest();va.requests=[];this.xhr.onCreate=function(vb){va.addRequest(vb);}
;return va;}
,addRequest:function vd(vc){var ve=this;uD.call(this.requests,vc);vc.onSend=function(){ve.handleRequest(this);}
;if(this.autoRespond&&!this.responding){setTimeout(function(){ve.responding=false;ve.respond();}
,this.autoRespondAfter||10);this.responding=true;}
;}
,getHTTPMethod:function vg(vh){if(this.fakeHTTPMethods&&/post/i.test(vh.method)){var vf=(vh.requestBody||fc).match(/_method=([^\b;]+)/);return !!vf?vf[1]:vh.method;}
;return vh.method;}
,handleRequest:function vj(vi){if(vi.async){if(!this.queue){this.queue=[];}
;uD.call(this.queue,vi);}
else {this.processRequest(vi);}
;}
,respondWith:function vl(vn,vm,vk){if(arguments.length==1&&typeof vn!=cT){this.response=uA(vn);return;}
;if(!this.responses){this.responses=[];}
;if(arguments.length==1){vk=vn;vm=vn=null;}
;if(arguments.length==2){vk=vm;vm=vn;vn=null;}
;uD.call(this.responses,{method:vn,url:vm,response:typeof vk==cT?vk:uA(vk)});}
,respond:function vo(){if(arguments.length>0)this.respondWith.apply(this,arguments);var vp=this.queue||[];var vq;while(vq=vp.shift()){this.processRequest(vq);}
;}
,processRequest:function vr(vs){try{if(vs.aborted){return;}
;var vt=this.response||[404,{},fc];if(this.responses){for(var i=0,l=this.responses.length;i<l;i++ ){if(uF.call(this,this.responses[i],vs)){vt=this.responses[i].response;break;}
;}
;}
;if(vs.readyState!=4){uz(vt,vs);vs.respond(vt[0],vt[1],vt[2]);}
;}
catch(e){sinon.logError(fS,e);}
;}
,restore:function vu(){return this.xhr.restore&&this.xhr.restore.apply(this.xhr,arguments);}
};}
());if(typeof module==gC&&typeof require==cT){module.exports=sinon;}
;(function(){function vv(){}
;vv.prototype=sinon.fakeServer;sinon.fakeServerWithClock=new vv();sinon.fakeServerWithClock.addRequest=function vz(vw){if(vw.async){if(typeof setTimeout.clock==gC){this.clock=setTimeout.clock;}
else {this.clock=sinon.useFakeTimers();this.resetClock=true;}
;if(!this.longestTimeout){var vx=this.clock.setTimeout;var vy=this.clock.setInterval;var vA=this;this.clock.setTimeout=function(vB,vC){vA.longestTimeout=Math.max(vC,vA.longestTimeout||0);return vx.apply(this,arguments);}
;this.clock.setInterval=function(vD,vE){vA.longestTimeout=Math.max(vE,vA.longestTimeout||0);return vy.apply(this,arguments);}
;}
;}
;return sinon.fakeServer.addRequest.call(this,vw);}
;sinon.fakeServerWithClock.respond=function vF(){var vG=sinon.fakeServer.respond.apply(this,arguments);if(this.clock){this.clock.tick(this.longestTimeout||0);this.longestTimeout=0;if(this.resetClock){this.clock.restore();this.resetClock=false;}
;}
;return vG;}
;sinon.fakeServerWithClock.restore=function vH(){if(this.clock){this.clock.restore();}
;return sinon.fakeServer.restore.apply(this,arguments);}
;}
());if(typeof module==gC&&typeof require==cT){var sinon=require(bT);sinon.extend(sinon,require(bk));}
;(function(){var vI=[].push;function vJ(vL,vM,vN,vO){if(!vO){return;}
;if(vM.injectInto){vM.injectInto[vN]=vO;}
else {vI.call(vL.args,vO);}
;}
;function vK(vQ){var vP=sinon.create(sinon.sandbox);if(vQ.useFakeServer){if(typeof vQ.useFakeServer==gC){vP.serverPrototype=vQ.useFakeServer;}
;vP.useFakeServer();}
;if(vQ.useFakeTimers){if(typeof vQ.useFakeTimers==gC){vP.useFakeTimers.apply(vP,vQ.useFakeTimers);}
else {vP.useFakeTimers();}
;}
;return vP;}
;sinon.sandbox=sinon.extend(sinon.create(sinon.collection),{useFakeTimers:function vR(){this.clock=sinon.useFakeTimers.apply(sinon,arguments);return this.add(this.clock);}
,serverPrototype:sinon.fakeServer,useFakeServer:function vS(){var vT=this.serverPrototype||sinon.fakeServer;if(!vT||!vT.create){return null;}
;this.server=vT.create();return this.add(this.server);}
,inject:function(vU){sinon.collection.inject.call(this,vU);if(this.clock){vU.clock=this.clock;}
;if(this.server){vU.server=this.server;vU.requests=this.server.requests;}
;return vU;}
,create:function(wa){if(!wa){return sinon.create(sinon.sandbox);}
;var vY=vK(wa);vY.args=vY.args||[];var vX,vW,vV=vY.inject({});if(wa.properties){for(var i=0,l=wa.properties.length;i<l;i++ ){vX=wa.properties[i];vW=vV[vX]||vX==dr&&vY;vJ(vY,wa,vX,vW);}
;}
else {vJ(vY,wa,dr,vW);}
;return vY;}
});sinon.sandbox.useFakeXMLHttpRequest=sinon.sandbox.useFakeServer;if(typeof module==gC&&typeof require==cT){module.exports=sinon.sandbox;}
;}
());(function(wd){var wb=typeof module==gC&&typeof require==cT;if(!wd&&wb){wd=require(bT);}
;if(!wd){return;}
;function wc(we){var wf=typeof we;if(wf!=cT){throw new TypeError(ef+wf);}
;return function(){var wi=wd.getConfig(wd.config);wi.injectInto=wi.injectIntoThis&&this||wi.injectInto;var wj=wd.sandbox.create(wi);var wg,wk;var wh=Array.prototype.slice.call(arguments).concat(wj.args);try{wk=we.apply(this,wh);}
catch(e){wg=e;}
;if(typeof wg!==bO){wj.restore();throw wg;}
else {wj.verifyAndRestore();}
;return wk;}
;}
;wc.config={injectIntoThis:true,injectInto:null,properties:[et,cH,cO,K,di,gl],useFakeTimers:true,useFakeServer:true};if(wb){module.exports=wc;}
else {wd.test=wc;}
;}
(typeof sinon==gC&&sinon||null));(function(wo){var wl=typeof module==gC&&typeof require==cT;if(!wo&&wl){wo=require(bT);}
;if(!wo||!Object.prototype.hasOwnProperty){return;}
;function wn(wr,wq,wp){return function(){if(wq){wq.apply(this,arguments);}
;var ws,wt;try{wt=wr.apply(this,arguments);}
catch(e){ws=e;}
;if(wp){wp.apply(this,arguments);}
;if(ws){throw ws;}
;return wt;}
;}
;function wm(wu,wA){if(!wu||typeof wu!=gC){throw new TypeError(W);}
;wA=wA||fC;var wx=new RegExp(gf+wA);var wv={},wz,wB,wC;var wy=wu.setUp;var ww=wu.tearDown;for(wz in wu){if(wu.hasOwnProperty(wz)){wB=wu[wz];if(/^(setUp|tearDown)$/.test(wz)){continue;}
;if(typeof wB==cT&&wx.test(wz)){wC=wB;if(wy||ww){wC=wn(wB,wy,ww);}
;wv[wz]=wo.test(wC);}
else {wv[wz]=wu[wz];}
;}
;}
;return wv;}
;if(wl){module.exports=wm;}
else {wo.testCase=wm;}
;}
(typeof sinon==gC&&sinon||null));(function(wK,wH){var wD=typeof module==gC&&typeof require==cT;var wE=Array.prototype.slice;var wI;if(!wK&&wD){wK=require(bT);}
;if(!wK){return;}
;function wJ(){var wM;for(var i=0,l=arguments.length;i<l; ++i){wM=arguments[i];if(!wM){wI.fail(eb);}
;if(typeof wM!=cT){wI.fail(wM+du);}
;if(typeof wM.getCall!=cT){wI.fail(wM+bY);}
;}
;}
;function wF(wO,wN){wO=wO||wH;var wP=wO.fail||wI.fail;wP.call(wO,wN);}
;function wL(name,wR,wQ){if(arguments.length==2){wQ=wR;wR=name;}
;wI[name]=function(wU){wJ(wU);var wT=wE.call(arguments,1);var wS=false;if(typeof wR==cT){wS=!wR(wU);}
else {wS=typeof wU[wR]==cT?!wU[wR].apply(wU,wT):!wU[wR];}
;if(wS){wF(this,wU.printf.apply(wU,[wQ].concat(wT)));}
else {wI.pass(name);}
;}
;}
;function wG(wV,wW){return !wV||/^fail/.test(wW)?wW:wV+wW.slice(0,1).toUpperCase()+wW.slice(1);}
;wI={failException:cL,fail:function wX(wY){var xa=new Error(wY);xa.name=this.failException||wI.failException;throw xa;}
,pass:function xc(xb){}
,callOrder:function xf(){wJ.apply(null,arguments);var xd=fc,xe=fc;if(!wK.calledInOrder(arguments)){try{xd=[].join.call(arguments,dN);var xg=wE.call(arguments);var i=xg.length;while(i){if(!xg[ --i].called){xg.splice(i,1);}
;}
;xe=wK.orderByFirstCall(xg).join(dN);}
catch(e){}
;wF(this,dt+xd+fA+by+xe);}
else {wI.pass(gg);}
;}
,callCount:function xh(xj,xi){wJ(xj);if(xj.callCount!=xi){var xk=gV+wK.timesInWords(xi)+dL;wF(this,xj.printf(xk));}
else {wI.pass(eC);}
;}
,expose:function xn(xm,xo){if(!xm){throw new TypeError(ey);}
;var o=xo||{};var xp=typeof o.prefix==bO&&df||o.prefix;var xl=typeof o.includeFail==bO||!!o.includeFail;for(var xq in this){if(xq!=dm&&(xl||!/^(fail)/.test(xq))){xm[wG(xp,xq)]=this[xq];}
;}
;return xm;}
};wL(X,fV);wL(z,function(xr){return !xr.called;}
,fh);wL(L,ea);wL(gn,cg);wL(eB,Q);wL(ep,dG);wL(cs,I);wL(eu,bI);wL(fE,cK);wL(bg,ej);wL(P,cn);wL(ga,eM);wL(gc,f);wL(dJ,gM);wL(bL,bv);wL(dH,el);wL(fJ,bu);wL(dv,de);wL(eX,eE);if(wD){module.exports=wI;}
else {wK.assert=wI;}
;}
(typeof sinon==gC&&sinon||null,typeof window!=bO?window:(typeof self!=bO)?self:global));return sinon;}
.call(typeof window!=fQ&&window||{}));this.sinon.assert.fail=function(xs){this.fail(xs,true);}
;var origSinon=this.sinon;var Sinon=qx.dev.unit.Sinon;Sinon.getSinon=function(){return origSinon;}
;}
).call(this);}
)();

})();