/*! For license information please see index.js.LICENSE.txt */
(()=>{"use strict";var e={amdO:{},n:t=>{var r=t&&t.__esModule?()=>t.default:()=>t;return e.d(r,{a:r}),r},d:(t,r)=>{for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}};function t(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}e.r({});const r=new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),t(this,"unImmutableData",{equal:function(e,t){return e===t},copy:function(e){return e}}),t(this,"global",{maxDepth:20,ignore:null,copyIfDiff:null,listKey:"_id",listItemSimiliarity:.6})}var r;return(r=[{key:"set",value:function(e){this.global.maxDepth=(e.maxDepth?parseInt(e.maxDepth):20)||20,this.global.listKey=e.listKey||"_id",this.global.listItemSimiliarity=Math.max(e.listItemSimiliarity,.1)||.6,this.global.copyAllIfDiff=e.copyAllIfDiff,this.global.ignore=e.ignore}}])&&function(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}(e.prototype,r),e}());var n=require("immutable"),o=e.n(n),i=require("kind-of"),a=e.n(i);n=require("isobject"),i=e.n(n);const u=new(function(){function e(){var t,r;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),r={},(t="cache")in this?Object.defineProperty(this,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):this[t]=r}var t;return(t=[{key:"set",value:function(e,t,r){o().isImmutable(e)&&o().isImmutable(t)?this.cache[o().hash(e)+"_"+o().hash(t)]=r:o().isImmutable(e)&&void 0!==t&&(this.cache[o().hash(e)]=t)}},{key:"get",value:function(e,t){return o().isImmutable(e)&&o().isImmutable(t)?this.cache[o().hash(e)+"_"+o().hash(t)]:o().isImmutable(e)&&void 0===t?this.cache[o().hash(e)]:null}},{key:"size",value:function(){return Object.getOwnPropertyNames(this.cache).length}},{key:"clear",value:function(){this.cache={}}}])&&function(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}(e.prototype,t),e}());function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var f=Object.prototype.toString;function c(e){return o().isImmutable(e)}function s(e){return"object"===l(e)&&(o().isImmutable(e)||Array.isArray(e)||function(e){if(!e||"object"!==l(e)||"[object Object]"!==f.call(e))return!1;if(null===(e=Object.getPrototypeOf(e)))return!0;for(var t=e,r=Object.getPrototypeOf(e);null!==r;)t=r,r=Object.getPrototypeOf(t);return t===e}(e))}function p(e){return s(e)?o().fromJS(e).toJS():e}function m(e){return"string"==typeof e||"number"==typeof e||"symbol"===l(e)||"boolean"==typeof e||null==e}function y(e,t){var r=1<arguments.length&&void 0!==t&&t;if(o().isImmutable(e)){if(t=e.toString(),!r)return"Immutable "+t.split(" ")[0];if(0==t.indexOf("Map"))return"object";if(0==t.indexOf("List"))return"array";e=e.toJS()}return a()(e)}i();var h=function(e){return void 0===e};function d(e){var t=0;return s(e)?(e=o().fromJS(e),u.get(e)?u.get(e):(e.map((function(e){t+=d(e)})),t&&u.set(e,t),t)):1}var g=o().fromJS,b=function(e){if(t=e,("object"===("undefined"==typeof HTMLElement?"undefined":l(HTMLElement))?t instanceof HTMLElement:t&&"object"===l(t)&&(1===t.nodeType||9===t.nodeType)&&"string"==typeof t.nodeName)||m(e))return e;if(o().isImmutable(e))return e;var t=o().fromJS(e);return o().isImmutable(t)?t:r.unImmutableData.copy(e)};function v(e){return(v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var S=function(e){return!(!(t=e)||"object"!==v(t)||(t=e,"[object RegExp]"===(e=Object.prototype.toString.call(t))||"[object Date]"===e||function(e){return e.$$typeof===I}(t)));var t},I="function"==typeof Symbol&&Symbol.for?Symbol.for("react.element"):60103;function j(e,t){return!1!==t.clone&&t.isMergeableObject(e)?x(Array.isArray(e)?[]:{},e,t):e}function O(e){return Object.keys(e).concat((t=e,Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t).filter((function(e){return t.propertyIsEnumerable(e)})):[]));var t}function L(e,t){try{return t in e}catch(e){return!1}}function x(e,t,r){return(r=r||{}).isMergeableObject=r.isMergeableObject||S,"object"===v(e)&&null!==e&&e!==t&&s(t)&&s(e)?function(e,t,r){var n=e||{};return r.isMergeableObject(e)&&O(e).forEach((function(t){n[t]=j(e[t],r)})),O(t).forEach((function(o){var i,a;(!L(i=e,a=o)||Object.hasOwnProperty.call(i,a)&&Object.propertyIsEnumerable.call(i,a))&&(L(e,o)&&r.isMergeableObject(t[o])?n[o]=(i=o,((a=r).customMerge&&"function"==typeof(i=a.customMerge(i))?i:x)(e[o],t[o],r)):n[o]=j(t[o],r))})),n}(e,t,r):t}function J(e){return function(e){if(Array.isArray(e))return w(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return w(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(r="Object"===r&&e.constructor?e.constructor.name:r)||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?w(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function w(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function A(e){return(A="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function k(e){return(k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function M(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function D(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function E(e,t,r){return t&&D(e.prototype,t),r&&D(e,r),e}function P(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var T=new(function(){function e(){M(this,e),P(this,"mergeLog",{}),P(this,"log",[]),P(this,"cache",[])}return E(e,[{key:"push",value:function(e){switch(e.operation){case"add":case"update":case"del":return void(this.mergeLog[e.operation]=function(e,t,r){var n=0<arguments.length&&void 0!==e?e:{},i=(t=1<arguments.length?t:void 0,2<arguments.length&&void 0!==r?r:["add","update","del"]);if("object"!=A(n))throw new Error("请输入Object");return(t=Array.isArray(t)?t:[t]).map((function(e){if(i.includes(e.operation))for(var t,r=e.path,a=(r=o().isImmutable(r)?r.toArray():r,e.type),u=(a=o().isImmutable(a)?a.toArray():a,n),l=0;l<r.length;l++){if(t=r[l],"del"==e.operation&&1==r.length){u[t]=null;break}if("del"==e.operation&&l==r.length-1){void 0!==u[t]?Array.isArray(u[t])?u[t].push(null):u[t]=[u[t],null]:u[t]=null;break}var f=a[l+1];("object"==f||"array"==f)&&l<r.length-1?(u[t]||(u[t]={}),u=u[t]):u[t]=o().isImmutable(e.value.to)?e.value.to.toJS():e.value.to}})),n}(this.mergeLog[e.operation],e,[e.operation]));case"diff":return void this.log.push([e.operation,e.path,e.steps]);case"init":return void this.log.push([e.operation,e.value]);case"replace":return void this.log.push([e.operation,e.path,e.value.to])}}},{key:"remove",value:function(e){for(var t in this.mergeLog)!1===e([""+t,this.mergeLog[t]])&&delete this.mergeLog[t];this.log=this.log.filter((function(t){return!1!==e(t)}))}},{key:"update",value:function(e){for(var t in this.mergeLog)!1===e(this.mergeLog[t])&&delete this.mergeLog[t];this.log=this.log.map((function(t){return e(t)||t}))}},{key:"getDiff",value:function(){return this.exportLog().filter((function(e){return"init"!=e[0]}))}},{key:"exportLog",value:function(){if(this.cache.length)return this.cache;var e=this.log.filter((function(e){return"init"!=e[0]}));return this.mergeLog.del&&e.unshift(["del",this.mergeLog.del]),this.mergeLog.add&&e.unshift(["add",this.mergeLog.add]),this.mergeLog.update&&e.unshift(["update",this.mergeLog.update]),this.mergeLog.merge&&e.unshift(["merge",this.mergeLog.merge]),e.unshift(this.log[0]),this.cache=e}},{key:"init",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:[];this.mergeLog={},this.cache=[],this.log=[],Array.isArray(e)&&(this.log=e)}}]),e}());function K(){return JSON.stringify(this.map((function(e){return s(e)?o().fromJS(e).toJS():e})))}function q(){return o().fromJS(this).toJS()}function C(e,t){if(!Array.isArray(e))throw new Error("请输入快照");var r;T.init(e);for(var n,i=[],a=0;a<e.length;a++)"init"==(n=e[a])[0]&&(i.push(r=[]),n=o().fromJS(n).toJS(),s(t)?x(t,n[1]):t=n[1],n[1]=t),Array.isArray(r)&&r.push(n);return i.map((function(e){var t;"object"==k(e[0][1])&&(t=e[0][1],function(e,t){t.map((function(t){return o().isImmutable(t)?t=o().toJS(t):o().isImmutable(t[1])&&(t[1]=o().toJS(t[1])),"add"==t[0]||"del"==t[0]||"update"==t[0]||"replace"==t[0]?function(e,t){if("object"!=A(e))throw new Error("请输入Object");return"add"==t[0]||"update"==t[0]?x(e,t[1]):("del"==t[0]?function e(t,r,n){for(var i in n=n||o().List([]),t)"object"!=A(t[i])||Array.isArray(t[i])?Array.isArray(t[i])?t[i].forEach((function(e){return r(n.push(i).push(e))})):r(n.push(i).push(t[i])):t[i]?e(t[i],r,n.push(i)):r(n.push(i))}(t[1],(function(t){var r=e;t.map((function(e,n){n<(t.length||t.size)-1?r=r[e]:delete r[e]}))})):"replace"==t[0]&&(r=e,(n=t[1]).map((function(e,t){t<n.length-1&&(r=r[e])})),r[n[n.length-1]]=t[2]),e);var r,n}(e,t):"diff"==t[0]?function(e,t){var r=1<arguments.length&&void 0!==t?t:[],n=0,o=(t=r[1],e);t.map((function(e){o=o[e]})),r[2].forEach((function(e){if("add"==e[0])o.splice.apply(o,[e[1]+n,0].concat(J(e.slice(2)))),n+=e.length-2;else if("del"==e[0])for(var t=1;t<e.length;t++)o.splice(e[t]+n,1),n--;else"update"==e[0]&&(o[e[1]+n]=e[2])}))}(e,t):void 0}))}(t=o().isImmutable(t)?t.toJS():t,o().fromJS(e).toJS()))})),t}(n=function(){function e(){M(this,e),P(this,"proto",null),T.init()}return E(e,[{key:"replay",value:function(e,t){return this.proto=C(e,t),this}},{key:"rollback",value:function(e,t){var r=this;return this.reverseLog(e,t).exportLog((function(e){r.replay(e,t)})),this}},{key:"reverseLog",value:function(e,t){if(!Array.isArray(e))throw new Error("请输入快照");var r,n;T.init(e),s(t)?x(t,C(e)):t=C(e);for(var o=0;o<e.length;o++)if("init"==(n=e[o])[0]){r=n[1];break}return B(t,r),this}},{key:"exportLog",value:function(e){var t=T.exportLog();return Object.getPrototypeOf(t).toString=K,Object.getPrototypeOf(t).toJS=q,"function"==typeof e&&e(t),this}}]),e}()).prototype.getDiff=function(e){var t=T.getDiff();return Object.getPrototypeOf(t).toString=K,Object.getPrototypeOf(t).toJS=q,"function"==typeof e&&e(t),this},n.prototype.init=function(e){T.init(),T.push({operation:"init",value:e})},n.prototype.add=function(e){"function"==typeof r.global.ignore&&r.global.ignore(e.path.toJS(),e.type.last())||T.push(e)};const _=new n;function z(e,t){for(var r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:function(e,t){return e===t},n=e.size,o=t.size,i={1:0},a={0:{1:0}},u=0;u<=n+o;u++){for(var l={},f=-u;f<=u;f+=2){for(var c=f==-u||f!=u&&i[f+1]>i[f-1],s=c?f+1:f-1,p=i[s],m=p=c?p:p+1,y=p-f;m<n&&y<o&&r(e.get(m),t.get(y));)m++,y++;if(i[f]=m,(l[f]=m)==n&&y==o)return a[u]=l,function(e,t,r){var n=[],o=0;e.forEach((function(e,i){var a=e[0],u=e[1],l=e[2],f=a;if(0===i&&0!==a)for(var c=0;c<a;c++)n.push({operation:"",value:t.get(c),index:[c,o]}),o++;u-a==1?(n.push({operation:"del",value:t.get(a),index:[a,o]}),f=u):(n.push({operation:"add",value:r.get(o),index:[a,o]}),o++);for(var s=0;s<l-f;s++)n.push({operation:"",value:t.get(f+s),index:[f+s,o]}),o++}));for(var i,a=null,u=null,l=[],f=0;f<n.length;f++)a=n[f],u=n[f+1],"del"==(null===(i=a)||void 0===i?void 0:i.operation)&&"add"==(null===(i=u)||void 0===i?void 0:i.operation)&&a.index[1]==u.index[1]?(l.push({operation:"update",value:u.value,index:a.index}),f++):l.push(a);return l}(function(e,t,r,n){for(var o=[],i={x:t,y:r};0<n;n--){var a=e[n],u=e[n-1],l=i.x-i.y,f=a[l],c=(a=(u=u[a=(c=l==-n||l!=n&&u[1+l]>u[l-1])?1+l:l-1])-a,c?u:u+1);o.unshift([u,c,f]),i.x=u,i.y=a}return o}(a,n,o,u),e,t)}a[u]=l}}var H=function(e,t,n,o,i){var a=z(e,t,(function(e,t){return m(e)||m(t)?e===t:(o=n,r.global.maxDepth<=o.size?R(e,t):"Immutable Map"==y(e)&&"Immutable Map"==y(t)&&e.get(r.listKey)&&t.get(r.listKey)?e.get(r.listKey)===t.get(r.listKey):$(e,t).similarity>=r.global.listItemSimiliarity);var o}));a.length?(a.forEach((function(r){if(!(r.operation||"Immutable Map"!=y(r.value)&&"Immutable List"!=y(r.value)||R(e.get(r.index[0]),t.get(r.index[1]))))return i(e.get(r.index[0]),t.get(r.index[1]),n.push(r.index[0]),o,i)})),_.add({path:n,type:o,operation:"diff",steps:function(e){for(var t,r,n=null,o=[],i=0;i<e.length;i++)null!==(n=e[i])&&void 0!==n&&n.operation&&(r=[n.operation,n.index[0]],"add"==(null==n?void 0:n.operation)?("add"==(null===(t=o[o.length-1])||void 0===t?void 0:t[0])&&o[o.length-1][1]==n.index[0]?r=o[o.length-1]:o.push(r),r.push(n.value)):"del"==(null==n?void 0:n.operation)?"del"==(null===(t=o[o.length-1])||void 0===t?void 0:t[0])?(r=o[o.length-1]).push(n.index[0]):o.push(r):(r.push(n.value),o.push(r)));return o}(a)})):(e.length||e.size)&&e.map((function(e,r){if(!R(e,t.get(r)))return console.log(p(e),"<<<<++++++++",p(t.get(r))),i(e,t.get(r),n.push(r),o,i)}))},N=function(e,t){return m(e)||m(t)?e===t:o().isImmutable(e)&&o().isImmutable(t)?o().is(e,t):s(e)&&s(t)?o().is(o().fromJS(e),o().fromJS(t)):(o().isImmutable(e)&&(e=e.toJS()),o().isImmutable(t)&&(t=t.toJS()),"function"==typeof r.unImmutableData.equal?r.unImmutableData.equal(e,t):o().is(e,t))};function $(e,t){var n=0,i=0;if(s(e)){if(e=o().fromJS(e),t=o().fromJS(t),y(e)==y(t)){var a=u.get(e,t);if(!a){if("Immutable Map"==y(e))return function(e,t){var r=0,n=0,i=0,a=0,l={};t.map((function(t,r){h(t)||(l[r]=t,h(e.get(r))&&n++)})),e.map((function(e,t){h(e)||(h(l[t])?s(e)?i+=d(e):i++:o().is(e,l[t])?a+=d(e):(t=$(e,l[t]),r+=t.update,i+=t.del,n+=t.add,a+=t.unchanged))}));var f={unchanged:a,add:n,del:i,update:r,similarity:Math.round(a/(n+i+r+a)*100)/100};return u.set(e,t,f),f}(e,t);if("Immutable List"==y(e))return function(e,t){var n,o,i,a,l=0,f=0,c=0,s=0,p=z(e,t,(function(e,t){return m(e)||m(t)?e===t:"Immutable Map"==y(e)&&"Immutable Map"==y(t)&&e.get(r.listKey)&&t.get(r.listKey)?e.get(r.listKey)===t.get(r.listKey):$(e,t).similarity>=r.global.listItemSimiliarity})),h={unchanged:s+=(h=e,a=i=o=n=0,(p=p).length?p.forEach((function(e){e.operation?"add"==e.operation?o++:"del"==e.operation?i+=d(e.value):"update"==e.operation&&(a+=d(e.value)):n+=d(e.value)})):n=d(h),h=Math.round(n/(o+i+a+n)*100)/100,h={unchanged:n,add:o,del:i,update:a,similarity:h}).unchanged,add:f+=h.add,del:c+=h.del,update:l+=h.update,similarity:Math.round(s/(f+c+l+s)*100)/100};return u.set(e,t,h),h}(e,t)}return a}n+=d(e)}else e===t?i+=1:n+=1;return i={unchanged:i,add:0,del:0,update:n,similarity:Math.round(i/(n+i)*100)/100},u.set(e,t,i),i}function R(e,t){return o().is(e,t)}function U(e,t,n,i,a){if(m=e,d=t,g=n,!(r.global.maxDepth<=g.size)&&("function"!=typeof r.global.copyIfDiff||!r.global.copyIfDiff(g.toJS(),o().isImmutable(m)?m.toJS():m))&&s(m)&&s(d)){if(e=o().fromJS(e),t=o().fromJS(t),o().is(e,t))return;if((d=y(e))==y(t)){if("Immutable List"==d)return H(e,t,n,i.push(y(e,!0)),a);if("Immutable Map"==d)return u=e,l=t,f=n,c=i.push(y(e,!0)),p=a,l.map((function(e,t){h(e)||h(u.get(t))&&_.add({path:f.push(t),operation:"add",type:c,value:{from:void 0,to:b(l.get(t))}})})),void u.map((function(e,t){var r=l.get(t+="");if(!h(e)&&!N(e,r)){if(!h(r))return p(e,r,f.push(t),c,p);_.add({path:f.push(t),operation:"del",type:c.push(y(e,!0)),value:{from:b(e),to:void 0}})}}))}}var u,l,f,c,p,m,d,g;N(e,t)||_.add({path:n,type:i.push(y(e,!0)),operation:s(e)&&s(t)?"replace":"update",value:{from:b(e),to:b(t)}})}function B(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};return e=o().fromJS(e),_.init(e),r.set(n),U(e,o().fromJS(t),o().List([]),o().List([]),U),_.compare=B,_}function F(e){return(F="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}i=void 0,n=function(e){var t={compare:B,similarity:$,getDiff:_.getDiff,replay:_.replay,exportLog:_.exportLog,clearCache:u.clear,reverseLog:_.reverseLog,rollback:_.rollback,deepClone:b,deepEqual:N,isImmutableStructure:s,isImmutable:c,isPrimitive:m,toImmutable:g};e.default=t,e.compare=B,e.similarity=$,e.getDiff=_.getDiff,e.replay=_.replay,e.exportLog=_.exportLog,e.clearCache=u.clear,e.reverseLog=_.reverseLog,e.rollback=_.rollback,e.deepClone=b,e.deepEqual=N,e.isImmutableStructure=s,e.isImmutable=c,e.isPrimitive=m,e.toImmutable=g},"object"===("undefined"==typeof exports?"undefined":F(exports))?n(exports):"function"==typeof define&&e.amdO?define(["exports"],n):n((i="undefined"!=typeof globalThis?globalThis:i||self).TreeDiff={})})();