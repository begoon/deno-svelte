(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();function M(){}function Oe(t){return!!t&&(typeof t=="object"||typeof t=="function")&&typeof t.then=="function"}function ke(t){return t()}function fe(){return Object.create(null)}function V(t){t.forEach(ke)}function ve(t){return typeof t=="function"}function Z(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function Ne(t){return Object.keys(t).length===0}function v(t,e){t.appendChild(e)}function N(t,e,n){t.insertBefore(e,n||null)}function j(t){t.parentNode&&t.parentNode.removeChild(t)}function ye(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function w(t){return document.createElement(t)}function P(t){return document.createTextNode(t)}function K(){return P(" ")}function T(t,e,n,l){return t.addEventListener(e,n,l),()=>t.removeEventListener(e,n,l)}function y(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function Le(t){return Array.from(t.childNodes)}function $(t,e){e=""+e,t.data!==e&&(t.data=e)}function ae(t,e){t.value=e??""}function de(t,e,n){for(let l=0;l<t.options.length;l+=1){const r=t.options[l];if(r.__value===e){r.selected=!0;return}}(!n||e!==void 0)&&(t.selectedIndex=-1)}function Se(t){const e=t.querySelector(":checked");return e&&e.__value}function F(t,e,n){t.classList[n?"add":"remove"](e)}let W;function I(t){W=t}function Ae(){if(!W)throw new Error("Function called outside component initialization");return W}const D=[],re=[];let G=[];const oe=[],Ce=Promise.resolve();let ie=!1;function Je(){ie||(ie=!0,Ce.then(ue))}function Y(t){G.push(t)}function Me(t){oe.push(t)}const le=new Set;let z=0;function ue(){if(z!==0)return;const t=W;do{try{for(;z<D.length;){const e=D[z];z++,I(e),Ke(e.$$)}}catch(e){throw D.length=0,z=0,e}for(I(null),D.length=0,z=0;re.length;)re.pop()();for(let e=0;e<G.length;e+=1){const n=G[e];le.has(n)||(le.add(n),n())}G.length=0}while(D.length);for(;oe.length;)oe.pop()();ie=!1,le.clear(),I(t)}function Ke(t){if(t.fragment!==null){t.update(),V(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(Y)}}function Pe(t){const e=[],n=[];G.forEach(l=>t.indexOf(l)===-1?e.push(l):n.push(l)),n.forEach(l=>l()),G=e}const X=new Set;let U;function we(){U={r:0,c:[],p:U}}function Ee(){U.r||V(U.c),U=U.p}function R(t,e){t&&t.i&&(X.delete(t),t.i(e))}function Q(t,e,n,l){if(t&&t.o){if(X.has(t))return;X.add(t),U.c.push(()=>{X.delete(t),l&&(n&&t.d(1),l())}),t.o(e)}else l&&l()}function Te(t,e){const n=e.token={};function l(r,o,i,u){if(e.token!==n)return;e.resolved=u;let c=e.ctx;i!==void 0&&(c=c.slice(),c[i]=u);const a=r&&(e.current=r)(c);let h=!1;e.block&&(e.blocks?e.blocks.forEach((s,f)=>{f!==o&&s&&(we(),Q(s,1,1,()=>{e.blocks[f]===s&&(e.blocks[f]=null)}),Ee())}):e.block.d(1),a.c(),R(a,1),a.m(e.mount(),e.anchor),h=!0),e.block=a,e.blocks&&(e.blocks[o]=a),h&&ue()}if(Oe(t)){const r=Ae();if(t.then(o=>{I(r),l(e.then,1,e.value,o),I(null)},o=>{if(I(r),l(e.catch,2,e.error,o),I(null),!e.hasCatch)throw o}),e.current!==e.pending)return l(e.pending,0),!0}else{if(e.current!==e.then)return l(e.then,1,e.value,t),!0;e.resolved=t}}function Be(t,e,n){const l=e.slice(),{resolved:r}=t;t.current===t.then&&(l[t.value]=r),t.current===t.catch&&(l[t.error]=r),t.block.p(l,n)}function qe(t,e,n){const l=t.$$.props[e];l!==void 0&&(t.$$.bound[l]=n,n(t.$$.ctx[l]))}function se(t){t&&t.c()}function x(t,e,n,l){const{fragment:r,after_update:o}=t.$$;r&&r.m(e,n),l||Y(()=>{const i=t.$$.on_mount.map(ke).filter(ve);t.$$.on_destroy?t.$$.on_destroy.push(...i):V(i),t.$$.on_mount=[]}),o.forEach(Y)}function ee(t,e){const n=t.$$;n.fragment!==null&&(Pe(n.after_update),V(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function He(t,e){t.$$.dirty[0]===-1&&(D.push(t),Je(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function te(t,e,n,l,r,o,i,u=[-1]){const c=W;I(t);const a=t.$$={fragment:null,ctx:[],props:o,update:M,not_equal:r,bound:fe(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(c?c.$$.context:[])),callbacks:fe(),dirty:u,skip_bound:!1,root:e.target||c.$$.root};i&&i(a.root);let h=!1;if(a.ctx=n?n(t,e.props||{},(s,f,...p)=>{const S=p.length?p[0]:f;return a.ctx&&r(a.ctx[s],a.ctx[s]=S)&&(!a.skip_bound&&a.bound[s]&&a.bound[s](S),h&&He(t,s)),f}):[],a.update(),h=!0,V(a.before_update),a.fragment=l?l(a.ctx):!1,e.target){if(e.hydrate){const s=Le(e.target);a.fragment&&a.fragment.l(s),s.forEach(j)}else a.fragment&&a.fragment.c();e.intro&&R(t.$$.fragment),x(t,e.target,e.anchor,e.customElement),ue()}I(c)}class ne{$destroy(){ee(this,1),this.$destroy=M}$on(e,n){if(!ve(n))return M;const l=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return l.push(n),()=>{const r=l.indexOf(n);r!==-1&&l.splice(r,1)}}$set(e){this.$$set&&!Ne(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const je=t=>JSON.stringify(t,null,4);function Ie(t){const e=t.slice(),n=e[10](e[0]);return e[23]=n,e}function _e(t,e,n){const l=t.slice();return l[24]=e[n],l[26]=n,l}function he(t){let e,n=(t[24]||'""')+"",l,r,o,i,u;function c(){return t[14](t[26])}return{c(){e=w("button"),l=P(n),r=K(),y(e,"class","key svelte-11o58pi"),e.disabled=o=t[26]===t[0].key.length-1},m(a,h){N(a,e,h),v(e,l),v(e,r),i||(u=T(e,"click",c),i=!0)},p(a,h){t=a,h&1&&n!==(n=(t[24]||'""')+"")&&$(l,n),h&1&&o!==(o=t[26]===t[0].key.length-1)&&(e.disabled=o)},d(a){a&&j(e),i=!1,u()}}}function Re(t){let e=t[0].type+"",n;return{c(){n=P(e)},m(l,r){N(l,n,r)},p(l,r){r&1&&e!==(e=l[0].type+"")&&$(n,e)},d(l){l&&j(n)}}}function Ve(t){let e,n,l,r,o,i,u,c,a,h,s,f,p,S,J;return{c(){e=w("select"),n=w("option"),l=P("string"),o=w("option"),i=P("number"),c=w("option"),a=P("boolean"),s=w("option"),f=P("object"),n.selected=r=t[5].type=="string",n.__value="string",n.value=n.__value,o.selected=u=t[5].type=="number",o.__value="number",o.value=o.__value,c.selected=h=t[5].type=="boolean",c.__value="boolean",c.value=c.__value,s.selected=p=t[5].type=="object",s.__value="object",s.value=s.__value,t[5].type===void 0&&Y(()=>t[15].call(e))},m(A,C){N(A,e,C),v(e,n),v(n,l),v(e,o),v(o,i),v(e,c),v(c,a),v(e,s),v(s,f),de(e,t[5].type,!0),S||(J=T(e,"change",t[15]),S=!0)},p(A,C){C&32&&r!==(r=A[5].type=="string")&&(n.selected=r),C&32&&u!==(u=A[5].type=="number")&&(o.selected=u),C&32&&h!==(h=A[5].type=="boolean")&&(c.selected=h),C&32&&p!==(p=A[5].type=="object")&&(s.selected=p),C&32&&de(e,A[5].type)},d(A){A&&j(e),S=!1,J()}}}function pe(t){let e,n,l=t[11](t[23]).replaceAll(" ","&nbsp;").replaceAll(`
`,"<br />")+"",r,o;function i(){return t[20](t[23])}return{c(){e=w("div"),n=w("code")},m(u,c){N(u,e,c),v(e,n),n.innerHTML=l,r||(o=T(e,"click",i),r=!0)},p(u,c){t=u,c&1&&l!==(l=t[11](t[23]).replaceAll(" ","&nbsp;").replaceAll(`
`,"<br />")+"")&&(n.innerHTML=l)},d(u){u&&j(e),r=!1,o()}}}function Ue(t){let e,n,l,r,o,i,u,c;function a(f,p){if(p&33&&(e=null),f[5].error)return ze;if(e==null&&(e=f[5].type!=f[0].type||!f[9](f[5].value,f[0].value)),e)return Fe}let h=a(t,-1),s=h&&h(t);return{c(){s&&s.c(),n=K(),l=w("button"),l.textContent="❌",r=K(),o=w("textarea"),y(l,"title","cancel"),y(l,"class","icon svelte-11o58pi"),y(o,"rows",i=t[6](t[5].content)),o.autofocus=!0,y(o,"class","svelte-11o58pi")},m(f,p){s&&s.m(f,p),N(f,n,p),N(f,l,p),N(f,r,p),N(f,o,p),ae(o,t[5].content),o.focus(),u||(c=[T(l,"click",t[17]),T(o,"input",t[18]),T(o,"keyup",t[19])],u=!0)},p(f,p){h===(h=a(f,p))&&s?s.p(f,p):(s&&s.d(1),s=h&&h(f),s&&(s.c(),s.m(n.parentNode,n))),p&32&&i!==(i=f[6](f[5].content))&&y(o,"rows",i),p&32&&ae(o,f[5].content)},d(f){s&&s.d(f),f&&j(n),f&&j(l),f&&j(r),f&&j(o),u=!1,V(c)}}}function Fe(t){let e,n,l,r,o;return{c(){e=w("button"),n=P("💾"),y(e,"title","save"),y(e,"class","icon svelte-11o58pi"),e.disabled=l=!!t[5].error},m(i,u){N(i,e,u),v(e,n),r||(o=T(e,"click",t[16]),r=!0)},p(i,u){u&32&&l!==(l=!!i[5].error)&&(e.disabled=l)},d(i){i&&j(e),r=!1,o()}}}function ze(t){let e,n=t[5].error+"",l;return{c(){e=w("mark"),l=P(n),y(e,"class","svelte-11o58pi")},m(r,o){N(r,e,o),v(e,l)},p(r,o){o&32&&n!==(n=r[5].error+"")&&$(l,n)},d(r){r&&j(e)}}}function De(t){let e,n,l,r,o,i,u,c,a,h,s,f,p,S,J,A,C,m=t[0].key,g=[];for(let d=0;d<m.length;d+=1)g[d]=he(_e(t,m,d));function H(d,k){return d[4]?Ve:Re}let B=H(t),O=B(t);function q(d,k){return d[4]?Ue:pe}function E(d,k){return k===pe?Ie(d):d}let b=q(t),_=b(E(t,b));return{c(){e=w("tr"),n=w("td"),l=w("a"),r=w("button"),r.textContent="🪣",i=K(),u=w("td"),c=w("input"),h=K(),s=w("td");for(let d=0;d<g.length;d+=1)g[d].c();f=K(),p=w("td"),O.c(),S=K(),J=w("td"),_.c(),y(r,"class","icon svelte-11o58pi"),y(r,"title","delete"),y(l,"id",o=t[7](t[0])),y(n,"class","svelte-11o58pi"),y(c,"type","checkbox"),c.__value=a=t[0].selected,c.value=c.__value,y(c,"class","svelte-11o58pi"),y(u,"class","svelte-11o58pi"),y(s,"class","key svelte-11o58pi"),F(s,"added",t[0].added),F(s,"updated",t[0].updated),y(p,"class","svelte-11o58pi"),y(J,"class","svelte-11o58pi"),y(e,"class","svelte-11o58pi"),F(e,"highlighted",t[0].highlighted)},m(d,k){N(d,e,k),v(e,n),v(n,l),v(l,r),v(e,i),v(e,u),v(u,c),c.checked=t[0].selected,v(e,h),v(e,s);for(let L=0;L<g.length;L+=1)g[L]&&g[L].m(s,null);v(e,f),v(e,p),O.m(p,null),v(e,S),v(e,J),_.m(J,null),A||(C=[T(r,"click",t[12]),T(c,"change",t[13])],A=!0)},p(d,[k]){if(k&1&&o!==(o=d[7](d[0]))&&y(l,"id",o),k&1&&a!==(a=d[0].selected)&&(c.__value=a,c.value=c.__value),k&1&&(c.checked=d[0].selected),k&9){m=d[0].key;let L;for(L=0;L<m.length;L+=1){const ce=_e(d,m,L);g[L]?g[L].p(ce,k):(g[L]=he(ce),g[L].c(),g[L].m(s,null))}for(;L<g.length;L+=1)g[L].d(1);g.length=m.length}k&1&&F(s,"added",d[0].added),k&1&&F(s,"updated",d[0].updated),B===(B=H(d))&&O?O.p(d,k):(O.d(1),O=B(d),O&&(O.c(),O.m(p,null))),b===(b=q(d))&&_?_.p(E(d,b),k):(_.d(1),_=b(E(d,b)),_&&(_.c(),_.m(J,null))),k&1&&F(e,"highlighted",d[0].highlighted)},i:M,o:M,d(d){d&&j(e),ye(g,d),O.d(),_.d(),A=!1,V(C)}}}function Ge(t,e,n){let{row:l}=e,{remove:r}=e,{put:o}=e,{refresh:i}=e,u=!1;const c=b=>{if(!b)return 0;const _=Math.max(1,b.split(`
`).length),d=b.split(`
`).filter(k=>k.length>100).map(k=>k.length/100).reduce((k,L)=>k+L,0)+1;return Math.max(_,d)},a=b=>b.key.join("@");function h(){if(n(5,s.error="",s),s.type=="string")n(5,s.value=s.content,s);else try{n(5,s.value=JSON.parse(s.content),s)}catch(b){n(5,s.error=b.message,s),console.log("error",b.message)}}const s={type:"string",value:void 0,content:""},f=(b,_)=>JSON.stringify(b)===JSON.stringify(_),p=b=>b.type=="string"?b.value:je(b.value),S=document.createElement("textarea");function J(b){return S.textContent=b,S.innerHTML}const A=()=>r(l.key);function C(){l.selected=this.checked,n(0,l)}const m=b=>i(l.key.slice(0,+b+1));function g(){s.type=Se(this),n(5,s)}const H=async()=>{h(),n(0,l.value=s.value,l);try{console.log("put",l.key,l.value),await o(l.key,l.value),n(0,l.updated=!0,l)}catch(b){n(5,s.error=b.message,s);return}n(4,u=!1)},B=()=>n(4,u=!1);function O(){s.content=this.value,n(5,s)}const q=b=>{b.key==="Escape"?n(4,u=!1):h()},E=b=>{n(5,s.content=b,s),n(5,s.type=l.type,s),n(4,u=!0)};return t.$$set=b=>{"row"in b&&n(0,l=b.row),"remove"in b&&n(1,r=b.remove),"put"in b&&n(2,o=b.put),"refresh"in b&&n(3,i=b.refresh)},[l,r,o,i,u,s,c,a,h,f,p,J,A,C,m,g,H,B,O,q,E]}class Qe extends ne{constructor(e){super(),te(this,e,Ge,De,Z,{row:0,remove:1,put:2,refresh:3})}}function me(t,e,n){const l=t.slice();return l[15]=e[n],l[16]=e,l[17]=n,l}function We(t){let e,n,l,r,o;return{c(){e=w("button"),n=P("➕"),y(e,"class","icon svelte-7cow5f"),y(e,"title",l="delete "+(t[6]?`${t[6]} `:"")+"item"+(t[6]===1?" ":"s"))},m(i,u){N(i,e,u),v(e,n),r||(o=T(e,"click",t[11]),r=!0)},p(i,u){u&64&&l!==(l="delete "+(i[6]?`${i[6]} `:"")+"item"+(i[6]===1?" ":"s"))&&y(e,"title",l)},d(i){i&&j(e),r=!1,o()}}}function Xe(t){let e,n,l,r,o,i;return{c(){e=w("button"),n=P("🪣"),y(e,"class","icon svelte-7cow5f"),y(e,"title",l="delete "+(t[6]?`${t[6]} `:"")+"item"+(t[6]===1?" ":"s")),e.disabled=r=t[6]<1},m(u,c){N(u,e,c),v(e,n),o||(i=T(e,"click",t[10]),o=!0)},p(u,c){c&64&&l!==(l="delete "+(u[6]?`${u[6]} `:"")+"item"+(u[6]===1?" ":"s"))&&y(e,"title",l),c&64&&r!==(r=u[6]<1)&&(e.disabled=r)},d(u){u&&j(e),o=!1,i()}}}function Ye(t){let e;return{c(){e=P("key")},m(n,l){N(n,e,l)},p:M,d(n){n&&j(e)}}}function Ze(t){let e=t[1].join(" / ")+"",n,l,r,o,i;return{c(){n=P(e),l=K(),r=w("button"),r.textContent="❌",y(r,"title","clear filter"),y(r,"class","svelte-7cow5f")},m(u,c){N(u,n,c),N(u,l,c),N(u,r,c),o||(i=T(r,"click",t[13]),o=!0)},p(u,c){c&2&&e!==(e=u[1].join(" / ")+"")&&$(n,e)},d(u){u&&j(n),u&&j(l),u&&j(r),o=!1,i()}}}function ge(t){let e,n,l;function r(i){t[14](i,t[15],t[16],t[17])}let o={remove:t[2],put:t[3],refresh:t[4]};return t[15]!==void 0&&(o.row=t[15]),e=new Qe({props:o}),re.push(()=>qe(e,"row",r)),{c(){se(e.$$.fragment)},m(i,u){x(e,i,u),l=!0},p(i,u){t=i;const c={};u&4&&(c.remove=t[2]),u&8&&(c.put=t[3]),u&16&&(c.refresh=t[4]),!n&&u&1&&(n=!0,c.row=t[15],Me(()=>n=!1)),e.$set(c)},i(i){l||(R(e.$$.fragment,i),l=!0)},o(i){Q(e.$$.fragment,i),l=!1},d(i){ee(e,i)}}}function $e(t){let e,n,l,r,o,i,u,c,a,h,s,f,p,S,J,A;function C(_,d){return _[6]>0?Xe:We}let m=C(t),g=m(t);function H(_,d){return _[1].length?Ze:Ye}let B=H(t),O=B(t),q=t[0],E=[];for(let _=0;_<q.length;_+=1)E[_]=ge(me(t,q,_));const b=_=>Q(E[_],1,1,()=>{E[_]=null});return{c(){e=w("table"),n=w("tr"),l=w("th"),g.c(),r=K(),o=w("th"),i=w("input"),u=K(),c=w("th"),O.c(),a=K(),h=w("th"),h.textContent="type",s=K(),f=w("th"),f.textContent="value",p=K();for(let _=0;_<E.length;_+=1)E[_].c();y(l,"class","svelte-7cow5f"),y(i,"type","checkbox"),y(o,"class","svelte-7cow5f"),y(c,"class","svelte-7cow5f"),y(h,"class","svelte-7cow5f"),y(f,"class","svelte-7cow5f"),y(e,"class","svelte-7cow5f")},m(_,d){N(_,e,d),v(e,n),v(n,l),g.m(l,null),v(n,r),v(n,o),v(o,i),i.checked=t[5],v(n,u),v(n,c),O.m(c,null),v(n,a),v(n,h),v(n,s),v(n,f),v(e,p);for(let k=0;k<E.length;k+=1)E[k]&&E[k].m(e,null);S=!0,J||(A=[T(i,"change",t[12]),T(i,"change",t[7])],J=!0)},p(_,[d]){if(m===(m=C(_))&&g?g.p(_,d):(g.d(1),g=m(_),g&&(g.c(),g.m(l,null))),d&32&&(i.checked=_[5]),B===(B=H(_))&&O?O.p(_,d):(O.d(1),O=B(_),O&&(O.c(),O.m(c,null))),d&29){q=_[0];let k;for(k=0;k<q.length;k+=1){const L=me(_,q,k);E[k]?(E[k].p(L,d),R(E[k],1)):(E[k]=ge(L),E[k].c(),R(E[k],1),E[k].m(e,null))}for(we(),k=q.length;k<E.length;k+=1)b(k);Ee()}},i(_){if(!S){for(let d=0;d<q.length;d+=1)R(E[d]);S=!0}},o(_){E=E.filter(Boolean);for(let d=0;d<E.length;d+=1)Q(E[d]);S=!1},d(_){_&&j(e),g.d(),O.d(),ye(E,_),J=!1,V(A)}}}function xe(t,e,n){let l,{data:r}=e,{prefix:o}=e,{remove:i}=e,{put:u}=e,{refresh:c}=e,a=!1;function h(){r.forEach(m=>m.selected=a),n(0,r=[...r])}function s(m){r.find(g=>g.key.join("@")===m.join("@")).highlighted=!0,n(0,r=[...r])}function f(m){r.find(g=>g.key.join("@")===m.join("@")).added=!0,n(0,r=[...r])}function p(){const m=r.filter(g=>g.selected);m.length!==0&&confirm(`delete ${m.length} items?`)&&m.forEach(g=>i(g.key))}const S=async()=>{const m=prompt(`input the key to add
(either a string with spaces as separators or a JSON array)`).trim();if(m.length===0)return;let g=m.split(/\s+/);if(m[0]==="[")try{g=JSON.parse(m)}catch(H){alert(H.message);return}await u(g,""),window.location.href="#"+g.join("@"),s(g),f(g)};function J(){a=this.checked,n(5,a)}const A=()=>c([]);function C(m,g,H,B){H[B]=m,n(0,r)}return t.$$set=m=>{"data"in m&&n(0,r=m.data),"prefix"in m&&n(1,o=m.prefix),"remove"in m&&n(2,i=m.remove),"put"in m&&n(3,u=m.put),"refresh"in m&&n(4,c=m.refresh)},t.$$.update=()=>{t.$$.dirty&1&&n(6,l=r.filter(m=>m.selected).length)},[r,o,i,u,c,a,l,h,s,f,p,S,J,A,C]}class et extends ne{constructor(e){super(),te(this,e,xe,$e,Z,{data:0,prefix:1,remove:2,put:3,refresh:4})}}function be(t){t[9]=t[10].database}function tt(t){return{c:M,m:M,p:M,d:M}}function nt(t){be(t);let e=t[9]+"",n;return{c(){n=P(e)},m(l,r){N(l,n,r)},p(l,r){be(l)},d(l){l&&j(n)}}}function lt(t){return{c:M,m:M,p:M,d:M}}function rt(t){let e,n,l,r,o,i={ctx:t,current:null,token:null,hasCatch:!1,pending:lt,then:nt,catch:tt,value:10};return Te(t[2](),i),r=new et({props:{data:t[0],prefix:t[1],remove:t[3],put:t[4],refresh:t[5]}}),{c(){e=w("header"),i.block.c(),n=K(),l=w("main"),se(r.$$.fragment),y(e,"class","svelte-1ickym1"),y(l,"class","svelte-1ickym1")},m(u,c){N(u,e,c),i.block.m(e,i.anchor=null),i.mount=()=>e,i.anchor=null,N(u,n,c),N(u,l,c),x(r,l,null),o=!0},p(u,[c]){t=u,Be(i,t,c);const a={};c&1&&(a.data=t[0]),c&2&&(a.prefix=t[1]),r.$set(a)},i(u){o||(R(r.$$.fragment,u),o=!0)},o(u){Q(r.$$.fragment,u),o=!1},d(u){u&&j(e),i.block.d(),i.token=null,i=null,u&&j(n),u&&j(l),ee(r)}}}function ot(t,e,n){const l=f=>{const p=new URL(new URL(import.meta.url).origin);return p.pathname=f,p.toString()},r=async()=>await(await fetch(l("kv/info"))).json(),o=(f,p)=>l(f)+"?"+p.map(S=>"prefix="+S).join("&"),i=async(f=[])=>await(await fetch(o("kv",f))).json(),u=async f=>{await fetch(o("kv",f),{method:"DELETE"}),await s(h)},c=async(f,p)=>{await fetch(o("kv",f),{method:"PUT",body:JSON.stringify(p)}),await s(h)};let a=[],h=[];const s=async f=>{n(1,h=f),n(0,a=[...(await i(h)).map(p=>({...p,content:je(p.value)}))])};return s(h),[a,h,r,u,c,s]}class it extends ne{constructor(e){super(),te(this,e,ot,rt,Z,{})}}function ut(t){let e,n,l;return n=new it({}),{c(){e=w("main"),se(n.$$.fragment)},m(r,o){N(r,e,o),x(n,e,null),l=!0},p:M,i(r){l||(R(n.$$.fragment,r),l=!0)},o(r){Q(n.$$.fragment,r),l=!1},d(r){r&&j(e),ee(n)}}}class st extends ne{constructor(e){super(),te(this,e,null,ut,Z,{})}}new st({target:document.getElementById("app")});
