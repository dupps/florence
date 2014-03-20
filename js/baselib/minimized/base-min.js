(function()
{
  // creating the global namespace we need
  var qx = window.qx = {};

  if (!window.qui) {
    window.qui = {};
  }

  if (!window.baselib) {
    window.baselib = {};
  }

  if (!qx.$$environment) qx.$$environment = {};
  var envinfo = {"baselib.deprecated.stacktrace":false,"baselib.version":"0.9.6","module.logger":false,"phonegap":false,"qx.application":"baselib.Application","qx.debug":false,"qx.debug.databinding":false,"qx.debug.dispose":false,"qx.debug.io":false,"qx.debug.ui.queue":false,"qx.globalErrorHandling":false,"qx.mobile.nativescroll":true,"qx.optimization.basecalls":true,"qx.optimization.comments":true,"qx.optimization.privates":true,"qx.optimization.statics":true,"qx.optimization.strings":true,"qx.optimization.variables":true,"qx.optimization.variants":true,"qx.optimization.whitespace":true,"qx.revision":"9bd3fd6178f2286b39df046633ba4c2f732c0878","qx.theme":"qx.theme.Modern","qx.version":"3.6"};
  for (var k in envinfo) qx.$$environment[k] = envinfo[k];

  if (!qx.$$libraries) qx.$$libraries = {};
  var libinfo = {"__out__":{"sourceUri":"script"},"qx":{"resourceUri":"/modules/frontend-qooxdoo/img","sourceUri":"script"}};
  for (var k in libinfo) qx.$$libraries[k] = libinfo[k];

  qx.$$resources = {"qx/static/blank.gif":[1, 1, "gif", "qx"]};
  qx.$$packageData = {};
  qx.$$loader = {
    // necessary to signal the application event handler to fire the 'ready' event
    scriptLoaded : true
  };

  qx.$$packageData['0']={"locales":{},"resources":{},"translations":{"C":{},"en":{}}};
(function(){var b=".prototype",c="function",d="Boolean",e="Error",f="Object.keys requires an object as argument.",g="constructor",h="default",j="hasOwnProperty",k="string",m="Object",n="toLocaleString",o="error",p="toString",q="qx.debug",r="()",s="RegExp",t="String",u="warn",v="BROKEN_IE",w="isPrototypeOf",x="Date",y="",z="qx.Bootstrap",A="Function",B="]",C="Cannot call super class. Method is not derived: ",D="Array",E="[Class ",F="valueOf",G="Number",H="Class",I="ES5",J=".",K="propertyIsEnumerable",L="object";if(!window.qx){window.qx={};}
;qx.Bootstrap={genericToString:function(){return E+this.classname+B;}
,createNamespace:function(name,M){var P=name.split(J);var O=P[0];var parent=this.__a&&this.__a[O]?this.__a:window;for(var i=0,N=P.length-1;i<N;i++ ,O=P[i]){if(!parent[O]){parent=parent[O]={};}
else {parent=parent[O];}
;}
;parent[O]=M;return O;}
,setDisplayName:function(R,Q,name){R.displayName=Q+J+name+r;}
,setDisplayNames:function(T,S){for(var name in T){var U=T[name];if(U instanceof Function){U.displayName=S+J+name+r;}
;}
;}
,base:function(V,W){if(qx.Bootstrap.DEBUG){if(!qx.Bootstrap.isFunction(V.callee.base)){throw new Error(C+V.callee.displayName);}
;}
;if(arguments.length===1){return V.callee.base.call(this);}
else {return V.callee.base.apply(this,Array.prototype.slice.call(arguments,1));}
;}
,define:function(name,bi){if(!bi){bi={statics:{}};}
;var be;var ba=null;qx.Bootstrap.setDisplayNames(bi.statics,name);if(bi.members||bi.extend){qx.Bootstrap.setDisplayNames(bi.members,name+b);be=bi.construct||new Function;if(bi.extend){this.extendClass(be,be,bi.extend,name,bc);}
;var Y=bi.statics||{};for(var i=0,bb=qx.Bootstrap.keys(Y),l=bb.length;i<l;i++ ){var X=bb[i];be[X]=Y[X];}
;ba=be.prototype;ba.base=qx.Bootstrap.base;var bg=bi.members||{};var X,bf;for(var i=0,bb=qx.Bootstrap.keys(bg),l=bb.length;i<l;i++ ){X=bb[i];bf=bg[X];if(bf instanceof Function&&ba[X]){bf.base=ba[X];}
;ba[X]=bf;}
;}
else {be=bi.statics||{};if(qx.Bootstrap.$$registry&&qx.Bootstrap.$$registry[name]){var bh=qx.Bootstrap.$$registry[name];if(this.keys(be).length!==0){if(bi.defer){bi.defer(be,ba);}
;for(var bd in be){bh[bd]=be[bd];}
;return bh;}
;}
;}
;be.$$type=H;if(!be.hasOwnProperty(p)){be.toString=this.genericToString;}
;var bc=name?this.createNamespace(name,be):y;be.name=be.classname=name;be.basename=bc;be.$$events=bi.events;if(bi.defer){bi.defer(be,ba);}
;if(name!=null){qx.Bootstrap.$$registry[name]=be;}
;return be;}
};qx.Bootstrap.define(z,{statics:{__a:null,DEBUG:(function(){var bj=true;if(qx.$$environment&&qx.$$environment[q]===false){bj=false;}
;return bj;}
)(),createNamespace:qx.Bootstrap.createNamespace,setRoot:function(bk){this.__a=bk;}
,base:qx.Bootstrap.base,define:qx.Bootstrap.define,setDisplayName:qx.Bootstrap.setDisplayName,setDisplayNames:qx.Bootstrap.setDisplayNames,genericToString:qx.Bootstrap.genericToString,extendClass:function(clazz,construct,superClass,name,basename){var superproto=superClass.prototype;var helper=new Function();helper.prototype=superproto;var proto=new helper();clazz.prototype=proto;proto.name=proto.classname=name;proto.basename=basename;construct.base=superClass;clazz.superclass=superClass;construct.self=clazz.constructor=proto.constructor=clazz;}
,getByName:function(name){return qx.Bootstrap.$$registry[name];}
,$$registry:{},__b:[w,j,n,p,F,K,g],keys:({"ES5":Object.keys,"BROKEN_IE":function(bl){if(bl===null||(typeof bl!=L&&typeof bl!=c)){throw new TypeError(f);}
;var bm=[];var bo=Object.prototype.hasOwnProperty;for(var bp in bl){if(bo.call(bl,bp)){bm.push(bp);}
;}
;var bn=qx.Bootstrap.__b;for(var i=0,a=bn,l=a.length;i<l;i++ ){if(bo.call(bl,a[i])){bm.push(a[i]);}
;}
;return bm;}
,"default":function(bq){if(bq===null||(typeof bq!=L&&typeof bq!=c)){throw new TypeError(f);}
;var br=[];var bs=Object.prototype.hasOwnProperty;for(var bt in bq){if(bs.call(bq,bt)){br.push(bt);}
;}
;return br;}
})[typeof (Object.keys)==c?I:(function(){for(var bu in {toString:1}){return bu;}
;}
)()!==p?v:h],__c:{"[object String]":t,"[object Array]":D,"[object Object]":m,"[object RegExp]":s,"[object Number]":G,"[object Boolean]":d,"[object Date]":x,"[object Function]":A,"[object Error]":e},bind:function(bw,self,bx){var bv=Array.prototype.slice.call(arguments,2,arguments.length);return function(){var by=Array.prototype.slice.call(arguments,0,arguments.length);return bw.apply(self,bv.concat(by));}
;}
,firstUp:function(bz){return bz.charAt(0).toUpperCase()+bz.substr(1);}
,firstLow:function(bA){return bA.charAt(0).toLowerCase()+bA.substr(1);}
,getClass:function(bC){var bB=Object.prototype.toString.call(bC);return (qx.Bootstrap.__c[bB]||bB.slice(8,-1));}
,isString:function(bD){return (bD!==null&&(typeof bD===k||qx.Bootstrap.getClass(bD)==t||bD instanceof String||(!!bD&&!!bD.$$isString)));}
,isArray:function(bE){return (bE!==null&&(bE instanceof Array||(bE&&qx.data&&qx.data.IListData&&qx.util.OOUtil.hasInterface(bE.constructor,qx.data.IListData))||qx.Bootstrap.getClass(bE)==D||(!!bE&&!!bE.$$isArray)));}
,isObject:function(bF){return (bF!==undefined&&bF!==null&&qx.Bootstrap.getClass(bF)==m);}
,isFunction:function(bG){return qx.Bootstrap.getClass(bG)==A;}
,$$logs:[],warn:function(bI,bH){qx.Bootstrap.$$logs.push([u,arguments]);}
,error:function(bK,bJ){qx.Bootstrap.$$logs.push([o,arguments]);}
,trace:function(bL){}
}});}
)();
(function(){var a="qx.bom.client.Xml.getSelectSingleNode",b="qx.bom.client.Stylesheet.getInsertRule",c="qx.bom.client.Html.getDataset",d="qx.bom.client.PhoneGap.getPhoneGap",e="qx.bom.client.EcmaScript.getArrayReduce",f="qx.core.Environment for a list of predefined keys.",g='] found, and no default ("default") given',h="qx.bom.client.Html.getAudioAif",j="qx.bom.client.CssTransform.get3D",k="qx.bom.client.EcmaScript.getArrayLastIndexOf",l=" is not a valid key. Please see the API-doc of ",m=' type)',n="qx.bom.client.EcmaScript.getArrayForEach",o="qx.bom.client.Xml.getAttributeNS",p="qx.bom.client.Stylesheet.getRemoveImport",q="qx.bom.client.Css.getUserModify",r="qx.bom.client.Css.getBoxShadow",s="qx.bom.client.Html.getXul",t="qx.bom.client.Plugin.getWindowsMedia",u=":",v="qx.blankpage",w="The environment key 'json' is deprecated ",x="qx.bom.client.Html.getVideo",y="qx.bom.client.Device.getName",z="qx.bom.client.Event.getTouch",A="qx.optimization.strings",B="qx.debug.property.level",C="qx.bom.client.EcmaScript.getArrayFilter",D="qx.bom.client.EcmaScript.getStringTrim",E="qx.optimization.variables",F="qx.bom.client.EcmaScript.getStackTrace",G="qx.bom.client.EcmaScript.getDateNow",H="qx.bom.client.EcmaScript.getArrayEvery",I="qx.bom.client.Xml.getImplementation",J="qx.bom.client.Html.getConsole",K="qx.bom.client.Engine.getVersion",L="qx.bom.client.Device.getType",M="qx.bom.client.Plugin.getQuicktime",N="qx.bom.client.Html.getNaturalDimensions",O="qx.bom.client.Xml.getSelectNodes",P="qx.bom.client.Xml.getElementsByTagNameNS",Q="qx.nativeScrollBars",R="qx.bom.client.Html.getDataUrl",S="qx.bom.client.Flash.isAvailable",T="qx.bom.client.Html.getCanvas",U="qx.dyntheme",V="qx.bom.client.Device.getPixelRatio",W="qx.bom.client.Css.getBoxModel",X="qx.bom.client.Plugin.getSilverlight",Y="qx/static/blank.html",ej="qx.bom.client.EcmaScript.getArrayMap",ee="qx.bom.client.Css.getUserSelect",ek="qx.bom.client.Css.getRadialGradient",eg="json",eh="module.property",ed="qx.bom.client.Plugin.getWindowsMediaVersion",ei="qx.bom.client.Stylesheet.getCreateStyleSheet",eo='No match for variant "',ep="qx.bom.client.Locale.getLocale",eq="module.events",er="qx.bom.client.Plugin.getSkype",el="module.databinding",em="qx.bom.client.Html.getFileReader",ef="qx.bom.client.Css.getBorderImage",en="qx.bom.client.Stylesheet.getDeleteRule",ev="qx.bom.client.EcmaScript.getErrorToString",eX="qx.bom.client.Plugin.getDivXVersion",ew="qx.bom.client.Scroll.scrollBarOverlayed",ex="qx.bom.client.Plugin.getPdfVersion",es="qx.bom.client.Xml.getCreateNode",et="qx.bom.client.Css.getAlphaImageLoaderNeeded",fY="qx.bom.client.Css.getLinearGradient",eu="qx.bom.client.Transport.getXmlHttpRequest",ey="qx.bom.client.Css.getBorderImageSyntax",ez="qx.bom.client.Html.getClassList",eA="qx.bom.client.Event.getHelp",eF="qx.optimization.comments",eG="qx.bom.client.Locale.getVariant",eH="qx.bom.client.Css.getBoxSizing",eB="qx.bom.client.OperatingSystem.getName",eC="module.logger",eD="qx.mobile.emulatetouch",eE="qx.bom.client.Html.getIsEqualNode",eL="qx.bom.client.Html.getAudioWav",eM="qx.bom.client.Browser.getName",eN="qx.bom.client.Css.getInlineBlock",eO="qx.bom.client.Plugin.getPdf",eI="qx.dynlocale",eJ="qx.bom.client.Device.getTouch",ga="qx.emulatemouse",eK='" (',eS="qx.bom.client.Html.getAudio",eT="qx.core.Environment",ge="qx.bom.client.EcmaScript.getFunctionBind",eU="qx.bom.client.CssTransform.getSupport",eP="qx.bom.client.Html.getTextContent",eQ="qx.bom.client.Css.getPlaceholder",gc="qx.bom.client.Css.getFloat",eR="default",eV=' in variants [',eW="false",fj="qx.bom.client.Css.getFilterGradient",fi="qx.bom.client.Html.getHistoryState",fh="qxenv",fn="qx.bom.client.Html.getSessionStorage",fm="qx.bom.client.Html.getAudioAu",fl="qx.bom.client.Css.getOpacity",fk="qx.bom.client.Css.getFilterTextShadow",fc="qx.bom.client.Html.getVml",fb="qx.bom.client.Transport.getMaxConcurrentRequestCount",fa="qx.bom.client.Event.getHashChange",eY="qx.bom.client.Css.getRgba",fg="qx.debug.dispose",ff="qx.bom.client.Css.getBorderRadius",fe="qx.bom.client.EcmaScript.getArraySome",fd="qx.bom.client.Transport.getSsl",fu="qx.bom.client.Html.getWebWorker",ft="qx.bom.client.Json.getJson",fs="qx.bom.client.Browser.getQuirksMode",fr="and will eventually be removed.",fy="qx.bom.client.Css.getTextOverflow",fx="qx.bom.client.EcmaScript.getArrayIndexOf",fw="qx.bom.client.Xml.getQualifiedItem",fv="qx.bom.client.Html.getVideoOgg",fq="&",fp="qx.bom.client.EcmaScript.getArrayReduceRight",fo="qx.bom.client.Engine.getMsPointer",fJ="qx.bom.client.Browser.getDocumentMode",fI="qx.allowUrlVariants",fH="qx.debug.ui.queue",fN="|",fM="qx.bom.client.Html.getContains",fL="qx.bom.client.Plugin.getActiveX",fK=".",fC="qx.bom.client.Xml.getDomProperties",fB="qx.bom.client.CssAnimation.getSupport",fA="qx.debug.databinding",fz="qx.optimization.basecalls",fG="qx.bom.client.Browser.getVersion",fF="qx.bom.client.Css.getUserSelectNone",fE="true",fD="qx.bom.client.Html.getSvg",fT="qx.bom.client.EcmaScript.getObjectKeys",fS="qx.bom.client.Plugin.getDivX",fR="qx.bom.client.Runtime.getName",fQ="qx.bom.client.Html.getLocalStorage",fX="qx.allowUrlSettings",fW="qx.bom.client.Flash.getStrictSecurityModel",fV="qx.aspects",fU="qx.debug",fP="qx.bom.client.Css.getPointerEvents",fO="qx.dynamicmousewheel",dO="qx.bom.client.Html.getAudioMp3",dN="qx.bom.client.Engine.getName",gf="qx.bom.client.Html.getUserDataStorage",dL="qx.bom.client.Plugin.getGears",dM="qx.bom.client.Plugin.getQuicktimeVersion",dK="qx.bom.client.Html.getAudioOgg",gd="qx.bom.client.Css.getTextShadow",dI="qx.bom.client.Plugin.getSilverlightVersion",dJ="qx.bom.client.Html.getCompareDocumentPosition",dH="qx.bom.client.Flash.getExpressInstall",gb="qx.bom.client.Html.getSelection",dF="qx.bom.client.OperatingSystem.getVersion",dG="qx.bom.client.Html.getXPath",dE="qx.bom.client.Html.getGeoLocation",dX="qx.optimization.privates",dY="qx.bom.client.Scroll.getNativeScroll",dV="qx.bom.client.Css.getAppearance",dW="qx.bom.client.CssTransition.getSupport",dT="qx.bom.client.Stylesheet.getAddImport",dU="qx.optimization.variants",dS="qx.bom.client.Html.getVideoWebm",dD="qx.bom.client.Flash.getVersion",dQ="qx.bom.client.CssAnimation.getRequestAnimationFrame",dR="qx.bom.client.Css.getLegacyWebkitGradient",dP="qx.bom.client.PhoneGap.getNotification",ec="qx.bom.client.Html.getVideoH264",ea="qx.bom.client.Xml.getCreateElementNS",eb="qx.bom.client.Xml.getDomParser";qx.Bootstrap.define(eT,{statics:{_checks:{},_asyncChecks:{},__d:{},_checksMap:{"engine.version":K,"engine.name":dN,"browser.name":eM,"browser.version":fG,"browser.documentmode":fJ,"browser.quirksmode":fs,"runtime.name":fR,"device.name":y,"device.type":L,"device.pixelRatio":V,"device.touch":eJ,"locale":ep,"locale.variant":eG,"os.name":eB,"os.version":dF,"os.scrollBarOverlayed":ew,"plugin.gears":dL,"plugin.activex":fL,"plugin.skype":er,"plugin.quicktime":M,"plugin.quicktime.version":dM,"plugin.windowsmedia":t,"plugin.windowsmedia.version":ed,"plugin.divx":fS,"plugin.divx.version":eX,"plugin.silverlight":X,"plugin.silverlight.version":dI,"plugin.flash":S,"plugin.flash.version":dD,"plugin.flash.express":dH,"plugin.flash.strictsecurity":fW,"plugin.pdf":eO,"plugin.pdf.version":ex,"io.maxrequests":fb,"io.ssl":fd,"io.xhr":eu,"event.touch":z,"event.mspointer":fo,"event.help":eA,"event.hashchange":fa,"ecmascript.error.stacktrace":F,"ecmascript.array.indexof":fx,"ecmascript.array.lastindexof":k,"ecmascript.array.foreach":n,"ecmascript.array.filter":C,"ecmascript.array.map":ej,"ecmascript.array.some":fe,"ecmascript.array.every":H,"ecmascript.array.reduce":e,"ecmascript.array.reduceright":fp,"ecmascript.function.bind":ge,"ecmascript.object.keys":fT,"ecmascript.date.now":G,"ecmascript.error.toString":ev,"ecmascript.string.trim":D,"html.webworker":fu,"html.filereader":em,"html.geolocation":dE,"html.audio":eS,"html.audio.ogg":dK,"html.audio.mp3":dO,"html.audio.wav":eL,"html.audio.au":fm,"html.audio.aif":h,"html.video":x,"html.video.ogg":fv,"html.video.h264":ec,"html.video.webm":dS,"html.storage.local":fQ,"html.storage.session":fn,"html.storage.userdata":gf,"html.classlist":ez,"html.xpath":dG,"html.xul":s,"html.canvas":T,"html.svg":fD,"html.vml":fc,"html.dataset":c,"html.dataurl":R,"html.console":J,"html.stylesheet.createstylesheet":ei,"html.stylesheet.insertrule":b,"html.stylesheet.deleterule":en,"html.stylesheet.addimport":dT,"html.stylesheet.removeimport":p,"html.element.contains":fM,"html.element.compareDocumentPosition":dJ,"html.element.textcontent":eP,"html.image.naturaldimensions":N,"html.history.state":fi,"html.selection":gb,"html.node.isequalnode":eE,"json":ft,"css.textoverflow":fy,"css.placeholder":eQ,"css.borderradius":ff,"css.borderimage":ef,"css.borderimage.standardsyntax":ey,"css.boxshadow":r,"css.gradient.linear":fY,"css.gradient.filter":fj,"css.gradient.radial":ek,"css.gradient.legacywebkit":dR,"css.boxmodel":W,"css.rgba":eY,"css.userselect":ee,"css.userselect.none":fF,"css.usermodify":q,"css.appearance":dV,"css.float":gc,"css.boxsizing":eH,"css.animation":fB,"css.animation.requestframe":dQ,"css.transform":eU,"css.transform.3d":j,"css.transition":dW,"css.inlineblock":eN,"css.opacity":fl,"css.textShadow":gd,"css.textShadow.filter":fk,"css.alphaimageloaderneeded":et,"css.pointerevents":fP,"phonegap":d,"phonegap.notification":dP,"xml.implementation":I,"xml.domparser":eb,"xml.selectsinglenode":a,"xml.selectnodes":O,"xml.getelementsbytagnamens":P,"xml.domproperties":fC,"xml.attributens":o,"xml.createnode":es,"xml.getqualifieditem":fw,"xml.createelementns":ea,"qx.mobile.nativescroll":dY},get:function(gj){if(qx.Bootstrap.DEBUG){if(gj===eg){qx.Bootstrap.warn(w+fr);}
;}
;if(this.__d[gj]!=undefined){return this.__d[gj];}
;var gl=this._checks[gj];if(gl){var gh=gl();this.__d[gj]=gh;return gh;}
;var gg=this._getClassNameFromEnvKey(gj);if(gg[0]!=undefined){var gk=gg[0];var gi=gg[1];var gh=gk[gi]();this.__d[gj]=gh;return gh;}
;if(qx.Bootstrap.DEBUG){qx.Bootstrap.warn(gj+l+f);qx.Bootstrap.trace(this);}
;}
,_getClassNameFromEnvKey:function(gq){var gs=this._checksMap;if(gs[gq]!=undefined){var gn=gs[gq];var gr=gn.lastIndexOf(fK);if(gr>-1){var gp=gn.slice(0,gr);var gm=gn.slice(gr+1);var go=qx.Bootstrap.getByName(gp);if(go!=undefined){return [go,gm];}
;}
;}
;return [undefined,undefined];}
,select:function(gu,gt){return this.__e(this.get(gu),gt);}
,__e:function(gy,gx){var gw=gx[gy];if(gx.hasOwnProperty(gy)){return gw;}
;for(var gz in gx){if(gz.indexOf(fN)!=-1){var gv=gz.split(fN);for(var i=0;i<gv.length;i++ ){if(gv[i]==gy){return gx[gz];}
;}
;}
;}
;if(gx[eR]!==undefined){return gx[eR];}
;if(qx.Bootstrap.DEBUG){throw new Error(eo+gy+eK+(typeof gy)+m+eV+qx.Bootstrap.keys(gx)+g);}
;}
,add:function(gB,gA){if(this._checks[gB]==undefined){if(gA instanceof Function){this._checks[gB]=gA;}
else {this._checks[gB]=this.__h(gA);}
;}
;}
,addAsync:function(gD,gC){if(this._checks[gD]==undefined){this._asyncChecks[gD]=gC;}
;}
,_initDefaultQxValues:function(){this.add(fE,function(){return true;}
);this.add(fX,function(){return false;}
);this.add(fI,function(){return false;}
);this.add(B,function(){return 0;}
);this.add(fU,function(){return true;}
);this.add(fH,function(){return true;}
);this.add(fV,function(){return false;}
);this.add(eI,function(){return true;}
);this.add(U,function(){return true;}
);this.add(eD,function(){return false;}
);this.add(ga,function(){return false;}
);this.add(v,function(){return Y;}
);this.add(fO,function(){return true;}
);this.add(fA,function(){return false;}
);this.add(fg,function(){return false;}
);this.add(fz,function(){return false;}
);this.add(eF,function(){return false;}
);this.add(dX,function(){return false;}
);this.add(A,function(){return false;}
);this.add(E,function(){return false;}
);this.add(dU,function(){return false;}
);this.add(el,function(){return true;}
);this.add(eC,function(){return true;}
);this.add(eh,function(){return true;}
);this.add(eq,function(){return true;}
);this.add(Q,function(){return false;}
);}
,__f:function(){if(qx&&qx.$$environment){for(var gE in qx.$$environment){var gF=qx.$$environment[gE];this._checks[gE]=this.__h(gF);}
;}
;}
,__g:function(){if(window.document&&window.document.location){var gG=window.document.location.search.slice(1).split(fq);for(var i=0;i<gG.length;i++ ){var gJ=gG[i].split(u);if(gJ.length!=3||gJ[0]!=fh){continue;}
;var gH=gJ[1];var gI=decodeURIComponent(gJ[2]);if(gI==fE){gI=true;}
else if(gI==eW){gI=false;}
else if(/^(\d|\.)+$/.test(gI)){gI=parseFloat(gI);}
;this._checks[gH]=this.__h(gI);}
;}
;}
,__h:function(gK){return qx.Bootstrap.bind(function(gL){return gL;}
,null,gK);}
},defer:function(gM){gM._initDefaultQxValues();gM.__f();if(gM.get(fX)===true){gM.__g();}
;}
});}
)();
(function(){var a="[object Opera]",b="function",c="[^\\.0-9]",d="4.0",e="gecko",f="1.9.0.0",g="Version/",h="9.0",i="8.0",j="Gecko",k="Maple",l="AppleWebKit/",m="Trident",n="Unsupported client: ",o="",p="opera",q="engine.version",r="! Assumed gecko version 1.9.0.0 (Firefox 3.0).",s="mshtml",t="engine.name",u="webkit",v="5.0",w=".",x="qx.bom.client.Engine";qx.Bootstrap.define(x,{statics:{getVersion:function(){var A=window.navigator.userAgent;var B=o;if(qx.bom.client.Engine.__i()){if(/Opera[\s\/]([0-9]+)\.([0-9])([0-9]*)/.test(A)){if(A.indexOf(g)!=-1){var D=A.match(/Version\/(\d+)\.(\d+)/);B=D[1]+w+D[2].charAt(0)+w+D[2].substring(1,D[2].length);}
else {B=RegExp.$1+w+RegExp.$2;if(RegExp.$3!=o){B+=w+RegExp.$3;}
;}
;}
;}
else if(qx.bom.client.Engine.__j()){if(/AppleWebKit\/([^ ]+)/.test(A)){B=RegExp.$1;var C=RegExp(c).exec(B);if(C){B=B.slice(0,C.index);}
;}
;}
else if(qx.bom.client.Engine.__l()||qx.bom.client.Engine.__k()){if(/rv\:([^\);]+)(\)|;)/.test(A)){B=RegExp.$1;}
;}
else if(qx.bom.client.Engine.__m()){var z=/Trident\/([^\);]+)(\)|;)/.test(A);if(/MSIE\s+([^\);]+)(\)|;)/.test(A)){B=RegExp.$1;if(B<8&&z){if(RegExp.$1==d){B=i;}
else if(RegExp.$1==v){B=h;}
;}
;}
else if(z){var D=/\brv\:(\d+?\.\d+?)\b/.exec(A);if(D){B=D[1];}
;}
;}
else {var y=window.qxFail;if(y&&typeof y===b){B=y().FULLVERSION;}
else {B=f;qx.Bootstrap.warn(n+A+r);}
;}
;return B;}
,getName:function(){var name;if(qx.bom.client.Engine.__i()){name=p;}
else if(qx.bom.client.Engine.__j()){name=u;}
else if(qx.bom.client.Engine.__l()||qx.bom.client.Engine.__k()){name=e;}
else if(qx.bom.client.Engine.__m()){name=s;}
else {var E=window.qxFail;if(E&&typeof E===b){name=E().NAME;}
else {name=e;qx.Bootstrap.warn(n+window.navigator.userAgent+r);}
;}
;return name;}
,__i:function(){return window.opera&&Object.prototype.toString.call(window.opera)==a;}
,__j:function(){return window.navigator.userAgent.indexOf(l)!=-1;}
,__k:function(){return window.navigator.userAgent.indexOf(k)!=-1;}
,__l:function(){return window.controllers&&window.navigator.product===j&&window.navigator.userAgent.indexOf(k)==-1&&window.navigator.userAgent.indexOf(m)==-1;}
,__m:function(){return window.navigator.cpuClass&&(/MSIE\s+([^\);]+)(\)|;)/.test(window.navigator.userAgent)||/Trident\/\d+?\.\d+?/.test(window.navigator.userAgent));}
},defer:function(F){qx.core.Environment.add(q,F.getVersion);qx.core.Environment.add(t,F.getName);}
});}
)();
(function(){var a="ecmascript.array.lastindexof",b="function",c="stack",d="ecmascript.array.map",f="ecmascript.date.now",g="ecmascript.array.reduce",h="e",i="qx.bom.client.EcmaScript",j="ecmascript.object.keys",k="ecmascript.error.stacktrace",l="ecmascript.string.trim",m="ecmascript.array.indexof",n="stacktrace",o="ecmascript.error.toString",p="[object Error]",q="ecmascript.array.foreach",r="ecmascript.function.bind",s="ecmascript.array.reduceright",t="ecmascript.array.some",u="ecmascript.array.filter",v="ecmascript.array.every";qx.Bootstrap.define(i,{statics:{getStackTrace:function(){var w;var e=new Error(h);w=e.stack?c:e.stacktrace?n:null;if(!w){try{throw e;}
catch(x){e=x;}
;}
;return e.stacktrace?n:e.stack?c:null;}
,getArrayIndexOf:function(){return !!Array.prototype.indexOf;}
,getArrayLastIndexOf:function(){return !!Array.prototype.lastIndexOf;}
,getArrayForEach:function(){return !!Array.prototype.forEach;}
,getArrayFilter:function(){return !!Array.prototype.filter;}
,getArrayMap:function(){return !!Array.prototype.map;}
,getArraySome:function(){return !!Array.prototype.some;}
,getArrayEvery:function(){return !!Array.prototype.every;}
,getArrayReduce:function(){return !!Array.prototype.reduce;}
,getArrayReduceRight:function(){return !!Array.prototype.reduceRight;}
,getErrorToString:function(){return typeof Error.prototype.toString==b&&Error.prototype.toString()!==p;}
,getFunctionBind:function(){return typeof Function.prototype.bind===b;}
,getObjectKeys:function(){return !!Object.keys;}
,getDateNow:function(){return !!Date.now;}
,getStringTrim:function(){return typeof String.prototype.trim===b;}
},defer:function(y){qx.core.Environment.add(m,y.getArrayIndexOf);qx.core.Environment.add(a,y.getArrayLastIndexOf);qx.core.Environment.add(q,y.getArrayForEach);qx.core.Environment.add(u,y.getArrayFilter);qx.core.Environment.add(d,y.getArrayMap);qx.core.Environment.add(t,y.getArraySome);qx.core.Environment.add(v,y.getArrayEvery);qx.core.Environment.add(g,y.getArrayReduce);qx.core.Environment.add(s,y.getArrayReduceRight);qx.core.Environment.add(f,y.getDateNow);qx.core.Environment.add(o,y.getErrorToString);qx.core.Environment.add(k,y.getStackTrace);qx.core.Environment.add(r,y.getFunctionBind);qx.core.Environment.add(j,y.getObjectKeys);qx.core.Environment.add(l,y.getStringTrim);}
});}
)();
(function(){var a="function",b="ecmascript.array.lastindexof",c="ecmascript.array.map",d="ecmascript.array.filter",e="Length is 0 and no second argument given",f="qx.lang.normalize.Array",g="ecmascript.array.indexof",h="First argument is not callable",j="ecmascript.array.reduce",k="ecmascript.array.foreach",m="ecmascript.array.reduceright",n="ecmascript.array.some",o="ecmascript.array.every";qx.Bootstrap.define(f,{defer:function(){if(!qx.core.Environment.get(g)){Array.prototype.indexOf=function(p,q){if(q==null){q=0;}
else if(q<0){q=Math.max(0,this.length+q);}
;for(var i=q;i<this.length;i++ ){if(this[i]===p){return i;}
;}
;return -1;}
;}
;if(!qx.core.Environment.get(b)){Array.prototype.lastIndexOf=function(r,s){if(s==null){s=this.length-1;}
else if(s<0){s=Math.max(0,this.length+s);}
;for(var i=s;i>=0;i-- ){if(this[i]===r){return i;}
;}
;return -1;}
;}
;if(!qx.core.Environment.get(k)){Array.prototype.forEach=function(t,u){var l=this.length;for(var i=0;i<l;i++ ){var v=this[i];if(v!==undefined){t.call(u||window,v,i,this);}
;}
;}
;}
;if(!qx.core.Environment.get(d)){Array.prototype.filter=function(z,w){var x=[];var l=this.length;for(var i=0;i<l;i++ ){var y=this[i];if(y!==undefined){if(z.call(w||window,y,i,this)){x.push(this[i]);}
;}
;}
;return x;}
;}
;if(!qx.core.Environment.get(c)){Array.prototype.map=function(D,A){var B=[];var l=this.length;for(var i=0;i<l;i++ ){var C=this[i];if(C!==undefined){B[i]=D.call(A||window,C,i,this);}
;}
;return B;}
;}
;if(!qx.core.Environment.get(n)){Array.prototype.some=function(E,F){var l=this.length;for(var i=0;i<l;i++ ){var G=this[i];if(G!==undefined){if(E.call(F||window,G,i,this)){return true;}
;}
;}
;return false;}
;}
;if(!qx.core.Environment.get(o)){Array.prototype.every=function(H,I){var l=this.length;for(var i=0;i<l;i++ ){var J=this[i];if(J!==undefined){if(!H.call(I||window,J,i,this)){return false;}
;}
;}
;return true;}
;}
;if(!qx.core.Environment.get(j)){Array.prototype.reduce=function(K,L){if(typeof K!==a){throw new TypeError(h);}
;if(L===undefined&&this.length===0){throw new TypeError(e);}
;var M=L===undefined?this[0]:L;for(var i=L===undefined?1:0;i<this.length;i++ ){if(i in this){M=K.call(undefined,M,this[i],i,this);}
;}
;return M;}
;}
;if(!qx.core.Environment.get(m)){Array.prototype.reduceRight=function(N,O){if(typeof N!==a){throw new TypeError(h);}
;if(O===undefined&&this.length===0){throw new TypeError(e);}
;var P=O===undefined?this[this.length-1]:O;for(var i=O===undefined?this.length-2:this.length-1;i>=0;i-- ){if(i in this){P=N.call(undefined,P,this[i],i,this);}
;}
;return P;}
;}
;}
});}
)();
(function(){var a="mshtml",b="engine.name",c="pop.push.reverse.shift.sort.splice.unshift.join.slice",d="number",e="qx.type.BaseArray",f=".";qx.Bootstrap.define(e,{extend:Array,construct:function(g){}
,members:{toArray:null,valueOf:null,pop:null,push:null,reverse:null,shift:null,sort:null,splice:null,unshift:null,concat:null,join:null,slice:null,toString:null,indexOf:null,lastIndexOf:null,forEach:null,filter:null,map:null,some:null,every:null}});(function(){function h(p){if((qx.core.Environment.get(b)==a)){j.prototype={length:0,$$isArray:true};var n=c.split(f);for(var length=n.length;length;){j.prototype[n[ --length]]=Array.prototype[n[length]];}
;}
;var m=Array.prototype.slice;j.prototype.concat=function(){var r=this.slice(0);for(var i=0,length=arguments.length;i<length;i++ ){var q;if(arguments[i] instanceof j){q=m.call(arguments[i],0);}
else if(arguments[i] instanceof Array){q=arguments[i];}
else {q=[arguments[i]];}
;r.push.apply(r,q);}
;return r;}
;j.prototype.toString=function(){return m.call(this,0).toString();}
;j.prototype.toLocaleString=function(){return m.call(this,0).toLocaleString();}
;j.prototype.constructor=j;j.prototype.indexOf=Array.prototype.indexOf;j.prototype.lastIndexOf=Array.prototype.lastIndexOf;j.prototype.forEach=Array.prototype.forEach;j.prototype.some=Array.prototype.some;j.prototype.every=Array.prototype.every;var o=Array.prototype.filter;var l=Array.prototype.map;j.prototype.filter=function(){var s=new this.constructor;s.push.apply(s,o.apply(this,arguments));return s;}
;j.prototype.map=function(){var t=new this.constructor;t.push.apply(t,l.apply(this,arguments));return t;}
;j.prototype.slice=function(){var u=new this.constructor;u.push.apply(u,Array.prototype.slice.apply(this,arguments));return u;}
;j.prototype.splice=function(){var v=new this.constructor;v.push.apply(v,Array.prototype.splice.apply(this,arguments));return v;}
;j.prototype.toArray=function(){return Array.prototype.slice.call(this,0);}
;j.prototype.valueOf=function(){return this.length;}
;return j;}
;function j(length){if(arguments.length===1&&typeof length===d){this.length=-1<length&&length===length>>.5?length:this.push(length);}
else if(arguments.length){this.push.apply(this,arguments);}
;}
;function k(){}
;k.prototype=[];j.prototype=new k;j.prototype.length=0;qx.type.BaseArray=h(j);}
)();}
)();
(function(){var a="qxWeb",b="data-qx-class";qx.Bootstrap.define(a,{extend:qx.type.BaseArray,statics:{__n:[],$$qx:qx,$init:function(g,e){var f=[];for(var i=0;i<g.length;i++ ){var d=!!(g[i]&&(g[i].nodeType===1||g[i].nodeType===9));if(d){f.push(g[i]);continue;}
;var c=!!(g[i]&&g[i].history&&g[i].location&&g[i].document);if(c){f.push(g[i]);}
;}
;if(g[0]&&g[0].getAttribute&&g[0].getAttribute(b)){e=qx.Bootstrap.getByName(g[0].getAttribute(b))||e;}
;var h=qx.lang.Array.cast(f,e);for(var i=0;i<qxWeb.__n.length;i++ ){qxWeb.__n[i].call(h);}
;return h;}
,$attach:function(j){for(var name in j){{}
;qxWeb.prototype[name]=j[name];}
;}
,$attachStatic:function(k){for(var name in k){{}
;qxWeb[name]=k[name];}
;}
,$attachInit:function(m){this.__n.push(m);}
,define:function(name,n){if(n==undefined){n=name;name=null;}
;return qx.Bootstrap.define.call(qx.Bootstrap,name,n);}
},construct:function(p,o){if(!p&&this instanceof qxWeb){return this;}
;if(qx.Bootstrap.isString(p)){if(o instanceof qxWeb){o=o[0];}
;p=qx.bom.Selector.query(p,o);}
else if(!(qx.Bootstrap.isArray(p))){p=[p];}
;return qxWeb.$init(p,qxWeb);}
,members:{filter:function(r){if(qx.lang.Type.isFunction(r)){return qxWeb.$init(Array.prototype.filter.call(this,r),this.constructor);}
;return qxWeb.$init(qx.bom.Selector.matches(r,this),this.constructor);}
,unique:function(){var s=qx.lang.Array.unique(this);return qxWeb.$init(s,this.constructor);}
,slice:function(t,u){if(u!==undefined){return qxWeb.$init(Array.prototype.slice.call(this,t,u),this.constructor);}
;return qxWeb.$init(Array.prototype.slice.call(this,t),this.constructor);}
,splice:function(v,w,x){return qxWeb.$init(Array.prototype.splice.apply(this,arguments),this.constructor);}
,map:function(y,z){return qxWeb.$init(Array.prototype.map.apply(this,arguments),this.constructor);}
,concat:function(B){var A=Array.prototype.slice.call(this,0);for(var i=0;i<arguments.length;i++ ){if(arguments[i] instanceof qxWeb){A=A.concat(Array.prototype.slice.call(arguments[i],0));}
else {A.push(arguments[i]);}
;}
;return qxWeb.$init(A,this.constructor);}
,indexOf:function(C){if(!C){return -1;}
;if(qx.Bootstrap.isArray(C)){C=C[0];}
;for(var i=0,l=this.length;i<l;i++ ){if(this[i]===C){return i;}
;}
;return -1;}
,debug:function(){debugger;return this;}
,_forEachElement:function(E,D){for(var i=0,l=this.length;i<l;i++ ){if(this[i]&&this[i].nodeType===1){E.apply(D||this,[this[i],i,this]);}
;}
;return this;}
,_forEachElementWrapped:function(G,F){this._forEachElement(function(H,J,I){G.apply(this,[qxWeb(H),J,I]);}
,F);return this;}
},defer:function(K){if(window.q==undefined){q=K;}
;}
});}
)();
(function(){var a="qx.lang.normalize.Date",b="ecmascript.date.now";qx.Bootstrap.define(a,{defer:function(){if(!qx.core.Environment.get(b)){Date.now=function(){return +new Date();}
;}
;}
});}
)();
(function(){var a="mshtml",b="engine.name",c="[object Array]",d="qx.lang.Array",e="Cannot clean-up map entry doneObjects[",f="]",g="qx",h="number",j="][",k="string";qx.Bootstrap.define(d,{statics:{cast:function(m,o,p){if(m.constructor===o){return m;}
;if(qx.data&&qx.data.IListData){if(qx.Class&&qx.Class.hasInterface(m,qx.data.IListData)){var m=m.toArray();}
;}
;var n=new o;if((qx.core.Environment.get(b)==a)){if(m.item){for(var i=p||0,l=m.length;i<l;i++ ){n.push(m[i]);}
;return n;}
;}
;if(Object.prototype.toString.call(m)===c&&p==null){n.push.apply(n,m);}
else {n.push.apply(n,Array.prototype.slice.call(m,p||0));}
;return n;}
,fromArguments:function(q,r){return Array.prototype.slice.call(q,r||0);}
,fromCollection:function(t){if((qx.core.Environment.get(b)==a)){if(t.item){var s=[];for(var i=0,l=t.length;i<l;i++ ){s[i]=t[i];}
;return s;}
;}
;return Array.prototype.slice.call(t,0);}
,insertBefore:function(u,w,v){var i=u.indexOf(v);if(i==-1){u.push(w);}
else {u.splice(i,0,w);}
;return u;}
,insertAfter:function(x,z,y){var i=x.indexOf(y);if(i==-1||i==(x.length-1)){x.push(z);}
else {x.splice(i+1,0,z);}
;return x;}
,removeAt:function(A,i){return A.splice(i,1)[0];}
,removeAll:function(B){B.length=0;return this;}
,exclude:function(E,D){{}
;for(var i=0,F=D.length,C;i<F;i++ ){C=E.indexOf(D[i]);if(C!=-1){E.splice(C,1);}
;}
;return E;}
,remove:function(G,H){var i=G.indexOf(H);if(i!=-1){G.splice(i,1);return H;}
;}
,contains:function(I,J){return I.indexOf(J)!==-1;}
,equals:function(L,K){var length=L.length;if(length!==K.length){return false;}
;for(var i=0;i<length;i++ ){if(L[i]!==K[i]){return false;}
;}
;return true;}
,max:function(M){{}
;var i,O=M.length,N=M[0];for(i=1;i<O;i++ ){if(M[i]>N){N=M[i];}
;}
;return N===undefined?null:N;}
,min:function(P){{}
;var i,R=P.length,Q=P[0];for(i=1;i<R;i++ ){if(P[i]<Q){Q=P[i];}
;}
;return Q===undefined?null:Q;}
,unique:function(U){var bf=[],T={},X={},ba={};var Y,S=0;var bd=g+Date.now();var V=false,bb=false,be=false;for(var i=0,bc=U.length;i<bc;i++ ){Y=U[i];if(Y===null){if(!V){V=true;bf.push(Y);}
;}
else if(Y===undefined){}
else if(Y===false){if(!bb){bb=true;bf.push(Y);}
;}
else if(Y===true){if(!be){be=true;bf.push(Y);}
;}
else if(typeof Y===k){if(!T[Y]){T[Y]=1;bf.push(Y);}
;}
else if(typeof Y===h){if(!X[Y]){X[Y]=1;bf.push(Y);}
;}
else {var W=Y[bd];if(W==null){W=Y[bd]=S++ ;}
;if(!ba[W]){ba[W]=Y;bf.push(Y);}
;}
;}
;for(var W in ba){try{delete ba[W][bd];}
catch(bg){try{ba[W][bd]=null;}
catch(bh){throw new Error(e+W+j+bd+f);}
;}
;}
;return bf;}
}});}
)();
(function(){var c="-",d="*(?:checked|disabled|ismap|multiple|readonly|selected|value)",f="(^|",g="'] ",h=":active",k=":disabled",l="div",n=")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:",o="[selected]",p="'></div>",q="[test!='']:sizzle",r="nth",s="*(?:",t="*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(",u="<a name='",v="option",w="image",x="*([\\x20\\t\\r\\n\\f>+~])",y="~=",z="previousSibling",A="*(even|odd|(([+-]|)(\\d*)n|)",B="only",C="*",D="+|((?:^|[^\\\\])(?:\\\\.)*)",E="i",F="='$1']",G="@",H="w#",I="^=",J="*\\)|)",K="+$",L="=",M=":focus",N="id",O="first",P="'></a><div name='",Q="$=",R="reset",S="string",T="[\\x20\\t\\r\\n\\f]",U="*(?:([+-]|)",V="*((?:-\\d)?\\d*)",W="#",X="input",Y="type",cH="parentNode",cI="(",cJ="w",cD="password",cE="even",cF="TAG",cG="*[>+~]|",cN="*\\]",cO="*(?:\"\"|'')",cT="*\\)|)(?=[^-]|$)",cP="unsupported pseudo: ",cK="w*",cL=" ",cM="*,",dx="text",ef="^",cU=")",cQ=":(",cR="[test^='']",ec="radio",cS="sizcache",cV="button",cW="0",cX="^(",dd="<input type='hidden'/>",de="odd",df="class",cY="*(\\d+)|))",da="<p test=''></p>",db="|=",dc="\\[",dk="<div class='hidden e'></div><div class='hidden'></div>",dl="g",dm="submit",dn="!=",dg="<select><option selected=''></option></select>",dh="e",di="checkbox",dj="*=",ds="|",dt=".",ee="<select></select>",du="object",dp="$1",dq="file",ed="eq",dr="qx.bom.Selector",dv="CHILD",dw="|$)",dI=",",dH=":(even|odd|eq|gt|lt|nth|first|last)(?:\\(",dG=")['\"]?\\]",dM="<a href='#'></a>",dL="empty",dK=":enabled",dJ="[id='",dB="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",dA="^#(",dz="[*^$]=",dy="^:(only|nth|first|last)-child(?:\\(",dF="*(",dE="^\\.(",dD="",dC="href",dT="multiple",dS=")|[^:]|\\\\.)*|.*))\\)|)",dR=")|)|)",dQ="POS",dX="boolean",dW="Syntax error, unrecognized expression: ",dV="([*^$|!~]?=)",dU="^\\[name=['\"]?(",dP="\\$&",dO=":checked",dN="undefined",eb="ID",ea="last",dY="HTML";qx.Bootstrap.define(dr,{statics:{query:null,matches:null}});(function(window,undefined){var ep,fg,eR,em,er,eA,fm,eF,es,eg,eK=true,eE=dN,fc=(cS+Math.random()).replace(dt,dD),eW=String,document=window.document,fv=document.documentElement,eJ=0,fs=0,eP=[].pop,fr=[].push,ev=[].slice,eQ=[].indexOf||function(fw){var i=0,fx=this.length;for(;i<fx;i++ ){if(this[i]===fw){return i;}
;}
;return -1;}
,fi=function(fy,fz){fy[fc]=fz==null||fz;return fy;}
,eo=function(){var fB={},fA=[];return fi(function(fC,fD){if(fA.push(fC)>eR.cacheLength){delete fB[fA.shift()];}
;return (fB[fC]=fD);}
,fB);}
,fj=eo(),fb=eo(),ft=eo(),ex=T,eT=dB,eN=eT.replace(cJ,H),ez=dV,eM=dc+ex+dF+eT+cU+ex+s+ez+ex+t+eN+dR+ex+cN,eS=cQ+eT+n+eM+dS,el=dH+ex+V+ex+cT,ek=new RegExp(ef+ex+D+ex+K,dl),fh=new RegExp(ef+ex+cM+ex+C),ey=new RegExp(ef+ex+x+ex+C),fd=new RegExp(eS),fp=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,ff=/^:not/,eO=/[\x20\t\r\n\f]*[+~]/,eu=/:not\($/,ej=/h\d/i,eY=/input|select|textarea|button/i,eq=/\\(?!\\)/g,fl={"ID":new RegExp(dA+eT+cU),"CLASS":new RegExp(dE+eT+cU),"NAME":new RegExp(dU+eT+dG),"TAG":new RegExp(cX+eT.replace(cJ,cK)+cU),"ATTR":new RegExp(ef+eM),"PSEUDO":new RegExp(ef+eS),"POS":new RegExp(el,E),"CHILD":new RegExp(dy+ex+A+ex+U+ex+cY+ex+J,E),"needsContext":new RegExp(ef+ex+cG+el,E)},eV=function(fF){var fE=document.createElement(l);try{return fF(fE);}
catch(e){return false;}
finally{fE=null;}
;}
,en=eV(function(fG){fG.appendChild(document.createComment(dD));return !fG.getElementsByTagName(C).length;}
),eI=eV(function(fH){fH.innerHTML=dM;return fH.firstChild&&typeof fH.firstChild.getAttribute!==eE&&fH.firstChild.getAttribute(dC)===W;}
),fk=eV(function(fI){fI.innerHTML=ee;var fJ=typeof fI.lastChild.getAttribute(dT);return fJ!==dX&&fJ!==S;}
),fq=eV(function(fK){fK.innerHTML=dk;if(!fK.getElementsByClassName||!fK.getElementsByClassName(dh).length){return false;}
;fK.lastChild.className=dh;return fK.getElementsByClassName(dh).length===2;}
),eh=eV(function(fL){fL.id=fc+0;fL.innerHTML=u+fc+P+fc+p;fv.insertBefore(fL,fv.firstChild);var fM=document.getElementsByName&&document.getElementsByName(fc).length===2+document.getElementsByName(fc+0).length;fg=!document.getElementById(fc);fv.removeChild(fL);return fM;}
);try{ev.call(fv.childNodes,0)[0].nodeType;}
catch(e){ev=function(i){var fN,fO=[];for(;(fN=this[i]);i++ ){fO.push(fN);}
;return fO;}
;}
;function eX(fV,fU,fS,fT){fS=fS||[];fU=fU||document;var fW,fR,fP,m,fQ=fU.nodeType;if(!fV||typeof fV!==S){return fS;}
;if(fQ!==1&&fQ!==9){return [];}
;fP=er(fU);if(!fP&&!fT){if((fW=fp.exec(fV))){if((m=fW[1])){if(fQ===9){fR=fU.getElementById(m);if(fR&&fR.parentNode){if(fR.id===m){fS.push(fR);return fS;}
;}
else {return fS;}
;}
else {if(fU.ownerDocument&&(fR=fU.ownerDocument.getElementById(m))&&eA(fU,fR)&&fR.id===m){fS.push(fR);return fS;}
;}
;}
else if(fW[2]){fr.apply(fS,ev.call(fU.getElementsByTagName(fV),0));return fS;}
else if((m=fW[3])&&fq&&fU.getElementsByClassName){fr.apply(fS,ev.call(fU.getElementsByClassName(m),0));return fS;}
;}
;}
;return et(fV.replace(ek,dp),fU,fS,fT,fP);}
;eX.matches=function(fX,fY){return eX(fX,null,null,fY);}
;eX.matchesSelector=function(gb,ga){return eX(ga,null,null,[gb]).length>0;}
;function fo(gc){return function(gd){var name=gd.nodeName.toLowerCase();return name===X&&gd.type===gc;}
;}
;function ei(ge){return function(gf){var name=gf.nodeName.toLowerCase();return (name===X||name===cV)&&gf.type===ge;}
;}
;function eU(gg){return fi(function(gh){gh=+gh;return fi(function(gk,gi){var j,gj=gg([],gk.length,gh),i=gj.length;while(i-- ){if(gk[(j=gj[i])]){gk[j]=!(gi[j]=gk[j]);}
;}
;}
);}
);}
;em=eX.getText=function(gn){var gl,go=dD,i=0,gm=gn.nodeType;if(gm){if(gm===1||gm===9||gm===11){if(typeof gn.textContent===S){return gn.textContent;}
else {for(gn=gn.firstChild;gn;gn=gn.nextSibling){go+=em(gn);}
;}
;}
else if(gm===3||gm===4){return gn.nodeValue;}
;}
else {for(;(gl=gn[i]);i++ ){go+=em(gl);}
;}
;return go;}
;er=eX.isXML=function(gp){var gq=gp&&(gp.ownerDocument||gp).documentElement;return gq?gq.nodeName!==dY:false;}
;eA=eX.contains=fv.contains?function(a,b){var gr=a.nodeType===9?a.documentElement:a,gs=b&&b.parentNode;return a===gs||!!(gs&&gs.nodeType===1&&gr.contains&&gr.contains(gs));}
:fv.compareDocumentPosition?function(a,b){return b&&!!(a.compareDocumentPosition(b)&16);}
:function(a,b){while((b=b.parentNode)){if(b===a){return true;}
;}
;return false;}
;eX.attr=function(gu,name){var gv,gt=er(gu);if(!gt){name=name.toLowerCase();}
;if((gv=eR.attrHandle[name])){return gv(gu);}
;if(gt||fk){return gu.getAttribute(name);}
;gv=gu.getAttributeNode(name);return gv?typeof gu[name]===dX?gu[name]?name:null:gv.specified?gv.value:null:null;}
;eR=eX.selectors={cacheLength:50,createPseudo:fi,match:fl,attrHandle:eI?{}:{"href":function(gw){return gw.getAttribute(dC,2);}
,"type":function(gx){return gx.getAttribute(Y);}
},find:{"ID":fg?function(gz,gA,gy){if(typeof gA.getElementById!==eE&&!gy){var m=gA.getElementById(gz);return m&&m.parentNode?[m]:[];}
;}
:function(gC,gD,gB){if(typeof gD.getElementById!==eE&&!gB){var m=gD.getElementById(gC);return m?m.id===gC||typeof m.getAttributeNode!==eE&&m.getAttributeNode(N).value===gC?[m]:undefined:[];}
;}
,"TAG":en?function(gE,gF){if(typeof gF.getElementsByTagName!==eE){return gF.getElementsByTagName(gE);}
;}
:function(gJ,gK){var gH=gK.getElementsByTagName(gJ);if(gJ===C){var gI,gG=[],i=0;for(;(gI=gH[i]);i++ ){if(gI.nodeType===1){gG.push(gI);}
;}
;return gG;}
;return gH;}
,"NAME":eh&&function(gL,gM){if(typeof gM.getElementsByName!==eE){return gM.getElementsByName(name);}
;}
,"CLASS":fq&&function(gN,gP,gO){if(typeof gP.getElementsByClassName!==eE&&!gO){return gP.getElementsByClassName(gN);}
;}
},relative:{">":{dir:cH,first:true}," ":{dir:cH},"+":{dir:z,first:true},"~":{dir:z}},preFilter:{"ATTR":function(gQ){gQ[1]=gQ[1].replace(eq,dD);gQ[3]=(gQ[4]||gQ[5]||dD).replace(eq,dD);if(gQ[2]===y){gQ[3]=cL+gQ[3]+cL;}
;return gQ.slice(0,4);}
,"CHILD":function(gR){gR[1]=gR[1].toLowerCase();if(gR[1]===r){if(!gR[2]){eX.error(gR[0]);}
;gR[3]=+(gR[3]?gR[4]+(gR[5]||1):2*(gR[2]===cE||gR[2]===de));gR[4]=+((gR[6]+gR[7])||gR[2]===de);}
else if(gR[2]){eX.error(gR[0]);}
;return gR;}
,"PSEUDO":function(gT){var gS,gU;if(fl[dv].test(gT[0])){return null;}
;if(gT[3]){gT[2]=gT[3];}
else if((gS=gT[4])){if(fd.test(gS)&&(gU=eH(gS,true))&&(gU=gS.indexOf(cU,gS.length-gU)-gS.length)){gS=gS.slice(0,gU);gT[0]=gT[0].slice(0,gU);}
;gT[2]=gS;}
;return gT.slice(0,3);}
},filter:{"ID":fg?function(gV){gV=gV.replace(eq,dD);return function(gW){return gW.getAttribute(N)===gV;}
;}
:function(gX){gX=gX.replace(eq,dD);return function(ha){var gY=typeof ha.getAttributeNode!==eE&&ha.getAttributeNode(N);return gY&&gY.value===gX;}
;}
,"TAG":function(hb){if(hb===C){return function(){return true;}
;}
;hb=hb.replace(eq,dD).toLowerCase();return function(hc){return hc.nodeName&&hc.nodeName.toLowerCase()===hb;}
;}
,"CLASS":function(hd){var he=fj[fc][hd];if(!he){he=fj(hd,new RegExp(f+ex+cU+hd+cI+ex+dw));}
;return function(hf){return he.test(hf.className||(typeof hf.getAttribute!==eE&&hf.getAttribute(df))||dD);}
;}
,"ATTR":function(name,hg,hh){return function(hi,hj){var hk=eX.attr(hi,name);if(hk==null){return hg===dn;}
;if(!hg){return true;}
;hk+=dD;return hg===L?hk===hh:hg===dn?hk!==hh:hg===I?hh&&hk.indexOf(hh)===0:hg===dj?hh&&hk.indexOf(hh)>-1:hg===Q?hh&&hk.substr(hk.length-hh.length)===hh:hg===y?(cL+hk+cL).indexOf(hh)>-1:hg===db?hk===hh||hk.substr(0,hh.length+1)===hh+c:false;}
;}
,"CHILD":function(hl,hn,ho,hm){if(hl===r){return function(hr){var hp,hq,parent=hr.parentNode;if(ho===1&&hm===0){return true;}
;if(parent){hq=0;for(hp=parent.firstChild;hp;hp=hp.nextSibling){if(hp.nodeType===1){hq++ ;if(hr===hp){break;}
;}
;}
;}
;hq-=hm;return hq===ho||(hq%ho===0&&hq/ho>=0);}
;}
;return function(ht){var hs=ht;switch(hl){case B:case O:while((hs=hs.previousSibling)){if(hs.nodeType===1){return false;}
;}
;if(hl===O){return true;}
;hs=ht;case ea:while((hs=hs.nextSibling)){if(hs.nodeType===1){return false;}
;}
;return true;};}
;}
,"PSEUDO":function(hv,hw){var hu,hx=eR.pseudos[hv]||eR.setFilters[hv.toLowerCase()]||eX.error(cP+hv);if(hx[fc]){return hx(hw);}
;if(hx.length>1){hu=[hv,hv,dD,hw];return eR.setFilters.hasOwnProperty(hv.toLowerCase())?fi(function(hz,hy){var hA,hB=hx(hz,hw),i=hB.length;while(i-- ){hA=eQ.call(hz,hB[i]);hz[hA]=!(hy[hA]=hB[i]);}
;}
):function(hC){return hx(hC,0,hu);}
;}
;return hx;}
},pseudos:{"not":fi(function(hE){var hD=[],hF=[],hG=fm(hE.replace(ek,dp));return hG[fc]?fi(function(hL,hI,hM,hH){var hJ,hK=hG(hL,null,hH,[]),i=hL.length;while(i-- ){if((hJ=hK[i])){hL[i]=!(hI[i]=hJ);}
;}
;}
):function(hO,hP,hN){hD[0]=hO;hG(hD,null,hN,hF);return !hF.pop();}
;}
),"has":fi(function(hQ){return function(hR){return eX(hQ,hR).length>0;}
;}
),"contains":fi(function(hS){return function(hT){return (hT.textContent||hT.innerText||em(hT)).indexOf(hS)>-1;}
;}
),"enabled":function(hU){return hU.disabled===false;}
,"disabled":function(hV){return hV.disabled===true;}
,"checked":function(hW){var hX=hW.nodeName.toLowerCase();return (hX===X&&!!hW.checked)||(hX===v&&!!hW.selected);}
,"selected":function(hY){if(hY.parentNode){hY.parentNode.selectedIndex;}
;return hY.selected===true;}
,"parent":function(ia){return !eR.pseudos[dL](ia);}
,"empty":function(ic){var ib;ic=ic.firstChild;while(ic){if(ic.nodeName>G||(ib=ic.nodeType)===3||ib===4){return false;}
;ic=ic.nextSibling;}
;return true;}
,"header":function(ie){return ej.test(ie.nodeName);}
,"text":function(ih){var ig,ii;return ih.nodeName.toLowerCase()===X&&(ig=ih.type)===dx&&((ii=ih.getAttribute(Y))==null||ii.toLowerCase()===ig);}
,"radio":fo(ec),"checkbox":fo(di),"file":fo(dq),"password":fo(cD),"image":fo(w),"submit":ei(dm),"reset":ei(R),"button":function(ij){var name=ij.nodeName.toLowerCase();return name===X&&ij.type===cV||name===cV;}
,"input":function(ik){return eY.test(ik.nodeName);}
,"focus":function(im){var il=im.ownerDocument;return im===il.activeElement&&(!il.hasFocus||il.hasFocus())&&!!(im.type||im.href);}
,"active":function(io){return io===io.ownerDocument.activeElement;}
,"first":eU(function(ip,length,iq){return [0];}
),"last":eU(function(ir,length,is){return [length-1];}
),"eq":eU(function(it,length,iu){return [iu<0?iu+length:iu];}
),"even":eU(function(iv,length,iw){for(var i=0;i<length;i+=2){iv.push(i);}
;return iv;}
),"odd":eU(function(ix,length,iy){for(var i=1;i<length;i+=2){ix.push(i);}
;return ix;}
),"lt":eU(function(iz,length,iA){for(var i=iA<0?iA+length:iA; --i>=0;){iz.push(i);}
;return iz;}
),"gt":eU(function(iB,length,iC){for(var i=iC<0?iC+length:iC; ++i<length;){iB.push(i);}
;return iB;}
)}};function eL(a,b,iE){if(a===b){return iE;}
;var iD=a.nextSibling;while(iD){if(iD===b){return -1;}
;iD=iD.nextSibling;}
;return 1;}
;eF=fv.compareDocumentPosition?function(a,b){if(a===b){es=true;return 0;}
;return (!a.compareDocumentPosition||!b.compareDocumentPosition?a.compareDocumentPosition:a.compareDocumentPosition(b)&4)?-1:1;}
:function(a,b){if(a===b){es=true;return 0;}
else if(a.sourceIndex&&b.sourceIndex){return a.sourceIndex-b.sourceIndex;}
;var iJ,iH,iG=[],iL=[],iK=a.parentNode,iI=b.parentNode,iF=iK;if(iK===iI){return eL(a,b);}
else if(!iK){return -1;}
else if(!iI){return 1;}
;while(iF){iG.unshift(iF);iF=iF.parentNode;}
;iF=iI;while(iF){iL.unshift(iF);iF=iF.parentNode;}
;iJ=iG.length;iH=iL.length;for(var i=0;i<iJ&&i<iH;i++ ){if(iG[i]!==iL[i]){return eL(iG[i],iL[i]);}
;}
;return i===iJ?eL(a,iL[i],-1):eL(iG[i],b,1);}
;[0,0].sort(eF);eK=!es;eX.uniqueSort=function(iM){var iN,i=1;es=eK;iM.sort(eF);if(es){for(;(iN=iM[i]);i++ ){if(iN===iM[i-1]){iM.splice(i-- ,1);}
;}
;}
;return iM;}
;eX.error=function(iO){throw new Error(dW+iO);}
;function eH(iS,iR){var iY,iX,iP,iW,iT,iV,iU,iQ=fb[fc][iS];if(iQ){return iR?0:iQ.slice(0);}
;iT=iS;iV=[];iU=eR.preFilter;while(iT){if(!iY||(iX=fh.exec(iT))){if(iX){iT=iT.slice(iX[0].length);}
;iV.push(iP=[]);}
;iY=false;if((iX=ey.exec(iT))){iP.push(iY=new eW(iX.shift()));iT=iT.slice(iY.length);iY.type=iX[0].replace(ek,cL);}
;for(iW in eR.filter){if((iX=fl[iW].exec(iT))&&(!iU[iW]||(iX=iU[iW](iX,document,true)))){iP.push(iY=new eW(iX.shift()));iT=iT.slice(iY.length);iY.type=iW;iY.matches=iX;}
;}
;if(!iY){break;}
;}
;return iR?iT.length:iT?eX.error(iS):fb(iS,iV).slice(0);}
;function eC(ja,jb,jc){var jd=jb.dir,jf=jc&&jb.dir===cH,je=fs++ ;return jb.first?function(jh,ji,jg){while((jh=jh[jd])){if(jf||jh.nodeType===1){return ja(jh,ji,jg);}
;}
;}
:function(jn,jo,jj){if(!jj){var jl,jm=eJ+cL+je+cL,jk=jm+ep;while((jn=jn[jd])){if(jf||jn.nodeType===1){if((jl=jn[fc])===jk){return jn.sizset;}
else if(typeof jl===S&&jl.indexOf(jm)===0){if(jn.sizset){return jn;}
;}
else {jn[fc]=jk;if(ja(jn,jo,jj)){jn.sizset=true;return jn;}
;jn.sizset=false;}
;}
;}
;}
else {while((jn=jn[jd])){if(jf||jn.nodeType===1){if(ja(jn,jo,jj)){return jn;}
;}
;}
;}
;}
;}
;function eD(jp){return jp.length>1?function(jr,js,jq){var i=jp.length;while(i-- ){if(!jp[i](jr,js,jq)){return false;}
;}
;return true;}
:jp[0];}
;function eB(jw,ju,jx,jz,jt){var jv,jB=[],i=0,jy=jw.length,jA=ju!=null;for(;i<jy;i++ ){if((jv=jw[i])){if(!jx||jx(jv,jz,jt)){jB.push(jv);if(jA){ju.push(i);}
;}
;}
;}
;return jB;}
;function ew(jG,jF,jE,jD,jC,jH){if(jD&&!jD[fc]){jD=ew(jD);}
;if(jC&&!jC[fc]){jC=ew(jC,jH);}
;return fi(function(jQ,jL,jR,jI){if(jQ&&jC){return;}
;var i,jN,jJ,jP=[],jT=[],jK=jL.length,jS=jQ||fe(jF||C,jR.nodeType?[jR]:jR,[],jQ),jM=jG&&(jQ||!jF)?eB(jS,jP,jG,jR,jI):jS,jO=jE?jC||(jQ?jG:jK||jD)?[]:jL:jM;if(jE){jE(jM,jO,jR,jI);}
;if(jD){jJ=eB(jO,jT);jD(jJ,[],jR,jI);i=jJ.length;while(i-- ){if((jN=jJ[i])){jO[jT[i]]=!(jM[jT[i]]=jN);}
;}
;}
;if(jQ){i=jG&&jO.length;while(i-- ){if((jN=jO[i])){jQ[jP[i]]=!(jL[jP[i]]=jN);}
;}
;}
else {jO=eB(jO===jL?jO.splice(jK,jO.length):jO);if(jC){jC(null,jL,jO,jI);}
else {fr.apply(jL,jO);}
;}
;}
);}
;function fa(ka){var jU,jW,j,jX=ka.length,jV=eR.relative[ka[0].type],kd=jV||eR.relative[cL],i=jV?1:0,kc=eC(function(ke){return ke===jU;}
,kd,true),jY=eC(function(kf){return eQ.call(jU,kf)>-1;}
,kd,true),kb=[function(kh,ki,kg){return (!jV&&(kg||ki!==eg))||((jU=ki).nodeType?kc(kh,ki,kg):jY(kh,ki,kg));}
];for(;i<jX;i++ ){if((jW=eR.relative[ka[i].type])){kb=[eC(eD(kb),jW)];}
else {jW=eR.filter[ka[i].type].apply(null,ka[i].matches);if(jW[fc]){j= ++i;for(;j<jX;j++ ){if(eR.relative[ka[j].type]){break;}
;}
;return ew(i>1&&eD(kb),i>1&&ka.slice(0,i-1).join(dD).replace(ek,dp),jW,i<j&&fa(ka.slice(i,j)),j<jX&&fa((ka=ka.slice(j))),j<jX&&ka.join(dD));}
;kb.push(jW);}
;}
;return eD(kb);}
;function eG(kn,kk){var kj=kk.length>0,kl=kn.length>0,km=function(kx,kz,ko,kt,kq){var kv,j,ks,kw=[],kp=0,i=cW,ku=kx&&[],kA=kq!=null,kr=eg,kB=kx||kl&&eR.find[cF](C,kq&&kz.parentNode||kz),ky=(eJ+=kr==null?1:Math.E);if(kA){eg=kz!==document&&kz;ep=km.el;}
;for(;(kv=kB[i])!=null;i++ ){if(kl&&kv){for(j=0;(ks=kn[j]);j++ ){if(ks(kv,kz,ko)){kt.push(kv);break;}
;}
;if(kA){eJ=ky;ep= ++km.el;}
;}
;if(kj){if((kv=!ks&&kv)){kp-- ;}
;if(kx){ku.push(kv);}
;}
;}
;kp+=i;if(kj&&i!==kp){for(j=0;(ks=kk[j]);j++ ){ks(ku,kw,kz,ko);}
;if(kx){if(kp>0){while(i-- ){if(!(ku[i]||kw[i])){kw[i]=eP.call(kt);}
;}
;}
;kw=eB(kw);}
;fr.apply(kt,kw);if(kA&&!kx&&kw.length>0&&(kp+kk.length)>1){eX.uniqueSort(kt);}
;}
;if(kA){eJ=ky;eg=kr;}
;return ku;}
;km.el=0;return kj?fi(km):km;}
;fm=eX.compile=function(kE,kC){var i,kG=[],kD=[],kF=ft[fc][kE];if(!kF){if(!kC){kC=eH(kE);}
;i=kC.length;while(i-- ){kF=fa(kC[i]);if(kF[fc]){kG.push(kF);}
else {kD.push(kF);}
;}
;kF=ft(kE,eG(kD,kG));}
;return kF;}
;function fe(kK,kH,kI,kL){var i=0,kJ=kH.length;for(;i<kJ;i++ ){eX(kK,kH[i],kI,kL);}
;return kI;}
;function et(kO,kS,kN,kR,kM){var i,kP,kQ,kT,find,kU=eH(kO),j=kU.length;if(!kR){if(kU.length===1){kP=kU[0]=kU[0].slice(0);if(kP.length>2&&(kQ=kP[0]).type===eb&&kS.nodeType===9&&!kM&&eR.relative[kP[1].type]){kS=eR.find[eb](kQ.matches[0].replace(eq,dD),kS,kM)[0];if(!kS){return kN;}
;kO=kO.slice(kP.shift().length);}
;for(i=fl[dQ].test(kO)?-1:kP.length-1;i>=0;i-- ){kQ=kP[i];if(eR.relative[(kT=kQ.type)]){break;}
;if((find=eR.find[kT])){if((kR=find(kQ.matches[0].replace(eq,dD),eO.test(kP[0].type)&&kS.parentNode||kS,kM))){kP.splice(i,1);kO=kR.length&&kP.join(dD);if(!kO){fr.apply(kN,ev.call(kR,0));return kN;}
;break;}
;}
;}
;}
;}
;fm(kO,kU)(kR,kS,kM,kN,eO.test(kO));return kN;}
;if(document.querySelectorAll){(function(){var kW,lc=et,lb=/'|\\/g,kY=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,kX=[M],kV=[h,M],la=fv.matchesSelector||fv.mozMatchesSelector||fv.webkitMatchesSelector||fv.oMatchesSelector||fv.msMatchesSelector;eV(function(ld){ld.innerHTML=dg;if(!ld.querySelectorAll(o).length){kX.push(dc+ex+d);}
;if(!ld.querySelectorAll(dO).length){kX.push(dO);}
;}
);eV(function(le){le.innerHTML=da;if(le.querySelectorAll(cR).length){kX.push(dz+ex+cO);}
;le.innerHTML=dd;if(!le.querySelectorAll(dK).length){kX.push(dK,k);}
;}
);kX=new RegExp(kX.join(ds));et=function(lk,ln,li,lm,lf){if(!lm&&!lf&&(!kX||!kX.test(lk))){var lh,i,lg=true,lj=fc,lo=ln,ll=ln.nodeType===9&&lk;if(ln.nodeType===1&&ln.nodeName.toLowerCase()!==du){lh=eH(lk);if((lg=ln.getAttribute(N))){lj=lg.replace(lb,dP);}
else {ln.setAttribute(N,lj);}
;lj=dJ+lj+g;i=lh.length;while(i-- ){lh[i]=lj+lh[i].join(dD);}
;lo=eO.test(lk)&&ln.parentNode||ln;ll=lh.join(dI);}
;if(ll){try{fr.apply(li,ev.call(lo.querySelectorAll(ll),0));return li;}
catch(lp){}
finally{if(!lg){ln.removeAttribute(N);}
;}
;}
;}
;return lc(lk,ln,li,lm,lf);}
;if(la){eV(function(lq){kW=la.call(lq,l);try{la.call(lq,q);kV.push(dn,eS);}
catch(e){}
;}
);kV=new RegExp(kV.join(ds));eX.matchesSelector=function(ls,lr){lr=lr.replace(kY,F);if(!er(ls)&&!kV.test(lr)&&(!kX||!kX.test(lr))){try{var lt=la.call(ls,lr);if(lt||kW||ls.document&&ls.document.nodeType!==11){return lt;}
;}
catch(e){}
;}
;return eX(lr,null,null,[ls]).length>0;}
;}
;}
)();}
;eR.pseudos[r]=eR.pseudos[ed];function fu(){}
;eR.filters=fu.prototype=eR.pseudos;eR.setFilters=new fu();qx.bom.Selector.query=function(lv,lu){return eX(lv,lu);}
;qx.bom.Selector.matches=function(lx,lw){return eX(lx,null,null,lw);}
;}
)(window);}
)();
(function(){var a="qx.lang.Type",b="Boolean";qx.Bootstrap.define(a,{statics:{getClass:qx.Bootstrap.getClass,isString:qx.Bootstrap.isString,isArray:qx.Bootstrap.isArray,isObject:qx.Bootstrap.isObject,isFunction:qx.Bootstrap.isFunction,isBoolean:function(c){return (c!==null&&(this.getClass(c)==b||c instanceof Boolean));}
}});}
)();
(function(){var a="",b="block",c="none",d="hidden",e="absolute",f="qx.module.Css",g="display";qx.Bootstrap.define(f,{statics:{setStyle:function(name,h){if(/\w-\w/.test(name)){name=qx.lang.String.camelCase(name);}
;this._forEachElement(function(j){qx.bom.element.Style.set(j,name,h);}
);return this;}
,getStyle:function(name){if(this[0]&&qx.dom.Node.isElement(this[0])){if(/\w-\w/.test(name)){name=qx.lang.String.camelCase(name);}
;return qx.bom.element.Style.get(this[0],name);}
;return null;}
,setStyles:function(k){for(var name in k){this.setStyle(name,k[name]);}
;return this;}
,getStyles:function(n){var m={};for(var i=0;i<n.length;i++ ){m[n[i]]=this.getStyle(n[i]);}
;return m;}
,addClass:function(name){this._forEachElement(function(o){qx.bom.element.Class.add(o,name);}
);return this;}
,addClasses:function(p){this._forEachElement(function(q){qx.bom.element.Class.addClasses(q,p);}
);return this;}
,removeClass:function(name){this._forEachElement(function(r){qx.bom.element.Class.remove(r,name);}
);return this;}
,removeClasses:function(s){this._forEachElement(function(t){qx.bom.element.Class.removeClasses(t,s);}
);return this;}
,hasClass:function(name){if(!this[0]||!qx.dom.Node.isElement(this[0])){return false;}
;return qx.bom.element.Class.has(this[0],name);}
,getClass:function(){if(!this[0]||!qx.dom.Node.isElement(this[0])){return a;}
;return qx.bom.element.Class.get(this[0]);}
,toggleClass:function(name){var u=qx.bom.element.Class;this._forEachElement(function(v){u.has(v,name)?u.remove(v,name):u.add(v,name);}
);return this;}
,toggleClasses:function(w){for(var i=0,l=w.length;i<l;i++ ){this.toggleClass(w[i]);}
;return this;}
,replaceClass:function(y,x){this._forEachElement(function(z){qx.bom.element.Class.replace(z,y,x);}
);return this;}
,getHeight:function(C){var D=this[0];if(D){if(qx.dom.Node.isElement(D)){var A;if(C){var B={display:b,position:e,visibility:d};A=qx.module.Css.__q(D,B,qx.module.Css.getHeight,this);}
else {A=qx.bom.element.Dimension.getHeight(D);}
;return A;}
else if(qx.dom.Node.isDocument(D)){return qx.bom.Document.getHeight(qx.dom.Node.getWindow(D));}
else if(qx.dom.Node.isWindow(D)){return qx.bom.Viewport.getHeight(D);}
;}
;return null;}
,getWidth:function(G){var H=this[0];if(H){if(qx.dom.Node.isElement(H)){var E;if(G){var F={display:b,position:e,visibility:d};E=qx.module.Css.__q(H,F,qx.module.Css.getWidth,this);}
else {E=qx.bom.element.Dimension.getWidth(H);}
;return E;}
else if(qx.dom.Node.isDocument(H)){return qx.bom.Document.getWidth(qx.dom.Node.getWindow(H));}
else if(qx.dom.Node.isWindow(H)){return qx.bom.Viewport.getWidth(H);}
;}
;return null;}
,getOffset:function(I){var J=this[0];if(J&&qx.dom.Node.isElement(J)){return qx.bom.element.Location.get(J,I);}
;return null;}
,getContentHeight:function(L){var N=this[0];if(qx.dom.Node.isElement(N)){var M;if(L){var K={position:e,visibility:d,display:b};M=qx.module.Css.__q(N,K,qx.module.Css.getContentHeight,this);}
else {M=qx.bom.element.Dimension.getContentHeight(N);}
;return M;}
;return null;}
,getContentWidth:function(Q){var O=this[0];if(qx.dom.Node.isElement(O)){var R;if(Q){var P={position:e,visibility:d,display:b};R=qx.module.Css.__q(O,P,qx.module.Css.getContentWidth,this);}
else {R=qx.bom.element.Dimension.getContentWidth(O);}
;return R;}
;return null;}
,getPosition:function(){var S=this[0];if(qx.dom.Node.isElement(S)){return qx.bom.element.Location.getPosition(S);}
;return null;}
,includeStylesheet:function(U,T){qx.bom.Stylesheet.includeFile(U,T);}
,hide:function(){this._forEachElementWrapped(function(V){var W=V.getStyle(g);if(W!==c){V[0].$$qPrevDisp=W;V.setStyle(g,c);}
;}
);return this;}
,show:function(){this._forEachElementWrapped(function(ba){var bb=ba.getStyle(g);var Y=ba[0].$$qPrevDisp;var X;if(bb==c){if(Y&&Y!=c){X=Y;}
else {var bc=qxWeb.getDocument(ba[0]);X=qx.module.Css.__p(ba[0].tagName,bc);}
;ba.setStyle(g,X);ba[0].$$qPrevDisp=c;}
;}
);return this;}
,__o:{},__p:function(bg,bd){var bf=qx.module.Css.__o;if(!bf[bg]){var bh=bd||document;var be=qxWeb(bh.createElement(bg)).appendTo(bd.body);bf[bg]=be.getStyle(g);be.remove();}
;return bf[bg]||a;}
,__q:function(bk,bi,bl,bo){var bm={};for(var bn in bi){bm[bn]=bk.style[bn];bk.style[bn]=bi[bn];}
;var bj=bl.call(bo);for(var bn in bm){bk.style[bn]=bm[bn];}
;return bj;}
},defer:function(bp){qxWeb.$attach({"setStyle":bp.setStyle,"getStyle":bp.getStyle,"setStyles":bp.setStyles,"getStyles":bp.getStyles,"addClass":bp.addClass,"addClasses":bp.addClasses,"removeClass":bp.removeClass,"removeClasses":bp.removeClasses,"hasClass":bp.hasClass,"getClass":bp.getClass,"toggleClass":bp.toggleClass,"toggleClasses":bp.toggleClasses,"replaceClass":bp.replaceClass,"getHeight":bp.getHeight,"getWidth":bp.getWidth,"getOffset":bp.getOffset,"getContentHeight":bp.getContentHeight,"getContentWidth":bp.getContentWidth,"getPosition":bp.getPosition,"hide":bp.hide,"show":bp.show});qxWeb.$attachStatic({"includeStylesheet":bp.includeStylesheet});}
});}
)();
(function(){var a='',b="ecmascript.string.trim",c="qx.lang.normalize.String";qx.Bootstrap.define(c,{defer:function(){if(!qx.core.Environment.get(b)){String.prototype.trim=function(d){return this.replace(/^\s+|\s+$/g,a);}
;}
;}
});}
)();
(function(){var a="qx.lang.String",b="-",c='-',d='\\$1';qx.Bootstrap.define(a,{statics:{__r:{},camelCase:function(f){var e=this.__r[f];if(!e){e=f.replace(/\-([a-z])/g,function(h,g){return g.toUpperCase();}
);if(f.indexOf(b)>=0){this.__r[f]=e;}
;}
;return e;}
,hyphenate:function(j){var i=this.__r[j];if(!i){i=j.replace(/[A-Z]/g,function(k){return (c+k.charAt(0).toLowerCase());}
);if(j.indexOf(b)==-1){this.__r[j]=i;}
;}
;return i;}
,startsWith:function(m,l){return m.indexOf(l)===0;}
,endsWith:function(o,n){return o.substring(o.length-n.length,o.length)===n;}
,firstUp:qx.Bootstrap.firstUp,firstLow:qx.Bootstrap.firstLow,escapeRegexpChars:function(p){return p.replace(/([.*+?^${}()|[\]\/\\])/g,d);}
}});}
)();
(function(){var a='anonymous()',b="()",c="qx.lang.Function",d=".",e=".prototype.",f=".constructor()";qx.Bootstrap.define(c,{statics:{getCaller:function(g){return g.caller?g.caller.callee:g.callee.caller;}
,getName:function(h){if(h.displayName){return h.displayName;}
;if(h.$$original||h.wrapper||h.classname){return h.classname+f;}
;if(h.$$mixin){for(var i in h.$$mixin.$$members){if(h.$$mixin.$$members[i]==h){return h.$$mixin.name+e+i+b;}
;}
;for(var i in h.$$mixin){if(h.$$mixin[i]==h){return h.$$mixin.name+d+i+b;}
;}
;}
;if(h.self){var k=h.self.constructor;if(k){for(var i in k.prototype){if(k.prototype[i]==h){return k.classname+e+i+b;}
;}
;for(var i in k){if(k[i]==h){return k.classname+d+i+b;}
;}
;}
;}
;var j=h.toString().match(/function\s*(\w*)\s*\(.*/);if(j&&j.length>=1&&j[1]){return j[1]+b;}
;return a;}
,create:function(m,l){{}
;if(!l){return m;}
;if(!(l.self||l.args||l.delay!=null||l.periodical!=null||l.attempt)){return m;}
;return function(event){{}
;var o=qx.lang.Array.fromArguments(arguments);if(l.args){o=l.args.concat(o);}
;if(l.delay||l.periodical){var n=function(){return m.apply(l.self||this,o);}
;{}
;if(l.delay){return window.setTimeout(n,l.delay);}
;if(l.periodical){return window.setInterval(n,l.periodical);}
;}
else if(l.attempt){var p=false;try{p=m.apply(l.self||this,o);}
catch(q){}
;return p;}
else {return m.apply(l.self||this,o);}
;}
;}
,bind:function(r,self,s){return this.create(r,{self:self,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null});}
,listener:function(u,self,v){if(arguments.length<3){return function(event){return u.call(self||this,event||window.event);}
;}
else {var t=qx.lang.Array.fromArguments(arguments,2);return function(event){var w=[event||window.event];w.push.apply(w,t);u.apply(self||this,w);}
;}
;}
}});}
)();
(function(){var a="engine.name",b=");",c="",d=")",e="zoom:1;filter:alpha(opacity=",f="qx.bom.element.Opacity",g="css.opacity",h=";",i="opacity:",j="alpha(opacity=",k="opacity",l="filter";qx.Bootstrap.define(f,{statics:{compile:qx.core.Environment.select(a,{"mshtml":function(m){if(m>=1){m=1;}
;if(m<0.00001){m=0;}
;if(qx.core.Environment.get(g)){return i+m+h;}
else {return e+(m*100)+b;}
;}
,"default":function(n){if(n>=1){return c;}
;return i+n+h;}
}),set:qx.core.Environment.select(a,{"mshtml":function(q,o){if(qx.core.Environment.get(g)){if(o>=1){o=c;}
;q.style.opacity=o;}
else {var p=qx.bom.element.Style.get(q,l,qx.bom.element.Style.COMPUTED_MODE,false);if(o>=1){o=1;}
;if(o<0.00001){o=0;}
;if(!q.currentStyle||!q.currentStyle.hasLayout){q.style.zoom=1;}
;q.style.filter=p.replace(/alpha\([^\)]*\)/gi,c)+j+o*100+d;}
;}
,"default":function(s,r){if(r>=1){r=c;}
;s.style.opacity=r;}
}),reset:qx.core.Environment.select(a,{"mshtml":function(u){if(qx.core.Environment.get(g)){u.style.opacity=c;}
else {var t=qx.bom.element.Style.get(u,l,qx.bom.element.Style.COMPUTED_MODE,false);u.style.filter=t.replace(/alpha\([^\)]*\)/gi,c);}
;}
,"default":function(v){v.style.opacity=c;}
}),get:qx.core.Environment.select(a,{"mshtml":function(z,y){if(qx.core.Environment.get(g)){var w=qx.bom.element.Style.get(z,k,y,false);if(w!=null){return parseFloat(w);}
;return 1.0;}
else {var x=qx.bom.element.Style.get(z,l,y,false);if(x){var w=x.match(/alpha\(opacity=(.*)\)/);if(w&&w[1]){return parseFloat(w[1])/100;}
;}
;return 1.0;}
;}
,"default":function(C,B){var A=qx.bom.element.Style.get(C,k,B,false);if(A!=null){return parseFloat(A);}
;return 1.0;}
})}});}
)();
(function(){var a="rim_tabletos",b="10.1",c="Darwin",d="10.3",e="os.version",f="10.7",g="2003",h=")",i="iPhone",j="android",k="unix",l="ce",m="7",n="SymbianOS",o="10.5",p="os.name",q="10.9",r="|",s="MacPPC",t="95",u="iPod",v="10.8",w="\.",x="Win64",y="linux",z="me",A="10.2",B="Macintosh",C="Android",D="Windows",E="98",F="ios",G="vista",H="8",I="blackberry",J="2000",K="8.1",L="(",M="",N="win",O="Linux",P="10.6",Q="BSD",R="10.0",S="10.4",T="Mac OS X",U="iPad",V="X11",W="xp",X="symbian",Y="qx.bom.client.OperatingSystem",bo="g",bp="Win32",bq="osx",bk="webOS",bl="RIM Tablet OS",bm="BlackBerry",bn="nt4",br=".",bs="MacIntel",bt="webos";qx.Bootstrap.define(Y,{statics:{getName:function(){if(!navigator){return M;}
;var bu=navigator.platform||M;var bv=navigator.userAgent||M;if(bu.indexOf(D)!=-1||bu.indexOf(bp)!=-1||bu.indexOf(x)!=-1){return N;}
else if(bu.indexOf(B)!=-1||bu.indexOf(s)!=-1||bu.indexOf(bs)!=-1||bu.indexOf(T)!=-1){return bq;}
else if(bv.indexOf(bl)!=-1){return a;}
else if(bv.indexOf(bk)!=-1){return bt;}
else if(bu.indexOf(u)!=-1||bu.indexOf(i)!=-1||bu.indexOf(U)!=-1){return F;}
else if(bv.indexOf(C)!=-1){return j;}
else if(bu.indexOf(O)!=-1){return y;}
else if(bu.indexOf(V)!=-1||bu.indexOf(Q)!=-1||bu.indexOf(c)!=-1){return k;}
else if(bu.indexOf(n)!=-1){return X;}
else if(bu.indexOf(bm)!=-1){return I;}
;return M;}
,__s:{"Windows NT 6.3":K,"Windows NT 6.2":H,"Windows NT 6.1":m,"Windows NT 6.0":G,"Windows NT 5.2":g,"Windows NT 5.1":W,"Windows NT 5.0":J,"Windows 2000":J,"Windows NT 4.0":bn,"Win 9x 4.90":z,"Windows CE":l,"Windows 98":E,"Win98":E,"Windows 95":t,"Win95":t,"Mac OS X 10_9":q,"Mac OS X 10.9":q,"Mac OS X 10_8":v,"Mac OS X 10.8":v,"Mac OS X 10_7":f,"Mac OS X 10.7":f,"Mac OS X 10_6":P,"Mac OS X 10.6":P,"Mac OS X 10_5":o,"Mac OS X 10.5":o,"Mac OS X 10_4":S,"Mac OS X 10.4":S,"Mac OS X 10_3":d,"Mac OS X 10.3":d,"Mac OS X 10_2":A,"Mac OS X 10.2":A,"Mac OS X 10_1":b,"Mac OS X 10.1":b,"Mac OS X 10_0":R,"Mac OS X 10.0":R},getVersion:function(){var bw=qx.bom.client.OperatingSystem.__t(navigator.userAgent);if(bw==null){bw=qx.bom.client.OperatingSystem.__u(navigator.userAgent);}
;if(bw!=null){return bw;}
else {return M;}
;}
,__t:function(bx){var bA=[];for(var bz in qx.bom.client.OperatingSystem.__s){bA.push(bz);}
;var bB=new RegExp(L+bA.join(r).replace(/\./g,w)+h,bo);var by=bB.exec(bx);if(by&&by[1]){return qx.bom.client.OperatingSystem.__s[by[1]];}
;return null;}
,__u:function(bF){var bG=bF.indexOf(C)!=-1;var bC=bF.match(/(iPad|iPhone|iPod)/i)?true:false;if(bG){var bE=new RegExp(/ Android (\d+(?:\.\d+)+)/i);var bH=bE.exec(bF);if(bH&&bH[1]){return bH[1];}
;}
else if(bC){var bI=new RegExp(/(CPU|iPhone|iPod) OS (\d+)_(\d+)(?:_(\d+))*\s+/);var bD=bI.exec(bF);if(bD&&bD[2]&&bD[3]){if(bD[4]){return bD[2]+br+bD[3]+br+bD[4];}
else {return bD[2]+br+bD[3];}
;}
;}
;return null;}
},defer:function(bJ){qx.core.Environment.add(p,bJ.getName);qx.core.Environment.add(e,bJ.getVersion);}
});}
)();
(function(){var a="CSS1Compat",b=" OPR/",c="msie",d="android",e="operamini",f="gecko",g="maple",h="browser.quirksmode",i="browser.name",j="trident",k="mobile chrome",l=")(/| )([0-9]+\.[0-9])",m="iemobile",n="prism|Fennec|Camino|Kmeleon|Galeon|Netscape|SeaMonkey|Namoroka|Firefox",o="IEMobile|Maxthon|MSIE|Trident",p="opera mobi",q="Mobile Safari",r="Maple",s="operamobile",t="ie",u="mobile safari",v="AdobeAIR|Titanium|Fluid|Chrome|Android|Epiphany|Konqueror|iCab|OmniWeb|Maxthon|Pre|PhantomJS|Mobile Safari|Safari",w="qx.bom.client.Browser",x="(Maple )([0-9]+\.[0-9]+\.[0-9]*)",y="",z="opera mini",A="(",B="browser.version",C="opera",D="ce",E="mshtml",F="Opera Mini|Opera Mobi|Opera",G="webkit",H="browser.documentmode",I="5.0",J="Mobile/";qx.Bootstrap.define(w,{statics:{getName:function(){var M=navigator.userAgent;var N=new RegExp(A+qx.bom.client.Browser.__v+l);var L=M.match(N);if(!L){return y;}
;var name=L[1].toLowerCase();var K=qx.bom.client.Engine.getName();if(K===G){if(name===d){name=k;}
else if(M.indexOf(q)!==-1||M.indexOf(J)!==-1){name=u;}
else if(M.indexOf(b)!=-1){name=C;}
;}
else if(K===E){if(name===c||name===j){name=t;if(qx.bom.client.OperatingSystem.getVersion()===D){name=m;}
;}
;}
else if(K===C){if(name===p){name=s;}
else if(name===z){name=e;}
;}
else if(K===f){if(M.indexOf(r)!==-1){name=g;}
;}
;return name;}
,getVersion:function(){var Q=navigator.userAgent;var R=new RegExp(A+qx.bom.client.Browser.__v+l);var O=Q.match(R);if(!O){return y;}
;var name=O[1].toLowerCase();var P=O[3];if(Q.match(/Version(\/| )([0-9]+\.[0-9])/)){P=RegExp.$2;}
;if(qx.bom.client.Engine.getName()==E){P=qx.bom.client.Engine.getVersion();if(name===c&&qx.bom.client.OperatingSystem.getVersion()==D){P=I;}
;}
;if(qx.bom.client.Browser.getName()==g){R=new RegExp(x);O=Q.match(R);if(!O){return y;}
;P=O[2];}
;if(qx.bom.client.Engine.getName()==G||qx.bom.client.Browser.getName()==C){if(Q.match(/OPR(\/| )([0-9]+\.[0-9])/)){P=RegExp.$2;}
;}
;return P;}
,getDocumentMode:function(){if(document.documentMode){return document.documentMode;}
;return 0;}
,getQuirksMode:function(){if(qx.bom.client.Engine.getName()==E&&parseFloat(qx.bom.client.Engine.getVersion())>=8){return qx.bom.client.Engine.DOCUMENT_MODE===5;}
else {return document.compatMode!==a;}
;}
,__v:{"webkit":v,"gecko":n,"mshtml":o,"opera":F}[qx.bom.client.Engine.getName()]},defer:function(S){qx.core.Environment.add(i,S.getName),qx.core.Environment.add(B,S.getVersion),qx.core.Environment.add(H,S.getDocumentMode),qx.core.Environment.add(h,S.getQuirksMode);}
});}
)();
(function(){var a="cursor:",b="engine.name",c="ns-resize",d="",e="mshtml",f="nw-resize",g="n-resize",h="engine.version",i="nesw-resize",j="opera",k="browser.documentmode",l=";",m="nwse-resize",n="ew-resize",o="qx.bom.element.Cursor",p="ne-resize",q="e-resize",r="browser.quirksmode",s="cursor";qx.Bootstrap.define(o,{statics:{__w:{},compile:function(t){return a+(this.__w[t]||t)+l;}
,get:function(v,u){return qx.bom.element.Style.get(v,s,u,false);}
,set:function(x,w){x.style.cursor=this.__w[w]||w;}
,reset:function(y){y.style.cursor=d;}
},defer:function(z){if(qx.core.Environment.get(b)==e&&((parseFloat(qx.core.Environment.get(h))<9||qx.core.Environment.get(k)<9)&&!qx.core.Environment.get(r))){z.__w[i]=p;z.__w[m]=f;if(((parseFloat(qx.core.Environment.get(h))<8||qx.core.Environment.get(k)<8)&&!qx.core.Environment.get(r))){z.__w[n]=q;z.__w[c]=g;}
;}
else if(qx.core.Environment.get(b)==j&&parseInt(qx.core.Environment.get(h))<12){z.__w[i]=p;z.__w[m]=f;}
;}
});}
)();
(function(){var a="border-box",b="qx.bom.element.BoxSizing",c="css.boxsizing",d="",e="boxSizing",f="content-box",g=":",h=";";qx.Bootstrap.define(b,{statics:{__x:{tags:{button:true,select:true},types:{search:true,button:true,submit:true,reset:true,checkbox:true,radio:true}},__y:function(j){var i=this.__x;return i.tags[j.tagName.toLowerCase()]||i.types[j.type];}
,compile:function(k){if(qx.core.Environment.get(c)){var l=qx.bom.Style.getCssName(qx.core.Environment.get(c));return l+g+k+h;}
else {{}
;}
;}
,get:function(m){if(qx.core.Environment.get(c)){return qx.bom.element.Style.get(m,e,null,false)||d;}
;if(qx.bom.Document.isStandardMode(qx.dom.Node.getWindow(m))){if(!this.__y(m)){return f;}
;}
;return a;}
,set:function(o,n){if(qx.core.Environment.get(c)){try{o.style[qx.core.Environment.get(c)]=n;}
catch(p){{}
;}
;}
else {{}
;}
;}
,reset:function(q){this.set(q,d);}
}});}
)();
(function(){var a="-",b="qx.bom.Style",c="",d='-',e="Webkit",f="ms",g=":",h=";",j="Moz",k="O",m="string",n="Khtml";qx.Bootstrap.define(b,{statics:{VENDOR_PREFIXES:[e,j,k,f,n],__z:{},__A:null,getPropertyName:function(q){var o=document.documentElement.style;if(o[q]!==undefined){return q;}
;for(var i=0,l=this.VENDOR_PREFIXES.length;i<l;i++ ){var p=this.VENDOR_PREFIXES[i]+qx.lang.String.firstUp(q);if(o[p]!==undefined){return p;}
;}
;return null;}
,getCssName:function(r){var s=this.__z[r];if(!s){s=r.replace(/[A-Z]/g,function(t){return (d+t.charAt(0).toLowerCase());}
);if((/^ms/.test(s))){s=a+s;}
;this.__z[r]=s;}
;return s;}
,getAppliedStyle:function(A,x,z,v){var C=qx.bom.Style.getCssName(x);var w=qx.dom.Node.getWindow(A);var u=(v!==false)?[null].concat(this.VENDOR_PREFIXES):[null];for(var i=0,l=u.length;i<l;i++ ){var y=false;var B=u[i]?a+u[i].toLowerCase()+a+z:z;if(qx.bom.Style.__A){y=qx.bom.Style.__A.call(w,C,B);}
else {A.style.cssText+=C+g+B+h;y=(typeof A.style[x]==m&&A.style[x]!==c);}
;if(y){return B;}
;}
;return null;}
},defer:function(D){if(window.CSS&&window.CSS.supports){qx.bom.Style.__A=window.CSS.supports.bind(window.CSS);}
else if(window.supportsCSS){qx.bom.Style.__A=window.supportsCSS.bind(window);}
;}
});}
)();
(function(){var b="qx.dom.Node",c="";qx.Bootstrap.define(b,{statics:{ELEMENT:1,TEXT:3,DOCUMENT:9,getDocument:function(d){return d.nodeType===this.DOCUMENT?d:d.ownerDocument||d.document;}
,getWindow:function(e){if(e.nodeType==null){return e;}
;if(e.nodeType!==this.DOCUMENT){e=e.ownerDocument;}
;return e.defaultView||e.parentWindow;}
,isNode:function(f){return !!(f&&f.nodeType!=null);}
,isElement:function(g){return !!(g&&g.nodeType===this.ELEMENT);}
,isDocument:function(h){return !!(h&&h.nodeType===this.DOCUMENT);}
,isText:function(j){return !!(j&&j.nodeType===this.TEXT);}
,isWindow:function(k){return !!(k&&k.history&&k.location&&k.document);}
,isNodeName:function(l,m){if(!m||!l||!l.nodeName){return false;}
;return m.toLowerCase()==qx.dom.Node.getName(l);}
,getName:function(n){if(!n||!n.nodeName){return null;}
;return n.nodeName.toLowerCase();}
,getText:function(o){if(!o||!o.nodeType){return null;}
;switch(o.nodeType){case 1:var i,a=[],p=o.childNodes,length=p.length;for(i=0;i<length;i++ ){a[i]=this.getText(p[i]);}
;return a.join(c);case 2:case 3:case 4:return o.nodeValue;};return null;}
,isBlockNode:function(q){if(!qx.dom.Node.isElement(q)){return false;}
;q=qx.dom.Node.getName(q);return /^(body|form|textarea|fieldset|ul|ol|dl|dt|dd|li|div|hr|p|h[1-6]|quote|pre|table|thead|tbody|tfoot|tr|td|th|iframe|address|blockquote)$/.test(q);}
}});}
)();
(function(){var a="clip:auto;",b="rect(",c=")",d=");",e="",f="px",g="Could not parse clip string: ",h="qx.bom.element.Clip",i="string",j="clip:rect(",k=" ",l="clip",m="rect(auto,auto,auto,auto)",n="rect(auto, auto, auto, auto)",o="auto",p=",";qx.Bootstrap.define(h,{statics:{compile:function(q){if(!q){return a;}
;var v=q.left;var top=q.top;var u=q.width;var t=q.height;var r,s;if(v==null){r=(u==null?o:u+f);v=o;}
else {r=(u==null?o:v+u+f);v=v+f;}
;if(top==null){s=(t==null?o:t+f);top=o;}
else {s=(t==null?o:top+t+f);top=top+f;}
;return j+top+p+r+p+s+p+v+d;}
,get:function(z,D){var x=qx.bom.element.Style.get(z,l,D,false);var C,top,A,E;var w,y;if(typeof x===i&&x!==o&&x!==e){x=x.trim();if(/\((.*)\)/.test(x)){var F=RegExp.$1;if(/,/.test(F)){var B=F.split(p);}
else {var B=F.split(k);}
;top=B[0].trim();w=B[1].trim();y=B[2].trim();C=B[3].trim();if(C===o){C=null;}
;if(top===o){top=null;}
;if(w===o){w=null;}
;if(y===o){y=null;}
;if(top!=null){top=parseInt(top,10);}
;if(w!=null){w=parseInt(w,10);}
;if(y!=null){y=parseInt(y,10);}
;if(C!=null){C=parseInt(C,10);}
;if(w!=null&&C!=null){A=w-C;}
else if(w!=null){A=w;}
;if(y!=null&&top!=null){E=y-top;}
else if(y!=null){E=y;}
;}
else {throw new Error(g+x);}
;}
;return {left:C||null,top:top||null,width:A||null,height:E||null};}
,set:function(L,G){if(!G){L.style.clip=m;return;}
;var M=G.left;var top=G.top;var K=G.width;var J=G.height;var H,I;if(M==null){H=(K==null?o:K+f);M=o;}
else {H=(K==null?o:M+K+f);M=M+f;}
;if(top==null){I=(J==null?o:J+f);top=o;}
else {I=(J==null?o:top+J+f);top=top+f;}
;L.style.clip=b+top+p+H+p+I+p+M+c;}
,reset:function(N){N.style.clip=n;}
}});}
)();
(function(){var a="css.float",b="foo",c="css.borderimage.standardsyntax",d="borderRadius",e="boxSizing",f="stretch",g="css.borderradius",h="content",j="css.inlineblock",k="css.gradient.filter",l="css.appearance",m="css.opacity",n="div",o="pointerEvents",p="css.gradient.radial",q="css.pointerevents",r="input",s="color",t="string",u="borderImage",v="userSelect",w="styleFloat",x="css.textShadow.filter",y="css.usermodify",z="css.boxsizing",A='url("foo.png") 4 4 4 4 fill stretch',B="css.boxmodel",C="qx.bom.client.Css",D="appearance",E="placeholder",F="-moz-none",G="backgroundImage",H="css.textShadow",I="DXImageTransform.Microsoft.Shadow",J="css.boxshadow",K="css.alphaimageloaderneeded",L="css.gradient.legacywebkit",M="linear-gradient(0deg, #fff, #000)",N="textShadow",O="auto",P="css.borderimage",Q="foo.png",R="rgba(1, 2, 3, 0.5)",S="color=#666666,direction=45",T="radial-gradient(0px 0px, cover, red 50%, blue 100%)",U="rgba",V="(",W='url("foo.png") 4 4 4 4 stretch',X="css.gradient.linear",Y="DXImageTransform.Microsoft.Gradient",bA="css.userselect",bB="span",bC="-webkit-gradient(linear,0% 0%,100% 100%,from(white), to(red))",bw="mshtml",bx="css.rgba",by=");",bz="4 fill",bG="none",bH="startColorStr=#550000FF, endColorStr=#55FFFF00",bI="progid:",bN="css.placeholder",bD="css.userselect.none",bE="css.textoverflow",bF="inline-block",bu="-moz-inline-box",bJ="textOverflow",bv="userModify",bK="boxShadow",bL="cssFloat",bM="border";qx.Bootstrap.define(C,{statics:{__B:null,getBoxModel:function(){var content=qx.bom.client.Engine.getName()!==bw||!qx.bom.client.Browser.getQuirksMode();return content?h:bM;}
,getTextOverflow:function(){return qx.bom.Style.getPropertyName(bJ);}
,getPlaceholder:function(){var i=document.createElement(r);return E in i;}
,getAppearance:function(){return qx.bom.Style.getPropertyName(D);}
,getBorderRadius:function(){return qx.bom.Style.getPropertyName(d);}
,getBoxShadow:function(){return qx.bom.Style.getPropertyName(bK);}
,getBorderImage:function(){return qx.bom.Style.getPropertyName(u);}
,getBorderImageSyntax:function(){var bP=qx.bom.client.Css.getBorderImage();if(!bP){return null;}
;var bO=document.createElement(n);if(bP===u){bO.style[bP]=A;if(bO.style.borderImageSource.indexOf(Q)>=0&&bO.style.borderImageSlice.indexOf(bz)>=0&&bO.style.borderImageRepeat.indexOf(f)>=0){return true;}
;}
else {bO.style[bP]=W;if(bO.style[bP].indexOf(Q)>=0){return false;}
;}
;return null;}
,getUserSelect:function(){return qx.bom.Style.getPropertyName(v);}
,getUserSelectNone:function(){var bR=qx.bom.client.Css.getUserSelect();if(bR){var bQ=document.createElement(bB);bQ.style[bR]=F;return bQ.style[bR]===F?F:bG;}
;return null;}
,getUserModify:function(){return qx.bom.Style.getPropertyName(bv);}
,getFloat:function(){var bS=document.documentElement.style;return bS.cssFloat!==undefined?bL:bS.styleFloat!==undefined?w:null;}
,getLinearGradient:function(){qx.bom.client.Css.__B=false;var bW=M;var bT=document.createElement(n);var bU=qx.bom.Style.getAppliedStyle(bT,G,bW);if(!bU){bW=bC;var bU=qx.bom.Style.getAppliedStyle(bT,G,bW,false);if(bU){qx.bom.client.Css.__B=true;}
;}
;if(!bU){return null;}
;var bV=/(.*?)\(/.exec(bU);return bV?bV[1]:null;}
,getFilterGradient:function(){return qx.bom.client.Css.__C(Y,bH);}
,getRadialGradient:function(){var cb=T;var bX=document.createElement(n);var bY=qx.bom.Style.getAppliedStyle(bX,G,cb);if(!bY){return null;}
;var ca=/(.*?)\(/.exec(bY);return ca?ca[1]:null;}
,getLegacyWebkitGradient:function(){if(qx.bom.client.Css.__B===null){qx.bom.client.Css.getLinearGradient();}
;return qx.bom.client.Css.__B;}
,getRgba:function(){var cc;try{cc=document.createElement(n);}
catch(cd){cc=document.createElement();}
;try{cc.style[s]=R;if(cc.style[s].indexOf(U)!=-1){return true;}
;}
catch(ce){}
;return false;}
,getBoxSizing:function(){return qx.bom.Style.getPropertyName(e);}
,getInlineBlock:function(){var cf=document.createElement(bB);cf.style.display=bF;if(cf.style.display==bF){return bF;}
;cf.style.display=bu;if(cf.style.display!==bu){return bu;}
;return null;}
,getOpacity:function(){return (typeof document.documentElement.style.opacity==t);}
,getTextShadow:function(){return !!qx.bom.Style.getPropertyName(N);}
,getFilterTextShadow:function(){return qx.bom.client.Css.__C(I,S);}
,__C:function(cj,ch){var ci=false;var ck=bI+cj+V+ch+by;var cg=document.createElement(n);document.body.appendChild(cg);cg.style.filter=ck;if(cg.filters&&cg.filters.length>0&&cg.filters.item(cj).enabled==true){ci=true;}
;document.body.removeChild(cg);return ci;}
,getAlphaImageLoaderNeeded:function(){return qx.bom.client.Engine.getName()==bw&&qx.bom.client.Browser.getDocumentMode()<9;}
,getPointerEvents:function(){var cl=document.documentElement;if(o in cl.style){var cn=cl.style.pointerEvents;cl.style.pointerEvents=O;cl.style.pointerEvents=b;var cm=cl.style.pointerEvents==O;cl.style.pointerEvents=cn;return cm;}
;return false;}
},defer:function(co){qx.core.Environment.add(bE,co.getTextOverflow);qx.core.Environment.add(bN,co.getPlaceholder);qx.core.Environment.add(g,co.getBorderRadius);qx.core.Environment.add(J,co.getBoxShadow);qx.core.Environment.add(X,co.getLinearGradient);qx.core.Environment.add(k,co.getFilterGradient);qx.core.Environment.add(p,co.getRadialGradient);qx.core.Environment.add(L,co.getLegacyWebkitGradient);qx.core.Environment.add(B,co.getBoxModel);qx.core.Environment.add(bx,co.getRgba);qx.core.Environment.add(P,co.getBorderImage);qx.core.Environment.add(c,co.getBorderImageSyntax);qx.core.Environment.add(y,co.getUserModify);qx.core.Environment.add(bA,co.getUserSelect);qx.core.Environment.add(bD,co.getUserSelectNone);qx.core.Environment.add(l,co.getAppearance);qx.core.Environment.add(a,co.getFloat);qx.core.Environment.add(z,co.getBoxSizing);qx.core.Environment.add(j,co.getInlineBlock);qx.core.Environment.add(m,co.getOpacity);qx.core.Environment.add(H,co.getTextShadow);qx.core.Environment.add(x,co.getFilterTextShadow);qx.core.Environment.add(K,co.getAlphaImageLoaderNeeded);qx.core.Environment.add(q,co.getPointerEvents);}
});}
)();
(function(){var a="ecmascript.object.keys",b="qx.lang.normalize.Object";qx.Bootstrap.define(b,{defer:function(){if(!qx.core.Environment.get(a)){Object.keys=qx.Bootstrap.keys;}
;}
});}
)();
(function(){var a="qx.lang.Object";qx.Bootstrap.define(a,{statics:{isEmpty:function(b){{}
;for(var c in b){return false;}
;return true;}
,getValues:function(e){{}
;var f=[];var d=Object.keys(e);for(var i=0,l=d.length;i<l;i++ ){f.push(e[d[i]]);}
;return f;}
,clone:function(g,k){if(qx.lang.Type.isObject(g)){var h={};for(var j in g){if(k){h[j]=qx.lang.Object.clone(g[j],k);}
else {h[j]=g[j];}
;}
;return h;}
else if(qx.lang.Type.isArray(g)){var h=[];for(var i=0;i<g.length;i++ ){if(k){h[i]=qx.lang.Object.clone(g[i]);}
else {h[i]=g[i];}
;}
;return h;}
;return g;}
,invert:function(m){{}
;var n={};for(var o in m){n[m[o].toString()]=o;}
;return n;}
,getKeyFromValue:function(p,q){{}
;for(var r in p){if(p.hasOwnProperty(r)&&p[r]===q){return r;}
;}
;return null;}
,contains:function(s,t){{}
;return this.getKeyFromValue(s,t)!==null;}
}});}
)();
(function(){var a="css.float",b="qx.bom.element.Style",c="css.borderimage",d="css.userselect",e="css.boxsizing",f="pixelLeft",g="css.textoverflow",h="Cascaded styles are not supported in this browser!",i="pixelBottom",j="pixelHeight",k="pixelWidth",l="css.appearance",m="pixelRight",n="css.usermodify",o="float",p="",q="pixelTop",r="px";qx.Bootstrap.define(b,{statics:{__D:null,__E:null,__F:function(){var t={"appearance":qx.core.Environment.get(l),"userSelect":qx.core.Environment.get(d),"textOverflow":qx.core.Environment.get(g),"borderImage":qx.core.Environment.get(c),"float":qx.core.Environment.get(a),"userModify":qx.core.Environment.get(n),"boxSizing":qx.core.Environment.get(e)};this.__E={};for(var s in qx.lang.Object.clone(t)){if(!t[s]){delete t[s];}
else {this.__E[s]=s==o?o:qx.bom.Style.getCssName(t[s]);}
;}
;this.__D=t;}
,__G:function(name){var u=qx.bom.Style.getPropertyName(name);if(u){this.__D[name]=u;}
;return u;}
,__H:{width:k,height:j,left:f,right:m,top:q,bottom:i},__I:{clip:qx.bom.element.Clip,cursor:qx.bom.element.Cursor,opacity:qx.bom.element.Opacity,boxSizing:qx.bom.element.BoxSizing},COMPUTED_MODE:1,CASCADED_MODE:2,LOCAL_MODE:3,set:function(x,name,v,w){{}
;name=this.__D[name]||this.__G(name)||name;if(w!==false&&this.__I[name]){this.__I[name].set(x,v);}
else {x.style[name]=v!==null?v:p;}
;}
,get:function(B,name,D,F){name=this.__D[name]||this.__G(name)||name;if(F!==false&&this.__I[name]){return this.__I[name].get(B,D);}
;switch(D){case this.LOCAL_MODE:return B.style[name]||p;case this.CASCADED_MODE:if(B.currentStyle){return B.currentStyle[name]||p;}
;throw new Error(h);default:var z=qx.dom.Node.getDocument(B);var C=z.defaultView?z.defaultView.getComputedStyle:undefined;if(C!==undefined){var y=C(B,null);if(y&&y[name]){return y[name];}
;}
else {if(!B.currentStyle){return B.style[name]||p;}
;var H=B.currentStyle[name]||B.style[name]||p;if(/^-?[\.\d]+(px)?$/i.test(H)){return H;}
;var G=this.__H[name];if(G&&(G in B.style)){var E=B.style[name];B.style[name]=H||0;var A=B.style[G]+r;B.style[name]=E;return A;}
;return H;}
;return B.style[name]||p;};}
},defer:function(I){I.__F();}
});}
)();
(function(){var a="engine.name",b="CSS1Compat",c="position:absolute;width:0;height:0;width:1",d="engine.version",e="qx.bom.Document",f="1px",g="div";qx.Bootstrap.define(e,{statics:{isQuirksMode:qx.core.Environment.select(a,{"mshtml":function(h){if(qx.core.Environment.get(d)>=8){return (h||window).document.documentMode===5;}
else {return (h||window).document.compatMode!==b;}
;}
,"webkit":function(i){if(document.compatMode===undefined){var j=(i||window).document.createElement(g);j.style.cssText=c;return j.style.width===f?true:false;}
else {return (i||window).document.compatMode!==b;}
;}
,"default":function(k){return (k||window).document.compatMode!==b;}
}),isStandardMode:function(l){return !this.isQuirksMode(l);}
,getWidth:function(m){var o=(m||window).document;var n=qx.bom.Viewport.getWidth(m);var scroll=this.isStandardMode(m)?o.documentElement.scrollWidth:o.body.scrollWidth;return Math.max(scroll,n);}
,getHeight:function(p){var r=(p||window).document;var q=qx.bom.Viewport.getHeight(p);var scroll=this.isStandardMode(p)?r.documentElement.scrollHeight:r.body.scrollHeight;return Math.max(scroll,q);}
}});}
)();
(function(){var a="ios",b="os.name",c="undefined",d="qx.bom.Viewport";qx.Bootstrap.define(d,{statics:{getWidth:function(e){var e=e||window;var f=e.document;return qx.bom.Document.isStandardMode(e)?f.documentElement.clientWidth:f.body.clientWidth;}
,getHeight:function(g){var g=g||window;var h=g.document;if(qx.core.Environment.get(b)==a&&window.innerHeight!=h.documentElement.clientHeight){return window.innerHeight;}
;return qx.bom.Document.isStandardMode(g)?h.documentElement.clientHeight:h.body.clientHeight;}
,getScrollLeft:function(i){var i=i?i:window;if(typeof i.pageXOffset!==c){return i.pageXOffset;}
;var j=i.document;return j.documentElement.scrollLeft||j.body.scrollLeft;}
,getScrollTop:function(k){var k=k?k:window;if(typeof k.pageYOffset!==c){return k.pageYOffset;}
;var l=k.document;return l.documentElement.scrollTop||l.body.scrollTop;}
,__J:function(m){var o=this.getWidth(m)>this.getHeight(m)?90:0;var n=m.orientation;if(n==null||Math.abs(n%180)==o){return {"-270":90,"-180":180,"-90":-90,"0":0,"90":90,"180":180,"270":-90};}
else {return {"-270":180,"-180":-90,"-90":0,"0":90,"90":180,"180":-90,"270":0};}
;}
,__K:null,getOrientation:function(p){var p=p||window.top;var q=p.orientation;if(q==null){q=this.getWidth(p)>this.getHeight(p)?90:0;}
else {if(this.__K==null){this.__K=this.__J(p);}
;q=this.__K[q];}
;return q;}
,isLandscape:function(r){return this.getWidth(r)>=this.getHeight(r);}
}});}
)();
(function(){var b="function",c="html.video.h264",d="html.element.contains",f='video/ogg; codecs="theora, vorbis"',g="qxtest",h="html.console",i="html.xul",j="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",k="html.video.ogg",l="http://www.w3.org/TR/SVG11/feature#BasicStructure",m="html.storage.local",n="div",o="qx.bom.client.Html",p="getSelection",q='audio',r='video/mp4; codecs="avc1.42E01E, mp4a.40.2"',s="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",t="html.audio",u="video",w="url(#default#VML)",x="head",y="audio",z="audio/mpeg",A="org.w3c.dom.svg",B="html.classlist",C="html.svg",D="html.video",E="html.geolocation",F="DOMTokenList",G="html.storage.session",H="1.1",I="html.history.state",J="object",K="html.image.naturaldimensions",L="html.audio.aif",M="audio/x-wav",N='<v:shape id="vml_flag1" adj="1" />',O="html.node.isequalnode",P="html.canvas",Q="audio/ogg",R="",S="html.storage.userdata",T="number",U="html.element.compareDocumentPosition",V="audio/x-aiff",W="html.audio.au",X="img",Y="html.selection",bD="selection",bE="html.xpath",bF="$qx_check",bz="test",bA='video',bB="span",bC="html.element.textcontent",bK="geolocation",bL="html.audio.mp3",bT="html.vml",bW="undefined",bG="html.audio.ogg",bH="none",bI="label",bJ='video/webm; codecs="vp8, vorbis"',bO="html.dataurl",bX="html.webworker",bP="html.dataset",bQ="1.0",bU="html.audio.wav",bM="html.filereader",bV="audio/basic",bN="display",bR="html.video.webm",bS="#default#userdata";qx.Bootstrap.define(o,{statics:{getWebWorker:function(){return window.Worker!=null;}
,getFileReader:function(){return window.FileReader!=null;}
,getGeoLocation:function(){return bK in navigator;}
,getAudio:function(){return !!document.createElement(q).canPlayType;}
,getAudioOgg:function(){if(!qx.bom.client.Html.getAudio()){return R;}
;var a=document.createElement(y);return a.canPlayType(Q);}
,getAudioMp3:function(){if(!qx.bom.client.Html.getAudio()){return R;}
;var a=document.createElement(y);return a.canPlayType(z);}
,getAudioWav:function(){if(!qx.bom.client.Html.getAudio()){return R;}
;var a=document.createElement(y);return a.canPlayType(M);}
,getAudioAu:function(){if(!qx.bom.client.Html.getAudio()){return R;}
;var a=document.createElement(y);return a.canPlayType(bV);}
,getAudioAif:function(){if(!qx.bom.client.Html.getAudio()){return R;}
;var a=document.createElement(y);return a.canPlayType(V);}
,getVideo:function(){return !!document.createElement(bA).canPlayType;}
,getVideoOgg:function(){if(!qx.bom.client.Html.getVideo()){return R;}
;var v=document.createElement(u);return v.canPlayType(f);}
,getVideoH264:function(){if(!qx.bom.client.Html.getVideo()){return R;}
;var v=document.createElement(u);return v.canPlayType(r);}
,getVideoWebm:function(){if(!qx.bom.client.Html.getVideo()){return R;}
;var v=document.createElement(u);return v.canPlayType(bJ);}
,getLocalStorage:function(){try{var bY=window.localStorage!=null;if(bY){window.sessionStorage.setItem(bF,bz);window.sessionStorage.removeItem(bF);}
;return bY;}
catch(ca){return false;}
;}
,getSessionStorage:function(){try{var cb=window.sessionStorage!=null;if(cb){window.sessionStorage.setItem(bF,bz);window.sessionStorage.removeItem(bF);}
;return cb;}
catch(cc){return false;}
;}
,getUserDataStorage:function(){var cd=document.createElement(n);cd.style[bN]=bH;document.getElementsByTagName(x)[0].appendChild(cd);var ce=false;try{cd.addBehavior(bS);cd.load(g);ce=true;}
catch(e){}
;document.getElementsByTagName(x)[0].removeChild(cd);return ce;}
,getClassList:function(){return !!(document.documentElement.classList&&qx.Bootstrap.getClass(document.documentElement.classList)===F);}
,getXPath:function(){return !!document.evaluate;}
,getXul:function(){try{document.createElementNS(j,bI);return true;}
catch(e){return false;}
;}
,getSvg:function(){return document.implementation&&document.implementation.hasFeature&&(document.implementation.hasFeature(A,bQ)||document.implementation.hasFeature(l,H));}
,getVml:function(){var cf=document.createElement(n);document.body.appendChild(cf);cf.innerHTML=N;cf.firstChild.style.behavior=w;var cg=typeof cf.firstChild.adj==J;document.body.removeChild(cf);return cg;}
,getCanvas:function(){return !!window.CanvasRenderingContext2D;}
,getDataUrl:function(ch){var ci=new Image();ci.onload=ci.onerror=function(){window.setTimeout(function(){ch.call(null,(ci.width==1&&ci.height==1));}
,0);}
;ci.src=s;}
,getDataset:function(){return !!document.documentElement.dataset;}
,getContains:function(){return (typeof document.documentElement.contains!==bW);}
,getCompareDocumentPosition:function(){return (typeof document.documentElement.compareDocumentPosition===b);}
,getTextContent:function(){var cj=document.createElement(bB);return (typeof cj.textContent!==bW);}
,getConsole:function(){return typeof window.console!==bW;}
,getNaturalDimensions:function(){var ck=document.createElement(X);return typeof ck.naturalHeight===T&&typeof ck.naturalWidth===T;}
,getHistoryState:function(){return (typeof window.onpopstate!==bW&&typeof window.history.replaceState!==bW&&typeof window.history.pushState!==bW);}
,getSelection:function(){if(typeof window.getSelection===b){return p;}
;if(typeof document.selection===J){return bD;}
;return null;}
,getIsEqualNode:function(){return typeof document.documentElement.isEqualNode===b;}
},defer:function(cl){qx.core.Environment.add(bX,cl.getWebWorker);qx.core.Environment.add(bM,cl.getFileReader);qx.core.Environment.add(E,cl.getGeoLocation);qx.core.Environment.add(t,cl.getAudio);qx.core.Environment.add(bG,cl.getAudioOgg);qx.core.Environment.add(bL,cl.getAudioMp3);qx.core.Environment.add(bU,cl.getAudioWav);qx.core.Environment.add(W,cl.getAudioAu);qx.core.Environment.add(L,cl.getAudioAif);qx.core.Environment.add(D,cl.getVideo);qx.core.Environment.add(k,cl.getVideoOgg);qx.core.Environment.add(c,cl.getVideoH264);qx.core.Environment.add(bR,cl.getVideoWebm);qx.core.Environment.add(m,cl.getLocalStorage);qx.core.Environment.add(G,cl.getSessionStorage);qx.core.Environment.add(S,cl.getUserDataStorage);qx.core.Environment.add(B,cl.getClassList);qx.core.Environment.add(bE,cl.getXPath);qx.core.Environment.add(i,cl.getXul);qx.core.Environment.add(P,cl.getCanvas);qx.core.Environment.add(C,cl.getSvg);qx.core.Environment.add(bT,cl.getVml);qx.core.Environment.add(bP,cl.getDataset);qx.core.Environment.addAsync(bO,cl.getDataUrl);qx.core.Environment.add(d,cl.getContains);qx.core.Environment.add(U,cl.getCompareDocumentPosition);qx.core.Environment.add(bC,cl.getTextContent);qx.core.Environment.add(h,cl.getConsole);qx.core.Environment.add(K,cl.getNaturalDimensions);qx.core.Environment.add(I,cl.getHistoryState);qx.core.Environment.add(Y,cl.getSelection);qx.core.Environment.add(O,cl.getIsEqualNode);}
});}
)();
(function(){var a='',b="g",c="(^|\\s)",d='function',e="(\\s|$)",f="",g="\\b|\\b",h="qx.bom.element.Class",j='SVGAnimatedString',k="html.classlist",m="default",n=" ",o='object',p="$2",q="native",r="\\b",s='undefined';qx.Bootstrap.define(h,{statics:{__L:/\s+/g,__M:/^\s+|\s+$/g,add:{"native":function(t,name){t.classList.add(name);return name;}
,"default":function(u,name){if(!this.has(u,name)){u.className+=(u.className?n:f)+name;}
;return name;}
}[qx.core.Environment.get(k)?q:m],addClasses:{"native":function(w,v){for(var i=0;i<v.length;i++ ){w.classList.add(v[i]);}
;return w.className;}
,"default":function(y,A){var z={};var B;var x=y.className;if(x){B=x.split(this.__L);for(var i=0,l=B.length;i<l;i++ ){z[B[i]]=true;}
;for(var i=0,l=A.length;i<l;i++ ){if(!z[A[i]]){B.push(A[i]);}
;}
;}
else {B=A;}
;return y.className=B.join(n);}
}[qx.core.Environment.get(k)?q:m],get:function(D){var C=D.className;if(typeof C.split!==d){if(typeof C===o){if(qx.Bootstrap.getClass(C)==j){C=C.baseVal;}
else {{}
;C=a;}
;}
;if(typeof C===s){{}
;C=a;}
;}
;return C;}
,has:{"native":function(E,name){return E.classList.contains(name);}
,"default":function(G,name){var F=new RegExp(c+name+e);return F.test(G.className);}
}[qx.core.Environment.get(k)?q:m],remove:{"native":function(H,name){H.classList.remove(name);return name;}
,"default":function(J,name){var I=new RegExp(c+name+e);J.className=J.className.replace(I,p);return name;}
}[qx.core.Environment.get(k)?q:m],removeClasses:{"native":function(L,K){for(var i=0;i<K.length;i++ ){L.classList.remove(K[i]);}
;return L.className;}
,"default":function(O,M){var N=new RegExp(r+M.join(g)+r,b);return O.className=O.className.replace(N,f).replace(this.__M,f).replace(this.__L,n);}
}[qx.core.Environment.get(k)?q:m],replace:function(R,Q,P){if(!this.has(R,Q)){return f;}
;this.remove(R,Q);return this.add(R,P);}
}});}
)();
(function(){var a="mshtml",b="engine.name",c="qx.bom.element.Dimension",d="0px",e="paddingRight",f="engine.version",g="paddingLeft",h="opera",i="paddingBottom",j="paddingTop",k="overflowX",l="overflowY";qx.Bootstrap.define(c,{statics:{getWidth:function(n){var m=n.getBoundingClientRect();return Math.round(m.right)-Math.round(m.left);}
,getHeight:function(p){var o=p.getBoundingClientRect();return Math.round(o.bottom)-Math.round(o.top);}
,__N:{visible:true,hidden:true},getContentWidth:function(t){var q=qx.bom.element.Style;var r=qx.bom.element.Style.get(t,k);var s=parseInt(q.get(t,g)||d,10);var w=parseInt(q.get(t,e)||d,10);if(this.__N[r]){var v=t.clientWidth;if((qx.core.Environment.get(b)==h)||qx.dom.Node.isBlockNode(t)){v=v-s-w;}
;if(qx.core.Environment.get(b)==a){if(v===0&&t.offsetHeight===0){return t.offsetWidth;}
;}
;return v;}
else {if(t.clientWidth>=t.scrollWidth){return Math.max(t.clientWidth,t.scrollWidth)-s-w;}
else {var u=t.scrollWidth-s;if(qx.core.Environment.get(b)==a&&qx.core.Environment.get(f)>=6){u-=w;}
;return u;}
;}
;}
,getContentHeight:function(C){var x=qx.bom.element.Style;var z=qx.bom.element.Style.get(C,l);var A=parseInt(x.get(C,j)||d,10);var y=parseInt(x.get(C,i)||d,10);if(this.__N[z]){return C.clientHeight-A-y;}
else {if(C.clientHeight>=C.scrollHeight){return Math.max(C.clientHeight,C.scrollHeight)-A-y;}
else {var B=C.scrollHeight-A;if(qx.core.Environment.get(b)==a&&qx.core.Environment.get(f)==6){B-=y;}
;return B;}
;}
;}
}});}
)();
(function(){var a="borderBottomWidth",b="scroll",c="qx.bom.element.Location",d="engine.version",e="paddingLeft",f="borderRightWidth",g="auto",h="static",i="borderTopWidth",j="borderLeftWidth",k="marginBottom",l="marginTop",m="overflowY",n="marginLeft",o="border-box",p="padding",q="paddingBottom",r="paddingTop",s="gecko",t="marginRight",u="browser.quirksmode",v="mshtml",w="engine.name",x="position",y="margin",z="paddingRight",A="BODY",B="overflowX",C="border",D="browser.documentmode";qx.Bootstrap.define(c,{statics:{__O:function(F,E){return parseInt(qx.bom.element.Style.get(F,E,qx.bom.element.Style.COMPUTED_MODE,false),10)||0;}
,__P:function(H){var I=0,top=0;var G=qx.dom.Node.getWindow(H);I-=qx.bom.Viewport.getScrollLeft(G);top-=qx.bom.Viewport.getScrollTop(G);return {left:I,top:top};}
,__Q:qx.core.Environment.select(w,{"mshtml":function(L){var K=qx.dom.Node.getDocument(L);var J=K.body;var M=0;var top=0;M-=J.clientLeft+K.documentElement.clientLeft;top-=J.clientTop+K.documentElement.clientTop;if(!qx.core.Environment.get(u)){M+=this.__O(J,j);top+=this.__O(J,i);}
;return {left:M,top:top};}
,"webkit":function(P){var O=qx.dom.Node.getDocument(P);var N=O.body;var Q=N.offsetLeft;var top=N.offsetTop;if(parseFloat(qx.core.Environment.get(d))<530.17){Q+=this.__O(N,j);top+=this.__O(N,i);}
;return {left:Q,top:top};}
,"gecko":function(S){var R=qx.dom.Node.getDocument(S).body;var T=R.offsetLeft;var top=R.offsetTop;if(parseFloat(qx.core.Environment.get(d))<1.9){T+=this.__O(R,n);top+=this.__O(R,l);}
;if(qx.bom.element.BoxSizing.get(R)!==o){T+=this.__O(R,j);top+=this.__O(R,i);}
;return {left:T,top:top};}
,"default":function(V){var U=qx.dom.Node.getDocument(V).body;var W=U.offsetLeft;var top=U.offsetTop;return {left:W,top:top};}
}),__R:function(X){var Y=X.getBoundingClientRect();return {left:Math.round(Y.left),top:Math.round(Y.top)};}
,get:function(be,bf){if(be.tagName==A){var location=this.__S(be);var bi=location.left;var top=location.top;}
else {var ba=this.__Q(be);var bd=this.__R(be);var scroll=this.__P(be);var bi=bd.left+ba.left-scroll.left;var top=bd.top+ba.top-scroll.top;}
;var bb=bi+be.offsetWidth;var bc=top+be.offsetHeight;if(bf){if(bf==p||bf==b){var bh=qx.bom.element.Style.get(be,B);if(bh==b||bh==g){bb+=be.scrollWidth-be.offsetWidth+this.__O(be,j)+this.__O(be,f);}
;var bg=qx.bom.element.Style.get(be,m);if(bg==b||bg==g){bc+=be.scrollHeight-be.offsetHeight+this.__O(be,i)+this.__O(be,a);}
;}
;switch(bf){case p:bi+=this.__O(be,e);top+=this.__O(be,r);bb-=this.__O(be,z);bc-=this.__O(be,q);case b:bi-=be.scrollLeft;top-=be.scrollTop;bb-=be.scrollLeft;bc-=be.scrollTop;case C:bi+=this.__O(be,j);top+=this.__O(be,i);bb-=this.__O(be,f);bc-=this.__O(be,a);break;case y:bi-=this.__O(be,n);top-=this.__O(be,l);bb+=this.__O(be,t);bc+=this.__O(be,k);break;};}
;return {left:bi,top:top,right:bb,bottom:bc};}
,__S:function(bj){var top=bj.offsetTop;var bk=bj.offsetLeft;if(qx.core.Environment.get(w)!==v||!((parseFloat(qx.core.Environment.get(d))<8||qx.core.Environment.get(D)<8)&&!qx.core.Environment.get(u))){top+=this.__O(bj,l);bk+=this.__O(bj,n);}
;if(qx.core.Environment.get(w)===s){top+=this.__O(bj,j);bk+=this.__O(bj,i);}
;return {left:bk,top:top};}
,getRelative:function(bo,bn,bm,bl){var bq=this.get(bo,bm);var bp=this.get(bn,bl);return {left:bq.left-bp.left,top:bq.top-bp.top,right:bq.right-bp.right,bottom:bq.bottom-bp.bottom};}
,getPosition:function(br){return this.getRelative(br,this.getOffsetParent(br));}
,getOffsetParent:function(bu){var bt=bu.offsetParent||document.body;var bs=qx.bom.element.Style;while(bt&&(!/^body|html$/i.test(bt.tagName)&&bs.get(bt,x)===h)){bt=bt.offsetParent;}
;return bt;}
}});}
)();
(function(){var a="stylesheet",b="head",c="html.stylesheet.addimport",d="html.stylesheet.insertrule",e="}",f="html.stylesheet.createstylesheet",g='@import "',h="text/css",j="{",k='";',l="html.stylesheet.removeimport",m="html.stylesheet.deleterule",n="qx.bom.Stylesheet",o="link",p="style";qx.Bootstrap.define(n,{statics:{includeFile:function(s,q){if(!q){q=document;}
;var t=q.createElement(o);t.type=h;t.rel=a;t.href=s;var r=q.getElementsByTagName(b)[0];r.appendChild(t);}
,createElement:function(u){if(qx.core.Environment.get(f)){var v=document.createStyleSheet();if(u){v.cssText=u;}
;return v;}
else {var w=document.createElement(p);w.type=h;if(u){w.appendChild(document.createTextNode(u));}
;document.getElementsByTagName(b)[0].appendChild(w);return w.sheet;}
;}
,addRule:function(z,A,y){{var x;}
;if(qx.core.Environment.get(d)){z.insertRule(A+j+y+e,z.cssRules.length);}
else {z.addRule(A,y);}
;}
,removeRule:function(C,E){if(qx.core.Environment.get(m)){var B=C.cssRules;var D=B.length;for(var i=D-1;i>=0; --i){if(B[i].selectorText==E){C.deleteRule(i);}
;}
;}
else {var B=C.rules;var D=B.length;for(var i=D-1;i>=0; --i){if(B[i].selectorText==E){C.removeRule(i);}
;}
;}
;}
,removeSheet:function(G){var F=G.ownerNode?G.ownerNode:G.owningElement;qx.dom.Element.removeChild(F,F.parentNode);}
,removeAllRules:function(I){if(qx.core.Environment.get(m)){var H=I.cssRules;var J=H.length;for(var i=J-1;i>=0;i-- ){I.deleteRule(i);}
;}
else {var H=I.rules;var J=H.length;for(var i=J-1;i>=0;i-- ){I.removeRule(i);}
;}
;}
,addImport:function(L,K){if(qx.core.Environment.get(c)){L.addImport(K);}
else {L.insertRule(g+K+k,L.cssRules.length);}
;}
,removeImport:function(M,N){if(qx.core.Environment.get(l)){var O=M.imports;var P=O.length;for(var i=P-1;i>=0;i-- ){if(O[i].href==N||O[i].href==qx.util.Uri.getAbsolute(N)){M.removeImport(i);}
;}
;}
else {var Q=M.cssRules;var P=Q.length;for(var i=P-1;i>=0;i-- ){if(Q[i].href==N){M.deleteRule(i);}
;}
;}
;}
,removeAllImports:function(S){if(qx.core.Environment.get(l)){var U=S.imports;var T=U.length;for(var i=T-1;i>=0;i-- ){S.removeImport(i);}
;}
else {var R=S.cssRules;var T=R.length;for(var i=T-1;i>=0;i-- ){if(R[i].type==R[i].IMPORT_RULE){S.deleteRule(i);}
;}
;}
;}
}});}
)();
(function(){var a="qx.dom.Element",b="The tag name is missing!";qx.Bootstrap.define(a,{statics:{getParentElement:function(c){return c.parentNode;}
,insertEnd:function(d,parent){parent.appendChild(d);return true;}
,insertBefore:function(e,f){f.parentNode.insertBefore(e,f);return true;}
,insertAfter:function(g,h){var parent=h.parentNode;if(h==parent.lastChild){parent.appendChild(g);}
else {return this.insertBefore(g,h.nextSibling);}
;return true;}
,remove:function(i){if(!i.parentNode){return false;}
;i.parentNode.removeChild(i);return true;}
,removeChild:function(j,parent){if(j.parentNode!==parent){return false;}
;parent.removeChild(j);return true;}
,create:function(name,l,k){if(!k){k=window;}
;if(!name){throw new Error(b);}
;var n=k.document.createElement(name);for(var m in l){qx.bom.element.Attribute.set(n,m,l[m]);}
;return n;}
}});}
)();
(function(){var a="readOnly",b="accessKey",c="qx.bom.element.Attribute",d="rowSpan",e="vAlign",f="className",g="textContent",h="htmlFor",i="longDesc",j="cellSpacing",k="frameBorder",l="",m="useMap",n="innerText",o="innerHTML",p="tabIndex",q="dateTime",r="maxLength",s="html.element.textcontent",t="mshtml",u="engine.name",v="cellPadding",w="browser.documentmode",x="colSpan",y="undefined";qx.Bootstrap.define(c,{statics:{__T:{names:{"class":f,"for":h,html:o,text:qx.core.Environment.get(s)?g:n,colspan:x,rowspan:d,valign:e,datetime:q,accesskey:b,tabindex:p,maxlength:r,readonly:a,longdesc:i,cellpadding:v,cellspacing:j,frameborder:k,usemap:m},runtime:{"html":1,"text":1},bools:{compact:1,nowrap:1,ismap:1,declare:1,noshade:1,checked:1,disabled:1,readOnly:1,multiple:1,selected:1,noresize:1,defer:1,allowTransparency:1},property:{$$html:1,$$widget:1,disabled:1,checked:1,readOnly:1,multiple:1,selected:1,value:1,maxLength:1,className:1,innerHTML:1,innerText:1,textContent:1,htmlFor:1,tabIndex:1},qxProperties:{$$widget:1,$$html:1},propertyDefault:{disabled:false,checked:false,readOnly:false,multiple:false,selected:false,value:l,className:l,innerHTML:l,innerText:l,textContent:l,htmlFor:l,tabIndex:0,maxLength:qx.core.Environment.select(u,{"mshtml":2147483647,"webkit":524288,"default":-1})},removeableProperties:{disabled:1,multiple:1,maxLength:1},original:{href:1,src:1,type:1}},get:function(B,name){var z=this.__T;var A;name=z.names[name]||name;if(qx.core.Environment.get(u)==t&&parseInt(qx.core.Environment.get(w),10)<8&&z.original[name]){A=B.getAttribute(name,2);}
else if(z.property[name]){A=B[name];if(typeof z.propertyDefault[name]!==y&&A==z.propertyDefault[name]){if(typeof z.bools[name]===y){return null;}
else {return A;}
;}
;}
else {A=B.getAttribute(name);}
;if(z.bools[name]){return !!A;}
;return A;}
,set:function(E,name,D){if(typeof D===y){return;}
;var C=this.__T;name=C.names[name]||name;if(C.bools[name]){D=!!D;}
;if(C.property[name]&&(!(E[name]===undefined)||C.qxProperties[name])){if(D==null){if(C.removeableProperties[name]){E.removeAttribute(name);return;}
else if(typeof C.propertyDefault[name]!==y){D=C.propertyDefault[name];}
;}
;E[name]=D;}
else {if(D===true){E.setAttribute(name,name);}
else if(D===false||D===null){E.removeAttribute(name);}
else {E.setAttribute(name,D);}
;}
;}
}});}
)();
(function(){var a="file",b="+",c="strict",d="anchor",e="div",f="query",g="source",h="password",j="host",k="protocol",l="user",n="directory",p="loose",q="relative",r="queryKey",s="qx.util.Uri",t="",u="path",v="authority",w='">0</a>',x="&",y="port",z='<a href="',A="userInfo",B="?",C="=";qx.Bootstrap.define(s,{statics:{parseUri:function(F,E){var G={key:[g,k,v,A,l,h,j,y,q,u,n,a,f,d],q:{name:r,parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}};var o=G,m=G.parser[E?c:p].exec(F),D={},i=14;while(i-- ){D[o.key[i]]=m[i]||t;}
;D[o.q.name]={};D[o.key[12]].replace(o.q.parser,function(I,J,H){if(J){D[o.q.name][J]=H;}
;}
);return D;}
,appendParamsToUrl:function(K,L){if(L===undefined){return K;}
;{}
;if(qx.lang.Type.isObject(L)){L=qx.util.Uri.toParameter(L);}
;if(!L){return K;}
;return K+=/\?/.test(K)?x+L:B+L;}
,toParameter:function(M,Q){var P,O=[];for(P in M){if(M.hasOwnProperty(P)){var N=M[P];if(N instanceof Array){for(var i=0;i<N.length;i++ ){this.__U(P,N[i],O,Q);}
;}
else {this.__U(P,N,O,Q);}
;}
;}
;return O.join(x);}
,__U:function(U,V,T,S){var R=window.encodeURIComponent;if(S){T.push(R(U).replace(/%20/g,b)+C+R(V).replace(/%20/g,b));}
else {T.push(R(U)+C+R(V));}
;}
,getAbsolute:function(X){var W=document.createElement(e);W.innerHTML=z+X+w;return W.firstChild.href;}
}});}
)();
(function(){var a="qx.bom.client.Stylesheet",b="html.stylesheet.deleterule",c="html.stylesheet.insertrule",d="function",e="html.stylesheet.createstylesheet",f="html.stylesheet.addimport",g="html.stylesheet.removeimport",h="object";qx.Bootstrap.define(a,{statics:{__V:function(){if(!qx.bom.client.Stylesheet.__W){qx.bom.client.Stylesheet.__W=qx.bom.Stylesheet.createElement();}
;return qx.bom.client.Stylesheet.__W;}
,getCreateStyleSheet:function(){return typeof document.createStyleSheet===h;}
,getInsertRule:function(){return typeof qx.bom.client.Stylesheet.__V().insertRule===d;}
,getDeleteRule:function(){return typeof qx.bom.client.Stylesheet.__V().deleteRule===d;}
,getAddImport:function(){return (typeof qx.bom.client.Stylesheet.__V().addImport===h);}
,getRemoveImport:function(){return (typeof qx.bom.client.Stylesheet.__V().removeImport===h);}
},defer:function(i){qx.core.Environment.add(e,i.getCreateStyleSheet);qx.core.Environment.add(c,i.getInsertRule);qx.core.Environment.add(b,i.getDeleteRule);qx.core.Environment.add(f,i.getAddImport);qx.core.Environment.add(g,i.getRemoveImport);}
});}
)();
(function(){var a="qx.dom.Hierarchy",b="previousSibling",c="nextSibling",d="html.element.contains",e="html.element.compareDocumentPosition";qx.Bootstrap.define(a,{statics:{getNextElementSibling:function(f){while(f&&(f=f.nextSibling)&&!qx.dom.Node.isElement(f)){continue;}
;return f||null;}
,getPreviousElementSibling:function(g){while(g&&(g=g.previousSibling)&&!qx.dom.Node.isElement(g)){continue;}
;return g||null;}
,contains:function(j,i){if(qx.core.Environment.get(d)){if(qx.dom.Node.isDocument(j)){var h=qx.dom.Node.getDocument(i);return j&&h==j;}
else if(qx.dom.Node.isDocument(i)){return false;}
else {return j.contains(i);}
;}
else if(qx.core.Environment.get(e)){return !!(j.compareDocumentPosition(i)&16);}
else {while(i){if(j==i){return true;}
;i=i.parentNode;}
;return false;}
;}
,isRendered:function(l){var k=l.ownerDocument||l.document;if(qx.core.Environment.get(d)){if(!l.parentNode||!l.offsetParent){return false;}
;return k.body.contains(l);}
else if(qx.core.Environment.get(e)){return !!(k.compareDocumentPosition(l)&16);}
else {while(l){if(l==k.body){return true;}
;l=l.parentNode;}
;return false;}
;}
,getChildElements:function(n){n=n.firstChild;if(!n){return [];}
;var m=this.getNextSiblings(n);if(n.nodeType===1){m.unshift(n);}
;return m;}
,getPreviousSiblings:function(o){return this._recursivelyCollect(o,b);}
,getNextSiblings:function(p){return this._recursivelyCollect(p,c);}
,_recursivelyCollect:function(s,q){var r=[];while(s=s[q]){if(s.nodeType==1){r.push(s);}
;}
;return r;}
,getSiblings:function(t){return this.getPreviousSiblings(t).reverse().concat(this.getNextSiblings(t));}
}});}
)();
(function(){var a="html.node.isequalnode",b="namespaceURI",c="nodeValue",d="nodeType",e="qx.module.Traversing",f="getNextSiblings",g="prefix",h="nodeName",k="getPreviousSiblings",n="getSiblings",o="localName",p="length",q="string";qx.Bootstrap.define(e,{statics:{EQUALITY_ATTRIBUTES:[d,h,o,b,g,c],add:function(r){if(r instanceof qxWeb){r=r[0];}
;if(qx.module.Traversing.isElement(r)||qx.module.Traversing.isDocument(r)||qx.module.Traversing.isWindow(r)){this.push(r);}
;return this;}
,getChildren:function(u){var t=[];for(var i=0;i<this.length;i++ ){var s=qx.dom.Hierarchy.getChildElements(this[i]);if(u){s=qx.bom.Selector.matches(u,s);}
;t=t.concat(s);}
;return qxWeb.$init(t,qxWeb);}
,forEach:function(w,v){for(var i=0;i<this.length;i++ ){w.call(v,this[i],i,this);}
;return this;}
,getParents:function(z){var y=[];for(var i=0;i<this.length;i++ ){var x=qx.dom.Element.getParentElement(this[i]);if(z){x=qx.bom.Selector.matches(z,[x]);}
;y=y.concat(x);}
;return qxWeb.$init(y,qxWeb);}
,isChildOf:function(parent){if(this.length==0){return false;}
;var A=null,D=qxWeb(parent),B=false;for(var i=0,l=this.length;i<l&&!B;i++ ){A=qxWeb(this[i]).getAncestors();for(var j=0,C=D.length;j<C;j++ ){if(A.indexOf(D[j])!=-1){B=true;break;}
;}
;}
;return B;}
,getAncestors:function(E){return this.__X(null,E);}
,getAncestorsUntil:function(G,F){return this.__X(G,F);}
,__X:function(I,J){var H=[];for(var i=0;i<this.length;i++ ){var parent=qx.dom.Element.getParentElement(this[i]);while(parent){var K=[parent];if(I&&qx.bom.Selector.matches(I,K).length>0){break;}
;if(J){K=qx.bom.Selector.matches(J,K);}
;H=H.concat(K);parent=qx.dom.Element.getParentElement(parent);}
;}
;return qxWeb.$init(H,qxWeb);}
,getClosest:function(N){var M=[];var L=function(O){var P=qx.bom.Selector.matches(N,O);if(P.length){M.push(P[0]);}
else {O=O.getParents();if(O[0]&&O[0].parentNode){L(O);}
;}
;}
;for(var i=0;i<this.length;i++ ){L(qxWeb(this[i]));}
;return qxWeb.$init(M,qxWeb);}
,find:function(R){var Q=[];for(var i=0;i<this.length;i++ ){Q=Q.concat(qx.bom.Selector.query(R,this[i]));}
;return qxWeb.$init(Q,qxWeb);}
,getContents:function(){var S=[];this._forEachElement(function(T){S=S.concat(qx.lang.Array.fromCollection(T.childNodes));}
);return qxWeb.$init(S,qxWeb);}
,is:function(U){if(qx.lang.Type.isFunction(U)){return this.filter(U).length>0;}
;return !!U&&qx.bom.Selector.matches(U,this).length>0;}
,eq:function(V){return this.slice(V,+V+1);}
,getFirst:function(){return this.slice(0,1);}
,getLast:function(){return this.slice(this.length-1);}
,has:function(X){var W=[];this._forEachElement(function(Y,ba){var bb=qx.bom.Selector.matches(X,this.eq(ba).getContents());if(bb.length>0){W.push(Y);}
;}
);return qxWeb.$init(W,this.constructor);}
,contains:function(bc){if(bc instanceof Array||bc instanceof qxWeb){bc=bc[0];}
;if(!bc){return qxWeb();}
;if(qx.dom.Node.isWindow(bc)){bc=bc.document;}
;return this.filter(function(bd){if(qx.dom.Node.isWindow(bd)){bd=bd.document;}
;return qx.dom.Hierarchy.contains(bd,bc);}
);}
,getNext:function(bf){var be=this.map(qx.dom.Hierarchy.getNextElementSibling,qx.dom.Hierarchy);if(bf){be=qxWeb.$init(qx.bom.Selector.matches(bf,be),qxWeb);}
;return be;}
,getNextAll:function(bh){var bg=qx.module.Traversing.__bb(this,f,bh);return qxWeb.$init(bg,qxWeb);}
,getNextUntil:function(bj){var bi=[];this.forEach(function(bm,bk){var bl=qx.dom.Hierarchy.getNextSiblings(bm);for(var i=0,l=bl.length;i<l;i++ ){if(qx.bom.Selector.matches(bj,[bl[i]]).length>0){break;}
;bi.push(bl[i]);}
;}
);return qxWeb.$init(bi,qxWeb);}
,getPrev:function(bo){var bn=this.map(qx.dom.Hierarchy.getPreviousElementSibling,qx.dom.Hierarchy);if(bo){bn=qxWeb.$init(qx.bom.Selector.matches(bo,bn),qxWeb);}
;return bn;}
,getPrevAll:function(bq){var bp=qx.module.Traversing.__bb(this,k,bq);return qxWeb.$init(bp,qxWeb);}
,getPrevUntil:function(bs){var br=[];this.forEach(function(bv,bt){var bu=qx.dom.Hierarchy.getPreviousSiblings(bv);for(var i=0,l=bu.length;i<l;i++ ){if(qx.bom.Selector.matches(bs,[bu[i]]).length>0){break;}
;br.push(bu[i]);}
;}
);return qxWeb.$init(br,qxWeb);}
,getSiblings:function(bx){var bw=qx.module.Traversing.__bb(this,n,bx);return qxWeb.$init(bw,qxWeb);}
,not:function(bz){if(qx.lang.Type.isFunction(bz)){return this.filter(function(bA,bC,bB){return !bz(bA,bC,bB);}
);}
;var by=qx.bom.Selector.matches(bz,this);return this.filter(function(bD){return by.indexOf(bD)===-1;}
);}
,getOffsetParent:function(){return this.map(qx.bom.element.Location.getOffsetParent);}
,isRendered:function(){if(!this[0]){return false;}
;return qx.dom.Hierarchy.isRendered(this[0]);}
,isElement:function(bE){return qx.dom.Node.isElement(bE);}
,isNode:function(bF){return qx.dom.Node.isNode(bF);}
,isNodeName:function(bG,bH){return qx.dom.Node.isNodeName(bG,bH);}
,isDocument:function(bI){return qx.dom.Node.isDocument(bI);}
,getWindow:function(bJ){return qx.dom.Node.getWindow(bJ);}
,isTextNode:function(bK){return qx.dom.Node.isText(bK);}
,isWindow:function(bL){return qx.dom.Node.isWindow(bL);}
,getDocument:function(bM){return qx.dom.Node.getDocument(bM);}
,getNodeName:function(bN){return qx.dom.Node.getName(bN);}
,getNodeText:function(bO){return qx.dom.Node.getText(bO);}
,isBlockNode:function(bP){return qx.dom.Node.isBlockNode(bP);}
,equalNodes:function(bY,cb){bY=qx.module.Traversing.__Y(bY);cb=qx.module.Traversing.__Y(cb);if(!bY||!cb){return false;}
;if(qx.core.Environment.get(a)){return bY.isEqualNode(cb);}
else {if(bY===cb){return true;}
;var bX=bY.attributes&&cb.attributes;if(bX&&bY.attributes.length!==cb.attributes.length){return false;}
;var bW=bY.childNodes&&cb.childNodes;if(bW&&bY.childNodes.length!==cb.childNodes.length){return false;}
;var bV=qx.module.Traversing.EQUALITY_ATTRIBUTES;for(var i=0,l=bV.length;i<l;i++ ){var bU=bV[i];if(bY[bU]!==cb[bU]){return false;}
;}
;if(bX){var bQ=qx.module.Traversing.__ba(bY);var ca=qx.module.Traversing.__ba(cb);for(var bS in bQ){if(bQ[bS]!==ca[bS]){return false;}
;}
;}
;if(bW){for(var j=0,m=bY.childNodes.length;j<m;j++ ){var bT=bY.childNodes[j];var bR=cb.childNodes[j];if(!qx.module.Traversing.equalNodes(bT,bR)){return false;}
;}
;}
;return true;}
;}
,__Y:function(cc){if(typeof cc==q){cc=qxWeb(cc);}
;if(cc instanceof Array||cc instanceof qxWeb){cc=cc[0];}
;return qxWeb.isNode(cc)?cc:null;}
,__ba:function(cd){var ce={};for(var cf in cd.attributes){if(cf==p){continue;}
;var name=cd.attributes[cf].name;var cg=cd.attributes[cf].value;ce[name]=cg;}
;return ce;}
,__bb:function(cj,cm,ck){var ch=[];var ci=qx.dom.Hierarchy;for(var i=0,l=cj.length;i<l;i++ ){ch.push.apply(ch,ci[cm](cj[i]));}
;var cl=qx.lang.Array.unique(ch);if(ck){cl=qx.bom.Selector.matches(ck,cl);}
;return cl;}
},defer:function(cn){qxWeb.$attach({"add":cn.add,"getChildren":cn.getChildren,"forEach":cn.forEach,"getParents":cn.getParents,"getAncestors":cn.getAncestors,"getAncestorsUntil":cn.getAncestorsUntil,"__X":cn.__X,"getClosest":cn.getClosest,"find":cn.find,"getContents":cn.getContents,"is":cn.is,"eq":cn.eq,"getFirst":cn.getFirst,"getLast":cn.getLast,"has":cn.has,"getNext":cn.getNext,"getNextAll":cn.getNextAll,"getNextUntil":cn.getNextUntil,"getPrev":cn.getPrev,"getPrevAll":cn.getPrevAll,"getPrevUntil":cn.getPrevUntil,"getSiblings":cn.getSiblings,"not":cn.not,"getOffsetParent":cn.getOffsetParent,"isRendered":cn.isRendered,"isChildOf":cn.isChildOf,"contains":cn.contains});qxWeb.$attachStatic({"isElement":cn.isElement,"isNode":cn.isNode,"isNodeName":cn.isNodeName,"isDocument":cn.isDocument,"getDocument":cn.getDocument,"getWindow":cn.getWindow,"isWindow":cn.isWindow,"isBlockNode":cn.isBlockNode,"getNodeName":cn.getNodeName,"getNodeText":cn.getNodeText,"isTextNode":cn.isTextNode,"equalNodes":cn.equalNodes});}
});}
)();
(function(){var a="ipod",b="pc",c="ps3",d=")",e="iPhone",f="psp",g="wii",h="xbox",i="\.",j="ipad",k="ds",l="(",m="mobile",n="device.type",o="tablet",p="ontouchstart",q="g",r="|",s="qx.bom.client.Device",t="desktop",u="device.name",v="device.touch",w="undefined",x="device.pixelRatio";qx.Bootstrap.define(s,{statics:{__s:{"iPod":a,"iPad":j,"iPhone":e,"PSP":f,"PLAYSTATION 3":c,"Nintendo Wii":g,"Nintendo DS":k,"XBOX":h,"Xbox":h},getName:function(){var A=[];for(var z in this.__s){A.push(z);}
;var B=new RegExp(l+A.join(r).replace(/\./g,i)+d,q);var y=B.exec(navigator.userAgent);if(y&&y[1]){return qx.bom.client.Device.__s[y[1]];}
;return b;}
,getType:function(){return qx.bom.client.Device.detectDeviceType(navigator.userAgent);}
,detectDeviceType:function(C){if(qx.bom.client.Device.detectTabletDevice(C)){return o;}
else if(qx.bom.client.Device.detectMobileDevice(C)){return m;}
;return t;}
,detectMobileDevice:function(D){return /android.+mobile|ip(hone|od)|bada\/|blackberry|BB10|maemo|opera m(ob|in)i|fennec|NetFront|phone|psp|symbian|IEMobile|windows (ce|phone)|xda/i.test(D);}
,detectTabletDevice:function(F){var G=(/MSIE 10/i.test(F))&&(/ARM/i.test(F))&&!(/windows phone/i.test(F));var E=(!(/Fennec|HTC.Magic|Nexus|android.+mobile|Tablet PC/i.test(F))&&(/Android|ipad|tablet|playbook|silk|kindle|psp/i.test(F)));return G||E;}
,getDevicePixelRatio:function(){if(typeof window.devicePixelRatio!==w){return window.devicePixelRatio;}
;return 1;}
,getTouch:function(){return ((p in window)||window.navigator.maxTouchPoints>0||window.navigator.msMaxTouchPoints>0);}
},defer:function(H){qx.core.Environment.add(u,H.getName);qx.core.Environment.add(v,H.getTouch);qx.core.Environment.add(n,H.getType);qx.core.Environment.add(x,H.getDevicePixelRatio);}
});}
)();
(function(){var a="mshtml",b="pointerEnabled",c="onhashchange",d="event.help",e="event.mspointer",f="event.touch",g="msPointerEnabled",h="event.hashchange",i="onhelp",j="documentMode",k="qx.bom.client.Event",l="ontouchstart";qx.Bootstrap.define(k,{statics:{getTouch:function(){return (l in window);}
,getMsPointer:function(){if(b in window.navigator){return window.navigator.pointerEnabled;}
else if(g in window.navigator){return window.navigator.msPointerEnabled;}
;return false;}
,getHelp:function(){return (i in document);}
,getHashChange:function(){var m=qx.bom.client.Engine.getName();var n=c in window;return (m!==a&&n)||(m===a&&j in document&&document.documentMode>=8&&n);}
},defer:function(o){qx.core.Environment.add(f,o.getTouch);qx.core.Environment.add(e,o.getMsPointer);qx.core.Environment.add(d,o.getHelp);qx.core.Environment.add(h,o.getHashChange);}
});}
)();
(function(){var a="engine.name",b="event.mspointer",c="device.type",d="engine.version",e="qx.module.Environment",f="browser.version",g="event.touch",h="browser.quirksmode",i="browser.name",j="browser.documentmode";qx.Bootstrap.define(e,{statics:{get:function(k){return qx.core.Environment.get(k);}
,add:function(l,m){qx.core.Environment.add(l,m);return this;}
},defer:function(n){qx.core.Environment.get(i);qx.core.Environment.get(f);qx.core.Environment.get(h);qx.core.Environment.get(j);qx.core.Environment.get(a);qx.core.Environment.get(d);qx.core.Environment.get(c);qx.core.Environment.get(g);qx.core.Environment.get(b);qxWeb.$attachStatic({"env":{get:n.get,add:n.add}});}
});}
)();
(function(){var a="qx.module.Attribute",b="html";qx.Bootstrap.define(a,{statics:{getHtml:function(){if(this[0]&&this[0].nodeType===1){return qx.bom.element.Attribute.get(this[0],b);}
;return null;}
,setHtml:function(c){c=qx.bom.Html.fixEmptyTags(c);this._forEachElement(function(d){qx.bom.element.Attribute.set(d,b,c);}
);return this;}
,setAttribute:function(name,e){this._forEachElement(function(f){qx.bom.element.Attribute.set(f,name,e);}
);return this;}
,getAttribute:function(name){if(this[0]&&this[0].nodeType===1){return qx.bom.element.Attribute.get(this[0],name);}
;return null;}
,removeAttribute:function(name){this._forEachElement(function(g){qx.bom.element.Attribute.set(g,name,null);}
);return this;}
,setAttributes:function(h){for(var name in h){this.setAttribute(name,h[name]);}
;return this;}
,getAttributes:function(k){var j={};for(var i=0;i<k.length;i++ ){j[k[i]]=this.getAttribute(k[i]);}
;return j;}
,removeAttributes:function(m){for(var i=0,l=m.length;i<l;i++ ){this.removeAttribute(m[i]);}
;return this;}
,setProperty:function(name,n){for(var i=0;i<this.length;i++ ){this[i][name]=n;}
;return this;}
,getProperty:function(name){if(this[0]){return this[0][name];}
;return null;}
,setProperties:function(o){for(var name in o){this.setProperty(name,o[name]);}
;return this;}
,getProperties:function(p){var q={};for(var i=0;i<p.length;i++ ){q[p[i]]=this.getProperty(p[i]);}
;return q;}
,getValue:function(){if(this[0]&&this[0].nodeType===1){return qx.bom.Input.getValue(this[0]);}
;return null;}
,setValue:function(r){this._forEachElement(function(s){qx.bom.Input.setValue(s,r);}
);return this;}
},defer:function(t){qxWeb.$attach({"getHtml":t.getHtml,"setHtml":t.setHtml,"getAttribute":t.getAttribute,"setAttribute":t.setAttribute,"removeAttribute":t.removeAttribute,"getAttributes":t.getAttributes,"setAttributes":t.setAttributes,"removeAttributes":t.removeAttributes,"getProperty":t.getProperty,"setProperty":t.setProperty,"getProperties":t.getProperties,"setProperties":t.setProperties,"getValue":t.getValue,"setValue":t.setValue});}
});}
)();
(function(){var a="<fieldset>",b="<select multiple='multiple'>",c="</div>",d="</select>",e="</tr></tbody></table>",f="<col",g="div",h="<table><tbody><tr>",k="string",m=">",n="script",o="<table><tbody></tbody><colgroup>",p="<th",q="</tbody></table>",r="<td",s="</colgroup></table>",t="<opt",u="text/javascript",v="",w="<table>",x="</fieldset>",y="<table><tbody>",z="div<div>",A="<table",B="mshtml",C="engine.name",D="qx.bom.Html",E="<leg",F="tbody",G="<tr",H="</table>",I="undefined",J="></";qx.Bootstrap.define(D,{statics:{__bc:function(L,K,M){return M.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?L:K+J+M+m;}
,__bd:{opt:[1,b,d],leg:[1,a,x],table:[1,w,H],tr:[2,y,q],td:[3,h,e],col:[2,o,s],def:qx.core.Environment.select(C,{"mshtml":[1,z,c],"default":null})},fixEmptyTags:function(N){return N.replace(/(<(\w+)[^>]*?)\/>/g,this.__bc);}
,__be:function(S,T){var V=T.createElement(g);S=qx.bom.Html.fixEmptyTags(S);var P=S.replace(/^\s+/,v).substring(0,5).toLowerCase();var U,O=this.__bd;if(!P.indexOf(t)){U=O.opt;}
else if(!P.indexOf(E)){U=O.leg;}
else if(P.match(/^<(thead|tbody|tfoot|colg|cap)/)){U=O.table;}
else if(!P.indexOf(G)){U=O.tr;}
else if(!P.indexOf(r)||!P.indexOf(p)){U=O.td;}
else if(!P.indexOf(f)){U=O.col;}
else {U=O.def;}
;if(U){V.innerHTML=U[1]+S+U[2];var R=U[0];while(R-- ){V=V.lastChild;}
;}
else {V.innerHTML=S;}
;if((qx.core.Environment.get(C)==B)){var W=/<tbody/i.test(S);var Q=!P.indexOf(A)&&!W?V.firstChild&&V.firstChild.childNodes:U[1]==w&&!W?V.childNodes:[];for(var j=Q.length-1;j>=0; --j){if(Q[j].tagName.toLowerCase()===F&&!Q[j].childNodes.length){Q[j].parentNode.removeChild(Q[j]);}
;}
;if(/^\s/.test(S)){V.insertBefore(T.createTextNode(S.match(/^\s*/)[0]),V.firstChild);}
;}
;return qx.lang.Array.fromCollection(V.childNodes);}
,clean:function(X,bc,ba){bc=bc||document;if(typeof bc.createElement===I){bc=bc.ownerDocument||bc[0]&&bc[0].ownerDocument||document;}
;if(!ba&&X.length===1&&typeof X[0]===k){var bd=/^<(\w+)\s*\/?>$/.exec(X[0]);if(bd){return [bc.createElement(bd[1])];}
;}
;var Y,bb=[];for(var i=0,l=X.length;i<l;i++ ){Y=X[i];if(typeof Y===k){Y=this.__be(Y,bc);}
;if(Y.nodeType){bb.push(Y);}
else if(Y instanceof qx.type.BaseArray||(typeof qxWeb!==I&&Y instanceof qxWeb)){bb.push.apply(bb,Array.prototype.slice.call(Y,0));}
else if(Y.toElement){bb.push(Y.toElement());}
else {bb.push.apply(bb,Y);}
;}
;if(ba){return qx.bom.Html.extractScripts(bb,ba);}
;return bb;}
,extractScripts:function(bh,bf){var bi=[],bg;for(var i=0;bh[i];i++ ){bg=bh[i];if(bg.nodeType==1&&bg.tagName.toLowerCase()===n&&(!bg.type||bg.type.toLowerCase()===u)){if(bg.parentNode){bg.parentNode.removeChild(bh[i]);}
;bi.push(bg);}
else {if(bg.nodeType===1){var be=qx.lang.Array.fromCollection(bg.getElementsByTagName(n));bh.splice.apply(bh,[i+1,0].concat(be));}
;if(bf){bf.appendChild(bg);}
;}
;}
;return bi;}
}});}
)();
(function(){var a="text",b="engine.name",c="",d="mshtml",e="number",f="checkbox",g="select-one",h="option",j="value",k="select",m="radio",n="qx.bom.Input",o="textarea";qx.Bootstrap.define(n,{statics:{setValue:function(u,t){var v=u.nodeName.toLowerCase();var q=u.type;var Array=qx.lang.Array;var w=qx.lang.Type;if(typeof t===e){t+=c;}
;if((q===f||q===m)){if(w.isArray(t)){u.checked=Array.contains(t,u.value);}
else {u.checked=u.value==t;}
;}
else if(v===k){var p=w.isArray(t);var x=u.options;var r,s;for(var i=0,l=x.length;i<l;i++ ){r=x[i];s=r.getAttribute(j);if(s==null){s=r.text;}
;r.selected=p?Array.contains(t,s):t==s;}
;if(p&&t.length==0){u.selectedIndex=-1;}
;}
else if((q===a||q===o)&&(qx.core.Environment.get(b)==d)){u.$$inValueSet=true;u.value=t;u.$$inValueSet=null;}
else {u.value=t;}
;}
,getValue:function(F){var D=F.nodeName.toLowerCase();if(D===h){return (F.attributes.value||{}).specified?F.value:F.text;}
;if(D===k){var y=F.selectedIndex;if(y<0){return null;}
;var E=[];var H=F.options;var C=F.type==g;var G=qx.bom.Input;var B;for(var i=C?y:0,A=C?y+1:H.length;i<A;i++ ){var z=H[i];if(z.selected){B=G.getValue(z);if(C){return B;}
;E.push(B);}
;}
;return E;}
else {return (F.value||c).replace(/\r/g,c);}
;}
}});}
)();
(function(){var a="qx.lang.normalize.Function",b="ecmascript.function.bind",c="function",d="Function.prototype.bind called on incompatible ";qx.Bootstrap.define(a,{defer:function(){if(!qx.core.Environment.get(b)){var e=Array.prototype.slice;Function.prototype.bind=function(i){var h=this;if(typeof h!=c){throw new TypeError(d+h);}
;var f=e.call(arguments,1);var g=function(){if(this instanceof g){var F=function(){}
;F.prototype=h.prototype;var self=new F;var j=h.apply(self,f.concat(e.call(arguments)));if(Object(j)===j){return j;}
;return self;}
else {return h.apply(i,f.concat(e.call(arguments)));}
;}
;return g;}
;}
;}
});}
)();
(function(){var a="",b="qx.lang.normalize.Error",c=": ",d="Error",e="ecmascript.error.toString";qx.Bootstrap.define(b,{defer:function(){if(!qx.core.Environment.get(e)){Error.prototype.toString=function(){var name=this.name||d;var f=this.message||a;if(name===a&&f===a){return d;}
;if(name===a){return f;}
;if(f===a){return name;}
;return name+c+f;}
;}
;}
});}
)();
(function(){var a="qx.module.Polyfill";qx.Bootstrap.define(a,{});}
)();
(function(){var a="mshtml",b="engine.name",c="*",d="mouseover",e="mouseout",f="load",g="left",h="qx.module.Event",n="undefined",o="DOMContentLoaded",p="browser.documentmode",q="complete";qx.Bootstrap.define(h,{statics:{__bf:{},__bg:{on:{},off:{}},on:function(B,z,A,s){for(var i=0;i<this.length;i++ ){var r=this[i];var v=A||qxWeb(r);var u=qx.module.Event.__bg.on;var t=u[c]||[];if(u[B]){t=t.concat(u[B]);}
;for(var j=0,m=t.length;j<m;j++ ){t[j](r,B,z,A);}
;var w=function(event){var E=qx.module.Event.__bf;var D=E[c]||[];if(E[B]){D=D.concat(E[B]);}
;for(var x=0,y=D.length;x<y;x++ ){event=D[x](event,r,B);}
;z.apply(this,[event]);}
.bind(v);w.original=z;if(qx.bom.Event.supportsEvent(r,B)){qx.bom.Event.addNativeListener(r,B,w,s);}
;if(!r.__bh){r.__bh=new qx.event.Emitter();}
;var C=r.__bh.on(B,w,v);if(!r.__bi){r.__bi={};}
;if(!r.__bi[B]){r.__bi[B]={};}
;r.__bi[B][C]=w;if(!A){if(!r.__bj){r.__bj={};}
;r.__bj[C]=v;}
;}
;return this;}
,off:function(P,H,M,G){var L=(H===null&&M===null);for(var j=0;j<this.length;j++ ){var F=this[j];if(!F.__bi){continue;}
;var R=[];if(P!==null){R.push(P);}
else {for(var J in F.__bi){R.push(J);}
;}
;for(var i=0,l=R.length;i<l;i++ ){for(var K in F.__bi[R[i]]){var O=F.__bi[R[i]][K];if(L||O==H||O.original==H){var I=typeof F.__bj!==n&&F.__bj[K];var S;if(!M&&I){S=F.__bj[K];}
;F.__bh.off(R[i],O,S||M);if(L||O.original==H){qx.bom.Event.removeNativeListener(F,R[i],O,G);}
;delete F.__bi[R[i]][K];if(I){delete F.__bj[K];}
;}
;}
;var N=qx.module.Event.__bg.off;var Q=N[c]||[];if(N[P]){Q=Q.concat(N[P]);}
;for(var k=0,m=Q.length;k<m;k++ ){Q[k](F,P,H,M);}
;}
;}
;return this;}
,allOff:function(T){return this.off(T||null,null,null);}
,emit:function(U,V){for(var j=0;j<this.length;j++ ){var W=this[j];if(W.__bh){W.__bh.emit(U,V);}
;}
;return this;}
,once:function(Y,X,bb){var self=this;var ba=function(bc){self.off(Y,ba,bb);X.call(this,bc);}
;this.on(Y,ba,bb);return this;}
,hasListener:function(bg,be,bf){if(!this[0]||!this[0].__bh||!this[0].__bh.getListeners()[bg]){return false;}
;if(be){var bh=this[0].__bh.getListeners()[bg];for(var i=0;i<bh.length;i++ ){var bd=false;if(bh[i].listener==be){bd=true;}
;if(bh[i].listener.original&&bh[i].listener.original==be){bd=true;}
;if(bd){if(bf!==undefined){if(bh[i].ctx===bf){return true;}
;}
else {return true;}
;}
;}
;return false;}
;return this[0].__bh.getListeners()[bg].length>0;}
,copyEventsTo:function(bo){var bm=this.concat();var bn=bo.concat();for(var i=bm.length-1;i>=0;i-- ){var bj=bm[i].getElementsByTagName(c);for(var j=0;j<bj.length;j++ ){bm.push(bj[j]);}
;}
;for(var i=bn.length-1;i>=0;i-- ){var bj=bn[i].getElementsByTagName(c);for(var j=0;j<bj.length;j++ ){bn.push(bj[j]);}
;}
;bn.forEach(function(bp){bp.__bh=null;}
);for(var i=0;i<bm.length;i++ ){var bi=bm[i];if(!bi.__bh){continue;}
;var bk=bi.__bh.getListeners();for(var name in bk){for(var j=bk[name].length-1;j>=0;j-- ){var bl=bk[name][j].listener;if(bl.original){bl=bl.original;}
;qxWeb(bn[i]).on(name,bl,bk[name][j].ctx);}
;}
;}
;}
,__bk:false,ready:function(bq){if(document.readyState===q){window.setTimeout(bq,1);return;}
;var br=function(){qx.module.Event.__bk=true;bq();}
;qxWeb(window).on(f,br);var bs=function(){qxWeb(window).off(f,br);bq();}
;if(qxWeb.env.get(b)!==a||qxWeb.env.get(p)>8){qx.bom.Event.addNativeListener(document,o,bs);}
else {var bt=function(){if(qx.module.Event.__bk){return;}
;try{document.documentElement.doScroll(g);if(document.body){bs();}
;}
catch(bu){window.setTimeout(bt,100);}
;}
;bt();}
;}
,hover:function(bv,bw){this.on(d,bv,this);if(qx.lang.Type.isFunction(bw)){this.on(e,bw,this);}
;return this;}
,$registerNormalization:function(bA,bx){if(!qx.lang.Type.isArray(bA)){bA=[bA];}
;var by=qx.module.Event.__bf;for(var i=0,l=bA.length;i<l;i++ ){var bz=bA[i];if(qx.lang.Type.isFunction(bx)){if(!by[bz]){by[bz]=[];}
;by[bz].push(bx);}
;}
;}
,$unregisterNormalization:function(bE,bB){if(!qx.lang.Type.isArray(bE)){bE=[bE];}
;var bC=qx.module.Event.__bf;for(var i=0,l=bE.length;i<l;i++ ){var bD=bE[i];if(bC[bD]){qx.lang.Array.remove(bC[bD],bB);}
;}
;}
,$getRegistry:function(){return qx.module.Event.__bf;}
,$registerEventHook:function(bK,bH,bG){if(!qx.lang.Type.isArray(bK)){bK=[bK];}
;var bI=qx.module.Event.__bg.on;for(var i=0,l=bK.length;i<l;i++ ){var bJ=bK[i];if(qx.lang.Type.isFunction(bH)){if(!bI[bJ]){bI[bJ]=[];}
;bI[bJ].push(bH);}
;}
;if(!bG){return;}
;var bF=qx.module.Event.__bg.off;for(var i=0,l=bK.length;i<l;i++ ){var bJ=bK[i];if(qx.lang.Type.isFunction(bG)){if(!bF[bJ]){bF[bJ]=[];}
;bF[bJ].push(bG);}
;}
;}
,$unregisterEventHook:function(bQ,bN,bM){if(!qx.lang.Type.isArray(bQ)){bQ=[bQ];}
;var bO=qx.module.Event.__bg.on;for(var i=0,l=bQ.length;i<l;i++ ){var bP=bQ[i];if(bO[bP]){qx.lang.Array.remove(bO[bP],bN);}
;}
;if(!bM){return;}
;var bL=qx.module.Event.__bg.off;for(var i=0,l=bQ.length;i<l;i++ ){var bP=bQ[i];if(bL[bP]){qx.lang.Array.remove(bL[bP],bM);}
;}
;}
,$getHookRegistry:function(){return qx.module.Event.__bg;}
},defer:function(bR){qxWeb.$attach({"on":bR.on,"off":bR.off,"allOff":bR.allOff,"once":bR.once,"emit":bR.emit,"hasListener":bR.hasListener,"copyEventsTo":bR.copyEventsTo,"hover":bR.hover});qxWeb.$attachStatic({"ready":bR.ready,"$registerEventNormalization":bR.$registerNormalization,"$unregisterEventNormalization":bR.$unregisterNormalization,"$getEventNormalizationRegistry":bR.$getRegistry,"$registerEventHook":bR.$registerEventHook,"$unregisterEventHook":bR.$unregisterEventHook,"$getEventHookRegistry":bR.$getHookRegistry});}
});}
)();
(function(){var a="mshtml",b="engine.name",c="",d="qx.bom.Event",f="return;",g="function",h="mouseover",j="transitionend",k="gecko",m="css.transition",n="on",o="undefined",p="browser.documentmode",q="end-event";qx.Bootstrap.define(d,{statics:{addNativeListener:function(u,t,r,s){if(u.addEventListener){u.addEventListener(t,r,!!s);}
else if(u.attachEvent){u.attachEvent(n+t,r);}
else if(typeof u[n+t]!=o){u[n+t]=r;}
else {{}
;}
;}
,removeNativeListener:function(y,x,v,w){if(y.removeEventListener){y.removeEventListener(x,v,!!w);}
else if(y.detachEvent){try{y.detachEvent(n+x,v);}
catch(e){if(e.number!==-2146828218){throw e;}
;}
;}
else if(typeof y[n+x]!=o){y[n+x]=null;}
else {{}
;}
;}
,getTarget:function(e){return e.target||e.srcElement;}
,getRelatedTarget:function(e){if(e.relatedTarget!==undefined){if((qx.core.Environment.get(b)==k)){try{e.relatedTarget&&e.relatedTarget.nodeType;}
catch(z){return null;}
;}
;return e.relatedTarget;}
else if(e.fromElement!==undefined&&e.type===h){return e.fromElement;}
else if(e.toElement!==undefined){return e.toElement;}
else {return null;}
;}
,supportsEvent:function(E,D){if(D.toLowerCase().indexOf(j)!=-1&&qx.core.Environment.get(b)===a&&qx.core.Environment.get(p)>9){return true;}
;if(E!=window&&D.toLowerCase().indexOf(j)!=-1){var C=qx.core.Environment.get(m);return (C&&C[q]==D);}
;var A=n+D.toLowerCase();var B=(A in E);if(!B){B=typeof E[A]==g;if(!B&&E.setAttribute){E.setAttribute(A,f);B=typeof E[A]==g;E.removeAttribute(A);}
;}
;return B;}
,getEventName:function(F,I){var G=[c].concat(qx.bom.Style.VENDOR_PREFIXES);for(var i=0,l=G.length;i<l;i++ ){var H=G[i].toLowerCase();if(qx.bom.Event.supportsEvent(F,H+I)){return H?H+qx.lang.String.firstUp(I):I;}
;}
;return null;}
}});}
)();
(function(){var a="qx.bom.client.CssTransition",b="E",c="transitionEnd",d="e",e="nd",f="transition",g="css.transition",h="Trans";qx.Bootstrap.define(a,{statics:{getTransitionName:function(){return qx.bom.Style.getPropertyName(f);}
,getSupport:function(){var name=qx.bom.client.CssTransition.getTransitionName();if(!name){return null;}
;var i=qx.bom.Event.getEventName(window,c);i=i==c?i.toLowerCase():i;if(!i){i=name+(name.indexOf(h)>0?b:d)+e;}
;return {name:name,"end-event":i};}
},defer:function(j){qx.core.Environment.add(g,j.getSupport);}
});}
)();
(function(){var a="qx.event.Emitter",b="*";qx.Bootstrap.define(a,{extend:Object,statics:{__bl:[]},members:{__bi:null,__bm:null,on:function(name,c,d){var e=qx.event.Emitter.__bl.length;this.__bn(name).push({listener:c,ctx:d,id:e});qx.event.Emitter.__bl.push({name:name,listener:c,ctx:d});return e;}
,once:function(name,f,g){var h=qx.event.Emitter.__bl.length;this.__bn(name).push({listener:f,ctx:g,once:true,id:h});qx.event.Emitter.__bl.push({name:name,listener:f,ctx:g});return h;}
,off:function(name,l,j){var k=this.__bn(name);for(var i=k.length-1;i>=0;i-- ){var m=k[i];if(m.listener==l&&m.ctx==j){k.splice(i,1);qx.event.Emitter.__bl[m.id]=null;return m.id;}
;}
;return null;}
,offById:function(o){var n=qx.event.Emitter.__bl[o];if(n){this.off(n.name,n.listener,n.ctx);}
;return null;}
,addListener:function(name,p,q){return this.on(name,p,q);}
,addListenerOnce:function(name,r,s){return this.once(name,r,s);}
,removeListener:function(name,t,u){this.off(name,t,u);}
,removeListenerById:function(v){this.offById(v);}
,emit:function(name,y){var x=this.__bn(name);for(var i=0;i<x.length;i++ ){var w=x[i];w.listener.call(w.ctx,y);if(w.once){x.splice(i,1);i-- ;}
;}
;x=this.__bn(b);for(var i=x.length-1;i>=0;i-- ){var w=x[i];w.listener.call(w.ctx,y);}
;}
,getListeners:function(){return this.__bi;}
,__bn:function(name){if(this.__bi==null){this.__bi={};}
;if(this.__bi[name]==null){this.__bi[name]=[];}
;return this.__bi[name];}
}});}
)();
(function(){var a="scrollLeft",b="qx.module.Manipulating",c="ease-in",d="scrollTop";qx.Bootstrap.define(b,{statics:{create:function(e,f){return qxWeb.$init(qx.bom.Html.clean([e],f),qxWeb);}
,clone:function(h){var g=[];for(var i=0;i<this.length;i++ ){if(this[i]&&this[i].nodeType===1){g[i]=this[i].cloneNode(true);}
;}
;if(h===true&&this.copyEventsTo){this.copyEventsTo(g);}
;return qxWeb(g);}
,append:function(n){var k=qx.bom.Html.clean([n]);var o=qxWeb.$init(k,qxWeb);this._forEachElement(function(p,q){for(var j=0,m=o.length;j<m;j++ ){if(q==0){qx.dom.Element.insertEnd(o[j],p);}
else {qx.dom.Element.insertEnd(o.eq(j).clone(true)[0],p);}
;}
;}
);return this;}
,appendTo:function(parent){parent=qx.module.Manipulating.__bo(parent);for(var i=0,l=parent.length;i<l;i++ ){this._forEachElement(function(r,j){if(i==0){qx.dom.Element.insertEnd(this[j],parent[i]);}
else {qx.dom.Element.insertEnd(this.eq(j).clone(true)[0],parent[i]);}
;}
);}
;return this;}
,insertBefore:function(s){s=qx.module.Manipulating.__bo(s);for(var i=0,l=s.length;i<l;i++ ){this._forEachElement(function(t,u){if(i==0){qx.dom.Element.insertBefore(t,s[i]);}
else {qx.dom.Element.insertBefore(this.eq(u).clone(true)[0],s[i]);}
;}
);}
;return this;}
,insertAfter:function(v){v=qx.module.Manipulating.__bo(v);for(var i=0,l=v.length;i<l;i++ ){for(var j=this.length-1;j>=0;j-- ){if(!this[j]||this[j].nodeType!==1){continue;}
;if(i==0){qx.dom.Element.insertAfter(this[j],v[i]);}
else {qx.dom.Element.insertAfter(this.eq(j).clone(true)[0],v[i]);}
;}
;}
;return this;}
,__bo:function(x){if(!qx.lang.Type.isArray(x)){var w=qxWeb(x);x=w.length>0?w:[x];}
;return x.filter(function(y){return (y&&y.nodeType===1);}
);}
,wrap:function(z){z=qx.module.Manipulating.__bp(z);if(z.length==0){return this;}
;this._forEachElement(function(A){var B=z.eq(0).clone(true);qx.dom.Element.insertAfter(B[0],A);var C=qx.module.Manipulating.__bq(B[0]);qx.dom.Element.insertEnd(A,C);}
);return this;}
,__bp:function(F){var D;if(qx.lang.Type.isArray(F)){D=qxWeb(F);}
else {var E=qx.bom.Html.clean([F]);if(E.length>0&&qx.dom.Node.isElement(E[0])){D=qxWeb(E);}
else {D=qxWeb(F);}
;}
;return D;}
,__bq:function(G){if(G.childNodes.length==0){return G;}
;for(var i=0,l=G.childNodes.length;i<l;i++ ){if(G.childNodes[i].nodeType===1){return this.__bq(G.childNodes[i]);}
;}
;return G;}
,remove:function(){this._forEachElement(function(H){qx.dom.Element.remove(H);}
);return this;}
,empty:function(){this._forEachElement(function(I){while(I.firstChild){I.removeChild(I.firstChild);}
;}
);return this;}
,before:function(content){if(!qx.lang.Type.isArray(content)){content=[content];}
;var J=document.createDocumentFragment();qx.bom.Html.clean(content,document,J);this._forEachElement(function(M,K){var L=qx.lang.Array.cast(J.childNodes,Array);for(var i=0,l=L.length;i<l;i++ ){var N;if(K<this.length-1){N=L[i].cloneNode(true);}
else {N=L[i];}
;M.parentNode.insertBefore(N,M);}
;}
,this);return this;}
,after:function(content){if(!qx.lang.Type.isArray(content)){content=[content];}
;var O=document.createDocumentFragment();qx.bom.Html.clean(content,document,O);this._forEachElement(function(S,P){var R=qx.lang.Array.cast(O.childNodes,Array);for(var i=R.length-1;i>=0;i-- ){var Q;if(P<this.length-1){Q=R[i].cloneNode(true);}
else {Q=R[i];}
;S.parentNode.insertBefore(Q,S.nextSibling);}
;}
,this);return this;}
,getScrollLeft:function(){var T=this[0];if(!T){return null;}
;var Node=qx.dom.Node;if(Node.isWindow(T)||Node.isDocument(T)){return qx.bom.Viewport.getScrollLeft();}
;return T.scrollLeft;}
,getScrollTop:function(){var U=this[0];if(!U){return null;}
;var Node=qx.dom.Node;if(Node.isWindow(U)||Node.isDocument(U)){return qx.bom.Viewport.getScrollTop();}
;return U.scrollTop;}
,_animationDescription:{scrollLeft:{duration:700,timing:c,keep:100,keyFrames:{'0':{},'100':{scrollLeft:1}}},scrollTop:{duration:700,timing:c,keep:100,keyFrames:{'0':{},'100':{scrollTop:1}}}},__br:function(W,X,V){var Y=qx.lang.Object.clone(qx.module.Manipulating._animationDescription[W],true);Y.keyFrames[100][W]=X;return this.animate(Y,V);}
,setScrollLeft:function(bb,bc){var Node=qx.dom.Node;if(bc&&qx.bom.element&&qx.bom.element.AnimationJs){qx.module.Manipulating.__br.bind(this,a,bb,bc)();}
;for(var i=0,l=this.length,ba;i<l;i++ ){ba=this[i];if(Node.isElement(ba)){if(!(bc&&qx.bom.element&&qx.bom.element.AnimationJs)){ba.scrollLeft=bb;}
;}
else if(Node.isWindow(ba)){ba.scrollTo(bb,this.getScrollTop(ba));}
else if(Node.isDocument(ba)){Node.getWindow(ba).scrollTo(bb,this.getScrollTop(ba));}
;}
;return this;}
,setScrollTop:function(be,bf){var Node=qx.dom.Node;if(bf&&qx.bom.element&&qx.bom.element.AnimationJs){qx.module.Manipulating.__br.bind(this,d,be,bf)();}
;for(var i=0,l=this.length,bd;i<l;i++ ){bd=this[i];if(Node.isElement(bd)){if(!(bf&&qx.bom.element&&qx.bom.element.AnimationJs)){bd.scrollTop=be;}
;}
else if(Node.isWindow(bd)){bd.scrollTo(this.getScrollLeft(bd),be);}
else if(Node.isDocument(bd)){Node.getWindow(bd).scrollTo(this.getScrollLeft(bd),be);}
;}
;return this;}
,focus:function(){try{this[0].focus();}
catch(bg){}
;return this;}
,blur:function(){this.forEach(function(bh,bi){try{bh.blur();}
catch(bj){}
;}
);return this;}
},defer:function(bk){qxWeb.$attachStatic({"create":bk.create});qxWeb.$attach({"append":bk.append,"appendTo":bk.appendTo,"remove":bk.remove,"empty":bk.empty,"before":bk.before,"insertBefore":bk.insertBefore,"after":bk.after,"insertAfter":bk.insertAfter,"wrap":bk.wrap,"clone":bk.clone,"getScrollLeft":bk.getScrollLeft,"setScrollLeft":bk.setScrollLeft,"getScrollTop":bk.getScrollTop,"setScrollTop":bk.setScrollTop,"focus":bk.focus,"blur":bk.blur});}
});}
)();
(function(){var a="qx.module.Core";qx.Bootstrap.define(a,{});}
)();
(function(){var a="function",b="*",c="getRelatedTarget",d="getType",e="qx.module.event.Native",f="preventDefault",g="getTarget",h="stopPropagation";qx.Bootstrap.define(e,{statics:{TYPES:[b],FORWARD_METHODS:[g,c],BIND_METHODS:[f,h,d],preventDefault:function(){try{this.keyCode=0;}
catch(j){}
;this.returnValue=false;}
,stopPropagation:function(){this.cancelBubble=true;}
,getType:function(){return this._type||this.type;}
,getTarget:function(){}
,getRelatedTarget:function(){}
,getCurrentTarget:function(){}
,normalize:function(event,n){if(!event){return event;}
;var m=qx.module.event.Native.FORWARD_METHODS;for(var i=0,l=m.length;i<l;i++ ){event[m[i]]=qx.bom.Event[m[i]].bind(null,event);}
;var k=qx.module.event.Native.BIND_METHODS;for(var i=0,l=k.length;i<l;i++ ){if(typeof event[k[i]]!=a){event[k[i]]=qx.module.event.Native[k[i]].bind(event);}
;}
;event.getCurrentTarget=function(){return event.currentTarget||n;}
;return event;}
},defer:function(o){qxWeb.$registerEventNormalization(o.TYPES,o.normalize);}
});}
)();
(function(){var a="text",b="engine.name",c="password",d="keypress",e="mshtml",f="textarea",g="function",h="input",j="gecko",k="getKeyIdentifier",m="Backspace",n="keydown",o="qx.module.event.Keyboard",p="keyup",q="browser.documentmode";qx.Bootstrap.define(o,{statics:{TYPES:[n,d,p],BIND_METHODS:[k],getKeyIdentifier:function(){if(this.type==d&&(qxWeb.env.get(b)!=j||this.charCode!==0)){return qx.event.util.Keyboard.charCodeToIdentifier(this.charCode||this.keyCode);}
;return qx.event.util.Keyboard.keyCodeToIdentifier(this.keyCode);}
,normalize:function(event,s){if(!event){return event;}
;var r=qx.module.event.Keyboard.BIND_METHODS;for(var i=0,l=r.length;i<l;i++ ){if(typeof event[r[i]]!=g){event[r[i]]=qx.module.event.Keyboard[r[i]].bind(event);}
;}
;return event;}
,registerInputFix:function(t){if(t.type===a||t.type===c||t.type===f){if(!t.__bs){t.__bs=qxWeb(t).on(p,qx.module.event.Keyboard._inputFix);}
;}
;}
,unregisterInputFix:function(u){if(u.__bs&&!qxWeb(u).hasListener(h)){qxWeb(u).off(p,qx.module.event.Keyboard._inputFix);u.__bs=null;}
;}
,_inputFix:function(v){if(v.getKeyIdentifier()!==m){return;}
;var w=v.getTarget();var x=qxWeb(w).getValue();if(!w.__bt||w.__bt!==x){w.__bt=x;v.type=v._type=h;w.__emitter.emit(h,v);}
;}
},defer:function(y){qxWeb.$registerEventNormalization(qx.module.event.Keyboard.TYPES,y.normalize);if(qxWeb.env.get(b)===e&&qxWeb.env.get(q)===9){qxWeb.$registerEventHook(h,y.registerInputFix,y.unregisterInputFix);}
;}
});}
)();
(function(){var a="-",b="PageUp",c="Escape",d="Enter",e="+",f="PrintScreen",g="os.name",h="7",i="A",j="Space",k="Left",l="5",m="F5",n="Down",o="Up",p="3",q="Meta",r="F11",s="0",t="F6",u="PageDown",v="osx",w="CapsLock",x="Insert",y="F8",z="Scroll",A="Control",B="Tab",C="Shift",D="End",E="Pause",F="Unidentified",G="/",H="8",I="Z",J="*",K="cmd",L="F1",M="F4",N="Home",O="qx.event.util.Keyboard",P="F2",Q="6",R="F7",S="Apps",T="4",U="F12",V="Alt",W="2",X="NumLock",Y="Delete",bn="1",bo="Win",bp="Backspace",bj="F9",bk="F10",bl="Right",bm="F3",bq="9",br=",";qx.Bootstrap.define(O,{statics:{specialCharCodeMap:{'8':bp,'9':B,'13':d,'27':c,'32':j},numpadToCharCode:{'96':s.charCodeAt(0),'97':bn.charCodeAt(0),'98':W.charCodeAt(0),'99':p.charCodeAt(0),'100':T.charCodeAt(0),'101':l.charCodeAt(0),'102':Q.charCodeAt(0),'103':h.charCodeAt(0),'104':H.charCodeAt(0),'105':bq.charCodeAt(0),'106':J.charCodeAt(0),'107':e.charCodeAt(0),'109':a.charCodeAt(0),'110':br.charCodeAt(0),'111':G.charCodeAt(0)},keyCodeToIdentifierMap:{'16':C,'17':A,'18':V,'20':w,'224':q,'37':k,'38':o,'39':bl,'40':n,'33':b,'34':u,'35':D,'36':N,'45':x,'46':Y,'112':L,'113':P,'114':bm,'115':M,'116':m,'117':t,'118':R,'119':y,'120':bj,'121':bk,'122':r,'123':U,'144':X,'44':f,'145':z,'19':E,'91':qx.core.Environment.get(g)==v?K:bo,'92':bo,'93':qx.core.Environment.get(g)==v?K:S},charCodeA:i.charCodeAt(0),charCodeZ:I.charCodeAt(0),charCode0:s.charCodeAt(0),charCode9:bq.charCodeAt(0),keyCodeToIdentifier:function(bs){if(this.isIdentifiableKeyCode(bs)){var bt=this.numpadToCharCode[bs];if(bt){return String.fromCharCode(bt);}
;return (this.keyCodeToIdentifierMap[bs]||this.specialCharCodeMap[bs]||String.fromCharCode(bs));}
else {return F;}
;}
,charCodeToIdentifier:function(bu){return this.specialCharCodeMap[bu]||String.fromCharCode(bu).toUpperCase();}
,isIdentifiableKeyCode:function(bv){if(bv>=this.charCodeA&&bv<=this.charCodeZ){return true;}
;if(bv>=this.charCode0&&bv<=this.charCode9){return true;}
;if(this.specialCharCodeMap[bv]){return true;}
;if(this.numpadToCharCode[bv]){return true;}
;if(this.isNonPrintableKeyCode(bv)){return true;}
;return false;}
,isNonPrintableKeyCode:function(bw){return this.keyCodeToIdentifierMap[bw]?true:false;}
},defer:function(bx,by){if(!bx.identifierToKeyCodeMap){bx.identifierToKeyCodeMap={};for(var bz in bx.keyCodeToIdentifierMap){bx.identifierToKeyCodeMap[bx.keyCodeToIdentifierMap[bz]]=parseInt(bz,10);}
;for(var bz in bx.specialCharCodeMap){bx.identifierToKeyCodeMap[bx.specialCharCodeMap[bz]]=parseInt(bz,10);}
;}
;}
});}
)();
(function(){var a="function",b="getButton",c="mousedown",d="getScreenLeft",e="ie",f="mouseout",g="browser.name",h="dblclick",j="qx.module.event.Mouse",k="mousemove",m="middle",n="browser.documentmode",o="mouseover",p="mouseup",q="getDocumentLeft",r="getViewportLeft",s="right",t="click",u="getViewportTop",v="none",w="contextmenu",x="getScreenTop",y="left",z="getDocumentTop";qx.Bootstrap.define(j,{statics:{TYPES:[t,h,c,p,o,k,f],BIND_METHODS:[b,r,u,q,z,d,x],BUTTONS_DOM2:{'0':y,'2':s,'1':m},BUTTONS_MSHTML:{'1':y,'2':s,'4':m},getButton:function(){switch(this.type){case w:return s;case t:if(qxWeb.env.get(g)===e&&qxWeb.env.get(n)<9){return y;}
;default:if(this.target!==undefined){return qx.module.event.Mouse.BUTTONS_DOM2[this.button]||v;}
else {return qx.module.event.Mouse.BUTTONS_MSHTML[this.button]||v;}
;};}
,getViewportLeft:function(){return this.clientX;}
,getViewportTop:function(){return this.clientY;}
,getDocumentLeft:function(){if(this.pageX!==undefined){return this.pageX;}
else {var A=qx.dom.Node.getWindow(this.srcElement);return this.clientX+qx.bom.Viewport.getScrollLeft(A);}
;}
,getDocumentTop:function(){if(this.pageY!==undefined){return this.pageY;}
else {var B=qx.dom.Node.getWindow(this.srcElement);return this.clientY+qx.bom.Viewport.getScrollTop(B);}
;}
,getScreenLeft:function(){return this.screenX;}
,getScreenTop:function(){return this.screenY;}
,normalize:function(event,D){if(!event){return event;}
;var C=qx.module.event.Mouse.BIND_METHODS;for(var i=0,l=C.length;i<l;i++ ){if(typeof event[C[i]]!=a){event[C[i]]=qx.module.event.Mouse[C[i]].bind(event);}
;}
;return event;}
},defer:function(E){qxWeb.$registerEventNormalization(qx.module.event.Mouse.TYPES,E.normalize);}
});}
)();
(function(){var a="text",b="<label>",c="font-size",d="px",e="css.placeholder",f="font-variant",g="inline",h="css.pointerevents",j="auto",k="cursor",l="font-family",m="padding-right",n="text-align",o="placeholder",p="padding-left",q="font-weight",r="#989898",s="$qx_placeholder",t="",u="INPUT",v="TEXTAREA",w="keyup",x="display",y="click",z="padding-top",A="none",B="z-index",C="qx.module.Placeholder",D="tagName",E="hidden",F="padding-bottom",G="absolute",H="font-style",I="input[placeholder], textarea[placeholder]";qx.Bootstrap.define(C,{statics:{PLACEHOLDER_NAME:s,update:function(){if(!qxWeb.env.get(e)){qxWeb(I).updatePlaceholder();}
;}
,updatePlaceholder:function(){if(!qxWeb.env.get(e)){for(var i=0;i<this.length;i++ ){var L=qxWeb(this[i]);var O=L.getAttribute(o);var N=L.getProperty(D);if(!O||(N!=v&&N!=u)){continue;}
;var J=L.getProperty(qx.module.Placeholder.PLACEHOLDER_NAME);if(!J){J=qx.module.Placeholder.__bv(L);}
;var K=L.isRendered();var M=J.isRendered();if(K&&!M){L.before(J);}
else if(!K&&M){J.remove();return this;}
;qx.module.Placeholder.__bu(L);}
;}
;return this;}
,__bu:function(T){var U=T.getAttribute(o);var Q=T.getProperty(qx.module.Placeholder.PLACEHOLDER_NAME);var S=T.getStyle(B);var P=parseInt(T.getStyle(p))+2*parseInt(T.getStyle(m));var R=parseInt(T.getStyle(z))+2*parseInt(T.getStyle(F));Q.setHtml(U).setStyles({display:T.getValue()==t?g:A,zIndex:S==j?1:S+1,textAlign:T.getStyle(n),width:(T.getWidth()-P-4)+d,height:(T.getHeight()-R-4)+d,left:T.getOffset().left+d,top:T.getOffset().top+d,fontFamily:T.getStyle(l),fontStyle:T.getStyle(H),fontVariant:T.getStyle(f),fontWeight:T.getStyle(q),fontSize:T.getStyle(c),paddingTop:(parseInt(T.getStyle(z))+2)+d,paddingRight:(parseInt(T.getStyle(m))+2)+d,paddingBottom:(parseInt(T.getStyle(F))+2)+d,paddingLeft:(parseInt(T.getStyle(p))+2)+d});}
,__bv:function(V){var W=qxWeb.create(b).setStyles({position:G,color:r,overflow:E,pointerEvents:A});V.setProperty(qx.module.Placeholder.PLACEHOLDER_NAME,W);V.on(w,function(X){var Y=X.getProperty(qx.module.Placeholder.PLACEHOLDER_NAME);Y.setStyle(x,X.getValue()==t?g:A);}
.bind(this,V));if(!qxWeb.env.get(h)){W.setStyle(k,a).on(y,function(ba){ba.focus();}
.bind(this,V));}
;return W;}
},defer:function(bb){qxWeb.$attachStatic({"placeholder":{update:bb.update}});qxWeb.$attach({"updatePlaceholder":bb.updatePlaceholder});}
});}
)();
(function(){var a="align-start",b="align-end",c="qx.util.placement.AbstractAxis",d="edge-start",e="align-center",f="abstract method call!",g="edge-end";qx.Bootstrap.define(c,{extend:Object,statics:{computeStart:function(j,k,l,h,i){throw new Error(f);}
,_moveToEdgeAndAlign:function(n,o,p,m){switch(m){case d:return o.start-p.end-n;case g:return o.end+p.start;case a:return o.start+p.start;case e:return o.start+parseInt((o.end-o.start-n)/2,10)+p.start;case b:return o.end-p.end-n;};}
,_isInRange:function(r,s,q){return r>=0&&r+s<=q;}
}});}
)();
(function(){var a="qx.util.placement.DirectAxis";qx.Bootstrap.define(a,{statics:{_moveToEdgeAndAlign:qx.util.placement.AbstractAxis._moveToEdgeAndAlign,computeStart:function(d,e,f,b,c){return this._moveToEdgeAndAlign(d,e,f,c);}
}});}
)();
(function(){var a="qx.util.placement.KeepAlignAxis",b="edge-start",c="edge-end";qx.Bootstrap.define(a,{statics:{_moveToEdgeAndAlign:qx.util.placement.AbstractAxis._moveToEdgeAndAlign,_isInRange:qx.util.placement.AbstractAxis._isInRange,computeStart:function(k,f,g,d,j){var i=this._moveToEdgeAndAlign(k,f,g,j);var e,h;if(this._isInRange(i,k,d)){return i;}
;if(j==b||j==c){e=f.start-g.end;h=f.end+g.start;}
else {e=f.end-g.end;h=f.start+g.start;}
;if(e>d-h){i=e-k;}
else {i=h;}
;return i;}
}});}
)();
(function(){var a="qx.util.placement.BestFitAxis";qx.Bootstrap.define(a,{statics:{_isInRange:qx.util.placement.AbstractAxis._isInRange,_moveToEdgeAndAlign:qx.util.placement.AbstractAxis._moveToEdgeAndAlign,computeStart:function(g,c,d,b,f){var e=this._moveToEdgeAndAlign(g,c,d,f);if(this._isInRange(e,g,b)){return e;}
;if(e<0){e=Math.min(0,b-g);}
;if(e+g>b){e=Math.max(0,b-g);}
;return e;}
}});}
)();
(function(){var a="-",b="best-fit",c="px",d="align-end",e="bottom",f="static",g="border-left-width",h="keep-align",i="center",j="direct",k="relative",l="middle",m="align-start",n="qx.module.Placement",o="border-top-width",p="edge-start",q="top",r="right",s="edge-end",t="block",u="position",v="align-center",w="hidden",x="left",y="absolute";qxWeb.define(n,{statics:{placeTo:function(P,U,I,J,K){if(!this[0]||!P){return this;}
;P=qxWeb(P);var A=this.isRendered();var z=null;var O=null;if(!A){z=this[0].style.display;O=this[0].style.visibility;this.setStyles({position:y,visibility:w,display:t});}
;var F={x:qx.module.Placement._getAxis(J),y:qx.module.Placement._getAxis(K)};var D={width:this.getWidth(),height:this.getHeight()};var parent=this.getParents();var E={width:parent.getWidth(),height:parent.getHeight()};I=I||{top:0,right:0,bottom:0,left:0};var H=U.split(a);var R=H[0];var Q=H[1];var T={x:qx.module.Placement._getPositionX(R,Q),y:qx.module.Placement._getPositionY(R,Q)};var M;var C=parent.getStyle(u);if(C==k||C==f){M=P.getOffset();}
else {var S=P.getPosition();M={top:S.top,bottom:S.top+P.getHeight(),left:S.left,right:S.left+P.getWidth()};}
;var G=qx.module.Placement._computePlacement(F,D,E,M,I,T);while(parent.length>0){if(parent.getStyle(u)==k){var L=parent.getOffset();var N=parseInt(parent.getStyle(o))||0;var B=parseInt(parent.getStyle(g))||0;G.left-=(L.left+B);G.top-=(L.top+N);parent=[];}
else {parent=parent.getParents();}
;}
;if(!A){this[0].style.display=z;this[0].style.visibility=O;}
;this.setStyles({position:y,left:G.left+c,top:G.top+c});return this;}
,_getAxis:function(V){switch(V){case h:return qx.util.placement.KeepAlignAxis;case b:return qx.util.placement.BestFitAxis;case j:default:return qx.util.placement.DirectAxis;};}
,_computePlacement:function(Y,bc,ba,W,X,bb){var bd=Y.x.computeStart(bc.width,{start:W.left,end:W.right},{start:X.left,end:X.right},ba.width,bb.x);var top=Y.y.computeStart(bc.height,{start:W.top,end:W.bottom},{start:X.top,end:X.bottom},ba.height,bb.y);return {left:bd,top:top};}
,_getPositionX:function(bf,be){if(bf==x){return p;}
else if(bf==r){return s;}
else if(be==x){return m;}
else if(be==i){return v;}
else if(be==r){return d;}
;}
,_getPositionY:function(bh,bg){if(bh==q){return p;}
else if(bh==e){return s;}
else if(bg==q){return m;}
else if(bg==l){return v;}
else if(bg==e){return d;}
;}
},defer:function(bi){qxWeb.$attach({"placeTo":bi.placeTo});}
});}
)();
(function(){var a="span",b="qx.module.Template";qx.Bootstrap.define(b,{statics:{get:function(e,f,d){var c=qx.bom.Template.get(e,f,d);c=qx.module.Template.__bw(c);return qxWeb.$init([c],qxWeb);}
,render:function(h,i,g){return qx.bom.Template.render(h,i,g);}
,renderToNode:function(l,m,k){var j=qx.bom.Template.renderToNode(l,m,k);j=qx.module.Template.__bw(j);return qxWeb.$init([j],qxWeb);}
,__bw:function(n){if(qxWeb.isTextNode(n)){var o=document.createElement(a);o.appendChild(n);n=o;}
;return n;}
},defer:function(p){qxWeb.$attachStatic({"template":{get:p.get,render:p.render,renderToNode:p.renderToNode}});}
});}
)();
(function(){var a="function",b=': ',c="&gt;",d='',e='&#39;',f='Unclosed tag at ',g='object',h="div",k='function',l='^',m='.',n="qx.bom.Template",o="&amp;",p='text',q='Invalid tags: ',r='Unopened section "',t="0.7.3",u='>',v="",w='\\s*',x="{{",y='{',z='" at ',A='name',B='[object Array]',C='&#x2F;',D='\n',E='&',F="mustache.js",G="&lt;",H=', ',I='#',J='string',K='=',L='/',M="\\s*",N='Unclosed section "',O="}}",P='&quot;',Q="\\$&",R='Invalid tags at ',S='}',T="object";qx.Bootstrap.define(n,{statics:{version:null,render:null,renderToNode:function(W,X,U){var V=this.render(W,X,U);return this._createNodeFromTemplate(V);}
,get:function(ba,bc,Y){var bb=document.getElementById(ba);return this.renderToNode(bb.innerHTML,bc,Y);}
,_createNodeFromTemplate:function(bd){if(bd.search(/<|>/)===-1){return document.createTextNode(bd);}
;var be=qx.dom.Element.create(h);be.innerHTML=bd;return be.children[0];}
}});(function(){(function(bf,bg){if(typeof exports===T&&exports){bg(exports);}
else {var bh={};bg(bh);if(typeof define===a&&define.amd){define(bh);}
else {bf.Mustache=bh;}
;}
;}
(this,function(bE){var bp=/\s*/;var bG=/\s+/;var bn=/\S/;var bF=/\s*=/;var by=/\s*\}/;var bu=/#|\^|\/|>|\{|&|=|!/;var bt=RegExp.prototype.test;function bv(bH,bI){return bt.call(bH,bI);}
;function br(bJ){return !bv(bn,bJ);}
;var bw=Object.prototype.toString;var bs=Array.isArray||function(bK){return bw.call(bK)===B;}
;function bo(bL){return typeof bL===k;}
;function bB(bM){return bM.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,Q);}
;var bx={"&":o,"<":G,">":c,'"':P,"'":e,"/":C};function bi(bN){return String(bN).replace(/[&<>"'\/]/g,function(s){return bx[s];}
);}
;function bC(bO){this.string=bO;this.tail=bO;this.pos=0;}
;bC.prototype.eos=function(){return this.tail===v;}
;bC.prototype.scan=function(bP){var bR=this.tail.match(bP);if(bR&&bR.index===0){var bQ=bR[0];this.tail=this.tail.substring(bQ.length);this.pos+=bQ.length;return bQ;}
;return v;}
;bC.prototype.scanUntil=function(bS){var bU=this.tail.search(bS),bT;switch(bU){case -1:bT=this.tail;this.tail=v;break;case 0:bT=v;break;default:bT=this.tail.substring(0,bU);this.tail=this.tail.substring(bU);};this.pos+=bT.length;return bT;}
;function bz(bV,parent){this.view=bV==null?{}:bV;this.parent=parent;this._cache={'.':this.view};}
;bz.make=function(bW){return (bW instanceof bz)?bW:new bz(bW);}
;bz.prototype.push=function(bX){return new bz(bX,this);}
;bz.prototype.lookup=function(name){var ca;if(name in this._cache){ca=this._cache[name];}
else {var bY=this;while(bY){if(name.indexOf(m)>0){ca=bY.view;var cb=name.split(m),i=0;while(ca!=null&&i<cb.length){ca=ca[cb[i++ ]];}
;}
else {ca=bY.view[name];}
;if(ca!=null)break;bY=bY.parent;}
;this._cache[name]=ca;}
;if(bo(ca)){ca=ca.call(this.view);}
;return ca;}
;function bl(){this.clearCache();}
;bl.prototype.clearCache=function(){this._cache={};this._partialCache={};}
;bl.prototype.compile=function(cd,cf){var ce=this._cache[cd];if(!ce){var cc=bE.parse(cd,cf);ce=this._cache[cd]=this.compileTokens(cc,cd);}
;return ce;}
;bl.prototype.compilePartial=function(name,ci,cg){var ch=this.compile(ci,cg);this._partialCache[name]=ch;return ch;}
;bl.prototype.getPartial=function(name){if(!(name in this._partialCache)&&this._loadPartial){this.compilePartial(name,this._loadPartial(name));}
;return this._partialCache[name];}
;bl.prototype.compileTokens=function(cj,ck){var self=this;return function(cm,cl){if(cl){if(bo(cl)){self._loadPartial=cl;}
else {for(var name in cl){self.compilePartial(name,cl[name]);}
;}
;}
;return bq(cj,self,bz.make(cm),ck);}
;}
;bl.prototype.render=function(co,cp,cn){return this.compile(co)(cp,cn);}
;function bq(cx,cq,cB,cs){var ct=d;function cv(cC){return cq.render(cC,cB);}
;var cy,cr,cw;for(var i=0,cA=cx.length;i<cA; ++i){cy=cx[i];cr=cy[1];switch(cy[0]){case I:cw=cB.lookup(cr);if(typeof cw===g||typeof cw===J){if(bs(cw)){for(var j=0,cz=cw.length;j<cz; ++j){ct+=bq(cy[4],cq,cB.push(cw[j]),cs);}
;}
else if(cw){ct+=bq(cy[4],cq,cB.push(cw),cs);}
;}
else if(bo(cw)){var cu=cs==null?null:cs.slice(cy[3],cy[5]);cw=cw.call(cB.view,cu,cv);if(cw!=null)ct+=cw;}
else if(cw){ct+=bq(cy[4],cq,cB,cs);}
;break;case l:cw=cB.lookup(cr);if(!cw||(bs(cw)&&cw.length===0)){ct+=bq(cy[4],cq,cB,cs);}
;break;case u:cw=cq.getPartial(cr);if(bo(cw))ct+=cw(cB);break;case E:cw=cB.lookup(cr);if(cw!=null)ct+=cw;break;case A:cw=cB.lookup(cr);if(cw!=null)ct+=bE.escape(cw);break;case p:ct+=cr;break;};}
;return ct;}
;function bm(cH){var cF=[];var cD=cF;var cJ=[];var cI;for(var i=0,cG=cH.length;i<cG; ++i){cI=cH[i];switch(cI[0]){case I:case l:cJ.push(cI);cD.push(cI);cD=cI[4]=[];break;case L:var cE=cJ.pop();cE[5]=cI[2];cD=cJ.length>0?cJ[cJ.length-1][4]:cF;break;default:cD.push(cI);};}
;return cF;}
;function bk(cM){var cK=[];var cN,cO;for(var i=0,cL=cM.length;i<cL; ++i){cN=cM[i];if(cN){if(cN[0]===p&&cO&&cO[0]===p){cO[1]+=cN[1];cO[3]=cN[3];}
else {cO=cN;cK.push(cN);}
;}
;}
;return cK;}
;function bD(cP){return [new RegExp(bB(cP[0])+M),new RegExp(M+bB(cP[1]))];}
;function bj(de,cT){de=de||d;cT=cT||bE.tags;if(typeof cT===J)cT=cT.split(bG);if(cT.length!==2)throw new Error(q+cT.join(H));var dg=bD(cT);var cR=new bC(de);var cQ=[];var cY=[];var dc=[];var cS=false;var cW=false;function cV(){if(cS&&!cW){while(dc.length){delete cY[dc.pop()];}
;}
else {dc=[];}
;cS=false;cW=false;}
;var da,cU,dd,db,dh,cX;while(!cR.eos()){da=cR.pos;dd=cR.scanUntil(dg[0]);if(dd){for(var i=0,df=dd.length;i<df; ++i){db=dd.charAt(i);if(br(db)){dc.push(cY.length);}
else {cW=true;}
;cY.push([p,db,da,da+1]);da+=1;if(db==D)cV();}
;}
;if(!cR.scan(dg[0]))break;cS=true;cU=cR.scan(bu)||A;cR.scan(bp);if(cU===K){dd=cR.scanUntil(bF);cR.scan(bF);cR.scanUntil(dg[1]);}
else if(cU===y){dd=cR.scanUntil(new RegExp(w+bB(S+cT[1])));cR.scan(by);cR.scanUntil(dg[1]);cU=E;}
else {dd=cR.scanUntil(dg[1]);}
;if(!cR.scan(dg[1]))throw new Error(f+cR.pos);dh=[cU,dd,da,cR.pos];cY.push(dh);if(cU===I||cU===l){cQ.push(dh);}
else if(cU===L){cX=cQ.pop();if(!cX){throw new Error(r+dd+z+da);}
;if(cX[1]!==dd){throw new Error(N+cX[1]+z+da);}
;}
else if(cU===A||cU===y||cU===E){cW=true;}
else if(cU===K){cT=dd.split(bG);if(cT.length!==2){throw new Error(R+da+b+cT.join(H));}
;dg=bD(cT);}
;}
;cX=cQ.pop();if(cX){throw new Error(N+cX[1]+z+cR.pos);}
;return bm(bk(cY));}
;bE.name=F;bE.version=t;bE.tags=[x,O];bE.Scanner=bC;bE.Context=bz;bE.Writer=bl;bE.parse=bj;bE.escape=bi;var bA=new bl();bE.clearCache=function(){return bA.clearCache();}
;bE.compile=function(di,dj){return bA.compile(di,dj);}
;bE.compilePartial=function(name,dk,dl){return bA.compilePartial(name,dk,dl);}
;bE.compileTokens=function(dm,dn){return bA.compileTokens(dm,dn);}
;bE.render=function(dq,dr,dp){return bA.render(dq,dr,dp);}
;bE.to_html=function(dw,dt,ds,dv){var du=bE.render(dw,dt,ds);if(bo(dv)){dv(du);}
else {return du;}
;}
;}
));qx.bom.Template.version=this.Mustache.version;qx.bom.Template.render=this.Mustache.render;}
).call({});}
)();
(function(){var a="qx.module.util.Array";qx.Bootstrap.define(a,{statics:{cast:qx.lang.Array.cast,equals:qx.lang.Array.equals,exclude:qx.lang.Array.exclude,fromArguments:qx.lang.Array.fromArguments,insertAfter:qx.lang.Array.insertAfter,insertBefore:qx.lang.Array.insertBefore,max:qx.lang.Array.max,min:qx.lang.Array.min,remove:qx.lang.Array.remove,removeAll:qx.lang.Array.removeAll,unique:qx.lang.Array.unique},defer:function(b){qxWeb.$attachStatic({array:{cast:b.cast,equals:b.equals,exclude:b.exclude,fromArguments:b.fromArguments,insertAfter:b.insertAfter,insertBefore:b.insertBefore,max:b.max,min:b.min,remove:b.remove,removeAll:b.removeAll,unique:b.unique}});}
});}
)();
(function(){var a="qx.core.ObjectRegistry",b="-",c="-0",d="";qx.Bootstrap.define(a,{statics:{__bx:0,__by:[],__bz:d,toHashCode:function(e){{}
;var g=e.$$hash;if(g!=null){return g;}
;var f=this.__by;if(f.length>0){g=f.pop();}
else {g=(this.__bx++ )+this.__bz;}
;return e.$$hash=g;}
},defer:function(h){if(window&&window.top){var frames=window.top.frames;for(var i=0;i<frames.length;i++ ){if(frames[i]===window){h.__bz=b+(i+1);return;}
;}
;}
;h.__bz=c;}
});}
)();
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
(function(){var a="qx.bom.String";qx.Bootstrap.define(a,{statics:{TO_CHARCODE:{"quot":34,"amp":38,"lt":60,"gt":62,"nbsp":160,"iexcl":161,"cent":162,"pound":163,"curren":164,"yen":165,"brvbar":166,"sect":167,"uml":168,"copy":169,"ordf":170,"laquo":171,"not":172,"shy":173,"reg":174,"macr":175,"deg":176,"plusmn":177,"sup2":178,"sup3":179,"acute":180,"micro":181,"para":182,"middot":183,"cedil":184,"sup1":185,"ordm":186,"raquo":187,"frac14":188,"frac12":189,"frac34":190,"iquest":191,"Agrave":192,"Aacute":193,"Acirc":194,"Atilde":195,"Auml":196,"Aring":197,"AElig":198,"Ccedil":199,"Egrave":200,"Eacute":201,"Ecirc":202,"Euml":203,"Igrave":204,"Iacute":205,"Icirc":206,"Iuml":207,"ETH":208,"Ntilde":209,"Ograve":210,"Oacute":211,"Ocirc":212,"Otilde":213,"Ouml":214,"times":215,"Oslash":216,"Ugrave":217,"Uacute":218,"Ucirc":219,"Uuml":220,"Yacute":221,"THORN":222,"szlig":223,"agrave":224,"aacute":225,"acirc":226,"atilde":227,"auml":228,"aring":229,"aelig":230,"ccedil":231,"egrave":232,"eacute":233,"ecirc":234,"euml":235,"igrave":236,"iacute":237,"icirc":238,"iuml":239,"eth":240,"ntilde":241,"ograve":242,"oacute":243,"ocirc":244,"otilde":245,"ouml":246,"divide":247,"oslash":248,"ugrave":249,"uacute":250,"ucirc":251,"uuml":252,"yacute":253,"thorn":254,"yuml":255,"fnof":402,"Alpha":913,"Beta":914,"Gamma":915,"Delta":916,"Epsilon":917,"Zeta":918,"Eta":919,"Theta":920,"Iota":921,"Kappa":922,"Lambda":923,"Mu":924,"Nu":925,"Xi":926,"Omicron":927,"Pi":928,"Rho":929,"Sigma":931,"Tau":932,"Upsilon":933,"Phi":934,"Chi":935,"Psi":936,"Omega":937,"alpha":945,"beta":946,"gamma":947,"delta":948,"epsilon":949,"zeta":950,"eta":951,"theta":952,"iota":953,"kappa":954,"lambda":955,"mu":956,"nu":957,"xi":958,"omicron":959,"pi":960,"rho":961,"sigmaf":962,"sigma":963,"tau":964,"upsilon":965,"phi":966,"chi":967,"psi":968,"omega":969,"thetasym":977,"upsih":978,"piv":982,"bull":8226,"hellip":8230,"prime":8242,"Prime":8243,"oline":8254,"frasl":8260,"weierp":8472,"image":8465,"real":8476,"trade":8482,"alefsym":8501,"larr":8592,"uarr":8593,"rarr":8594,"darr":8595,"harr":8596,"crarr":8629,"lArr":8656,"uArr":8657,"rArr":8658,"dArr":8659,"hArr":8660,"forall":8704,"part":8706,"exist":8707,"empty":8709,"nabla":8711,"isin":8712,"notin":8713,"ni":8715,"prod":8719,"sum":8721,"minus":8722,"lowast":8727,"radic":8730,"prop":8733,"infin":8734,"ang":8736,"and":8743,"or":8744,"cap":8745,"cup":8746,"int":8747,"there4":8756,"sim":8764,"cong":8773,"asymp":8776,"ne":8800,"equiv":8801,"le":8804,"ge":8805,"sub":8834,"sup":8835,"sube":8838,"supe":8839,"oplus":8853,"otimes":8855,"perp":8869,"sdot":8901,"lceil":8968,"rceil":8969,"lfloor":8970,"rfloor":8971,"lang":9001,"rang":9002,"loz":9674,"spades":9824,"clubs":9827,"hearts":9829,"diams":9830,"OElig":338,"oelig":339,"Scaron":352,"scaron":353,"Yuml":376,"circ":710,"tilde":732,"ensp":8194,"emsp":8195,"thinsp":8201,"zwnj":8204,"zwj":8205,"lrm":8206,"rlm":8207,"ndash":8211,"mdash":8212,"lsquo":8216,"rsquo":8217,"sbquo":8218,"ldquo":8220,"rdquo":8221,"bdquo":8222,"dagger":8224,"Dagger":8225,"permil":8240,"lsaquo":8249,"rsaquo":8250,"euro":8364},escape:function(b){return qx.util.StringEscape.escape(b,qx.bom.String.FROM_CHARCODE);}
},defer:function(c){c.FROM_CHARCODE=qx.lang.Object.invert(c.TO_CHARCODE);}
});}
)();
(function(){var a="&",b=";",c="qx.util.StringEscape",d="",e="&#";qx.Bootstrap.define(c,{statics:{escape:function(m,j){var g,k=d;for(var i=0,l=m.length;i<l;i++ ){var h=m.charAt(i);var f=h.charCodeAt(0);if(j[f]){g=a+j[f]+b;}
else {if(f>0x7F){g=e+f+b;}
else {g=h;}
;}
;k+=g;}
;return k;}
}});}
)();
(function(){var a="qx.module.util.String";qx.Bootstrap.define(a,{statics:{camelCase:function(b){return qx.lang.String.camelCase.call(qx.lang.String,b);}
,hyphenate:function(c){return qx.lang.String.hyphenate.call(qx.lang.String,c);}
,firstUp:qx.lang.String.firstUp,firstLow:qx.lang.String.firstLow,startsWith:qx.lang.String.startsWith,endsWith:qx.lang.String.endsWith,escapeRegexpChars:qx.lang.String.escapeRegexpChars,escapeHtml:qx.bom.String.escape},defer:function(d){qxWeb.$attachStatic({string:{camelCase:d.camelCase,hyphenate:d.hyphenate,firstUp:d.firstUp,firstLow:d.firstLow,startsWith:d.startsWith,endsWith:d.endsWith,escapeRegexpChars:d.escapeRegexpChars,escapeHtml:d.escapeHtml}});}
});}
)();
(function(){var a="qx.module.util.Type";qx.Bootstrap.define(a,{statics:{get:qx.Bootstrap.getClass},defer:function(b){qxWeb.$attachStatic({type:{get:b.get}});}
});}
)();
(function(){var a="qx.module.util.Object";qx.Bootstrap.define(a,{statics:{clone:qx.lang.Object.clone,getValues:qx.lang.Object.getValues,invert:qx.lang.Object.invert,contains:qx.lang.Object.contains},defer:function(b){qxWeb.$attachStatic({"object":{"clone":b.clone,"getValues":b.getValues,"invert":b.invert,"contains":b.contains}});}
});}
)();
(function(){var a="qx.module.util.Function",b="undefined";qx.Bootstrap.define(a,{statics:{debounce:function(d,c,e){var f=function(){arguments.callee.immediate=!!(e);arguments.callee.args=qx.lang.Array.fromArguments(arguments);var g=this;var i=arguments.callee.intervalId;if(typeof i===b){var h=window.setInterval((function(){if(!this.fired){window.clearInterval(this.intervalId);delete this.intervalId;if(this.immediate===false){d.apply(g,this.args);}
;}
;this.fired=false;}
).bind(arguments.callee),c);arguments.callee.intervalId=h;if(arguments.callee.immediate){d.apply(g,arguments.callee.args);}
;}
;arguments.callee.fired=true;}
;return f;}
,throttle:function(n,m,q){if(typeof q===b){q={};}
;var k,l,o;var p=null;var r=0;var j=function(){r=q.leading===false?0:new Date();p=null;o=n.apply(k,l);}
;return function(){var s=new Date();if(!r&&q.leading===false){r=s;}
;var t=m-(s-r);k=this;l=arguments;if(t<=0){window.clearTimeout(p);p=null;r=s;o=n.apply(k,l);}
else if(!p&&q.trailing!==false){p=window.setTimeout(j,t);}
;return o;}
;}
},defer:function(u){qxWeb.$attachStatic({func:{debounce:u.debounce,throttle:u.throttle}});}
});}
)();
(function(){var a="resize",b="mshtml",c="engine.name",d="block",e="transparent",f="px",g='<iframe></iframe>',h="javascript:false",i="qx.module.Blocker",j="undefined",k="<div/>",l="absolute";qxWeb.define(i,{statics:{__bE:function(r,o,m,q){var p=qxWeb.getWindow(r);var n=qxWeb.isDocument(r);if(!n&&!qxWeb.isElement(r)){return;}
;if(!r.__bF){r.__bF={div:qxWeb.create(k)};if((qxWeb.env.get(c)==b)){r.__bF.iframe=qx.module.Blocker.__bH(p);}
;}
;qx.module.Blocker.__bG(r,o,m,q,n);r.__bF.div.appendTo(p.document.body);if(r.__bF.iframe){r.__bF.iframe.appendTo(p.document.body);}
;if(n){qxWeb(p).on(a,qx.module.Blocker.__bI);}
;}
,__bG:function(y,u,s,x,t){var v=qxWeb(y);var z={"zIndex":x,"display":d,"position":l,"backgroundColor":u,"opacity":s,"width":v.getWidth()+f,"height":v.getHeight()+f};if(t){z.top=0+f;z.left=0+f;}
else {var w=v.getOffset();z.top=w.top+f;z.left=w.left+f;}
;y.__bF.div.setStyles(z);if(y.__bF.iframe){z.zIndex=z.zIndex-1;z.backgroundColor=e;z.opacity=0;y.__bF.iframe.setStyles(z);}
;}
,__bH:function(A){var B=qxWeb.create(g);B.setAttributes({frameBorder:0,frameSpacing:0,marginWidth:0,marginHeight:0,hspace:0,vspace:0,border:0,allowTransparency:false,src:h});return B;}
,__bI:function(D){var C=this[0];var E={width:this.getWidth()+f,height:this.getHeight()+f};qxWeb(C.document.__bF.div).setStyles(E);if(C.document.__bF.iframe){qxWeb(C.document.__bF.iframe).setStyles(E);}
;}
,__bJ:function(F,G){if(!F.__bF){return;}
;F.__bF.div.remove();if(F.__bF.iframe){F.__bF.iframe.remove();}
;if(qxWeb.isDocument(F)){qxWeb(qxWeb.getWindow(F)).off(a,qx.module.Blocker.__bI);}
;}
,__bK:function(H){var I=qxWeb();H.forEach(function(J,K){if(typeof J.__bF!==j){I=I.concat(J.__bF.div);}
;}
);return I;}
,block:function(L,M,N){if(!this[0]){return this;}
;L=L||e;M=M||0;N=N||10000;this.forEach(function(O,P){qx.module.Blocker.__bE(O,L,M,N);}
);return this;}
,unblock:function(){if(!this[0]){return this;}
;this.forEach(qx.module.Blocker.__bJ);return this;}
,getBlocker:function(){if(!this[0]){return this;}
;var Q=qx.module.Blocker.__bK(this);return Q;}
},defer:function(R){qxWeb.$attach({"block":R.block,"unblock":R.unblock,"getBlocker":R.getBlocker});}
});}
)();
(function(){var a="",b=";path=",c="=",d=";expires=Thu, 01-Jan-1970 00:00:01 GMT",e="qx.bom.Cookie",f=";expires=",g=";",h=";domain=",i=";secure";qx.Bootstrap.define(e,{statics:{get:function(l){var j=document.cookie.indexOf(l+c);var m=j+l.length+1;if((!j)&&(l!=document.cookie.substring(0,l.length))){return null;}
;if(j==-1){return null;}
;var k=document.cookie.indexOf(g,m);if(k==-1){k=document.cookie.length;}
;return unescape(document.cookie.substring(m,k));}
,set:function(s,q,p,t,n,o){var r=[s,c,escape(q)];if(p){var u=new Date();u.setTime(u.getTime());r.push(f,new Date(u.getTime()+(p*1000*60*60*24)).toGMTString());}
;if(t){r.push(b,t);}
;if(n){r.push(h,n);}
;if(o){r.push(i);}
;document.cookie=r.join(a);}
,del:function(y,v,w){if(!qx.bom.Cookie.get(y)){return;}
;var x=[y,c];if(v){x.push(b,v);}
;if(w){x.push(h,w);}
;x.push(d);document.cookie=x.join(a);}
}});}
)();
(function(){var a="qx.module.Cookie";qx.Bootstrap.define(a,{statics:{get:qx.bom.Cookie.get,set:qx.bom.Cookie.set,del:qx.bom.Cookie.del},defer:function(b){qxWeb.$attachStatic({"cookie":{get:b.get,set:b.set,del:b.del}});}
});}
)();
(function(){var a="q";qx.Bootstrap.define(a,{extend:qxWeb});q=qxWeb;}
)();
(function(){var a="touchmove",b="mousedown",c="MSPointerDown",d="touch",e="device.type",f='resize',g="mouseout",h='ms',j="Hidden",k="baselib.DeviceInfo",l='orientationchange',m="mouse",n="event.mspointer",o="visibilitychange",p="event.touch",r="mousemove",s="pointer",t="MSPointerCancel",u='onorientationchange',v='RequestAnimationFrame',w="css.transition",y="touchend",z='CancelAnimationFrame',A='moz',B="mouseup",C="touchstart",D='CancelRequestAnimationFrame',E='webkit',F="end-event",G="click",H="touchcancel",I="MSPointerMove",J="hidden",K="desktop",L="tap",M='o',N="MSPointerUp";qx.Bootstrap.define(k,{defer:function(){var Q={};if(qxWeb.env.get(p)){Q={api:d,down:C,move:a,up:y,cancel:H,click:L};}
else if(qxWeb.env.get(n)){Q={api:s,down:c,move:I,up:N,cancel:t,click:qxWeb.env.get(e)===K?G:L};}
else {Q={api:m,down:b,move:r,up:B,cancel:g,click:G};}
;var O=[h,A,E,M];(function(){var R=0;for(var x=0;x<O.length&&!window.requestAnimationFrame; ++x){window.requestAnimationFrame=window[O[x]+v];window.cancelAnimationFrame=window[O[x]+z]||window[O[x]+D];}
;if(!window.requestAnimationFrame){window.requestAnimationFrame=function(S){var U=new Date().getTime();var T=Math.max(0,16-(U-R));var V=window.setTimeout(function(){S(U+T);}
,T);R=U+T;return V;}
;}
;if(!window.cancelAnimationFrame){window.cancelAnimationFrame=function(W){clearTimeout(W);}
;}
;}
());(function(){Q.pageVisibility={hidden:null,visibilityChange:null};if(document.hidden!==undefined){Q.pageVisibility.hidden=J;Q.pageVisibility.visibilityChange=o;}
;var X=null;for(var i=0;i<O.length;i++ ){X=O[i];if(document[X+j]!==undefined){Q.pageVisibility.hidden=X+j;Q.pageVisibility.visibilityChange=X+o;}
;}
;}
());Q.animation={requestFrame:function(Y,ba){return window.requestAnimationFrame(Y,ba);}
,cancelFrame:function(bb){return window.cancelAnimationFrame(bb);}
};Q.transitionStyleName=null;Q.transitionEndSupported=false;Q.transitionEnd=null;var P=qxWeb.env.get(w);if(P!==null){Q.transitionEndSupported=true;Q.transitionStyleName=P.name;Q.transitionEnd=P[F];}
;Q.resize=u in window?l:f;q.$attachStatic({"EVENT":Q});}
});}
)();
(function(){var a="baselib.Toggle";qxWeb.define(a,{statics:{toggle:function(){var d=arguments,b={},f={},e;var c=function(){}
;if(d.length===0){return;}
;c=function(event){if(!this[0].uid){this[0].uid=(new Date()).getTime();b[this[0].uid]=0;}
;e=this[0].uid;if(event.preventDefault){event.preventDefault();}
else {event.returnValue=false;}
;f[e]=b[e];b[e]=(b[e]+1)%d.length;return d[f[e]].apply(this,arguments)||false;}
;this.on(qxWeb.EVENT.click,c);}
},defer:function(g){qxWeb.$attach({"toggle":g.toggle});}
});}
)();
(function(){var a="baselib.TextContent";qx.Bootstrap.define(a,{statics:{getTextContent:function(){if(this[0]){return qx.bom.Label.getValue(this[0]);}
;}
,setTextContent:function(b){for(var i=0;i<this.length;i++ ){qx.bom.Label.setValue(this[i],b);}
;return this;}
},defer:function(c){qxWeb.$attach({"getTextContent":c.getTextContent,"setTextContent":c.setTextContent});}
});}
)();
(function(){var a="text",b="",c="css.textoverflow",d="html.xul",e="value",f="qx.bom.Label";qx.Bootstrap.define(f,{statics:{setValue:function(h,g){g=g||b;if(h.useHtml){h.innerHTML=g;}
else if(!qx.core.Environment.get(c)&&qx.core.Environment.get(d)){h.firstChild.setAttribute(e,g);}
else {qx.bom.element.Attribute.set(h,a,g);}
;}
,getValue:function(i){if(i.useHtml){return i.innerHTML;}
else if(!qx.core.Environment.get(c)&&qx.core.Environment.get(d)){return i.firstChild.getAttribute(e)||b;}
else {return qx.bom.element.Attribute.get(i,a);}
;}
}});}
)();
(function(){var a="baselib.EventNormalization",b="*";qx.Bootstrap.define(a,{statics:{TYPES:[b],normalize:function(event,c){if(!event){return event;}
;event._currentTarget=event.currentTarget||c;event._relatedTarget=event.relatedTarget||c;return event;}
},defer:function(d){qxWeb.$registerEventNormalization(d.TYPES,d.normalize);}
});}
)();
(function(){var a="html,body",b="baselib.DocumentScroll";qx.Bootstrap.define(b,{statics:{setDocumentScrollTop:function(d,c){qxWeb(a).setScrollTop(d,c);}
,setDocumentScrollLeft:function(f,e){qxWeb(a).setScrollLeft(f,e);}
},defer:function(g){qxWeb.$attachStatic({"setDocumentScrollTop":g.setDocumentScrollTop,"setDocumentScrollLeft":g.setDocumentScrollLeft});}
});}
)();
(function(){var a="css.transform.3d",b="backfaceVisibility",c="transformStyle",d="css.transform",e="transformOrigin",f="qx.bom.client.CssTransform",g="transform",h="perspective",i="perspectiveOrigin";qx.Bootstrap.define(f,{statics:{getSupport:function(){var name=qx.bom.client.CssTransform.getName();if(name!=null){return {"name":name,"style":qx.bom.client.CssTransform.getStyle(),"origin":qx.bom.client.CssTransform.getOrigin(),"3d":qx.bom.client.CssTransform.get3D(),"perspective":qx.bom.client.CssTransform.getPerspective(),"perspective-origin":qx.bom.client.CssTransform.getPerspectiveOrigin(),"backface-visibility":qx.bom.client.CssTransform.getBackFaceVisibility()};}
;return null;}
,getStyle:function(){return qx.bom.Style.getPropertyName(c);}
,getPerspective:function(){return qx.bom.Style.getPropertyName(h);}
,getPerspectiveOrigin:function(){return qx.bom.Style.getPropertyName(i);}
,getBackFaceVisibility:function(){return qx.bom.Style.getPropertyName(b);}
,getOrigin:function(){return qx.bom.Style.getPropertyName(e);}
,getName:function(){return qx.bom.Style.getPropertyName(g);}
,get3D:function(){return qx.bom.client.CssTransform.getPerspective()!=null;}
},defer:function(j){qx.core.Environment.add(d,j.getSupport);qx.core.Environment.add(a,j.get3D);}
});}
)();
(function(){var a="$1",b="qx.bom.client.Flash",c="ShockwaveFlash.ShockwaveFlash.7",d="plugin.flash.express",e="plugin.flash.version",f="plugin.flash",g="object",h="osx",j="10.0.12",k="",l="win",m="ShockwaveFlash.ShockwaveFlash.6",n="$version",o="Shockwave Flash",p="plugin.flash.strictsecurity",q="6.0.65",r="always",s="9.0.151",t=" ",u="ShockwaveFlash.ShockwaveFlash",v=".",w="undefined",x=",";qx.Bootstrap.define(b,{statics:{isAvailable:function(){return parseFloat(qx.bom.client.Flash.getVersion())>0;}
,getVersion:function(){if(navigator.plugins&&typeof navigator.plugins[o]===g){var A=[0,0,0];var C=navigator.plugins[o].description;if(typeof C!=w){C=C.replace(/^.*\s+(\S+\s+\S+$)/,a);A[0]=parseInt(C.replace(/^(.*)\..*$/,a),10);A[1]=parseInt(C.replace(/^.*\.(.*)\s.*$/,a),10);A[2]=/r/.test(C)?parseInt(C.replace(/^.*r(.*)$/,a),10):0;}
;return A.join(v);}
else if(window.ActiveXObject){var A=[0,0,0];var z=false;try{var B=new ActiveXObject(c);}
catch(D){try{var B=new ActiveXObject(m);A=[6,0,21];B.AllowScriptAccess=r;}
catch(E){if(A[0]==6){z=true;}
;}
;if(!z){try{B=new ActiveXObject(u);}
catch(F){}
;}
;}
;if(!z&&typeof B==g){var y=B.GetVariable(n);if(typeof y!=w){y=y.split(t)[1].split(x);A[0]=parseInt(y[0],10);A[1]=parseInt(y[1],10);A[2]=parseInt(y[2],10);}
;}
;return A.join(v);}
else {return k;}
;}
,getExpressInstall:function(){var H=qx.bom.client.Flash.getVersion();if(H==k){return false;}
;var G=qx.bom.client.OperatingSystem.getName();return (G==l||G==h)&&qx.bom.client.Flash.__bL(q,H);}
,getStrictSecurityModel:function(){var I=qx.bom.client.Flash.getVersion();if(I==k){return false;}
;var J=I.split(v);if(J[0]<10){return qx.bom.client.Flash.__bL(s,I);}
else {return qx.bom.client.Flash.__bL(j,I);}
;}
,__bL:function(O,L){var K=O.split(v);var M=L||qx.bom.client.Flash.getVersion();M=M.split(v);for(var i=0;i<K.length;i++ ){var N=parseInt(M[i],10)-parseInt(K[i],10);if(N>0){return true;}
else if(N<0){return false;}
;}
;return true;}
},defer:function(P){qx.core.Environment.add(f,P.isAvailable);qx.core.Environment.add(e,P.getVersion);qx.core.Environment.add(d,P.getExpressInstall);qx.core.Environment.add(p,P.getStrictSecurityModel);}
});}
)();
(function(){var a="prop",b="qx.bom.client.Json",c="repl",d="JSON",e='{"x":1}',f="json",g="val";qx.Bootstrap.define(b,{statics:{getJson:function(){return (qx.Bootstrap.getClass(window.JSON)==d&&JSON.parse(e).x===1&&JSON.stringify({"prop":g},function(k,v){return k===a?c:v;}
).indexOf(c)>0);}
},defer:function(h){qx.core.Environment.add(f,h.getJson);}
});}
)();
(function(){var a="css.transform.3d",b="baselib.FeatureDetection",c="css.transform",d="css.transition",e="json",f="plugin.flash";qx.Bootstrap.define(b,{defer:function(){qx.core.Environment.get(e);qx.core.Environment.get(f);qx.core.Environment.get(d);qx.core.Environment.get(c);qx.core.Environment.get(a);{var g;}
;}
});}
)();
(function(){var a="baselib.UriUtil";qxWeb.define(a,{statics:{appendParams:function(b,c){return qx.util.Uri.appendParamsToUrl(b,c);}
,getAbsolute:function(d){return qx.util.Uri.getAbsolute(d);}
,parse:function(f,e){return qx.util.Uri.parseUri(f,e);}
,toParameter:function(g,h){return qx.util.Uri.toParameter(g,h);}
},defer:function(i){qxWeb.$attachStatic({uri:{appendParams:i.appendParams,getAbsolute:i.getAbsolute,parse:i.parse,toParameter:i.toParameter}});}
});}
)();
(function(){var a="-",b="px",c="bottom-right",d="right-bottom",e="left-top",f="bottom",g="left-middle",h="right-middle",i="top-center",j="0px",k="bottom-left",l="center",m="hidden",n="middle",o="number",p="top-left",q="top",r="top-right",s="right",t="block",u="right-top",v="bottom-center",w="left-bottom",x="left",y="baselib.Tooltip",z="absolute";qxWeb.define(y,{construct:function(C,B,A,D){this.__bM=qxWeb(C);this.__bN=qxWeb(B);this.setPosition(A);this.__bO=D||{};this.updatePosition();this.__bT();}
,members:{__bM:null,__bN:null,__bP:null,__bO:null,getTarget:function(){return this.__bM;}
,setTarget:function(E){this.__bM=qxWeb(E);this.updatePosition();}
,getElement:function(){return this.__bN;}
,setPosition:function(G){var F=v;var H=baselib.Tooltip.POSITIONS;this.__bP=(H.indexOf(G)==-1)?F:G;this.updatePosition();}
,getPosition:function(){return this.__bP;}
,setOffsets:function(I){this.__bO=I;this.updatePosition();}
,getOffset:function(){return this.__bO;}
,isVisible:function(){return this.__bN.getWidth()||this.__bN.getHeight();}
,updatePosition:function(){if(this.__bN.length>0&&this.__bM.length>0){var N={top:0,left:0,right:0,bottom:0};if(this.__bO){for(var K in N){if(typeof this.__bO[K]==o){N[K]=this.__bO[K];}
;}
;}
;var L=this.__bN.isRendered();var J=null;var M=null;if(!L){J=this.__bN[0].style.display;M=this.__bN[0].style.visibility;this.__bN.setStyles({position:z,visibility:m,display:t});}
;this.__bQ(N);if(!L){this.__bN[0].style.display=J;this.__bN[0].style.visibility=M;}
;}
;}
,__bQ:function(Q){this.__bN.setStyles({position:z,top:j,left:j});var S=this.__bM.getOffset(),P=this.__bN.getOffset();var R=S.left-P.left,W=S.top-P.top;var V=this.__bM.getWidth()-this.__bN.getWidth();var U=this.__bM.getHeight()-this.__bN.getHeight();var T=this.__bP.split(a);var O=this.__bR(R,W,V,U,Q,T[0],{});O=this.__bS(R,W,V,U,Q,T[1],O);this.__bN.setStyles(O);}
,__bR:function(ba,be,bc,bb,Y,bd,X){switch(bd){case f:X.top=(be+this.__bM.getHeight()+Y.top)+b;break;case q:X.top=(be-this.__bN.getHeight()-Y.bottom)+b;break;case x:X.left=(ba-this.__bN.getWidth()+Y.left)+b;break;case s:X.left=(ba+this.__bM.getWidth()-Y.right)+b;break;};return X;}
,__bS:function(bh,bl,bj,bi,bg,bk,bf){switch(bk){case l:bf.left=(bh+bj/2+bg.left)+b;break;case x:bf.left=(bh+bg.left)+b;break;case s:bf.left=(bh+bj-bg.right)+b;break;case n:bf.top=(bl+bi/2+bg.top)+b;break;case q:bf.top=(bl+bg.top)+b;break;case f:bf.top=(bl+bi-bg.bottom)+b;break;};return bf;}
,__bT:function(){qxWeb(window).on(qxWeb.EVENT.resize,function(){if(this.isVisible){this.updatePosition();}
;}
,this);}
},statics:{tooltip:function(bo,br,bn){if(!this[0]||!bo){return this;}
;var bm=qxWeb(this[0]);br=br||v;var bp={top:0,left:0,right:0,bottom:0};bn=bn||{};if(bn){for(var bq in bp){if(typeof bn[bq]!=o){bn[bq]=bp[bq];}
;}
;}
;return new baselib.Tooltip(bm,bo,br,bn);}
,POSITIONS:[p,i,r,k,v,c,e,g,w,u,h,d]},defer:function(bs){qxWeb.$attach({"tooltip":bs.tooltip});}
});}
)();
(function(){var a="HTMLEvents",b="on",c="baselib.NativeEvent";qxWeb.define(c,{statics:{emitNative:function(e){var d;if(document.createEvent){for(var i=0;i<this.length;i++ ){d=document.createEvent(a);d.initEvent(e,true,true);this[i].dispatchEvent(d);}
;}
else {for(var j=0;j<this.length;j++ ){d=document.createEventObject();this[j].fireEvent(b+e,d);}
;}
;}
},defer:function(f){qxWeb.$attach({"emitNative":f.emitNative});}
});}
)();
(function(){var a="hide",b="animationEnd",c="Number",d="aftershow",e="function",f="qx.event.Emitter",g="switch",h="afterhide",j="beforeshow",k="beforehide",m="animationStart",n="baselib.Multiview",o="show";qx.Bootstrap.define(n,{extend:qx.event.Emitter,construct:function(q,p){this.__bU=q;this.__bV=p;this.__cb();}
,events:{"switch":f,"beforehide":f,"beforeshow":f,"afterhide":f,"aftershow":f},members:{__bU:null,__bV:null,__bW:null,__bX:null,__bY:null,__ca:0,__cb:function(){this.__bW=this.__bV;for(var i=0,l=this.__bU.length;i<l;i++ ){(function(r,i){var s=qxWeb(r.__bU[i]);var t=r.__ce.bind(r,s);var u=r.__cf.bind(r,s);s.on(m,t,r);s.on(b,u,r);if(r.__bV!==undefined){if(i!=r.__bV){s.hide();}
else {s.show();}
;}
else {s.hide();}
;}
)(this,i);}
;}
,getItems:function(){return this.__bU;}
,getCurrentItem:function(){return qxWeb(this.__bU[this.__bW]);}
,showNext:function(){this.showItem((this.__bW+1)%this.__bU.length,false);}
,showPrev:function(){var v=this.__bW-1;v=v<0?v+this.__bU.length:v;this.showItem(v,true);}
,getCurrentIndex:function(){return this.__bW;}
,showItem:function(w,x){if(!this.__cg(w)||(w==this.__bW)||this.isAnimating()){return;}
;x=x!==undefined?x:false;var y=this.getCurrentItem();if(this._shouldAnimate()){if(y.length>0){this.__cd(y,x);}
;this.__bW=w;this.__cc(this.getCurrentItem(),x);}
else {if(y.length>0){y.hide();}
;this.__bW=w;this.getCurrentItem().show();}
;}
,setHideAnimationDescription:function(z){this.__bX=z;}
,setShowAnimationDescription:function(A){this.__bY=A;}
,isAnimating:function(){return this.__ca>0;}
,close:function(B){if(this.isAnimating()){return;}
;if(this.getCurrentItem().length>0){if((this._shouldAnimate()&&!B)||!this._shouldAnimate()){this.getCurrentItem().hide();this.__bW=null;}
else if(this._shouldAnimate()&&B){this.once(h,function(){this.__bW=null;}
,this);this.__cd(this.getCurrentItem());}
;}
;}
,__cc:function(C,D){C.show();this.emit(j,{target:C,reverse:D});window.setTimeout(function(){var E=this.__bY.call(C,D);C[0].$$qxoperation=o;C.animate(E);}
.bind(this),10);}
,__cd:function(F,G){this.emit(k,{target:F,reverse:G});window.setTimeout(function(){var H=this.__bX.call(F,G);F[0].$$qxoperation=a;F.animate(H);}
.bind(this),10);}
,__ce:function(){this.__ca++ ;}
,__cf:function(I){if(I[0].$$qxoperation==a){I.hide();this.emit(h,{target:I});}
else {this.emit(d,{target:I});}
;this.__ca-- ;if(this.__ca===0){this.emit(g,{current:this.getCurrentItem()});}
;}
,__cg:function(J){if(qxWeb.type.get(J)===c&&(parseFloat(J)==parseInt(J,10))){return J>=0&&J<this.__bU.length;}
;return false;}
,_shouldAnimate:function(){return (typeof this.__bX==e)&&(typeof this.__bY==e);}
}});}
)();
(function(){var a="baselib.Css";qx.Bootstrap.define(a,{statics:{getWidthMax:function(c){var b=[];this.forEach(function(d){b.push(qxWeb(d).getWidth(c));}
);return qxWeb.array.max(b);}
,getWidthMin:function(f){var e=[];this.forEach(function(g){e.push(qxWeb(g).getWidth(f));}
);return qxWeb.array.min(e);}
,getHeightMax:function(h){var i=[];this.forEach(function(j){i.push(qxWeb(j).getHeight(h));}
);return qxWeb.array.max(i);}
,getHeightMin:function(k){var l=[];this.forEach(function(m){l.push(qxWeb(m).getHeight(k));}
);return qxWeb.array.min(l);}
},defer:function(n){qxWeb.$attach({"getWidthMax":n.getWidthMax,"getWidthMin":n.getWidthMin,"getHeightMax":n.getHeightMax,"getHeightMin":n.getHeightMin});}
});}
)();
(function(){var a='html',b='qx.debug',c='baselib.SelectboxSync',d='change',e='Your target collection is empty! It has to match an element.',f='Your collection is empty! It has to match a select element.',g='value';qx.Bootstrap.define(c,{statics:{__ch:null,selectSync:function(l,i,m){if(!this[0]){if(qxWeb.env.get(b)&&qxWeb.log!==undefined){qxWeb.log.debug(baselib.SelectboxSync,f);}
;return this;}
;if(!(i instanceof qxWeb)){i=qxWeb(i);}
;if(i.length===0){if(qxWeb.env.get(b)&&qxWeb.log!==undefined){qxWeb.log.debug(baselib.SelectboxSync,e);}
;return this;}
;if(m===undefined){m=a;}
;var h=this.eq(0),j=g,n=baselib.SelectboxSync.__ci(h,j,i,m),k=h.getAttribute(g);if(baselib.SelectboxSync.__ch[n]!==undefined){return this;}
;baselib.SelectboxSync.__ch[n]=function(){i.setAttribute(m,l[this.getValue()]);}
;h.on(d,baselib.SelectboxSync.__ch[n]);i.setAttribute(m,l[k]);}
,selectUnsync:function(p,s){if(!this[0]){return this;}
;var o=this.eq(0),q=g,t=baselib.SelectboxSync.__ci(o,q,p,s),r=baselib.SelectboxSync.__ch[t];if(!(p instanceof qxWeb)){p=qxWeb(p);}
;if(s===undefined){s=a;}
;if(r!==undefined){o.off(d,baselib.SelectboxSync.__ch[t]);}
;}
,__ci:function(u,v,w,x){var y=u[0].nodeName.toLowerCase();y+=v.toLowerCase();y+=w[0].nodeName.toLowerCase();y+=x.toLowerCase();return y;}
},defer:function(z){qxWeb.$attach({'selectSync':z.selectSync,'selectUnsync':z.selectUnsync});baselib.SelectboxSync.__ch={};}
});}
)();
(function(){var a='baselib.event.Util',b='resize';qx.Bootstrap.define(a,{statics:{__cj:false,__ck:null,__cl:null,onResize:function(h,f){var c=baselib.event.Util;c.__ck.push(h);c.__cl.push(f!==undefined?f:window);if(c.__cj===false){var g=function(e){var k=qxWeb.object.clone(e);for(var i=0,j=c.__ck.length;i<j;i++ ){c.__ck[i].call(c.__cl[i],k);}
;}
;var d=qxWeb.func.throttle(g,150,{trailing:false});qxWeb(window).on(b,d);}
;c.__cj=true;}
},defer:function(l){qxWeb.$attachStatic({'onResize':l.onResize});baselib.event.Util.__ck=[];baselib.event.Util.__cl=[];}
});}
)();
(function(){var a="baselib.util.Viewport";qx.Bootstrap.define(a,{statics:{getViewportOffset:function(){if(!this[0]){return;}
;var b=this[0].getBoundingClientRect();return {top:b.top,bottom:b.bottom,left:b.left,right:b.right};}
},defer:function(c){qxWeb.$attach({"getViewportOffset":c.getViewportOffset});}
});}
)();


  // Export the global 'qxWeb' variable to '$q'. This variable is used by the follow-up
  // modules to guard them against overwriting 'q' in the global namespace.
  // It is necessary to define the variable locally - "copy" it into the local function 
  // scope before exporting it.
  if (!window.$q) {
    window.$q = window.qxWeb;
  }

  window["qx"] = undefined;
  try {
    delete window.qx;
  } catch(e) {}
})();