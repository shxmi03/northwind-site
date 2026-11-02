(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,612127,e=>{"use strict";var t=e.i(124890),r=e.i(925858),n=e.i(731203),i=e.i(884006),o=e.i(480218),a=e.i(117486),s=e.i(975157),c=e.i(593378),l=e.i(815602),m=e.i(778918);let d={type:"spring",stiffness:460,damping:24,mass:.7},p=[{key:"chatgpt",label:"ChatGPT",Logo:l.OpenAiClientLogo},{key:"claude",label:"Claude",Logo:l.ClaudeClientLogo},{key:"cursor",label:"Cursor",Logo:l.CursorClientLogo},{key:"gemini",label:"Gemini",Logo:l.GeminiClientLogo},{key:"grokbot",label:"Grok",Logo:l.GrokClientLogo},{key:"claude-code",label:"Claude Code",Logo:l.ClaudeCodeClientLogo}],u=[...p,...p];function h({label:e,Logo:r,itemKey:n,onPress:a,tabFocusable:c=!0}){let l=(0,o.useReducedMotion)();return(0,t.jsx)(i.motion.button,{type:"button",className:(0,s.cn)("mk2-mcp-logo-scroller__mark","rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--astral-primary)_30%,transparent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--app-canvas)]"),"aria-label":`Connect ${e} with Astral — sign up`,"data-logo":n,tabIndex:c?0:-1,onClick:a,whileHover:l?void 0:{scale:1.06},whileTap:l?void 0:{scale:.94},transition:l?{duration:0}:d,children:(0,t.jsx)(r,{className:"mk2-mcp-logo-scroller__logo","aria-hidden":!0})})}function g({setIndex:e,hiddenFromAssistiveTech:r,onPress:n}){return(0,t.jsx)("div",{className:"mk2-mcp-logo-scroller__set","aria-hidden":!!r||void 0,children:u.map(({key:i,label:o,Logo:a},s)=>(0,t.jsx)(h,{itemKey:i,label:o,Logo:a,onPress:n,tabFocusable:!r},`${e}-${s}-${i}`))})}e.s(["default",0,function({variant:e="compact"}){let i=(0,o.useReducedMotion)(),l=(0,n.useRouter)(),d=(0,a.useLandingSignupPrompt)(),p=(0,r.useRef)(null),u=(0,c.useNearViewport)(p,"120px 0px",{once:!1}),h=(0,r.useCallback)(()=>{d?d.openSignupPrompt({href:m.SIGN_UP_HREF,detail:"Create your account, then subscribe to connect Astral MCP to your AI apps."}):l.push(m.SIGN_UP_HREF)},[l,d]);return(0,t.jsxs)("section",{ref:p,className:(0,s.cn)("mk2-mcp-logo-scroller",`mk2-mcp-logo-scroller--${e}`,u&&"is-active"),id:"connect","aria-label":"Supported AI apps",children:[(0,t.jsx)("div",{className:"mk2-mcp-logo-scroller__viewport",children:(0,t.jsxs)("div",{className:(0,s.cn)("mk2-mcp-logo-scroller__track",i&&"mk2-mcp-logo-scroller__track--static"),children:[(0,t.jsx)(g,{setIndex:0,hiddenFromAssistiveTech:!1,onPress:h}),(0,t.jsx)(g,{setIndex:1,hiddenFromAssistiveTech:!0,onPress:h})]})}),"full"===e?(0,t.jsx)("p",{className:"mk2-mcp-logo-scroller__caption",children:"One secure endpoint connects Astral to the AI apps you already use."}):null]})}])},815602,e=>{"use strict";var t=e.i(124890);let r={"aria-hidden":!0,focusable:"false"};e.s(["ClaudeClientLogo",0,function(e){return(0,t.jsx)("svg",{...r,...e,viewBox:"0 0 125 125",fill:"none",children:(0,t.jsx)("path",{fill:"#D97757",d:"M54.375 118.75L56.125 111L58.125 101L59.75 93L61.25 83.125L62.125 79.875L62 79.625L61.375 79.75L53.875 90L42.5 105.375L33.5 114.875L31.375 115.75L27.625 113.875L28 110.375L30.125 107.375L42.5 91.5L50 81.625L54.875 76L54.75 75.25H54.5L21.5 96.75L15.625 97.5L13 95.125L13.375 91.25L14.625 90L24.5 83.125L49.125 69.375L49.5 68.125L49.125 67.5H47.875L43.75 67.25L29.75 66.875L17.625 66.375L5.75 65.75L2.75 65.125L0 61.375L0.25 59.5L2.75 57.875L6.375 58.125L14.25 58.75L26.125 59.5L34.75 60L47.5 61.375H49.5L49.75 60.5L49.125 60L48.625 59.5L36.25 51.25L23 42.5L16 37.375L12.25 34.75L10.375 32.375L9.625 27.125L13 23.375L17.625 23.75L18.75 24L23.375 27.625L33.25 35.25L46.25 44.875L48.125 46.375L49 45.875V45.5L48.125 44.125L41.125 31.375L33.625 18.375L30.25 13L29.375 9.75C29.0417 8.625 28.875 7.375 28.875 6L32.75 0.750006L34.875 0L40.125 0.750006L42.25 2.625L45.5 10L50.625 21.625L58.75 37.375L61.125 42.125L62.375 46.375L62.875 47.75H63.75V47L64.375 38L65.625 27.125L66.875 13.125L67.25 9.125L69.25 4.375L73.125 1.87501L76.125 3.25L78.625 6.875L78.25 9.125L76.875 18.75L73.875 33.875L72 44.125H73.125L74.375 42.75L79.5 36L88.125 25.25L91.875 21L96.375 16.25L99.25 14H104.625L108.5 19.875L106.75 26L101.25 33L96.625 38.875L90 47.75L86 54.875L86.375 55.375H87.25L102.125 52.125L110.25 50.75L119.75 49.125L124.125 51.125L124.625 53.125L122.875 57.375L112.625 59.875L100.625 62.25L82.75 66.5L82.5 66.625L82.75 67L90.75 67.75L94.25 68H102.75L118.5 69.125L122.625 71.875L125 75.125L124.625 77.75L118.25 80.875L109.75 78.875L89.75 74.125L83 72.5H82V73L87.75 78.625L98.125 88L111.25 100.125L111.875 103.125L110.25 105.625L108.5 105.375L97 96.625L92.5 92.75L82.5 84.375H81.875V85.25L84.125 88.625L96.375 107L97 112.625L96.125 114.375L92.875 115.5L89.5 114.875L82.25 104.875L74.875 93.5L68.875 83.375L68.25 83.875L64.625 121.625L63 123.5L59.25 125L56.125 122.625L54.375 118.75Z"})})},"ClaudeCodeClientLogo",0,function(e){return(0,t.jsx)("svg",{...r,...e,viewBox:"0 0 24 24",fill:"none",children:(0,t.jsx)("path",{clipRule:"evenodd",fill:"#D97757",fillRule:"evenodd",d:"M20.998 10.949H24v3.102h-3v3.028h-1.487V20H18v-2.921h-1.487V20H15v-2.921H9V20H7.488v-2.921H6V20H4.487v-2.921H3V14.05H0V10.95h3V5h17.998v5.949zM6 10.949h1.488V8.102H6v2.847zm10.51 0H18V8.102h-1.49v2.847z"})})},"CursorClientLogo",0,function(e){return(0,t.jsx)("svg",{...r,...e,viewBox:"0 0 24 24",fill:"currentColor",children:(0,t.jsx)("path",{d:"M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23"})})},"GeminiClientLogo",0,function(e){return(0,t.jsx)("svg",{...r,...e,viewBox:"0 0 24 24",fill:"none",children:(0,t.jsx)("image",{href:"https://www.gstatic.com/lamda/images/gemini_sparkle_4g_512_lt_f94943af3be039176192d.png",width:"24",height:"24",preserveAspectRatio:"xMidYMid meet"})})},"GrokClientLogo",0,function(e){return(0,t.jsxs)("svg",{...r,...e,viewBox:"0 0 1024 1024",fill:"currentColor",children:[(0,t.jsx)("path",{d:"M395.479 633.828L735.91 381.105C752.599 368.715 776.454 373.548 784.406 392.792C826.26 494.285 807.561 616.253 724.288 699.996C641.016 783.739 525.151 802.104 419.247 760.277L303.556 814.143C469.49 928.202 670.987 899.995 796.901 773.282C896.776 672.843 927.708 535.937 898.785 412.476L899.047 412.739C857.105 231.37 909.358 158.874 1016.4 10.6326C1018.93 7.11771 1021.47 3.60279 1024 0L883.144 141.651V141.212L395.392 633.916"}),(0,t.jsx)("path",{d:"M325.226 695.251C206.128 580.84 226.662 403.776 328.285 301.668C403.431 226.097 526.549 195.254 634.026 240.596L749.454 186.994C728.657 171.88 702.007 155.623 671.424 144.2C533.19 86.9942 367.693 115.465 255.323 228.382C147.234 337.081 113.244 504.215 171.613 646.833C215.216 753.423 143.739 828.818 71.7385 904.916C46.2237 931.893 20.6216 958.87 0 987.429L325.139 695.339"})]})},"OpenAiClientLogo",0,function(e){return(0,t.jsx)("svg",{...r,...e,viewBox:"0 0 24 24",fill:"currentColor",children:(0,t.jsx)("path",{d:"M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654 2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"})})},"OtherClientLogo",0,function(e){return(0,t.jsxs)("svg",{...r,...e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,t.jsx)("path",{d:"M8 3.5H6.5A2.5 2.5 0 0 0 4 6v3.5A2.5 2.5 0 0 1 1.5 12 2.5 2.5 0 0 1 4 14.5V18a2.5 2.5 0 0 0 2.5 2.5H8"}),(0,t.jsx)("path",{d:"M16 3.5h1.5A2.5 2.5 0 0 1 20 6v3.5a2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0-2.5 2.5V18a2.5 2.5 0 0 1-2.5 2.5H16"})]})}])},827436,e=>{"use strict";var t=e.i(124890),r=e.i(131300),n=e.i(300607),i=e.i(250572);let o=(0,i.default)("braces",[["path",{d:"M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1",key:"ezmyqa"}],["path",{d:"M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1",key:"e1hn23"}]]);var a=e.i(255229),s=e.i(77855),c=e.i(249129);let l=(0,i.default)("mic",[["path",{d:"M12 19v3",key:"npa21l"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["rect",{x:"9",y:"2",width:"6",height:"13",rx:"3",key:"s6n7sd"}]]);var m=e.i(802507),d=e.i(49659),p=e.i(651789),u=e.i(925858),h=e.i(146113),g=e.i(884006),f=e.i(480218),b=e.i(360844),v=e.i(593378),k=e.i(815602),y=e.i(234905);let w=[{key:"research",label:"Research",icon:d.Search,prompt:"Pull up AAPL daily with SMA 10 and overlay my latest backtest trades.",intent:"I’ll pull the daily AAPL series, add a 10-day simple moving average, and match it with your most recent authorized backtest. Then I’ll place the entries and exits on the same chart so the signal timing is easy to inspect.",tool:"Market chart",response:"AAPL closed at $251.68 and remains above SMA 10.",metrics:[{label:"Close",value:"$251.68"},{label:"vs SMA 10",value:"Above"},{label:"2025 return",value:"+33.48%"},{label:"Overlay trades",value:"2 completed"}],followUp:"Open a trade for entry/exit detail, or add SMA 50 to the chart.",resultLabel:"AAPL research chart",cardId:"chart_setup_card"},{key:"build",label:"Build",icon:o,prompt:"Build a quality-momentum strategy for AAPL, MSFT, and NVDA with an explicit risk exit.",intent:"I’ll translate that idea into a structured strategy with a fixed universe, quality and momentum entry conditions, position sizing, and an explicit risk exit. I’ll keep every rule inspectable before anything is saved or deployed.",tool:"Strategy builder",response:"Quality Momentum draft is ready with explicit entry, sizing, and risk rules.",metrics:[{label:"Universe",value:"AAPL, MSFT, NVDA"},{label:"Entry",value:"SMA 200 + ROC(90) > 8%"},{label:"Sizing",value:"30% per position"},{label:"Risk exit",value:"Close < SMA 200"}],followUp:"Review sizing before backtesting, or run this spec as written.",resultLabel:"Inspectable strategy rules",cardId:"strategy_card"},{key:"backtest",label:"Backtest",icon:c.FlaskConical,prompt:"Backtest the strategy over 2025 with next-open fills, commission, and slippage.",intent:"I’ll test the current strategy across 2025 using next-open execution and include both commission and slippage in the simulation. That keeps the result closer to the conditions an actual deployment would face.",tool:"Backtest engine",response:"2025 backtest finished with next-open fills and trading costs included.",metrics:[{label:"Total return",value:"28.4%"},{label:"Sharpe",value:"1.74"},{label:"Max drawdown",value:"8.2%"},{label:"Win rate",value:"61.7%"}],followUp:"Compare to SPY or inspect the largest drawdown before deploying.",resultLabel:"Backtest performance",cardId:"backtest_card"},{key:"trade",label:"Trade",icon:p.WalletCards,prompt:"Preview a limit buy of 12.5 AAPL at $207.25 on my paper account.",intent:"I’ll build a paper-order preview and validate the account, symbol, fractional quantity, limit price, and available buying power. This is only a review step, so no order will be transmitted yet.",tool:"Order preview",response:"Paper preview passed validation — not submitted yet.",metrics:[{label:"Order",value:"Buy 12.5 AAPL"},{label:"Limit",value:"$207.25 GTC"},{label:"Est. notional",value:"$2,590.63"},{label:"Status",value:"Not submitted"}],followUp:"Confirm to submit, or adjust the ticket and regenerate the preview.",resultLabel:"Order preview — confirmation required",cardId:"order_preview_card"},{key:"monitor",label:"Monitor",icon:r.Activity,prompt:"Show my active strategy deployments and their current status.",intent:"I’ll retrieve every active paper and live deployment authorized for this account, then summarize its mode, capital allocation, running assets, and latest status without changing anything.",tool:"Deployment status",response:"Two active deployments across paper and live — both reporting healthy status.",metrics:[{label:"Quality Momentum",value:"Paper · $25k · +28.4%"},{label:"Defensive Rotation",value:"Live · $50k · +14.1%"},{label:"Allocated",value:"$75,000"},{label:"Assets tracked",value:"6 symbols"}],followUp:"Open either deployment for weights and recent executions.",resultLabel:"Live deployment status",cardId:"deployments_card"}];e.s(["default",0,function(){let[e,r]=(0,u.useState)(w[0].key),i=(0,f.useReducedMotion)(),o=(0,u.useId)(),c=(0,u.useRef)(null),d=(0,u.useRef)(null),p=(0,u.useRef)([]),L=(0,v.useNearViewport)(c,"300px 0px"),x=(0,v.useNearViewport)(c,"120px 0px",{once:!1}),_=Math.max(0,w.findIndex(t=>t.key===e)),j=w[_];(0,u.useEffect)(()=>{if(!x)return;let e=window.matchMedia("(prefers-reduced-motion: reduce)").matches,t=()=>{let t=d.current;t&&t.scrollTo({top:t.scrollHeight,behavior:e?"auto":"smooth"})};if(e){let e=window.requestAnimationFrame(t);return()=>window.cancelAnimationFrame(e)}let r=window.setTimeout(t,1750),n=window.setTimeout(t,2600),i=window.setTimeout(t,3800),o=window.setTimeout(t,4600);return()=>{window.clearTimeout(r),window.clearTimeout(n),window.clearTimeout(i),window.clearTimeout(o)}},[e,x]);let C=e=>{let t=(e+w.length)%w.length;r(w[t].key),requestAnimationFrame(()=>p.current[t]?.focus())};return(0,t.jsxs)("div",{ref:c,id:"how-it-works",className:`mk2-mcp-how${x?" is-active":""}`,"data-oid":"mcp-how-it-works",children:[(0,t.jsx)(h.LayoutGroup,{id:"mk2-mcp-how-tabs",children:(0,t.jsx)("div",{className:"mk2-mcp-how__tabs",role:"tablist","aria-label":"Astral MCP workflows",children:w.map((n,a)=>{let s=n.icon,c=n.key===e;return(0,t.jsxs)("button",{ref:e=>{p.current[a]=e},id:`${o}-${n.key}-tab`,type:"button",role:"tab","aria-selected":c,"aria-controls":`${o}-${n.key}-panel`,tabIndex:c?0:-1,className:c?"is-active":"",onClick:()=>r(n.key),onKeyDown:e=>{"ArrowRight"===e.key?(e.preventDefault(),C(a+1)):"ArrowLeft"===e.key?(e.preventDefault(),C(a-1)):"Home"===e.key?(e.preventDefault(),C(0)):"End"===e.key&&(e.preventDefault(),C(w.length-1))},children:[c?(0,t.jsx)(g.motion.span,{"aria-hidden":!0,layoutId:"mk2-mcp-how-tab-indicator",className:"mk2-pill-tab-indicator",transition:i?{duration:0}:{type:"spring",stiffness:520,damping:38,mass:.9}}):null,(0,t.jsxs)("span",{className:"mk2-mcp-how__tab-content",children:[(0,t.jsx)(s,{"aria-hidden":!0,size:14,strokeWidth:1.65}),(0,t.jsx)("span",{children:n.label})]})]},n.key)})})}),(0,t.jsx)("div",{id:`${o}-${j.key}-panel`,className:"mk2-mcp-how__stage",role:"tabpanel","aria-labelledby":`${o}-${j.key}-tab`,children:(0,t.jsxs)("section",{className:"mk2-mcp-how__conversation","aria-label":`${j.label} conversation`,children:[(0,t.jsx)("div",{className:"mk2-mcp-how__chat-header",children:(0,t.jsxs)("div",{className:"mk2-mcp-how__client-title",children:[(0,t.jsx)(k.OpenAiClientLogo,{className:"mk2-mcp-how__client-logo"}),(0,t.jsx)("span",{children:"ChatGPT"}),(0,t.jsx)(a.ChevronDown,{"aria-hidden":!0,size:13,strokeWidth:1.7})]})}),(0,t.jsx)(b.default,{className:"mk2-mcp-how__thread-scroll",containerRef:d,dataOid:"mcp-how-chat-thread",scrollbarWidth:4,showTrackOnScroll:!0,showTrackOnHover:!0,children:(0,t.jsxs)("div",{className:"mk2-mcp-how__thread",children:[(0,t.jsx)("div",{className:"mk2-mcp-how__user-row",children:(0,t.jsx)("p",{className:"mk2-mcp-how__prompt",children:j.prompt})}),(0,t.jsx)("div",{className:"mk2-mcp-how__assistant-message",children:(0,t.jsxs)("div",{className:"mk2-mcp-how__assistant-body",children:[(0,t.jsx)("p",{className:"mk2-mcp-how__intent",children:j.intent}),(0,t.jsx)("div",{className:"mk2-mcp-how__tool-call",children:(0,t.jsxs)("div",{className:"mk2-mcp-how__tool-summary",children:[(0,t.jsx)("span",{className:"mk2-mcp-how__astral-mark","aria-hidden":!0}),(0,t.jsxs)("div",{children:[(0,t.jsx)("strong",{children:"Astral MCP"}),(0,t.jsx)("span",{children:j.tool})]}),(0,t.jsxs)("span",{className:"mk2-mcp-how__tool-status",children:[(0,t.jsx)(s.Check,{"aria-hidden":!0,size:11,strokeWidth:2.2}),"Returned"]})]})}),(0,t.jsxs)("div",{className:"mk2-mcp-how__response",children:[(0,t.jsx)("p",{children:j.response}),(0,t.jsx)("div",{className:"mk2-mcp-how__metric-grid",children:j.metrics.map(e=>(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{children:e.label}),(0,t.jsx)("strong",{children:e.value})]},e.label))})]}),(0,t.jsx)("div",{className:"mk2-mcp-how__inline-card","aria-label":j.resultLabel,children:L?(0,t.jsx)(y.McpLiveCard,{cardId:j.cardId,label:j.resultLabel,blendWithHost:!0,compact:!0}):(0,t.jsx)("span",{className:"mk2-mcp-how__loading",children:"Preparing card"})}),(0,t.jsx)("p",{className:"mk2-mcp-how__follow-up",children:j.followUp})]})})]})}),(0,t.jsxs)("div",{className:"mk2-mcp-how__composer","aria-hidden":!0,children:[(0,t.jsx)("span",{className:"mk2-mcp-how__composer-plus",children:(0,t.jsx)(m.Plus,{size:14,strokeWidth:1.6})}),(0,t.jsx)("span",{className:"mk2-mcp-how__composer-placeholder",children:"Message ChatGPT"}),(0,t.jsx)("span",{className:"mk2-mcp-how__composer-mic",children:(0,t.jsx)(l,{size:14,strokeWidth:1.7})}),(0,t.jsx)("span",{className:"mk2-mcp-how__composer-send",children:(0,t.jsx)(n.ArrowUp,{size:14,strokeWidth:1.9})})]})]})},j.key)]})}],827436)},234905,e=>{"use strict";var t=e.i(124890),r=e.i(925858),n=e.i(275144);function i(e){return JSON.parse(JSON.stringify(e))}function o(e,t){let r=e;for(let e of t||[]){if(null==r||"object"!=typeof r)return;r=r[e]}return r}function a(e,t,r){let n=document.createElement("div");n.style.cssText=`position:absolute;visibility:hidden;pointer-events:none;background:${t};`,e.appendChild(n);let i=getComputedStyle(n).backgroundColor;return n.remove(),i&&"rgba(0, 0, 0, 0)"!==i?i:r}function s(e,t,r){let n=t.borderSecondary,i=t.borderPrimary,o=`
:root {
  color-scheme: ${r} !important;
  --bg: transparent !important;
  --card-bg: ${t.secondary} !important;
  --well-bg: ${t.primary} !important;
  --text: ${t.textPrimary} !important;
  --text-secondary: ${t.textSecondary} !important;
  --chart-surface: transparent !important;
  --metric-grid-divider: ${n} !important;
  --stat-divider: ${n} !important;
  --hairline: ${n} !important;
  --hairline-strong: ${i} !important;
  --border-soft: ${n} !important;
  --divider: ${n} !important;
  --panel-border: ${i} !important;
  --inner-border: ${n} !important;
}
#root,
#root.card,
.card {
  background: ${t.secondary} !important;
  border: 1px solid ${i} !important;
  border-radius: 12px;
  box-shadow: none !important;
}
.stats.summary,
.stats.summary.metric-grid,
.metric-grid.summary {
  gap: 0 !important;
  padding: 0 !important;
  background: transparent !important;
  border: 1px solid ${n} !important;
  overflow: hidden !important;
}
.stats.summary .stat,
.metric-grid.summary .stat {
  background: ${t.secondary} !important;
  border-right: 1px solid ${n} !important;
  border-bottom: 1px solid ${n} !important;
  box-sizing: border-box !important;
}
.stats.summary.cols-4 .stat:nth-child(4n),
.metric-grid.summary.cols-4 .stat:nth-child(4n) {
  border-right: 0 !important;
}
.stats.summary.cols-4 .stat:nth-child(n+5),
.metric-grid.summary.cols-4 .stat:nth-child(n+5) {
  border-bottom: 0 !important;
}
.stats.summary.cols-3 .stat:nth-child(3n),
.stats.summary.cols-3 .stat:nth-child(3n),
.stats.summary.stats--3 .stat:nth-child(3n),
.metric-grid.summary.cols-3 .stat:nth-child(3n) {
  border-right: 0 !important;
}
.stats.summary.cols-3 .stat:nth-child(n+4),
.stats.summary.stats--3 .stat:nth-child(n+4),
.metric-grid.summary.cols-3 .stat:nth-child(n+4) {
  border-bottom: 0 !important;
}
.stats.summary.cols-2 .stat:nth-child(2n),
.metric-grid.summary.cols-2 .stat:nth-child(2n) {
  border-right: 0 !important;
}
.stats.summary.cols-2 .stat:nth-child(n+3),
.metric-grid.summary.cols-2 .stat:nth-child(n+3) {
  border-bottom: 0 !important;
}
`;u(e?.contentDocument,"mk2-mcp-host-blend",o)}let c={dataset_card:440,chart_setup_card:540,strategy_card:680,backtest_card:580,broker_connect_card:500,order_preview_card:560,positions_card:580,deployments_card:700,execution_history_card:540};function l(e){return c[e]??480}let m=`
.table-wrap,
.cmp-table-wrap {
  overflow: hidden !important;
}
.table-wrap table,
.cmp-table {
  min-width: 0 !important;
  width: 100% !important;
}
#chart,
#preview-price-chart,
#order-price-chart,
#drawdown-chart,
.price-chart,
.chart-wrap,
.chart-preview,
.equity-chart-section,
.backtest-body,
.tv-lightweight-charts,
.tv-lightweight-charts table {
  width: 100% !important;
  max-width: 100% !important;
}
.chart-wrap svg,
.chart-preview svg,
.backtest-body svg,
[data-chart] svg {
  display: block;
  width: 100% !important;
  max-width: 100% !important;
}
.chart-axis,
.curve-axis {
  paint-order: stroke fill;
  stroke: var(--card-bg, #111111);
  stroke-width: 4px;
  stroke-linejoin: round;
}
`,d="#chart,#preview-price-chart,#order-price-chart,#drawdown-chart,.price-chart,[data-chart]",p=`
html.mk2-mcp-pending .fade-in,
html.mk2-mcp-pending .table-wrap tbody tr,
html.mk2-mcp-pending .position-row,
html.mk2-mcp-pending .broker-row,
html.mk2-mcp-pending .history-entry,
html.mk2-mcp-pending .deployment,
html.mk2-mcp-pending .metric-grid .stat {
  opacity: 0;
}
html.mk2-mcp-pending .chart-preview svg,
html.mk2-mcp-pending .chart-wrap svg,
html.mk2-mcp-pending #chart,
html.mk2-mcp-pending #preview-price-chart,
html.mk2-mcp-pending #order-price-chart,
html.mk2-mcp-pending .price-chart,
html.mk2-mcp-pending .equity-chart-section {
  clip-path: inset(0 100% 0 0);
}
@keyframes mk2-mcp-enter {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes mk2-mcp-chart-draw {
  from { clip-path: inset(0 100% 0 0); }
  to { clip-path: inset(0 0 0 0); }
}
@keyframes mk2-mcp-enter-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}
html.mk2-mcp-motion .fade-in {
  animation: mk2-mcp-enter .55s cubic-bezier(.16, 1, .3, 1) var(--astral-enter-delay, 0ms) both !important;
}
html.mk2-mcp-motion .table-wrap.fade-in,
html.mk2-mcp-motion .positions-list.fade-in,
html.mk2-mcp-motion .history-list.fade-in,
html.mk2-mcp-motion .broker-section.fade-in,
html.mk2-mcp-motion .deployments {
  animation: none !important;
  opacity: 1 !important;
  transform: none !important;
}
html.mk2-mcp-motion .table-wrap tbody tr {
  animation: mk2-mcp-enter-fade .5s cubic-bezier(.16, 1, .3, 1) var(--astral-enter-delay, 0ms) both;
}
html.mk2-mcp-motion .position-row,
html.mk2-mcp-motion .broker-row,
html.mk2-mcp-motion .history-entry,
html.mk2-mcp-motion .deployment,
html.mk2-mcp-motion .metric-grid .stat {
  animation: mk2-mcp-enter .5s cubic-bezier(.16, 1, .3, 1) var(--astral-enter-delay, 0ms) both;
}
html.mk2-mcp-motion .chart-preview svg,
html.mk2-mcp-motion .chart-wrap svg,
html.mk2-mcp-motion #chart,
html.mk2-mcp-motion #preview-price-chart,
html.mk2-mcp-motion #order-price-chart,
html.mk2-mcp-motion .price-chart,
html.mk2-mcp-motion .equity-chart-section {
  animation: mk2-mcp-chart-draw 1.05s cubic-bezier(.16, 1, .3, 1) .12s both;
}
html.mk2-mcp-motion .position-alloc-fill {
  transform-origin: left center;
  animation: mk2-mcp-bar .7s cubic-bezier(.16, 1, .3, 1) .18s both;
}
@media (prefers-reduced-motion: reduce) {
  html.mk2-mcp-pending .fade-in,
  html.mk2-mcp-pending .table-wrap tbody tr,
  html.mk2-mcp-pending .position-row,
  html.mk2-mcp-pending .broker-row,
  html.mk2-mcp-pending .history-entry,
  html.mk2-mcp-pending .deployment,
  html.mk2-mcp-pending .metric-grid .stat {
    opacity: 1;
  }
  html.mk2-mcp-pending .chart-preview svg,
  html.mk2-mcp-pending .chart-wrap svg,
  html.mk2-mcp-pending #chart,
  html.mk2-mcp-pending #preview-price-chart,
  html.mk2-mcp-pending #order-price-chart,
  html.mk2-mcp-pending .price-chart,
  html.mk2-mcp-pending .equity-chart-section {
    clip-path: none;
  }
  html.mk2-mcp-motion .fade-in,
  html.mk2-mcp-motion .table-wrap tbody tr,
  html.mk2-mcp-motion .position-row,
  html.mk2-mcp-motion .broker-row,
  html.mk2-mcp-motion .history-entry,
  html.mk2-mcp-motion .deployment,
  html.mk2-mcp-motion .metric-grid .stat,
  html.mk2-mcp-motion .chart-preview svg,
  html.mk2-mcp-motion .chart-wrap svg,
  html.mk2-mcp-motion #chart,
  html.mk2-mcp-motion #preview-price-chart,
  html.mk2-mcp-motion #order-price-chart,
  html.mk2-mcp-motion .price-chart,
  html.mk2-mcp-motion .equity-chart-section,
  html.mk2-mcp-motion .position-alloc-fill {
    animation: none !important;
    opacity: 1 !important;
    clip-path: none !important;
    transform: none !important;
  }
}
`;function u(e,t,r){if(!e?.head)return;let n=e.getElementById(t);n||((n=e.createElement("style")).id=t,e.head.appendChild(n)),n.textContent!==r&&(n.textContent=r)}function h(e){u(e?.contentDocument,"mk2-mcp-chart-fit",m)}function g(e){let t=e?.contentDocument;t?.documentElement&&(u(t,"mk2-mcp-motion",p),t.documentElement.classList.contains("mk2-mcp-motion")||t.documentElement.classList.add("mk2-mcp-pending"))}e.s(["McpLiveCard",0,function({cardId:e,label:c,blendWithHost:m=!1,compact:p=!1}){let{resolvedTheme:u}=(0,n.useTheme)(),f=(0,r.useRef)(null),b=(0,r.useRef)(null),v=(0,r.useRef)(null),k=(0,r.useRef)(!1),y=(0,r.useRef)(!1),w=(0,r.useRef)(u),L=(0,r.useRef)(480),x=(0,r.useRef)(l(e)),_=(0,r.useRef)(null),j=(0,r.useRef)(!1),C=(0,r.useRef)(!1),A=(0,r.useRef)(0),M=(0,r.useRef)(!1),$=(0,r.useRef)(null),N=(0,r.useRef)(null),S=(0,r.useRef)(null),R=(0,r.useRef)(0),P=(0,r.useRef)(m),T=(0,r.useRef)(null),[z,H]=(0,r.useState)(!0),[I,E]=(0,r.useState)(null),[V,D]=(0,r.useState)(()=>l(e)),[O,q]=(0,r.useState)(!1);w.current=u,P.current=m;let B=Math.max(120,Math.round(V*(p?.76:1))),W=()=>{var e,t,r;let n,i,o,a,s,c,l;return e=w.current,t=L.current,r=P.current?T.current:null,n="light"===e,i=r?.secondary??(n?"#ffffff":"#111111"),o=r?.primary??(n?"#f5f5f7":"#0f0f0f"),a=r?.textPrimary??(n?"#1c1c1e":"#ffffff"),s=r?.textSecondary??(n?"#6e6e73":"#8e8e93"),c=r?.borderPrimary??(n?"rgba(0,0,0,.12)":"rgba(255,255,255,.12)"),{theme:e,displayMode:"inline",containerDimensions:{width:t,maxHeight:1600},styles:{variables:{"--color-background-primary":i,"--color-background-secondary":o,"--color-text-primary":a,"--color-text-secondary":s,"--color-border-primary":c,"--color-border-secondary":l=r?.borderSecondary??(n?"rgba(0,0,0,.08)":"rgba(255,255,255,.08)"),"--color-text-success":n?"#00a832":"#00c805","--color-text-danger":n?"#ff3b30":"#ff5000","--color-text-warning":"#ff9f0a","--card-bg":i,"--well-bg":o,"--text":a,"--text-secondary":s,"--hairline":l,"--hairline-strong":c}}}},F=()=>{let e=b.current;!function(e,t){e&&(e.style.colorScheme=t);let r=e?.contentDocument?.documentElement;if(!r)return;r.setAttribute("data-theme",t),r.style.colorScheme=t;let n=e.contentDocument?.body;n&&(n.style.colorScheme=t)}(e,w.current),(()=>{if(!P.current){T.current=null;return}T.current=function(e,t){let r=e?.closest(".mk2-mcp-how__conversation");if(!r)return null;let n=getComputedStyle(r).backgroundColor,i="light"===t;return{primary:n,secondary:a(r,"var(--app-widget-inner-bg)",i?"rgb(236, 237, 239)":"rgb(15, 17, 19)"),borderPrimary:a(r,"var(--app-widget-inner-border)",i?"rgba(0, 0, 0, 0.12)":"rgba(255, 255, 255, 0.12)"),borderSecondary:a(r,"var(--app-divider)",i?"rgba(0, 0, 0, 0.08)":"rgba(255, 255, 255, 0.08)"),textPrimary:a(r,"var(--text)",i?"rgb(28, 28, 30)":"rgb(255, 255, 255)"),textSecondary:a(r,"var(--astral-55)",i?"rgb(110, 110, 115)":"rgb(142, 142, 147)")}}(f.current,w.current),T.current&&b.current&&s(b.current,T.current,w.current)})(),e?.contentWindow?.postMessage({jsonrpc:"2.0",method:"ui/notifications/host-context-changed",params:W()},"*")},G=e=>{null!=e.current&&(window.clearTimeout(e.current),e.current=null)},U=e=>{!M.current&&j.current&&C.current&&(G($),$.current=window.setTimeout(()=>{!M.current&&j.current&&(!function(e){let t=e?.contentDocument,r=t?.documentElement;if(t&&r){if(g(e),function(e){try{return!!e?.defaultView?.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{return!1}}(t)){r.classList.remove("mk2-mcp-pending"),r.classList.add("mk2-mcp-motion");return}t.querySelectorAll(".fade-in").forEach((e,t)=>{e.style.setProperty("--astral-enter-delay",`${Math.min(70*t,420)}ms`)}),t.querySelectorAll(".table-wrap tbody tr,.position-row,.broker-row,.history-entry,.deployment,.metric-grid .stat").forEach((e,t)=>{e.style.setProperty("--astral-enter-delay",`${80+Math.min(48*t,520)}ms`)}),r.classList.remove("mk2-mcp-pending"),r.classList.add("mk2-mcp-motion")}}(b.current),M.current=!0)},e))},K=()=>{C.current||(C.current=!0,q(!0)),U(120)},J=e=>{if(!Number.isFinite(e)||e<=0)return;let t=Math.max(160,Math.ceil(e)+1);if(G(N),A.current=0,R.current=0,Math.abs(t-x.current)>=2){x.current=t,D(t),C.current||(G(S),S.current=window.setTimeout(K,48));return}x.current=t,C.current||K()},Q=e=>{G(N),A.current+=1;let t=function(e){let t=e?.contentDocument?.getElementById("root");if(!t||function(e){if(e.querySelector("#loading"))return!0;let t=1===e.childElementCount?e.firstElementChild:null;return!!(t&&t.classList.contains("state")&&!t.classList.contains("state-view"))}(t))return 0;let r=0;for(let e of t.children)r=Math.max(r,e.offsetTop+e.offsetHeight);return Math.ceil(Math.max(r,t.scrollHeight,t.offsetHeight))}(e),r=A.current>=24;if((t<=0||!function(e){let t=e?.contentDocument;if(!t)return!1;let r=[...t.querySelectorAll(d)];return!r.length||r.every(e=>!!e.querySelector("canvas, svg")&&e.offsetHeight>24)}(e))&&!r){N.current=window.setTimeout(()=>Q(e),50);return}t<=0?J(x.current):r||R.current>0&&3>Math.abs(t-R.current)?J(Math.max(t,R.current)):(R.current=t,N.current=window.setTimeout(()=>Q(e),70))},Y=e=>{P.current&&T.current&&s(e,T.current,w.current),function(e){let t=e?.contentDocument,r=e?.contentWindow;if(!t||!r)return;h(e);let n=[...t.querySelectorAll(d)];n.length?(n.forEach(e=>{let t=Math.round(e.getBoundingClientRect().width);t<=1||(e.style.width=`${t-1}px`)}),r.requestAnimationFrame(()=>{n.forEach(e=>{e.style.width="100%"}),r.dispatchEvent(new Event("resize"))})):r.dispatchEvent(new Event("resize"))}(e),Q(e)},Z=e=>{_.current?.disconnect(),_.current=null;let t=e?.contentDocument?.getElementById("root");if(!t)return;h(e),g(e);let r=new ResizeObserver(()=>{Q(e)});r.observe(t),_.current=r,Y(e)};(0,r.useEffect)(()=>{let e=f.current;if(!e)return;let t=new IntersectionObserver(([e])=>{e.isIntersecting&&H(!0)},{rootMargin:"1400px 0px"}),r=new IntersectionObserver(([e])=>{j.current=e.isIntersecting,e.isIntersecting&&U(C.current?60:300)},{threshold:.22,rootMargin:"0px 0px -8% 0px"});return t.observe(e),r.observe(e),()=>{t.disconnect(),r.disconnect()}},[]),(0,r.useEffect)(()=>{let e=f.current;if(!e)return;let t=()=>{let t=Math.max(280,Math.round(e.clientWidth)||L.current);t!==L.current&&(L.current=t,F(),window.requestAnimationFrame(()=>Y(b.current)))};t();let r=new ResizeObserver(t);return r.observe(e),()=>r.disconnect()},[]),(0,r.useEffect)(()=>{if(!z)return;let t=!1;v.current=null,k.current=!1,y.current=!1;let r=l(e);return x.current=r,C.current=!1,M.current=!1,R.current=0,A.current=0,G($),G(N),G(S),_.current?.disconnect(),_.current=null,q(!1),D(r),fetch(`/mcp-ui/${e}.json`).then(t=>{if(!t.ok)throw Error(`Missing fixture for ${e}`);return t.json()}).then(r=>{t||(v.current=r,E(`/mcp-ui/${e}.html?v=motion-1`))}).catch(()=>{t||E(null)}),()=>{t=!0,G($),G(N),G(S),_.current?.disconnect(),_.current=null}},[z,e]),(0,r.useLayoutEffect)(()=>{b.current?.contentDocument&&O&&(F(),window.requestAnimationFrame(()=>Y(b.current)))},[u,O,m]),(0,r.useEffect)(()=>{let e=e=>{b.current?.contentWindow?.postMessage(e,"*")},t=t=>{if(t.source!==b.current?.contentWindow)return;let r=t.data;if(r&&"2.0"===r.jsonrpc){if(void 0!==r.id&&r.method){if("ui/initialize"===r.method)return void e({jsonrpc:"2.0",id:r.id,result:{protocolVersion:"2026-01-26",hostInfo:{name:"astral-marketing",version:"1.0.0"},hostCapabilities:{serverTools:{}},hostContext:W()}});if("tools/call"===r.method){let t=String(r.params?.name||"unknown"),n=r.params?.arguments||{},{response:a}=function(e,t){if(!e||"object"!=typeof e)return{response:e};let r=e.$preview;if(!r)return{response:e};let n=String(o(t,r.argumentPath)||r.defaultKey||""),i=r.whenPresent,a=i&&o(t,i.argumentPath)?i.variants||{}:r.variants||{};return{response:a[n]||a[String(r.defaultKey||"")]}}(v.current?.tools?.[t],n);return a?void window.setTimeout(()=>{e({jsonrpc:"2.0",id:r.id,result:i(a)}),window.setTimeout(()=>Y(b.current),160)},140):void e({jsonrpc:"2.0",id:r.id,error:{code:-32601,message:`No preview response for ${t}`}})}return"ui/open-link"===r.method?void e({jsonrpc:"2.0",id:r.id,result:{opened:!0,preview:!0}}):void e({jsonrpc:"2.0",id:r.id,error:{code:-32601,message:`Preview host does not implement ${r.method}`}})}if("ui/notifications/initialized"===r.method){k.current=!0,(()=>{if(y.current||!k.current)return;let t=v.current?.initial;null!=t&&(y.current=!0,e({jsonrpc:"2.0",method:"ui/notifications/tool-result",params:i(t)}))})();return}"ui/notifications/size-changed"===r.method&&Z(b.current)}};return window.addEventListener("message",t),()=>window.removeEventListener("message",t)},[]);let X=(0,t.jsx)("div",{ref:f,className:`mk2-mcp-live${O?" is-ready":""}${m?" mk2-mcp-live--blend":""}${p?" mk2-mcp-live--compact":""}`,style:{height:p?V:B,...p?{"--mk2-mcp-compact-scale":.76,"--mk2-mcp-frame-height":`${V}px`}:void 0},inert:!0,children:I?(0,t.jsx)("iframe",{ref:b,className:"mk2-mcp-live__frame",title:c,src:I,sandbox:"allow-scripts allow-same-origin",style:{colorScheme:u},width:"100%",scrolling:"no",tabIndex:-1,onLoad:()=>{F(),h(b.current),g(b.current),Z(b.current)}}):null});return p?(0,t.jsx)("div",{className:"mk2-mcp-live__compact-clip",style:{height:B,"--mk2-mcp-compact-scale":.76,"--mk2-mcp-frame-height":`${V}px`},children:X}):X}])}]);