/*! KineticJS v4.7.4 2013-11-08 http://www.kineticjs.com by Eric Rowell @ericdrowell - MIT License https://github.com/ericdrowell/KineticJS/wiki/License*/
var Kinetic={};!function(){Kinetic={version:"4.7.4",stages:[],idCounter:0,ids:{},names:{},shapes:{},listenClickTap:!1,inDblClickWindow:!1,enableTrace:!1,traceArrMax:100,dblClickWindow:400,pixelRatio:void 0,UA:function(){var a=navigator.userAgent.toLowerCase(),b=/(chrome)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||a.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}}(),Filters:{},Node:function(a){this._init(a)},Shape:function(a){this.__init(a)},Container:function(a){this.__init(a)},Stage:function(a){this.___init(a)},Layer:function(a){this.___init(a)},Group:function(a){this.___init(a)},isDragging:function(){var a=Kinetic.DD;return a?a.isDragging:!1},isDragReady:function(){var a=Kinetic.DD;return a?!!a.node:!1},_addId:function(a,b){void 0!==b&&(this.ids[b]=a)},_removeId:function(a){void 0!==a&&delete this.ids[a]},_addName:function(a,b){void 0!==b&&(void 0===this.names[b]&&(this.names[b]=[]),this.names[b].push(a))},_removeName:function(a,b){if(void 0!==a){var c=this.names[a];if(void 0!==c){for(var d=0;d<c.length;d++){var e=c[d];e._id===b&&c.splice(d,1)}0===c.length&&delete this.names[a]}}}}}(),function(a,b){"object"==typeof exports?module.exports=b():"function"==typeof define&&define.amd?define(b):a.returnExports=b()}(this,function(){return Kinetic});/*! KineticJS v4.7.4 2013-11-08 http://www.kineticjs.com by Eric Rowell @ericdrowell - MIT License https://github.com/ericdrowell/KineticJS/wiki/License*/
!function(){Kinetic.Collection=function(){var a=[].slice.call(arguments),b=a.length,c=0;for(this.length=b;b>c;c++)this[c]=a[c];return this},Kinetic.Collection.prototype=[],Kinetic.Collection.prototype.each=function(a){for(var b=0;b<this.length;b++)a(this[b],b)},Kinetic.Collection.prototype.toArray=function(){var a,b=[],c=this.length;for(a=0;c>a;a++)b.push(this[a]);return b},Kinetic.Collection.toCollection=function(a){var b,c=new Kinetic.Collection,d=a.length;for(b=0;d>b;b++)c.push(a[b]);return c},Kinetic.Collection.mapMethods=function(a){var b,c=a.length;for(b=0;c>b;b++)!function(b){var c=a[b];Kinetic.Collection.prototype[c]=function(){var a,b=this.length;for(args=[].slice.call(arguments),a=0;b>a;a++)this[a][c].apply(this[a],args)}}(b)},Kinetic.Transform=function(){this.m=[1,0,0,1,0,0]},Kinetic.Transform.prototype={translate:function(a,b){this.m[4]+=this.m[0]*a+this.m[2]*b,this.m[5]+=this.m[1]*a+this.m[3]*b},scale:function(a,b){this.m[0]*=a,this.m[1]*=a,this.m[2]*=b,this.m[3]*=b},rotate:function(a){var b=Math.cos(a),c=Math.sin(a),d=this.m[0]*b+this.m[2]*c,e=this.m[1]*b+this.m[3]*c,f=this.m[0]*-c+this.m[2]*b,g=this.m[1]*-c+this.m[3]*b;this.m[0]=d,this.m[1]=e,this.m[2]=f,this.m[3]=g},getTranslation:function(){return{x:this.m[4],y:this.m[5]}},skew:function(a,b){var c=this.m[0]+this.m[2]*b,d=this.m[1]+this.m[3]*b,e=this.m[2]+this.m[0]*a,f=this.m[3]+this.m[1]*a;this.m[0]=c,this.m[1]=d,this.m[2]=e,this.m[3]=f},multiply:function(a){var b=this.m[0]*a.m[0]+this.m[2]*a.m[1],c=this.m[1]*a.m[0]+this.m[3]*a.m[1],d=this.m[0]*a.m[2]+this.m[2]*a.m[3],e=this.m[1]*a.m[2]+this.m[3]*a.m[3],f=this.m[0]*a.m[4]+this.m[2]*a.m[5]+this.m[4],g=this.m[1]*a.m[4]+this.m[3]*a.m[5]+this.m[5];this.m[0]=b,this.m[1]=c,this.m[2]=d,this.m[3]=e,this.m[4]=f,this.m[5]=g},invert:function(){var a=1/(this.m[0]*this.m[3]-this.m[1]*this.m[2]),b=this.m[3]*a,c=-this.m[1]*a,d=-this.m[2]*a,e=this.m[0]*a,f=a*(this.m[2]*this.m[5]-this.m[3]*this.m[4]),g=a*(this.m[1]*this.m[4]-this.m[0]*this.m[5]);this.m[0]=b,this.m[1]=c,this.m[2]=d,this.m[3]=e,this.m[4]=f,this.m[5]=g},getMatrix:function(){return this.m},setAbsolutePosition:function(a,b){var c=this.m[0],d=this.m[1],e=this.m[2],f=this.m[3],g=this.m[4],h=this.m[5],i=(c*(b-h)-d*(a-g))/(c*f-d*e),j=(a-g-e*i)/c;this.translate(j,i)}};var a="canvas",b="2d",c="[object Array]",d="[object Number]",e="[object String]",f=Math.PI/180,g=180/Math.PI,h="#",i="",j="0",k="Kinetic warning: ",l="Kinetic error: ",m="rgb(",n={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,0,255],olive:[128,128,0],yellow:[255,255,0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]},o=/rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/;Kinetic.Util={_isElement:function(a){return!(!a||1!=a.nodeType)},_isFunction:function(a){return!!(a&&a.constructor&&a.call&&a.apply)},_isObject:function(a){return!!a&&a.constructor==Object},_isArray:function(a){return Object.prototype.toString.call(a)==c},_isNumber:function(a){return Object.prototype.toString.call(a)==d},_isString:function(a){return Object.prototype.toString.call(a)==e},_hasMethods:function(a){var b,c=[];for(b in a)this._isFunction(a[b])&&c.push(b);return c.length>0},_isInDocument:function(a){for(;a=a.parentNode;)if(a==document)return!0;return!1},_simplifyArray:function(a){var b,c,d=[],e=a.length,f=Kinetic.Util;for(b=0;e>b;b++)c=a[b],f._isNumber(c)?c=Math.round(1e3*c)/1e3:f._isString(c)||(c=c.toString()),d.push(c);return d},_getXY:function(a){if(this._isNumber(a))return{x:a,y:a};if(this._isArray(a)){if(1===a.length){var b=a[0];if(this._isNumber(b))return{x:b,y:b};if(this._isArray(b))return{x:b[0],y:b[1]};if(this._isObject(b))return b}else if(a.length>=2)return{x:a[0],y:a[1]}}else if(this._isObject(a))return a;return null},_getSize:function(a){if(this._isNumber(a))return{width:a,height:a};if(this._isArray(a))if(1===a.length){var b=a[0];if(this._isNumber(b))return{width:b,height:b};if(this._isArray(b)){if(b.length>=4)return{width:b[2],height:b[3]};if(b.length>=2)return{width:b[0],height:b[1]}}else if(this._isObject(b))return b}else{if(a.length>=4)return{width:a[2],height:a[3]};if(a.length>=2)return{width:a[0],height:a[1]}}else if(this._isObject(a))return a;return null},_getPoints:function(a){var b,c,d=[];if(void 0===a)return[];if(c=a.length,this._isArray(a[0])){for(b=0;c>b;b++)d.push({x:a[b][0],y:a[b][1]});return d}if(this._isObject(a[0]))return a;for(b=0;c>b;b+=2)d.push({x:a[b],y:a[b+1]});return d},_getImage:function(c,d){var e,f;c?this._isElement(c)?d(c):this._isString(c)?(e=new Image,e.onload=function(){d(e)},e.src=c):c.data?(f=document.createElement(a),f.width=c.width,f.height=c.height,_context=f.getContext(b),_context.putImageData(c,0,0),this._getImage(f.toDataURL(),d)):d(null):d(null)},_rgbToHex:function(a,b,c){return((1<<24)+(a<<16)+(b<<8)+c).toString(16).slice(1)},_hexToRgb:function(a){a=a.replace(h,i);var b=parseInt(a,16);return{r:255&b>>16,g:255&b>>8,b:255&b}},getRandomColor:function(){for(var a=(16777215*Math.random()<<0).toString(16);a.length<6;)a=j+a;return h+a},get:function(a,b){return void 0===a?b:a},getRGB:function(a){var b;return a in n?(b=n[a],{r:b[0],g:b[1],b:b[2]}):a[0]===h?this._hexToRgb(a.substring(1)):a.substr(0,4)===m?(b=o.exec(a.replace(/ /g,"")),{r:parseInt(b[1],10),g:parseInt(b[2],10),b:parseInt(b[3],10)}):{r:0,g:0,b:0}},_merge:function(a,b){var c=this._clone(b);for(var d in a)c[d]=this._isObject(a[d])?this._merge(a[d],c[d]):a[d];return c},_clone:function(a){var b={};for(var c in a)b[c]=this._isObject(a[c])?this._clone(a[c]):a[c];return b},_degToRad:function(a){return a*f},_radToDeg:function(a){return a*g},_capitalize:function(a){return a.charAt(0).toUpperCase()+a.slice(1)},error:function(a){throw new Error(l+a)},warn:function(a){window.console&&console.warn&&console.warn(k+a)},extend:function(a,b){for(var c in b.prototype)c in a.prototype||(a.prototype[c]=b.prototype[c])},addMethods:function(a,b){var c;for(c in b)a.prototype[c]=b[c]},_getControlPoints:function(a,b,c,d){var e=a.x,f=a.y,g=b.x,h=b.y,i=c.x,j=c.y,k=Math.sqrt(Math.pow(g-e,2)+Math.pow(h-f,2)),l=Math.sqrt(Math.pow(i-g,2)+Math.pow(j-h,2)),m=d*k/(k+l),n=d*l/(k+l),o=g-m*(i-e),p=h-m*(j-f),q=g+n*(i-e),r=h+n*(j-f);return[{x:o,y:p},{x:q,y:r}]},_expandPoints:function(a,b){var c,d,e=a.length,f=[];for(c=1;e-1>c;c++)d=Kinetic.Util._getControlPoints(a[c-1],a[c],a[c+1],b),f.push(d[0]),f.push(a[c]),f.push(d[1]);return f},_removeLastLetter:function(a){return a.substring(0,a.length-1)}}}();/*! KineticJS v4.7.4 2013-11-08 http://www.kineticjs.com by Eric Rowell @ericdrowell - MIT License https://github.com/ericdrowell/KineticJS/wiki/License*/
!function(){var a=document.createElement("canvas"),b=a.getContext("2d"),c=window.devicePixelRatio||1,d=b.webkitBackingStorePixelRatio||b.mozBackingStorePixelRatio||b.msBackingStorePixelRatio||b.oBackingStorePixelRatio||b.backingStorePixelRatio||1,e=c/d;Kinetic.Canvas=function(a){this.init(a)},Kinetic.Canvas.prototype={init:function(a){a=a||{};var b=a.pixelRatio||Kinetic.pixelRatio||e;this.pixelRatio=b,this._canvas=document.createElement("canvas"),this._canvas.style.padding=0,this._canvas.style.margin=0,this._canvas.style.border=0,this._canvas.style.background="transparent",this._canvas.style.position="absolute",this._canvas.style.top=0,this._canvas.style.left=0},getContext:function(){return this.context},getPixelRatio:function(){return this.pixelRatio},setPixelRatio:function(a){this.pixelRatio=a,this.setSize(this.getWidth(),this.getHeight())},setWidth:function(a){this.width=this._canvas.width=a*this.pixelRatio,this._canvas.style.width=a+"px"},setHeight:function(a){this.height=this._canvas.height=a*this.pixelRatio,this._canvas.style.height=a+"px"},getWidth:function(){return this.width},getHeight:function(){return this.height},setSize:function(a,b){this.setWidth(a),this.setHeight(b)},toDataURL:function(a,b){try{return this._canvas.toDataURL(a,b)}catch(c){try{return this._canvas.toDataURL()}catch(d){return Kinetic.Util.warn("Unable to get data URL. "+d.message),""}}}},Kinetic.SceneCanvas=function(a){a=a||{};var b=a.width||0,c=a.height||0;Kinetic.Canvas.call(this,a),this.context=new Kinetic.SceneContext(this),this.setSize(b,c)},Kinetic.SceneCanvas.prototype={setWidth:function(a){var b=this.pixelRatio,c=this.getContext()._context;Kinetic.Canvas.prototype.setWidth.call(this,a),c.scale(b,b)},setHeight:function(a){var b=this.pixelRatio,c=this.getContext()._context;Kinetic.Canvas.prototype.setHeight.call(this,a),c.scale(b,b)}},Kinetic.Util.extend(Kinetic.SceneCanvas,Kinetic.Canvas),Kinetic.HitCanvas=function(a){a=a||{};var b=a.width||0,c=a.height||0;Kinetic.Canvas.call(this,a),this.context=new Kinetic.HitContext(this),this.setSize(b,c)},Kinetic.Util.extend(Kinetic.HitCanvas,Kinetic.Canvas)}();/*! KineticJS v4.7.4 2013-11-08 http://www.kineticjs.com by Eric Rowell @ericdrowell - MIT License https://github.com/ericdrowell/KineticJS/wiki/License*/
!function(){var a=",",b="(",c=")",d="([",e="])",f=";",g="()",h="=",i=["arc","arcTo","beginPath","bezierCurveTo","clearRect","clip","closePath","createLinearGradient","createPattern","createRadialGradient","drawImage","fill","fillText","getImageData","lineTo","moveTo","putImageData","quadraticCurveTo","rect","restore","rotate","save","scale","setLineDash","setTransform","stroke","strokeText","transform","translate"];Kinetic.Context=function(a){this.init(a)},Kinetic.Context.prototype={init:function(a){this.canvas=a,this._context=a._canvas.getContext("2d"),Kinetic.enableTrace&&(this.traceArr=[],this._enableTrace())},fillShape:function(a){a.getFillEnabled()&&this._fill(a)},strokeShape:function(a){a.getStrokeEnabled()&&this._stroke(a)},fillStrokeShape:function(a){var b=a.getFillEnabled();b&&this._fill(a),a.getStrokeEnabled()&&this._stroke(a)},getTrace:function(i){var j,k,l,m,n=this.traceArr,o=n.length,p="";for(j=0;o>j;j++)k=n[j],l=k.method,l?(m=k.args,p+=l,p+=i?g:Kinetic.Util._isArray(m[0])?d+m.join(a)+e:b+m.join(a)+c):(p+=k.property,i||(p+=h+k.val)),p+=f;return p},clearTrace:function(){this.traceArr=[]},_trace:function(a){var b,c=this.traceArr;c.push(a),b=c.length,b>=Kinetic.traceArrMax&&c.shift()},reset:function(){var a=this.getCanvas().getPixelRatio();this.setTransform(1*a,0,0,1*a,0,0)},getCanvas:function(){return this.canvas},clear:function(){var a,b,c=[].slice.call(arguments),d=this.getCanvas();c.length?(a=Kinetic.Util._getXY(c),b=Kinetic.Util._getSize(c),this.clearRect(a.x||0,a.y||0,b.width,b.height)):this.clearRect(0,0,d.getWidth(),d.getHeight())},_applyLineCap:function(a){var b=a.getLineCap();b&&this.setAttr("lineCap",b)},_applyOpacity:function(a){var b=a.getAbsoluteOpacity();1!==b&&this.setAttr("globalAlpha",b)},_applyLineJoin:function(a){var b=a.getLineJoin();b&&this.setAttr("lineJoin",b)},_applyAncestorTransforms:function(a){var b=a.getAbsoluteTransform().getMatrix();this.transform(b[0],b[1],b[2],b[3],b[4],b[5])},_clip:function(a){var b=a.getClipX()||0,c=a.getClipY()||0,d=a.getClipWidth(),e=a.getClipHeight();this.save(),this._applyAncestorTransforms(a),this.beginPath(),this.rect(b,c,d,e),this.clip(),this.reset(),a._drawChildren(this.getCanvas()),this.restore()},setAttr:function(a,b){this._context[a]=b},arc:function(){var a=arguments;this._context.arc(a[0],a[1],a[2],a[3],a[4],a[5])},beginPath:function(){this._context.beginPath()},bezierCurveTo:function(){var a=arguments;this._context.bezierCurveTo(a[0],a[1],a[2],a[3],a[4],a[5])},clearRect:function(){var a=arguments;this._context.clearRect(a[0],a[1],a[2],a[3])},clip:function(){this._context.clip()},closePath:function(){this._context.closePath()},createLinearGradient:function(){var a=arguments;return this._context.createLinearGradient(a[0],a[1],a[2],a[3])},createPattern:function(){var a=arguments;return this._context.createPattern(a[0],a[1])},createRadialGradient:function(){var a=arguments;return this._context.createRadialGradient(a[0],a[1],a[2],a[3],a[4],a[5])},drawImage:function(){var a=arguments,b=this._context;3===a.length?b.drawImage(a[0],a[1],a[2]):5===a.length?b.drawImage(a[0],a[1],a[2],a[3],a[4]):9===a.length&&b.drawImage(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8])},fill:function(){this._context.fill()},fillText:function(){var a=arguments;this._context.fillText(a[0],a[1],a[2])},getImageData:function(){var a=arguments;return this._context.getImageData(a[0],a[1],a[2],a[3])},lineTo:function(){var a=arguments;this._context.lineTo(a[0],a[1])},moveTo:function(){var a=arguments;this._context.moveTo(a[0],a[1])},rect:function(){var a=arguments;this._context.rect(a[0],a[1],a[2],a[3])},putImageData:function(){var a=arguments;this._context.putImageData(a[0],a[1],a[2])},quadraticCurveTo:function(){var a=arguments;this._context.quadraticCurveTo(a[0],a[1],a[2],a[3])},restore:function(){this._context.restore()},rotate:function(){var a=arguments;this._context.rotate(a[0])},save:function(){this._context.save()},scale:function(){var a=arguments;this._context.scale(a[0],a[1])},setLineDash:function(){var a=arguments,b=this._context;this._context.setLineDash?b.setLineDash(a[0]):"mozDash"in b?b.mozDash=a[0]:"webkitLineDash"in b&&(b.webkitLineDash=a[0])},setTransform:function(){var a=arguments;this._context.setTransform(a[0],a[1],a[2],a[3],a[4],a[5])},stroke:function(){this._context.stroke()},strokeText:function(){var a=arguments;this._context.strokeText(a[0],a[1],a[2])},transform:function(){var a=arguments;this._context.transform(a[0],a[1],a[2],a[3],a[4],a[5])},translate:function(){var a=arguments;this._context.translate(a[0],a[1])},_enableTrace:function(){var a,b,c=this,d=i.length,e=Kinetic.Util._simplifyArray,f=this.setAttr;for(a=0;d>a;a++)!function(a){var d,f=c[a];c[a]=function(){return b=e(Array.prototype.slice.call(arguments,0)),d=f.apply(c,arguments),c._trace({method:a,args:b}),d}}(i[a]);c.setAttr=function(){f.apply(c,arguments),c._trace({property:arguments[0],val:arguments[1]})}}},Kinetic.SceneContext=function(a){Kinetic.Context.call(this,a)},Kinetic.SceneContext.prototype={_fillColor:function(a){var b=a.getFill();this.setAttr("fillStyle",b),a._fillFunc(this)},_fillPattern:function(a){var b=a.getFillPatternImage(),c=a.getFillPatternX(),d=a.getFillPatternY(),e=a.getFillPatternScale(),f=a.getFillPatternRotation(),g=a.getFillPatternOffset(),h=a.getFillPatternRepeat();(c||d)&&this.translate(c||0,d||0),f&&this.rotate(f),e&&this.scale(e.x,e.y),g&&this.translate(-1*g.x,-1*g.y),this.setAttr("fillStyle",this.createPattern(b,h||"repeat")),this.fill()},_fillLinearGradient:function(a){var b=a.getFillLinearGradientStartPoint(),c=a.getFillLinearGradientEndPoint(),d=a.getFillLinearGradientColorStops(),e=this.createLinearGradient(b.x,b.y,c.x,c.y);if(d){for(var f=0;f<d.length;f+=2)e.addColorStop(d[f],d[f+1]);this.setAttr("fillStyle",e),this.fill()}},_fillRadialGradient:function(a){for(var b=a.getFillRadialGradientStartPoint(),c=a.getFillRadialGradientEndPoint(),d=a.getFillRadialGradientStartRadius(),e=a.getFillRadialGradientEndRadius(),f=a.getFillRadialGradientColorStops(),g=this.createRadialGradient(b.x,b.y,d,c.x,c.y,e),h=0;h<f.length;h+=2)g.addColorStop(f[h],f[h+1]);this.setAttr("fillStyle",g),this.fill()},_fill:function(a){var b=a.getFill(),c=a.getFillPatternImage(),d=a.getFillLinearGradientColorStops(),e=a.getFillRadialGradientColorStops(),f=a.getFillPriority();b&&"color"===f?this._fillColor(a):c&&"pattern"===f?this._fillPattern(a):d&&"linear-gradient"===f?this._fillLinearGradient(a):e&&"radial-gradient"===f?this._fillRadialGradient(a):b?this._fillColor(a):c?this._fillPattern(a):d?this._fillLinearGradient(a):e&&this._fillRadialGradient(a)},_stroke:function(a){var b=a.getStroke(),c=a.getStrokeWidth(),d=a.getDashArray(),e=a.getStrokeScaleEnabled();a.hasStroke()&&(e||(this.save(),this.setTransform(1,0,0,1,0,0)),this._applyLineCap(a),d&&a.getDashArrayEnabled()&&this.setLineDash(d),this.setAttr("lineWidth",c||2),this.setAttr("strokeStyle",b||"black"),a._strokeFunc(this),e||this.restore())},_applyShadow:function(a){var b=Kinetic.Util,c=a.getAbsoluteOpacity(),d=b.get(a.getShadowColor(),"black"),e=b.get(a.getShadowBlur(),5),f=b.get(a.getShadowOpacity(),0),g=b.get(a.getShadowOffset(),{x:0,y:0});f&&this.setAttr("globalAlpha",f*c),this.setAttr("shadowColor",d),this.setAttr("shadowBlur",e),this.setAttr("shadowOffsetX",g.x),this.setAttr("shadowOffsetY",g.y)}},Kinetic.Util.extend(Kinetic.SceneContext,Kinetic.Context),Kinetic.HitContext=function(a){Kinetic.Context.call(this,a)},Kinetic.HitContext.prototype={_fill:function(a){this.save(),this.setAttr("fillStyle",a.colorKey),a._fillFuncHit(this),this.restore()},_stroke:function(a){var b=a.getStroke(),c=a.getStrokeWidth();(b||c)&&(this._applyLineCap(a),this.setAttr("lineWidth",c||2),this.setAttr("strokeStyle",a.colorKey),a._strokeFuncHit(this))}},Kinetic.Util.extend(Kinetic.HitContext,Kinetic.Context)}();/*! KineticJS v4.7.4 2013-11-08 http://www.kineticjs.com by Eric Rowell @ericdrowell - MIT License https://github.com/ericdrowell/KineticJS/wiki/License*/
!function(){var a="add",b="b",c="Deg",d="g",e="get",f="#",g="r",h="RGB",i="set",j="B",k="G",l="Height",m="R",n="Width",o="X",p="Y";Kinetic.Factory={addGetterSetter:function(a,b,c){this.addGetter(a,b,c),this.addSetter(a,b)},addPointGetterSetter:function(a,b,c){this.addPointGetter(a,b,c),this.addPointSetter(a,b),this.addGetter(a,b+o,c),this.addGetter(a,b+p,c),this.addSetter(a,b+o),this.addSetter(a,b+p)},addBoxGetterSetter:function(a,b,c){this.addBoxGetter(a,b,c),this.addBoxSetter(a,b),this.addGetter(a,b+o,c),this.addGetter(a,b+p,c),this.addGetter(a,b+n,c),this.addGetter(a,b+l,c),this.addSetter(a,b+o),this.addSetter(a,b+p),this.addSetter(a,b+n),this.addSetter(a,b+l)},addPointsGetterSetter:function(a,b){this.addPointsGetter(a,b),this.addPointsSetter(a,b),this.addPointAdder(a,b)},addRotationGetterSetter:function(a,b,c){this.addRotationGetter(a,b,c),this.addRotationSetter(a,b)},addColorGetterSetter:function(a,c){this.addGetter(a,c),this.addSetter(a,c),this.addColorRGBGetter(a,c),this.addColorComponentGetter(a,c,g),this.addColorComponentGetter(a,c,d),this.addColorComponentGetter(a,c,b),this.addColorRGBSetter(a,c),this.addColorComponentSetter(a,c,g),this.addColorComponentSetter(a,c,d),this.addColorComponentSetter(a,c,b)},addColorRGBGetter:function(a,b){var c=e+Kinetic.Util._capitalize(b)+h;a.prototype[c]=function(){return Kinetic.Util.getRGB(this.attrs[b])}},addColorComponentGetter:function(a,b,c){var d=e+Kinetic.Util._capitalize(b),f=d+Kinetic.Util._capitalize(c);a.prototype[f]=function(){return this[d+h]()[c]}},addPointsGetter:function(a,b){var c=e+Kinetic.Util._capitalize(b);a.prototype[c]=function(){var a=this.attrs[b];return void 0===a?[]:a}},addGetter:function(a,b,c){var d=e+Kinetic.Util._capitalize(b);a.prototype[d]=function(){var a=this.attrs[b];return void 0===a?c:a}},addPointGetter:function(a,b){var c=e+Kinetic.Util._capitalize(b);a.prototype[c]=function(){var a=this;return{x:a[c+o](),y:a[c+p]()}}},addBoxGetter:function(a,b){var c=e+Kinetic.Util._capitalize(b);a.prototype[c]=function(){var a=this;return{x:a[c+o](),y:a[c+p](),width:a[c+n](),height:a[c+l]()}}},addRotationGetter:function(a,b,d){var f=e+Kinetic.Util._capitalize(b);a.prototype[f]=function(){var a=this.attrs[b];return void 0===a&&(a=d),a},a.prototype[f+c]=function(){var a=this.attrs[b];return void 0===a&&(a=d),Kinetic.Util._radToDeg(a)}},addColorRGBSetter:function(a,b){var c=i+Kinetic.Util._capitalize(b)+h;a.prototype[c]=function(a){var c=a&&void 0!==a.r?0|a.r:this.getAttr(b+m),d=a&&void 0!==a.g?0|a.g:this.getAttr(b+k),e=a&&void 0!==a.b?0|a.b:this.getAttr(b+j);this._setAttr(b,f+Kinetic.Util._rgbToHex(c,d,e))}},addColorComponentSetter:function(a,b,c){var d=i+Kinetic.Util._capitalize(b),e=d+Kinetic.Util._capitalize(c);a.prototype[e]=function(a){var b={};b[c]=a,this[d+h](b)}},addPointsSetter:function(a,b){var c=i+Kinetic.Util._capitalize(b);a.prototype[c]=function(a){var b=Kinetic.Util._getPoints(a);this._setAttr("points",b)}},addSetter:function(a,b){var c=i+Kinetic.Util._capitalize(b);a.prototype[c]=function(a){this._setAttr(b,a)}},addPointSetter:function(a,b){var c=i+Kinetic.Util._capitalize(b);a.prototype[c]=function(){var a=Kinetic.Util._getXY([].slice.call(arguments)),d=this.attrs[b],e=0,f=0;a&&(e=a.x,f=a.y,this._fireBeforeChangeEvent(b,d,a),void 0!==e&&this[c+o](e),void 0!==f&&this[c+p](f),this._fireChangeEvent(b,d,a))}},addBoxSetter:function(a,b){var c=i+Kinetic.Util._capitalize(b);a.prototype[c]=function(){var a,d,e,f,g=[].slice.call(arguments),h=Kinetic.Util._getXY(g),i=Kinetic.Util._getSize(g),j=Kinetic.Util._merge(h,i),k=this.attrs[b];j&&(a=j.x,d=j.y,e=j.width,f=j.height,this._fireBeforeChangeEvent(b,k,j),void 0!==a&&this[c+o](a),void 0!==d&&this[c+p](d),void 0!==e&&this[c+n](e),void 0!==f&&this[c+l](f),this._fireChangeEvent(b,k,j))}},addRotationSetter:function(a,b){var d=i+Kinetic.Util._capitalize(b);a.prototype[d]=function(a){this._setAttr(b,a)},a.prototype[d+c]=function(a){this._setAttr(b,Kinetic.Util._degToRad(a))}},addPointAdder:function(b,c){var d=a+Kinetic.Util._removeLastLetter(Kinetic.Util._capitalize(c));b.prototype[d]=function(){var a=Kinetic.Util._getXY([].slice.call(arguments)),b=this.attrs[c];a&&(this._fireBeforeChangeEvent(c,b,a),this.attrs[c].push(a),this._fireChangeEvent(c,b,a))}}}}();/*! KineticJS v4.7.4 2013-11-08 http://www.kineticjs.com by Eric Rowell @ericdrowell - MIT License https://github.com/ericdrowell/KineticJS/wiki/License*/
!function(){var a="absoluteOpacity",b="absoluteTransform",c="before",d="Change",e="children",f=".",g="",h="get",i="id",j="kinetic",k="listening",l="mouseenter",m="mouseleave",n="name",o="set",p="Shape",q=" ",r="stage",s="transform",t="Stage",u="visible",v=["xChange.kinetic","yChange.kinetic","scaleXChange.kinetic","scaleYChange.kinetic","skewXChange.kinetic","skewYChange.kinetic","rotationChange.kinetic","offsetXChange.kinetic","offsetYChange.kinetic"].join(q);Kinetic.Util.addMethods(Kinetic.Node,{_init:function(c){var d=this;this._id=Kinetic.idCounter++,this.eventListeners={},this.attrs={},this.cache={},this.setAttrs(c),this.on(v,function(){this._clearCache(s),d._clearSelfAndChildrenCache(b)}),this.on("visibleChange.kinetic",function(){d._clearSelfAndChildrenCache(u)}),this.on("listeningChange.kinetic",function(){d._clearSelfAndChildrenCache(k)}),this.on("opacityChange.kinetic",function(){d._clearSelfAndChildrenCache(a)})},clearCache:function(){this.cache={}},_clearCache:function(a){delete this.cache[a]},_getCache:function(a,b){var c=this.cache[a];return void 0===c&&(this.cache[a]=b.call(this)),this.cache[a]},_clearSelfAndChildrenCache:function(a){this._clearCache(a),this.children&&this.getChildren().each(function(b){b._clearSelfAndChildrenCache(a)})},on:function(a,b){var c,d,e,h,i,j=a.split(q),k=j.length;for(c=0;k>c;c++)d=j[c],e=d.split(f),h=e[0],i=e[1]||g,this.eventListeners[h]||(this.eventListeners[h]=[]),this.eventListeners[h].push({name:i,handler:b});return this},off:function(a){var b,c,d,e,g,h,i=a.split(q),j=i.length;for(b=0;j>b;b++)if(d=i[b],e=d.split(f),g=e[0],h=e[1],g)this.eventListeners[g]&&this._off(g,h);else for(c in this.eventListeners)this._off(c,h);return this},remove:function(){var c=this.getParent();return c&&c.children&&(c.children.splice(this.index,1),c._setChildrenIndices(),delete this.parent),this._clearSelfAndChildrenCache(r),this._clearSelfAndChildrenCache(b),this._clearSelfAndChildrenCache(u),this._clearSelfAndChildrenCache(k),this._clearSelfAndChildrenCache(a),this},destroy:function(){Kinetic._removeId(this.getId()),Kinetic._removeName(this.getName(),this._id),this.remove()},getAttr:function(a){var b=h+Kinetic.Util._capitalize(a);return Kinetic.Util._isFunction(this[b])?this[b]():this.attrs[a]},getAncestors:function(){for(var a=this.getParent(),b=new Kinetic.Collection;a;)b.push(a),a=a.getParent();return b},setAttr:function(){var a=Array.prototype.slice.call(arguments),b=a[0],c=o+Kinetic.Util._capitalize(b),d=this[c];return a.shift(),Kinetic.Util._isFunction(d)?d.apply(this,a):this.attrs[b]=a[0],this},getAttrs:function(){return this.attrs||{}},setAttrs:function(a){var b,c;if(a)for(b in a)b===e||(c=o+Kinetic.Util._capitalize(b),Kinetic.Util._isFunction(this[c])?this[c](a[b]):this._setAttr(b,a[b]));return this},isListening:function(){return this._getCache(k,this._isListening)},_isListening:function(){var a=this.getListening(),b=this.getParent();return a&&b&&!b.isListening()?!1:a},isVisible:function(){return this._getCache(u,this._isVisible)},_isVisible:function(){var a=this.getVisible(),b=this.getParent();return a&&b&&!b.isVisible()?!1:a},show:function(){return this.setVisible(!0),this},hide:function(){return this.setVisible(!1),this},getZIndex:function(){return this.index||0},getAbsoluteZIndex:function(){function a(i){for(b=[],c=i.length,d=0;c>d;d++)e=i[d],h++,e.nodeType!==p&&(b=b.concat(e.getChildren().toArray())),e._id===g._id&&(d=c);b.length>0&&b[0].getLevel()<=f&&a(b)}var b,c,d,e,f=this.getLevel(),g=this,h=0;return g.nodeType!==t&&a(g.getStage().getChildren()),h},getLevel:function(){for(var a=0,b=this.parent;b;)a++,b=b.parent;return a},setPosition:function(){var a=Kinetic.Util._getXY([].slice.call(arguments));return this.setX(a.x),this.setY(a.y),this},getPosition:function(){return{x:this.getX(),y:this.getY()}},getAbsolutePosition:function(){var a=this.getAbsoluteTransform().getMatrix(),b=new Kinetic.Transform,c=this.getOffset();return b.m=a.slice(),b.translate(c.x,c.y),b.getTranslation()},setAbsolutePosition:function(){var a,b=Kinetic.Util._getXY([].slice.call(arguments)),c=this._clearTransform();return this.attrs.x=c.x,this.attrs.y=c.y,delete c.x,delete c.y,a=this.getAbsoluteTransform(),a.invert(),a.translate(b.x,b.y),b={x:this.attrs.x+a.getTranslation().x,y:this.attrs.y+a.getTranslation().y},this.setPosition(b.x,b.y),this._setTransform(c),this},_setTransform:function(a){var c;for(c in a)this.attrs[c]=a[c];this._clearCache(s),this._clearSelfAndChildrenCache(b)},_clearTransform:function(){var a={x:this.getX(),y:this.getY(),rotation:this.getRotation(),scaleX:this.getScaleX(),scaleY:this.getScaleY(),offsetX:this.getOffsetX(),offsetY:this.getOffsetY(),skewX:this.getSkewX(),skewY:this.getSkewY()};return this.attrs.x=0,this.attrs.y=0,this.attrs.rotation=0,this.attrs.scaleX=1,this.attrs.scaleY=1,this.attrs.offsetX=0,this.attrs.offsetY=0,this.attrs.skewX=0,this.attrs.skewY=0,this._clearCache(s),this._clearSelfAndChildrenCache(b),a},move:function(){var a=Kinetic.Util._getXY([].slice.call(arguments)),b=this.getX(),c=this.getY();return void 0!==a.x&&(b+=a.x),void 0!==a.y&&(c+=a.y),this.setPosition(b,c),this},_eachAncestorReverse:function(a,b){var c,d,e=[],f=this.getParent();for(b&&e.unshift(this);f;)e.unshift(f),f=f.parent;for(c=e.length,d=0;c>d;d++)a(e[d])},rotate:function(a){return this.setRotation(this.getRotation()+a),this},rotateDeg:function(a){return this.setRotation(this.getRotation()+Kinetic.Util._degToRad(a)),this},moveToTop:function(){var a=this.index;return this.parent.children.splice(a,1),this.parent.children.push(this),this.parent._setChildrenIndices(),!0},moveUp:function(){var a=this.index,b=this.parent.getChildren().length;return b-1>a?(this.parent.children.splice(a,1),this.parent.children.splice(a+1,0,this),this.parent._setChildrenIndices(),!0):!1},moveDown:function(){var a=this.index;return a>0?(this.parent.children.splice(a,1),this.parent.children.splice(a-1,0,this),this.parent._setChildrenIndices(),!0):!1},moveToBottom:function(){var a=this.index;return a>0?(this.parent.children.splice(a,1),this.parent.children.unshift(this),this.parent._setChildrenIndices(),!0):!1},setZIndex:function(a){var b=this.index;return this.parent.children.splice(b,1),this.parent.children.splice(a,0,this),this.parent._setChildrenIndices(),this},getAbsoluteOpacity:function(){return this._getCache(a,this._getAbsoluteOpacity)},_getAbsoluteOpacity:function(){var a=this.getOpacity();return this.getParent()&&(a*=this.getParent().getAbsoluteOpacity()),a},moveTo:function(a){return Kinetic.Node.prototype.remove.call(this),a.add(this),this},toObject:function(){var a,b,c=Kinetic.Util,d={},e=this.getAttrs();d.attrs={};for(a in e)b=e[a],c._isFunction(b)||c._isElement(b)||c._isObject(b)&&c._hasMethods(b)||(d.attrs[a]=b);return d.className=this.getClassName(),d},toJSON:function(){return JSON.stringify(this.toObject())},getParent:function(){return this.parent},getLayer:function(){return this.getParent().getLayer()},getStage:function(){return this._getCache(r,this._getStage)},_getStage:function(){var a=this.getParent();return a?a.getStage():void 0},fire:function(a,b,c){return c?this._fireAndBubble(a,b||{}):this._fire(a,b||{}),this},getAbsoluteTransform:function(){return this._getCache(b,this._getAbsoluteTransform)},_getAbsoluteTransform:function(){var a,b=new Kinetic.Transform;return this._eachAncestorReverse(function(c){a=c.getTransform(),b.multiply(a)},!0),b},_getTransform:function(){var a=new Kinetic.Transform,b=this.getX(),c=this.getY(),d=this.getRotation(),e=this.getScaleX(),f=this.getScaleY(),g=this.getSkewX(),h=this.getSkewY(),i=this.getOffsetX(),j=this.getOffsetY();return(0!==b||0!==c)&&a.translate(b,c),0!==d&&a.rotate(d),(0!==g||0!==h)&&a.skew(g,h),(1!==e||1!==f)&&a.scale(e,f),(0!==i||0!==j)&&a.translate(-1*i,-1*j),a},clone:function(a){var b,c,d,e,f,g=this.getClassName(),h=new Kinetic[g](this.attrs);for(b in this.eventListeners)for(c=this.eventListeners[b],d=c.length,e=0;d>e;e++)f=c[e],f.name.indexOf(j)<0&&(h.eventListeners[b]||(h.eventListeners[b]=[]),h.eventListeners[b].push(f));return h.setAttrs(a),h},toDataURL:function(a){a=a||{};var b=a.mimeType||null,c=a.quality||null,d=this.getStage(),e=a.x||0,f=a.y||0,g=new Kinetic.SceneCanvas({width:a.width||d.getWidth(),height:a.height||d.getHeight(),pixelRatio:1}),h=g.getContext();return h.save(),(e||f)&&h.translate(-1*e,-1*f),this.drawScene(g),h.restore(),g.toDataURL(b,c)},toImage:function(a){Kinetic.Util._getImage(this.toDataURL(a),function(b){a.callback(b)})},setSize:function(){var a=Kinetic.Util._getSize(Array.prototype.slice.call(arguments));return this.setWidth(a.width),this.setHeight(a.height),this},getSize:function(){return{width:this.getWidth(),height:this.getHeight()}},getWidth:function(){return this.attrs.width||0},getHeight:function(){return this.attrs.height||0},getClassName:function(){return this.className||this.nodeType},getType:function(){return this.nodeType},_get:function(a){return this.nodeType===a?[this]:[]},_off:function(a,b){var c,d,e=this.eventListeners[a];for(c=0;c<e.length;c++)if(d=e[c].name,!("kinetic"===d&&"kinetic"!==b||b&&d!==b)){if(e.splice(c,1),0===e.length){delete this.eventListeners[a];break}c--}},_fireBeforeChangeEvent:function(a,b,e){this._fire(c+Kinetic.Util._capitalize(a)+d,{oldVal:b,newVal:e})},_fireChangeEvent:function(a,b,c){this._fire(a+d,{oldVal:b,newVal:c})},setId:function(a){var b=this.getId();return Kinetic._removeId(b),Kinetic._addId(this,a),this._setAttr(i,a),this},setName:function(a){var b=this.getName();return Kinetic._removeName(b,this._id),Kinetic._addName(this,a),this._setAttr(n,a),this},_setAttr:function(a,b){var c;void 0!==b&&(c=this.attrs[a],this._fireBeforeChangeEvent(a,c,b),this.attrs[a]=b,this._fireChangeEvent(a,c,b))},_fireAndBubble:function(a,b,c){var d=!0;b&&this.nodeType===p&&(b.targetNode=this),a===l&&c&&this._id===c._id?d=!1:a===m&&c&&this._id===c._id&&(d=!1),d&&(this._fire(a,b),b&&!b.cancelBubble&&this.parent&&(c&&c.parent?this._fireAndBubble.call(this.parent,a,b,c.parent):this._fireAndBubble.call(this.parent,a,b)))},_fire:function(a,b){var c,d=this.eventListeners[a];if(d)for(c=0;c<d.length;c++)d[c].handler.call(this,b)},draw:function(){return this.drawScene(),this.drawHit(),this},shouldDrawHit:function(){return this.isListening()&&this.isVisible()&&!Kinetic.isDragging()},isDraggable:function(){return!1},getTransform:function(){return this._getCache(s,this._getTransform)}}),Kinetic.Node.create=function(a,b){return this._createNode(JSON.parse(a),b)},Kinetic.Node._createNode=function(a,b){var c,d,e,f=Kinetic.Node.prototype.getClassName.call(a),g=a.children;if(b&&(a.attrs.container=b),c=new Kinetic[f](a.attrs),g)for(d=g.length,e=0;d>e;e++)c.add(this._createNode(g[e]));return c},Kinetic.Factory.addGetterSetter(Kinetic.Node,"x",0),Kinetic.Factory.addGetterSetter(Kinetic.Node,"y",0),Kinetic.Factory.addGetterSetter(Kinetic.Node,"opacity",1),Kinetic.Factory.addGetter(Kinetic.Node,"name"),Kinetic.Factory.addGetter(Kinetic.Node,"id"),Kinetic.Factory.addRotationGetterSetter(Kinetic.Node,"rotation",0),Kinetic.Factory.addPointGetterSetter(Kinetic.Node,"scale",1),Kinetic.Factory.addPointGetterSetter(Kinetic.Node,"skew",0),Kinetic.Factory.addPointGetterSetter(Kinetic.Node,"offset",0),Kinetic.Factory.addSetter(Kinetic.Node,"width"),Kinetic.Factory.addSetter(Kinetic.Node,"height"),Kinetic.Factory.addGetterSetter(Kinetic.Node,"listening",!0),Kinetic.Factory.addGetterSetter(Kinetic.Node,"visible",!0),Kinetic.Collection.mapMethods(["on","off","remove","destroy","show","hide","move","rotate","moveToTop","moveUp","moveDown","moveToBottom","moveTo","fire","draw"])}();/*! KineticJS v4.7.4 2013-11-08 http://www.kineticjs.com by Eric Rowell @ericdrowell - MIT License https://github.com/ericdrowell/KineticJS/wiki/License*/
!function(){function a(a){window.setTimeout(a,1e3/60)}var b=500;Kinetic.Animation=function(a,b){this.func=a,this.setLayers(b),this.id=Kinetic.Animation.animIdCounter++,this.frame={time:0,timeDiff:0,lastTime:(new Date).getTime()}},Kinetic.Animation.prototype={setLayers:function(a){var b=[];b=a?a.length>0?a:[a]:[],this.layers=b},getLayers:function(){return this.layers},addLayer:function(a){var b,c,d=this.layers;if(d){for(b=d.length,c=0;b>c;c++)if(d[c]._id===a._id)return!1}else this.layers=[];return this.layers.push(a),!0},isRunning:function(){for(var a=Kinetic.Animation,b=a.animations,c=0;c<b.length;c++)if(b[c].id===this.id)return!0;return!1},start:function(){this.stop(),this.frame.timeDiff=0,this.frame.lastTime=(new Date).getTime(),Kinetic.Animation._addAnimation(this)},stop:function(){Kinetic.Animation._removeAnimation(this)},_updateFrameObject:function(a){this.frame.timeDiff=a-this.frame.lastTime,this.frame.lastTime=a,this.frame.time+=this.frame.timeDiff,this.frame.frameRate=1e3/this.frame.timeDiff}},Kinetic.Animation.animations=[],Kinetic.Animation.animIdCounter=0,Kinetic.Animation.animRunning=!1,Kinetic.Animation._addAnimation=function(a){this.animations.push(a),this._handleAnimation()},Kinetic.Animation._removeAnimation=function(a){for(var b=a.id,c=this.animations,d=c.length,e=0;d>e;e++)if(c[e].id===b){this.animations.splice(e,1);break}},Kinetic.Animation._runFrames=function(){var a,b,c,d,e,f,g,h,i={},j=this.animations;for(d=0;d<j.length;d++){for(a=j[d],b=a.layers,c=a.func,a._updateFrameObject((new Date).getTime()),f=b.length,e=0;f>e;e++)g=b[e],void 0!==g._id&&(i[g._id]=g);c&&c.call(a,a.frame)}for(h in i)i[h].draw()},Kinetic.Animation._animationLoop=function(){var a=this;this.animations.length>0?(this._runFrames(),Kinetic.Animation.requestAnimFrame(function(){a._animationLoop()})):this.animRunning=!1},Kinetic.Animation._handleAnimation=function(){var a=this;this.animRunning||(this.animRunning=!0,a._animationLoop())};var c=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||a}();Kinetic.Animation.requestAnimFrame=function(b){var d=Kinetic.isDragging?a:c;d(b)};var d=Kinetic.Node.prototype.moveTo;Kinetic.Node.prototype.moveTo=function(a){d.call(this,a)},Kinetic.Layer.prototype.batchDraw=function(){var a=this;this.batchAnim||(this.batchAnim=new Kinetic.Animation(function(){a.lastBatchDrawTime&&(new Date).getTime()-a.lastBatchDrawTime>b&&a.batchAnim.stop()},this)),this.lastBatchDrawTime=(new Date).getTime(),this.batchAnim.isRunning()||(this.draw(),this.batchAnim.start())},Kinetic.Stage.prototype.batchDraw=function(){this.getChildren().each(function(a){a.batchDraw()})}}();/*! KineticJS v4.7.4 2013-11-08 http://www.kineticjs.com by Eric Rowell @ericdrowell - MIT License https://github.com/ericdrowell/KineticJS/wiki/License*/
!function(){Kinetic.DD={anim:new Kinetic.Animation,isDragging:!1,offset:{x:0,y:0},node:null,_drag:function(a){var b=Kinetic.DD,c=b.node;c&&(c._setDragPosition(a),b.isDragging||(b.isDragging=!0,c.fire("dragstart",a,!0)),c.fire("dragmove",a,!0))},_endDragBefore:function(a){var b,c,d=Kinetic.DD,e=d.node;e&&(b=e.nodeType,c=e.getLayer(),d.anim.stop(),d.isDragging&&(d.isDragging=!1,Kinetic.listenClickTap=!1,a&&(a.dragEndNode=e)),delete d.node,(c||e).draw())},_endDragAfter:function(a){a=a||{};var b=a.dragEndNode;a&&b&&b.fire("dragend",a,!0)}},Kinetic.Node.prototype.startDrag=function(){var a=Kinetic.DD,b=this.getStage(),c=this.getLayer(),d=b.getPointerPosition(),e=this.getAbsolutePosition();d&&(a.node&&a.node.stopDrag(),a.node=this,a.offset.x=d.x-e.x,a.offset.y=d.y-e.y,a.anim.setLayers(c||this.getLayers()),a.anim.start(),this._setDragPosition())},Kinetic.Node.prototype._setDragPosition=function(a){var b=Kinetic.DD,c=this.getStage().getPointerPosition(),d=this.getDragBoundFunc(),e={x:c.x-b.offset.x,y:c.y-b.offset.y};void 0!==d&&(e=d.call(this,e,a)),this.setAbsolutePosition(e)},Kinetic.Node.prototype.stopDrag=function(){var a=Kinetic.DD,b={};a._endDragBefore(b),a._endDragAfter(b)},Kinetic.Node.prototype.setDraggable=function(a){this._setAttr("draggable",a),this._dragChange()};var a=Kinetic.Node.prototype.destroy;Kinetic.Node.prototype.destroy=function(){var b=Kinetic.DD;b.node&&b.node._id===this._id&&this.stopDrag(),a.call(this)},Kinetic.Node.prototype.isDragging=function(){var a=Kinetic.DD;return a.node&&a.node._id===this._id&&a.isDragging},Kinetic.Node.prototype._listenDrag=function(){var a=this;this._dragCleanup(),"Stage"===this.getClassName()?this.on("contentMousedown.kinetic contentTouchstart.kinetic",function(b){Kinetic.DD.node||a.startDrag(b)}):this.on("mousedown.kinetic touchstart.kinetic",function(b){Kinetic.DD.node||a.startDrag(b)})},Kinetic.Node.prototype._dragChange=function(){if(this.attrs.draggable)this._listenDrag();else{this._dragCleanup();var a=this.getStage(),b=Kinetic.DD;a&&b.node&&b.node._id===this._id&&b.node.stopDrag()}},Kinetic.Node.prototype._dragCleanup=function(){this.off("mousedown.kinetic"),this.off("touchstart.kinetic")},Kinetic.Factory.addGetterSetter(Kinetic.Node,"dragBoundFunc"),Kinetic.Factory.addGetter(Kinetic.Node,"draggable",!1),Kinetic.Node.prototype.isDraggable=Kinetic.Node.prototype.getDraggable;var b=document.documentElement;b.addEventListener("mouseup",Kinetic.DD._endDragBefore,!0),b.addEventListener("touchend",Kinetic.DD._endDragBefore,!0),b.addEventListener("mouseup",Kinetic.DD._endDragAfter,!1),b.addEventListener("touchend",Kinetic.DD._endDragAfter,!1)}();/*! KineticJS v4.7.4 2013-11-08 http://www.kineticjs.com by Eric Rowell @ericdrowell - MIT License https://github.com/ericdrowell/KineticJS/wiki/License*/
!function(){Kinetic.Util.addMethods(Kinetic.Container,{__init:function(a){this.children=new Kinetic.Collection,Kinetic.Node.call(this,a)},getChildren:function(){return this.children},hasChildren:function(){return this.getChildren().length>0},removeChildren:function(){for(var a,b=this.children;b.length>0;)a=b[0],a.hasChildren()&&a.removeChildren(),a.remove();return this},destroyChildren:function(){for(var a=this.children;a.length>0;)a[0].destroy();return this},add:function(a){var b=this.children;return this._validateAdd(a),a.index=b.length,a.parent=this,b.push(a),this._fire("add",{child:a}),this},destroy:function(){this.hasChildren()&&this.destroyChildren(),Kinetic.Node.prototype.destroy.call(this)},find:function(a){var b,c,d,e,f,g,h,i=[],j=a.replace(/ /g,"").split(","),k=j.length;for(b=0;k>b;b++)if(d=j[b],"#"===d.charAt(0))f=this._getNodeById(d.slice(1)),f&&i.push(f);else if("."===d.charAt(0))e=this._getNodesByName(d.slice(1)),i=i.concat(e);else for(g=this.getChildren(),h=g.length,c=0;h>c;c++)i=i.concat(g[c]._get(d));return Kinetic.Collection.toCollection(i)},_getNodeById:function(a){var b=Kinetic.ids[a];return void 0!==b&&this.isAncestorOf(b)?b:null},_getNodesByName:function(a){var b=Kinetic.names[a]||[];return this._getDescendants(b)},_get:function(a){for(var b=Kinetic.Node.prototype._get.call(this,a),c=this.getChildren(),d=c.length,e=0;d>e;e++)b=b.concat(c[e]._get(a));return b},toObject:function(){var a=Kinetic.Node.prototype.toObject.call(this);a.children=[];for(var b=this.getChildren(),c=b.length,d=0;c>d;d++){var e=b[d];a.children.push(e.toObject())}return a},_getDescendants:function(a){for(var b=[],c=a.length,d=0;c>d;d++){var e=a[d];this.isAncestorOf(e)&&b.push(e)}return b},isAncestorOf:function(a){for(var b=a.getParent();b;){if(b._id===this._id)return!0;b=b.getParent()}return!1},clone:function(a){var b=Kinetic.Node.prototype.clone.call(this,a);return this.getChildren().each(function(a){b.add(a.clone())}),b},getAllIntersections:function(){for(var a=Kinetic.Util._getXY(Array.prototype.slice.call(arguments)),b=[],c=this.find("Shape"),d=c.length,e=0;d>e;e++){var f=c[e];f.isVisible()&&f.intersects(a)&&b.push(f)}return b},_setChildrenIndices:function(){this.children.each(function(a,b){a.index=b})},drawScene:function(a){var b=this.getLayer(),c=this.getClipWidth()&&this.getClipHeight();return!a&&b&&(a=b.getCanvas()),this.isVisible()&&(c?a.getContext()._clip(this):this._drawChildren(a)),this},_drawChildren:function(a){this.children.each(function(b){b.drawScene(a)})},drawHit:function(){var a,b=this.getClipWidth()&&this.getClipHeight()&&"Stage"!==this.nodeType,c=0,d=0,e=[];if(this.shouldDrawHit()){for(b&&(a=this.getLayer().hitCanvas,a.getContext()._clip(this)),e=this.children,d=e.length,c=0;d>c;c++)e[c].drawHit();b&&a.getContext()._context.restore()}return this}}),Kinetic.Util.extend(Kinetic.Container,Kinetic.Node),Kinetic.Container.prototype.get=Kinetic.Container.prototype.find,Kinetic.Factory.addBoxGetterSetter(Kinetic.Container,"clip")}();/*! KineticJS v4.7.4 2013-11-08 http://www.kineticjs.com by Eric Rowell @ericdrowell - MIT License https://github.com/ericdrowell/KineticJS/wiki/License*/
!function(){function a(a){a.fill()}function b(a){a.stroke()}function c(a){a.fill()}function d(a){a.stroke()}function e(){this._clearCache(f)}var f="hasShadow";Kinetic.Util.addMethods(Kinetic.Shape,{__init:function(f){this.nodeType="Shape",this._fillFunc=a,this._strokeFunc=b,this._fillFuncHit=c,this._strokeFuncHit=d;for(var g,h=Kinetic.shapes;;)if(g=Kinetic.Util.getRandomColor(),g&&!(g in h))break;this.colorKey=g,h[g]=this,Kinetic.Node.call(this,f),this._setDrawFuncs(),this.on("shadowColorChange.kinetic shadowBlurChange.kinetic shadowOffsetChange.kinetic shadowOpacityChange.kinetic shadowEnabledChanged.kinetic",e)},hasChildren:function(){return!1},getChildren:function(){return[]},getContext:function(){return this.getLayer().getContext()},getCanvas:function(){return this.getLayer().getCanvas()},hasShadow:function(){return this._getCache(f,this._hasShadow)},_hasShadow:function(){return this.getShadowEnabled()&&0!==this.getShadowOpacity()&&!!(this.getShadowColor()||this.getShadowBlur()||this.getShadowOffsetX()||this.getShadowOffsetY())},hasFill:function(){return!!(this.getFill()||this.getFillPatternImage()||this.getFillLinearGradientColorStops()||this.getFillRadialGradientColorStops())},hasStroke:function(){return!(!this.getStroke()&&!this.getStrokeWidth())},_get:function(a){return this.className===a||this.nodeType===a?[this]:[]},intersects:function(){var a,b=Kinetic.Util._getXY(Array.prototype.slice.call(arguments)),c=this.getStage(),d=c.bufferHitCanvas;return d.getContext().clear(),this.drawScene(d),a=d.context.getImageData(0|b.x,0|b.y,1,1).data,a[3]>0},enableFill:function(){return this._setAttr("fillEnabled",!0),this},disableFill:function(){return this._setAttr("fillEnabled",!1),this},enableStroke:function(){return this._setAttr("strokeEnabled",!0),this},disableStroke:function(){return this._setAttr("strokeEnabled",!1),this},enableStrokeScale:function(){return this._setAttr("strokeScaleEnabled",!0),this},disableStrokeScale:function(){return this._setAttr("strokeScaleEnabled",!1),this},enableShadow:function(){return this._setAttr("shadowEnabled",!0),this},disableShadow:function(){return this._setAttr("shadowEnabled",!1),this},enableDashArray:function(){return this._setAttr("dashArrayEnabled",!0),this},disableDashArray:function(){return this._setAttr("dashArrayEnabled",!1),this},destroy:function(){return Kinetic.Node.prototype.destroy.call(this),delete Kinetic.shapes[this.colorKey],this},_useBufferCanvas:function(){return(this.hasShadow()||1!==this.getAbsoluteOpacity())&&this.hasFill()&&this.hasStroke()},drawScene:function(a){var b,c,d,e=a||this.getLayer().getCanvas(),f=e.getContext(),g=this.getDrawFunc(),h=this.hasShadow();return g&&this.isVisible()&&(this._useBufferCanvas()?(b=this.getStage(),c=b.bufferCanvas,d=c.getContext(),d.clear(),d.save(),d._applyLineJoin(this),d._applyAncestorTransforms(this),g.call(this,d),d.restore(),f.save(),h&&(f.save(),f._applyShadow(this),f.drawImage(c._canvas,0,0),f.restore()),f._applyOpacity(this),f.drawImage(c._canvas,0,0),f.restore()):(f.save(),f._applyLineJoin(this),f._applyAncestorTransforms(this),h&&(f.save(),f._applyShadow(this),g.call(this,f),f.restore()),f._applyOpacity(this),g.call(this,f),f.restore())),this},drawHit:function(){var a=this.getAttrs(),b=a.drawHitFunc||a.drawFunc,c=this.getLayer().hitCanvas,d=c.getContext();return b&&this.shouldDrawHit()&&(d.save(),d._applyLineJoin(this),d._applyAncestorTransforms(this),b.call(this,d),d.restore()),this},_setDrawFuncs:function(){!this.attrs.drawFunc&&this.drawFunc&&this.setDrawFunc(this.drawFunc),!this.attrs.drawHitFunc&&this.drawHitFunc&&this.setDrawHitFunc(this.drawHitFunc)}}),Kinetic.Util.extend(Kinetic.Shape,Kinetic.Node),Kinetic.Factory.addColorGetterSetter(Kinetic.Shape,"stroke"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"lineJoin"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"lineCap"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"strokeWidth"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"drawFunc"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"drawHitFunc"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"dashArray"),Kinetic.Factory.addColorGetterSetter(Kinetic.Shape,"shadowColor"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"shadowBlur"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"shadowOpacity"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillPatternImage"),Kinetic.Factory.addColorGetterSetter(Kinetic.Shape,"fill"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillPatternX"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillPatternY"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillLinearGradientColorStops"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillRadialGradientStartRadius"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillRadialGradientEndRadius"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillRadialGradientColorStops"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillPatternRepeat"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillEnabled",!0),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"strokeEnabled",!0),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"shadowEnabled",!0),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"dashArrayEnabled",!0),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"fillPriority","color"),Kinetic.Factory.addGetterSetter(Kinetic.Shape,"strokeScaleEnabled",!0),Kinetic.Factory.addPointGetterSetter(Kinetic.Shape,"fillPatternOffset",0),Kinetic.Factory.addPointGetterSetter(Kinetic.Shape,"fillPatternScale",1),Kinetic.Factory.addPointGetterSetter(Kinetic.Shape,"fillLinearGradientStartPoint",0),Kinetic.Factory.addPointGetterSetter(Kinetic.Shape,"fillLinearGradientEndPoint",0),Kinetic.Factory.addPointGetterSetter(Kinetic.Shape,"fillRadialGradientStartPoint",0),Kinetic.Factory.addPointGetterSetter(Kinetic.Shape,"fillRadialGradientEndPoint",0),Kinetic.Factory.addPointGetterSetter(Kinetic.Shape,"shadowOffset",0),Kinetic.Factory.addRotationGetterSetter(Kinetic.Shape,"fillPatternRotation",0)}();/*! KineticJS v4.7.4 2013-11-08 http://www.kineticjs.com by Eric Rowell @ericdrowell - MIT License https://github.com/ericdrowell/KineticJS/wiki/License*/
!function(){function a(a,b){a.content.addEventListener(b,function(c){a[I+b](c)},!1)}var b="Stage",c="string",d="px",e="mouseout",f="mouseleave",g="mouseover",h="mouseenter",i="mousemove",j="mousedown",k="mouseup",l="click",m="dblclick",n="touchstart",o="touchend",p="tap",q="dbltap",r="touchmove",s="contentMouseout",t="contentMouseover",u="contentMousemove",v="contentMousedown",w="contentMouseup",x="contentClick",y="contentDblclick",z="contentTouchstart",A="contentTouchend",B="contentDbltap",C="contentTouchmove",D="div",E="relative",F="inline-block",G="kineticjs-content",H=" ",I="_",J="container",K="",L=[j,i,k,e,n,r,o,g],M=L.length;Kinetic.Util.addMethods(Kinetic.Stage,{___init:function(a){this.nodeType=b,Kinetic.Container.call(this,a),this._id=Kinetic.idCounter++,this._buildDOM(),this._bindContentEvents(),Kinetic.stages.push(this)},_validateAdd:function(a){"Layer"!==a.getType()&&Kinetic.Util.error("You may only add layers to the stage.")},setContainer:function(a){return typeof a===c&&(a=document.getElementById(a)),this._setAttr(J,a),this},draw:function(){return Kinetic.Node.prototype.draw.call(this),this},setHeight:function(a){return Kinetic.Node.prototype.setHeight.call(this,a),this._resizeDOM(),this},setWidth:function(a){return Kinetic.Node.prototype.setWidth.call(this,a),this._resizeDOM(),this},clear:function(){var a,b=this.children,c=b.length;for(a=0;c>a;a++)b[a].clear();return this},destroy:function(){var a=this.content;Kinetic.Container.prototype.destroy.call(this),a&&Kinetic.Util._isInDocument(a)&&this.getContainer().removeChild(a)},getPointerPosition:function(){return this.pointerPos},getStage:function(){return this},getContent:function(){return this.content},toDataURL:function(a){function b(e){var f=i[e],j=f.toDataURL(),k=new Image;k.onload=function(){h.drawImage(k,0,0),e<i.length-1?b(e+1):a.callback(g.toDataURL(c,d))},k.src=j}a=a||{};var c=a.mimeType||null,d=a.quality||null,e=a.x||0,f=a.y||0,g=new Kinetic.SceneCanvas({width:a.width||this.getWidth(),height:a.height||this.getHeight(),pixelRatio:1}),h=g.getContext()._context,i=this.children;(e||f)&&h.translate(-1*e,-1*f),b(0)},toImage:function(a){var b=a.callback;a.callback=function(a){Kinetic.Util._getImage(a,function(a){b(a)})},this.toDataURL(a)},getIntersection:function(){var a,b,c=Kinetic.Util._getXY(Array.prototype.slice.call(arguments)),d=this.getChildren(),e=d.length,f=e-1;for(a=f;a>=0;a--)if(b=d[a].getIntersection(c))return b;return null},_resizeDOM:function(){if(this.content){var a,b,c=this.getWidth(),e=this.getHeight(),f=this.getChildren(),g=f.length;for(this.content.style.width=c+d,this.content.style.height=e+d,this.bufferCanvas.setSize(c,e),this.bufferHitCanvas.setSize(c,e),a=0;g>a;a++)b=f[a],b.getCanvas().setSize(c,e),b.hitCanvas.setSize(c,e),b.draw()}},add:function(a){return Kinetic.Container.prototype.add.call(this,a),a.canvas.setSize(this.attrs.width,this.attrs.height),a.hitCanvas.setSize(this.attrs.width,this.attrs.height),a.draw(),this.content.appendChild(a.canvas._canvas),this},getParent:function(){return null},getLayer:function(){return null},getLayers:function(){return this.getChildren()},_bindContentEvents:function(){var b;for(b=0;M>b;b++)a(this,L[b])},_mouseover:function(a){this._fire(t,a)},_mouseout:function(a){this._setPointerPosition(a);var b=this.targetShape;b&&!Kinetic.isDragging()&&(b._fireAndBubble(e,a),b._fireAndBubble(f,a),this.targetShape=null),this.pointerPos=void 0,this._fire(s,a)},_mousemove:function(a){this._setPointerPosition(a);var b=Kinetic.DD,c=this.getIntersection(this.getPointerPosition()),d=c&&c.shape?c.shape:void 0;d?Kinetic.isDragging()||255!==c.pixel[3]||this.targetShape&&this.targetShape._id===d._id?d._fireAndBubble(i,a):(this.targetShape&&(this.targetShape._fireAndBubble(e,a,d),this.targetShape._fireAndBubble(f,a,d)),d._fireAndBubble(g,a,this.targetShape),d._fireAndBubble(h,a,this.targetShape),this.targetShape=d):this.targetShape&&!Kinetic.isDragging()&&(this.targetShape._fireAndBubble(e,a),this.targetShape._fireAndBubble(f,a),this.targetShape=null),this._fire(u,a),b&&b._drag(a),a.preventDefault&&a.preventDefault()},_mousedown:function(a){this._setPointerPosition(a);var b=this.getIntersection(this.getPointerPosition()),c=b&&b.shape?b.shape:void 0;Kinetic.listenClickTap=!0,c&&(this.clickStartShape=c,c._fireAndBubble(j,a)),this._fire(v,a),a.preventDefault&&a.preventDefault()},_mouseup:function(a){this._setPointerPosition(a);var b=this.getIntersection(this.getPointerPosition()),c=b&&b.shape?b.shape:void 0,d=!1;Kinetic.inDblClickWindow?(d=!0,Kinetic.inDblClickWindow=!1):Kinetic.inDblClickWindow=!0,setTimeout(function(){Kinetic.inDblClickWindow=!1},Kinetic.dblClickWindow),c&&(c._fireAndBubble(k,a),Kinetic.listenClickTap&&c._id===this.clickStartShape._id&&(c._fireAndBubble(l,a),d&&c._fireAndBubble(m,a))),this._fire(w,a),Kinetic.listenClickTap&&(this._fire(x,a),d&&this._fire(y,a)),Kinetic.listenClickTap=!1,a.preventDefault&&a.preventDefault()},_touchstart:function(a){this._setPointerPosition(a);var b=this.getIntersection(this.getPointerPosition()),c=b&&b.shape?b.shape:void 0;Kinetic.listenClickTap=!0,c&&(this.tapStartShape=c,c._fireAndBubble(n,a),c.isListening()&&a.preventDefault&&a.preventDefault()),this._fire(z,a)},_touchend:function(a){this._setPointerPosition(a);var b=this.getIntersection(this.getPointerPosition()),c=b&&b.shape?b.shape:void 0,d=!1;Kinetic.inDblClickWindow?(d=!0,Kinetic.inDblClickWindow=!1):Kinetic.inDblClickWindow=!0,setTimeout(function(){Kinetic.inDblClickWindow=!1},Kinetic.dblClickWindow),c&&(c._fireAndBubble(o,a),Kinetic.listenClickTap&&c._id===this.tapStartShape._id&&(c._fireAndBubble(p,a),d&&c._fireAndBubble(q,a)),c.isListening()&&a.preventDefault&&a.preventDefault()),Kinetic.listenClickTap&&(this._fire(A,a),d&&this._fire(B,a)),Kinetic.listenClickTap=!1},_touchmove:function(a){this._setPointerPosition(a);var b=Kinetic.DD,c=this.getIntersection(this.getPointerPosition()),d=c&&c.shape?c.shape:void 0;d&&(d._fireAndBubble(r,a),d.isListening()&&a.preventDefault&&a.preventDefault()),this._fire(C,a),b&&b._drag(a)},_setPointerPosition:function(a){var b,a=a?a:window.event,c=this._getContentPosition(),d=a.offsetX,e=a.clientX,f=null,g=null;void 0!==a.touches?1===a.touches.length&&(b=a.touches[0],f=b.clientX-c.left,g=b.clientY-c.top):void 0!==d?(f=d,g=a.offsetY):"mozilla"===Kinetic.UA.browser?(f=a.layerX,g=a.layerY):void 0!==e&&c&&(f=e-c.left,g=a.clientY-c.top),null!==f&&null!==g&&(this.pointerPos={x:f,y:g})},_getContentPosition:function(){var a=this.content.getBoundingClientRect?this.content.getBoundingClientRect():{top:0,left:0};return{top:a.top,left:a.left}},_buildDOM:function(){var a=this.getContainer();a.innerHTML=K,this.content=document.createElement(D),this.content.style.position=E,this.content.style.display=F,this.content.className=G,this.content.setAttribute("role","presentation"),a.appendChild(this.content),this.bufferCanvas=new Kinetic.SceneCanvas({pixelRatio:1}),this.bufferHitCanvas=new Kinetic.HitCanvas,this._resizeDOM()},_onContent:function(a,b){var c,d,e=a.split(H),f=e.length;for(c=0;f>c;c++)d=e[c],this.content.addEventListener(d,b,!1)}}),Kinetic.Util.extend(Kinetic.Stage,Kinetic.Container),Kinetic.Factory.addGetter(Kinetic.Stage,"container")}();/*! KineticJS v4.7.4 2013-11-08 http://www.kineticjs.com by Eric Rowell @ericdrowell - MIT License https://github.com/ericdrowell/KineticJS/wiki/License*/
!function(){var a="#",b="beforeDraw",c="draw";Kinetic.Util.addMethods(Kinetic.Layer,{___init:function(a){this.nodeType="Layer",this.canvas=new Kinetic.SceneCanvas,this.hitCanvas=new Kinetic.HitCanvas,Kinetic.Container.call(this,a)},_validateAdd:function(a){var b=a.getType();"Group"!==b&&"Shape"!==b&&Kinetic.Util.error("You may only add groups and shapes to a layer.")},getIntersection:function(){var b,c,d,e=Kinetic.Util._getXY(Array.prototype.slice.call(arguments));if(this.isVisible()&&this.isListening()){if(b=this.hitCanvas.context._context.getImageData(0|e.x,0|e.y,1,1).data,255===b[3])return c=Kinetic.Util._rgbToHex(b[0],b[1],b[2]),d=Kinetic.shapes[a+c],{shape:d,pixel:b};if(b[0]>0||b[1]>0||b[2]>0||b[3]>0)return{pixel:b}}return null},drawScene:function(a){return a=a||this.getCanvas(),this._fire(b,{node:this}),this.getClearBeforeDraw()&&a.getContext().clear(),Kinetic.Container.prototype.drawScene.call(this,a),this._fire(c,{node:this}),this},drawHit:function(){var a=this.getLayer();return a&&a.getClearBeforeDraw()&&a.getHitCanvas().getContext().clear(),Kinetic.Container.prototype.drawHit.call(this),this},getCanvas:function(){return this.canvas},getHitCanvas:function(){return this.hitCanvas},getContext:function(){return this.getCanvas().getContext()},clear:function(){var a=this.getContext(),b=this.getHitCanvas().getContext();return a.clear.apply(a,arguments),b.clear.apply(b,arguments),this},setVisible:function(a){return Kinetic.Node.prototype.setVisible.call(this,a),a?(this.getCanvas()._canvas.style.display="block",this.hitCanvas._canvas.style.display="block"):(this.getCanvas()._canvas.style.display="none",this.hitCanvas._canvas.style.display="none"),this},setZIndex:function(a){Kinetic.Node.prototype.setZIndex.call(this,a);var b=this.getStage();return b&&(b.content.removeChild(this.getCanvas()._canvas),a<b.getChildren().length-1?b.content.insertBefore(this.getCanvas()._canvas,b.getChildren()[a+1].getCanvas()._canvas):b.content.appendChild(this.getCanvas()._canvas)),this},moveToTop:function(){Kinetic.Node.prototype.moveToTop.call(this);var a=this.getStage();a&&(a.content.removeChild(this.getCanvas()._canvas),a.content.appendChild(this.getCanvas()._canvas))},moveUp:function(){if(Kinetic.Node.prototype.moveUp.call(this)){var a=this.getStage();a&&(a.content.removeChild(this.getCanvas()._canvas),this.index<a.getChildren().length-1?a.content.insertBefore(this.getCanvas()._canvas,a.getChildren()[this.index+1].getCanvas()._canvas):a.content.appendChild(this.getCanvas()._canvas))}},moveDown:function(){if(Kinetic.Node.prototype.moveDown.call(this)){var a=this.getStage();if(a){var b=a.getChildren();a.content.removeChild(this.getCanvas()._canvas),a.content.insertBefore(this.getCanvas()._canvas,b[this.index+1].getCanvas()._canvas)}}},moveToBottom:function(){if(Kinetic.Node.prototype.moveToBottom.call(this)){var a=this.getStage();if(a){var b=a.getChildren();a.content.removeChild(this.getCanvas()._canvas),a.content.insertBefore(this.getCanvas()._canvas,b[1].getCanvas()._canvas)}}},getLayer:function(){return this},remove:function(){var a=this.getStage(),b=this.getCanvas(),c=b._canvas;return Kinetic.Node.prototype.remove.call(this),a&&c&&Kinetic.Util._isInDocument(c)&&a.content.removeChild(c),this},getStage:function(){return this.parent}}),Kinetic.Util.extend(Kinetic.Layer,Kinetic.Container),Kinetic.Factory.addGetterSetter(Kinetic.Layer,"clearBeforeDraw",!0)}();/*! KineticJS v4.7.4 2013-11-08 http://www.kineticjs.com by Eric Rowell @ericdrowell - MIT License https://github.com/ericdrowell/KineticJS/wiki/License*/
!function(){Kinetic.Util.addMethods(Kinetic.Group,{___init:function(a){this.nodeType="Group",Kinetic.Container.call(this,a)},_validateAdd:function(a){var b=a.getType();"Group"!==b&&"Shape"!==b&&Kinetic.Util.error("You may only add groups and shapes to groups.")}}),Kinetic.Util.extend(Kinetic.Group,Kinetic.Container)}();/*! KineticJS v4.7.4 2013-11-08 http://www.kineticjs.com by Eric Rowell @ericdrowell - MIT License https://github.com/ericdrowell/KineticJS/wiki/License*/
!function(){Kinetic.Rect=function(a){this.___init(a)},Kinetic.Rect.prototype={___init:function(a){Kinetic.Shape.call(this,a),this.className="Rect"},drawFunc:function(a){var b=this.getCornerRadius(),c=this.getWidth(),d=this.getHeight();a.beginPath(),b?(a.moveTo(b,0),a.lineTo(c-b,0),a.arc(c-b,b,b,3*Math.PI/2,0,!1),a.lineTo(c,d-b),a.arc(c-b,d-b,b,0,Math.PI/2,!1),a.lineTo(b,d),a.arc(b,d-b,b,Math.PI/2,Math.PI,!1),a.lineTo(0,b),a.arc(b,b,b,Math.PI,3*Math.PI/2,!1)):a.rect(0,0,c,d),a.closePath(),a.fillStrokeShape(this)}},Kinetic.Util.extend(Kinetic.Rect,Kinetic.Shape),Kinetic.Factory.addGetterSetter(Kinetic.Rect,"cornerRadius",0)}();/*! KineticJS v4.7.4 2013-11-08 http://www.kineticjs.com by Eric Rowell @ericdrowell - MIT License https://github.com/ericdrowell/KineticJS/wiki/License*/
!function(){var a=2*Math.PI-1e-4,b="Ellipse";Kinetic.Ellipse=function(a){this.___init(a)},Kinetic.Ellipse.prototype={___init:function(a){Kinetic.Shape.call(this,a),this.className=b},drawFunc:function(b){var c=this.getRadius();b.beginPath(),b.save(),c.x!==c.y&&b.scale(1,c.y/c.x),b.arc(0,0,c.x,0,a,!1),b.restore(),b.closePath(),b.fillStrokeShape(this)},getWidth:function(){return 2*this.getRadius().x},getHeight:function(){return 2*this.getRadius().y},setWidth:function(a){Kinetic.Node.prototype.setWidth.call(this,a),this.setRadius({x:a/2})},setHeight:function(a){Kinetic.Node.prototype.setHeight.call(this,a),this.setRadius({y:a/2})}},Kinetic.Util.extend(Kinetic.Ellipse,Kinetic.Shape),Kinetic.Factory.addPointGetterSetter(Kinetic.Ellipse,"radius",0)}();/*! KineticJS v4.7.4 2013-11-08 http://www.kineticjs.com by Eric Rowell @ericdrowell - MIT License https://github.com/ericdrowell/KineticJS/wiki/License*/
!function(){var a="Image",b="set";Kinetic.Image=function(a){this.___init(a)},Kinetic.Image.prototype={___init:function(b){Kinetic.Shape.call(this,b),this.className=a},_useBufferCanvas:function(){return(this.hasShadow()||1!==this.getAbsoluteOpacity())&&this.hasStroke()},drawFunc:function(a){var b,c,d,e=this.getWidth(),f=this.getHeight();this.getFilter()&&this._applyFilter&&(this.applyFilter(),this._applyFilter=!1),this.filterCanvas?(d=this.filterCanvas._canvas,c=[d,0,0,e,f]):(d=this.getImage(),d&&(b=this.getCrop(),b?(b.x=b.x||0,b.y=b.y||0,b.width=b.width||d.width-b.x,b.height=b.height||d.height-b.y,c=[d,b.x,b.y,b.width,b.height,0,0,e,f]):c=[d,0,0,e,f])),a.beginPath(),a.rect(0,0,e,f),a.closePath(),a.fillStrokeShape(this),d&&a.drawImage.apply(a,c)},drawHitFunc:function(a){var b=this.getWidth(),c=this.getHeight(),d=this.imageHitRegion;d?(a.drawImage(d,0,0),a.beginPath(),a.rect(0,0,b,c),a.closePath(),a.strokeShape(this)):(a.beginPath(),a.rect(0,0,b,c),a.closePath(),a.fillStrokeShape(this))},applyFilter:function(){var a,b,c,d=this.getImage(),e=(this.getWidth(),this.getHeight(),this.getFilter()),f=this.getCrop()||{};f.x=f.x||0,f.y=f.y||0,f.width=f.width||d.width-f.x,f.height=f.height||d.height-f.y,this.filterCanvas&&this.filterCanvas.getWidth()===f.width&&this.filterCanvas.getHeight()===f.height?(a=this.filterCanvas,a.getContext().clear()):a=this.filterCanvas=new Kinetic.SceneCanvas({width:f.width,height:f.height,pixelRatio:1}),b=a.getContext();try{b.drawImage(d,f.x,f.y,f.width,f.height,0,0,f.width,f.height),c=b.getImageData(0,0,f.width,f.height),e.call(this,c),b.putImageData(c,0,0)}catch(g){this.clearFilter(),Kinetic.Util.warn("Unable to apply filter. "+g.message)}},clearFilter:function(){this.filterCanvas=null,this._applyFilter=!1},createImageHitRegion:function(a){var b,c,d,e,f,g=this,h=this.getWidth(),i=this.getHeight(),j=new Kinetic.SceneCanvas({width:h,height:i,pixelRatio:1}),k=j.getContext()._context,l=this.getImage();k.drawImage(l,0,0);try{for(b=k.getImageData(0,0,h,i),c=b.data,f=c.length,d=Kinetic.Util._hexToRgb(this.colorKey),e=0;f>e;e+=4)c[e+3]>0&&(c[e]=d.r,c[e+1]=d.g,c[e+2]=d.b);Kinetic.Util._getImage(b,function(b){g.imageHitRegion=b,a&&a()})}catch(m){Kinetic.Util.warn("Unable to create image hit region. "+m.message)}},clearImageHitRegion:function(){delete this.imageHitRegion},getWidth:function(){var a=this.getImage();return this.attrs.width||(a?a.width:0)},getHeight:function(){var a=this.getImage();return this.attrs.height||(a?a.height:0)},destroy:function(){return Kinetic.Shape.prototype.destroy.call(this),delete this.filterCanvas,delete this.attrs,this}},Kinetic.Util.extend(Kinetic.Image,Kinetic.Shape),Kinetic.Factory.addFilterGetterSetter=function(a,b,c){this.addGetter(a,b,c),this.addFilterSetter(a,b)},Kinetic.Factory.addFilterSetter=function(a,c){var d=b+Kinetic.Util._capitalize(c);a.prototype[d]=function(a){this._setAttr(c,a),this._applyFilter=!0}},Kinetic.Factory.addGetterSetter(Kinetic.Image,"image"),Kinetic.Factory.addBoxGetterSetter(Kinetic.Image,"crop"),Kinetic.Factory.addFilterGetterSetter(Kinetic.Image,"filter")}();/*! KineticJS v4.7.4 2013-11-08 http://www.kineticjs.com by Eric Rowell @ericdrowell - MIT License https://github.com/ericdrowell/KineticJS/wiki/License*/
!function(){function a(a){a.fillText(this.partialText,0,0)}function b(a){a.strokeText(this.partialText,0,0)}var c="auto",d="canvas",e="center",f="Change.kinetic",g="2d",h="-",i="",j="left",k="text",l="Text",m="middle",n="normal",o="px ",p=" ",q="right",r="word",s="char",t="none",u=["fontFamily","fontSize","fontStyle","padding","align","lineHeight","text","width","height","wrap"],v=u.length,w=document.createElement(d).getContext(g);Kinetic.Text=function(a){this.___init(a)},Kinetic.Text.prototype={___init:function(d){var e=this;void 0===d.width&&(d.width=c),void 0===d.height&&(d.height=c),Kinetic.Shape.call(this,d),this._fillFunc=a,this._strokeFunc=b,this.className=l;for(var g=0;v>g;g++)this.on(u[g]+f,e._setTextData);this._setTextData()},drawFunc:function(a){var b=this.getPadding(),c=(this.getFontStyle(),this.getFontSize(),this.getFontFamily(),this.getTextHeight()),d=this.getLineHeight()*c,f=this.textArr,g=f.length,h=this.getWidth();a.setAttr("font",this._getContextFont()),a.setAttr("textBaseline",m),a.setAttr("textAlign",j),a.save(),a.translate(b,0),a.translate(0,b+c/2);for(var i=0;g>i;i++){var k=f[i],l=k.text,n=k.width;a.save(),this.getAlign()===q?a.translate(h-n-2*b,0):this.getAlign()===e&&a.translate((h-n-2*b)/2,0),this.partialText=l,a.fillStrokeShape(this),a.restore(),a.translate(0,d)}a.restore()},drawHitFunc:function(a){var b=this.getWidth(),c=this.getHeight();a.beginPath(),a.rect(0,0,b,c),a.closePath(),a.fillStrokeShape(this)},setText:function(a){var b=Kinetic.Util._isString(a)?a:a.toString();this._setAttr(k,b)},getWidth:function(){return this.attrs.width===c?this.getTextWidth()+2*this.getPadding():this.attrs.width},getHeight:function(){return this.attrs.height===c?this.getTextHeight()*this.textArr.length*this.getLineHeight()+2*this.getPadding():this.attrs.height},getTextWidth:function(){return this.textWidth},getTextHeight:function(){return this.textHeight},_getTextSize:function(a){var b,c=w,d=this.getFontSize();return c.save(),c.font=this._getContextFont(),b=c.measureText(a),c.restore(),{width:b.width,height:parseInt(d,10)}},_getContextFont:function(){return this.getFontStyle()+p+this.getFontSize()+o+this.getFontFamily()},_addTextLine:function(a,b){return this.textArr.push({text:a,width:b})},_getTextWidth:function(a){return w.measureText(a).width},_setTextData:function(){var a=this.getText().split("\n"),b=+this.getFontSize(),d=0,e=this.getLineHeight()*b,f=this.attrs.width,g=this.attrs.height,i=f!==c,j=g!==c,k=this.getPadding(),l=f-2*k,m=g-2*k,n=0,q=this.getWrap(),r=q!==t,u=q!==s&&r;this.textArr=[],w.save(),w.font=this.getFontStyle()+p+b+o+this.getFontFamily();for(var v=0,x=a.length;x>v;++v){var y=a[v],z=this._getTextWidth(y);if(i&&z>l)for(;y.length>0;){for(var A=0,B=y.length,C="",D=0;B>A;){var E=A+B>>>1,F=y.slice(0,E+1),G=this._getTextWidth(F);l>=G?(A=E+1,C=F,D=G):B=E}if(!C)break;if(u){var H=Math.max(C.lastIndexOf(p),C.lastIndexOf(h))+1;H>0&&(A=H,C=C.slice(0,A),D=this._getTextWidth(C))}if(this._addTextLine(C,D),n+=e,!r||j&&n+e>m)break;if(y=y.slice(A),y.length>0&&(z=this._getTextWidth(y),l>=z)){this._addTextLine(y,z),n+=e;break}}else this._addTextLine(y,z),n+=e,d=Math.max(d,z);if(j&&n+e>m)break}w.restore(),this.textHeight=b,this.textWidth=d}},Kinetic.Util.extend(Kinetic.Text,Kinetic.Shape),Kinetic.Factory.addGetterSetter(Kinetic.Text,"fontFamily","Arial"),Kinetic.Factory.addGetterSetter(Kinetic.Text,"fontSize",12),Kinetic.Factory.addGetterSetter(Kinetic.Text,"fontStyle",n),Kinetic.Factory.addGetterSetter(Kinetic.Text,"padding",0),Kinetic.Factory.addGetterSetter(Kinetic.Text,"align",j),Kinetic.Factory.addGetterSetter(Kinetic.Text,"lineHeight",1),Kinetic.Factory.addGetterSetter(Kinetic.Text,"wrap",r),Kinetic.Factory.addGetter(Kinetic.Text,k,i),Kinetic.Factory.addSetter(Kinetic.Text,"width"),Kinetic.Factory.addSetter(Kinetic.Text,"height")}();/*! KineticJS v4.7.4 2013-11-08 http://www.kineticjs.com by Eric Rowell @ericdrowell - MIT License https://github.com/ericdrowell/KineticJS/wiki/License*/
!function(){Kinetic.Line=function(a){this.___init(a)},Kinetic.Line.prototype={___init:function(a){Kinetic.Shape.call(this,a),this.className="Line"},drawFunc:function(a){var b,c,d=this.getPoints(),e=d.length;for(a.beginPath(),a.moveTo(d[0].x,d[0].y),b=1;e>b;b++)c=d[b],a.lineTo(c.x,c.y);a.strokeShape(this)}},Kinetic.Util.extend(Kinetic.Line,Kinetic.Shape),Kinetic.Factory.addPointsGetterSetter(Kinetic.Line,"points")}();

;(function(){

/**
 * Require the given path.
 *
 * @param {String} path
 * @return {Object} exports
 * @api public
 */

function require(path, parent, orig) {
  var resolved = require.resolve(path);

  // lookup failed
  if (null == resolved) {
    orig = orig || path;
    parent = parent || 'root';
    var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
    err.path = orig;
    err.parent = parent;
    err.require = true;
    throw err;
  }

  var module = require.modules[resolved];

  // perform real require()
  // by invoking the module's
  // registered function
  if (!module.exports) {
    module.exports = {};
    module.client = module.component = true;
    module.call(this, module.exports, require.relative(resolved), module);
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Registered aliases.
 */

require.aliases = {};

/**
 * Resolve `path`.
 *
 * Lookup:
 *
 *   - PATH/index.js
 *   - PATH.js
 *   - PATH
 *
 * @param {String} path
 * @return {String} path or null
 * @api private
 */

require.resolve = function(path) {
  if (path.charAt(0) === '/') path = path.slice(1);

  var paths = [
    path,
    path + '.js',
    path + '.json',
    path + '/index.js',
    path + '/index.json'
  ];

  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    if (require.modules.hasOwnProperty(path)) return path;
    if (require.aliases.hasOwnProperty(path)) return require.aliases[path];
  }
};

/**
 * Normalize `path` relative to the current path.
 *
 * @param {String} curr
 * @param {String} path
 * @return {String}
 * @api private
 */

require.normalize = function(curr, path) {
  var segs = [];

  if ('.' != path.charAt(0)) return path;

  curr = curr.split('/');
  path = path.split('/');

  for (var i = 0; i < path.length; ++i) {
    if ('..' == path[i]) {
      curr.pop();
    } else if ('.' != path[i] && '' != path[i]) {
      segs.push(path[i]);
    }
  }

  return curr.concat(segs).join('/');
};

/**
 * Register module at `path` with callback `definition`.
 *
 * @param {String} path
 * @param {Function} definition
 * @api private
 */

require.register = function(path, definition) {
  require.modules[path] = definition;
};

/**
 * Alias a module definition.
 *
 * @param {String} from
 * @param {String} to
 * @api private
 */

require.alias = function(from, to) {
  if (!require.modules.hasOwnProperty(from)) {
    throw new Error('Failed to alias "' + from + '", it does not exist');
  }
  require.aliases[to] = from;
};

/**
 * Return a require function relative to the `parent` path.
 *
 * @param {String} parent
 * @return {Function}
 * @api private
 */

require.relative = function(parent) {
  var p = require.normalize(parent, '..');

  /**
   * lastIndexOf helper.
   */

  function lastIndexOf(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) return i;
    }
    return -1;
  }

  /**
   * The relative require() itself.
   */

  function localRequire(path) {
    var resolved = localRequire.resolve(path);
    return require(resolved, parent, path);
  }

  /**
   * Resolve relative to the parent.
   */

  localRequire.resolve = function(path) {
    var c = path.charAt(0);
    if ('/' == c) return path.slice(1);
    if ('.' == c) return require.normalize(p, path);

    // resolve deps by returning
    // the dep in the nearest "deps"
    // directory
    var segs = parent.split('/');
    var i = lastIndexOf(segs, 'deps') + 1;
    if (!i) i = 0;
    path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
    return path;
  };

  /**
   * Check if module is defined at `path`.
   */

  localRequire.exists = function(path) {
    return require.modules.hasOwnProperty(localRequire.resolve(path));
  };

  return localRequire;
};
require.register("component-emitter/index.js", function(exports, require, module){

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  fn._off = on;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners = function(event, fn){
  this._callbacks = this._callbacks || {};
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var i = callbacks.indexOf(fn._off || fn);
  if (~i) callbacks.splice(i, 1);
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

});
require.register("dropzone/index.js", function(exports, require, module){


/**
 * Exposing dropzone
 */
module.exports = require("./lib/dropzone.js");

});
require.register("dropzone/lib/dropzone.js", function(exports, require, module){
/*
#
# More info at [www.dropzonejs.com](http://www.dropzonejs.com)
# 
# Copyright (c) 2012, Matias Meno  
# 
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
#
*/


(function() {
  var Dropzone, Em, camelize, contentLoaded, noop, without,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Em = typeof Emitter !== "undefined" && Emitter !== null ? Emitter : require("emitter");

  noop = function() {};

  Dropzone = (function(_super) {
    var extend;

    __extends(Dropzone, _super);

    /*
    This is a list of all available events you can register on a dropzone object.
    
    You can register an event handler like this:
    
        dropzone.on("dragEnter", function() { });
    */


    Dropzone.prototype.events = ["drop", "dragstart", "dragend", "dragenter", "dragover", "dragleave", "selectedfiles", "addedfile", "removedfile", "thumbnail", "error", "errormultiple", "processing", "processingmultiple", "uploadprogress", "totaluploadprogress", "sending", "sendingmultiple", "success", "successmultiple", "canceled", "canceledmultiple", "complete", "completemultiple", "reset", "maxfilesexceeded"];

    Dropzone.prototype.defaultOptions = {
      url: null,
      method: "post",
      withCredentials: false,
      parallelUploads: 2,
      uploadMultiple: false,
      maxFilesize: 256,
      paramName: "file",
      createImageThumbnails: true,
      maxThumbnailFilesize: 10,
      thumbnailWidth: 100,
      thumbnailHeight: 100,
      maxFiles: null,
      params: {},
      clickable: true,
      ignoreHiddenFiles: true,
      acceptedFiles: null,
      acceptedMimeTypes: null,
      autoProcessQueue: true,
      addRemoveLinks: false,
      previewsContainer: null,
      dictDefaultMessage: "Drop files here to upload",
      dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",
      dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",
      dictFileTooBig: "File is too big ({{filesize}}MB). Max filesize: {{maxFilesize}}MB.",
      dictInvalidFileType: "You can't upload files of this type.",
      dictResponseError: "Server responded with {{statusCode}} code.",
      dictCancelUpload: "Cancel upload",
      dictCancelUploadConfirmation: "Are you sure you want to cancel this upload?",
      dictRemoveFile: "Remove file",
      dictRemoveFileConfirmation: null,
      dictMaxFilesExceeded: "You can only upload {{maxFiles}} files.",
      accept: function(file, done) {
        return done();
      },
      init: function() {
        return noop;
      },
      forceFallback: false,
      fallback: function() {
        var child, messageElement, span, _i, _len, _ref;
        this.element.className = "" + this.element.className + " dz-browser-not-supported";
        _ref = this.element.getElementsByTagName("div");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          if (/(^| )dz-message($| )/.test(child.className)) {
            messageElement = child;
            child.className = "dz-message";
            continue;
          }
        }
        if (!messageElement) {
          messageElement = Dropzone.createElement("<div class=\"dz-message\"><span></span></div>");
          this.element.appendChild(messageElement);
        }
        span = messageElement.getElementsByTagName("span")[0];
        if (span) {
          span.textContent = this.options.dictFallbackMessage;
        }
        return this.element.appendChild(this.getFallbackForm());
      },
      resize: function(file) {
        var info, srcRatio, trgRatio;
        info = {
          srcX: 0,
          srcY: 0,
          srcWidth: file.width,
          srcHeight: file.height
        };
        srcRatio = file.width / file.height;
        trgRatio = this.options.thumbnailWidth / this.options.thumbnailHeight;
        if (file.height < this.options.thumbnailHeight || file.width < this.options.thumbnailWidth) {
          info.trgHeight = info.srcHeight;
          info.trgWidth = info.srcWidth;
        } else {
          if (srcRatio > trgRatio) {
            info.srcHeight = file.height;
            info.srcWidth = info.srcHeight * trgRatio;
          } else {
            info.srcWidth = file.width;
            info.srcHeight = info.srcWidth / trgRatio;
          }
        }
        info.srcX = (file.width - info.srcWidth) / 2;
        info.srcY = (file.height - info.srcHeight) / 2;
        return info;
      },
      /*
      Those functions register themselves to the events on init and handle all
      the user interface specific stuff. Overwriting them won't break the upload
      but can break the way it's displayed.
      You can overwrite them if you don't like the default behavior. If you just
      want to add an additional event handler, register it on the dropzone object
      and don't overwrite those options.
      */

      drop: function(e) {
        return this.element.classList.remove("dz-drag-hover");
      },
      dragstart: noop,
      dragend: function(e) {
        return this.element.classList.remove("dz-drag-hover");
      },
      dragenter: function(e) {
        return this.element.classList.add("dz-drag-hover");
      },
      dragover: function(e) {
        return this.element.classList.add("dz-drag-hover");
      },
      dragleave: function(e) {
        return this.element.classList.remove("dz-drag-hover");
      },
      selectedfiles: function(files) {
        if (this.element === this.previewsContainer) {
          return this.element.classList.add("dz-started");
        }
      },
      reset: function() {
        return this.element.classList.remove("dz-started");
      },
      addedfile: function(file) {
        var _this = this;
        file.previewElement = Dropzone.createElement(this.options.previewTemplate);
        file.previewTemplate = file.previewElement;
        this.previewsContainer.appendChild(file.previewElement);
        file.previewElement.querySelector("[data-dz-name]").textContent = file.name;
        file.previewElement.querySelector("[data-dz-size]").innerHTML = this.filesize(file.size);
        if (this.options.addRemoveLinks) {
          file._removeLink = Dropzone.createElement("<a class=\"dz-remove\" href=\"javascript:undefined;\">" + this.options.dictRemoveFile + "</a>");
          file._removeLink.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (file.status === Dropzone.UPLOADING) {
              return Dropzone.confirm(_this.options.dictCancelUploadConfirmation, function() {
                return _this.removeFile(file);
              });
            } else {
              if (_this.options.dictRemoveFileConfirmation) {
                return Dropzone.confirm(_this.options.dictRemoveFileConfirmation, function() {
                  return _this.removeFile(file);
                });
              } else {
                return _this.removeFile(file);
              }
            }
          });
          file.previewElement.appendChild(file._removeLink);
        }
        return this._updateMaxFilesReachedClass();
      },
      removedfile: function(file) {
        var _ref;
        if ((_ref = file.previewElement) != null) {
          _ref.parentNode.removeChild(file.previewElement);
        }
        return this._updateMaxFilesReachedClass();
      },
      thumbnail: function(file, dataUrl) {
        var thumbnailElement;
        file.previewElement.classList.remove("dz-file-preview");
        file.previewElement.classList.add("dz-image-preview");
        thumbnailElement = file.previewElement.querySelector("[data-dz-thumbnail]");
        thumbnailElement.alt = file.name;
        return thumbnailElement.src = dataUrl;
      },
      error: function(file, message) {
        file.previewElement.classList.add("dz-error");
        return file.previewElement.querySelector("[data-dz-errormessage]").textContent = message;
      },
      errormultiple: noop,
      processing: function(file) {
        file.previewElement.classList.add("dz-processing");
        if (file._removeLink) {
          return file._removeLink.textContent = this.options.dictCancelUpload;
        }
      },
      processingmultiple: noop,
      uploadprogress: function(file, progress, bytesSent) {
        return file.previewElement.querySelector("[data-dz-uploadprogress]").style.width = "" + progress + "%";
      },
      totaluploadprogress: noop,
      sending: noop,
      sendingmultiple: noop,
      success: function(file) {
        return file.previewElement.classList.add("dz-success");
      },
      successmultiple: noop,
      canceled: function(file) {
        return this.emit("error", file, "Upload canceled.");
      },
      canceledmultiple: noop,
      complete: function(file) {
        if (file._removeLink) {
          return file._removeLink.textContent = this.options.dictRemoveFile;
        }
      },
      completemultiple: noop,
      maxfilesexceeded: noop,
      previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-details\">\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n    <div class=\"dz-size\" data-dz-size></div>\n    <img data-dz-thumbnail />\n  </div>\n  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n  <div class=\"dz-success-mark\"><span>?</span></div>\n  <div class=\"dz-error-mark\"><span>?</span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n</div>"
    };

    extend = function() {
      var key, object, objects, target, val, _i, _len;
      target = arguments[0], objects = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      for (_i = 0, _len = objects.length; _i < _len; _i++) {
        object = objects[_i];
        for (key in object) {
          val = object[key];
          target[key] = val;
        }
      }
      return target;
    };

    function Dropzone(element, options) {
      var elementOptions, fallback, _ref;
      this.element = element;
      this.version = Dropzone.version;
      this.defaultOptions.previewTemplate = this.defaultOptions.previewTemplate.replace(/\n*/g, "");
      this.clickableElements = [];
      this.listeners = [];
      this.files = [];
      if (typeof this.element === "string") {
        this.element = document.querySelector(this.element);
      }
      if (!(this.element && (this.element.nodeType != null))) {
        throw new Error("Invalid dropzone element.");
      }
      if (this.element.dropzone) {
        throw new Error("Dropzone already attached.");
      }
      Dropzone.instances.push(this);
      element.dropzone = this;
      elementOptions = (_ref = Dropzone.optionsForElement(this.element)) != null ? _ref : {};
      this.options = extend({}, this.defaultOptions, elementOptions, options != null ? options : {});
      if (this.options.forceFallback || !Dropzone.isBrowserSupported()) {
        return this.options.fallback.call(this);
      }
      if (this.options.url == null) {
        this.options.url = this.element.getAttribute("action");
      }
      if (!this.options.url) {
        throw new Error("No URL provided.");
      }
      if (this.options.acceptedFiles && this.options.acceptedMimeTypes) {
        throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");
      }
      if (this.options.acceptedMimeTypes) {
        this.options.acceptedFiles = this.options.acceptedMimeTypes;
        delete this.options.acceptedMimeTypes;
      }
      this.options.method = this.options.method.toUpperCase();
      if ((fallback = this.getExistingFallback()) && fallback.parentNode) {
        fallback.parentNode.removeChild(fallback);
      }
      if (this.options.previewsContainer) {
        this.previewsContainer = Dropzone.getElement(this.options.previewsContainer, "previewsContainer");
      } else {
        this.previewsContainer = this.element;
      }
      if (this.options.clickable) {
        if (this.options.clickable === true) {
          this.clickableElements = [this.element];
        } else {
          this.clickableElements = Dropzone.getElements(this.options.clickable, "clickable");
        }
      }
      this.init();
    }

    Dropzone.prototype.getAcceptedFiles = function() {
      var file, _i, _len, _ref, _results;
      _ref = this.files;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        if (file.accepted) {
          _results.push(file);
        }
      }
      return _results;
    };

    Dropzone.prototype.getRejectedFiles = function() {
      var file, _i, _len, _ref, _results;
      _ref = this.files;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        if (!file.accepted) {
          _results.push(file);
        }
      }
      return _results;
    };

    Dropzone.prototype.getQueuedFiles = function() {
      var file, _i, _len, _ref, _results;
      _ref = this.files;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        if (file.status === Dropzone.QUEUED) {
          _results.push(file);
        }
      }
      return _results;
    };

    Dropzone.prototype.getUploadingFiles = function() {
      var file, _i, _len, _ref, _results;
      _ref = this.files;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        if (file.status === Dropzone.UPLOADING) {
          _results.push(file);
        }
      }
      return _results;
    };

    Dropzone.prototype.init = function() {
      var eventName, noPropagation, setupHiddenFileInput, _i, _len, _ref, _ref1,
        _this = this;
      if (this.element.tagName === "form") {
        this.element.setAttribute("enctype", "multipart/form-data");
      }
      if (this.element.classList.contains("dropzone") && !this.element.querySelector(".dz-message")) {
        this.element.appendChild(Dropzone.createElement("<div class=\"dz-default dz-message\"><span>" + this.options.dictDefaultMessage + "</span></div>"));
      }
      if (this.clickableElements.length) {
        setupHiddenFileInput = function() {
          if (_this.hiddenFileInput) {
            document.body.removeChild(_this.hiddenFileInput);
          }
          _this.hiddenFileInput = document.createElement("input");
          _this.hiddenFileInput.setAttribute("type", "file");
          _this.hiddenFileInput.setAttribute("multiple", "multiple");
          if (_this.options.acceptedFiles != null) {
            _this.hiddenFileInput.setAttribute("accept", _this.options.acceptedFiles);
          }
          _this.hiddenFileInput.style.visibility = "hidden";
          _this.hiddenFileInput.style.position = "absolute";
          _this.hiddenFileInput.style.top = "0";
          _this.hiddenFileInput.style.left = "0";
          _this.hiddenFileInput.style.height = "0";
          _this.hiddenFileInput.style.width = "0";
          document.body.appendChild(_this.hiddenFileInput);
          return _this.hiddenFileInput.addEventListener("change", function() {
            var files;
            files = _this.hiddenFileInput.files;
            if (files.length) {
              _this.emit("selectedfiles", files);
              _this.handleFiles(files);
            }
            return setupHiddenFileInput();
          });
        };
        setupHiddenFileInput();
      }
      this.URL = (_ref = window.URL) != null ? _ref : window.webkitURL;
      _ref1 = this.events;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        eventName = _ref1[_i];
        this.on(eventName, this.options[eventName]);
      }
      this.on("uploadprogress", function() {
        return _this.updateTotalUploadProgress();
      });
      this.on("removedfile", function() {
        return _this.updateTotalUploadProgress();
      });
      this.on("canceled", function(file) {
        return _this.emit("complete", file);
      });
      noPropagation = function(e) {
        e.stopPropagation();
        if (e.preventDefault) {
          return e.preventDefault();
        } else {
          return e.returnValue = false;
        }
      };
      this.listeners = [
        {
          element: this.element,
          events: {
            "dragstart": function(e) {
              return _this.emit("dragstart", e);
            },
            "dragenter": function(e) {
              noPropagation(e);
              return _this.emit("dragenter", e);
            },
            "dragover": function(e) {
              noPropagation(e);
              return _this.emit("dragover", e);
            },
            "dragleave": function(e) {
              return _this.emit("dragleave", e);
            },
            "drop": function(e) {
              noPropagation(e);
              return _this.drop(e);
            },
            "dragend": function(e) {
              return _this.emit("dragend", e);
            }
          }
        }
      ];
      this.clickableElements.forEach(function(clickableElement) {
        return _this.listeners.push({
          element: clickableElement,
          events: {
            "click": function(evt) {
              if ((clickableElement !== _this.element) || (evt.target === _this.element || Dropzone.elementInside(evt.target, _this.element.querySelector(".dz-message")))) {
                return _this.hiddenFileInput.click();
              }
            }
          }
        });
      });
      this.enable();
      return this.options.init.call(this);
    };

    Dropzone.prototype.destroy = function() {
      var _ref;
      this.disable();
      this.removeAllFiles(true);
      if ((_ref = this.hiddenFileInput) != null ? _ref.parentNode : void 0) {
        this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput);
        this.hiddenFileInput = null;
      }
      return delete this.element.dropzone;
    };

    Dropzone.prototype.updateTotalUploadProgress = function() {
      var acceptedFiles, file, totalBytes, totalBytesSent, totalUploadProgress, _i, _len, _ref;
      totalBytesSent = 0;
      totalBytes = 0;
      acceptedFiles = this.getAcceptedFiles();
      if (acceptedFiles.length) {
        _ref = this.getAcceptedFiles();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          file = _ref[_i];
          totalBytesSent += file.upload.bytesSent;
          totalBytes += file.upload.total;
        }
        totalUploadProgress = 100 * totalBytesSent / totalBytes;
      } else {
        totalUploadProgress = 100;
      }
      return this.emit("totaluploadprogress", totalUploadProgress, totalBytes, totalBytesSent);
    };

    Dropzone.prototype.getFallbackForm = function() {
      var existingFallback, fields, fieldsString, form;
      if (existingFallback = this.getExistingFallback()) {
        return existingFallback;
      }
      fieldsString = "<div class=\"dz-fallback\">";
      if (this.options.dictFallbackText) {
        fieldsString += "<p>" + this.options.dictFallbackText + "</p>";
      }
      fieldsString += "<input type=\"file\" name=\"" + this.options.paramName + (this.options.uploadMultiple ? "[]" : "") + "\" " + (this.options.uploadMultiple ? 'multiple="multiple"' : void 0) + " /><button type=\"submit\">Upload!</button></div>";
      fields = Dropzone.createElement(fieldsString);
      if (this.element.tagName !== "FORM") {
        form = Dropzone.createElement("<form action=\"" + this.options.url + "\" enctype=\"multipart/form-data\" method=\"" + this.options.method + "\"></form>");
        form.appendChild(fields);
      } else {
        this.element.setAttribute("enctype", "multipart/form-data");
        this.element.setAttribute("method", this.options.method);
      }
      return form != null ? form : fields;
    };

    Dropzone.prototype.getExistingFallback = function() {
      var fallback, getFallback, tagName, _i, _len, _ref;
      getFallback = function(elements) {
        var el, _i, _len;
        for (_i = 0, _len = elements.length; _i < _len; _i++) {
          el = elements[_i];
          if (/(^| )fallback($| )/.test(el.className)) {
            return el;
          }
        }
      };
      _ref = ["div", "form"];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tagName = _ref[_i];
        if (fallback = getFallback(this.element.getElementsByTagName(tagName))) {
          return fallback;
        }
      }
    };

    Dropzone.prototype.setupEventListeners = function() {
      var elementListeners, event, listener, _i, _len, _ref, _results;
      _ref = this.listeners;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        elementListeners = _ref[_i];
        _results.push((function() {
          var _ref1, _results1;
          _ref1 = elementListeners.events;
          _results1 = [];
          for (event in _ref1) {
            listener = _ref1[event];
            _results1.push(elementListeners.element.addEventListener(event, listener, false));
          }
          return _results1;
        })());
      }
      return _results;
    };

    Dropzone.prototype.removeEventListeners = function() {
      var elementListeners, event, listener, _i, _len, _ref, _results;
      _ref = this.listeners;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        elementListeners = _ref[_i];
        _results.push((function() {
          var _ref1, _results1;
          _ref1 = elementListeners.events;
          _results1 = [];
          for (event in _ref1) {
            listener = _ref1[event];
            _results1.push(elementListeners.element.removeEventListener(event, listener, false));
          }
          return _results1;
        })());
      }
      return _results;
    };

    Dropzone.prototype.disable = function() {
      var file, _i, _len, _ref, _results;
      this.clickableElements.forEach(function(element) {
        return element.classList.remove("dz-clickable");
      });
      this.removeEventListeners();
      _ref = this.files;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        _results.push(this.cancelUpload(file));
      }
      return _results;
    };

    Dropzone.prototype.enable = function() {
      this.clickableElements.forEach(function(element) {
        return element.classList.add("dz-clickable");
      });
      return this.setupEventListeners();
    };

    Dropzone.prototype.filesize = function(size) {
      var string;
      if (size >= 100000000000) {
        size = size / 100000000000;
        string = "TB";
      } else if (size >= 100000000) {
        size = size / 100000000;
        string = "GB";
      } else if (size >= 100000) {
        size = size / 100000;
        string = "MB";
      } else if (size >= 100) {
        size = size / 100;
        string = "KB";
      } else {
        size = size * 10;
        string = "b";
      }
      return (Math.round(size) / 10) + string;
    };
	
    Dropzone.prototype._updateMaxFilesReachedClass = function() {
      if (this.options.maxFiles && this.getAcceptedFiles().length >= this.options.maxFiles) {
        return this.element.classList.add("dz-max-files-reached");
      } else {
        return this.element.classList.remove("dz-max-files-reached");
      }
    };

    Dropzone.prototype.drop = function(e) {
      var files, items;
      if (!e.dataTransfer) {
        return;
      }
      this.emit("drop", e);
      files = e.dataTransfer.files;
      this.emit("selectedfiles", files);
      if (files.length) {
        items = e.dataTransfer.items;
        if (items && items.length && ((items[0].webkitGetAsEntry != null) || (items[0].getAsEntry != null))) {
          this.handleItems(items);
        } else {
          this.handleFiles(files);
        }
      }
    };

    Dropzone.prototype.handleFiles = function(files) {
      var file, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        _results.push(this.addFile(file));
      }
      return _results;
    };

    Dropzone.prototype.handleItems = function(items) {
      var entry, item, _i, _len;
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        if (item.webkitGetAsEntry != null) {
          entry = item.webkitGetAsEntry();
          if (entry.isFile) {
            this.addFile(item.getAsFile());
          } else if (entry.isDirectory) {
            this.addDirectory(entry, entry.name);
          }
        } else {
          this.addFile(item.getAsFile());
        }
      }
    };

    Dropzone.prototype.accept = function(file, done) {
      if (file.size > this.options.maxFilesize * 1024 * 1024) {
        return done(this.options.dictFileTooBig.replace("{{filesize}}", Math.round(file.size / 1024 / 10.24) / 100).replace("{{maxFilesize}}", this.options.maxFilesize));
      } else if (!Dropzone.isValidFile(file, this.options.acceptedFiles)) {
        return done(this.options.dictInvalidFileType);
      } else if (this.options.maxFiles && this.getAcceptedFiles().length >= this.options.maxFiles) {
        done(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}", this.options.maxFiles));
        return this.emit("maxfilesexceeded", file);
      } else {
        return this.options.accept.call(this, file, done);
      }
    };

    Dropzone.prototype.addFile = function(file) {
      var _this = this;
      file.upload = {
        progress: 0,
        total: file.size,
        bytesSent: 0
      };
      this.files.push(file);
      file.status = Dropzone.ADDED;
      this.emit("addedfile", file);
      if (this.options.createImageThumbnails && file.type.match(/image.*/) && file.size <= this.options.maxThumbnailFilesize * 1024 * 1024) {
        this.createThumbnail(file);
      }
      return this.accept(file, function(error) {
        if (error) {
          file.accepted = false;
          return _this._errorProcessing([file], error);
        } else {
          return _this.enqueueFile(file);
        }
      });
    };

    Dropzone.prototype.enqueueFiles = function(files) {
      var file, _i, _len;
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        this.enqueueFile(file);
      }
      return null;
    };

    Dropzone.prototype.enqueueFile = function(file) {
      var _this = this;
      file.accepted = true;
      if (file.status === Dropzone.ADDED) {
        file.status = Dropzone.QUEUED;
        if (this.options.autoProcessQueue) {
          return setTimeout((function() {
            return _this.processQueue();
          }), 1);
        }
      } else {
        throw new Error("This file can't be queued because it has already been processed or was rejected.");
      }
    };

    Dropzone.prototype.addDirectory = function(entry, path) {
      var dirReader, entriesReader,
        _this = this;
      dirReader = entry.createReader();
      entriesReader = function(entries) {
        var _i, _len;
        for (_i = 0, _len = entries.length; _i < _len; _i++) {
          entry = entries[_i];
          if (entry.isFile) {
            entry.file(function(file) {
              if (_this.options.ignoreHiddenFiles && file.name.substring(0, 1) === '.') {
                return;
              }
              file.fullPath = "" + path + "/" + file.name;
              return _this.addFile(file);
            });
          } else if (entry.isDirectory) {
            _this.addDirectory(entry, "" + path + "/" + entry.name);
          }
        }
      };
      return dirReader.readEntries(entriesReader, function(error) {
        return typeof console !== "undefined" && console !== null ? typeof console.log === "function" ? console.log(error) : void 0 : void 0;
      });
    };

    Dropzone.prototype.removeFile = function(file) {
      if (file.status === Dropzone.UPLOADING) {
        this.cancelUpload(file);
      }
      this.files = without(this.files, file);
      this.emit("removedfile", file);
      if (this.files.length === 0) {
        return this.emit("reset");
      }
    };

    Dropzone.prototype.removeAllFiles = function(cancelIfNecessary) {
      var file, _i, _len, _ref;
      if (cancelIfNecessary == null) {
        cancelIfNecessary = false;
      }
      _ref = this.files.slice();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        if (file.status !== Dropzone.UPLOADING || cancelIfNecessary) {
          this.removeFile(file);
        }
      }
      return null;
    };

    Dropzone.prototype.createThumbnail = function(file) {
      var fileReader,
        _this = this;
      fileReader = new FileReader;
      fileReader.onload = function() {
        var img;
        img = new Image;
        img.onload = function() {
          var canvas, ctx, resizeInfo, thumbnail, _ref, _ref1, _ref2, _ref3;
          file.width = img.width;
          file.height = img.height;
          resizeInfo = _this.options.resize.call(_this, file);
          if (resizeInfo.trgWidth == null) {
            resizeInfo.trgWidth = _this.options.thumbnailWidth;
          }
          if (resizeInfo.trgHeight == null) {
            resizeInfo.trgHeight = _this.options.thumbnailHeight;
          }
          canvas = document.createElement("canvas");
          ctx = canvas.getContext("2d");
          canvas.width = resizeInfo.trgWidth;
          canvas.height = resizeInfo.trgHeight;
          ctx.drawImage(img, (_ref = resizeInfo.srcX) != null ? _ref : 0, (_ref1 = resizeInfo.srcY) != null ? _ref1 : 0, resizeInfo.srcWidth, resizeInfo.srcHeight, (_ref2 = resizeInfo.trgX) != null ? _ref2 : 0, (_ref3 = resizeInfo.trgY) != null ? _ref3 : 0, resizeInfo.trgWidth, resizeInfo.trgHeight);
          thumbnail = canvas.toDataURL("image/png");
          return _this.emit("thumbnail", file, thumbnail);
        };
        return img.src = fileReader.result;
      };
      return fileReader.readAsDataURL(file);
    };

    Dropzone.prototype.processQueue = function() {
      var i, parallelUploads, processingLength, queuedFiles;
      parallelUploads = this.options.parallelUploads;
      processingLength = this.getUploadingFiles().length;
      i = processingLength;
      if (processingLength >= parallelUploads) {
        return;
      }
      queuedFiles = this.getQueuedFiles();
      if (!(queuedFiles.length > 0)) {
        return;
      }
      if (this.options.uploadMultiple) {
        return this.processFiles(queuedFiles.slice(0, parallelUploads - processingLength));
      } else {
        while (i < parallelUploads) {
          if (!queuedFiles.length) {
            return;
          }
          this.processFile(queuedFiles.shift());
          i++;
        }
      }
    };

    Dropzone.prototype.processFile = function(file) {
      return this.processFiles([file]);
    };

    Dropzone.prototype.processFiles = function(files) {
      var file, _i, _len;
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        file.processing = true;
        file.status = Dropzone.UPLOADING;
        this.emit("processing", file);
      }
      if (this.options.uploadMultiple) {
        this.emit("processingmultiple", files);
      }
      return this.uploadFiles(files);
    };

    Dropzone.prototype._getFilesWithXhr = function(xhr) {
      var file, files;
      return files = (function() {
        var _i, _len, _ref, _results;
        _ref = this.files;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          file = _ref[_i];
          if (file.xhr === xhr) {
            _results.push(file);
          }
        }
        return _results;
      }).call(this);
    };

    Dropzone.prototype.cancelUpload = function(file) {
      var groupedFile, groupedFiles, _i, _j, _len, _len1, _ref;
      if (file.status === Dropzone.UPLOADING) {
        groupedFiles = this._getFilesWithXhr(file.xhr);
        for (_i = 0, _len = groupedFiles.length; _i < _len; _i++) {
          groupedFile = groupedFiles[_i];
          groupedFile.status = Dropzone.CANCELED;
        }
        file.xhr.abort();
        for (_j = 0, _len1 = groupedFiles.length; _j < _len1; _j++) {
          groupedFile = groupedFiles[_j];
          this.emit("canceled", groupedFile);
        }
        if (this.options.uploadMultiple) {
          this.emit("canceledmultiple", groupedFiles);
        }
      } else if ((_ref = file.status) === Dropzone.ADDED || _ref === Dropzone.QUEUED) {
        file.status = Dropzone.CANCELED;
        this.emit("canceled", file);
        if (this.options.uploadMultiple) {
          this.emit("canceledmultiple", [file]);
        }
      }
      if (this.options.autoProcessQueue) {
        return this.processQueue();
      }
    };

    Dropzone.prototype.uploadFile = function(file) {
      return this.uploadFiles([file]);
    };

    Dropzone.prototype.uploadFiles = function(files) {
      var file, formData, handleError, headerName, headerValue, headers, input, inputName, inputType, key, progressObj, response, updateProgress, value, xhr, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3,
        _this = this;
      xhr = new XMLHttpRequest();
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        file.xhr = xhr;
      }
      xhr.open(this.options.method, this.options.url, true);
      xhr.withCredentials = !!this.options.withCredentials;
      response = null;
      handleError = function() {
        var _j, _len1, _results;
        _results = [];
        for (_j = 0, _len1 = files.length; _j < _len1; _j++) {
          file = files[_j];
          _results.push(_this._errorProcessing(files, response || _this.options.dictResponseError.replace("{{statusCode}}", xhr.status), xhr));
        }
        return _results;
      };
      updateProgress = function(e) {
        var allFilesFinished, progress, _j, _k, _l, _len1, _len2, _len3, _results;
        if (e != null) {
          progress = 100 * e.loaded / e.total;
          for (_j = 0, _len1 = files.length; _j < _len1; _j++) {
            file = files[_j];
            file.upload = {
              progress: progress,
              total: e.total,
              bytesSent: e.loaded
            };
          }
        } else {
          allFilesFinished = true;
          progress = 100;
          for (_k = 0, _len2 = files.length; _k < _len2; _k++) {
            file = files[_k];
            if (!(file.upload.progress === 100 && file.upload.bytesSent === file.upload.total)) {
              allFilesFinished = false;
            }
            file.upload.progress = progress;
            file.upload.bytesSent = file.upload.total;
          }
          if (allFilesFinished) {
            return;
          }
        }
        _results = [];
        for (_l = 0, _len3 = files.length; _l < _len3; _l++) {
          file = files[_l];
          _results.push(_this.emit("uploadprogress", file, progress, file.upload.bytesSent));
        }
        return _results;
      };
      xhr.onload = function(e) {
        var _ref;
        if (files[0].status === Dropzone.CANCELED) {
          return;
        }
        if (xhr.readyState !== 4) {
          return;
        }
        response = xhr.responseText;
        if (xhr.getResponseHeader("content-type") && ~xhr.getResponseHeader("content-type").indexOf("application/json")) {
          try {
            response = JSON.parse(response);
          } catch (_error) {
            e = _error;
            response = "Invalid JSON response from server.";
          }
        }
        updateProgress();
        if (!((200 <= (_ref = xhr.status) && _ref < 300))) {
          return handleError();
        } else {
          return _this._finished(files, response, e);
        }
      };
      xhr.onerror = function() {
        if (files[0].status === Dropzone.CANCELED) {
          return;
        }
        return handleError();
      };
      progressObj = (_ref = xhr.upload) != null ? _ref : xhr;
      progressObj.onprogress = updateProgress;
      headers = {
        "Accept": "application/json",
        "Cache-Control": "no-cache",
        "X-Requested-With": "XMLHttpRequest"
      };
      if (this.options.headers) {
        extend(headers, this.options.headers);
      }
      for (headerName in headers) {
        headerValue = headers[headerName];
        xhr.setRequestHeader(headerName, headerValue);
      }
      formData = new FormData();
      if (this.options.params) {
        _ref1 = this.options.params;
        for (key in _ref1) {
          value = _ref1[key];
          formData.append(key, value);
        }
      }
      for (_j = 0, _len1 = files.length; _j < _len1; _j++) {
        file = files[_j];
        this.emit("sending", file, xhr, formData);
      }
      if (this.options.uploadMultiple) {
        this.emit("sendingmultiple", files, xhr, formData);
      }
      if (this.element.tagName === "FORM") {
        _ref2 = this.element.querySelectorAll("input, textarea, select, button");
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          input = _ref2[_k];
          inputName = input.getAttribute("name");
          inputType = input.getAttribute("type");
          if (!inputType || ((_ref3 = inputType.toLowerCase()) !== "checkbox" && _ref3 !== "radio") || input.checked) {
            formData.append(inputName, input.value);
          }
        }
      }
      for (_l = 0, _len3 = files.length; _l < _len3; _l++) {
        file = files[_l];
        formData.append("" + this.options.paramName + (this.options.uploadMultiple ? "[]" : ""), file, file.name);
      }
      return xhr.send(formData);
    };

    Dropzone.prototype._finished = function(files, responseText, e) {
      var file, _i, _len;
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        file.status = Dropzone.SUCCESS;
        this.emit("success", file, responseText, e);
        this.emit("complete", file);
      }
      if (this.options.uploadMultiple) {
        this.emit("successmultiple", files, responseText, e);
        this.emit("completemultiple", files);
      }
      if (this.options.autoProcessQueue) {
        return this.processQueue();
      }
    };

    Dropzone.prototype._errorProcessing = function(files, message, xhr) {
      var file, _i, _len;
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        file.status = Dropzone.ERROR;
        this.emit("error", file, message, xhr);
        this.emit("complete", file);
      }
      if (this.options.uploadMultiple) {
        this.emit("errormultiple", files, message, xhr);
        this.emit("completemultiple", files);
      }
      if (this.options.autoProcessQueue) {
        return this.processQueue();
      }
    };

    return Dropzone;

  })(Em);

  Dropzone.version = "3.7.1";

  Dropzone.options = {};

  Dropzone.optionsForElement = function(element) {
    if (element.id) {
      return Dropzone.options[camelize(element.id)];
    } else {
      return void 0;
    }
  };

  Dropzone.instances = [];

  Dropzone.forElement = function(element) {
    if (typeof element === "string") {
      element = document.querySelector(element);
    }
    if ((element != null ? element.dropzone : void 0) == null) {
      throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");
    }
    return element.dropzone;
  };

  Dropzone.autoDiscover = true;

  Dropzone.discover = function() {
    var checkElements, dropzone, dropzones, _i, _len, _results;
    if (document.querySelectorAll) {
      dropzones = document.querySelectorAll(".dropzone");
    } else {
      dropzones = [];
      checkElements = function(elements) {
        var el, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = elements.length; _i < _len; _i++) {
          el = elements[_i];
          if (/(^| )dropzone($| )/.test(el.className)) {
            _results.push(dropzones.push(el));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };
      checkElements(document.getElementsByTagName("div"));
      checkElements(document.getElementsByTagName("form"));
    }
    _results = [];
    for (_i = 0, _len = dropzones.length; _i < _len; _i++) {
      dropzone = dropzones[_i];
      if (Dropzone.optionsForElement(dropzone) !== false) {
        _results.push(new Dropzone(dropzone));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  Dropzone.blacklistedBrowsers = [/opera.*Macintosh.*version\/12/i];

  Dropzone.isBrowserSupported = function() {
    var capableBrowser, regex, _i, _len, _ref;
    capableBrowser = true;
    if (window.File && window.FileReader && window.FileList && window.Blob && window.FormData && document.querySelector) {
      if (!("classList" in document.createElement("a"))) {
        capableBrowser = false;
      } else {
        _ref = Dropzone.blacklistedBrowsers;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          regex = _ref[_i];
          if (regex.test(navigator.userAgent)) {
            capableBrowser = false;
            continue;
          }
        }
      }
    } else {
      capableBrowser = false;
    }
    return capableBrowser;
  };

  without = function(list, rejectedItem) {
    var item, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = list.length; _i < _len; _i++) {
      item = list[_i];
      if (item !== rejectedItem) {
        _results.push(item);
      }
    }
    return _results;
  };

  camelize = function(str) {
    return str.replace(/[\-_](\w)/g, function(match) {
      return match[1].toUpperCase();
    });
  };

  Dropzone.createElement = function(string) {
    var div;
    div = document.createElement("div");
    div.innerHTML = string;
    return div.childNodes[0];
  };

  Dropzone.elementInside = function(element, container) {
    if (element === container) {
      return true;
    }
    while (element = element.parentNode) {
      if (element === container) {
        return true;
      }
    }
    return false;
  };

  Dropzone.getElement = function(el, name) {
    var element;
    if (typeof el === "string") {
      element = document.querySelector(el);
    } else if (el.nodeType != null) {
      element = el;
    }
    if (element == null) {
      throw new Error("Invalid `" + name + "` option provided. Please provide a CSS selector or a plain HTML element.");
    }
    return element;
  };

  Dropzone.getElements = function(els, name) {
    var e, el, elements, _i, _j, _len, _len1, _ref;
    if (els instanceof Array) {
      elements = [];
      try {
        for (_i = 0, _len = els.length; _i < _len; _i++) {
          el = els[_i];
          elements.push(this.getElement(el, name));
        }
      } catch (_error) {
        e = _error;
        elements = null;
      }
    } else if (typeof els === "string") {
      elements = [];
      _ref = document.querySelectorAll(els);
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        el = _ref[_j];
        elements.push(el);
      }
    } else if (els.nodeType != null) {
      elements = [els];
    }
    if (!((elements != null) && elements.length)) {
      throw new Error("Invalid `" + name + "` option provided. Please provide a CSS selector, a plain HTML element or a list of those.");
    }
    return elements;
  };

  Dropzone.confirm = function(question, accepted, rejected) {
    if (window.confirm(question)) {
      return accepted();
    } else if (rejected != null) {
      return rejected();
    }
  };

  Dropzone.isValidFile = function(file, acceptedFiles) {
    var baseMimeType, mimeType, validType, _i, _len;
    if (!acceptedFiles) {
      return true;
    }
    acceptedFiles = acceptedFiles.split(",");
    mimeType = file.type;
    baseMimeType = mimeType.replace(/\/.*$/, "");
    for (_i = 0, _len = acceptedFiles.length; _i < _len; _i++) {
      validType = acceptedFiles[_i];
      validType = validType.trim();
      if (validType.charAt(0) === ".") {
        if (file.name.indexOf(validType, file.name.length - validType.length) !== -1) {
          return true;
        }
      } else if (/\/\*$/.test(validType)) {
        if (baseMimeType === validType.replace(/\/.*$/, "")) {
          return true;
        }
      } else {
        if (mimeType === validType) {
          return true;
        }
      }
    }
    return false;
  };

  if (typeof jQuery !== "undefined" && jQuery !== null) {
    jQuery.fn.dropzone = function(options) {
      return this.each(function() {
        return new Dropzone(this, options);
      });
    };
  }

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Dropzone;
  } else {
    window.Dropzone = Dropzone;
  }

  Dropzone.ADDED = "added";

  Dropzone.QUEUED = "queued";

  Dropzone.ACCEPTED = Dropzone.QUEUED;

  Dropzone.UPLOADING = "uploading";

  Dropzone.PROCESSING = Dropzone.UPLOADING;

  Dropzone.CANCELED = "canceled";

  Dropzone.ERROR = "error";

  Dropzone.SUCCESS = "success";

  /*
  # contentloaded.js
  #
  # Author: Diego Perini (diego.perini at gmail.com)
  # Summary: cross-browser wrapper for DOMContentLoaded
  # Updated: 20101020
  # License: MIT
  # Version: 1.2
  #
  # URL:
  # http://javascript.nwbox.com/ContentLoaded/
  # http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
  */


  contentLoaded = function(win, fn) {
    var add, doc, done, init, poll, pre, rem, root, top;
    done = false;
    top = true;
    doc = win.document;
    root = doc.documentElement;
    add = (doc.addEventListener ? "addEventListener" : "attachEvent");
    rem = (doc.addEventListener ? "removeEventListener" : "detachEvent");
    pre = (doc.addEventListener ? "" : "on");
    init = function(e) {
      if (e.type === "readystatechange" && doc.readyState !== "complete") {
        return;
      }
      (e.type === "load" ? win : doc)[rem](pre + e.type, init, false);
      if (!done && (done = true)) {
        return fn.call(win, e.type || e);
      }
    };
    poll = function() {
      var e;
      try {
        root.doScroll("left");
      } catch (_error) {
        e = _error;
        setTimeout(poll, 50);
        return;
      }
      return init("poll");
    };
    if (doc.readyState !== "complete") {
      if (doc.createEventObject && root.doScroll) {
        try {
          top = !win.frameElement;
        } catch (_error) {}
        if (top) {
          poll();
        }
      }
      doc[add](pre + "DOMContentLoaded", init, false);
      doc[add](pre + "readystatechange", init, false);
      return win[add](pre + "load", init, false);
    }
  };

  Dropzone._autoDiscoverFunction = function() {
    if (Dropzone.autoDiscover) {
      return Dropzone.discover();
    }
  };

  contentLoaded(window, Dropzone._autoDiscoverFunction);

}).call(this);

});
require.alias("component-emitter/index.js", "dropzone/deps/emitter/index.js");
require.alias("component-emitter/index.js", "emitter/index.js");
if (typeof exports == "object") {
  module.exports = require("dropzone");
} else if (typeof define == "function" && define.amd) {
  define(function(){ return require("dropzone"); });
} else {
  this["Dropzone"] = require("dropzone");
}})();
'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
	'ngRoute',
	'myApp.filters',
	'myApp.services',
	'myApp.directives',
	'myApp.controllers'
	]).

	config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider.when('/', {templateUrl : 'partials/home.html', controller: 'HomeCtrl'});
		$routeProvider.when('/terms', {templateUrl: 'partials/terms.html'});
		$routeProvider.when('/about', {templateUrl: 'partials/about.html'});
		//$routeProvider.when('/v/:id', {templateUrl: 'partials/view.html', controller: 'ViewCtrl'});
		$routeProvider.when('/new', {templateUrl: 'partials/new.html', controller: 'NewCtrl'});
		$routeProvider.when('/e/:id', {templateUrl : 'partials/edit_buffer.html', controller : 'EditBuffer'});
		$routeProvider.when('/edit/:id', {templateUrl : 'partials/edit.html', controller : 'EditCtrl', resolve : {
			sessionArtboard : ['$location', '$route', 'DB', function($location, $route, DB) {
				var artboardID = $route.current.params.id,
					artboard = DB.getSessionArtboard(); // check if session artboard was already created (if so, user went to /new first)
				
				if (!artboardID) {
					// user tried to go to edit/
					$location.path('/');
					return;
				} else if (!artboard && artboardID) {
					// user tried going to edit/{artboardID} so, redirect to buffer first to retrieve the artboard
					$location.path('/e/' + artboardID);
					return;
				} else if (artboard && (artboard.id !== artboardID)) {
					// something went horribly wrong or the artboard does not exist
					alert('That artboard does not exist. Sorry, friend.');
					$location.path('/');
					return;
				}

				return artboard;
			}]
		}});
		$routeProvider.otherwise({redirectTo: '/'});
		//$locationProvider.html5Mode(true);
	}]).
	
	run(function() {
		// optional init stuff, try not to put stuff here if possible
	});

'use strict';

/* Services */

angular.module('myApp.services', []).
	value('version', 'Beta').

	factory('utils', ['$rootScope', function($rootScope) {
		return {
			ngApply : function($sc, func) {
				if(!$sc.$$phase && $sc) {
					if (func) {
						$sc.$apply(function() {
							func();
						});
					} else {
						$sc.$apply();
					}
				} else if (func) {
					func();
				}
			},

			getElDim : function(el) {
			    var _x = 0,
			    	_y = 0,
			    	_w = el.offsetWidth,
			    	_h = el.offsetHeight;

			    while(el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
			        _x += el.offsetLeft - el.scrollLeft;
			        _y += el.offsetTop - el.scrollTop;
			        el = el.offsetParent;
			    }

			    return {top: _y, left: _x, outerWidth: _w, outerHeight: _h};
			},

			getViewportDim : function() {
				var el = window, 
					attr = 'inner';

				if (!('innerWidth' in window)) {
					attr = 'client';
					el = document.documentElement || document.body;
				}

				return {width : el[ attr+'Width' ], height : el[ attr+'Height' ]}
			},

			gps : function(targ, anchor) {
				// position a menu relative to an anchor
				var $targ = angular.element(targ),
					targDim = this.getElDim(targ),
					anchorDim = this.getElDim(anchor),
					viewportDim = this.getViewportDim(),
					top = anchorDim.top - targDim.outerHeight,
					right = anchorDim.left + targDim.outerWidth,
					bottom = anchorDim.top + anchorDim.outerHeight + targDim.outerHeight,
					left = anchorDim.left - (targDim.outerWidth - anchorDim.outerWidth),
					maxH = viewportDim.height,
					maxW = viewportDim.width; 

				if (bottom > maxH) {
					// position to top
					if (top < 0) {
						top = 0;
					} else {
						top = top;
					}
				} else {
					// position to bottom
					top = anchorDim.top + anchorDim.outerHeight;
				}
				
				if (right > maxW) {
					// position align right
					if (left < 0) {
						left = 0;
					} else {
						left = left;
					}
				} else {
					// position align left
					left = anchorDim.left;
				}
				
				$targ.attr('style', 'top:' + top + 'px;left:' + left + 'px;');
			},

			setLeaveWarning : function() {
				var confirmOnPageExit = function () {
				    // If we haven't been passed the event get the window.event
				    var e = window.event;

				    var message = 'Lose unsaved work?';

				    // For IE6-8 and Firefox prior to version 4
				    if (e) {
				        e.returnValue = message;
				    }

				    // For Chrome, Safari, IE8+ and Opera 12+
				    return message;
				};

				window.onbeforeunload = confirmOnPageExit;
			},

			unsetLeaveWarning : function() {
				window.onbeforeunload = null;
			},
			// TODO: remove shortcut stuff from utils and let directives broadcast/listen accordingly
			addShortcut : function(key, func, meta) {
				if (typeof $rootScope.jpgKeys === 'undefined') {
					$rootScope.jpgKeys = [];
				}

				meta = meta ? meta : false;

				$rootScope.jpgKeys.push({keyCode : key, func : func, meta : meta});
			},

			executeShortcut : function(e) {
				var stopProp = false,
					meta = e.ctrlKey || e.metaKey || e.altKey;
				
				if (typeof $rootScope.jpgKeys !== 'undefined') {
					for (var i = 0, l = $rootScope.jpgKeys.length; i < l; i ++) {
						var cut = $rootScope.jpgKeys[i];

						if (e.keyCode == cut.keyCode) {
							if ((cut.meta && meta) || (!cut.meta && !meta)) {
								$rootScope.jpgKeys[i].func();
								stopProp = true;
							}
						}
					}
				}

				if (stopProp) {
					e.preventDefault();
					return false;
				}
			},

			nothingFocused : function() {
				return document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA';
			},

			domImg : function(src, callback) {
				var img = document.createElement('img');

				img.onload = function() {
					if (typeof callback === 'function') {
						callback(img);
					}
				}

				img.src = src;
			}
		}
	}]).

	factory('canvasApi', ['utils', '$rootScope', function(utils, $rootScope) {
		var _artboard = null,
			_uniqueLayerIndex = 0,
			_copyLayer = null;

		function _isNum(val) {
			return typeof val === 'number';
		}

		/*
		Kinetic JSON: All of the following have a width and height as well
		obj.attrs.width // artboard/stage (no bg color here)
		obj.children[0] // bgLayer
		obj.children[0].children[0] // bgLayer rectangle
		obj.children[0].children[0].attrs.fill // bgColor
		obj.children[1] // canvas
		*/

		/*
		** Kinetic Adjustments
		*/

		// Create new Icon class
		Kinetic.Icon = function(config) {
	        this._initIcon(config);
	    };

	    Kinetic.Icon.prototype = {
	        _initIcon: function(config) {
            	Kinetic.Text.call(this, config);
            	this.className = 'Icon';
            },
            syncSizes : function(val) {
            	var sW = typeof parseInt(this.getAttr('strokeWidth')) !== 'undefined' ? this.getAttr('strokeWidth') : 0;

            	this._setAttr('fontSize',val);
            	// plus 2 so the icon doesn't get cutoff and become invisible
            	this._setAttr('width',val+2);
            	this._setAttr('height',val+2);
            	this.textWidth = val;
            	console.log(this);
            },
            setFontSize : function(val) {
            	this.syncSizes(val);
            }
	    };

		Kinetic.Util.extend(Kinetic.Icon, Kinetic.Text);

		// Create new Arrow class
		Kinetic.Arrow = function(config) {
	        this._initArrow(config);
	    };

	    Kinetic.Arrow.prototype = {
	        _initArrow: function(config) {
            	Kinetic.Line.call(this, config);
            	this.className = 'Arrow';
            },
            setArrowRight : function(val) {
            	this._setAttr('arrowRight',val);
            	this.refreshArrows();
            },
            setArrowLeft : function(val) {
            	this._setAttr('arrowLeft',val);
            	this.refreshArrows();
            },
            setPointL : function(val) {
            	this._setAttr('pointL',val);
            },
            setPointR : function(val) {
            	this._setAttr('pointR',val);
            },
            refreshArrows : function() {
				var shape = this,
					points = shape.getPoints(),
					fromX = points[0].x,
					fromY = points[0].y,
					toX = points[1].x,
					toY = points[1].y,
					headlenR = shape.attrs.arrowRight ? shape.attrs.arrowRight : 0,
					headlenL = shape.attrs.arrowLeft ? shape.attrs.arrowLeft : 0,
					angle;
				
				if (points.length > 2) {
					// line has arrow point data, need to reset the drag points
					fromX = points[1].x;
					fromY = points[1].y;
					toX = points[4].x;
					toY = points[4].y;
				}
				
				angle = Math.atan2(toY-fromY,toX-fromX);
				
				//shape.setAttr('pointL', [fromX, fromY]);
				//shape.setAttr('pointR', [toX, toY]);
				shape.attrs.pointL = [fromX, fromY];
				shape.attrs.pointR = [toX, toY];
				
				shape.setPoints([
					fromX+headlenL*Math.cos(angle-Math.PI/6),
					fromY+headlenL*Math.sin(angle-Math.PI/6),
					fromX, 
					fromY, 
					fromX+headlenL*Math.cos(angle+Math.PI/6),
					fromY+headlenL*Math.sin(angle+Math.PI/6),
					fromX,
					fromY,
					toX, 
					toY, 
					toX-headlenR*Math.cos(angle-Math.PI/6),
					toY-headlenR*Math.sin(angle-Math.PI/6),
					toX, 
					toY, 
					toX-headlenR*Math.cos(angle+Math.PI/6),
					toY-headlenR*Math.sin(angle+Math.PI/6)
					]);
            }
	    };

		Kinetic.Util.extend(Kinetic.Arrow, Kinetic.Line);

		// Have to create a fake adjusted coordinate attribute to use in the input binding that is 
		// binded to the real coordinate to compensate for stroke alignment
		var overrideCoords = function(attr) {
			return function(val) {
				var diff = 0,
					upper = attr.toUpperCase(),
					offset = {};
				
				if (this.attrs.strokeWidth) {
					diff = this.attrs.strokeWidth/2;
				}

				if (this.className === 'Ellipse') {
					offset.x = -this.getWidth()/2;
					offset.y = -this.getHeight()/2;

					this.setOffset(offset);
				}
				
				this._setAttr(attr, val + diff);
				this._setAttr('adjusted' + upper, val);
				return this;
			}
		}

		var overrideDimension = function(attr) {
			return function(val) {
				var diff = 0,
					upper = attr.charAt(0).toUpperCase() + attr.slice(1),
					offset = {},
					trueDim;

				if (this.attrs.strokeWidth) {
					diff = this.attrs.strokeWidth;
				}

				trueDim = val - diff;

				if (val <= 0) {
					val = 1;
				}

				if (trueDim <= 0) {
					trueDim = 1;
				}

				//Kinetic.Node.prototype.setWidth.call(this,val-diff);
				this._setAttr(attr, trueDim);
				this._setAttr('adjusted' + upper, val);

				if (typeof this.setRadius !== 'undefined') {
					// is ellipse
					if (trueDim/2 < 1) {
						trueDim = 1;
					}
					
					if (attr === 'width') {
						this.setRadius({x : trueDim/2});
					} else if (attr === 'height') {
						this.setRadius({y : trueDim/2});
					}
				}
				return this;
			}
		}

		// Only overriding selected classes, don't want to change other entities that
		// inherit from the base shape class (like text)
		var cordCls = ['Rect', 'Ellipse', 'Image', 'Icon', 'Text'];
		for (var i = 0; i < cordCls.length; i++) {
			Kinetic[cordCls[i]].prototype['setAdjustedX'] = overrideCoords('x');
			Kinetic[cordCls[i]].prototype['setX'] = overrideCoords('x');
			Kinetic[cordCls[i]].prototype['setAdjustedY'] = overrideCoords('y');
			Kinetic[cordCls[i]].prototype['setY'] = overrideCoords('y');
			Kinetic[cordCls[i]].prototype['setWidth'] = overrideDimension('width');
			Kinetic[cordCls[i]].prototype['setHeight'] = overrideDimension('height');
			Kinetic[cordCls[i]].prototype['setAdjustedWidth'] = overrideDimension('width');
			Kinetic[cordCls[i]].prototype['setAdjustedHeight'] = overrideDimension('height');

			Kinetic[cordCls[i]].prototype['setStrokeWidth'] = function(val) {
				var w = this.getAttr('width'),
					h = this.getAttr('height'),
					sW = typeof parseInt(this.getAttr('strokeWidth')) !== 'undefined' ? this.getAttr('strokeWidth') : 0;

				this._setAttr('adjustedWidth', w+val);
				this._setAttr('adjustedHeight', h+val);
				
				this._setAttr('strokeWidth', val);
			}

			/*Kinetic[cordCls[i]].prototype['getWidth'] = function() {
				var a = this.attrs['adjustedWidth'];
				return void 0 === a ? 0 : a;
			};

			Kinetic[cordCls[i]].prototype['getHeight'] = function() {
				var a = this.attrs['adjustedHeight'];
				return void 0 === a ? 0 : a;
			};

			Kinetic[cordCls[i]].prototype['getX'] = function() {
				var a = this.attrs['adjustedX'];
				return void 0 === a ? 0 : a;
			};

			Kinetic[cordCls[i]].prototype['getY'] = function() {
				var a = this.attrs['adjustedY'];
				return void 0 === a ? 0 : a;
			};*/
		}

		// fix from: https://github.com/ericdrowell/KineticJS/issues/726
		var buffFunc = {
		    _useBufferCanvas: function () {
		        if (Kinetic.UA.browser === 'chrome')
		            return false;
		        else
		            return (this.hasShadow() || this.getAbsoluteOpacity() !== 1) && this.hasFill() && this.hasStroke() && this.getStage();
		    }
		};
		Kinetic.Util.addMethods(Kinetic.Rect, buffFunc);
		Kinetic.Util.addMethods(Kinetic.Text, buffFunc);
		Kinetic.Util.addMethods(Kinetic.Ellipse, buffFunc);
		Kinetic.Util.addMethods(Kinetic.Arrow, buffFunc);
		Kinetic.Util.addMethods(Kinetic.Image, buffFunc);
		Kinetic.Util.addMethods(Kinetic.Icon, buffFunc);

		return {
			getArtboard : function() {
				return _artboard;
			},

			getLayers : function() {
				return _artboard.canvas.children;
			},

			getArtboardJSON : function() {
				return _artboard.stage.toJSON();
			},

			updateArtboard : function() {
				_artboard.stage.draw();
			},

			/*
			 * Sets the artboard width, height, and fill color
			 */
			setArtboard : function(obj, json) {
				var layers,
					l_count = 0,
					_this = this,
					addLayer = function(l, c) {
						_this.addLayer(l.attrs, l.className, null, c);
					},
					addImage = function(l, c) {
						_this.addImage({src : l.attrs.src}, l.attrs, c);
					},
					processLayers = function() {
						if (l_count < layers.length) {
							if (layers[l_count].className === 'Image') {
								addImage(layers[l_count], function() {
									l_count ++;
									processLayers();
								});
							} else {
								addLayer(layers[l_count], function() {
									l_count ++;
									processLayers();
								});
							}
						}
					};

				if (_artboard === null || json) {
					layers = json.children[1].children;

					_artboard = {};

					_artboard.el = document.getElementById(obj.id);

					_artboard.el.style.width = obj.width + 'px';
					_artboard.el.style.height = obj.height + 'px';

					_artboard.stage = new Kinetic.Stage({
						container : obj.id,
						width : obj.width,
						height : obj.height
					});

					_artboard.bgLayer = new Kinetic.Layer();
					_artboard.bgShape = new Kinetic.Rect({
						id : 'bgLayer',
						x : 0,
						y : 0,
						width : obj.width,
						height : obj.height,
						fill : obj.fill
					});

					_artboard.canvas = new Kinetic.Layer();

					_artboard.bgLayer.add(_artboard.bgShape);
					_artboard.stage.add(_artboard.bgLayer);
					_artboard.stage.add(_artboard.canvas);

					// Process children layers
					// TODO: Artboard processing and saving does not work with iconfonts
					processLayers();
				} else {
					if (obj.width) {
						if (obj.width > 1500) {
							obj.width = 1500;
						}
						_artboard.stage.setWidth(obj.width);
						_artboard.canvas.setWidth(obj.width);
						_artboard.bgLayer.setWidth(obj.width);
						_artboard.bgShape.setWidth(obj.width);
						_artboard.el.style.width = obj.width + 'px';
					}

					if (obj.height) {
						if (obj.height > 1500) {
							obj.height = 1500;
						}
						_artboard.stage.setHeight(obj.height);
						_artboard.canvas.setHeight(obj.height);
						_artboard.bgLayer.setHeight(obj.height);
						_artboard.bgShape.setHeight(obj.height);
						_artboard.el.style.height = obj.height + 'px';
					}

					// if (obj.x) {
					// 	_artboard.stage.setOffsetX(obj.x);
					// }

					// if (obj.y) {
					// 	_artboard.stage.setOffsetY(obj.y);
					// }

					//_artboard.canvas.setOffsetX(obj.x);
					//_artboard.canvas.setOffsetY(obj.y);

					if (obj.type) {
						_artboard.type = obj.type;
					}

					if (obj.fill) {
						_artboard.bgShape.setFill(obj.fill);
					}
					
					_artboard.stage.draw();

					//_artboard.canvas.setOffsetX(0);
					//_artboard.canvas.setOffsetY(0);
					//_artboard.stage.draw();
					//_artboard.stage.setOffsetX(0);
					//_artboard.stage.setOffsetY(0);
					//_artboard.stage.draw();
				}
			},

			moveLayerUp : function(layer) {
				if (layer) {
					layer.moveUp();
					_artboard.stage.draw();
				}
			},

			moveLayerDown : function(layer) {
				if (layer) {
					layer.moveDown();
					_artboard.stage.draw();
				}
			},

			resizeLayerByMouse : function(data, layer) {
				var keepAspect = data.evt.shiftKey,
					maxWidth = 9999,
					maxHeight = 9999,
					l = layer ? layer : _artboard.currentLayer,
					canvasDim = utils.getElDim(_artboard.el),
					clz,
					newX,
					newY,
					newW,
					newH,
					oldW,
					oldH,
					divW,
					divH,
					ratio,
					x1,
					x2,
					y1,
					y2,
					negativeY = false,
					negativeX = false;

				function overTop() {
					if ((data.evt.pageY - canvasDim.top) < data.tempLayerY) {
						data.dir = 't';
						return true;
					} else {
						data.dir = 'b';
						return false;
					}
				}

				function overRight() {
					if ((data.evt.pageX - canvasDim.left) > data.tempLayerX + data.tempWidth) {
						data.dir += 'r';
						return true;
					} else {
						data.dir += 'l';
						return false;
					}
				}

				function overBottom() {
					if ((data.evt.pageY - canvasDim.top) > data.tempLayerY + data.tempHeight) {
						data.dir = 'b';
						return true;
					} else {
						data.dir = 't';
						return false;
					}
				}

				function overLeft() {
					if ((data.evt.pageX - canvasDim.left) < data.tempLayerX) {
						data.dir += 'l';
						return true;
					} else {
						data.dir += 'r';
						return false;
					}
				}

				if (l) {
					clz = l.className;
					oldW = l.attrs.width;
					oldH = l.attrs.height;

					if (clz === 'Arrow') {
						x1 = data.tempPointL ? data.tempPointL[0] : l.attrs.points[0].x;
						y1 = data.tempPointL ? data.tempPointL[1] : l.attrs.points[0].y;
						x2 = data.tempPointR ? data.tempPointR[0] : l.attrs.points[1].x;
						y2 = data.tempPointR ? data.tempPointR[1] : l.attrs.points[1].y;
						
						if (data.dir === 'r' || data.drawing) {
							l.setPoints([x1, y1, x2 + data.deltaX, y2 + data.deltaY]);
							l.refreshArrows();
						} else {
							l.setPoints([x1 + data.deltaX, y1 + data.deltaY, x2, y2]);
							l.refreshArrows();
						}

					} else {
						// make sure the shape is not 0 dimension or else divide by 0 issues
						if (data.tempWidth === 0) {
							data.tempWidth = 1;
						}

						if (data.tempHeight === 0) {
							data.tempHeight = 1;
						}
						// update the handle direction according to resizing negatives
						if (data.drawing || data.dir === 'br') {
							negativeY = overTop();
							negativeX = overLeft();
						} else if (data.dir === 'bl') {
							negativeY = overTop();
							negativeX = overRight();
						} else if (data.dir === 'tl') {
							negativeY = overBottom();
							negativeX = overRight();
						} else if (data.dir === 'tr') {
							negativeY = overBottom();
							negativeX = overLeft();
						}

						// update the delta to reflect that the user is resizing negative
						if (negativeX) {
							if (data.dir === 'br' || data.dir === 'tr') {
								data.tempLayerX  = data.tempLayerX + data.tempWidth;
								data.deltaX = data.deltaX - data.tempWidth;
							} else if (data.dir === 'bl' || data.dir === 'tl') {
								data.deltaX = data.deltaX + data.tempWidth;
							}
							
							data.tempWidth = 1;
						}

						if (negativeY) {
							if (data.dir === 'br' || data.dir === 'bl') {
								data.tempLayerY  = data.tempLayerY + data.tempHeight;
								data.deltaY = data.deltaY - data.tempHeight;
							} else if (data.dir === 'tl' || data.dir === 'tr') {
								data.deltaY = data.deltaY + data.tempHeight;
							}
							
							data.tempHeight = 1;
						}

						// make measurements based on those adjustments above
						switch (data.dir) {
							case 'br':
								newX = data.tempLayerX;
								newY = data.tempLayerY;
								newW = data.tempWidth + data.deltaX;
								newH = data.tempHeight + data.deltaY;
								break;
							case 'tl':
								newX = data.tempLayerX + data.deltaX;
								newY = data.tempLayerY + data.deltaY;
								newW = data.tempWidth - data.deltaX;
								newH = data.tempHeight - data.deltaY;
								break;
							case 'tr':
								newX = data.tempLayerX;
								newY = data.tempLayerY + data.deltaY;
								newW = data.tempWidth + data.deltaX;
								newH = data.tempHeight - data.deltaY;
								break;
							case 'bl':
								newX = data.tempLayerX + data.deltaX;
								newY = data.tempLayerY;
								newW = data.tempWidth - data.deltaX;
								newH = data.tempHeight + data.deltaY;
								break;
						}

						// TODO: Error when drawing while holding shift
						if (((keepAspect && clz !== 'Image') || clz === 'Icon') || (clz === 'Image' && data.evt.shiftKey === false)) {
							// keep aspect ratio if holding shift and layer is not an icon
							// keep aspect ratio if layer is an image and NOT holding shift (in other words, allow users to distort by holding shift)
							divW = newW/data.tempWidth;
							divH = newH/data.tempHeight;
							ratio = divW < divH ? divW : divH;
							newW = ratio * data.tempWidth;
							newH = ratio * data.tempHeight;

							switch(data.dir) {
								case 'tl':
									newX = data.tempLayerX + (data.tempWidth - newW);
									newY = data.tempLayerY + (data.tempHeight - newH);
									break;
								case 'tr':
									newY = data.tempLayerY + (data.tempHeight - newH);
									break;
								case 'bl':
									newX = data.tempLayerX + (data.tempWidth - newW);
									break;
							}
						}

						newW = newW < 1 ? 1 : newW;
						newH = newH < 1 ? 1 : newH;

						this.setLayerAttr('x', newX - data.offset, 'number');
						this.setLayerAttr('y', newY - data.offset, 'number');

						if (clz === 'Icon') {
							this.setLayerAttr('fontSize', newW, 'number');
						} else {
							this.setLayerAttr('width', newW, 'number');
							this.setLayerAttr('height', newH, 'number');
						}
					}
					_artboard.canvas.draw();
				}
			},

			moveLayerByMouse : function(data) {
				if (_artboard.currentLayer) {
					_artboard.currentLayer.setX(data.tempLayerX + data.deltaX - data.offset);
					_artboard.currentLayer.setY(data.tempLayerY + data.deltaY - data.offset);
					_artboard.canvas.draw();
				}
			},

			setLayerAttr : function(attr, val, type, layer, skipDraw) {
				layer = layer ? layer : _artboard.currentLayer;

				if (layer) {
					if (type === 'number') {
						val = Math.round(parseInt(val, 10));
					} else if (type === 'decimal') {
						val = Math.round(parseFloat(val) * 100) / 100;
					}
					
					layer.setAttr(attr, val);
					if (!skipDraw) {
						_artboard.stage.draw();
					}
				}
			},

			concatLayerAttr : function(attr, val, type, layer) {
				layer = layer ? layer : _artboard.currentLayer;

				if (layer) {
					var existing = layer.getAttr(attr);

					if (type === 'number') {
						val = Math.round(parseInt(val, 10));
					} else if (type === 'decimal') {
						val = Math.round(parseFloat(val) * 100) / 100;
					}

					layer.setAttr(attr, existing + val);
					_artboard.stage.draw();
				}
			},

			flipLayerX : function() {
				if (_artboard.currentLayer) {
					_artboard.currentLayer.setScaleX(-1);
					_artboard.currentLayer.setOffsetX(_artboard.currentLayer.getWidth());
					_artboard.currentLayer.setX(_artboard.currentLayer.getX() * -1);
					_artboard.stage.draw();
				}
			},
			
			flipLayerY : function() {
				if (_artboard.currentLayer) {
					_artboard.currentLayer.setScaleY(-1);
					_artboard.stage.draw();
				}
			},

			moveArrow : function(attr, val, target) {
				if (_artboard.currentLayer || target) {
					var target = target ? target : _artboard.currentLayer,
						points =  target.getPoints(),
						newPoints = [];
					
					for (var i = points.length - 1; i >= 0; i--) {
						if (attr === 'x') {
							newPoints.push(points[i].x += val);
							newPoints.push(points[i].y);
						} else {
							newPoints.push(points[i].x);
							newPoints.push(points[i].y += val);
						}
					};

					if (attr === 'x') {
						target.setPointL([target.attrs.pointL[0] + val, target.attrs.pointL[1]]);
						target.setPointR([target.attrs.pointR[0] + val, target.attrs.pointR[1]]);
					} else {
						target.setPointL([target.attrs.pointL[0], target.attrs.pointL[1] + val]);
						target.setPointR([target.attrs.pointR[0], target.attrs.pointR[1] + val]);
					}
					
					target.setPoints(newPoints)
					_artboard.stage.draw();
				}
			},

			deleteLayer : function(layer) {
				if (layer) {
					layer.remove();
					_artboard.stage.draw();
					this.deselectAllLayers();
				}
			},

			themeShape : {
				fill : 'transparent',
				stroke : 'red',
				strokeWidth : 4,
				arrowRight : 20,
				arrowLeft : 0,
				shadowEnabled : false
			},

			themeIcon : {
				stroke : 'transparent',
				strokeWidth : 0,
				fontSize : 50,
				width : 50,
				height : 50,
				fill : '#000000',
				shadowEnabled : false
			},

			themeText : {
				stroke : 'transparent',
				strokeWidth : 0,
				fontFamily : 'sans-serif',
				fontStyle : 'normal',
				fontSize : 18,
				lineHeight : 1.2,
				align : 'left',
				fill : '#000000',
				shadowEnabled : false,
			},

			themeImage : {
				stroke : 'transparent',
				strokeWidth : 0,
				opacity : 1,
				shadowEnabled : false
			},

			theme : function(type, obj) {
				var t;

				// add any shapes to this conditional since they inherit the base shape theme
				if (type === 'Rect' || type === 'Ellipse' || type === 'Arrow') {
					type = 'Shape';
				}
				
				t = this['theme' + type];

				// if a layer object is provided, reset the theme object
				// to use the layer object's attributes that are found in the theme
				if (obj) {
					for (var prop in t) {
						if (obj.attrs.hasOwnProperty(prop)) {
							t[prop] = obj.attrs[prop];
						}
					}
					return;
				}

				return t;
			},

			addTheme : function(obj, type) {
				var _theme = this.theme(type);

				for (var prop in _theme) {
					if (_theme.hasOwnProperty(prop)) {
						obj[prop] = _theme[prop];
					}
				}
			},

			getDefault : function(type, overrides) {
				var obj,
					w2 = _artboard.stage.getWidth()/2,
					h2 = _artboard.stage.getHeight()/2,
					defaultDims = {
						x : w2 - 75,
						y : h2 - 50,
						width : 150,
						height : 100,
					};

				switch(type) {
					case 'Image':
						obj = {};
						break;
					case 'Text':
						obj = defaultDims;
						obj.text = 'Edit this text to the left.';
						break;
					case 'Icon':
						obj = {
							x : w2 - 25,
							y : h2 - 20
						}
						break;
					case 'Rect':
						obj = {};
						break;
					case 'Ellipse':
						obj = {};
						break;
					case 'Arrow':
						obj = {
							points : [25, 25, 150, 25]
						}
						obj.lineCap = 'round';
						obj.lineJoin = 'round';
						break;
				}

				obj.opacity = 1;
				obj.draggable = true;

				this.addTheme(obj, type);

				if (overrides) {
					for (var prop in overrides) {
						if (overrides.hasOwnProperty(prop)) {
							obj[prop] = overrides[prop];
						}
					}
				}

				return obj;
			},

			/*
			** Note: "layer" in this api is just a node added to the canvas "layer"
			** (in kineticjs, a "layer" is a new HTML canvas, and we use two kinetic layers,
			** one for the background color of the artboard and one to hold all artwork)
			*/
			addLayer : function(obj, type, override, callback) {
				var layer;

				obj = obj ? obj : this.getDefault(type, override);
				obj.id = 'layer' + _uniqueLayerIndex;
				_uniqueLayerIndex ++;

				if (!type) {
					console.log('Must provide "type" when creating a new layer.');
					return;
				}
				
				if (type !== 'Arrow' && (typeof obj.strokeWidth !== 'undefined' && obj.strokeWidth > 0)) {
					obj.width += obj.strokeWidth;
					obj.height += obj.strokeWidth;
				}

				switch(type) {
					case 'Image':
						layer = new Kinetic.Image(obj);
						break;
					case 'Text':
						layer = new Kinetic.Text(obj);
						break;
					case 'Icon':
						layer = new Kinetic.Icon(obj);
						break;
					case 'Rect':
						layer = new Kinetic.Rect(obj);
						break;
					case 'Ellipse':
						layer = new Kinetic.Ellipse(obj);
						break;
					case 'Arrow':
						layer = new Kinetic.Arrow(obj);
						layer.attrs.pointL = [obj.points[0], obj.points[1]];
						layer.attrs.pointR = [obj.points[2], obj.points[3]];
						break;
				}

				_artboard.canvas.add(layer);
				_artboard.stage.draw();

				if (typeof callback === 'function') {
					callback();
				}

				return layer;
			},

			// image is the oddball out when adding layers
			// since the image has to load first, it needs a callback
			addImage : function(data, overrides, callback) {
				var img = document.createElement('img'),
					_this = this,
					newImg;

				if (data.src.indexOf('data:image') == 0 && /[A-Za-z0-9+/=]/.test(data.src)) {
					img.src = data.src;

					img.onload = function() {
						newImg = _this.getDefault('Image');

						newImg.x = (_artboard.stage.getWidth()/2) - (img.width/2);
						newImg.y = (_artboard.stage.getHeight()/2) - (img.height/2);
						newImg.image = img;
						newImg.width = img.width;
						newImg.height = img.height;

						if (overrides) {
							for (var prop in overrides) {
								if (overrides.hasOwnProperty(prop)) {
									newImg[prop] = overrides[prop];
								}
							}
						}

						// TODO: Kinda scary, artboards can get really huge.
						// either store the image as a file and store the href here
						// instead. Or just delete artboards within a day or so
						newImg.src = data.src;

						newImg = _this.addLayer(newImg, 'Image');
						
						if (typeof callback === 'function') {
							callback(newImg);
						}
					};
				} else {
					alert('Darn, we don\'t support that file type.');
				}
			},

			drawShape : function(data, type, callback) {
				var canvasDim = utils.getElDim(_artboard.el),
					overrides = {
						width : 0,
						height : 0,
						x : data.evt.pageX - canvasDim.left,
						y : data.evt.pageY - canvasDim.top
					},
					obj = this.getDefault(type, overrides);

				return this.addLayer(obj, type);
			},

			drawArrow : function(data, callback) {
				var canvasDim = utils.getElDim(_artboard.el),
					x = data.evt.pageX - canvasDim.left,
					y = data.evt.pageY - canvasDim.top,
					overrides = {
						points : [x, y, x, y]
					};
				
				var	obj = this.getDefault('Arrow', overrides);

				return this.addLayer(obj, 'Arrow');
			},

			setLayerByEvent : function(evt) {
				var layer = evt.targetNode;

				if (layer && layer.attrs.id !== 'bgLayer') {
					_artboard.currentLayer = layer;

					if (_artboard.currentLayer.attrs.strokeWidth) {
						// hack for stroke issue on select by mouse
						this.concatLayerAttr('x', -_artboard.currentLayer.attrs.strokeWidth)
						this.concatLayerAttr('y', -_artboard.currentLayer.attrs.strokeWidth)
					}
				} else {
					_artboard.currentLayer = null;
				}
			},

			setLayerByID : function(id) {
				var layer = _artboard.stage.find('#' + id)[0];

				if (layer && layer.attrs.id !== 'bgLayer') {
					_artboard.currentLayer = layer;
				} else {
					_artboard.currentLayer = null;
				}
			},

			deselectAllLayers : function() {
				_artboard.currentLayer = null;
			},

			getCurrentLayer : function() {
				return _artboard.currentLayer;
			},

			stageToDataURL : function(type, callback) {
				type = type ? type : 'image/jpg';

				_artboard.stage.toDataURL({
					mimeType : type,
					callback : callback
				});
			},

			stageToJSON : function(callback) {
				_artboard.stage.toJSON({
					callback : callback
				});
			},

			copyCurrentLayer : function() {
				if (_artboard.currentLayer) {
					_copyLayer = _artboard.currentLayer;
				}
			},

			pasteCopyLayer : function(callback) { // callback is used for images
				if (_copyLayer) {
					var cls = _copyLayer.className,
						toPaste = {},
						_this = this;

					function updatePasted(l) {
						if (l.className !== 'Arrow') {
							l.setX(l.getX() + 10);
							l.setY(l.getY() + 10);
						} else {
							_this.moveArrow('x', 10, l);
							_this.moveArrow('y', 10, l);
						}

						l.moveToTop();
						_artboard.stage.draw();
					}

					if (cls !== 'Image') {
						// we can't copy an image since ownerElement attribute
						// is deprecated in modern browsers and by trying to copy it
						// we get an error So for images, we just pass the src below
						toPaste = angular.copy(_copyLayer.attrs);

						// only need to update the id on layers other than images
						if (typeof toPaste.id !== 'undefined') {
							toPaste.id = 'layer' + _uniqueLayerIndex;
							_uniqueLayerIndex ++;
						}
					}

					switch(cls) {
						case 'Rect':
						case 'Ellipse':
						case 'Icon':
						case 'Text':
							toPaste = this.addLayer(toPaste, cls);
							break;
						case 'Arrow':
							toPaste.points = [toPaste.pointL[0], toPaste.pointL[1], toPaste.pointR[0], toPaste.pointR[1]];
							toPaste = this.addLayer(toPaste, cls);
							break;
						case 'Image':
							this.addImage({
								src : _copyLayer.attrs.image.src,
							}, {
								x : _copyLayer.attrs.x,
								y : _copyLayer.attrs.y
							}, function(l) {
								updatePasted(l);

								if (typeof callback !== 'undefined') {
									callback(l);
								}
							});

							return true;
							break;
					}

					updatePasted(toPaste);

					if (typeof callback !== 'undefined') {
						callback(toPaste);
					}
					return true;
				}
			}
		}
	}]).

	factory('DB', ['$q', function($q) {
		var _artboard = null,
			_connected = false,
			_preImageData = null,
			_sessionPreview = null,
			_defaultJSON = '{"attrs":{"width":500,"height":300},"type":"image/jpeg","className":"Stage","children":[{"attrs":{"width":640,"height":360},"className":"Layer","children":[{"attrs":{"x":0,"y":0,"width":640,"height":360,"fill":"#ffffff"},"className":"Rect"}]},{"attrs":{"width":640,"height":360},"className":"Layer","children":[]}]}';

		try {
			Parse.initialize("TLEOYqL4I2QgTX0GpEzg3oD1Xv6Q3s2MiVSAEcri", "JXPYsPUbIN6Noriyy6mLrFamiuilKsMOaIfoKgzN");
			// TODO: a more accurate way of detecting an internet connection, user could have Parse cached
			_connected = true;
		} catch (e) {
			_connected = false;
			console.log(e.message);
		}

		return {
			setSessionArtboard : function(artboard) {
				_artboard = artboard;
			},

			getSessionArtboard : function() {
				return _artboard;
			},

			getLiveArtboard : function() {

			},

			saveArtboard : function(field, value, artboard) {
				artboard = artboard ? artboard : _artboard;
				
				try {
					artboard.set(field, value);
					artboard.save();
					return true;
				} catch (e) {
					return e;
				}
			},

			/* 
			** This block of code is for when/if maj supports
			** saving artboards
			// Expects a live artboard. This means you have to query for the artboard from Parse and pass in the result
			savePreviewFile : function(data, type, json) {
				var _this = this;
				
				this.getArtboardFromID(_artboard.id, function(artboardResult) {
					var artboardPreviewID = artboardResult.get('preview'),
						img,
						Preview,
						preview;

					artboardResult.set('data', json);
					console.log(json);
					artboardResult.save().done(function() {
						try {
							img = new Parse.File("makeajpg", {base64 : data}, type);
							img.save().done(function() {
								_this.getPreviewFromID(artboardPreviewID, function(previewResult) {
									artboardResult.set('preview', previewResult.id);
									artboardResult.save().done(function() {
										try {
											previewResult.set('file', img);
											previewResult.save();
										} catch(e) {
											alert('Your image didn\'t save :( Try again.');
											console.log(e);
										}
									});
								}, true);
							}).fail(function() {
								alert('Aw shuckle. We can\'t save the file!');
							});
						} catch(e) {
							alert('Sorry something went wrong. Maybe let us know or try again.')
							return;
						}
					}).fail(function() {
						alert('Your artboard cannot be saved. Sorry.');
					});
				});
			},

			getArtboardFromID : function(id, callback) {
				var Artboard = Parse.Object.extend("Artboard"),
					query = new Parse.Query(Artboard);
				
				query.equalTo("objectId", id);

				query.find({
					success: function(results) {
						if (typeof callback === 'function') {
							callback(results[0]);
						}
						return results[0];
					},
					error: function(error) {
						alert('We are really sorry but something went wrong!');
						return;
					}
				});
			},
			*/

			getPreviewFromID : function(id, callback) {
				var Preview = Parse.Object.extend("Preview"),
					query = new Parse.Query(Preview),
					preview;
				
				query.equalTo("objectId", id);

				query.first({
					success: function(result) {
						if (typeof result !== 'undefined') {
							if (typeof callback === 'function') {
								callback(result);
							}
						} else {
							// create a new one if none are found
							preview = new Preview();

							preview.save().done(function() {
								if (typeof callback === 'function') {
									callback(preview);
								}
							}).fail(function() {
								alert('Sorry, we couldn\'t save your image.');
								if (typeof callback === 'function') {
									callback(null);
								}	
							});
						}
					},
					error: function(error) {					
						alert('Uh! Wow, so sorry. That didn\'t work. Try again.');
						if (typeof callback === 'function') {
							callback(null);
						}
					}
				});
			},

			getSessionPreviewID : function() {
				return _sessionPreview ? _sessionPreview.id : null;
			},

			getSessionPreview : function(callback) {
				var id = _sessionPreview ? _sessionPreview.id : '',
					_this = this;
				
				// getPreviewFromID will create a new one if one is not found
				this.getPreviewFromID(id, function(result) {
					_sessionPreview = result;

					callback(_sessionPreview);
				});
			},

			savePreviewFile : function(data, type, callback) {
				var img,
					_this = this;

				try {
					img = new Parse.File("makeajpg", {base64 : data}, type);
					img.save().done(function() {
						_this.getSessionPreview(function(sessionPreview) {
							if (sessionPreview !== null) {
								try {
									sessionPreview.set('file', img);
									sessionPreview.save().done(function() {
										if (typeof callback === 'function') {
											callback(true);
										}
									}).fail(function() {
										if (typeof callback === 'function') {
											callback(false);
										}
									});
								} catch(e) {
									alert('Dang nabbit. We could not save your image.');
								}
							}
						});
					}).fail(function() {
						alert('Aw shuckle. We can\'t save the file!');
					});
				} catch(e) {
					if (typeof callback === 'function') {
						callback(false);
					}
				}
			},

			newArtboard : function(callback) {
				// TODO: add throttle to prevent an attack
				var Artboard = Parse.Object.extend("Artboard"),
					artboard = new Artboard(),
					deffered = $q.defer();

				try {
					artboard.save({
						data : _defaultJSON,
						preview : ''
					}, {
						success : function(artboard) {
							deffered.resolve(artboard);
						},
						error : function(artboard, err) {
							deffered.reject(err);
						}
					});
				} catch(e) {
					deffered.reject(e);
				}

				return deffered.promise;
			},

			newTemporaryArtboard  : function() {
				var mockArtboard = {};

				mockArtboard.data = _defaultJSON;
				mockArtboard.preview = '';
				mockArtboard.id = 'temp';
				mockArtboard.get = function(attr) {
					if (typeof this[attr] !== 'undefined') {
						return this[attr];
					} else {
						return null;
					}
				}

				this.setSessionArtboard(mockArtboard);

				return this.getSessionArtboard();
			},

			getTemplates : function(id) {
				var Template = Parse.Object.extend("Template"),
					query = new Parse.Query(Template),
					deffered = $q.defer();

				try {
					query.find({
						success : function(templates) {
							deffered.resolve(templates)
						},
						error : function(templates, err) {
							deffered.reject(err);
						}
					});
				} catch(e) {
					deffered.reject(e);
				}

				return deffered.promise;
			},

			getTemplateByID : function(id) {
				var Template = Parse.Object.extend("Template"),
					query = new Parse.Query(Template),
					deffered = $q.defer();

				try {
					query.get(id, {
						success : function(template) {
							deffered.resolve(template)
						},
						error : function(template, err) {
							deffered.reject(err);
						}
					});
				} catch(e) {
					deffered.reject(e);
				}

				return deffered.promise;
			},

			isConnected : function() {
				if (typeof Parse !== 'undefined') {
					_connected = true;
				} else {
					_connected = false;
				}
				return _connected;
			},

			setPreImageData : function(data) {
				_preImageData = data;
			},

			getPreImageData : function(data) {
				return _preImageData;
			}
		};
	}]);

'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
	controller('HomeCtrl', ['$scope', 'utils', 'DB', '$location', function($scope, utils, DB, $location) {
		utils.unsetLeaveWarning();
		$scope.templates = null;

		DB.getTemplates()
			.then(function(templates) {
				var t;

				$scope.templates = [];

				for (var i = 0, l = templates.length; i < l; i++) {
					t = templates[i];

					$scope.templates[i] = {};
					
					if (t.get('thumb')) {
						$scope.templates[i].src = t.get('thumb').url();
					}
					$scope.templates[i].id = t.id;
					$scope.templates[i].title = t.get('title');
				};
			}, function(err) {
				$scope.templates = null;
			});

		$scope.$on('jpgUploadEvent', function(e, data) {
			utils.ngApply($scope, function() {
				DB.setPreImageData(data);
				$location.path('/new');
			});
		});
	}]).

	/*controller('ViewCtrl', ['$scope', 'utils', 'DB', '$routeParams', function($scope, utils, DB, $routeParams) {
		utils.unsetLeaveWarning();
		DB.getPreviewFromID($routeParams.id, function(previewResult) {
			utils.domImg(previewResult.get('file').url(), function(img) {
				angular.element(document.getElementById('jpg_viewer')).html(img.outerHTML);
			});
		});
	}]).*/

	/*controller('NewCtrl', ['$scope', '$rootScope', '$location', 'DB', 'utils', function($scope, $rootScope, $location, DB, utils) {
		if (DB.isConnected()) {
			DB.newArtboard()
				.then(function(result) {
					utils.ngApply($scope, function() {
						DB.setSessionArtboard(result);
						$location.path("/edit/" + result.id);
					});
				}, function(error) {
					utils.ngApply($scope, function(result, err) {
						$location.path('/');
						alert('Oops, something went wrong. Try again.');
					});
				});
		} else {
			DB.setSessionArtboard(DB.newTemporaryArtboard());
			$location.path("/edit/" + DB.getSessionArtboard().id);
		}
	}]).*/

	controller('NewCtrl', ['$scope', '$rootScope', '$location', 'DB', 'utils', function($scope, $rootScope, $location, DB, utils) {
		// All artboards will be temporary until its decided whether to support saving
		DB.setSessionArtboard(DB.newTemporaryArtboard());
		$location.path("/edit/" + DB.getSessionArtboard().id);
	}]).

	controller('EditBuffer', ['$location', 'DB', '$routeParams', function($location, DB, $routeParams) {
		var artboardID = $routeParams.id;

		if (!artboardID) {
			// user went to /e/ for some reason
			$location.path('/');
		} else {
			if (!DB.isConnected() || artboardID === 'temp') {
				DB.setSessionArtboard(DB.newTemporaryArtboard());
				$location.path("/edit/" + DB.getSessionArtboard().id);
			} else {
				DB.getTemplateByID(artboardID)
					.then(function(result) {
						DB.setSessionArtboard(result);
						$location.path('/edit/' + DB.getSessionArtboard().id);
					}, function(error) {
						$location.path('/');
						alert('Darn! We couldn\'t find that artboard.');
					});
			}
		}
	}]).

	controller('EditCtrl', ['$scope', 'canvasApi', 'DB', '$rootScope', 'utils', '$compile', 'sessionArtboard', '$location', function($scope, canvasApi, DB, $rootScope, utils, $compile, sessionArtboard, $location) {
		/*
		 * BEGIN EDITING ARTBOARD
		 */

		var sessionArtboardJSON = JSON.parse(sessionArtboard.get('data')),
			imgs = angular.element(document.getElementById('images_scroller'));

		if (typeof sessionArtboardJSON.type === 'undefined') {
			sessionArtboardJSON.type = 'image/jpeg';
		}
		
		$scope.artboard = {}; // Angular.Data variable for binding in views
		$scope.artboard.width = sessionArtboardJSON.attrs.width;
		$scope.artboard.height = sessionArtboardJSON.attrs.height;
		$scope.artboard.fill = sessionArtboardJSON.children[0].children[0].attrs.fill;
		$scope.artboard.type = sessionArtboardJSON.type;
		$scope.artboard.stageDataURL = null;
		$scope.artboard.selected = null;

		$scope.previewURL = null;
		$scope.loading = null;

		// whether or not to show shortcut tips modal
		$scope.showTips = false;

		utils.setLeaveWarning();

		$scope.icons = ["&#xe600","&#xe601","&#xe602","&#xe603","&#xe604","&#xe605","&#xe606","&#xe607","&#xe608","&#xe609","&#xe60a","&#xe60b","&#xe60c","&#xe60d","&#xe60e","&#xe60f","&#xe610","&#xe611","&#xe612","&#xe613","&#xe614","&#xe615","&#xe616","&#xe617","&#xe618","&#xe619","&#xe61a","&#xe61b","&#xe61c","&#xe61d","&#xe61e","&#xe61f","&#xe620","&#xe621","&#xe622","&#xe623","&#xe624","&#xe625","&#xe626","&#xe627","&#xe628","&#xe629","&#xe62a","&#xe62b","&#xe62c","&#xe62d","&#xe62e","&#xe62f","&#xe630","&#xe631","&#xe632","&#xe633","&#xe634","&#xe635","&#xe636","&#xe637","&#xe638","&#xe639","&#xe63a","&#xe63b","&#xe63c","&#xe63d","&#xe63e","&#xe63f","&#xe640","&#xe641","&#xe642","&#xe643","&#xe644","&#xe645","&#xe646","&#xe647","&#xe648","&#xe649","&#xe64a","&#xe64b","&#xe64c","&#xe64d","&#xe64e","&#xe64f","&#xe650","&#xe651","&#xe652","&#xe653","&#xe654","&#xe655","&#xe656","&#xe657","&#xe658","&#xe659","&#xe65a","&#xe65b","&#xe65c","&#xe65d","&#xe65e","&#xe65f","&#xe660","&#xe661","&#xe662","&#xe663","&#xe664","&#xe665","&#xe666","&#xe667","&#xe668","&#xe669","&#xe66a","&#xe66b","&#xe66c","&#xe66d","&#xe66e","&#xe66f","&#xe670","&#xe671","&#xe672","&#xe673","&#xe674","&#xe675","&#xe676","&#xe677","&#xe678","&#xe679","&#xe67a","&#xe67b","&#xe67c","&#xe67d","&#xe67e","&#xe67f","&#xe680","&#xe681","&#xe682","&#xe683","&#xe684","&#xe685","&#xe686","&#xe687","&#xe688","&#xe689","&#xe68a","&#xe68b","&#xe68c","&#xe68d","&#xe68e","&#xe68f","&#xe690","&#xe691","&#xe692","&#xe693","&#xe694","&#xe695","&#xe696","&#xe697","&#xe698","&#xe699","&#xe69a","&#xe69b","&#xe69c","&#xe69d","&#xe69e","&#xe69f","&#xe6a0","&#xe6a1","&#xe6a2","&#xe6a3","&#xe6a4","&#xe6a5","&#xe6a6","&#xe6a7","&#xe6a8","&#xe6a9","&#xe6aa","&#xe6ab","&#xe6ac","&#xe6ad","&#xe6ae","&#xe6af","&#xe6b0","&#xe6b1","&#xe6b2","&#xe6b3","&#xe6b4","&#xe6b5","&#xe6b6","&#xe6b7","&#xe6b8","&#xe6b9","&#xe6ba","&#xe6bb","&#xe6bc","&#xe6bd","&#xe6be","&#xe6bf","&#xe6c0","&#xe6c1","&#xe6c2","&#xe6c3","&#xe6c4","&#xe6c5","&#xe6c6","&#xe6c7","&#xe6c8","&#xe6c9","&#xe6ca","&#xe6cb","&#xe6cc","&#xe6cd","&#xe6ce","&#xe6cf","&#xe6d0","&#xe6d1","&#xe6d2","&#xe6d3","&#xe6d4","&#xe6d5","&#xe6d6","&#xe6d7","&#xe6d8","&#xe6d9","&#xe6da","&#xe6db","&#xe6dc","&#xe6dd","&#xe6de","&#xe6df","&#xe6e0","&#xe6e1","&#xe6e2","&#xe6e3","&#xe6e4","&#xe6e5","&#xe6e6","&#xe6e7","&#xe6e8","&#xe6e9","&#xe6ea","&#xe6eb","&#xe6ec","&#xe6ed","&#xe6ee","&#xe6ef","&#xe6f0","&#xe6f1","&#xe6f2","&#xe6f3","&#xe6f4","&#xe6f5","&#xe6f6","&#xe6f7","&#xe6f8","&#xe6f9","&#xe6fa","&#xe6fb","&#xe6fc","&#xe6fd","&#xe6fe","&#xe6ff","&#xe700","&#xe701","&#xe702","&#xe703","&#xe704","&#xe705","&#xe706","&#xe707","&#xe708","&#xe709","&#xe70a","&#xe70b","&#xe70c","&#xe70d","&#xe70e","&#xe70f","&#xe710","&#xe711","&#xe712","&#xe713","&#xe714","&#xe715","&#xe716","&#xe717","&#xe718","&#xe719","&#xe71a","&#xe71b","&#xe71c","&#xe71d","&#xe71e","&#xe71f","&#xe720","&#xe721","&#xe722","&#xe723","&#xe724","&#xe725","&#xe726","&#xe727","&#xe728","&#xe729","&#xe72a","&#xe72b","&#xe72c","&#xe72d","&#xe72e","&#xe72f","&#xe730","&#xe731","&#xe732","&#xe733","&#xe734","&#xe735","&#xe736","&#xe737","&#xe738","&#xe739","&#xe73a","&#xe73b","&#xe73c","&#xe73d","&#xe73e","&#xe73f","&#xe740","&#xe741","&#xe742","&#xe743","&#xe744","&#xe745","&#xe746","&#xe747","&#xe748","&#xe749","&#xe74a","&#xe74b","&#xe74c","&#xe74d","&#xe74e","&#xe74f","&#xe750","&#xe751","&#xe752","&#xe753","&#xe754","&#xe755","&#xe756","&#xe757","&#xe758","&#xe759","&#xe75a","&#xe75b","&#xe75c","&#xe75d","&#xe75e","&#xe75f"];

		for (var i = 0, l = $scope.icons.length; i < l; i++) {
			imgs.append($compile('<a class="icon action_link" jpg-click-broadcast="jpgAddIcon" href="">' + $scope.icons[i] + '</a>')($scope));
		}

		$scope.textAlignments = {
			left : 'Left',
			center : 'Center',
			right : 'Right'
		};

		/*$scope.fontFamilies = [
			{name : 'Sans-serif', val : 'sans-serif'},
			{name : 'Serif', val : 'serif'},
			{name : 'Monospace', val : 'monospace'},
			{name : 'Cursive', val : 'cursive'},
			{name : 'Fantasy', val : 'fantasy'}
		];*/

		$scope.fontFamilies = {
			'sans-serif' : 'Sans-serif',
			serif : 'Serif',
			monospace : 'Monospace',
			cursive : 'Cursive',
			fantasy : 'Fantasy'
		};

		$scope.fontStyles = {
			normal : 'Normal',
			italic : 'Italic',
			bold : 'Bold'
		};

		$scope.textLineHeights = [
			{name : 'Small', size : 1.1},
			{name : 'Normal', size : 1.2},
			{name : 'Medium', size : 1.5},
			{name : 'Large', size : 2},
			{name : 'Extra', size : 4}
		];

		$scope.palette = ['#ffffff', '#cccccc', '#b3b3b3', '#999999', '#666666', '#4d4d4d', '#333333', '#000000', 
					   '#ff0000', '#e60000', '#b30000', '#990000', '#800000', '#660000', '#4d0000', '#330000',
					   '#00ff00', '#00e600', '#00b300', '#009900', '#008000', '#006600', '#004d00', '#003300',
					   '#0000ff', '#0000e6', '#0000b3', '#000099', '#000080', '#000066', '#00004d', '#000033',
					   '#FFB300', '#FFFB00', '#9DFF00', '#00FFE1', '#009DFF', '#C800FF', '#FF00FF', '#FF009D', 'transparent'];

		//$scope.alphas = ['0.1', '0.3', '0.5', '0.7', '0.8', '0.9', '1',];

		$scope.layerIs = function(is, not) {
			var ret = false;

			if ($scope.artboard.currentLayer) {
				if (is) {
					for (var i = 0, l = is.length; i < l; i++) {
						if ($scope.artboard.currentLayer.className === is[i]) {
							ret = true;
							break;
						}
					}
				}

				if (not) {
					for (var i = 0, l = not.length; i < l; i++) {
						if ($scope.artboard.currentLayer.className === not[i]) {
							ret = false;
							break;
						}
					}
				}
			}
			
			return ret;
		}

		// just a hooke into layerIs so that user doesn't have to pass empty param
		$scope.layerNot = function(not, is) {
			return !$scope.layerIs(not, is);
		}

		function setLayer(layer) {
			canvasApi.setLayerByID(layer.attrs.id);
			$scope.artboard.currentLayer = canvasApi.getCurrentLayer();
			utils.ngApply($scope);
		}

		/*
		** Initialization of the artboard and canvas
		*/
		$scope.$on('jpgArtboardEvent', function(e, data) {
			canvasApi.setArtboard(data, sessionArtboardJSON);
			$scope.artboard.layers = canvasApi.getLayers();

			if (DB.getPreImageData() !== null) {
				var imgData = DB.getPreImageData();
				imgData.doResizeArtboard = true;

				$scope.$broadcast('jpgUploadEvent', imgData);
				DB.setPreImageData(null);
			}
		});
		$scope.$on('jpgArtboardUpdateEvent', function(e, data) {
			canvasApi.setArtboard(data);
		});

		$scope.$on('jpgToggleShadow', function() {
			if ($scope.artboard.currentLayer.attrs.shadowEnabled) {
				canvasApi.setLayerAttr('shadowColorBak', $scope.artboard.currentLayer.attrs.shadowColor.toString(), null, null, false);
				canvasApi.setLayerAttr('shadowColor', 'transparent', null, null, false);
				canvasApi.setLayerAttr('shadowEnabled', false);
			} else {
				canvasApi.setLayerAttr('shadowEnabled', true);
				
				if (typeof $scope.artboard.currentLayer.attrs.shadowColor === 'undefined') {
					canvasApi.setLayerAttr('shadowColor', 'black', null, null, false);
					canvasApi.setLayerAttr('shadowOffsetX', 3, 'number', null, false);
					canvasApi.setLayerAttr('shadowOffsetY', 3, 'number', null, false);
					canvasApi.setLayerAttr('shadowBlur', 3, 'number', null, false);
					canvasApi.setLayerAttr('shadowOpacity', 0.5, 'decimal');
				} else if (typeof $scope.artboard.currentLayer.attrs.shadowColorBak !== 'undefined') {
					canvasApi.setLayerAttr('shadowColor', $scope.artboard.currentLayer.attrs.shadowColorBak);
				}
			}
		});

		/*
		** Scroll fix for chrome gestures for back/forward on swipe left/right
		*/
		// TODO: Prevent swipe for history back, this prevents all scrolling
		/*$rootScope.$on('jpgDocumentWheelScroll', function(e, data) {
			document.getElementById('edit_plane').scrollLeft -= data.evt.wheelDeltaX;
			data.evt.preventDefault();
		});*/

		/*
		** Layer selection
		*/
		$rootScope.$on('jpgArtboardMouseDown', function(e, data) {
			if (!data.drawing) {
				utils.ngApply($scope, function() {
					canvasApi.setLayerByEvent(data.evt);
					$scope.artboard.currentLayer = canvasApi.getCurrentLayer();
					
					if ($scope.artboard.currentLayer) {
						canvasApi.theme($scope.artboard.currentLayer.className, $scope.artboard.currentLayer);
					}
				});
			}
		});
		$scope.$on('jpgDeselect', function(e, data) {
			utils.ngApply($scope, function() {
				canvasApi.deselectAllLayers();
				$scope.artboard.currentLayer = null;
			});
		});
		$scope.$on('jpgLayerManagerSelection', function(e, data) {
			utils.ngApply($scope, function() {
				canvasApi.setLayerByID(data.layerID);
				$scope.artboard.currentLayer = canvasApi.getCurrentLayer();
			});
		});

		/*
		** Local image upload
		*/
		$scope.$on('jpgUploadEvent', function(e, data) {
			canvasApi.addImage({
				src : data.src
			}, null, function(layer) {
				var layerCount = canvasApi.getLayers().length,
					w,
					h;

				setLayer(layer);

				if (data.doResizeArtboard) {
					w = $scope.artboard.currentLayer.attrs.width;
					h = $scope.artboard.currentLayer.attrs.height;

					canvasApi.setArtboard({
						width : w,
						height : h
					});

					$scope.artboard.width = w;
					$scope.artboard.height = h;
					canvasApi.setLayerAttr('x', 0);
					canvasApi.setLayerAttr('y', 0);
					utils.ngApply($scope);
				}
			});
		});

		$scope.$on('jpgAddText', function(e, data) {
			setLayer(canvasApi.addLayer(null, 'Text'));
		});

		$scope.$on('jpgAddRect', function(e, data) {
			setLayer(canvasApi.addLayer(null, 'Rect'));
		});

		$scope.$on('jpgAddEllipse', function(e, data) {
			setLayer(canvasApi.addLayer(null, 'Ellipse'));
		});

		$scope.$on('jpgAddArrow', function(e, data) {
			setLayer(canvasApi.addArrow(null));
		});

		$scope.$on('jpgDrawRect', function(e, data) {
			setLayer(canvasApi.drawShape(data, 'Rect'));
			$rootScope.$broadcast('jpgDrawReady');
		});

		$scope.$on('jpgDrawEllipse', function(e, data) {
			setLayer(canvasApi.drawShape(data, 'Ellipse'));
			$rootScope.$broadcast('jpgDrawReady');
		});

		$scope.$on('jpgDrawArrow', function(e, data) {
			setLayer(canvasApi.drawArrow(data));
			$rootScope.$broadcast('jpgDrawReady');
		});

		$scope.$on('jpgAddIcon', function(e, data) {
			setLayer(canvasApi.addLayer(null, 'Icon', {
				text : data.element.text(),
				fontFamily : 'icomoon'
			}));
		});

		/*
		** Export
		*/
		$scope.$on('jpgExport', function(e, data) {
			$scope.loading = true;
			utils.ngApply($scope);
			canvasApi.stageToDataURL($scope.artboard.type, function(dataURL) {
				//TODO: Save image to DB w/ unique ID
				// then save artboard data
				//console.log(DB.getSessionArtboard());

//console.log(canvasApi.getArtboardJSON());

				$scope.previewURL = null;
				$scope.artboard.stageDataURL = dataURL;				
				$scope.loading = null;
				utils.ngApply($scope);
			});

			/*canvasApi.stageToJSON(function(dataJSON) {
				DB.saveArtboard('data', dataJSON);
			});*/
		});

		$scope.$on('jpgSharePreview', function() {
			$scope.loading = true;
			utils.ngApply($scope);

			DB.savePreviewFile($scope.artboard.stageDataURL, $scope.artboard.type, function(saved) {
				if (saved) {
					$scope.previewURL = 'mjpg.co' + '/' + DB.getSessionPreviewID();
					/*setTimeout(function() {
						document.getElementById('preview_url').setSelectionRange(0, 100);
					}, 0);*/
				} else {
					$scope.previewURL = null;
					alert('Well, we can\'t share your file right now, sorry :(');
				}
				$scope.loading = null;
				utils.ngApply($scope);
			});
		});

		$scope.$on('jpgClosePreview', function() {
			utils.ngApply($scope, function() {
				$scope.artboard.stageDataURL = null;
			});
		});

		$scope.$on('jpgCloseTips', function() {
			utils.ngApply($scope, function() {
				$scope.showTips = false;
			});
		});

		$scope.$on('jpgShowTips', function() {
			utils.ngApply($scope, function() {
				$scope.showTips = true;
			});
		});

		/*
		** Layer controls
		*/
		$scope.$on('jpgLayerUp', function(e, data) {
			utils.ngApply($scope, function() {
				canvasApi.moveLayerUp(canvasApi.getCurrentLayer());
			});
		});

		$scope.$on('jpgLayerDown', function(e, data) {
			utils.ngApply($scope, function() {
				canvasApi.moveLayerDown(canvasApi.getCurrentLayer());
			});
		});

		$scope.$on('jpgLayerDelete', function(e, data) {
			utils.ngApply($scope, function() {
				canvasApi.deleteLayer(canvasApi.getCurrentLayer());
				$scope.artboard.currentLayer = null;
			});
		});

		$scope.$on('jpgLayerResize', function(e, data) {
			canvasApi.resizeLayerByMouse(data);
		});

		$scope.$on('jpgLayerMove', function(e, data) {
			canvasApi.moveLayerByMouse(data);
		});

		$scope.$on('jpgLayerMoveX', function(e, data) {
			utils.ngApply($scope, function() {
				if ($scope.artboard.currentLayer.className === 'Arrow') {
					canvasApi.moveArrow('x', data.increment);
				} else {
					canvasApi.concatLayerAttr('adjustedX', data.increment, 'number');
				}
			});
		});

		$scope.$on('jpgLayerMoveY', function(e, data) {
			utils.ngApply($scope, function() {
				if ($scope.artboard.currentLayer.className === 'Arrow') {
					canvasApi.moveArrow('y', data.increment);
				} else {
					canvasApi.concatLayerAttr('adjustedY', data.increment, 'number');
				}
			});
		});

		/*$scope.$on('jpgFlipLayerY', function() {
			canvasApi.flipLayerY();
		});

		$scope.$on('jpgFlipLayerX', function() {
			canvasApi.flipLayerX();
		});*/

		$scope.$on('jpgInputSuccess', function(e, data) {
			if (data.layerProp) {
				var validate = data.validate ? data.validate : data.type;

				canvasApi.setLayerAttr(data.layerProp, data.val, validate);
				
				if ($scope.artboard.currentLayer) {
					// set the theme to the currently selected
					canvasApi.theme($scope.artboard.currentLayer.className, $scope.artboard.currentLayer);
				}

				utils.ngApply($scope);
			}
		});

		$scope.showFitButton = function() {
			if ($scope.artboard.currentLayer && $scope.artboard.currentLayer.className !== 'Arrow') {
				return true;
			} else {
				return false;
			}
		};

		$scope.$on('jpgFitCanvasToSelectedLayer', function() {
			if ($scope.artboard.currentLayer && $scope.artboard.currentLayer.className !== 'Arrow') {
				var data = {},
					w = $scope.artboard.currentLayer.attrs.adjustedWidth,
					h = $scope.artboard.currentLayer.attrs.adjustedHeight,
					diffX,
					diffY,
					tempL;

				if ($scope.artboard.currentLayer.className === 'Icon') {
					w = $scope.artboard.currentLayer.attrs.fontSize + $scope.artboard.currentLayer.attrs.strokeWidth;
					h = w;
				}

				if (w > 0) {
					data.width = w;
					diffX = $scope.artboard.currentLayer.attrs.adjustedX;
					$scope.artboard.width = w;
				}

				if (h > 0) {
					data.height = h;
					diffY = $scope.artboard.currentLayer.attrs.adjustedY;
					$scope.artboard.height = h;
				}	

				canvasApi.setArtboard(data);

				for (var i = 0, l = $scope.artboard.layers.length; i < l; i ++) {
					tempL = $scope.artboard.layers[i];

					if (tempL.className === 'Arrow') {
						canvasApi.moveArrow('x', -diffX, tempL);
						canvasApi.moveArrow('y', -diffY, tempL);
					} else {
						canvasApi.concatLayerAttr('adjustedX', -diffX, 'number', tempL);
						canvasApi.concatLayerAttr('adjustedY', -diffY, 'number', tempL);
					}
				}

				utils.ngApply($scope);
			}
		});

		/* Add Shortcuts */

		utils.addShortcut('67', function() { // c
			canvasApi.copyCurrentLayer();
		}, true);

		utils.addShortcut('86', function() { // v
			canvasApi.pasteCopyLayer(function(l) {
				setLayer(l);
				utils.ngApply($scope);
			});
		}, true);
	}]);

'use strict';

/* Filters */

angular.module('myApp.filters', []).

	filter('interpolate', ['version', function(version) {
		return function(text) {
			return String(text).replace(/\%VERSION\%/mg, version);
		};
	}]).

	filter('round', function() {
		return function(string) {
			var integ = parseInt(string);

			if (integ) {
				return Math.ceil(parseInt(string));
			} else {
				return string;
			}
		};
	}).
	
	filter('reverse', function() {
		return function(items) {
			return items.slice().reverse();
		};
	});
'use strict';

/* Directives */

angular.module('myApp.directives', []).

	directive('jpgDropzone', function($rootScope) {
		return function(scope, element, attrs) {
			var newDropzone = new Dropzone(document.body, {
				url : '/',
				createImageThumbnails : false,
				previewsContainer : null,
				clickable : false,
				maxFilesize : 2,
				resize : function(file) {
				},
				init : function() {
					this.on('addedfile', function(file) { 
						var reader = new FileReader();
					
						reader.onload = function(fileEvent) {
							scope.$broadcast('jpgUploadEvent',
								{
									src : fileEvent.target.result
								}
							);
						};

						reader.readAsDataURL(file);
					});
				}
			});
		}
	}).

	directive('jpgArtboard', ['utils', '$rootScope', '$document', function(utils, $rootScope, $document) {
		return {
			scope : {
				width : '=',
				height : '=',
				fill : '=',
				type : '='
			},
			link : function(scope, element, attrs) {			
				function updateArtboard() {
					scope.$parent.$broadcast('jpgArtboardUpdateEvent',
						{
							width : parseInt(scope.width, 10),
							height : parseInt(scope.height, 10),
							fill : scope.fill,
							type : scope.type
						}
					);
				}

				/*document.addEventListener("mousewheel", function(e) {
					$rootScope.$broadcast('jpgDocumentWheelScroll', {
						evt : e
					})
				});*/

				scope.$parent.$broadcast('jpgArtboardEvent',
					{
						id : attrs.id,
						width : parseInt(scope.width, 10),
						height : parseInt(scope.height, 10),
						fill : scope.fill
					}
				);

				element.on('mousedown', function(evt) {
					$rootScope.$broadcast('jpgArtboardMouseDown',
						{
							evt : evt
						}
					);
				});

				element.on('mouseup', function(evt) {
					$rootScope.$broadcast('jpgArtboardMouseUp');
				});

				scope.$watch('width', updateArtboard);
				scope.$watch('height', updateArtboard);
				scope.$watch('fill', updateArtboard);
				scope.$watch('type', updateArtboard);
			}
		};
	}]).

	directive('jpgDrawPlane', ['$rootScope', '$document', function($rootScope, $document) {
		return function(scope, element, attrs) {
			var mouseDownEvt = null,
				reset = function() {
					element.removeClass('selected');
					$document.off('mousedown');
					element.off('mousemove');
					mouseDownEvt = null;
				};

			// jpgReset and jpgEnd are needed so that other components can
			// bind to a drawing reset while still being able to respond
			// differently dependent on whether its an actual draw ending event
			$rootScope.$on('jpgResetDraw', function() {
				reset();
			});

			$rootScope.$on('jpgEndDraw', function() {
				reset();
			});

			$rootScope.$on('jpgStartDraw', function(e, data) {
				element.addClass('selected');

				$document.on('mousedown', function(evt) {
					if (element[0] === evt.target) {
						mouseDownEvt = evt;

						$rootScope.$broadcast(data.drawEvt, {
							evt : evt
						});
					} else {
						$rootScope.$broadcast('jpgEndDraw');
					}
				});
			});

			$rootScope.$on('jpgDrawReady', function() {
				if (mouseDownEvt !== null) {
					$rootScope.$broadcast('jpgArtboardMouseDown', {
						evt : mouseDownEvt,
						drawing : true
					});
				}
			});

			element.on('mouseup', function(evt) {
				$rootScope.$broadcast('jpgArtboardMouseUp');
				$rootScope.$broadcast('jpgEndDraw');
			});
		}
	}]).

	directive('jpgDraw', ['$rootScope', 'utils', function($rootScope, utils) {
		return function(scope, element, attrs) {
			var cls = 'selected',
				broadcast = function(hide) {
					// reset the drawing plane/clear out existing/pending shapes
					$rootScope.$broadcast('jpgResetDraw');
					
					// check if we should be drawing this elements target shape
					if ((element.hasClass(cls) && hide !== false) || hide === true) {
						$rootScope.$broadcast('jpgEndDraw');
					} else {
						$rootScope.$broadcast('jpgStartDraw',
							{
								drawEvt : attrs.jpgDrawEvt
							}
						);
						element.addClass(cls);
					}
				}

			if (attrs.jpgShortcut) {
				utils.addShortcut(attrs.jpgShortcut, function() {
					broadcast();
				});
			}

			element.on('click', function(evt) {
				broadcast();
			});

			// reset anytime a new drawing is ended
			$rootScope.$on('jpgEndDraw', function(e) {
				element.removeClass(cls);
			});

			// reset anytime a new drawing is started
			$rootScope.$on('jpgStartDraw', function(e) {
				element.removeClass(cls);
			});
		}
	}]).
	
	directive('jpgUpload', function() {
		return function(scope, element, attrs) {
			element.bind('change', function() {
				if (this.files && this.files[0]) {
					var reader = new FileReader();
					
					reader.onload = function(e) {
						scope.$broadcast('jpgUploadEvent',
							{
								file : e
							}
						);

						element.val('');
					};

					reader.readAsDataURL(this.files[0]);
				}
				return false;
			});
		};
	}).

	directive('jpgClickBroadcast', ['utils', function(utils) {
		return function(scope, element, attrs) {
			function broadcast() {
				scope.$broadcast(attrs.jpgClickBroadcast,
					{
						element : element,
						attrs : attrs
					}
				);
				return false;
			}

			if (attrs.jpgShortcut) {
				utils.addShortcut(attrs.jpgShortcut, function() {
					broadcast();
				});
			}

			element.bind('click', function() {
				broadcast();
			});
		};
	}]).

	directive('jpgInput', ['utils', '$rootScope', function(utils, $rootScope) {
		return {
			require : 'ngModel',
			scope : {
				layerProp : '@'
			},
			link : function(scope, element, attrs, ngModel) {
				var _this = this,
					$body = angular.element(document).find('body');

				var validate = function() {
					var validation = element[0].validity,
						val;

					if (!validation.valid) {
						utils.ngApply(scope, function() {
							element.val(element.attr('data-temp'));
							element.removeClass('error');
							ngModel.$setViewValue(element.attr('data-temp'));
						});
					} else {
						val = element.val();

						scope.$parent.$broadcast('jpgInputSuccess', 
							{
								layerProp : scope.layerProp,
								val : val,
								type : attrs.type,
								validate : attrs.jpgValidate
							}
						);
					}
				}

				element.on('focus', function() {
					element.attr('data-temp', element.val());

					if (typeof attrs.jpgColor !== 'undefined') {
						$rootScope.$broadcast('jpgColorFocus', {
							element : element
						});
					}
				});

				element.on('keyup', function() {
					var validation = element[0].validity;

					if (!validation.valid) {
						element.addClass('error');
					} else {
						element.removeClass('error');
					}
				});

				element.on('blur', function() {
					validate();

					if (typeof attrs.jpgColor !== 'undefined') {
						$rootScope.$broadcast('jpgColorBlur', {
							element : element
						});
					}
				});

				//if (attrs.jpgInput === 'change') {
					element.on('change', function() {
						validate();
					});
				//}
			}
		}
	}]).

	directive('jpgShareInput', function(utils, $rootScope) {
		return function(scope, element, attrs, ngModel) {
			element.on('click', function() {
				element[0].setSelectionRange(0, 100);
			});

			scope.$watchCollection('previewURL', function() {
				setTimeout(function() {
					element[0].setSelectionRange(0, 100);
				}, 0);
			});
		}
	}).

	directive('jpgColorPicker', ['utils', '$rootScope', function(utils, $rootScope) {
		return {
			restrict : 'EA',
			scope : {
				palette : '=',
				alphas : '='
			},
			template : '<span class="swatch_holder" ng-repeat="swatch in palette"><a class="swatch" href="" title="{{swatch}}" style="background-color: {{swatch}};"></a></span>',
			link : function(scope, element, attrs) {
				var cls = 'selected',
					$pickerTarget;
				
				element.on('mousedown', function(e) {
					var $targ = angular.element(e.target),
						val;
						
					if ($targ.hasClass('swatch')) {
						$pickerTarget.val($targ.attr('title'));
						$pickerTarget.triggerHandler('change');
						element.removeClass(cls);
					}
					return false;
				});

				$rootScope.$on('jpgColorFocus', function(e, data) {
					element.addClass(cls);
					utils.gps(element[0], data.element[0]);
					$pickerTarget = data.element;
				});

				$rootScope.$on('jpgColorBlur', function(e, data) {
					element.removeClass(cls);
				});
			}
		}
	}]).

	directive('jpgDeselect', function() {
		return function(scope, element, attrs) {
			element.on('click', function(evt) {
				if (evt.target.id === attrs.id) {
					scope.$parent.$broadcast('jpgDeselect',
						{
							evt : evt
						}
					);
				}
			});
		}
	}).

	directive('jpgLayerManager', ['$rootScope', 'utils', '$document', function($rootScope, utils, $document) {
		return {
			restrict : 'EA',
			scope : {
				layers : '=',
				current : '=',
				order : '='
			},
			template : '<div id="layers"><a id="{{ layer.attrs.id }}" href="" class="{{ layer.attrs.id == current.attrs.id ? \'selected\' : \'\' }}" ng-repeat="layer in layers.slice().reverse()">{{ layer.className }}</a></div>',
			link : function(scope, element, attrs) {
				element.on('click', function(e) {
					var target = e.target;

					if (target.tagName === 'A') {
						scope.$parent.$broadcast('jpgLayerManagerSelection',
							{
								layerID : target.id
							}
						);
						return false;
					}
				});

				$document.on('keydown', function(e) {
					var shift = e.shiftKey,
						increment = 1,
						eventName,
						stopProp = false;

					if (utils.nothingFocused()) {
						// if focused in input or textarea do nothing
						if (shift) {
							increment = 10;
						}

						if (e.keyCode === 38 || e.keyCode === 37) { // up or left 
							increment = shift ? -10 : -1;
						}

						switch(e.keyCode) {
							case 38: // up
							case 40: //down
								eventName = 'jpgLayerMoveY';
								stopProp = true;
								break;
							case 39: // right
							case 37: // left
								eventName = 'jpgLayerMoveX';
								stopProp = true;
								break;
							case 8: // backspace
								eventName = 'jpgLayerDelete';
								stopProp = true;
								break;
						}

						if (scope.current) {
							scope.$parent.$broadcast(eventName,
								{
									shift : shift,
									increment : increment
								}
							);
						}

						// pass the event into the execute shortcut method to
						// check if there are any events
						utils.executeShortcut(e);

						if (stopProp) {
							e.preventDefault();
							return false;
						}
					}
				});
			}
		}
	}]).
	
	directive('jpgLayerHandles', ['$document', 'utils', '$rootScope', function($document, utils, $rootScope) {
		return {
			scope : {
				layer : '=',
			},
			template : '<a class="jpg_handle tl" data-dir="tl" href=""></a><a class="jpg_handle tr" data-dir="tr" href=""></a><a class="jpg_handle br" data-dir="br" href=""></a><a class="jpg_handle bl" data-dir="bl" href=""></a>' + 
					   '<a class="jpg_handle l point" data-dir="l" href="" style="top: {{layer.attrs.pointL[1] + layer.getY()}}px;left: {{layer.attrs.pointL[0] + layer.getX()}}px;"></a><a class="jpg_handle r point" data-dir="r" href="" style="top: {{layer.attrs.pointR[1] + layer.getY()}}px;left: {{layer.attrs.pointR[0] + layer.getX()}}px;"></a>',
			link : function(scope, element, attrs) {
				var $body = angular.element(document).find('body'),
					isResize;

				// artboardmouseup can come from the artboard or the handles
				$rootScope.$on('jpgArtboardMouseUp', function() {
					$document.off('mousemove');
					$body.removeClass('dragging');
					$body.removeClass('resizing');
					utils.ngApply(scope.$parent);
				});

				function handleDown(data) {
					if(scope.layer) {
						var tempX = data.evt.pageX,
							tempY = data.evt.pageY,
							tempLayerX = scope.layer.attrs.x,
							tempLayerY = scope.layer.attrs.y,
							tempWidth = scope.layer.attrs.width,
							tempHeight = scope.layer.attrs.height,
							isResize = data.evt.target.tagName == 'A' ? true : false,
							dir = angular.element(data.evt.target).attr('data-dir'),
							offset = scope.layer.attrs.strokeWidth ? scope.layer.attrs.strokeWidth/2 : 0,
							tempPointR = scope.layer.attrs.pointR,
							tempPointL = scope.layer.attrs.pointL;

						if (data.drawing) {
							isResize = true;
						}

						$document.on('mouseup', function() {
							$rootScope.$broadcast('jpgArtboardMouseUp');
						});

						$document.on('mousemove', function(evt) {
							var deltaX = evt.pageX - tempX,
								deltaY = evt.pageY - tempY,
								obj = {
									evt : evt,
									deltaX : deltaX,
									deltaY : deltaY,
									tempX : tempX,
									tempY : tempY,
									tempLayerX : tempLayerX,
									tempLayerY : tempLayerY,
									tempWidth : tempWidth,
									tempHeight : tempHeight,
									offset : offset,
									tempPointR : tempPointR,
									tempPointL : tempPointL,
									dir : dir,
									drawing : data.drawing ? data.drawing : false
								};

							if (isResize) {
								$body.addClass('resizing');
								scope.$parent.$broadcast('jpgLayerResize', obj);
							} else {
								$body.addClass('dragging');
								scope.$parent.$broadcast('jpgLayerMove', obj);
							}

							utils.ngApply(scope.$parent);
						});
					}
				}

				// the user might be clicking on the handles or on the html canvas/layer
				// this is to catch the instance where they click a layer thats already selected
				element.on('mousedown', function(evt) {
					handleDown({evt : evt});
				});

				$rootScope.$on('jpgArtboardMouseDown', function(e, data) {
					handleDown(data);
				});

				/* TODO: Add support for inline text edit
				element.on('dblclick', function() {
					if (scope.layer.className === 'Text') {
						var area = angular.element('<textarea class="edit_text"></textarea>');

						area.val(scope.layer.attrs.text);

						element.append(area);
					}
				}); */

				scope.$watchCollection('layer.attrs', function() {
					var stroke,
						style,
						w,
						h,
						x,
						y;

					if (scope.layer) {
						stroke =  scope.layer.attrs.strokeWidth ? scope.layer.attrs.strokeWidth : 0;
						style = 'width:' + ((scope.layer.attrs.width + (stroke)) + 4) + 'px;' +
								'height:' + ((scope.layer.attrs.height + (stroke)) + 4) + 'px;' +
								'top:' + (scope.layer.attrs.y - 2 - (stroke/2)) + 'px;' +
								'left:' + (scope.layer.attrs.x - 2 - (stroke/2)) + 'px;'; // stroke/2 because html canvas sets 0, 0 in the middle of the stroke

						element.attr('style', style);
					}
				});
			}
		}
	}]).

	directive('jpgToggle', ['$document', 'utils', function($document, utils) {
		return function(scope, element, attrs) {
			var cls = 'selected',
				$targ,
				toggle = function(el, targId) {
					var clickedToggleId = angular.element(el).attr('jpg-toggle'),
						show = function() {
							$targ.addClass(cls);
							element.addClass(cls);
						},
						hide = function() {
							$targ.removeClass(cls);
							element.removeClass(cls);
							$targ = null;
						};
					
					if (clickedToggleId === targId) {
						$targ = angular.element(document.getElementById(targId));

						if ($targ.hasClass(cls)) {
							hide();
						} else {
							show();
						}
					} else {
						if ($targ && el.tagName !== 'INPUT') {
							hide();
						}
					}

					return false;
				}

			if (attrs.jpgShortcut) {
				utils.addShortcut(attrs.jpgShortcut, function() {
					toggle(element, attrs.jpgToggle);
				});
			}

			$document.on('click', function(e) {
				toggle(e.target, attrs.jpgToggle)
			});
		}
	}]).

	directive('appVersion', ['version', function(version) {
		return function(scope, elm, attrs) {
			elm.text(version);
		};
	}]);