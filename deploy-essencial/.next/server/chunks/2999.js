"use strict";exports.id=2999,exports.ids=[2999],exports.modules={24636:(e,a,t)=>{t.r(a),t.d(a,{default:()=>b});var r=t(95344),s=t(22254),n=t(50340),i=t(89895),l=t(85674),d=t(33037),c=t(20016),o=t(35851),u=t(84013),h=t(23485),m=t(48120);let y=[{href:"/administracaosecr/dashboard",label:"Dashboard",icon:n.Z},{href:"/administracaosecr/usuarios",label:"Todos os Usu\xe1rios",icon:i.Z},{href:"/administracaosecr/assinantes",label:"Usu\xe1rios Assinantes",icon:l.Z},{href:"/administracaosecr/avisos",label:"Central de Avisos",icon:d.Z},{href:"/administracaosecr/banners",label:"Banners",icon:c.Z},{href:"/administracaosecr/chat",label:"Chat de Suporte",icon:o.Z},{href:"/administracaosecr/tutoriais",label:"Tutoriais",icon:u.Z}];function f(){let e=(0,s.usePathname)(),a=(0,s.useRouter)();return r.jsx("aside",{className:"fixed left-0 top-0 h-screen w-64 bg-brand-royal border-r border-white/10 shadow-lg z-50 hidden lg:block",children:(0,r.jsxs)("div",{className:"p-6",children:[r.jsx("div",{className:"mb-8",children:(0,r.jsxs)("div",{className:"flex items-center gap-3 mb-2",children:[r.jsx("div",{className:"p-2 bg-brand-aqua/20 rounded-xl",children:r.jsx(h.Z,{size:24,className:"text-brand-aqua"})}),(0,r.jsxs)("div",{children:[r.jsx("h2",{className:"text-lg font-display font-bold text-brand-clean",children:"Admin Panel"}),r.jsx("p",{className:"text-xs text-brand-clean/60",children:"PLENIPAY"})]})]})}),r.jsx("nav",{className:"space-y-2 mb-8",children:y.map(t=>{let s=t.icon,n=e===t.href||"/administracaosecr/dashboard"!==t.href&&e?.startsWith(t.href);return(0,r.jsxs)("button",{onClick:()=>a.push(t.href),className:`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-smooth text-left ${n?"bg-brand-aqua text-brand-midnight shadow-lg":"text-brand-clean hover:bg-white/10 hover:text-brand-aqua"}`,children:[r.jsx(s,{size:20,strokeWidth:2}),r.jsx("span",{className:"font-medium",children:t.label})]},t.href)})}),(0,r.jsxs)("button",{onClick:()=>{document.cookie="admin_token=; path=/; max-age=0",a.push("/administracaosecr/login")},className:"w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-smooth text-left text-brand-clean hover:bg-red-900/20 hover:text-red-400",children:[r.jsx(m.Z,{size:20,strokeWidth:2}),r.jsx("span",{className:"font-medium",children:"Sair"})]})]})})}var p=t(3729);function x({children:e}){let a=(0,s.useRouter)(),t=(0,s.usePathname)(),[n,i]=(0,p.useState)(!0),[l,d]=(0,p.useState)(!1);return((0,p.useEffect)(()=>{if("/administracaosecr/login"===t){d(!0),i(!1);return}(async()=>{try{if(!document.cookie.split(";").find(e=>e.trim().startsWith("admin_token="))||!(await fetch("/api/admin/verify",{method:"GET",credentials:"include"})).ok){a.replace("/administracaosecr/login");return}d(!0),i(!1)}catch(e){a.replace("/administracaosecr/login")}})()},[t,a]),"/administracaosecr/login"===t)?r.jsx(r.Fragment,{children:e}):n||!l?r.jsx("div",{className:"min-h-screen bg-brand-midnight flex items-center justify-center",children:r.jsx("div",{className:"text-brand-clean",children:"Verificando autentica\xe7\xe3o..."})}):r.jsx(r.Fragment,{children:e})}function b({children:e}){let a=(0,s.usePathname)();return"/administracaosecr/login"===a||"/administracaosecr"===a?r.jsx(r.Fragment,{children:e}):r.jsx(x,{children:(0,r.jsxs)("div",{className:"min-h-screen bg-brand-midnight",children:[r.jsx(f,{}),r.jsx("main",{className:"lg:ml-64 p-4 lg:p-8",children:e})]})})}},25545:(e,a,t)=>{t.d(a,{Z:()=>r});/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,t(69224).Z)("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]])},53148:(e,a,t)=>{t.d(a,{Z:()=>r});/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,t(69224).Z)("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]])},20016:(e,a,t)=>{t.d(a,{Z:()=>r});/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,t(69224).Z)("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]])},48120:(e,a,t)=>{t.d(a,{Z:()=>r});/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,t(69224).Z)("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]])},51838:(e,a,t)=>{t.d(a,{Z:()=>r});/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,t(69224).Z)("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]])},31498:(e,a,t)=>{t.d(a,{Z:()=>r});/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,t(69224).Z)("Save",[["path",{d:"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z",key:"1owoqh"}],["polyline",{points:"17 21 17 13 7 13 7 21",key:"1md35c"}],["polyline",{points:"7 3 7 8 15 8",key:"8nz8an"}]])},23485:(e,a,t)=>{t.d(a,{Z:()=>r});/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,t(69224).Z)("Shield",[["path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10",key:"1irkt0"}]])},46327:(e,a,t)=>{t.d(a,{Z:()=>r});/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,t(69224).Z)("SquarePen",[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z",key:"1lpok0"}]])},38271:(e,a,t)=>{t.d(a,{Z:()=>r});/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,t(69224).Z)("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]])},3380:(e,a,t)=>{t.d(a,{Z:()=>r});/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,t(69224).Z)("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]])},89895:(e,a,t)=>{t.d(a,{Z:()=>r});/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,t(69224).Z)("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]])},48096:(e,a)=>{Object.defineProperty(a,"__esModule",{value:!0}),function(e,a){for(var t in a)Object.defineProperty(e,t,{enumerable:!0,get:a[t]})}(a,{DYNAMIC_ERROR_CODE:function(){return t},DynamicServerError:function(){return r}});let t="DYNAMIC_SERVER_USAGE";class r extends Error{constructor(e){super("Dynamic server usage: "+e),this.digest=t}}("function"==typeof a.default||"object"==typeof a.default&&null!==a.default)&&void 0===a.default.__esModule&&(Object.defineProperty(a.default,"__esModule",{value:!0}),Object.assign(a.default,a),e.exports=a.default)},72973:(e,a,t)=>{Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"staticGenerationBailout",{enumerable:!0,get:function(){return l}});let r=t(48096),s=t(45869);class n extends Error{constructor(...e){super(...e),this.code="NEXT_STATIC_GEN_BAILOUT"}}function i(e,a){let{dynamic:t,link:r}=a||{};return"Page"+(t?' with `dynamic = "'+t+'"`':"")+" couldn't be rendered statically because it used `"+e+"`."+(r?" See more info here: "+r:"")}let l=(e,a)=>{let{dynamic:t,link:l}=void 0===a?{}:a,d=s.staticGenerationAsyncStorage.getStore();if(!d)return!1;if(d.forceStatic)return!0;if(d.dynamicShouldError)throw new n(i(e,{link:l,dynamic:null!=t?t:"error"}));let c=i(e,{dynamic:t,link:"https://nextjs.org/docs/messages/dynamic-server-error"});if(null==d.postpone||d.postpone.call(d,e),d.revalidate=0,d.isStaticGeneration){let a=new r.DynamicServerError(c);throw d.dynamicUsageDescription=e,d.dynamicUsageStack=a.stack,a}return!1};("function"==typeof a.default||"object"==typeof a.default&&null!==a.default)&&void 0===a.default.__esModule&&(Object.defineProperty(a.default,"__esModule",{value:!0}),Object.assign(a.default,a),e.exports=a.default)}};