(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"4mXO":function(e,t,a){e.exports=a("7TPF")},"7TPF":function(e,t,a){a("AUvm"),e.exports=a("WEpk").Object.getOwnPropertySymbols},OUKs:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/signup",function(){var e=a("vL9u");return{page:e.default||e}}])},aUsL:function(e,t,a){"use strict";var s=a("ln6h"),n=a.n(s),r=a("zrwo"),i=a("O40h"),o=a("0iUn"),l=a("sLSF"),u=a("MI3g"),d=a("a7VT"),c=a("AT/M"),m=a("Tit0"),p=a("vYYK"),f=a("q1tI"),h=a.n(f),w=a("YFqc"),g=a.n(w),b=a("vDqi"),v=a.n(b),O=a("mzXK"),E=a("c4gF"),j=function(e){function t(){var e;return Object(o.default)(this,t),e=Object(u.default)(this,Object(d.default)(t).call(this)),Object(p.a)(Object(c.default)(e),"componentDidMount",function(){e.setState({email:e.props.email,password:e.props.password,isLoggedIn:!1})}),Object(p.a)(Object(c.default)(e),"updateState",function(t){var a=t.target,s=a.value,n=a.name;e.setState(Object(p.a)({},n,s),function(){e.validateFields(n,s)})}),Object(p.a)(Object(c.default)(e),"validateFields",function(t,a){var s=e.state.formErrors,n=e.state.emailValid,r=e.state.passwordValid;switch(t){case"email":n=a.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i),s.email=n?"":"Please use a valid email address.";break;case"password":r=a.length>=7,s.password=r?"":"Please use a password that's longer thant 7 characters"}e.setState({formErrors:s,emailValid:n,passwordValid:r},e.validateAll)}),Object(p.a)(Object(c.default)(e),"validateAll",function(){e.setState({allValid:e.state.emailValid&&e.state.passwordValid})}),Object(p.a)(Object(c.default)(e),"onSubmit",function(){var t=Object(i.default)(n.a.mark(function t(a){var s,i;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:a.preventDefault(),s=Object(c.default)(e),i=s.state,v.a.post("https://qsr-order-api.herokuapp.com/api/users/login/",Object(r.a)({},i)).then(function(t){localStorage.token=t.data.token,e.setState({isLoggedIn:!0,userId:t.data.userId}),e.props.signIn(t.data.userName,e.state.email,t.data.userId,!0);var a={userFullName:t.data.userFullName,userName:t.data.userName,email:e.state.email,userId:t.data.userId};e.props.updateUser(a)});case 3:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()),e.state={userId:"",email:"",password:"",formErrors:{email:"",password:""},emailValid:!1,passwordValid:!1,allValid:!1,isLoggedIn:""},e}return Object(m.default)(t,e),Object(l.default)(t,[{key:"render",value:function(){return h.a.createElement("div",{className:"form"},h.a.createElement(O.a,{className:"user-form"},h.a.createElement("h3",null,"Log In"),h.a.createElement("input",{name:"email",onChange:this.updateState,value:this.state.email,type:"text",placeholder:"Enter your email"}),h.a.createElement(E.a,{message:this.state.formErrors.email,state:this.state}),h.a.createElement("input",{name:"password",onChange:this.updateState,value:this.state.password,type:"password",placeholder:"Enter your password"}),h.a.createElement(E.a,{message:this.state.formErrors.password,state:this.state}),h.a.createElement("input",{name:"submit",onClick:this.onSubmit,type:"submit",value:"Log In"}),h.a.createElement("span",{className:"sign-up-now"},"Don't have an account? ",h.a.createElement(g.a,{to:"/signup"}," Click here to sign up now"))))}}]),t}(f.Component);t.a=j},c4gF:function(e,t,a){"use strict";var s=a("0iUn"),n=a("sLSF"),r=a("MI3g"),i=a("a7VT"),o=a("Tit0"),l=a("rt45"),u=a("q1tI"),d=a.n(u);function c(){var e=Object(l.a)(["\n   color: red;\n   line-height: 0;\n   margin-bottom: 12px;\n   font-weight: 700;\n"]);return c=function(){return e},e}var m=a("vOnD").a.div(c()),p=function(e){function t(){return Object(s.default)(this,t),Object(r.default)(this,Object(i.default)(t).apply(this,arguments))}return Object(o.default)(t,e),Object(n.default)(t,[{key:"render",value:function(){return d.a.createElement(m,{className:"error-message"},d.a.createElement("p",null,this.props.message))}}]),t}(u.Component);t.a=p},mzXK:function(e,t,a){"use strict";var s=a("rt45");function n(){var e=Object(s.a)(["\n   display: block;\n   margin: 60px auto 0;\n   width: fit-content;\n   h3 {\n      margin-bottom: 32px;\n   }\n   .label {\n      margin-top: 12px;\n      font-weight: 800;\n   }\n   input {\n      width: 500px;\n      height: 48px;\n      border: 0px;\n      border-bottom: 3px solid #000000;\n      font-size: 32px;\n      margin-bottom: 12px;\n      margin-top: 32px;\n      padding: 0 4px;\n   }\n   input::placeholder {\n      font-size: 32px;\n      padding: 6px 6px 0;\n      line-height: 1;\n   }\n   input[name='submit'] {\n      border-radius: 6px;\n      margin-bottom: 64px;\n      border-bottom: 0px;\n      font-size: 24px;\n      font-weight: 800;\n      background-color: #fa8320;\n      width: 200px;\n   }\n   span {\n      display: block;\n   }\n"]);return n=function(){return e},e}var r=a("vOnD").a.div(n());t.a=r},n8Zo:function(e,t,a){"use strict";var s=a("ln6h"),n=a.n(s),r=a("zrwo"),i=a("O40h"),o=a("0iUn"),l=a("sLSF"),u=a("MI3g"),d=a("a7VT"),c=a("AT/M"),m=a("Tit0"),p=a("vYYK"),f=a("q1tI"),h=a.n(f),w=a("vDqi"),g=a.n(w),b=a("mzXK"),v=a("c4gF"),O=function(e){function t(){var e;return Object(o.default)(this,t),e=Object(u.default)(this,Object(d.default)(t).call(this)),Object(p.a)(Object(c.default)(e),"componentDidMount",function(){e.setState({userFullName:"",userName:e.props.userName,email:e.props.email,password:e.props.password,isLoggedIn:!1})}),Object(p.a)(Object(c.default)(e),"updateState",function(t){var a=t.target,s=a.value,n=a.name;e.setState(Object(p.a)({},n,s),function(){e.validateFields(n,s)})}),Object(p.a)(Object(c.default)(e),"onSubmit",function(){var t=Object(i.default)(n.a.mark(function t(a){var s,i;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:a.preventDefault(),s=Object(c.default)(e),i=s.state,console.log(e.state),g.a.post("https://qsr-order-api.herokuapp.com/api/users/signup/",Object(r.a)({},i)).then(function(t){localStorage.token=t.data.token,e.setState({userId:t.data.userId,isLoggedIn:!0}),e.props.signIn(t.data.userName,e.state.email,t.data.userId,!0);var a={userFullName:t.data.userFullName,userName:t.data.userName,email:e.state.email,userId:t.data.userId};e.props.updateUser(a)}),alert("You're in!");case 5:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()),e.state={userId:"",userFullName:"",userName:"",email:"",password:"",passwordConfirm:"",formErrors:{userName:"",email:"",password:"",confirmPassword:""},userNameValid:!1,emailValid:!1,passwordValid:!1,confirmPasswordValid:!1,allValid:!1},e}return Object(m.default)(t,e),Object(l.default)(t,[{key:"validateFields",value:function(e,t){var a=this.state.formErrors,s=this.state.userNameValid,n=this.state.emailValid,r=this.state.passwordValid,i=this.state.confirmPasswordValid;switch(e){case"userName":s=t.length>=1,a.userName=s?"":"Please enter a valid user name";break;case"email":n=t.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i),a.email=n?"":"Please use a valid email address.";break;case"password":r=t.length>=7,a.password=r?"":"Please use a password that's longer thant 7 characters";break;case"passwordConfirm":i=this.state.password===this.state.passwordConfirm,a.confirmPassword=i?"":"The passwords do not match."}this.setState({formErrors:a,userNameValid:s,emailValid:n,passwordValid:r,confirmPasswordValid:i},this.validateAll)}},{key:"validateAll",value:function(){this.setState({allValid:this.state.emailValid&&this.state.passwordValid&&this.state.confirmPasswordValid&&this.state.userNameValid})}},{key:"render",value:function(){return h.a.createElement("div",{className:"form"},h.a.createElement(b.a,{className:"signup-form"},h.a.createElement("h3",null,"Sign Up"),h.a.createElement("form",null,h.a.createElement("input",{name:"userFullName",onChange:this.updateState,value:this.state.userFullName,type:"text",placeholder:"Enter your full name"}),h.a.createElement("div",null,h.a.createElement("br",null)),h.a.createElement("input",{name:"userName",onChange:this.updateState,value:this.state.userName,type:"text",placeholder:"Enter a username"}),h.a.createElement(v.a,{message:this.state.formErrors.userName,state:this.state}),h.a.createElement("input",{name:"email",onChange:this.updateState,value:this.state.email,type:"text",placeholder:"Email"}),h.a.createElement(v.a,{message:this.state.formErrors.email,state:this.state}),h.a.createElement("input",{name:"password",onChange:this.updateState,value:this.state.password,type:"password",placeholder:"Password"}),h.a.createElement(v.a,{message:this.state.formErrors.password,state:this.state}),h.a.createElement("input",{name:"passwordConfirm",onChange:this.updateState,value:this.state.passwordConfirm,type:"password",placeholder:"Re-enter password"}),h.a.createElement(v.a,{message:this.state.formErrors.confirmPassword,state:this.state}),h.a.createElement("input",{name:"submit",onClick:this.onSubmit,type:"submit",value:"Sign Up"}))))}}]),t}(f.Component);t.a=O},vL9u:function(e,t,a){"use strict";a.r(t);var s=a("q1tI"),n=a.n(s),r=a("nOHt"),i=a("5Yp1"),o=a("9/ng"),l=a("n8Zo"),u=a("aUsL");t.default=function(e){var t,a=e.updateUser,d=void 0===a?function(){}:a,c=Object(r.useRouter)(),m=Object(s.useContext)(o.a);return t="/login"===c.asPath?n.a.createElement(u.a,{signIn:m.signIn,updateUser:d}):n.a.createElement(l.a,{signIn:m.signIn,updateUser:d}),n.a.createElement("div",null,n.a.createElement(i.a,null),t)}},zrwo:function(e,t,a){"use strict";a.d(t,"a",function(){return d});var s=a("Jo+v"),n=a.n(s),r=a("4mXO"),i=a.n(r),o=a("pLtp"),l=a.n(o),u=a("vYYK");function d(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{},s=l()(a);"function"===typeof i.a&&(s=s.concat(i()(a).filter(function(e){return n()(a,e).enumerable}))),s.forEach(function(t){Object(u.a)(e,t,a[t])})}return e}}},[["OUKs",1,0]]]);