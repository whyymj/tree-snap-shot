/*! For license information please see index.js.LICENSE.txt */
(()=>{"use strict";var e={amdO:{},n:t=>{var n=t&&t.__esModule?()=>t.default:()=>t;return e.d(n,{a:n}),n},d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}};function t(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}e.r({});const n=new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),t(this,"unImmutableData",{equal:function(e,t){return e===t},copy:function(e){return e}}),t(this,"list",{key:"_id",mapSimilarityForDiff:.6})}var n;return(n=[{key:"set",value:function(e){}}])&&function(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(e.prototype,n),e}());var r=require("immutable"),o=e.n(r),i=require("kind-of"),a=e.n(i);r=require("isobject"),i=e.n(r);const u=new(function(){function e(){var t,n;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),n={},(t="cache")in this?Object.defineProperty(this,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):this[t]=n}var t;return(t=[{key:"set",value:function(e,t,n){o().isImmutable(e)&&o().isImmutable(t)?this.cache[o().hash(e)+"_"+o().hash(t)]=n:o().isImmutable(e)&&void 0!==t&&(this.cache[o().hash(e)]=t)}},{key:"get",value:function(e,t){return o().isImmutable(e)&&o().isImmutable(t)?this.cache[o().hash(e)+"_"+o().hash(t)]:o().isImmutable(e)&&void 0===t?this.cache[o().hash(e)]:null}},{key:"clear",value:function(){this.cache={}}}])&&function(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(e.prototype,t),e}());function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var f=Object.prototype.toString,c=function(e){return"object"===l(e)&&(o().isImmutable(e)||Array.isArray(e)||function(e){if(!e||"object"!==l(e)||"[object Object]"!==f.call(e))return!1;if(null===(e=Object.getPrototypeOf(e)))return!0;for(var t=e,n=Object.getPrototypeOf(e);null!==n;)t=n,n=Object.getPrototypeOf(t);return t===e}(e))};function s(e){return"string"==typeof e||"number"==typeof e||"symbol"===l(e)||"boolean"==typeof e||null==e}function d(e,t){var n=1<arguments.length&&void 0!==t&&t;if(o().isImmutable(e)){if(t=e.toString(),!n)return"Immutable "+t.split(" ")[0];if(0==t.indexOf("Map"))return"object";if(0==t.indexOf("List"))return"array";e=e.toJS()}return a()(e)}i();var p=function(e){return null==e};function m(e){var t=0;return c(e)?(e=o().fromJS(e),u.get(e)?u.get(e):(e.map((function(e){t+=m(e)})),t&&u.set(e,t),t)):1}var y=function(e){if(function(e){return"object"===("undefined"==typeof HTMLElement?"undefined":l(HTMLElement))?e instanceof HTMLElement:e&&"object"===l(e)&&(1===e.nodeType||9===e.nodeType)&&"string"==typeof e.nodeName}(e)||s(e))return e;if(o().isImmutable(e))return e;var t=o().fromJS(e);return o().isImmutable(t)?t:n.unImmutableData.copy(e)};function h(e){return function(e){if(Array.isArray(e))return b(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return b(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(n="Object"===n&&e.constructor?e.constructor.name:n)||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?b(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function g(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function v(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function S(e,t,n){return t&&v(e.prototype,t),n&&v(e,n),e}function I(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function j(e){return(j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function k(e,t,n){var r=0<arguments.length&&void 0!==e?e:{},i=(t=1<arguments.length?t:void 0,2<arguments.length&&void 0!==n?n:["add","update"]);if("object"!=j(r))throw new Error("请输入Object");return(t=Array.isArray(t)?t:[t]).map((function(e){var t,n,a;i.includes(e.operation)&&(t=e.path,n=e.type,a=r,t.map((function(t,r){"object"==(r=o().isImmutable(n)?n.get(r+1):n[r+1])||"array"==r?(a[t]||(a[t]={}),a=a[t]):a[t]=o().isImmutable(e.value.to)?e.value.to.toJS():e.value.to})))})),r}var O=new(function(){function e(){g(this,e),I(this,"mergeLog",{}),I(this,"logs",[])}return S(e,[{key:"push",value:function(e){switch(e.operation){case"add":return void(this.mergeLog.add=k(this.mergeLog.add,e,["add"]));case"update":return void(this.mergeLog.update=k(this.mergeLog.update,e,["update"]))}this.logs.push(e)}},{key:"remove",value:function(e){this.logs=this.logs.filter((function(t){return"init"==t.operation||!1!==e(t)}))}},{key:"update",value:function(e){this.logs=this.logs.map((function(t){return e(t)||t}))}},{key:"check",value:function(){var e=this;return[].concat(h(Object.keys(this.mergeLog).map((function(t){return{operation:"deep-merge-"+t,value:e.mergeLog[t]}}))),h(this.logs.filter((function(e){return"init"!=e.operation}))))}},{key:"init",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:[];if(!Array.isArray(e))throw new Error("请输入正确的log");this.logs=e}}]),e}());function w(){return JSON.stringify(this.map((function(e){return o().fromJS(e).toJS()})))}const x=new(function(){function e(){g(this,e),O.init()}return S(e,[{key:"reset",value:function(){return k(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},1<arguments.length?arguments[1]:void 0)}},{key:"add",value:function(e){O.push(e)}},{key:"init",value:function(e){O.init(),O.push({operation:"init",value:e})}},{key:"getLog",value:function(){var e=O.check();return e.toString=w,e}},{key:"setLogs",value:function(e){O.init(e)}}]),e}());function L(e,t){for(var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:function(e,t){return e===t},r=e.size,o=t.size,i={1:0},a={0:{1:0}},u=0;u<=r+o;u++){for(var l={},f=-u;f<=u;f+=2){for(var c=f==-u||f!=u&&i[f+1]>i[f-1],s=c?f+1:f-1,d=i[s],p=d=c?d:d+1,m=d-f;p<r&&m<o&&n(e.get(p),t.get(m));)p++,m++;if(i[f]=p,(l[f]=p)==r&&m==o)return a[u]=l,function(e,t,n){var r=[],o=0;return e.forEach((function(e,i){var a=e[0],u=e[1],l=e[2],f=a;if(0===i&&0!==a)for(var c=0;c<a;c++)o++;u-a==1?(r.push({operation:"del",value:t.get(a),index:[a,o]}),f=u):(r.push({operation:"add",value:n.get(o),index:[a,o]}),o++);for(var s=0;s<l-f;s++)o++})),r}(function(e,t,n,r){for(var o=[],i={x:t,y:n};0<r;r--){var a=e[r],u=e[r-1],l=i.x-i.y,f=a[l],c=(a=(u=u[a=(c=l==-r||l!=r&&u[1+l]>u[l-1])?1+l:l-1])-a,c?u:u+1);o.unshift([u,c,f]),i.x=u,i.y=a}return o}(a,r,o,u),e,t)}a[u]=l}}var M=function(e,t,r,o,i){var a=L(e,t,(function(e,t){return s(e)||s(t)?e===t:"Immutable Map"==d(e)&&"Immutable Map"==d(t)&&e.get(n.list.key)&&t.get(n.list.key)?e.get(n.list.key)===t.get(n.list.key):A(e,t).similarity>=n.list.mapSimilarityForDiff}));a.length?(a.forEach((function(n){n.operation||"Immutable Map"!=d(n.value)&&"Immutable List"!=d(n.value)||P(e.get(n.index[0]),t.get(n.index[1]))||i(e.get(n.index[0]),t.get(n.index[1]),r.push(n.index[0]),o,i)})),x.add({path:r,type:o,operation:"myers-diff",steps:function(e){for(var t=[],n=0;n<e.length;n++){var r,o=e[n],i=e[n+1];"del"==(null==o?void 0:o.operation)&&"add"==(null==i?void 0:i.operation)&&o.index[1]==i.index[1]?(t.push(["update",o.index[0],i.value]),n++):null!=o&&o.operation&&(i=[o.operation,o.index[0]],"add"==(null==o?void 0:o.operation)?("add"==(null===(r=t[t.length-1])||void 0===r?void 0:r[0])&&t[t.length-1][1]==o.index[0]?i=t[t.length-1]:t.push(i),i.push(o.value)):"del"==(null==o?void 0:o.operation)&&"del"==(null===(r=t[t.length-1])||void 0===r?void 0:r[0])?(i=t[t.length-1]).push(o.index[0]):t.push(i))}return t}(a)})):(e.length||e.size)&&e.map((function(e,n){P(e,t.get(n))||i(e,t.get(n),r.push(n),o,i)}))},J=function(e,t){return s(e)||s(t)?e===t:o().isImmutable(e)&&o().isImmutable(t)?o().is(e,t):(o().isImmutable(e)&&(e=e.toJS()),o().isImmutable(t)&&(t=t.toJS()),n.unImmutableData.equal(e,t))};function T(e,t){var r,o,i,a,u=0,l=0,f=0;return t=L(e,t,(function(e,t){return s(e)||s(t)?e===t:"Immutable Map"==d(e)&&"Immutable Map"==d(t)&&e.get(n.list.key)&&t.get(n.list.key)?e.get(n.list.key)===t.get(n.list.key):A(e,t).similarity>=n.list.mapSimilarityForDiff})),{unchanged:f+=(e=e,a=i=o=r=0,(t=t).length?t.forEach((function(e){e.operation?"add"==e.operation?o++:"del"==e.operation?i+=m(e.value):"update"==e.operation&&(a+=m(e.value)):r+=m(e.value)})):r=m(e),e=Math.round(r/(o+i+a+r)*100)/100,e={unchanged:r,add:o,del:i,update:a,changed:0,similarity:e}).unchanged,add:u+=e.add,del:l+=e.del,update:0,changed:u+l+0,similarity:Math.round(f/(u+l+0+f)*100)/100}}function A(e,t){return r=t,S=v=g=b=0,c(n=e)?(n=o().fromJS(n),r=o().fromJS(r),d(n)==d(r)?((i=u.get(n,r))||("Immutable Map"==d(n)?(a=n,y=s=f=l=0,h={},r.map((function(e,t){p(e)||(h[t]=e,p(a.get(t))&&f++)})),a.map((function(e,t){p(e)||(p(h[t])?c(e)?s+=m(e):s++:o().is(e,h[t])?y+=m(e):(t=A(e,h[t]),l+=t.update,s+=t.del,f+=t.add,y+=t.unchanged))})),i={unchanged:y,add:f,del:s,update:l,changed:f+s+l,similarity:Math.round(y/(f+s+l+y)*100)/100}):"Immutable List"==d(n)&&(i=T(n,r)),u.set(n,r,i)),b+=i.update,g+=i.add,v+=i.del,S+=i.unchanged):b+=m(n)):n===r?S+=1:b+=1,{unchanged:S,add:g,del:v,update:b,changed:g+v+b,similarity:Math.round(S/(g+v+b+S)*100)/100};var n,r,i,a,l,f,s,y,h,b,g,v,S}function P(e,t){return o().is(e,t)}function E(e,t,n,r,i){if(c(e)&&c(t)){if(e=o().fromJS(e),t=o().fromJS(t),o().is(e,t))return;var a=d(e);if(a==d(t))return void("Immutable List"==a?M(e,t,n,r.push(d(e,!0)),i):"Immutable Map"==a&&(u=e,l=t,f=n,s=r.push(d(e,!0)),m=i,l.map((function(e,t){p(e)||p(u.get(t))&&x.add({path:f.push(t),operation:"add",type:s,value:{from:void 0,to:y(l.get(t))}})})),u.map((function(e,t){var n=l.get(t+="");p(e)||J(e,n)||(p(n)?x.add({path:f.push(t),operation:"delete",type:s.push(d(e,!0)),value:{from:y(e),to:void 0}}):m(e,n,f.push(t),s,m))}))))}var u,l,f,s,m;J(e,t)||x.add({path:n,type:r.push(d(e,!0)),operation:"update",value:{from:y(e),to:y(t)}})}function D(e,t){var r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};return e=o().fromJS(e),x.init(e),n.set(r),E(e,o().fromJS(t),o().List([]),o().List([]),E),x.getLog()}function _(e){return(_="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}r=void 0,i=function(e){var t={diff:D,similarity:A,log:x};e.default=t,e.diff=D,e.similarity=A,e.log=x},"object"===("undefined"==typeof exports?"undefined":_(exports))?i(exports):"function"==typeof define&&e.amdO?define(["exports"],i):i((r="undefined"!=typeof globalThis?globalThis:r||self).TreeDiff={})})();