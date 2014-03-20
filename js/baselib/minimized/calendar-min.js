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
(function(){var a="Tue",b="keydown",c="-weekend",d="Mon",f="minDate",g="Given date ",h="blur",j="changeValue",k="Space",l="<td colspan='1' class='{{cssPrefix}}-prev-container'><button class='{{cssPrefix}}-prev' {{prevDisabled}} title='Previous Month'>&lt;</button></td>",m="{{#row}}<td class='{{cssPrefix}}-dayname'>{{.}}</td>{{/row}}",n="-next",o="<tr>",p=".qx-calendar-invalid",q="dayRow",r="Sun",s=" ",t="-today",u="-weekday",v=" is earlier than configured minDate ",w=" is later than configured maxDate ",x="-day[value='",y="May",z="</tr>",A="table",B="<table class='{{cssPrefix}}-container'><thead>{{{thead}}}</thead><tbody>{{{tbody}}}</tbody></table>",C="value",D="tabindex",E="disabled",F="September",G="October",H="']",I="December",J="monthNames",K="",L="April",M="<td colspan='5' class='{{cssPrefix}}-month'>{{month}} {{year}}</td>",N="Thu",O="Sat",P="row",Q="November",R="June",S="Right",T="qx.ui.website.Calendar",U="-selected",V="shownValue",W="focus",X="The given date's week day is not selectable.",Y="March",bB="td",bC="click",bD="{{#row}}<td class='{{cssClass}}'><button class='{{cssPrefix}}-day' {{disabled}} value='{{date}}'>{{day}}</button></td>{{/row}}",bx="-othermonth",by="July",bz="-prev",bA="dayNames",bH="August",bI="controls",bJ="> td > .",bP="January",bE="February",bF="Wed",bG="Date",bv="maxDate",bL="Left",bw=".",bM="Fri",bN="selectableWeekDays",bO="-day",bK="<td colspan='1' class='{{cssPrefix}}-next-container'><button class='{{cssPrefix}}-next' {{nextDisabled}} title='Next Month'>&gt;</button></td>";qx.Bootstrap.define(T,{extend:qx.ui.website.Widget,statics:{_templates:{controls:o+l+M+bK+z,dayRow:o+m+z,row:o+bD+z,table:B},_config:{monthNames:[bP,bE,Y,L,y,R,by,bH,F,G,Q,I],dayNames:[d,a,bF,N,bM,O,r],minDate:null,maxDate:null,selectableWeekDays:[0,1,2,3,4,5,6]},calendar:function(bQ){var bR=new qx.ui.website.Calendar(this);bR.init();if(bQ!==undefined){bR.setValue(bQ);}
;return bR;}
},construct:function(bT,bS){qx.ui.website.Widget.call(this,bT,bS);}
,events:{"changeValue":bG},members:{init:function(){if(!qx.ui.website.Widget.prototype.init.call(this)){return false;}
;var bU=new Date();this._normalizeDate(bU);this._forEachElementWrapped(function(bV){bV.showValue(bU);}
);return true;}
,render:function(){var bX=this.getConfig(f);if(bX){this._normalizeDate(bX);}
;var bW=this.getConfig(bv);if(bW){this._normalizeDate(bW);}
;this.showValue(this.getProperty(V));return this;}
,setValue:function(ca){this._normalizeDate(ca);if(this.getConfig(bN).indexOf(ca.getDay())==-1){throw new Error(X);}
;var cb=this.getConfig(f);var bY=this.getConfig(bv);if(cb){this._normalizeDate(cb);if(ca<cb){throw new Error(g+ca.toDateString()+v+cb.toDateString());}
;}
;if(bY){this._normalizeDate(bY);if(ca>bY){throw new Error(g+ca.toDateString()+w+bY.toDateString());}
;}
;this.setProperty(C,ca);this.showValue(ca);this.emit(j,ca);return this;}
,getValue:function(){var cc=this.getProperty(C);return cc?new Date(cc):null;}
,showValue:function(ce){this.setProperty(V,ce);var cd=this.getCssPrefix();this._forEachElementWrapped(function(cf){if(cf.getAttribute(D)<0){cf.setAttribute(D,0);}
;cf.find(bw+cd+bz).offWidget(bC,this._prevMonth,cf);cf.find(bw+cd+n).offWidget(bC,this._nextMonth,cf);cf.find(bw+cd+bO).offWidget(bC,this._selectDay,cf);cf.offWidget(W,this._onFocus,cf,true).offWidget(h,this._onBlur,cf,true);}
,this);this.setHtml(this._getTable(ce));this._forEachElementWrapped(function(cg){cg.find(bw+cd+bz).onWidget(bC,this._prevMonth,cg);cg.find(bw+cd+n).onWidget(bC,this._nextMonth,cg);cg.find(bB).not(p).find(bw+cd+bO).onWidget(bC,this._selectDay,cg);cg.onWidget(W,this._onFocus,cg,true).onWidget(h,this._onBlur,cg,true);}
,this);return this;}
,_prevMonth:function(){var ch=this.getProperty(V);this.showValue(new Date(ch.getFullYear(),ch.getMonth()-1));}
,_nextMonth:function(){var ci=this.getProperty(V);this.showValue(new Date(ci.getFullYear(),ci.getMonth()+1));}
,_selectDay:function(e){var ck=qxWeb(e.getTarget());var cj=ck.getAttribute(C);var cl=new Date(cj);this.setValue(cl);this.find(bw+this.getCssPrefix()+x+cj+H).focus();}
,_getTable:function(cm){var cp=qxWeb.template.render(this.getTemplate(bI),this._getControlsData(cm));var co=qxWeb.template.render(this.getTemplate(q),this._getDayRowData());var cn={thead:cp+co,tbody:this._getWeekRows(cm),cssPrefix:this.getCssPrefix()};return qxWeb.template.render(this.getTemplate(A),cn);}
,_getControlsData:function(cq){var ct=K;var cs=this.getConfig(f);if(cs){this._normalizeDate(cs);if(cq.getMonth()<=cs.getMonth()){ct=E;}
;}
;var cu=K;var cr=this.getConfig(bv);if(cr){this._normalizeDate(cr);if(cq.getMonth()>=cr.getMonth()){cu=E;}
;}
;return {month:this.getConfig(J)[cq.getMonth()],year:cq.getFullYear(),cssPrefix:this.getCssPrefix(),prevDisabled:ct,nextDisabled:cu};}
,_getDayRowData:function(){return {row:this.getConfig(bA),cssPrefix:this.getCssPrefix()};}
,_getWeekRows:function(cB){var cC=[];var cE=new Date();var cA=this._getHelpDate(cB);var cw=this.getCssPrefix();var cF=this.getConfig(f);if(cF){this._normalizeDate(cF);}
;var cx=this.getConfig(bv);if(cx){this._normalizeDate(cx);}
;for(var cv=0;cv<6;cv++ ){var cD={row:[]};for(var i=0;i<7;i++ ){var cy=cA.getMonth()!==cB.getMonth()?cw+bx:K;if(this.getProperty(C)){cy+=cA.toDateString()===this.getProperty(C).toDateString()?s+cw+U:K;}
;cy+=cE.toDateString()===cA.toDateString()?s+cw+t:K;var cz=K;if((cF&&cA<cF)||(cx&&cA>cx)||this.getConfig(bN).indexOf(cA.getDay())==-1){cz=E;}
;cy+=(cA.getDay()===0||cA.getDay()===6)?s+cw+c:s+cw+u;cD.row.push({day:cA.getDate(),date:cA.toDateString(),cssPrefix:cw,cssClass:cy,disabled:cz});cA.setDate(cA.getDate()+1);}
;cC.push(qxWeb.template.render(this.getTemplate(P),cD));}
;return cC.join(K);}
,_getHelpDate:function(cG){var cI=1;var cK=new Date(cG.getFullYear(),cG.getMonth(),1);var cH=cK.getDay();cK=new Date(cG.getFullYear(),cG.getMonth(),1,0,0,0);var cJ=(7+cH-cI)%7;cK.setDate(cK.getDate()-cJ);return cK;}
,_normalizeDate:function(cL){cL.setHours(0);cL.setMinutes(0);cL.setSeconds(0);cL.setMilliseconds(0);}
,_onFocus:function(e){this.onWidget(b,this._onKeyDown,this);}
,_onBlur:function(e){if(this.contains(e.getRelatedTarget()).length===0){this.offWidget(b,this._onKeyDown,this);}
;}
,_onKeyDown:function(e){var cM=this.getCssPrefix();var cN=qxWeb(e.getTarget());var cO=e.getKeyIdentifier();var cP=cN.hasClass(cM+bO);if(cP){if(cO==k){this._selectDay(e);}
else if(cO==S){e.preventDefault();this._focusNextDay(cN);}
else if(cO==bL){e.preventDefault();this._focusPrevDay(cN);}
;}
else {if(cO==k){if(cN.hasClass(cM+bz)){e.preventDefault();this._prevMonth();this.find(bw+cM+bz).focus();}
else if(cN.hasClass(cM+n)){e.preventDefault();this._nextMonth();this.find(bw+cM+n).focus();}
;}
else if(cO==S){e.preventDefault();this._nextMonth();this.find(bw+cM+n).focus();}
else if(cO==bL){e.preventDefault();this._prevMonth();this.find(bw+cM+bz).focus();}
;}
;e.stopPropagation();}
,_focusNextDay:function(cV){var cU=this.getCssPrefix();var cT=cV.getParents().getNext();if(cT.length>0){cT.getChildren(bw+cU+bO).focus();}
else {var cS=cV.getParents().getParents().getNext();if(cS.length>0){cS.find(bJ+cU+bO).getFirst().focus();}
else {this._nextMonth();var cR=new Date(cV.getAttribute(C));var cW=new Date(cR.valueOf());cW.setDate(cR.getDate()+1);var cQ=cW.toDateString();this.find(bw+cU+x+cQ+H).focus();}
;}
;}
,_focusPrevDay:function(dd){var dc=this.getCssPrefix();var db=dd.getParents().getPrev();if(db.length>0){db.getChildren(bw+dc+bO).focus();}
else {var cY=dd.getParents().getParents().getPrev();if(cY.length>0){cY.find(bJ+dc+bO).getLast().focus();}
else {this._prevMonth();var da=new Date(dd.getAttribute(C));var de=new Date(da.valueOf());de.setDate(da.getDate()-1);var cX=de.toDateString();this.find(bw+dc+x+cX+H).focus();}
;}
;}
,dispose:function(){var df=this.getCssPrefix();this._forEachElementWrapped(function(dg){dg.find(bw+df+bz).offWidget(bC,this._prevMonth,dg);dg.find(bw+df+n).offWidget(bC,this._nextMonth,dg);dg.find(bw+df+bO).offWidget(bC,this._selectDay,dg);dg.offWidget(W,this._onFocus,dg,true).offWidget(h,this._onBlur,dg,true).offWidget(b,this._onKeyDown,dg);}
,this);this.setHtml(K);return qx.ui.website.Widget.prototype.dispose.call(this);}
},defer:function(dh){qxWeb.$attach({calendar:dh.calendar});}
});}
)();

})();