import { Category, MenuItem } from '../types';

/**
 * Packs the active digital menu categories and items into a beautiful, self-contained HTML page
 * and serializes it to a single base64 Data URI string.
 */
export function generateSelfContainedDataUri(categories: Category[], items: MenuItem[]): string {
  // Strip heavy properties (like massive inlined base64 images uploaded locally) to protect QR limit capacity of ~3KB
  const cleanCategories = categories.map(c => ({
    id: c.id,
    name: c.name,
    ...(c.name_ar && { name_ar: c.name_ar }),
    ...(c.name_en && { name_en: c.name_en }),
    ...(c.name_es && { name_es: c.name_es }),
    icon: c.icon || ''
  }));

  const cleanItems = items.map(i => ({
    id: i.id,
    name: i.name,
    ...(i.name_ar && { name_ar: i.name_ar }),
    ...(i.name_en && { name_en: i.name_en }),
    ...(i.name_es && { name_es: i.name_es }),
    price: i.price,
    category: i.category,
    // Filter out huge uploaded inline base64 image strings to ensure the QR code doesn't become too wide or unreadable
    image: (i.image && !i.image.startsWith('data:')) ? i.image : '',
    ...(i.tags && i.tags.length > 0 && { tags: i.tags }),
    available: i.available === undefined ? true : i.available,
    ...(i.description && { description: i.description }),
    ...(i.description_ar && { description_ar: i.description_ar }),
    ...(i.description_en && { description_en: i.description_en }),
    ...(i.description_es && { description_es: i.description_es })
  }));

  const categoriesJSON = JSON.stringify(cleanCategories);
  const itemsJSON = JSON.stringify(cleanItems);

  const htmlTemplate = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Oh Crêpe — Menu</title><script src="https://cdn.tailwindcss.com"></script><style>body{background:#fdfbf9;font-family:system-ui,-apple-system,sans-serif}.scrollbar-none::-webkit-scrollbar{display:none}</style></head><body class="p-4 max-w-md mx-auto text-stone-800 antialiased"><header class="text-center py-5 px-3 bg-white border-4 border-stone-900 shadow-[4px_4px_0px_0px_#1c1917] rounded-2xl mb-5"><h1 class="text-2xl font-serif font-black italic text-stone-900 leading-none">Oh Crêpe!</h1><p class="text-[9px] font-mono uppercase tracking-widest text-[#d9383a] font-bold mt-1">Bistro & Crêperie Premium</p><div class="mt-3.5 flex justify-center gap-1" id="langs"></div></header><div class="flex gap-2 overflow-x-auto pb-2.5 scrollbar-none" id="cats"></div><div class="mt-3"><input type="text" id="src" class="w-full px-3 py-2 bg-white rounded-xl border-2 border-stone-900 text-xs focus:outline-none" placeholder="Rechercher..."></div><div class="mt-5 flex flex-col gap-3.5" id="items"></div><script>const cats=${categoriesJSON};const items=${itemsJSON};const tr={fr:{s:"Rechercher...",all:"Tout",empty:"Aucun plat trouvé",unav:"Indisponible"},ar:{s:"بحث...",all:"الكل",empty:"لا يوجد نتائج",unav:"غير متوفر"},en:{s:"Search...",all:"All",empty:"No dishes found",unav:"Unavailable"},es:{s:"Buscar...",all:"Todo",empty:"No encontrado",unav:"No disponible"}};let lang="fr",cat="all",q="";function setLang(l){lang=l;document.body.dir=l==="ar"?"rtl":"ltr";document.getElementById("src").placeholder=tr[l].s;rL();rC();rI()}function rL(){document.getElementById("langs").innerHTML=[["fr","🇫🇷"],["ar","🇲🇦"],["en","🇺🇸"],["es","🇪🇸"]].map(([c,f])=>\`<button onclick="setLang('\${c}')" class="px-2 py-0.5 text-[10px] border-2 border-stone-900 rounded-lg font-bold font-mono \${lang===c?'bg-[#d9383a] text-white':'bg-stone-50'}">\${f} \${c.toUpperCase()}</button>\`).join("")}function setCat(c){cat=c;rC();rI()}function rC(){const allText=tr[lang].all;const allCats=[{id:"all",name:allText,name_ar:"الكل",name_en:"All",name_es:"Todo"},...cats];document.getElementById("cats").innerHTML=allCats.map(c=>{let n=c.name;if(lang==="ar"&&c.name_ar)n=c.name_ar;if(lang==="en"&&c.name_en)n=c.name_en;if(lang==="es"&&c.name_es)n=c.name_es;const active=cat===c.id;return\`<button onclick="setCat('\${c.id}')" class="whitespace-nowrap px-3 py-1.5 text-[10px] font-bold rounded-lg border-2 border-stone-900 shadow-[1.5px_1.5px_0px_0px_#1a1a1a] \${active?'bg-[#d9383a] text-white':''}">\${n}</button>\`}).join("")}function rI(){const f=items.filter(i=>{if(cat!=="all"&&i.category!==cat)return false;if(q){const s=q.toLowerCase();const nm=(i.name||"").toLowerCase().includes(s)||(i.name_ar||"").toLowerCase().includes(s)||(i.name_en||"").toLowerCase().includes(s)||(i.name_es||"").toLowerCase().includes(s);return nm}return true});const root=document.getElementById("items");if(!f.length){root.innerHTML=\`<div class="text-center py-6 bg-white border-2 border-stone-900 rounded-xl"><p class="text-xs font-bold font-serif">\${tr[lang].empty}</p></div>\`;return}root.innerHTML=f.map(i=>{let n=i.name,d=i.description||"";if(lang==="ar"){if(i.name_ar)n=i.name_ar;if(i.description_ar)d=i.description_ar}else if(lang==="en"){if(i.name_en)n=i.name_en;if(i.description_en)d=i.description_en}else if(lang==="es"){if(i.name_es)n=i.name_es;if(i.description_es)d=i.description_es}const tags=(i.tags||[]).map(t=>\`<span class="px-1 text-[8px] font-bold uppercase rounded border border-stone-900 bg-amber-50">\${t}</span>\`).join("");const isR=lang==="ar",textC=isR?"text-right":"text-left",dir=isR?"rtl":"ltr";return\`<div class="bg-white border-2 border-stone-950 p-3 rounded-xl shadow-[2.5px_2.5px_0px_0px_#1a1a1a] flex \${isR?'flex-row-reverse':''} gap-3 items-center" dir="\${dir}">\${i.image?\`<img src="\${i.image}" class="w-12 h-12 object-cover rounded-lg border border-stone-900 flex-shrink-0">\`:""}<div class="flex-1 \${textC}"><div class="flex items-center justify-between gap-1"><h4 class="font-serif text-xs font-black text-stone-900 leading-tight">\&rlm;\${n}</h4><span class="text-[10px] font-mono font-black text-[#d9383a] bg-stone-50 border-2 border-stone-950 px-1.5 py-0.5 rounded whitespace-nowrap">\${i.price} Dhs</span></div><p class="text-[10px] text-stone-500 mt-1">\${d}</p>\${tags?\`<div class="flex gap-1 mt-1.5 flex-wrap">\${tags}</div>\`:""}\${!i.available?\`<div class="mt-1.5 text-[8px] font-mono uppercase text-red-500 font-bold tracking-widest bg-red-50 py-0.5 px-2 border border-red-200 inline-block rounded">\${tr[lang].unav}</div>\`:""}</div></div>\`}).join("")}document.getElementById("src").addEventListener("input",e=>{q=e.target.value;rI()});setLang("fr");</script></body></html>`;

  // Use standard safely encoded base64 Data URL conversion
  try {
    const base64Content = btoa(encodeURIComponent(htmlTemplate).replace(/%([0-9A-F]{2})/g, (_, p1) => {
      return String.fromCharCode(parseInt(p1, 16));
    }));
    return `data:text/html;base64,${base64Content}`;
  } catch (e) {
    console.error("Base64 encoding failed for standard offline template", e);
    return `data:text/html;charset=utf-8,${encodeURIComponent(htmlTemplate)}`;
  }
}
