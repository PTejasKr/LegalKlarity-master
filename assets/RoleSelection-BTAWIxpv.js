import{f as p,r as a,u,j as e,m as i,g,U as f}from"./index-rBsIGWOJ.js";/**
 * @license lucide-react v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",key:"1b4qmf"}],["path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",key:"i71pzd"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",key:"10jefs"}],["path",{d:"M10 6h4",key:"1itunk"}],["path",{d:"M10 10h4",key:"tcdvrf"}],["path",{d:"M10 14h4",key:"kelpxr"}],["path",{d:"M10 18h4",key:"1ulq68"}]],b=p("building-2",y),v={enterprise:["MoA / LLP Agreement","Vendor / Client Contract","Employment Agreement","Service Agreement","IP Assignment Agreement"],individual:["Rental / Lease Agreement","Loan Agreement","Sale Agreement (Property/Vehicle)","Will / Inheritance Agreement","Power of Attorney"],institutional:["Internship Agreement","Offer Letter / Employment Contract","Freelance Project Contract","NDA (Non-Disclosure Agreement)"]},k=[{id:"enterprise",title:"Enterprise",description:"For businesses, corporations, and commercial entities seeking legal solutions.",icon:e.jsx(g,{className:"w-8 h-8"}),color:"bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",hoverColor:"hover:bg-blue-100 dark:hover:bg-blue-900/50"},{id:"individual",title:"Individual",description:"For individuals managing personal legal documents and agreements.",icon:e.jsx(f,{className:"w-8 h-8"}),color:"bg-green-50 text-green-600 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",hoverColor:"hover:bg-green-100 dark:hover:bg-green-900/50"},{id:"institutional",title:"Institutional",description:"For educational institutions, NGOs, and organizations managing multiple agreements.",icon:e.jsx(b,{className:"w-8 h-8"}),color:"bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800",hoverColor:"hover:bg-purple-100 dark:hover:bg-purple-900/50"}],N=()=>{const[n,o]=a.useState({}),[s,d]=a.useState(null),c=u();a.useEffect(()=>{const t=document.createElement("style");return t.innerHTML=`
      .perspective-container {
        perspective: 1000px;
      }
      
      .flip-card-container {
        perspective: 1000px;
      }
      
      .flip-card {
        position: relative;
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .flip-card.flipped {
        transform: rotateY(180deg);
      }
      
      .flip-card-front,
      .flip-card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        display: flex;
        flex-direction: column;
        border-radius: 0.5rem;
      }
      
      .flip-card-back {
        transform: rotateY(180deg);
      }
      
      .slide-out {
        transition: transform 0.3s ease-in-out;
      }
      
      @keyframes slideOut {
        to {
          transform: translateX(100vw);
        }
      }
      
      .slide-out {
        animation: slideOut 0.3s ease-in-out forwards;
      }
    `,document.head.appendChild(t),()=>{document.head.removeChild(t)}},[]);const m=t=>{d(t),setTimeout(()=>{c("/dashboard/agreement/summary")},300)},l=t=>{o(r=>({...r,[t]:!r[t]}))};return e.jsx("div",{className:"min-h-screen bg-gray-50 dark:bg-slate-900 py-12",children:e.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[e.jsx("div",{className:"text-center mb-12",children:e.jsxs(i.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.5},children:[e.jsx("h1",{className:"text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4",children:"Select Your User Type"}),e.jsx("p",{className:"text-lg text-gray-600 dark:text-slate-300 max-w-3xl mx-auto",children:"Choose the category that best represents you to access personalized legal tools and agreement templates."})]})}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 perspective-container",children:k.map((t,r)=>e.jsx(i.div,{initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{delay:r*.1,duration:.5},className:`h-full transition-all duration-300 ${s===t.id?"slide-out":""}`,style:{transform:s===t.id?"translateX(100vw)":"none"},children:e.jsx("div",{className:`bg-white rounded-xl border-2 p-6 h-full flex flex-col transition-all duration-300 ${t.color.replace("text","border")} ${t.hoverColor} shadow-sm hover:shadow-md dark:bg-slate-800 dark:border-slate-700 dark:hover:shadow-slate-800/50`,children:e.jsxs("div",{className:"flex flex-col h-full",children:[e.jsx("div",{className:`w-16 h-16 rounded-full ${t.color} flex items-center justify-center mb-6 mx-auto`,children:t.icon}),e.jsx("h3",{className:"text-xl font-bold text-gray-900 dark:text-white text-center mb-3",children:t.title}),e.jsx("p",{className:"text-sm text-gray-600 dark:text-slate-400 text-center mb-6 flex-grow",children:t.description}),e.jsx("div",{className:"flip-card-container mb-6",children:e.jsxs("div",{className:`flip-card ${n[t.id]?"flipped":""}`,style:{height:"180px"},children:[e.jsx("div",{className:"flip-card-front flex flex-col items-center justify-center h-full cursor-pointer",children:e.jsx("button",{className:"text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-slate-300 dark:hover:text-white",onClick:()=>l(t.id),children:"Show Examples"})}),e.jsx("div",{className:"flip-card-back bg-gray-50 rounded-lg p-4 h-full dark:bg-slate-700",children:e.jsxs("div",{className:"h-full flex flex-col",children:[e.jsx("div",{className:"flex-grow overflow-y-auto",children:e.jsx("ul",{className:"space-y-2",children:v[t.id].map((x,h)=>e.jsxs("li",{className:"text-sm text-gray-700 dark:text-slate-300 flex items-start",children:[e.jsx("span",{className:"text-gray-400 dark:text-slate-400 mr-2",children:"•"}),e.jsx("span",{children:x})]},h))})}),e.jsx("div",{className:"mt-3 pt-2 border-t border-gray-200 dark:border-slate-600",children:e.jsx("button",{className:"text-xs font-medium text-gray-600 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white w-full text-center",onClick:()=>l(t.id),children:"Click to hide"})})]})})]})}),e.jsxs("button",{className:"w-full py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 transition-all duration-300 shadow-sm mt-auto dark:from-primary-700 dark:to-indigo-700 dark:hover:from-primary-600 dark:hover:to-indigo-600",onClick:()=>m(t.id),children:["Select ",t.title]})]})})},t.id))}),e.jsx(i.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.4,duration:.5},className:"bg-white rounded-xl shadow-sm p-8 border border-gray-200 dark:bg-slate-800 dark:border-slate-700",children:e.jsxs("div",{className:"text-center",children:[e.jsx("h3",{className:"text-lg font-semibold text-gray-900 dark:text-white mb-2",children:"Not Sure Which Category Fits You?"}),e.jsx("p",{className:"text-gray-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto",children:"Each category provides tailored legal tools and agreement templates. You can always change your selection later in your account settings."}),e.jsxs("div",{className:"flex flex-col sm:flex-row justify-center gap-4",children:[e.jsx("button",{className:"text-primary-600 font-medium hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300",children:"Learn more about user categories"}),e.jsx("span",{className:"hidden sm:block text-gray-300 dark:text-slate-600",children:"|"}),e.jsx("button",{className:"text-primary-600 font-medium hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300",children:"Contact support for help"})]})]})})]})})};export{N as default};
