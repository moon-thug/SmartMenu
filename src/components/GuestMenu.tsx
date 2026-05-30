import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  QrCode, 
  Sparkles, 
  Check, 
  Info,
  Globe,
  Settings
} from 'lucide-react';
import { Category, MenuItem } from '../types';
import { Language, TRANSLATIONS } from '../utils/translations';

interface GuestMenuProps {
  categories: Category[];
  items: MenuItem[];
  onOpenQR: () => void;
  onOpenAdmin: () => void;
  showAdminButton?: boolean;
  language: Language;
  setLanguage: (lang: Language) => void;
}

interface BroadCategory {
  id: string;
  name: {
    fr: string;
    ar: string;
    en: string;
    es: string;
  };
  desc: {
    fr: string;
    ar: string;
    en: string;
    es: string;
  };
  image: string;
  subCategoryIds: string[];
}

const BROAD_CATEGORIES: BroadCategory[] = [
  {
    id: 'starters',
    name: {
      fr: 'Entrées & Salades',
      ar: 'المقبلات والسلطات',
      en: 'Starters & Salads',
      es: 'Entradas & Ensaladas'
    },
    desc: {
      fr: 'Une sélection fraîche et authentique pour bien commencer',
      ar: 'مجموعة طازجة ولذيذة لبدء وجبتكم بكل شهية',
      en: 'A fresh and authentic selection to kickstart your meal',
      es: 'Una selección fresca y auténtica para empezar con buen gusto'
    },
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    subCategoryIds: ['breakfast', 'entrees', 'salades']
  },
  {
    id: 'mains',
    name: {
      fr: 'Plats Principaux, Pizzas & Crépes Salées',
      ar: 'الأطباق الرئيسية، البيتزا والكريب المالح',
      en: 'Mains, Pizzas & Savory Crepes',
      es: 'Platos Principales, Pizzas & Crepes Salados'
    },
    desc: {
      fr: 'Nos recettes généreuses cuisinées selon le savoir-faire maison',
      ar: 'أطباقنا الوفيرة المحضرة بكل شغف وحب على الطريقة التقليدية',
      en: 'Our generous house recipes cooked with culinary expertise',
      es: 'Nuestras recetas generosas preparadas con pasión y tradición'
    },
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947',
    subCategoryIds: ['pates', 'pizza', 'burgers', 'plats', 'crepes-salees']
  },
  {
    id: 'desserts',
    name: {
      fr: 'Desserts & Crêpes Sucrées',
      ar: 'الحلويات، البانكيك والكريب الحلو',
      en: 'Desserts, Pancakes & Sweet Crepes',
      es: 'Postres, Pancakes & Crepes Dulces'
    },
    desc: {
      fr: 'Le summum de la crêperie artisanale et de la douceur sucrée',
      ar: 'قمة الإتقان في الكريب الفرنسي التقليدي والمخبوزات الحلوة',
      en: 'The pinnacle of traditional sweet crêpes and fluffy treats',
      es: 'La cumbre de los crepes dulces artesanales y bocados dulces'
    },
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307',
    subCategoryIds: ['pancakes', 'crepes-sucrees']
  },
  {
    id: 'drinks',
    name: {
      fr: 'Boissons & Cafés',
      ar: 'المشروبات والعصائر',
      en: 'Drinks & Coffee',
      es: 'Bebidas & Cafés'
    },
    desc: {
      fr: 'Cafés fins de barista, thés originaux et jus pressés à la minute',
      ar: 'قهوة معتقة، شاي معطر وعصائر طازجة معصورة عند الطلب',
      en: 'Fine barista coffee, aromatic teas, and freshly-squeezed juices',
      es: 'Cafés finos de barista, tés selectos y zumos recién exprimidos'
    },
    image: 'https://images.unsplash.com/photo-1544145945-f904253d0c7b',
    subCategoryIds: ['hot-drinks', 'drinks']
  }
];

export default function GuestMenu({ 
  categories, 
  items, 
  onOpenQR, 
  onOpenAdmin, 
  showAdminButton = false,
  language,
  setLanguage
}: GuestMenuProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showLangOptions, setShowLangOptions] = useState(false);

  // Translation helpers
  const t = TRANSLATIONS[language];

  const getCatName = (cat: Category) => {
    if (language === 'ar') return cat.name_ar || cat.name;
    if (language === 'en') return cat.name_en || cat.name;
    if (language === 'es') return cat.name_es || cat.name;
    return cat.name;
  };

  const getItemName = (item: MenuItem) => {
    if (language === 'ar') return item.name_ar || item.name;
    if (language === 'en') return item.name_en || item.name;
    if (language === 'es') return item.name_es || item.name;
    return item.name;
  };

  const getItemDesc = (item: MenuItem) => {
    if (language === 'ar') return item.description_ar || item.description;
    if (language === 'en') return item.description_en || item.description;
    if (language === 'es') return item.description_es || item.description;
    return item.description;
  };

  // Multilingual, multi-field robust search filter
  const filteredItems = useMemo(() => {
    const searchLower = searchQuery.toLowerCase().trim();
    return items.filter((item) => {
      const matchFr = item.name.toLowerCase().includes(searchLower) || 
        (item.description && item.description.toLowerCase().includes(searchLower));
      
      const matchAr = (item.name_ar && item.name_ar.toLowerCase().includes(searchLower)) || 
        (item.description_ar && item.description_ar.toLowerCase().includes(searchLower));

      const matchEn = (item.name_en && item.name_en.toLowerCase().includes(searchLower)) || 
        (item.description_en && item.description_en.toLowerCase().includes(searchLower));
      
      const matchEs = (item.name_es && item.name_es.toLowerCase().includes(searchLower)) || 
        (item.description_es && item.description_es.toLowerCase().includes(searchLower));

      const matchesSearch = !searchLower || matchFr || matchAr || matchEn || matchEs;
      const matchesTag = !selectedTag || (item.tags && item.tags.includes(selectedTag));
      return matchesSearch && matchesTag && item.available;
    });
  }, [items, searchQuery, selectedTag]);

  const activeLangLabel = {
    fr: 'FR',
    ar: 'العربية',
    en: 'EN',
    es: 'ES'
  }[language];

  // Smooth scroll helper for quick-jumping to sections
  const scrollToSection = (id: string) => {
    const element = document.getElementById(`sec-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`min-h-screen bg-[#fbf9f6] pb-32 transition-colors duration-300 font-sans`}>
      
      {/* HEADER WITH LANGUAGE SWITCHER - STRICTLY REMOVED SYSTEM GEARS REGULAR CLIENT MODE */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm transition-all">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          
          {/* Elegant Bistro Brand Title */}
          <div className="flex items-center space-x-3.5 rtl:space-x-reverse">
            <div className="w-9 h-9 rounded-xl bg-stone-900 flex items-center justify-center text-white font-serif font-black text-lg shadow-sm">
              O
            </div>
            <div>
              <span className="font-serif text-xl tracking-tight font-black text-stone-900 block leading-none">
                {t.heroTitle}
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#d9383a] uppercase font-black block mt-1">
                {t.bistroSubtitle}
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
            
            {/* Elegant Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setShowLangOptions(!showLangOptions)}
                className="flex items-center space-x-1.5 px-3 py-1.5 border border-stone-200 rounded-xl hover:bg-stone-50 font-mono text-xs font-bold bg-white text-stone-800 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-500"
                id="lang-selector-dropdown"
              >
                <Globe className="w-3.5 h-3.5 text-stone-500" />
                <span>{activeLangLabel}</span>
              </button>

              <AnimatePresence>
                {showLangOptions && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowLangOptions(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      className={`absolute ${language === 'ar' ? 'left-0' : 'right-0'} mt-1.5 w-36 bg-white border border-stone-200 rounded-xl shadow-lg overflow-hidden z-20 font-mono text-xs`}
                    >
                      {[
                        { code: 'fr', label: 'Français' },
                        { code: 'ar', label: 'العربية' },
                        { code: 'en', label: 'English' },
                        { code: 'es', label: 'Español' }
                      ].map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code as Language);
                            setShowLangOptions(false);
                          }}
                          className={`w-full text-left rtl:text-right px-4.5 py-2.5 hover:bg-stone-50 flex items-center justify-between font-bold ${
                            language === lang.code ? 'bg-stone-50 text-[#d9383a]' : 'text-stone-700'
                          }`}
                        >
                          <span>{lang.label}</span>
                          {language === lang.code && <Check className="w-3.5 h-3.5 text-[#d9383a] ml-1.5" />}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* ADMIN ONLY: QR icon & Manager Panel Access */}
            {showAdminButton && (
              <>
                <button 
                  onClick={onOpenQR}
                  className="p-2 border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors relative bg-white text-stone-700"
                  title={t.qrTooltip}
                  id="qr-modal-toggle"
                >
                  <QrCode className="w-4.5 h-4.5" />
                  <span className={`absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#d9383a] rounded-full animate-ping`} />
                </button>

                <button 
                  onClick={onOpenAdmin}
                  className="px-3.5 py-1.5 bg-stone-900 text-white hover:bg-stone-800 font-mono text-xs font-bold rounded-xl transition-colors flex items-center space-x-1"
                  id="admin-panel-access"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>{t.managerBtn}</span>
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Welcome Board without Clutter */}
      <div className="max-w-4xl mx-auto px-5 mt-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 12 }} 
          animate={{ opacity: 1, y: 0 }}
          className="py-12 px-6 border border-stone-200 bg-white rounded-2xl shadow-sm relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 text-[120px] leading-none opacity-[0.015] font-serif font-black select-none pointer-events-none">
            OH
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-black text-stone-900 italic tracking-tight">
            {t.heroTitle}
          </h1>
          <p className="mt-3.5 text-stone-500 text-sm max-w-xl mx-auto leading-relaxed">
            {t.heroDesc}
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5 items-center justify-center text-xs font-mono text-stone-500">
            <span className="flex items-center bg-stone-50 border border-stone-200 px-3.5 py-1 rounded-full text-stone-700 font-bold">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 ml-1.5 text-amber-500 flex-none animate-pulse" /> 
              {t.heroTag1}
            </span>
            <span className="flex items-center bg-stone-50 border border-stone-200 px-3.5 py-1 rounded-full text-stone-700 font-bold">
              {t.heroTag2}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Quick Search & Filter Cards */}
      <div className="max-w-4xl mx-auto px-5 mt-6">
        <div className="bg-white border border-stone-200 rounded-2xl p-4.5 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
            
            {/* Custom Search Box */}
            <div className="relative flex-1">
              <Search className={`absolute ${language === 'ar' ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4`} />
              <input 
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full ${language === 'ar' ? 'pl-4 pr-10.5' : 'pl-10.5 pr-4'} py-2.5 border border-stone-200 rounded-xl text-sm bg-stone-50/50 hover:bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-500 transition-colors`}
                id="menu-search-input"
              />
            </div>

            {/* Tag Badges Shortcuts */}
            <div className="flex flex-wrap items-center gap-1.5 pb-0.5">
              {[
                { name: t.filterAll, value: null },
                { name: t.filterSpecials, value: 'MUST' },
                { name: t.filterNew, value: 'NEW' },
                { name: t.filterPower, value: 'POWER' },
              ].map((tag) => (
                <button
                  key={tag.name}
                  onClick={() => setSelectedTag(tag.value)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                    selectedTag === tag.value 
                      ? 'bg-stone-900 border border-stone-900 text-white shadow-sm'
                      : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Nav Bar for Quick Jumping */}
      <div className="max-w-4xl mx-auto px-5 mt-6 sticky top-[73px] z-30 bg-[#fbf9f6]/95 backdrop-blur-md py-2.5 transition-all">
        <div className="flex items-center space-x-2 rtl:space-x-reverse overflow-x-auto pb-1.5 no-scrollbar scroll-smooth">
          {BROAD_CATEGORIES.map((bCat) => {
            const hasItems = filteredItems.some(i => bCat.subCategoryIds.includes(i.category));
            if (!hasItems && searchQuery) return null;

            return (
              <button
                key={bCat.id}
                onClick={() => scrollToSection(bCat.id)}
                className="flex-none px-4.5 py-2 border border-stone-200 rounded-xl text-xs font-mono font-black uppercase text-stone-700 bg-white hover:bg-stone-50 hover:border-stone-400 active:scale-95 transition-all shadow-sm flex items-center space-x-1.5"
              >
                <span>{bCat.name[language]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Elegant Typographic Category Lists & Heros */}
      <main className="max-w-4xl mx-auto px-5 mt-6 space-y-16">
        <AnimatePresence mode="popLayout">
          {filteredItems.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 bg-white border border-stone-200 rounded-2xl shadow-sm"
              id="empty-menu-state"
            >
              <Info className="w-10 h-10 text-stone-400 mx-auto mb-3" />
              <h3 className="text-base font-mono font-black text-stone-800">{t.noProductsFound}</h3>
              <p className="text-xs text-stone-400 mt-1 max-w-xs mx-auto px-4 leading-relaxed">
                {t.noProductsSub}
              </p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedTag(null); }}
                className="mt-5 px-4 py-2 border border-stone-900 rounded-xl text-xs font-mono font-black hover:bg-stone-50 transition-colors"
              >
                {t.resetFilters}
              </button>
            </motion.div>
          ) : (
            
            // RENDERING SECTIONS
            BROAD_CATEGORIES.map((bCat) => {
              // Only render broad category sections that contain matching filtered items
              const bCatItems = filteredItems.filter(item => bCat.subCategoryIds.includes(item.category));
              if (bCatItems.length === 0) return null;

              return (
                <section 
                  key={bCat.id} 
                  id={`sec-${bCat.id}`}
                  className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-sm transition-all scroll-mt-28"
                >
                  {/* CATEGORY HERO IMAGE */}
                  <div className="relative h-64 sm:h-76 md:h-88 lg:h-96 w-full overflow-hidden">
                    <img 
                      src={bCat.image} 
                      alt={bCat.name[language]} 
                      className="w-full h-full object-cover select-none pointer-events-none"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Visual Overlay Card / Text Label over Unsplash image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent flex flex-col justify-end p-6 md:p-8 text-left rtl:text-right">
                      <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-bold mb-1">
                        MENU DIGITAL
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight italic">
                        {bCat.name[language]}
                      </h2>
                      <p className="text-xs text-stone-200 font-sans mt-1.5 max-w-md leading-relaxed hidden sm:block">
                        {bCat.desc[language]}
                      </p>
                    </div>
                  </div>

                  {/* ELEGANT TEXT LISTS BELOW Broad Category Hero */}
                  <div className="p-6 md:p-10 space-y-10 bg-white">
                    {categories
                      .filter(cat => bCat.subCategoryIds.includes(cat.id))
                      .map((subCat) => {
                        // Gather items strictly matching this subcategory
                        const subCatItems = bCatItems.filter(item => item.category === subCat.id);
                        if (subCatItems.length === 0) return null;

                        return (
                          <div key={subCat.id} className="space-y-4">
                            
                            {/* Subcategory Label - Mini display */}
                            <div className="flex items-center space-x-3 rtl:space-x-reverse pb-2 border-b border-stone-100">
                              <h3 className="font-serif text-lg font-black italic text-stone-900 tracking-tight">
                                {getCatName(subCat)}
                              </h3>
                              <div className="h-px bg-stone-100 flex-1" />
                            </div>

                            {/* Crisp typographic menu entries */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
                              {subCatItems.map((item) => (
                                <div 
                                  key={item.id} 
                                  className="group hover:bg-stone-50/50 p-2 -mx-2 rounded-xl transition-all"
                                >
                                  {/* Item Line: TITLE AND PRICE */}
                                  <div className="flex justify-between items-baseline gap-3.5 rtl:flex-row-reverse text-left rtl:text-right">
                                    <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                                      <span className="font-serif font-bold text-stone-950 uppercase tracking-tight text-sm md:text-base pr-0.5 pl-0.5 truncate group-hover:text-[#d9383a] transition-colors">
                                        {getItemName(item)}
                                      </span>
                                      
                                      {/* Tags rendering next to the title */}
                                      {item.tags?.map(tag => (
                                        <span 
                                          key={tag} 
                                          className={`text-[8px] font-mono tracking-widest px-1.5 py-0.5 rounded border leading-none font-bold select-none ${
                                            tag === 'NEW'
                                              ? 'bg-amber-50 text-amber-700 border-amber-300'
                                              : tag === 'MUST'
                                              ? 'bg-red-50 text-red-700 border-red-300'
                                              : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                          }`}
                                        >
                                          {tag}
                                        </span>
                                      ))}
                                    </div>

                                    {/* Leader connective dots line on desktop */}
                                    <div className="hidden sm:block flex-1 border-b border-dotted border-stone-300 mx-1.5 self-center" />

                                    {/* Price tag */}
                                    <span className="font-mono text-sm font-black text-stone-900 bg-stone-100 px-2 py-0.5 rounded-md flex-none">
                                      {item.price} Dhs
                                    </span>
                                  </div>

                                  {/* Description block below */}
                                  {getItemDesc(item) && (
                                    <p className="text-xs text-stone-500 font-sans italic mt-1.5 leading-relaxed max-w-lg text-left rtl:text-right">
                                      {getItemDesc(item)}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </section>
              );
            })
          )}
        </AnimatePresence>
      </main>

      {/* Styled Micro Copyright Footer */}
      <footer className="mt-20 py-10 border-t border-stone-100 bg-[#fbf9f6] text-center">
        <p className="text-[10px] font-mono tracking-widest text-[#d9383a] uppercase font-bold">
          {t.heroTitle} — {t.bistroSubtitle}
        </p>
        <p className="text-xs text-stone-400 font-sans mt-2">
          © {new Date().getFullYear()} Oh Crêpe. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
