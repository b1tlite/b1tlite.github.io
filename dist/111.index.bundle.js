"use strict";(self.webpackChunksen=self.webpackChunksen||[]).push([[111],{64111:(t,e,i)=>{i.r(e),i.d(e,{SolanaWalletAdapter:()=>it});var n=i(4942),r=i(75885),o=i(22782),s=i(20917),a=i(95844),c=i(79826),d=i(24970),h=i(74286),l=i.n(h),u=i(2043),p=i.n(u),m=i(64063),g=i.n(m),w=i(48764).Buffer,f=()=>"Torus: Lost connection to Torus.",y=()=>"Torus: Disconnected from iframe. Page reload required.",v=()=>"Must provide a Node.js-style duplex stream.",_=()=>"Expected a single, non-array, object argument.",b=()=>"'args.method' must be a non-empty string.",O=()=>"'args.params' must be an object or array if provided.",P=t=>'Torus: Connected to chain with ID "'.concat(t,'".');const I={PRODUCTION:"production",DEVELOPMENT:"development",TESTING:"testing"},C={BOTTOM_LEFT:"bottom-left",TOP_LEFT:"top-left",BOTTOM_RIGHT:"bottom-right",TOP_RIGHT:"top-right"};var E={supportedVerifierList:["google","reddit","discord"],api:"https://api.tor.us",translations:{en:{embed:{continue:"Continue",actionRequired:"Authorization required",pendingAction:"Click continue to proceed with your request in a popup",cookiesRequired:"Cookies Required",enableCookies:"Please enable cookies in your browser preferences to access Torus",clickHere:"More Info"}},de:{embed:{continue:"Fortsetzen",actionRequired:"Autorisierung erforderlich",pendingAction:"Klicken Sie in einem Popup auf Weiter, um mit Ihrer Anfrage fortzufahren",cookiesRequired:"Cookies benötigt",enableCookies:"Bitte aktivieren Sie Cookies in Ihren Browsereinstellungen, um auf Torus zuzugreifen",clickHere:"Mehr Info"}},ja:{embed:{continue:"継続する",actionRequired:"認証が必要です",pendingAction:"続行をクリックして、ポップアップでリクエストを続行します",cookiesRequired:"必要なクッキー",enableCookies:"Torusにアクセスするには、ブラウザの設定でCookieを有効にしてください。",clickHere:"詳しくは"}},ko:{embed:{continue:"계속하다",actionRequired:"승인 필요",pendingAction:"팝업에서 요청을 진행하려면 계속을 클릭하십시오.",cookiesRequired:"쿠키 필요",enableCookies:"브라우저 환경 설정에서 쿠키를 활성화하여 Torus에 액세스하십시오.",clickHere:"더 많은 정보"}},zh:{embed:{continue:"继续",actionRequired:"需要授权",pendingAction:"单击继续以在弹出窗口中继续您的请求",cookiesRequired:"必填Cookie",enableCookies:"请在您的浏览器首选项中启用cookie以访问Torus。",clickHere:"更多信息"}}},prodTorusUrl:"",localStorageKey:"torus-".concat(window.location.hostname)},S=p().getLogger("solana-embed");const T=()=>Math.random().toString(36).slice(2),A=async t=>{let e,i;switch(t){case"testing":e="https://solana-testing.tor.us",i="debug";break;case"development":e="http://localhost:8080",i="debug";break;default:e="https://solana.tor.us",i="error"}return{torusUrl:e,logLevel:i}},R={height:660,width:375},k={height:740,width:1315},L={height:700,width:1200},N={height:600,width:400};function j(t){let{width:e,height:i}=t;const n=void 0!==window.screenLeft?window.screenLeft:window.screenX,r=void 0!==window.screenTop?window.screenTop:window.screenY,o=window.innerWidth?window.innerWidth:document.documentElement.clientWidth?document.documentElement.clientWidth:window.screen.width,s=window.innerHeight?window.innerHeight:document.documentElement.clientHeight?document.documentElement.clientHeight:window.screen.height,a=Math.abs((o-e)/2/1+n),c=Math.abs((s-i)/2/1+r);return"titlebar=0,toolbar=0,status=0,location=0,menubar=0,height=".concat(i/1,",width=").concat(e/1,",top=").concat(c,",left=").concat(a)}class D extends a.Ue{constructor(t,e){let{maxEventListeners:i=100,jsonRpcStreamName:r="provider"}=e;if(super(),(0,n.Z)(this,"isTorus",void 0),(0,n.Z)(this,"_rpcEngine",void 0),(0,n.Z)(this,"jsonRpcConnectionEvents",void 0),(0,n.Z)(this,"_state",void 0),!(0,d.duplex)(t))throw new Error(v());this.isTorus=!0,this.setMaxListeners(i),this._handleConnect=this._handleConnect.bind(this),this._handleDisconnect=this._handleDisconnect.bind(this),this._handleStreamDisconnect=this._handleStreamDisconnect.bind(this),this._rpcRequest=this._rpcRequest.bind(this),this._initializeState=this._initializeState.bind(this),this.request=this.request.bind(this),this.sendAsync=this.sendAsync.bind(this);const s=new a.O4;l()(t,s,t,this._handleStreamDisconnect.bind(this,"Torus")),s.ignoreStream("phishing");const h=(0,a.AP)();l()(h.stream,s.createStream(r),h.stream,this._handleStreamDisconnect.bind(this,"Torus RpcProvider"));const u=new a.eI;u.push((0,a.Rq)()),u.push(((t,e,i)=>{"string"==typeof t.method&&t.method||(e.error=c.ethErrors.rpc.invalidRequest({message:"The request 'method' must be a non-empty string.",data:t})),i((t=>{const{error:i}=e;return i?(S.error("Torus - RPC Error: ".concat(i.message),i),t()):t()}))})),u.push((0,o.yh)({origin:location.origin})),u.push(h.middleware),this._rpcEngine=u,this.jsonRpcConnectionEvents=h.events}async request(t){if(!t||"object"!=typeof t||Array.isArray(t))throw c.ethErrors.rpc.invalidRequest({message:_(),data:t});const{method:e,params:i}=t;if("string"!=typeof e||0===e.length)throw c.ethErrors.rpc.invalidRequest({message:b(),data:t});if(void 0!==i&&!Array.isArray(i)&&("object"!=typeof i||null===i))throw c.ethErrors.rpc.invalidRequest({message:O(),data:t});return new Promise(((t,n)=>{this._rpcRequest({method:e,params:i},(0,a.nE)(t,n))}))}send(t,e){this._rpcRequest(t,e)}sendAsync(t){return new Promise(((e,i)=>{this._rpcRequest(t,(0,a.nE)(e,i))}))}_handleStreamDisconnect(t,e){!function(t,e,i){let n='Torus: Lost connection to "'.concat(t,'".');null!=e&&e.stack&&(n+="\n".concat(e.stack)),S.warn(n),i&&i.listenerCount("error")>0&&i.emit("error",n)}(t,e,this),this._handleDisconnect(!1,e?e.message:void 0)}}async function U(){return new Promise((t=>{"loading"!==document.readyState?t():function(t,e,i){for(var n=arguments.length,r=new Array(n>3?n-3:0),o=3;o<n;o++)r[o-3]=arguments[o];const s=()=>{i(...r),t.removeEventListener(e,s)};t.addEventListener(e,s)}(document,"DOMContentLoaded",t)}))}const q=t=>{const e=window.document.createElement("template"),i=t.trim();return e.innerHTML=i,e.content.firstChild};class x extends a.Ue{constructor(t){let{url:e,target:i,features:r}=t;super(),(0,n.Z)(this,"url",void 0),(0,n.Z)(this,"target",void 0),(0,n.Z)(this,"features",void 0),(0,n.Z)(this,"window",void 0),(0,n.Z)(this,"windowTimer",void 0),(0,n.Z)(this,"iClosedWindow",void 0),this.url=e,this.target=i||"_blank",this.features=r||j(L),this.window=void 0,this.windowTimer=void 0,this.iClosedWindow=!1,this._setupTimer()}_setupTimer(){this.windowTimer=Number(setInterval((()=>{this.window&&this.window.closed&&(clearInterval(this.windowTimer),this.iClosedWindow||this.emit("close"),this.iClosedWindow=!1,this.window=void 0),void 0===this.window&&clearInterval(this.windowTimer)}),500))}open(){var t;return this.window=window.open(this.url.href,this.target,this.features),null!==(t=this.window)&&void 0!==t&&t.focus&&this.window.focus(),Promise.resolve()}close(){this.iClosedWindow=!0,this.window&&this.window.close()}redirect(t){t?window.location.replace(this.url.href):window.location.href=this.url.href}}function W(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}class Z extends D{constructor(t,e){let{maxEventListeners:i=100,jsonRpcStreamName:r="provider"}=e;super(t,{maxEventListeners:i,jsonRpcStreamName:r}),(0,n.Z)(this,"embedTranslations",void 0),(0,n.Z)(this,"torusUrl",void 0),(0,n.Z)(this,"dappStorageKey",void 0),(0,n.Z)(this,"windowRefs",void 0),(0,n.Z)(this,"tryWindowHandle",void 0),(0,n.Z)(this,"torusAlertContainer",void 0),(0,n.Z)(this,"torusIframe",void 0),this._state=function(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?W(Object(i),!0).forEach((function(e){(0,n.Z)(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):W(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}({},Z._defaultState),this.torusUrl="",this.dappStorageKey="";const s=E.translations[(()=>{let t=window.navigator.language||"en-US";const e=t.split("-");return t=Object.prototype.hasOwnProperty.call(E.translations,e[0])?e[0]:"en",t})()];this.embedTranslations=s.embed,this.windowRefs={},this.on("connect",(()=>{this._state.isConnected=!0})),this.jsonRpcConnectionEvents.on("notification",(t=>{const{method:e,params:i}=t;if(e===o.Nb.IFRAME_STATUS){const{isFullScreen:t,rid:e}=i;this._displayIframe({isFull:t,rid:e})}else if(e===o.Nb.CREATE_WINDOW){const{windowId:t,url:e}=i;this._createPopupBlockAlert(t,e)}else if(e===o.Nb.CLOSE_WINDOW)this._handleCloseWindow(i);else if(e===o.Nb.USER_LOGGED_IN){const{currentLoginProvider:t}=i;this._state.isLoggedIn=!0,this._state.currentLoginProvider=t}else e===o.Nb.USER_LOGGED_OUT&&(this._state.isLoggedIn=!1,this._state.currentLoginProvider=null,this._displayIframe())}))}get isLoggedIn(){return this._state.isLoggedIn}get isIFrameFullScreen(){return this._state.isIFrameFullScreen}isConnected(){return this._state.isConnected}async _initializeState(t){try{const{torusUrl:e,dappStorageKey:i,torusAlertContainer:n,torusIframe:r}=t;this.torusUrl=e,this.dappStorageKey=i,this.torusAlertContainer=n,this.torusIframe=r,this.torusIframe.addEventListener("load",(()=>{this._state.isIFrameFullScreen||this._displayIframe()}));const{currentLoginProvider:s,isLoggedIn:a}=await this.request({method:o.vU.GET_PROVIDER_STATE,params:[]});this._handleConnect(s,a)}catch(t){S.error("Torus: Failed to get initial state. Please report this bug.",t)}finally{S.info("initialized communication state"),this._state.initialized=!0,this.emit("_initialized")}}_handleWindow(t){let{url:e,target:i,features:n}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const r=new URL(e||"".concat(this.torusUrl,"/redirect?windowId=").concat(t));this.dappStorageKey&&(r.hash?r.hash+="&dappStorageKey=".concat(this.dappStorageKey):r.hash="#dappStorageKey=".concat(this.dappStorageKey));const s=new x({url:r,target:i,features:n});s.open(),s.window?(this.windowRefs[t]=s,this.request({method:o.vU.OPENED_WINDOW,params:{windowId:t}}),s.once("close",(()=>{delete this.windowRefs[t],this.request({method:o.vU.CLOSED_WINDOW,params:{windowId:t}})}))):this._createPopupBlockAlert(t,r.href)}_displayIframe(){let{isFull:t=!1,rid:e=""}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const i={};if(t)i.display="block",i.width="100%",i.height="100%",i.top="0px",i.right="0px",i.left="0px",i.bottom="0px";else switch(i.display=this._state.torusWidgetVisibility?"block":"none",i.height="70px",i.width="70px",this._state.buttonPosition){case C.TOP_LEFT:i.top="0px",i.left="0px",i.right="auto",i.bottom="auto";break;case C.TOP_RIGHT:i.top="0px",i.right="0px",i.left="auto",i.bottom="auto";break;case C.BOTTOM_RIGHT:i.bottom="0px",i.right="0px",i.top="auto",i.left="auto";break;case C.BOTTOM_LEFT:default:i.bottom="0px",i.left="0px",i.top="auto",i.right="auto"}Object.assign(this.torusIframe.style,i),this._state.isIFrameFullScreen=t,this.request({method:o.vU.IFRAME_STATUS,params:{isIFrameFullScreen:t,rid:e}})}hideTorusButton(){this._state.torusWidgetVisibility=!1,this._displayIframe()}showTorusButton(){this._state.torusWidgetVisibility=!0,this._displayIframe()}_rpcRequest(t,e){const i=e,n=t;Array.isArray(n)||n.jsonrpc||(n.jsonrpc="2.0"),this.tryWindowHandle(n,i)}_handleConnect(t,e){this._state.isConnected||(this._state.isConnected=!0,this.emit("connect",{currentLoginProvider:t,isLoggedIn:e}),S.debug(P(t)))}_handleDisconnect(t,e){if(this._state.isConnected||!this._state.isPermanentlyDisconnected&&!t){let i;this._state.isConnected=!1,t?(i=new c.EthereumRpcError(1013,e||f()),S.debug(i)):(i=new c.EthereumRpcError(1011,e||y()),S.error(i),this._state.currentLoginProvider=null,this._state.isLoggedIn=!1,this._state.torusWidgetVisibility=!1,this._state.isIFrameFullScreen=!1,this._state.isPermanentlyDisconnected=!0),this.emit("disconnect",i)}}_handleCloseWindow(t){const{windowId:e}=t;this.windowRefs[e]&&(this.windowRefs[e].close(),delete this.windowRefs[e])}async _createPopupBlockAlert(t,e){const i=this.getLogoUrl(),n=q('<div id="torusAlert" class="torus-alert--v2">'+'<div id="torusAlert__logo"><img src="'.concat(i,'" /></div>')+"<div>"+'<h1 id="torusAlert__title">'.concat(this.embedTranslations.actionRequired,"</h1>")+'<p id="torusAlert__desc">'.concat(this.embedTranslations.pendingAction,"</p>")+"</div></div>"),r=q('<div><a id="torusAlert__btn">'.concat(this.embedTranslations.continue,"</a></div>")),o=q('<div id="torusAlert__btn-container"></div>');o.appendChild(r),n.appendChild(o),await U(),(()=>{this.torusAlertContainer.appendChild(n)})(),(()=>{r.addEventListener("click",(()=>{this._handleWindow(t,{url:e,target:"_blank",features:j(N)}),n.remove(),0===this.torusAlertContainer.children.length&&(this.torusAlertContainer.style.display="none")}))})(),this.torusAlertContainer.style.display="block"}getLogoUrl(){return"".concat(this.torusUrl,"/images/torus_icon-blue.svg")}}function z(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}(0,n.Z)(Z,"_defaultState",{buttonPosition:"bottom-left",currentLoginProvider:null,isIFrameFullScreen:!1,hasEmittedConnection:!1,torusWidgetVisibility:!1,initialized:!1,isLoggedIn:!1,isPermanentlyDisconnected:!1,isConnected:!1});class K extends D{constructor(t,e){let{maxEventListeners:i=100,jsonRpcStreamName:r="provider"}=e;super(t,{maxEventListeners:i,jsonRpcStreamName:r}),(0,n.Z)(this,"chainId",void 0),(0,n.Z)(this,"selectedAddress",void 0),(0,n.Z)(this,"tryWindowHandle",void 0),this._state=function(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?z(Object(i),!0).forEach((function(e){(0,n.Z)(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):z(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}({},K._defaultState),this.selectedAddress=null,this.chainId=null,this._handleAccountsChanged=this._handleAccountsChanged.bind(this),this._handleChainChanged=this._handleChainChanged.bind(this),this._handleUnlockStateChanged=this._handleUnlockStateChanged.bind(this),this.on("connect",(()=>{this._state.isConnected=!0})),this.jsonRpcConnectionEvents.on("notification",(t=>{const{method:e,params:i}=t;e===o.zK.ACCOUNTS_CHANGED?this._handleAccountsChanged(i):e===o.zK.UNLOCK_STATE_CHANGED?this._handleUnlockStateChanged(i):e===o.zK.CHAIN_CHANGED&&this._handleChainChanged(i)}))}isConnected(){return this._state.isConnected}async _initializeState(){try{const{accounts:t,chainId:e,isUnlocked:i}=await this.request({method:o.GA.GET_PROVIDER_STATE,params:[]});this.emit("connect",{chainId:e}),this._handleChainChanged({chainId:e}),this._handleUnlockStateChanged({accounts:t,isUnlocked:i}),this._handleAccountsChanged(t)}catch(t){S.error("Torus: Failed to get initial state. Please report this bug.",t)}finally{S.info("initialized provider state"),this._state.initialized=!0,this.emit("_initialized")}}_rpcRequest(t,e){let i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=e;const r=t;if(!Array.isArray(r))if(r.jsonrpc||(r.jsonrpc="2.0"),"solana_accounts"===r.method||"solana_requestAccounts"===r.method)n=(t,n)=>{this._handleAccountsChanged(n.result||[],"solana_accounts"===r.method,i),e(t,n)};else if("wallet_getProviderState"===r.method)return void this._rpcEngine.handle(t,n);this.tryWindowHandle(r,n)}_handleConnect(t){this._state.isConnected||(this._state.isConnected=!0,this.emit("connect",{chainId:t}),S.debug(P(t)))}_handleDisconnect(t,e){if(this._state.isConnected||!this._state.isPermanentlyDisconnected&&!t){let i;this._state.isConnected=!1,t?(i=new c.EthereumRpcError(1013,e||f()),S.debug(i)):(i=new c.EthereumRpcError(1011,e||y()),S.error(i),this.chainId=null,this._state.accounts=null,this.selectedAddress=null,this._state.isUnlocked=!1,this._state.isPermanentlyDisconnected=!0),this.emit("disconnect",i)}}_handleAccountsChanged(t){let e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=t;Array.isArray(n)||(S.error("Torus: Received non-array accounts parameter. Please report this bug.",n),n=[]);for(const e of t)if("string"!=typeof e){S.error("Torus: Received non-string account. Please report this bug.",t),n=[];break}g()(this._state.accounts,n)||(e&&Array.isArray(this._state.accounts)&&this._state.accounts.length>0&&!i&&S.error('Torus: "solana_accounts" unexpectedly updated accounts. Please report this bug.',n),this._state.accounts=n,this.emit("accountsChanged",n)),this.selectedAddress!==n[0]&&(this.selectedAddress=n[0]||null)}_handleChainChanged(){let{chainId:t}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t?"loading"===t?this._handleDisconnect(!0):(this._handleConnect(t),t!==this.chainId&&(this.chainId=t,this._state.initialized&&this.emit("chainChanged",this.chainId))):S.error("Torus: Received invalid network parameters. Please report this bug.",{chainId:t})}_handleUnlockStateChanged(){let{accounts:t,isUnlocked:e}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};"boolean"==typeof e?e!==this._state.isUnlocked&&(this._state.isUnlocked=e,this._handleAccountsChanged(t||[])):S.error("Torus: Received invalid isUnlocked parameter. Please report this bug.",{isUnlocked:e})}}function M(t){return new Promise(((e,i)=>{try{const i=document.createElement("img");i.onload=()=>e(!0),i.onerror=()=>e(!1),i.src=t}catch(t){i(t)}}))}(0,n.Z)(K,"_defaultState",{accounts:null,isConnected:!1,isUnlocked:!1,initialized:!1,isPermanentlyDisconnected:!1,hasEmittedConnection:!1});const F=t=>{const{document:e}=t,i=e.querySelector('head > meta[property="og:site_name"]');if(i)return i.content;const n=e.querySelector('head > meta[name="title"]');return n?n.content:e.title&&e.title.length>0?e.title:t.location.hostname};async function H(t){try{const{document:e}=t;let i=e.querySelector('head > link[rel="shortcut icon"]');return i&&await M(i.href)?i.href:(i=Array.from(e.querySelectorAll('head > link[rel="icon"]')).find((t=>Boolean(t.href))),i&&await M(i.href)?i.href:"")}catch(t){return""}}function B(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function G(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?B(Object(i),!0).forEach((function(e){(0,n.Z)(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):B(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}const V=["send_transaction","sign_transaction","sign_all_transactions","sign_message","connect"],Y=[o.vU.SET_PROVIDER],X=function(t){let e;try{e=window.localStorage;const t="__storage_test__";return e.setItem(t,t),e.removeItem(t),!0}catch(t){return t&&(22===t.code||1014===t.code||"QuotaExceededError"===t.name||"NS_ERROR_DOM_QUOTA_REACHED"===t.name)&&e&&0!==e.length}}();!async function(){try{if("undefined"==typeof document)return;const t=document.createElement("link"),{torusUrl:e}=await A("production");t.href="".concat(e,"/frame"),t.crossOrigin="anonymous",t.type="text/html",t.rel="prefetch",t.relList&&t.relList.supports&&t.relList.supports("prefetch")&&document.head.appendChild(t)}catch(t){S.warn(t)}}();class J{constructor(){let{modalZIndex:t=99999}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(0,n.Z)(this,"isInitialized",void 0),(0,n.Z)(this,"torusAlert",void 0),(0,n.Z)(this,"modalZIndex",void 0),(0,n.Z)(this,"alertZIndex",void 0),(0,n.Z)(this,"requestedLoginProvider",void 0),(0,n.Z)(this,"provider",void 0),(0,n.Z)(this,"communicationProvider",void 0),(0,n.Z)(this,"dappStorageKey",void 0),(0,n.Z)(this,"torusAlertContainer",void 0),(0,n.Z)(this,"torusUrl",void 0),(0,n.Z)(this,"torusIframe",void 0),(0,n.Z)(this,"styleLink",void 0),this.torusUrl="",this.isInitialized=!1,this.requestedLoginProvider=null,this.modalZIndex=t,this.alertZIndex=t+1e3,this.dappStorageKey=""}get isLoggedIn(){return!!this.communicationProvider&&this.communicationProvider.isLoggedIn}async init(){let{buildEnv:t=I.PRODUCTION,enableLogging:e=!1,network:i,showTorusButton:n=!1,useLocalStorage:r=!1,buttonPosition:o=C.BOTTOM_LEFT,apiKey:a="torus-default",extraParams:c={}}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(this.isInitialized)throw new Error("Already initialized");(0,s.ut)(a);const{torusUrl:d,logLevel:h}=await A(t);S.info(d,"url loaded"),this.torusUrl=d,S.setDefaultLevel(h),e?S.enableAll():S.disableAll();const l=this.handleDappStorageKey(r),u=new URL(d);u.pathname.endsWith("/")?u.pathname+="frame":u.pathname+="/frame";const p=new URLSearchParams;l&&p.append("dappStorageKey",l),p.append("origin",window.location.origin),u.hash=p.toString(),this.torusIframe=q('<iframe\n        id="torusIframe"\n        class="torusIframe"\n        src="'.concat(u.href,'"\n        style="display: none; position: fixed; top: 0; right: 0; width: 100%;\n        height: 100%; border: none; border-radius: 0; z-index: ').concat(this.modalZIndex.toString(),'"\n      ></iframe>')),this.torusAlertContainer=q('<div id="torusAlertContainer" style="display:none; z-index: '.concat(this.alertZIndex.toString(),'"></div>')),this.styleLink=q('<link href="'.concat(d,'/css/widget.css" rel="stylesheet" type="text/css">')),await U(),await(async()=>new Promise(((t,e)=>{try{window.document.head.appendChild(this.styleLink),window.document.body.appendChild(this.torusIframe),window.document.body.appendChild(this.torusAlertContainer),this.torusIframe.addEventListener("load",(async()=>{const e=await(async()=>({name:F(window),icon:await H(window)}))();this.torusIframe.contentWindow.postMessage({buttonPosition:o,apiKey:a,network:i,dappMetadata:e,extraParams:c},u.origin),await this._setupWeb3({torusUrl:d}),n?this.showTorusButton():this.hideTorusButton(),this.isInitialized=!0,window.torus=this,t()}))}catch(t){e(t)}})))()}async login(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!this.isInitialized)throw new Error("Call init() first");try{this.requestedLoginProvider=t.loginProvider||null,this.requestedLoginProvider||this.communicationProvider._displayIframe({isFull:!0});const e=await new Promise(((e,i)=>{this.provider._rpcRequest({method:"solana_requestAccounts",params:[this.requestedLoginProvider,t.login_hint]},(0,a.nE)(e,i))}));if(Array.isArray(e)&&e.length>0)return e;throw new Error("Login failed")}catch(t){throw S.error("login failed",t),t}finally{this.communicationProvider.isIFrameFullScreen&&this.communicationProvider._displayIframe()}}async loginWithPrivateKey(t){if(!this.isInitialized)throw new Error("Call init() first");const{privateKey:e,userInfo:i}=t,{success:n}=await this.communicationProvider.request({method:"login_with_private_key",params:{privateKey:e,userInfo:i}});if(!n)throw new Error("Login Failed")}async logout(){if(!this.communicationProvider.isLoggedIn)throw new Error("Not logged in");await this.communicationProvider.request({method:o.vU.LOGOUT,params:[]}),this.requestedLoginProvider=null}async cleanUp(){this.communicationProvider.isLoggedIn&&await this.logout(),this.clearInit()}clearInit(){function t(t){return t instanceof Element||t instanceof Document}t(this.styleLink)&&window.document.body.contains(this.styleLink)&&(this.styleLink.remove(),this.styleLink=void 0),t(this.torusIframe)&&window.document.body.contains(this.torusIframe)&&(this.torusIframe.remove(),this.torusIframe=void 0),t(this.torusAlertContainer)&&window.document.body.contains(this.torusAlertContainer)&&(this.torusAlert=void 0,this.torusAlertContainer.remove(),this.torusAlertContainer=void 0),this.isInitialized=!1}hideTorusButton(){this.communicationProvider.hideTorusButton()}showTorusButton(){this.communicationProvider.showTorusButton()}async setProvider(t){await this.communicationProvider.request({method:o.vU.SET_PROVIDER,params:G({},t)})}async showWallet(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const i=await this.communicationProvider.request({method:o.vU.WALLET_INSTANCE_ID,params:[]}),n=t?"/".concat(t):"",r=new URL("".concat(this.torusUrl,"/wallet").concat(n));r.searchParams.append("instanceId",i),Object.keys(e).forEach((t=>{r.searchParams.append(t,e[t])})),this.dappStorageKey&&(r.hash="#dappStorageKey=".concat(this.dappStorageKey)),new x({url:r,features:j(k)}).open()}async getUserInfo(){return await this.communicationProvider.request({method:o.vU.USER_INFO,params:[]})}async initiateTopup(t,e){if(!this.isInitialized)throw new Error("Torus is not initialized");const i=T();return this.communicationProvider._handleWindow(i),await this.communicationProvider.request({method:o.vU.TOPUP,params:{provider:t,params:e,windowId:i}})}async getAccounts(){return await this.provider.request({method:"getAccounts",params:[]})}async sendTransaction(t){return await this.provider.request({method:"send_transaction",params:{message:t.serialize({requireAllSignatures:!1}).toString("hex")}})}async signTransaction(t){const e=await this.provider.request({method:"sign_transaction",params:{message:t.serializeMessage().toString("hex"),messageOnly:!0}}),i=JSON.parse(e),n={publicKey:new r.nh(i.publicKey),signature:w.from(i.signature,"hex")};return t.addSignature(n.publicKey,n.signature),t}async signAllTransactions(t){const e=t.map((t=>t.serializeMessage().toString("hex"))),i=(await this.provider.request({method:"sign_all_transactions",params:{message:e,messageOnly:!0}})).map((t=>{const e=JSON.parse(t);return{publicKey:new r.nh(e.publicKey),signature:w.from(e.signature,"hex")}}));return t.forEach(((t,e)=>(t.addSignature(i[e].publicKey,i[e].signature),t))),t}async signMessage(t){return await this.provider.request({method:"sign_message",params:{data:t}})}async getGaslessPublicKey(){return await this.provider.request({method:"get_gasless_public_key",params:[]})}handleDappStorageKey(t){let e="";if(X&&t){const t=window.localStorage.getItem(E.localStorageKey);if(t)e=t;else{const t="torus-app-".concat(T());window.localStorage.setItem(E.localStorageKey,t),e=t}}return this.dappStorageKey=e,e}async _setupWeb3(t){S.info("setupWeb3 running");const e=new a.XR({name:"embed_torus",target:"iframe_torus",targetWindow:this.torusIframe.contentWindow}),i=new a.XR({name:"embed_communication",target:"iframe_communication",targetWindow:this.torusIframe.contentWindow}),n=new K(e,{}),r=new Z(i,{});n.tryWindowHandle=(t,e)=>{const i=t;if(!Array.isArray(i)&&V.includes(i.method)){if(!this.communicationProvider.isLoggedIn)throw new Error("User Not Logged In");const t=T();r._handleWindow(t,{target:"_blank",features:j(N)}),i.windowId=t}n._rpcEngine.handle(i,e)},r.tryWindowHandle=(t,e)=>{const i=t;if(!Array.isArray(i)&&Y.includes(i.method)){const t=T();r._handleWindow(t,{target:"_blank",features:j(R)}),i.params.windowId=t}r._rpcEngine.handle(i,e)};const o=t=>{const e=n[t],i=this;n[t]=function(t,n){const{method:r,params:o=[]}=t;if("solana_requestAccounts"===r){if(!n)return i.login({loginProvider:o[0]});i.login({loginProvider:o[0]}).then((t=>n(null,t))).catch((t=>n(t)))}return e.apply(this,[t,n])}};o("request"),o("sendAsync"),o("send");const s=new Proxy(n,{deleteProperty:()=>!0}),c=new Proxy(r,{deleteProperty:()=>!0});this.provider=s,this.communicationProvider=c,await Promise.all([n._initializeState(),r._initializeState(G(G({},t),{},{dappStorageKey:this.dappStorageKey,torusAlertContainer:this.torusAlertContainer,torusIframe:this.torusIframe}))]),S.debug("Torus - injected provider")}}var Q=i(17291),$=i(44445);function tt(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function et(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?tt(Object(i),!0).forEach((function(e){(0,n.Z)(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):tt(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}class it extends Q.J5{constructor(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};super(),(0,n.Z)(this,"name",Q.rW.TORUS_SOLANA),(0,n.Z)(this,"adapterNamespace",Q.yk.SOLANA),(0,n.Z)(this,"currentChainNamespace",Q.EN.SOLANA),(0,n.Z)(this,"type",Q.hN.EXTERNAL),(0,n.Z)(this,"status",Q.MP.NOT_READY),(0,n.Z)(this,"torusInstance",null),(0,n.Z)(this,"torusWalletOptions",void 0),(0,n.Z)(this,"initParams",void 0),(0,n.Z)(this,"loginSettings",{}),(0,n.Z)(this,"solanaProvider",null),(0,n.Z)(this,"rehydrated",!1),this.torusWalletOptions=t.adapterSettings||{},this.initParams=t.initParams||{},this.loginSettings=t.loginSettings||{},this.chainConfig=t.chainConfig||null}get provider(){var t;return this.status===Q.MP.CONNECTED&&this.solanaProvider&&(null===(t=this.solanaProvider)||void 0===t?void 0:t.provider)||null}set provider(t){throw new Error("Not implemented")}async init(t){let e;if(super.checkInitializationRequirements(),this.chainConfig){const{chainId:t,blockExplorer:i,displayName:n,rpcTarget:r,ticker:o,tickerName:s}=this.chainConfig;e={chainId:t,rpcTarget:r,blockExplorerUrl:i,displayName:n,tickerName:s,ticker:o,logo:""}}else{this.chainConfig=(0,Q.h2)(Q.EN.SOLANA,"0x1");const{blockExplorer:t,displayName:i,ticker:n,tickerName:r,rpcTarget:o,chainId:s}=this.chainConfig;e={chainId:s,rpcTarget:o,blockExplorerUrl:t,displayName:i,ticker:n,tickerName:r,logo:""}}this.torusInstance=new J(this.torusWalletOptions),await this.torusInstance.init(et(et({showTorusButton:!1},this.initParams),{},{network:e})),this.solanaProvider=new $.TorusInjectedProvider({config:{chainConfig:this.chainConfig}}),this.status=Q.MP.READY,this.emit(Q.n2.READY,Q.rW.TORUS_SOLANA);try{t.autoConnect&&(this.rehydrated=!0,await this.connect())}catch(t){p().error("Failed to connect with cached torus solana provider",t),this.emit(Q.n2.ERRORED,t)}}async connect(){if(super.checkConnectionRequirements(),!this.torusInstance)throw Q.Ty.notReady("Torus wallet is not initialized");if(!this.solanaProvider)throw Q.Ty.notReady("Torus wallet is not initialized");this.status=Q.MP.CONNECTING,this.emit(Q.n2.CONNECTING,{adapter:Q.rW.TORUS_SOLANA});try{return await this.torusInstance.login(this.loginSettings),await this.solanaProvider.setupProvider(this.torusInstance.provider),this.status=Q.MP.CONNECTED,this.torusInstance.showTorusButton(),this.emit(Q.MP.CONNECTED,{adapter:Q.rW.TORUS_SOLANA,reconnected:this.rehydrated}),this.provider}catch(t){throw this.status=Q.MP.READY,this.rehydrated=!1,this.emit(Q.n2.ERRORED,t),Q.RM.connectionError("Failed to login with torus solana wallet")}}async disconnect(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{cleanup:!1};if(this.status!==Q.MP.CONNECTED)throw Q.RM.notConnectedError("Not connected with wallet");if(!this.torusInstance)throw Q.Ty.notReady("Torus wallet is not initialized");await this.torusInstance.logout(),t.cleanup?(this.status=Q.MP.NOT_READY,this.torusInstance=null,this.solanaProvider=null):this.status=Q.MP.READY,this.emit(Q.n2.DISCONNECTED)}async getUserInfo(){if(this.status!==Q.MP.CONNECTED)throw Q.RM.notConnectedError("Not connected with wallet");if(!this.torusInstance)throw Q.Ty.notReady("Torus wallet is not initialized");return await this.torusInstance.getUserInfo()}setAdapterSettings(t){}}},64063:t=>{t.exports=function t(e,i){if(e===i)return!0;if(e&&i&&"object"==typeof e&&"object"==typeof i){if(e.constructor!==i.constructor)return!1;var n,r,o;if(Array.isArray(e)){if((n=e.length)!=i.length)return!1;for(r=n;0!=r--;)if(!t(e[r],i[r]))return!1;return!0}if(e.constructor===RegExp)return e.source===i.source&&e.flags===i.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===i.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===i.toString();if((n=(o=Object.keys(e)).length)!==Object.keys(i).length)return!1;for(r=n;0!=r--;)if(!Object.prototype.hasOwnProperty.call(i,o[r]))return!1;for(r=n;0!=r--;){var s=o[r];if(!t(e[s],i[s]))return!1}return!0}return e!=e&&i!=i}},24970:t=>{const e=t=>null!==t&&"object"==typeof t&&"function"==typeof t.pipe;e.writable=t=>e(t)&&!1!==t.writable&&"function"==typeof t._write&&"object"==typeof t._writableState,e.readable=t=>e(t)&&!1!==t.readable&&"function"==typeof t._read&&"object"==typeof t._readableState,e.duplex=t=>e.writable(t)&&e.readable(t),e.transform=t=>e.duplex(t)&&"function"==typeof t._transform,t.exports=e}}]);