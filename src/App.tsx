/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { QrCode, X } from 'lucide-react';
import { collection, onSnapshot, writeBatch, doc } from 'firebase/firestore';
import { db, seedDatabaseIfEmpty, handleFirestoreError, OperationType } from './utils/firebase';
import { INITIAL_MENU_DATA } from './data';
import { Category, MenuItem } from './types';
import GuestMenu from './components/GuestMenu';
import AdminPanel from './components/AdminPanel';
import { Language, TRANSLATIONS } from './utils/translations';
import { generateSelfContainedDataUri } from './utils/qrExporter';

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

  // Load and apply state from central Firestore syncing database in real-time
  useEffect(() => {
    let active = true;

    const setupAndListen = async () => {
      try {
        // Run seed on load if database collections are empty
        await seedDatabaseIfEmpty();
      } catch (err) {
        console.error("Auto seeding check failed", err);
      }

      if (!active) return;

      // Realtime listener for categories
      const unsubCategories = onSnapshot(
        collection(db, 'categories'),
        (snapshot) => {
          if (!active) return;
          const fetchedCats: Category[] = [];
          snapshot.forEach((doc) => {
            fetchedCats.push(doc.data() as Category);
          });
          if (fetchedCats.length > 0) {
            setCategories(fetchedCats);
          } else {
            setCategories(INITIAL_MENU_DATA.categories);
          }
        },
        (error) => {
          handleFirestoreError(error, OperationType.LIST, 'categories');
        }
      );

      // Realtime listener for menu items
      const unsubItems = onSnapshot(
        collection(db, 'items'),
        (snapshot) => {
          if (!active) return;
          const fetchedItems: MenuItem[] = [];
          snapshot.forEach((doc) => {
            fetchedItems.push(doc.data() as MenuItem);
          });
          if (fetchedItems.length > 0) {
            setItems(fetchedItems);
          } else {
            setItems(INITIAL_MENU_DATA.items);
          }
          setIsLoading(false);
        },
        (error) => {
          handleFirestoreError(error, OperationType.LIST, 'items');
        }
      );

      return () => {
        unsubCategories();
        unsubItems();
      };
    };

    const cleanupPromise = setupAndListen();

    return () => {
      active = false;
      cleanupPromise.then((cleanup) => {
        if (cleanup) cleanup();
      });
    };
  }, []);

  // Compute clean base URL (Stripping modes/excess params so QR is static)
  const getStaticBaseUrl = (): string => {
    if (typeof window === 'undefined') return 'https://oh-crepe.com';
    return window.location.origin + window.location.pathname;
  };

  const staticBaseUrl = getStaticBaseUrl();

  // Synced customer sharing URL with selected language
  const getCustomerShareUrl = (): string => {
    if (typeof window === 'undefined') return 'https://oh-crepe.com';
    const params = new URLSearchParams();
    params.set('lang', language);
    const queryString = params.toString();
    return `${staticBaseUrl}${queryString ? '?' + queryString : ''}`;
  };

  const customerShareUrl = getCustomerShareUrl();

  // Update categories and items inside central master cloud data atomically
  const handleSaveMenuData = async (newCategories: Category[], newItems: MenuItem[]) => {
    setIsSaving(true);
    try {
      const batch = writeBatch(db);

      // 1. Process categories deletion
      const newCatIds = new Set(newCategories.map(c => c.id));
      categories.forEach(oldCat => {
        if (!newCatIds.has(oldCat.id)) {
          batch.delete(doc(db, 'categories', oldCat.id));
        }
      });

      // 2. Process categories additions/updates
      newCategories.forEach(cat => {
        batch.set(doc(db, 'categories', cat.id), cat);
      });

      // 3. Process items deletion
      const newItemIds = new Set(newItems.map(i => i.id));
      items.forEach(oldItem => {
        if (!newItemIds.has(oldItem.id)) {
          batch.delete(doc(db, 'items', oldItem.id));
        }
      });

      // 4. Process items additions/updates
      newItems.forEach(item => {
        batch.set(doc(db, 'items', item.id), item);
      });

      // Atomically apply changes to Firebase Firestore db
      await batch.commit();
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'batch_update');
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

  // QR string source (Directly encoding the compressed self-contained Data URI with menu data)
  const qrCodeImageSrc = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(generateSelfContainedDataUri(categories, items))}`;

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
