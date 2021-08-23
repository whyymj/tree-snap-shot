/*! For license information please see index.js.LICENSE.txt */
(()=>{"use strict";var e={amdO:{},n:t=>{var n=t&&t.__esModule?()=>t.default:()=>t;return e.d(n,{a:n}),n},d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}};function t(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}e.r({});const n=new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),t(this,"unImmutableData",{equal:function(e,t){return e===t},copy:function(e){return e}}),t(this,"list",{key:"_id",mapSimilarityForDiff:.6})}var n;return(n=[{key:"set",value:function(e){}}])&&function(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(e.prototype,n),e}());var r=require("immutable"),o=e.n(r),i=require("kind-of"),a=e.n(i);r=require("isobject"),i=e.n(r);const u=new(function(){function e(){var t,n;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),n={},(t="cache")in this?Object.defineProperty(this,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):this[t]=n}var t;return(t=[{key:"set",value:function(e,t,n){o().isImmutable(e)&&o().isImmutable(t)?this.cache[o().hash(e)+"_"+o().hash(t)]=n:o().isImmutable(e)&&void 0!==t&&(this.cache[o().hash(e)]=t)}},{key:"get",value:function(e,t){return o().isImmutable(e)&&o().isImmutable(t)?(console.log("read cache",this.cache[o().hash(e)+"_"+o().hash(t)]),this.cache[o().hash(e)+"_"+o().hash(t)]):o().isImmutable(e)&&void 0===t?this.cache[o().hash(e)]:null}},{key:"clear",value:function(){this.cache={}}}])&&function(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(e.prototype,t),e}());function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var f=Object.prototype.toString,c=function(e){return"object"===l(e)&&(o().isImmutable(e)||Array.isArray(e)||function(e){if(!e||"object"!==l(e)||"[object Object]"!==f.call(e))return!1;if(null===(e=Object.getPrototypeOf(e)))return!0;for(var t=e,n=Object.getPrototypeOf(e);null!==n;)t=n,n=Object.getPrototypeOf(t);return t===e}(e))};function s(e){return"string"==typeof e||"number"==typeof e||"symbol"===l(e)||"boolean"==typeof e||null==e}function p(e,t){var n=1<arguments.length&&void 0!==t&&t;if(o().isImmutable(e)){if(t=e.toString(),!n)return"Immutable "+t.split(" ")[0];if(0==t.indexOf("Map"))return"object";if(0==t.indexOf("List"))return"array";e=e.toJS()}return a()(e)}i();var y=function(e){return null==e};function m(e){var t=0;return c(e)?(e=o().fromJS(e),u.get(e)?u.get(e):(e.map((function(e){t+=m(e)})),t&&u.set(e,t),t)):1}var d=function(e){if(function(e){return"object"===("undefined"==typeof HTMLElement?"undefined":l(HTMLElement))?e instanceof HTMLElement:e&&"object"===l(e)&&(1===e.nodeType||9===e.nodeType)&&"string"==typeof e.nodeName}(e)||s(e))return e;if(o().isImmutable(e))return e;var t=o().fromJS(e);return o().isImmutable(t)?t:n.unImmutableData.copy(e)};function h(e){return(h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var g=function(e){return!(!(t=e)||"object"!==h(t)||(t=e,"[object RegExp]"===(e=Object.prototype.toString.call(t))||"[object Date]"===e||function(e){return e.$$typeof===b}(t)));var t},b="function"==typeof Symbol&&Symbol.for?Symbol.for("react.element"):60103;function v(e,t){return!1!==t.clone&&t.isMergeableObject(e)?O(Array.isArray(e)?[]:{},e,t):e}function S(e){return Object.keys(e).concat((t=e,Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t).filter((function(e){return t.propertyIsEnumerable(e)})):[]));var t}function j(e,t){try{return t in e}catch(e){return!1}}function O(e,t,n){return(n=n||{}).isMergeableObject=n.isMergeableObject||g,function(e,t,n){var r=e||{};return n.isMergeableObject(e)&&S(e).forEach((function(t){r[t]=v(e[t],n)})),S(t).forEach((function(o){var i,a;(!j(i=e,a=o)||Object.hasOwnProperty.call(i,a)&&Object.propertyIsEnumerable.call(i,a))&&(j(e,o)&&n.isMergeableObject(t[o])?r[o]=(i=o,((a=n).customMerge&&"function"==typeof(i=a.customMerge(i))?i:O)(e[o],t[o],n)):r[o]=v(t[o],n))})),r}(e,t,n)}function I(e){return function(e){if(Array.isArray(e))return L(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return L(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(n="Object"===n&&e.constructor?e.constructor.name:n)||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?L(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function L(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function x(e){return(x="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function w(e){return(w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function k(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function M(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function A(e,t,n){return t&&M(e.prototype,t),n&&M(e,n),e}function J(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var E=new(function(){function e(){k(this,e),J(this,"mergeLog",{}),J(this,"log",[]),J(this,"cache",[])}return A(e,[{key:"push",value:function(e){switch(console.log(o().fromJS(this.log).toJS(),"<<<<<<<<<<<",o().fromJS(this.mergeLog).toJS()),e.operation){case"add":case"update":case"del":return void(this.mergeLog[e.operation]=function(e,t,n){var r=0<arguments.length&&void 0!==e?e:{},i=(t=1<arguments.length?t:void 0,2<arguments.length&&void 0!==n?n:["add","update","del"]);if("object"!=x(r))throw new Error("请输入Object");return(t=Array.isArray(t)?t:[t]).map((function(e){if(i.includes(e.operation))for(var t,n=e.path,a=(n=o().isImmutable(n)?n.toArray():n,e.type),u=(a=o().isImmutable(a)?a.toArray():a,r),l=0;l<n.length;l++){if(t=n[l],"del"==e.operation&&l==n.length-2){void 0!==u[t]?Array.isArray(u[t])?u[t].push(n[n.length-1]):u[t]=[u[t],n[n.length-1]]:u[t]=n[n.length-1];break}var f=a[l+1];"object"==f||"array"==f?(u[t]||(u[t]={}),u=u[t]):u[t]=o().isImmutable(e.value.to)?e.value.to.toJS():e.value.to}})),r}(this.mergeLog[e.operation],e,[e.operation]));case"myers-diff":return void this.log.push([e.operation,e.path,e.steps]);case"init":return void this.log.push([e.operation,e.value])}}},{key:"remove",value:function(e){for(var t in this.mergeLog)!1===e([""+t,this.mergeLog[t]])&&delete this.mergeLog[t];this.log=this.log.filter((function(t){return!1!==e(t)}))}},{key:"update",value:function(e){for(var t in this.mergeLog)!1===e(this.mergeLog[t])&&delete this.mergeLog[t];this.log=this.log.map((function(t){return e(t)||t}))}},{key:"getDiff",value:function(){return this.exportLog().filter((function(e){return"init"!=e[0]}))}},{key:"exportLog",value:function(){if(this.cache.length)return this.cache;var e=this.log.filter((function(e){return"init"!=e[0]}));return this.mergeLog.del&&e.unshift(["del",this.mergeLog.del]),this.mergeLog.add&&e.unshift(["add",this.mergeLog.add]),this.mergeLog.update&&e.unshift(["update",this.mergeLog.update]),e.unshift(this.log[0]),this.cache=e}},{key:"init",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:[];Array.isArray(e)&&(this.log=e,this.mergeLog={},this.cache=e)}}]),e}());function P(){return JSON.stringify(this.map((function(e){return o().fromJS(e).toJS()})))}(r=function(){function e(){k(this,e),E.init()}return A(e,[{key:"replay",value:function(e,t){if(Array.isArray(t)?E.init(t):t=E.exportLog(),!t[0])throw new Error("初始化出错了！请输入有效snap-shot");if("init"==t[0][0]&&"object"==w(t[0][1])){var n=t[0][1];n=function(e,t){return t.map((function(t){"add"==t[0]||"del"==t[0]||"update"==t[0]?function(e,t){if("object"!=x(e))throw new Error("请输入Object");"add"==t[0]||"update"==t[0]?O(e,t[1]):"del"==t[0]&&function e(t,n,r){for(var i in r=r||o().List([]),t){if("object"==x(t[i])&&!Array.isArray(t[i]))return e(t[i],n,r.push(i));Array.isArray(t[i])?t[i].forEach((function(e){n(r.push(i).push(e))})):n(r.push(i).push(t[i]))}}(t[1],(function(t){var n=e;t.map((function(e,r){r<(t.length||t.size)-1?n=n[e]:delete n[e]}))}))}(e,t):"myers-diff"==t[0]&&function(e,t){var n=1<arguments.length&&void 0!==t?t:[],r=0,o=(t=n[1],e);t.map((function(e){o=o[e]})),n[2].forEach((function(e){if("add"==e[0])o.splice.apply(o,[e[1]+r,0].concat(I(e.slice(2)))),r+=e.length-2;else if("del"==e[0])for(var t=1;t<e.length;t++)o.splice(e[t]+r,1),r--;else"update"==e[0]&&(o[e[1]+r]=e[2])}))}(e,t)})),e}(n=o().isImmutable(n)?n.toJS():n,o().fromJS(t).toJS()),"function"==typeof e&&e(n)}else{t=t[0][0];try{throw new Error("初始化出错了！log[0]="+JSON.stringify(t))}catch(e){throw new Error("初始化出错了！log[0]=",t)}}return this}},{key:"getDiff",value:function(e){var t=E.getDiff();return Object.getPrototypeOf(t).toString=P,"function"==typeof e&&e(t),this}},{key:"exportLog",value:function(e){var t=E.exportLog();return Object.getPrototypeOf(t).toString=P,"function"==typeof e&&e(t),this}}]),e}()).prototype.init=function(e){E.init(),E.push({operation:"init",value:e})},r.prototype.add=function(e){E.push(e)};const D=new r;function T(e,t){for(var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:function(e,t){return e===t},r=e.size,o=t.size,i={1:0},a={0:{1:0}},u=0;u<=r+o;u++){for(var l={},f=-u;f<=u;f+=2){for(var c=f==-u||f!=u&&i[f+1]>i[f-1],s=c?f+1:f-1,p=i[s],y=p=c?p:p+1,m=p-f;y<r&&m<o&&n(e.get(y),t.get(m));)y++,m++;if(i[f]=y,(l[f]=y)==r&&m==o)return a[u]=l,function(e,t,n){var r=[],o=0;e.forEach((function(e,i){var a=e[0],u=e[1],l=e[2],f=a;if(0===i&&0!==a)for(var c=0;c<a;c++)r.push({operation:"",value:t.get(c),index:[c,o]}),o++;u-a==1?(r.push({operation:"del",value:t.get(a),index:[a,o]}),f=u):(r.push({operation:"add",value:n.get(o),index:[a,o]}),o++);for(var s=0;s<l-f;s++)r.push({operation:"",value:t.get(f+s),index:[f+s,o]}),o++}));for(var i,a=null,u=null,l=[],f=0;f<r.length;f++)a=r[f],u=r[f+1],"del"==(null===(i=a)||void 0===i?void 0:i.operation)&&"add"==(null===(i=u)||void 0===i?void 0:i.operation)&&a.index[1]==u.index[1]?(l.push({operation:"update",value:u.value,index:a.index}),f++):l.push(a);return l}(function(e,t,n,r){for(var o=[],i={x:t,y:n};0<r;r--){var a=e[r],u=e[r-1],l=i.x-i.y,f=a[l],c=(a=(u=u[a=(c=l==-r||l!=r&&u[1+l]>u[l-1])?1+l:l-1])-a,c?u:u+1);o.unshift([u,c,f]),i.x=u,i.y=a}return o}(a,r,o,u),e,t)}a[u]=l}}var _=function(e,t,r,o,i){var a=T(e,t,(function(e,t){return s(e)||s(t)?e===t:"Immutable Map"==p(e)&&"Immutable Map"==p(t)&&e.get(n.list.key)&&t.get(n.list.key)?e.get(n.list.key)===t.get(n.list.key):C(e,t).similarity>=n.list.mapSimilarityForDiff}));a.length?(a.forEach((function(n){n.operation||"Immutable Map"!=p(n.value)&&"Immutable List"!=p(n.value)||F(e.get(n.index[0]),t.get(n.index[1]))||i(e.get(n.index[0]),t.get(n.index[1]),r.push(n.index[0]),o,i)})),D.add({path:r,type:o,operation:"myers-diff",steps:function(e){for(var t,n,r=null,o=[],i=0;i<e.length;i++)null!==(r=e[i])&&void 0!==r&&r.operation&&(n=[r.operation,r.index[0]],"add"==(null==r?void 0:r.operation)?("add"==(null===(t=o[o.length-1])||void 0===t?void 0:t[0])&&o[o.length-1][1]==r.index[0]?n=o[o.length-1]:o.push(n),n.push(r.value)):"del"==(null==r?void 0:r.operation)?"del"==(null===(t=o[o.length-1])||void 0===t?void 0:t[0])?(n=o[o.length-1]).push(r.index[0]):o.push(n):(n.push(r.value),o.push(n)));return o}(a)})):(e.length||e.size)&&e.map((function(e,n){F(e,t.get(n))||i(e,t.get(n),r.push(n),o,i)}))},q=function(e,t){return s(e)||s(t)?e===t:o().isImmutable(e)&&o().isImmutable(t)?o().is(e,t):(o().isImmutable(e)&&(e=e.toJS()),o().isImmutable(t)&&(t=t.toJS()),n.unImmutableData.equal(e,t))};function z(e,t){var r,o,i,a,u=0,l=0,f=0,c=0;return t=T(e,t,(function(e,t){return s(e)||s(t)?e===t:"Immutable Map"==p(e)&&"Immutable Map"==p(t)&&e.get(n.list.key)&&t.get(n.list.key)?e.get(n.list.key)===t.get(n.list.key):C(e,t).similarity>=n.list.mapSimilarityForDiff})),{unchanged:c+=(e=e,a=i=o=r=0,(t=t).length?t.forEach((function(e){e.operation?"add"==e.operation?o++:"del"==e.operation?i+=m(e.value):"update"==e.operation&&(a+=m(e.value)):r+=m(e.value)})):r=m(e),e=Math.round(r/(o+i+a+r)*100)/100,e={unchanged:r,add:o,del:i,update:a,similarity:e}).unchanged,add:l+=e.add,del:f+=e.del,update:u+=e.update,similarity:Math.round(c/(l+f+u+c)*100)/100}}function C(e,t){return r=t,S=v=b=g=0,c(n=e)?(n=o().fromJS(n),r=o().fromJS(r),p(n)==p(r)?((i=u.get(n,r))||("Immutable Map"==p(n)?(a=n,d=s=f=l=0,h={},r.map((function(e,t){y(e)||(h[t]=e,y(a.get(t))&&f++)})),a.map((function(e,t){y(e)||(y(h[t])?c(e)?s+=m(e):s++:o().is(e,h[t])?d+=m(e):(t=C(e,h[t]),l+=t.update,s+=t.del,f+=t.add,d+=t.unchanged))})),i={unchanged:d,add:f,del:s,update:l,similarity:Math.round(d/(f+s+l+d)*100)/100}):"Immutable List"==p(n)&&(i=z(n,r)),u.set(n,r,i)),g+=i.update,b+=i.add,v+=i.del,S+=i.unchanged):g+=m(n)):n===r?S+=1:g+=1,{unchanged:S,add:b,del:v,update:g,similarity:Math.round(S/(b+v+g+S)*100)/100};var n,r,i,a,l,f,s,d,h,g,b,v,S}function F(e,t){return o().is(e,t)}function H(e,t,n,r,i){if(c(e)&&c(t)){if(e=o().fromJS(e),t=o().fromJS(t),o().is(e,t))return;var a=p(e);if(a==p(t))return void("Immutable List"==a?_(e,t,n,r.push(p(e,!0)),i):"Immutable Map"==a&&(u=e,l=t,f=n,s=r.push(p(e,!0)),m=i,l.map((function(e,t){y(e)||y(u.get(t))&&D.add({path:f.push(t),operation:"add",type:s,value:{from:void 0,to:d(l.get(t))}})})),u.map((function(e,t){var n=l.get(t+="");y(e)||q(e,n)||(y(n)?D.add({path:f.push(t),operation:"del",type:s.push(p(e,!0)),value:{from:d(e),to:void 0}}):m(e,n,f.push(t),s,m))}))))}var u,l,f,s,m;q(e,t)||D.add({path:n,type:r.push(p(e,!0)),operation:"update",value:{from:d(e),to:d(t)}})}function N(e,t){var r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};return e=o().fromJS(e),D.init(e),n.set(r),H(e,o().fromJS(t),o().List([]),o().List([]),H),D.compare=N,D}function $(e){return($="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}i=void 0,r=function(e){var t={compare:N,similarity:C,getDiff:D.getDiff,replay:D.replay,exportLog:D.exportLog};e.default=t,e.compare=N,e.similarity=C,e.getDiff=D.getDiff,e.replay=D.replay,e.exportLog=D.exportLog},"object"===("undefined"==typeof exports?"undefined":$(exports))?r(exports):"function"==typeof define&&e.amdO?define(["exports"],r):r((i="undefined"!=typeof globalThis?globalThis:i||self).TreeDiff={})})();