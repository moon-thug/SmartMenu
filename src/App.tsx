/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { QrCode, X } from 'lucide-react';
import { INITIAL_MENU_DATA } from './data';
import { Category, MenuItem } from './types';
import GuestMenu from './components/GuestMenu';
import AdminPanel from './components/AdminPanel';
import { Language, TRANSLATIONS } from './utils/translations';

// =========================================================================
// 1. ONE PERMANENT QR CODE (STATIC LINK)
// =========================================================================
// Replace this with your final live deployed digital menu URL.
// The customer QR stand will strictly link to this URL and remain permanent.
const BASE_URL: string = "https://YOUR_FREE_MENU_LINK.com";

// =========================================================================
// 2. CENTRAL SYNCHRONIZED CLOUD DATABASE ID
// =========================================================================
// If you want everyone to load from and edit the exact same master menu,
// copy the generated Cloud ID shown in your Admin Panel and paste it here!
const CLOUD_DATABASE_ID: string = "YOUR_GENERATED_CLOUD_ID_HERE";

export default function App() {
  const [isAdminParamPresent] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('mode') === 'admin';
    }
    return false;
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const langParam = params.get('lang') as Language;
      if (langParam && ['fr', 'ar', 'en', 'es'].includes(langParam)) {
        return langParam;
      }
    }
    return 'fr';
  });

  // Find active cloud database config
  const getActiveCloudId = (): string => {
    // 1. Check if the owner hardcoded an ID
    if (
      CLOUD_DATABASE_ID &&
      CLOUD_DATABASE_ID !== "YOUR_GENERATED_CLOUD_ID_HERE" &&
      CLOUD_DATABASE_ID.trim().length > 0
    ) {
      return CLOUD_DATABASE_ID.trim();
    }

    // 2. Check url param
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const dbParam = params.get('db');
      if (dbParam && dbParam.trim().length > 0) {
        return dbParam.trim();
      }

      // 3. Fallback to localStorage
      const localId = localStorage.getItem('oh_crepe_cloud_id');
      if (localId && localId.trim().length > 0) {
        return localId.trim();
      }
    }
    return '';
  };

  // Load and apply state from central anonymous cloud database
  useEffect(() => {
    let active = true;

    const loadCloudData = async () => {
      try {
        const id = getActiveCloudId();
        if (id) {
          // Pull live prices and categories from npoint cloud storage
          const res = await fetch(`https://api.npoint.io/${id}`);
          if (!res.ok) {
            throw new Error(`Cloud database offline or not found for ID: ${id}`);
          }
          const loadedData = await res.json();
          if (active) {
            if (loadedData.categories && Array.isArray(loadedData.categories)) {
              setCategories(loadedData.categories);
            } else {
              setCategories(INITIAL_MENU_DATA.categories);
            }
            if (loadedData.items && Array.isArray(loadedData.items)) {
              setItems(loadedData.items);
            } else {
              setItems(INITIAL_MENU_DATA.items);
            }
          }
        } else {
          // No cloud database ID found. Auto-seed and create a brand new bin!
          const payload = {
            contents: {
              categories: INITIAL_MENU_DATA.categories,
              items: INITIAL_MENU_DATA.items
            }
          };
          const res = await fetch("https://api.npoint.io/documents", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
          if (!res.ok) {
            throw new Error("Failed to auto-create cloud database bin from api.npoint.io");
          }
          const responseData = await res.json();
          const newBinId = responseData.id;
          if (newBinId) {
            localStorage.setItem('oh_crepe_cloud_id', newBinId);
            if (active) {
              setCategories(INITIAL_MENU_DATA.categories);
              setItems(INITIAL_MENU_DATA.items);
              
              // Sync parameter dynamically without full page reload
              const params = new URLSearchParams(window.location.search);
              params.set('db', newBinId);
              const newUrl = `${window.location.pathname}?${params.toString()}`;
              window.history.replaceState(null, '', newUrl);
            }
          }
        }
      } catch (err) {
        console.error("Cloud JSON endpoint load failed, using local offline defaults", err);
        if (active) {
          setCategories(INITIAL_MENU_DATA.categories);
          setItems(INITIAL_MENU_DATA.items);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    loadCloudData();

    return () => {
      active = false;
    };
  }, []);

  // Compute clean base URL (Statically mapping to the permanent QR destination)
  const getStaticBaseUrl = (): string => {
    return BASE_URL;
  };

  const staticBaseUrl = getStaticBaseUrl();

  // Synced customer sharing URL with selected language
  const getCustomerShareUrl = (): string => {
    const params = new URLSearchParams();
    params.set('lang', language);
    const activeId = getActiveCloudId();
    if (activeId) {
      params.set('db', activeId);
    }
    const queryString = params.toString();
    return `${BASE_URL}${queryString ? '?' + queryString : ''}`;
  };

  const customerShareUrl = getCustomerShareUrl();

  // Update categories and items inside central master cloud data atomically
  const handleSaveMenuData = async (newCategories: Category[], newItems: MenuItem[]) => {
    setIsSaving(true);
    let id = getActiveCloudId();
    try {
      const payload = {
        contents: {
          categories: newCategories,
          items: newItems
        }
      };

      if (!id) {
        const res = await fetch("https://api.npoint.io/documents", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!res.ok) {
          throw new Error("Failed to dynamically establish a cloud database bin on save trigger");
        }
        const data = await res.json();
        id = data.id;
        if (id) {
          localStorage.setItem('oh_crepe_cloud_id', id);
          const params = new URLSearchParams(window.location.search);
          params.set('db', id);
          const newUrl = `${window.location.pathname}?${params.toString()}`;
          window.history.replaceState(null, '', newUrl);
        }
      } else {
        const res = await fetch(`https://api.npoint.io/documents/${id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!res.ok) {
          throw new Error(`Failed to save updated menu data to: https://api.npoint.io/documents/${id}`);
        }
      }

      setCategories(newCategories);
      setItems(newItems);
    } catch (err) {
      console.error("Failed to commit changes to cloud storage", err);
      alert("Erreur de sauvegarde: impossible de synchroniser les modifications en ligne. Veuillez réessayer.");
    } finally {
      setIsSaving(false);
    }
  };

  // Change active language with URL query sync
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      params.set('lang', lang);
      const queryString = params.toString();
      const newUrl = `${window.location.pathname}${queryString ? '?' + queryString : ''}`;
      window.history.replaceState(null, '', newUrl);
    }
  };

  // QR string source (Strictly static BASE_URL)
  const qrCodeImageSrc = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(BASE_URL)}`;

  // Translation access
  const t = TRANSLATIONS[language];

  // Elegant brand loading screen on initial fetch
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fdfbf9] flex items-center justify-center font-sans select-none" id="global-loading-screen">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-5">
            <div className="absolute inset-0 rounded-full border-4 border-stone-100" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="absolute inset-0 rounded-full border-4 border-t-[#d9383a] border-r-transparent border-b-transparent border-l-transparent"
              id="loading-spinner-circle"
            />
            <div className="absolute inset-0 flex items-center justify-center font-serif text-lg font-black text-stone-900 leading-none">
              O
            </div>
          </div>
          <h3 className="font-serif text-lg font-black text-stone-900 tracking-tight italic">
            Oh Crêpe Bistro
          </h3>
          <p className="text-[9px] text-stone-400 font-mono tracking-widest mt-1 uppercase">
            Connexion au serveur...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative min-h-screen text-slate-800 antialiased selection:bg-[#d9383a] selection:text-white`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Primary Customer-Facing App Layout */}
      {categories.length > 0 && (
        <GuestMenu 
          categories={categories}
          items={items}
          onOpenQR={() => setShowQRModal(true)}
          onOpenAdmin={() => {
            if (isAdminParamPresent) {
              setShowAdmin(true);
            }
          }}
          showAdminButton={isAdminParamPresent}
          language={language}
          setLanguage={handleLanguageChange}
        />
      )}

      {/* ADMIN CONTROL PANEL OVERLAY */}
      <AnimatePresence>
        {showAdmin && isAdminParamPresent && (
          <AdminPanel 
            categories={categories}
            items={items}
            appUrl={staticBaseUrl}
            cloudId={getActiveCloudId()}
            onSaveData={handleSaveMenuData}
            onClose={() => setShowAdmin(false)}
            language={language}
            setLanguage={handleLanguageChange}
          />
        )}
      </AnimatePresence>

      {/* Synchronizing Screen Overlay */}
      <AnimatePresence>
        {isSaving && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center"
            id="saving-loader-overlay"
          >
            <div className="bg-white border-4 border-stone-900 p-6 rounded-2xl shadow-[6px_6px_0px_0px_#1c1917] max-w-xs text-center">
              <div className="relative w-12 h-12 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full border-3 border-stone-100" />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-3 border-t-[#d9383a] border-r-transparent border-b-transparent border-l-transparent"
                />
              </div>
              <h4 className="font-serif text-md font-bold text-stone-900">Envoi de la nouvelle carte...</h4>
              <p className="text-[10px] font-mono text-stone-400 mt-1 uppercase tracking-wider">Synchronisation Temps Réel</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QR CODE DISPLAY MODAL (LINKING DIRECTLY TO DIGITAL MENU) */}
      <AnimatePresence>
        {showQRModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQRModal(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              id="qr-modal-backdrop"
            />

            {/* Modal Body Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm bg-white border-4 border-[#1a1a1a] rounded-2xl shadow-[6px_6px_0px_0px_#1a1a1a] p-6 text-center overflow-hidden"
              id="qr-modal-card"
            >
              {/* Top close trigger */}
              <button 
                onClick={() => setShowQRModal(false)}
                className={`absolute top-4 ${language === 'ar' ? 'left-4' : 'right-4'} p-1 border-2 border-black rounded hover:bg-red-500 hover:text-white transition-colors`}
                id="qr-close-btn"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mt-2.5">
                <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 mx-auto mb-3 border-2 border-amber-300">
                  <QrCode className="w-6 h-6 animate-pulse" />
                </div>
                
                <h3 className="font-serif text-2xl font-black text-neutral-900 tracking-tight leading-none">{t.qrModalTitle}</h3>
                <span className="text-[10px] font-mono tracking-widest text-[#d9383a] uppercase font-bold block mt-1">{t.qrModalSubtitle}</span>

                <p className="text-xs text-neutral-500 mt-2.5 max-w-[260px] mx-auto font-sans leading-relaxed">
                  {t.qrModalDesc}
                </p>

                {/* Main QR Code container - STRICTLY ENCODING CLEAN CLIENT URL */}
                <div className="mt-5 p-3.5 bg-[#fdfaf7] rounded-xl border-2 border-black inline-block shadow-sm">
                  <img 
                    src={qrCodeImageSrc} 
                    alt="Oh Crêpe Menu QR Code" 
                    className="w-44 h-44 border border-neutral-100 placeholder-amber-100 bg-white"
                  />
                </div>

                <div className="mt-4 bg-[#fdfaf7] p-2 rounded-lg border border-neutral-200 text-left">
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-neutral-600 truncate">
                    <span className="font-bold text-neutral-800">{t.qrModalTarget}</span>
                    <a 
                      href={customerShareUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#d9383a] underline hover:text-[#c12f31]"
                    >
                      {customerShareUrl}
                    </a>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-neutral-100 flex justify-between text-[10px] font-mono text-neutral-400">
                  <span>{t.qrModalFooter1}</span>
                  <span>{t.qrModalFooter2}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
