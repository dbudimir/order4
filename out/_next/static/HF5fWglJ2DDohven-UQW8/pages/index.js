(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{RNiq:function(e,n,t){"use strict";t.r(n);var a=t("ln6h"),r=t.n(a),c=t("O40h"),u=t("0iUn"),i=t("sLSF"),s=t("MI3g"),l=t("a7VT"),o=t("Tit0"),f=t("q1tI"),p=t.n(f),h=(t("LpSC"),t("5Yp1")),d=t("rt45"),v=t("YFqc"),b=t.n(v);function m(){var e=Object(d.a)(["\n   display: flex;\n\n   a {\n      width: 50%;\n   }\n\n   h3 {\n      font-size: 32px;\n   }\n"]);return m=function(){return e},e}var O=t("vOnD").a.div(m()),j=function(e){function n(){var e;return Object(u.default)(this,n),(e=Object(s.default)(this,Object(l.default)(n).call(this))).state={chains:[]},e}return Object(o.default)(n,e),Object(i.default)(n,[{key:"render",value:function(){var e=this.props.chains.chains.map(function(e,n){return p.a.createElement(b.a,{href:"/chains/[name]",as:"/chains/".concat(e.name),key:n},p.a.createElement(O,null,p.a.createElement("h3",null,e.name)))});return p.a.createElement("div",null,e)}}]),n}(f.Component),w=function(e){function n(){return Object(u.default)(this,n),Object(s.default)(this,Object(l.default)(n).apply(this,arguments))}return Object(o.default)(n,e),Object(i.default)(n,[{key:"render",value:function(){return p.a.createElement("div",null,p.a.createElement(h.a,null),p.a.createElement(j,{chains:this.props}))}}]),n}(f.Component);w.getInitialProps=Object(c.default)(r.a.mark(function e(){var n,t;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://qsr-order-api.herokuapp.com/api/chains/");case 2:return n=e.sent,e.next=5,n.json();case 5:return t=e.sent,e.abrupt("return",{chains:t});case 7:case"end":return e.stop()}},e)}));n.default=w},vlRD:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){var e=t("RNiq");return{page:e.default||e}}])}},[["vlRD",1,0]]]);