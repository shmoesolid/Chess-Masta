(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{22:function(e,t,a){},50:function(e,t,a){e.exports=a(91)},55:function(e,t,a){},76:function(e,t,a){},91:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),l=a(20),o=a.n(l),c=(a(55),a(13)),s=a.n(c),u=a(19),i=a(8),m=a(15),d=a(4),p=a(94),g=a(95),E=a(12),f=a.n(E);a(76);var v=function(e){var t=Object(n.useState)(),a=Object(i.a)(t,2),l=a[0],o=a[1],c=Object(n.useState)([]),s=Object(i.a)(c,2),u=(s[0],s[1],!1),m=["a","b","c","d","e","f","g","h"],d=getComputedStyle(document.documentElement).getPropertyValue("--cell-size").slice(0,-2),p=e.game,g=null;function E(e){if(null!==e.p){var t=document.getElementById("board"),a=document.getElementById("pieces"),n=e.x*d+10,r=t.offsetHeight;r-=e.y*d+40+10,a.innerHTML+="<img src='assets/img/"+e.p.color.toLowerCase()+e.p.type.toLowerCase()+".gif' alt='' style='position:absolute;top:"+r+"px;left:"+n+"px;z-index:10' />"}}function f(e){return Math.floor(e/d)}return Object(n.useEffect)(function(){console.log(p._grid);for(var e=0;e<8;e++)for(var t=0;t<8;t++)E(p._grid[e][t])}),r.a.createElement("div",null,r.a.createElement("div",{className:"board_border"},r.a.createElement("div",{id:"board",onClick:function(e){var t,a,n=document.getElementById("board"),r=n.getBoundingClientRect();u?(t=Math.abs(e.clientX-n.offsetWidth-n.offsetLeft),a=e.clientY-n.offsetTop):(t=e.pageX-r.left,a=Math.abs(e.pageY-r.height-r.top));var l=f(t),c=f(a),s="Actual: "+t+", "+a+"<br />Array: [ "+l+" ][ "+c+" ]<br />Notation: "+m[l]+(c+1)+"<br />";document.getElementById("coords").innerHTML=s;var i=m[l]+(c+1);console.log(i);var d=p._getNodeByString(i);if(console.log(d),null===g)!1!==d&&null!==d.p&&(g=d);else if(g===d)g=null;else{var E=m[g.x]+(g.y+1),v=p.move(E,i);console.log(E,i,v),g=null,o(Math.random())}document.getElementById("selected").textContent=g},style:{position:"relative"}},r.a.createElement("table",{id:"t01"},r.a.createElement("tbody",null,function(){for(var e=[],t=0;t<8;t++){for(var a=[],n=0;n<8;n++)a.push(r.a.createElement("td",{key:"row-"+n}));e.push(r.a.createElement("tr",{key:"col-"+t},a))}return e}())),r.a.createElement("div",{id:"pieces",style:{height:"0px",width:"0px"},key:l}))),r.a.createElement("div",{style:{color:"white"}},"Selected:",r.a.createElement("span",{id:"selected"})),r.a.createElement("br",null),r.a.createElement("div",{id:"coords",style:{color:"white"}}))},b=a(42),h=a.n(b);var k=function(){var e=new h.a;return e.setupNewGame(),console.log("setting up new game..."),r.a.createElement(v,{game:e})},w=Object(n.createContext)(null);function y(e){return r.a.createElement("div",{className:"error-notice"},r.a.createElement("span",null,e.message),r.a.createElement("button",{onClick:e.clearError},"X"))}a(22);function j(){var e=Object(n.useState)(),t=Object(i.a)(e,2),a=t[0],l=t[1],o=Object(n.useState)(),c=Object(i.a)(o,2),m=c[0],p=c[1],g=Object(n.useState)(),E=Object(i.a)(g,2),v=E[0],b=E[1],h=Object(n.useContext)(w).setUserData,k=Object(d.f)(),j=function(){var e=Object(u.a)(s.a.mark(function e(t){var n,r;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,n={email:a,password:m},e.next=5,f.a.post("/users/login",n);case 5:r=e.sent,h({token:r.data.token,user:r.data.user}),localStorage.setItem("auth-token",r.data.token),k.push("/"),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(1),e.t0.response.data.msg&&b(e.t0.response.data.msg);case 14:case"end":return e.stop()}},e,null,[[1,11]])}));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"page"},r.a.createElement("h2",null,"Log in"),v&&r.a.createElement(y,{message:v,clearError:function(){return b(void 0)}}),r.a.createElement("form",{className:"form",onSubmit:j},r.a.createElement("label",{htmlFor:"login-email"},"Email"),r.a.createElement("input",{id:"login-email",type:"email",onChange:function(e){return l(e.target.value)}}),r.a.createElement("label",{htmlFor:"login-password"},"Password"),r.a.createElement("input",{id:"login-password",type:"password",onChange:function(e){return p(e.target.value)}}),r.a.createElement("input",{type:"submit",value:"Log in"})))}function x(){var e=Object(n.useState)(),t=Object(i.a)(e,2),a=t[0],l=t[1],o=Object(n.useState)(),c=Object(i.a)(o,2),m=c[0],p=c[1],g=Object(n.useState)(),E=Object(i.a)(g,2),v=E[0],b=E[1],h=Object(n.useState)(),k=Object(i.a)(h,2),j=k[0],x=k[1],O=Object(n.useState)(),C=Object(i.a)(O,2),N=C[0],S=C[1],I=Object(n.useContext)(w).setUserData,D=Object(d.f)(),L=function(){var e=Object(u.a)(s.a.mark(function e(t){var n,r;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,n={email:a,password:m,passwordCheck:v,displayName:j},e.next=5,f.a.post("/users/register",n);case 5:return e.next=7,f.a.post("/users/login",{email:a,password:m});case 7:r=e.sent,I({token:r.data.token,user:r.data.user}),localStorage.setItem("auth-token",r.data.token),D.push("/"),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(1),e.t0.response.data.msg&&S(e.t0.response.data.msg);case 16:case"end":return e.stop()}},e,null,[[1,13]])}));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"page"},r.a.createElement("h2",null,"New User? Create an Account."),N&&r.a.createElement(y,{message:N,clearError:function(){return S(void 0)}}),r.a.createElement("form",{className:"form",onSubmit:L},r.a.createElement("label",{htmlFor:"register-email"},"Email"),r.a.createElement("input",{id:"register-email",type:"email",onChange:function(e){return l(e.target.value)}}),r.a.createElement("label",{htmlFor:"register-password"},"Password"),r.a.createElement("input",{id:"register-password",type:"password",onChange:function(e){return p(e.target.value)}}),r.a.createElement("input",{type:"password",placeholder:"Verify password",onChange:function(e){return b(e.target.value)}}),r.a.createElement("label",{htmlFor:"register-display-name"},"Display name"),r.a.createElement("input",{id:"register-display-name",type:"text",onChange:function(e){return x(e.target.value)}}),r.a.createElement("input",{type:"submit",value:"Register"})))}function O(){var e=Object(n.useContext)(w),t=e.userData,a=e.setUserData,l=Object(d.f)();return r.a.createElement("nav",{className:"auth-options"},t.user?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,r.a.createElement("button",{onClick:function(){a({token:void 0,user:void 0}),localStorage.setItem("auth-token","")}},"Log out")),r.a.createElement("div",null,r.a.createElement("button",{onClick:function(){var e={headers:{"x-auth-token":localStorage.getItem("auth-token","")}};f.a.delete("/users/delete",e),a({token:void 0,user:void 0}),l.push("/login")}},"Delete Account"))):r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{onClick:function(){return l.push("/register")}},"Register"),r.a.createElement("button",{onClick:function(){return l.push("/login")}},"Log in")))}var C=a(44),N=a(25),S=[{title:"Home",path:"/",icon:r.a.createElement(C.a,null),cName:"nav-text"},{title:"Rooms",path:"/rooms",icon:r.a.createElement(N.b,null),cName:"nav-text"},{title:"User Profile",path:"/auth-options",icon:r.a.createElement(N.b,null),cName:"nav-text"},{title:"Docs",path:"/documentation",icon:r.a.createElement(N.a,null),cName:"nav-text"}],I=function(e){return r.a.createElement("div",null,r.a.createElement("ul",null,S.map(function(e,t){return r.a.createElement("li",{key:t,className:e.cName},r.a.createElement(m.b,{to:e.path},e.icon,r.a.createElement("span",null,"\xa0",e.title)))})))},D=function(e){return r.a.createElement(n.Fragment,null,r.a.createElement("button",{className:"m-auto pt-0",id:"toggle",onClick:e.click},"\u2261"))};var L=function(){var e,t=Object(n.useState)(!0),a=Object(i.a)(t,2),l=a[0],o=a[1],c=Object(n.useState)({token:void 0,user:void 0}),E=Object(i.a)(c,2),v=E[0],b=E[1];return Object(n.useEffect)(function(){!function(){var e=Object(u.a)(s.a.mark(function e(){var t,a;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return null===(t=localStorage.getItem("auth-token"))&&(localStorage.setItem("auth-token",""),t=""),e.next=4,f.a.post("/users/tokenIsValid",null,{headers:{"x-auth-token":t}});case 4:if(!e.sent.data){e.next=10;break}return e.next=8,f.a.get("/users",{headers:{"x-auth-token":t}});case 8:a=e.sent,b({token:t,user:a.data});case 10:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}()()},[]),l&&(e=r.a.createElement(I,{close:function(){o(!1)},sidenav:"sidenav"})),r.a.createElement("div",{className:"App"},r.a.createElement(r.a.Fragment,null,r.a.createElement(m.a,null,r.a.createElement(w.Provider,{value:{userData:v,setUserData:b}},r.a.createElement(p.a,{className:"sticky-top"},r.a.createElement(D,{click:function(){o(!l)}}),r.a.createElement(p.a.Brand,{href:"/"},"Chess Masta Logo"),r.a.createElement(p.a.Toggle,{"aria-controls":"basic-navbar-nav"}),r.a.createElement(p.a.Collapse,{id:"basic-navbar-nav"},r.a.createElement(g.a,{className:"ml-auto"},r.a.createElement(g.a.Item,null,v.user?r.a.createElement("p",null,"Welcome, ",v.user.displayName,"!"):r.a.createElement(r.a.Fragment,null,r.a.createElement(m.b,{to:"/login"},"Login")))))),r.a.createElement("div",{className:"row m-0"},r.a.createElement("div",{className:"col-md-3"},e),r.a.createElement("div",{className:"col-md-8"},r.a.createElement(d.c,null,r.a.createElement(d.a,{path:"/",exact:!0,component:k}),r.a.createElement(d.a,{path:"/login",exact:!0,component:j}),r.a.createElement(d.a,{path:"/register",exact:!0,component:x}),r.a.createElement(d.a,{path:"/auth-options",exact:!0,component:O}))))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(L,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()}).catch(function(e){console.error(e.message)})}},[[50,1,2]]]);
//# sourceMappingURL=main.da290eb7.chunk.js.map