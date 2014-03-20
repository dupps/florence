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
(function(){var a="start",b="animationEnd",c="",d="none",e="qx.module.Animation",f="animationIteration",g="end",h="animationStart",j="ease-in",k="iteration",l="ease-out",m="display";qx.Bootstrap.define(e,{events:{"animationStart":undefined,"animationIteration":undefined,"animationEnd":undefined},statics:{getAnimationHandles:function(){var n=[];for(var i=0;i<this.length;i++ ){n[i]=this[i].$$animation;}
;return n;}
,_fadeOut:{duration:700,timing:l,keep:100,keyFrames:{'0':{opacity:1},'100':{opacity:0,display:d}}},_fadeIn:{duration:700,timing:j,keep:100,keyFrames:{'0':{opacity:0},'100':{opacity:1}}},animate:function(p,o){qx.module.Animation._animate.bind(this)(p,o,false);return this;}
,animateReverse:function(r,q){qx.module.Animation._animate.bind(this)(r,q,true);return this;}
,_animate:function(u,s,t){this._forEachElement(function(v,i){if(v.$$animation){v.$$animation.stop();}
;var w;if(t){w=qx.bom.element.Animation.animateReverse(v,u,s);}
else {w=qx.bom.element.Animation.animate(v,u,s);}
;var self=this;if(i==0){w.on(a,function(){self.emit(h);}
,w);w.on(k,function(){self.emit(f);}
,w);}
;w.on(g,function(){for(var i=0;i<self.length;i++ ){if(self[i].$$animation){return;}
;}
;self.emit(b);}
,v);}
);}
,play:function(){for(var i=0;i<this.length;i++ ){var x=this[i].$$animation;if(x){x.play();}
;}
;return this;}
,pause:function(){for(var i=0;i<this.length;i++ ){var y=this[i].$$animation;if(y){y.pause();}
;}
;return this;}
,stop:function(){for(var i=0;i<this.length;i++ ){var z=this[i].$$animation;if(z){z.stop();}
;}
;return this;}
,isPlaying:function(){for(var i=0;i<this.length;i++ ){var A=this[i].$$animation;if(A&&A.isPlaying()){return true;}
;}
;return false;}
,isEnded:function(){for(var i=0;i<this.length;i++ ){var B=this[i].$$animation;if(B&&!B.isEnded()){return false;}
;}
;return true;}
,fadeIn:function(C){this.setStyle(m,c);return this.animate(qx.module.Animation._fadeIn,C);}
,fadeOut:function(D){return this.animate(qx.module.Animation._fadeOut,D);}
},defer:function(E){qxWeb.$attach({"animate":E.animate,"animateReverse":E.animateReverse,"fadeIn":E.fadeIn,"fadeOut":E.fadeOut,"play":E.play,"pause":E.pause,"stop":E.stop,"isEnded":E.isEnded,"isPlaying":E.isPlaying,"getAnimationHandles":E.getAnimationHandles});}
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
(function(){var a="css.animation",b="translate",c="rotate",d="skew",e="scale",f="qx.bom.element.Animation";qx.Bootstrap.define(f,{statics:{animate:function(h,k,g){var j=qx.bom.element.Animation.__cn(h,k.keyFrames);if(qx.core.Environment.get(a)&&j){return qx.bom.element.AnimationCss.animate(h,k,g);}
else {return qx.bom.element.AnimationJs.animate(h,k,g);}
;}
,animateReverse:function(m,o,l){var n=qx.bom.element.Animation.__cn(m,o.keyFrames);if(qx.core.Environment.get(a)&&n){return qx.bom.element.AnimationCss.animateReverse(m,o,l);}
else {return qx.bom.element.AnimationJs.animateReverse(m,o,l);}
;}
,__cn:function(p,t){var r=[];for(var v in t){var s=t[v];for(var u in s){if(r.indexOf(u)==-1){r.push(u);}
;}
;}
;var q=[e,c,d,b];for(var i=0;i<r.length;i++ ){var u=qx.lang.String.camelCase(r[i]);if(!(u in p.style)){if(q.indexOf(r[i])!=-1){continue;}
;if(qx.bom.Style.getPropertyName(u)){continue;}
;return false;}
;}
;return true;}
}});}
)();
(function(){var a="css.animation",b="Element",c="",d="qx.bom.element.AnimationHandle",e="play-state",f="paused",g="running";qx.Bootstrap.define(d,{extend:qx.event.Emitter,construct:function(){var h=qx.core.Environment.get(a);this.__co=h&&h[e];this.__cp=true;}
,events:{"start":b,"end":b,"iteration":b},members:{__co:null,__cp:false,__cq:false,isPlaying:function(){return this.__cp;}
,isEnded:function(){return this.__cq;}
,isPaused:function(){return this.el.style[this.__co]==f;}
,pause:function(){if(this.el){this.el.style[this.__co]=f;this.el.$$animation.__cp=false;if(this.animationId&&qx.bom.element.AnimationJs){qx.bom.element.AnimationJs.pause(this);}
;}
;}
,play:function(){if(this.el){this.el.style[this.__co]=g;this.el.$$animation.__cp=true;if(this.i!=undefined&&qx.bom.element.AnimationJs){qx.bom.element.AnimationJs.play(this);}
;}
;}
,stop:function(){if(this.el&&qx.core.Environment.get(a)&&!this.jsAnimation){this.el.style[this.__co]=c;this.el.style[qx.core.Environment.get(a).name]=c;this.el.$$animation.__cp=false;this.el.$$animation.__cq=true;}
else if(this.jsAnimation){this.stopped=true;qx.bom.element.AnimationJs.stop(this);}
;}
}});}
)();
(function(){var a="Could not parse color: ",c="",d="Invalid hex value: ",e="Could not convert system colors to RGB: ",h="(",j=")",k="#",l="a",m="Invalid hex3 value: ",n="qx.theme.manager.Color",o="qx.util.ColorUtil",q="Invalid hex6 value: ",s="rgb",u=",";qx.Bootstrap.define(o,{statics:{REGEXP:{hex3:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,rgb:/^rgb\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/,rgba:/^rgba\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/},SYSTEM:{activeborder:true,activecaption:true,appworkspace:true,background:true,buttonface:true,buttonhighlight:true,buttonshadow:true,buttontext:true,captiontext:true,graytext:true,highlight:true,highlighttext:true,inactiveborder:true,inactivecaption:true,inactivecaptiontext:true,infobackground:true,infotext:true,menu:true,menutext:true,scrollbar:true,threeddarkshadow:true,threedface:true,threedhighlight:true,threedlightshadow:true,threedshadow:true,window:true,windowframe:true,windowtext:true},NAMED:{black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255],transparent:[-1,-1,-1],magenta:[255,0,255],orange:[255,165,0],brown:[165,42,42]},isNamedColor:function(v){return this.NAMED[v]!==undefined;}
,isSystemColor:function(w){return this.SYSTEM[w]!==undefined;}
,supportsThemes:function(){if(qx.Class){return qx.Class.isDefined(n);}
;return false;}
,isThemedColor:function(x){if(!this.supportsThemes()){return false;}
;if(qx.theme&&qx.theme.manager&&qx.theme.manager.Color){return qx.theme.manager.Color.getInstance().isDynamic(x);}
;return false;}
,stringToRgb:function(y){if(this.supportsThemes()&&this.isThemedColor(y)){y=qx.theme.manager.Color.getInstance().resolveDynamic(y);}
;if(this.isNamedColor(y)){return this.NAMED[y].concat();}
else if(this.isSystemColor(y)){throw new Error(e+y);}
else if(this.isRgbaString(y)){return this.__cs(y);}
else if(this.isRgbString(y)){return this.__cr();}
else if(this.isHex3String(y)){return this.__ct();}
else if(this.isHex6String(y)){return this.__cu();}
;throw new Error(a+y);}
,cssStringToRgb:function(z){if(this.isNamedColor(z)){return this.NAMED[z];}
else if(this.isSystemColor(z)){throw new Error(e+z);}
else if(this.isRgbString(z)){return this.__cr();}
else if(this.isRgbaString(z)){return this.__cs();}
else if(this.isHex3String(z)){return this.__ct();}
else if(this.isHex6String(z)){return this.__cu();}
;throw new Error(a+z);}
,stringToRgbString:function(A){return this.rgbToRgbString(this.stringToRgb(A));}
,rgbToRgbString:function(B){return s+(B[3]?l:c)+h+B.join(u)+j;}
,rgbToHexString:function(C){return (k+qx.lang.String.pad(C[0].toString(16).toUpperCase(),2)+qx.lang.String.pad(C[1].toString(16).toUpperCase(),2)+qx.lang.String.pad(C[2].toString(16).toUpperCase(),2));}
,isValidPropertyValue:function(D){return (this.isThemedColor(D)||this.isNamedColor(D)||this.isHex3String(D)||this.isHex6String(D)||this.isRgbString(D)||this.isRgbaString(D));}
,isCssString:function(E){return (this.isSystemColor(E)||this.isNamedColor(E)||this.isHex3String(E)||this.isHex6String(E)||this.isRgbString(E)||this.isRgbaString(E));}
,isHex3String:function(F){return this.REGEXP.hex3.test(F);}
,isHex6String:function(G){return this.REGEXP.hex6.test(G);}
,isRgbString:function(H){return this.REGEXP.rgb.test(H);}
,isRgbaString:function(I){return this.REGEXP.rgba.test(I);}
,__cr:function(){var L=parseInt(RegExp.$1,10);var K=parseInt(RegExp.$2,10);var J=parseInt(RegExp.$3,10);return [L,K,J];}
,__cs:function(){var P=parseInt(RegExp.$1,10);var O=parseInt(RegExp.$2,10);var M=parseInt(RegExp.$3,10);var N=parseInt(RegExp.$4,10);if(P===0&&O===0&M===0&&N===0){return [-1,-1,-1];}
;return [P,O,M];}
,__ct:function(){var S=parseInt(RegExp.$1,16)*17;var R=parseInt(RegExp.$2,16)*17;var Q=parseInt(RegExp.$3,16)*17;return [S,R,Q];}
,__cu:function(){var V=(parseInt(RegExp.$1,16)*16)+parseInt(RegExp.$2,16);var U=(parseInt(RegExp.$3,16)*16)+parseInt(RegExp.$4,16);var T=(parseInt(RegExp.$5,16)*16)+parseInt(RegExp.$6,16);return [V,U,T];}
,hex3StringToRgb:function(W){if(this.isHex3String(W)){return this.__ct(W);}
;throw new Error(m+W);}
,hex3StringToHex6String:function(X){if(this.isHex3String(X)){return this.rgbToHexString(this.hex3StringToRgb(X));}
;return X;}
,hex6StringToRgb:function(Y){if(this.isHex6String(Y)){return this.__cu(Y);}
;throw new Error(q+Y);}
,hexStringToRgb:function(ba){if(this.isHex3String(ba)){return this.__ct(ba);}
;if(this.isHex6String(ba)){return this.__cu(ba);}
;throw new Error(d+ba);}
,rgbToHsb:function(bi){var bc,bd,bf;var bm=bi[0];var bj=bi[1];var bb=bi[2];var bl=(bm>bj)?bm:bj;if(bb>bl){bl=bb;}
;var be=(bm<bj)?bm:bj;if(bb<be){be=bb;}
;bf=bl/255.0;if(bl!=0){bd=(bl-be)/bl;}
else {bd=0;}
;if(bd==0){bc=0;}
else {var bh=(bl-bm)/(bl-be);var bk=(bl-bj)/(bl-be);var bg=(bl-bb)/(bl-be);if(bm==bl){bc=bg-bk;}
else if(bj==bl){bc=2.0+bh-bg;}
else {bc=4.0+bk-bh;}
;bc=bc/6.0;if(bc<0){bc=bc+1.0;}
;}
;return [Math.round(bc*360),Math.round(bd*100),Math.round(bf*100)];}
,hsbToRgb:function(bn){var i,f,p,r,t;var bo=bn[0]/360;var bp=bn[1]/100;var bq=bn[2]/100;if(bo>=1.0){bo%=1.0;}
;if(bp>1.0){bp=1.0;}
;if(bq>1.0){bq=1.0;}
;var br=Math.floor(255*bq);var bs={};if(bp==0.0){bs.red=bs.green=bs.blue=br;}
else {bo*=6.0;i=Math.floor(bo);f=bo-i;p=Math.floor(br*(1.0-bp));r=Math.floor(br*(1.0-(bp*f)));t=Math.floor(br*(1.0-(bp*(1.0-f))));switch(i){case 0:bs.red=br;bs.green=t;bs.blue=p;break;case 1:bs.red=r;bs.green=br;bs.blue=p;break;case 2:bs.red=p;bs.green=br;bs.blue=t;break;case 3:bs.red=p;bs.green=r;bs.blue=br;break;case 4:bs.red=t;bs.green=p;bs.blue=br;break;case 5:bs.red=br;bs.green=p;bs.blue=r;break;};}
;return [bs.red,bs.green,bs.blue];}
,randomColor:function(){var r=Math.round(Math.random()*255);var g=Math.round(Math.random()*255);var b=Math.round(Math.random()*255);return this.rgbToRgbString([r,g,b]);}
}});}
)();
(function(){var a="oAnimationStart",b="animationend",c="MSAnimationStart",d="oRequestAnimationFrame",f="AnimationFillMode",g="MSAnimationEnd",h="requestAnimationFrame",j="mozRequestAnimationFrame",k="webkitAnimationEnd",l="css.animation.requestframe",m="AnimationPlayState",n="",o="MSAnimationIteration",p="animation",q="oAnimationEnd",r="@",s="animationiteration",t="webkitRequestAnimationFrame",u=" name",v="qx.bom.client.CssAnimation",w="css.animation",x="oAnimationIteration",y="webkitAnimationIteration",z="-keyframes",A="msRequestAnimationFrame",B="@keyframes",C="animationstart",D="webkitAnimationStart";qx.Bootstrap.define(v,{statics:{getSupport:function(){var name=qx.bom.client.CssAnimation.getName();if(name!=null){return {"name":name,"play-state":qx.bom.client.CssAnimation.getPlayState(),"start-event":qx.bom.client.CssAnimation.getAnimationStart(),"iteration-event":qx.bom.client.CssAnimation.getAnimationIteration(),"end-event":qx.bom.client.CssAnimation.getAnimationEnd(),"fill-mode":qx.bom.client.CssAnimation.getFillMode(),"keyframes":qx.bom.client.CssAnimation.getKeyFrames()};}
;return null;}
,getFillMode:function(){return qx.bom.Style.getPropertyName(f);}
,getPlayState:function(){return qx.bom.Style.getPropertyName(m);}
,getName:function(){return qx.bom.Style.getPropertyName(p);}
,getAnimationStart:function(){var E={"msAnimation":c,"WebkitAnimation":D,"MozAnimation":C,"OAnimation":a,"animation":C};return E[this.getName()];}
,getAnimationIteration:function(){var F={"msAnimation":o,"WebkitAnimation":y,"MozAnimation":s,"OAnimation":x,"animation":s};return F[this.getName()];}
,getAnimationEnd:function(){var G={"msAnimation":g,"WebkitAnimation":k,"MozAnimation":b,"OAnimation":q,"animation":b};return G[this.getName()];}
,getKeyFrames:function(){var H=qx.bom.Style.VENDOR_PREFIXES;var K=[];for(var i=0;i<H.length;i++ ){var J=r+qx.bom.Style.getCssName(H[i])+z;K.push(J);}
;K.unshift(B);var I=qx.bom.Stylesheet.createElement();for(var i=0;i<K.length;i++ ){try{qx.bom.Stylesheet.addRule(I,K[i]+u,n);return K[i];}
catch(e){}
;}
;return null;}
,getRequestAnimationFrame:function(){var L=[h,A,t,j,d];for(var i=0;i<L.length;i++ ){if(window[L[i]]!=undefined){return L[i];}
;}
;return null;}
},defer:function(M){qx.core.Environment.add(w,M.getSupport);qx.core.Environment.add(l,M.getRequestAnimationFrame);}
});}
)();
(function(){var a="fill-mode",b="repeat",c="timing",d="start",f="end",g="Anni",h="alternate",i="keep",j=":",k="} ",l="name",m="iteration-event",n="",o="origin",p="forwards",q="start-event",r="iteration",s="end-event",t="css.animation",u="ms ",v="% {",w=" ",x="linear",y=";",z="qx.bom.element.AnimationCss",A="keyframes";qx.Bootstrap.define(z,{statics:{__cv:null,__cw:g,__cx:0,__cy:{},__cz:{"scale":true,"rotate":true,"skew":true,"translate":true},__cA:qx.core.Environment.get(t),animateReverse:function(C,D,B){return this._animate(C,D,B,true);}
,animate:function(F,G,E){return this._animate(F,G,E,false);}
,_animate:function(H,O,N,J){this.__cF(O);{}
;var L=O.keep;if(L!=null&&(J||(O.alternate&&O.repeat%2==0))){L=100-L;}
;if(!this.__cv){this.__cv=qx.bom.Stylesheet.createElement();}
;var K=O.keyFrames;if(N==undefined){N=O.duration;}
;if(this.__cA!=null){var name=this.__cH(K,J);var I=name+w+N+u+O.repeat+w+O.timing+w+(O.delay?O.delay+u:n)+(O.alternate?h:n);qx.bom.Event.addNativeListener(H,this.__cA[q],this.__cB);qx.bom.Event.addNativeListener(H,this.__cA[m],this.__cC);qx.bom.Event.addNativeListener(H,this.__cA[s],this.__cD);{}
;H.style[qx.lang.String.camelCase(this.__cA[l])]=I;if(L&&L==100&&this.__cA[a]){H.style[this.__cA[a]]=p;}
;}
;var M=new qx.bom.element.AnimationHandle();M.desc=O;M.el=H;M.keep=L;H.$$animation=M;if(O.origin!=null){qx.bom.element.Transform.setOrigin(H,O.origin);}
;if(this.__cA==null){window.setTimeout(function(){qx.bom.element.AnimationCss.__cD({target:H});}
,0);}
;return M;}
,__cB:function(e){e.target.$$animation.emit(d,e.target);}
,__cC:function(e){if(e.target!=null&&e.target.$$animation!=null){e.target.$$animation.emit(r,e.target);}
;}
,__cD:function(e){var P=e.target;var Q=P.$$animation;if(!Q){return;}
;var S=Q.desc;if(qx.bom.element.AnimationCss.__cA!=null){var R=qx.lang.String.camelCase(qx.bom.element.AnimationCss.__cA[l]);P.style[R]=n;qx.bom.Event.removeNativeListener(P,qx.bom.element.AnimationCss.__cA[l],qx.bom.element.AnimationCss.__cD);}
;if(S.origin!=null){qx.bom.element.Transform.setOrigin(P,n);}
;qx.bom.element.AnimationCss.__cE(P,S.keyFrames[Q.keep]);P.$$animation=null;Q.el=null;Q.ended=true;Q.emit(f,P);}
,__cE:function(T,U){var W;for(var V in U){if(V in qx.bom.element.AnimationCss.__cz){if(!W){W={};}
;W[V]=U[V];}
else {T.style[qx.lang.String.camelCase(V)]=U[V];}
;}
;if(W){qx.bom.element.Transform.transform(T,W);}
;}
,__cF:function(X){if(!X.hasOwnProperty(h)){X.alternate=false;}
;if(!X.hasOwnProperty(i)){X.keep=null;}
;if(!X.hasOwnProperty(b)){X.repeat=1;}
;if(!X.hasOwnProperty(c)){X.timing=x;}
;if(!X.hasOwnProperty(o)){X.origin=null;}
;}
,__cG:null,__cH:function(frames,ba){var bd=n;for(var bh in frames){bd+=(ba?-(bh-100):bh)+v;var bc=frames[bh];var bf;for(var Y in bc){if(Y in this.__cz){if(!bf){bf={};}
;bf[Y]=bc[Y];}
else {var bg=qx.bom.Style.getPropertyName(Y);var bb=(bg!==null)?qx.bom.Style.getCssName(bg):n;bd+=(bb||Y)+j+bc[Y]+y;}
;}
;if(bf){bd+=qx.bom.element.Transform.getCss(bf);}
;bd+=k;}
;if(this.__cy[bd]){return this.__cy[bd];}
;var name=this.__cw+this.__cx++ ;var be=this.__cA[A]+w+name;qx.bom.Stylesheet.addRule(this.__cv,be,bd);this.__cy[bd]=name;return name;}
}});}
)();
(function(){var c="cm",d="mm",e="0",f="pt",g="pc",h="",k="%",l="em",m="qx.bom.element.AnimationJs",n="infinite",o="#",p="in",q="px",r="start",s="end",t="ex",u=";",v="undefined",w="iteration",y="string",z=":";qx.Bootstrap.define(m,{statics:{__cI:30,__cJ:[k,p,c,d,l,t,f,g,q],__cz:{"scale":true,"rotate":true,"skew":true,"translate":true},animate:function(B,C,A){return this._animate(B,C,A,false);}
,animateReverse:function(E,F,D){return this._animate(E,F,D,true);}
,_animate:function(G,Q,P,I){if(G.$$animation){return G.$$animation;}
;Q=qx.lang.Object.clone(Q,true);if(P==undefined){P=Q.duration;}
;var L=Q.keyFrames;var J=this.__cS(L);var K=this.__cR(P,J);var N=parseInt(P/K,10);this.__cK(L,G);var O=this.__cM(N,K,J,L,P,Q.timing);var H=new qx.bom.element.AnimationHandle();H.jsAnimation=true;if(I){O.reverse();H.reverse=true;}
;H.desc=Q;H.el=G;H.delta=O;H.stepTime=K;H.steps=N;G.$$animation=H;H.i=0;H.initValues={};H.repeatSteps=this.__cP(N,Q.repeat);var M=Q.delay||0;var self=this;H.delayId=window.setTimeout(function(){H.delayId=null;self.play(H);}
,M);return H;}
,__cK:function(V,R){var Y={};for(var U in V){for(var name in V[U]){var S=qx.bom.Style.getPropertyName(name);if(S&&S!=name){var X=qx.bom.Style.getCssName(S);V[U][X]=V[U][name];delete V[U][name];name=X;}
;if(Y[name]==undefined){var W=V[U][name];if(typeof W==y){Y[name]=this.__cN(W);}
else {Y[name]=h;}
;}
;}
;}
;for(var U in V){var T=V[U];for(var name in Y){if(T[name]==undefined){if(name in R.style){if(window.getComputedStyle){T[name]=getComputedStyle(R,null)[name];}
else {T[name]=R.style[name];}
;}
else {T[name]=R[name];}
;if(T[name]===h&&this.__cJ.indexOf(Y[name])!=-1){T[name]=e+Y[name];}
;}
;}
;}
;}
,__cL:function(bb){bb=qx.lang.Object.clone(bb);var bc;for(var name in bb){if(name in this.__cz){if(!bc){bc={};}
;bc[name]=bb[name];delete bb[name];}
;}
;if(bc){var ba=qx.bom.element.Transform.getCss(bc).split(z);if(ba.length>1){bb[ba[0]]=ba[1].replace(u,h);}
;}
;return bb;}
,__cM:function(bw,bh,bo,bi,be,bq){var bp=new Array(bw);var bm=1;bp[0]=this.__cL(bi[0]);var bt=bi[0];var bj=bi[bo[bm]];var bf=Math.floor(bo[bm]/(bh/be*100));var bs=1;for(var i=1;i<bp.length;i++ ){if(i*bh/be*100>bo[bm]){bt=bj;bm++ ;bj=bi[bo[bm]];bf=Math.floor(bo[bm]/(bh/be*100))-bf;bs=1;}
;bp[i]={};var bd;for(var name in bj){var br=bj[name]+h;if(name in this.__cz){if(!bd){bd={};}
;if(qx.Bootstrap.isArray(bt[name])){if(!qx.Bootstrap.isArray(bj[name])){bj[name]=[bj[name]];}
;bd[name]=[];for(var j=0;j<bj[name].length;j++ ){var bu=bj[name][j]+h;var x=bs/bf;bd[name][j]=this.__cO(bu,bt[name],bq,x);}
;}
else {var x=bs/bf;bd[name]=this.__cO(br,bt[name],bq,x);}
;}
else if(br.charAt(0)==o){var bl=qx.util.ColorUtil.cssStringToRgb(bt[name]);var bk=qx.util.ColorUtil.cssStringToRgb(br);var bg=[];for(var j=0;j<bl.length;j++ ){var bv=bl[j]-bk[j];var x=bs/bf;var bn=qx.bom.AnimationFrame.calculateTiming(bq,x);bg[j]=parseInt(bl[j]-bv*bn,10);}
;bp[i][name]=qx.util.ColorUtil.rgbToHexString(bg);}
else if(!isNaN(parseFloat(br))){var x=bs/bf;bp[i][name]=this.__cO(br,bt[name],bq,x);}
else {bp[i][name]=bt[name]+h;}
;}
;if(bd){var bx=qx.bom.element.Transform.getCss(bd).split(z);if(bx.length>1){bp[i][bx[0]]=bx[1].replace(u,h);}
;}
;bs++ ;}
;bp[bp.length-1]=this.__cL(bi[100]);return bp;}
,__cN:function(by){return by.substring((parseFloat(by)+h).length,by.length);}
,__cO:function(bC,bB,bz,x){var bA=parseFloat(bC)-parseFloat(bB);return (parseFloat(bB)+bA*qx.bom.AnimationFrame.calculateTiming(bz,x))+this.__cN(bC);}
,play:function(bD){bD.emit(r,bD.el);var bE=window.setInterval(function(){bD.repeatSteps-- ;var bF=bD.delta[bD.i%bD.steps];if(bD.i===0){for(var name in bF){if(bD.initValues[name]===undefined){if(bD.el[name]!==undefined){bD.initValues[name]=bD.el[name];}
else if(qx.bom.element.Style){bD.initValues[name]=qx.bom.element.Style.get(bD.el,qx.lang.String.camelCase(name));}
else {bD.initValues[name]=bD.el.style[qx.lang.String.camelCase(name)];}
;}
;}
;}
;qx.bom.element.AnimationJs.__cQ(bD.el,bF);bD.i++ ;if(bD.i%bD.steps==0){bD.emit(w,bD.el);if(bD.desc.alternate){bD.delta.reverse();}
;}
;if(bD.repeatSteps<0){qx.bom.element.AnimationJs.stop(bD);}
;}
,bD.stepTime);bD.animationId=bE;return bD;}
,pause:function(bG){window.clearInterval(bG.animationId);bG.animationId=null;return bG;}
,stop:function(bK){var bJ=bK.desc;var bH=bK.el;var bI=bK.initValues;if(bK.animationId){window.clearInterval(bK.animationId);}
;if(bK.delayId){window.clearTimeout(bK.delayId);}
;if(bH==undefined){return bK;}
;var bL=bJ.keep;if(bL!=undefined&&!bK.stopped){if(bK.reverse||(bJ.alternate&&bJ.repeat&&bJ.repeat%2==0)){bL=100-bL;}
;this.__cQ(bH,bJ.keyFrames[bL]);}
else {this.__cQ(bH,bI);}
;bH.$$animation=null;bK.el=null;bK.ended=true;bK.animationId=null;bK.emit(s,bH);return bK;}
,__cP:function(bN,bM){if(bM==undefined){return bN;}
;if(bM==n){return Number.MAX_VALUE;}
;return bN*bM;}
,__cQ:function(bP,bO){for(var bQ in bO){if(bO[bQ]===undefined){continue;}
;if(typeof bP.style[bQ]===v&&bQ in bP){bP[bQ]=bO[bQ];continue;}
;var name=qx.bom.Style.getPropertyName(bQ)||bQ;if(qx.bom.element.Style){qx.bom.element.Style.set(bP,name,bO[bQ]);}
else {bP.style[name]=bO[bQ];}
;}
;}
,__cR:function(bT,bR){var bU=100;for(var i=0;i<bR.length-1;i++ ){bU=Math.min(bU,bR[i+1]-bR[i]);}
;var bS=bT*bU/100;while(bS>this.__cI){bS=bS/2;}
;return Math.round(bS);}
,__cS:function(bW){var bV=Object.keys(bW);for(var i=0;i<bV.length;i++ ){bV[i]=parseInt(bV[i],10);}
;bV.sort(function(a,b){return a-b;}
);return bV;}
}});}
)();
(function(){var b="ease-in-out",c="Number",d="css.animation.requestframe",e="qx.bom.AnimationFrame",f="frame",g="end",h="linear",j="ease-in",k="ease-out";qx.Bootstrap.define(e,{extend:qx.event.Emitter,events:{"end":undefined,"frame":c},members:{__cT:false,startSequence:function(l){this.__cT=false;var m=+(new Date());var n=function(p){if(this.__cT){this.id=null;return;}
;if(p>=m+l){this.emit(g);this.id=null;}
else {var o=Math.max(p-m,0);this.emit(f,o);this.id=qx.bom.AnimationFrame.request(n,this);}
;}
;this.id=qx.bom.AnimationFrame.request(n,this);}
,cancelSequence:function(){this.__cT=true;}
},statics:{TIMEOUT:30,calculateTiming:function(q,x){if(q==j){var a=[3.1223e-7,0.0757,1.2646,-0.167,-0.4387,0.2654];}
else if(q==k){var a=[-7.0198e-8,1.652,-0.551,-0.0458,0.1255,-0.1807];}
else if(q==h){return x;}
else if(q==b){var a=[2.482e-7,-0.2289,3.3466,-1.0857,-1.7354,0.7034];}
else {var a=[-0.0021,0.2472,9.8054,-21.6869,17.7611,-5.1226];}
;var y=0;for(var i=0;i<a.length;i++ ){y+=a[i]*Math.pow(x,i);}
;return y;}
,request:function(r,t){var s=qx.core.Environment.get(d);var u=function(v){if(v<1e10){v=this.__cU+v;}
;v=v||+(new Date());r.call(t,v);}
;if(s){return window[s](u);}
else {return window.setTimeout(function(){u();}
,qx.bom.AnimationFrame.TIMEOUT);}
;}
},defer:function(w){w.__cU=window.performance&&performance.timing&&performance.timing.navigationStart;if(!w.__cU){w.__cU=Date.now();}
;}
});}
)();
(function(){var a="backface-visibility",b="name",c="perspective",d="css.transform.3d",e="visible",f="",g="(",h="px",j="css.transform",k=" ",l="qx.bom.element.Transform",m="hidden",n="Z",o=";",p="perspective-origin",q=") ",r="X",s="Y",t="origin",u="style",v=":";qx.Bootstrap.define(l,{statics:{__cV:[r,s,n],__cW:qx.core.Environment.get(j),transform:function(w,y){var z=this.__cX(y);if(this.__cW!=null){var x=this.__cW[b];w.style[x]=z;}
;}
,translate:function(A,B){this.transform(A,{translate:B});}
,scale:function(C,D){this.transform(C,{scale:D});}
,rotate:function(E,F){this.transform(E,{rotate:F});}
,skew:function(G,H){this.transform(G,{skew:H});}
,getCss:function(J){var K=this.__cX(J);if(this.__cW!=null){var I=this.__cW[b];return qx.bom.Style.getCssName(I)+v+K+o;}
;return f;}
,setOrigin:function(L,M){if(this.__cW!=null){L.style[this.__cW[t]]=M;}
;}
,getOrigin:function(N){if(this.__cW!=null){return N.style[this.__cW[t]];}
;return f;}
,setStyle:function(O,P){if(this.__cW!=null){O.style[this.__cW[u]]=P;}
;}
,getStyle:function(Q){if(this.__cW!=null){return Q.style[this.__cW[u]];}
;return f;}
,setPerspective:function(R,S){if(this.__cW!=null){R.style[this.__cW[c]]=S+h;}
;}
,getPerspective:function(T){if(this.__cW!=null){return T.style[this.__cW[c]];}
;return f;}
,setPerspectiveOrigin:function(U,V){if(this.__cW!=null){U.style[this.__cW[p]]=V;}
;}
,getPerspectiveOrigin:function(W){if(this.__cW!=null){var X=W.style[this.__cW[p]];if(X!=f){return X;}
else {var ba=W.style[this.__cW[p]+r];var Y=W.style[this.__cW[p]+s];if(ba!=f){return ba+k+Y;}
;}
;}
;return f;}
,setBackfaceVisibility:function(bb,bc){if(this.__cW!=null){bb.style[this.__cW[a]]=bc?e:m;}
;}
,getBackfaceVisibility:function(bd){if(this.__cW!=null){return bd.style[this.__cW[a]]==e;}
;return true;}
,__cX:function(bg){var bh=f;for(var be in bg){var bf=bg[be];if(qx.Bootstrap.isArray(bf)){for(var i=0;i<bf.length;i++ ){if(bf[i]==undefined||(i==2&&!qx.core.Environment.get(d))){continue;}
;bh+=be+this.__cV[i]+g;bh+=bf[i];bh+=q;}
;}
else {bh+=be+g+bg[be]+q;}
;}
;return bh;}
}});}
)();
(function(){var c="GROW_WIDTH",d="height",e="px",f="0px",g="' ",h="paddingLeft",k="animation-restore-",l="animationEnd",m="fontSize",n="' is not a pre-defined named animation!",o="qx.debug",p="GROW",q="get",r="SHRINK",s="baselib.Animation",t="width",u="SHRINK_WIDTH",v="paddingBottom",w="animate",x="paddingTop",y="GROW_HEIGHT",z="none",A="paddingRight",B="hidden",C="linear",D="SHRINK_HEIGHT",E="animateReverse",F="absolute";qx.Bootstrap.define(s,{statics:{__cY:{duration:400,timing:C,keep:100},__da:{"GROW":100,"GROW_WIDTH":100,"GROW_HEIGHT":100,"SHRINK":0,"SHRINK_WIDTH":0,"SHRINK_HEIGHT":0},__db:[t,d,m,h,x,A,v],slideUp:function(G,H){return this.animateNamed(D,G,H);}
,slideDown:function(I,J){return this.animateNamed(y,I,J);}
,animateNamed:function(O,L,N){if(baselib.Animation.__da[O]!==undefined){var K;var S;var R=null;var M=null;switch(O){case p:case r:S=[t,d,m,h,x,A,v];break;case c:case u:S=[t,m,h,A];R=d;break;case y:case D:S=[d,m,x,v];R=t;break;};var T=baselib.Animation.__da[O]===100;baselib.Animation.__de(this);K=baselib.Animation.__dd(this,S);var Q=baselib.Animation.__dc(this,S,K);baselib.Animation.__df(this,S);var P=this;this.forEach(function(X,U){var W=qxWeb(X);var V=qxWeb.object.clone(baselib.Animation.__cY);V.keyFrames=Q[U];if(!L){L=V.duration;}
;if(N!==undefined&&N!==C){V.timing=N;}
;W.show();if(R!==null){M=X.style[R];var Y;if(R===d||R===t){Y=W[q+qxWeb.string.firstUp(R)]()+e;}
else {Y=W.getStyle(R);}
;W.setStyle(R,Y);}
;var ba=X.style.opacity;V.keyFrames[0].opacity=0;V.keyFrames[100].opacity=1;var bb=T?w:E;W[bb](V,L).once(l,function(){if(!T){qxWeb(X).hide();}
;baselib.Animation.__df(this,S);X.style.opacity=ba;if(M!==null){X.style[R]=M;}
;if(U===(P.length-1)){P.emit(l);}
;}
,this);}
,P);}
else {if(qxWeb.env.get(o)&&qxWeb.log){qxWeb.log.debug(g+O+n);}
;}
;return this;}
,__dc:function(be,bc,bd){var bf=[];be.forEach(function(bg,bi){var bh={'0':{},'100':{}};for(var i=0,j=bc.length;i<j;i++ ){bh[0][bc[i]]=f;bh[100][bc[i]]=bd[bi][i];}
;bf.push(bh);}
);return bf;}
,__dd:function(bl,bk){var bj=[];bl.forEach(function(bq){var bp=[];var bo=qxWeb(bq);var bn=bq.style.display!==z;var bm;if(!bn){bm={position:bq.style.position,visibility:bq.style.visibility};bo.setStyles({position:F,visbility:B});bo.show();}
;for(var i=0,j=bk.length;i<j;i++ ){if(bk[i]===t){bp.push(bo.getWidth()+e);}
else if(bk[i]===d){bp.push(bo.getHeight()+e);}
else {bp.push(bo.getStyle(bk[i]));}
;}
;bj.push(bp);if(!bn){bo.setStyles(bm);bo.hide();}
;}
);return bj;}
,__de:function(bs){var br=baselib.Animation.__db;bs.forEach(function(bv){var bt=qxWeb(bv);for(var a=0,b=br.length;a<b;a++ ){var bu;if(br[a]===t){bu=(bt.getWidth()-parseInt(bt.getStyle(h),10)-parseInt(bt.getStyle(A),10))+e;}
else if(br[a]===d){bu=(bt.getHeight()-parseInt(bt.getStyle(x),10)-parseInt(bt.getStyle(v),10))+e;}
else {bu=bt.getStyle(br[a]);}
;bt.setProperty(k+br[a],bv.style[br[a]]);}
;}
);}
,__df:function(bx,bw){bx.forEach(function(bA){var by=qxWeb(bA);var bz;for(var a=0,b=bw.length;a<b;a++ ){bz=by.getProperty(k+bw[a]);bA.style[bw[a]]=bz;}
;}
);}
},defer:function(bB){qxWeb.$attach({"animateNamed":bB.animateNamed,"slideUp":bB.slideUp,"slideDown":bB.slideDown});}
});}
)();

})();