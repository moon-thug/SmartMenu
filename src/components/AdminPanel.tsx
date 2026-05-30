import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  Trash2, 
  Edit2, 
  Save, 
  QrCode, 
  Lock, 
  FileEdit,
  Globe,
  Upload,
  Check
} from 'lucide-react';
import { Category, MenuItem } from '../types';
import { getAutoFoodImage } from '../utils/imageHelper';
import { Language, TRANSLATIONS } from '../utils/translations';


interface AdminPanelProps {
  categories: Category[];
  items: MenuItem[];
  onSaveData: (categories: Category[], items: MenuItem[]) => void;
  onClose: () => void;
  appUrl: string;
  cloudId: string;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const QUALITY_FOOD_PRESETS = [
  { name: 'Salty Pancake', url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80' },
  { name: 'Coffee Cup', url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80' },
  { name: 'Waffle Berry', url: 'https://images.unsplash.com/photo-1562376502-6f769499c886?auto=format&fit=crop&w=600&q=80' },
  { name: 'Moroccan Tagine', url: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=600&q=80' },
  { name: 'Deluxe Burger', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80' },
  { name: 'Hot Chocolates', url: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80' }
];

export default function AdminPanel({ 
  categories, 
  items, 
  onSaveData, 
  onClose, 
  appUrl,
  cloudId,
  language,
  setLanguage
}: AdminPanelProps) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Editable lists (local state while designing, saved as bulk)
  const [lclCategories, setLclCategories] = useState<Category[]>([...categories]);
  const [lclItems, setLclItems] = useState<MenuItem[]>([...items]);

  // Selected item/category for active Editing Form
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // QR Stand options
  const [tableNumber, setTableNumber] = useState('05');
  const [wifiSsid, setWifiSsid] = useState('Oh_Crepe_Guest');
  const [wifiPass, setWifiPass] = useState('nutellafever');
  const [qrColor, setQrColor] = useState('#1a1a1a');

  // File read state
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Translation helpers
  const t = TRANSLATIONS[language];

  // Helper selectors for list display
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

  // Authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1234' || password.toLowerCase() === 'admin') {
      setIsAdmin(true);
      setLoginError('');
    } else {
      setLoginError(t.adminIncorrectPass);
    }
  };

  // Skip Login for demo ease
  const handleSkipLogin = () => {
    setIsAdmin(true);
  };

  // Base64 Image Conversion
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingItem) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingItem({
          ...editingItem,
          image: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Add Item with automatic translation seeds
  const handleAddNewItem = (categoryId: string) => {
    const newItem: MenuItem = {
      id: 'item_' + Date.now(),
      name: t.adminNewItemDefault.toUpperCase(),
      name_ar: TRANSLATIONS['ar'].adminNewItemDefault,
      name_en: TRANSLATIONS['en'].adminNewItemDefault.toUpperCase(),
      name_es: TRANSLATIONS['es'].adminNewItemDefault.toUpperCase(),
      description: t.adminNewItemDescDefault,
      description_ar: TRANSLATIONS['ar'].adminNewItemDescDefault,
      description_en: TRANSLATIONS['en'].adminNewItemDescDefault,
      description_es: TRANSLATIONS['es'].adminNewItemDescDefault,
      price: 35,
      category: categoryId,
      image: '',
      tags: [],
      available: true
    };
    setLclItems([...lclItems, newItem]);
    setEditingItem(newItem);
  };

  // Delete Item
  const handleDeleteItem = (itemId: string) => {
    if (confirm(t.adminDeleteItemConfirm)) {
      const updated = lclItems.filter(i => i.id !== itemId);
      setLclItems(updated);
      if (editingItem?.id === itemId) setEditingItem(null);
    }
  };

  // Save Item edits back to local items array
  const handleSaveItemForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const updated = lclItems.map(i => i.id === editingItem.id ? editingItem : i);
    setLclItems(updated);
    setEditingItem(null);
  };

  // Add Category with automatic translation seeds
  const handleAddNewCategory = () => {
    const newCat: Category = {
      id: 'cat_' + Date.now(),
      name: t.adminNewCatDefault,
      name_ar: TRANSLATIONS['ar'].adminNewCatDefault,
      name_en: TRANSLATIONS['en'].adminNewCatDefault,
      name_es: TRANSLATIONS['es'].adminNewCatDefault,
      description: t.adminNewCatDescDefault,
      description_ar: TRANSLATIONS['ar'].adminNewCatDescDefault,
      description_en: TRANSLATIONS['en'].adminNewCatDescDefault,
      description_es: TRANSLATIONS['es'].adminNewCatDescDefault,
      icon: 'Utensils'
    };
    setLclCategories([...lclCategories, newCat]);
    setEditingCategory(newCat);
  };

  // Delete Category
  const handleDeleteCategory = (catId: string) => {
    const attachedCount = lclItems.filter(i => i.category === catId).length;
    if (attachedCount > 0) {
      alert(`${t.adminCatAttachedWarning} (${attachedCount})`);
      return;
    }
    if (confirm(t.adminDeleteConfirm)) {
      setLclCategories(lclCategories.filter(c => c.id !== catId));
      if (editingCategory?.id === catId) setEditingCategory(null);
    }
  };

  // Save Category Form
  const handleSaveCategoryForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    setLclCategories(lclCategories.map(c => c.id === editingCategory.id ? editingCategory : c));
    setEditingCategory(null);
  };

  // Save changes to actual parent store, saving into localStorage
  const handleApplyAllChanges = () => {
    onSaveData(lclCategories, lclItems);
    alert(t.adminApplyDone);
  };

  // QR Code URL Generator (directly encoding static free menu link)
  const actualTargetUrl = appUrl;
  const qrCodeFinalSrc = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&color=${qrColor.replace('#', '')}&data=${encodeURIComponent(actualTargetUrl)}`;

  const handleDownloadClientQR = () => {
    const downloadUrl = `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${encodeURIComponent(actualTargetUrl)}`;
    window.open(downloadUrl, '_blank');
  };

  // Handle PDF/Print Layout
  const triggerPrintSign = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>QR Stand Sign Table ${tableNumber}</title>
            <style>
              body {
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                text-align: center;
                background-color: #ffffff;
                color: #1a1a1a;
                margin: 0;
                padding: 40px;
              }
              .box {
                border: 10px double #1a1a1a;
                padding: 50px;
                max-width: 450px;
                margin: 0 auto;
                background: #fdfdfb;
              }
              h1 {
                font-size: 42px;
                margin-top: 0;
                letter-spacing: 2px;
                font-style: italic;
              }
              .logo-line {
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 4px;
                color: #d9383a;
                font-weight: bold;
                margin-bottom: 30px;
              }
              .qr-frame {
                border: 4px solid #1a1a1a;
                padding: 15px;
                background-color: white;
                display: inline-block;
                margin-bottom: 25px;
              }
              .table-number {
                font-size: 24px;
                font-weight: 900;
                letter-spacing: 1px;
                margin-bottom: 40px;
              }
              .footer-text {
                font-size: 12px;
                line-height: 1.6;
                color: #666;
              }
              .wifi-box {
                margin-top: 20px;
                padding: 10px;
                border: 2px solid #1a1a1a;
                font-size: 11px;
                background: #f5f5f5;
              }
            </style>
          </head>
          <body>
            <div class="box">
              <h1>Oh Crêpe!</h1>
              <div class="logo-line">${t.bistroSubtitle}</div>
              
              <div class="table-number">${t.adminQrApercuTable.toUpperCase()} ${tableNumber}</div>

              <div class="qr-frame">
                <img src="${qrCodeFinalSrc}" alt="QR Code Menu" width="220" />
              </div>
              
              <p class="footer-text">
                ${t.adminQrFooterText}
              </p>

              <div class="wifi-box">
                🔑 <strong>${t.adminQrWifiLabel}</strong> ${wifiSsid} | <strong>${t.adminQrMdpLabel}</strong> ${wifiPass}
              </div>
            </div>
            <script>
              window.onload = function() { window.print(); }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#1a1a1aa4] overflow-y-auto backdrop-blur-md flex items-center justify-center p-4 md:p-8"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-5xl bg-white border-4 border-[#1a1a1a] rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col h-[90vh]"
      >
        {/* Frame bar */}
        <div className="bg-[#1a1a1a] text-white py-4 px-6 flex items-center justify-between border-b-2 border-black flex-shrink-0">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="bg-[#d9383a] w-3 h-3 rounded-full animate-pulse" />
            <span className="font-mono text-xs sm:text-sm tracking-widest uppercase font-extrabold">{t.adminTitle}</span>
          </div>

          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            {/* Direct selector for terminal language comfort */}
            <div className="flex border border-neutral-600 rounded bg-neutral-800 p-0.5">
              {(['fr', 'ar', 'es'] as Language[]).map(l => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={`px-2 py-0.5 font-mono text-[9px] font-bold rounded ${
                    language === l ? 'bg-[#d9383a] text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <button 
              onClick={onClose}
              className="p-1.5 border-2 border-white rounded hover:bg-[#d9383a] hover:border-[#d9383a] transition-all"
              id="admin-form-close"
              title={t.adminClose}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dashboard Login Shield / Access */}
        {!isAdmin ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-amber-50/20">
            <div className="max-w-md w-full bg-white border-2 border-[#1a1a1a] p-6 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
              <Lock className="w-12 h-12 text-[#d9383a] mx-auto mb-4" />
              <h2 className="font-serif text-2xl font-black text-[#1a1a1a] mb-2">{t.adminLoginTitle}</h2>
              <p className="text-xs text-neutral-500 mb-6">{t.adminLoginDesc}</p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input 
                    type="password"
                    placeholder={t.adminPassPlaceholder}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-center py-2.5 border-2 border-black rounded-lg font-mono focus:outline-none"
                    id="admin-pass-field"
                  />
                  {loginError && (
                    <p className="text-[#d9383a] text-xs font-mono mt-1.5 font-bold">{loginError}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleSkipLogin}
                    className="py-2.5 border-2 border-[#1a1a1a] font-mono text-xs font-black rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    {t.adminDemoBtn}
                  </button>
                  <button
                    type="submit"
                    className="py-2.5 bg-[#1a1a1a] text-white hover:bg-neutral-800 font-mono text-xs font-black rounded-lg transition-colors"
                  >
                    {t.adminLoginBtn}
                  </button>
                </div>
              </form>

              <div className="mt-6 pt-4 border-t border-neutral-200 text-[10px] font-mono text-neutral-400">
                {t.adminDemoAdvice}
              </div>
            </div>
          </div>
        ) : (
          /* ===================================================
              MAIN MANAGEMENT GRID LAYOUT
             =================================================== */
          <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
            {/* Left Column: List Manager Categories & Products */}
            <div className="w-full md:w-3/5 border-r-2 border-[#1a1a1a] flex flex-col overflow-hidden">
              <div className="p-4 bg-neutral-100 border-b-2 border-[#1a1a1a] flex justify-between items-center flex-shrink-0">
                <span className="font-mono text-xs font-black uppercase text-neutral-600">{t.adminTreeTitle}</span>
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <button 
                    onClick={handleAddNewCategory}
                    className="py-1 px-2.5 bg-amber-50 hover:bg-amber-100 border border-black font-mono text-[10px] font-bold rounded"
                  >
                    {t.adminNewCat}
                  </button>
                </div>
              </div>

              {/* Hierarchy View */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar">
                {lclCategories.map((category) => {
                  const catItems = lclItems.filter(item => item.category === category.id);
                  return (
                    <div key={category.id} className="border-2 border-black rounded-xl p-3.5 bg-white relative">
                      {/* Active category details */}
                      <div className="flex justify-between items-center border-b border-neutral-200 pb-2 mb-3 rtl:flex-row-reverse">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                          <h4 className="font-mono text-xs font-black uppercase text-[#1a1a1a] truncate max-w-[180px]">
                            {getCatName(category)}
                          </h4>
                        </div>
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                          <button 
                            onClick={() => setEditingCategory(category)}
                            className="p-1 border border-neutral-300 rounded hover:bg-neutral-100 text-neutral-600"
                            title="Modifier la catégorie"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button 
                            onClick={() => handleDeleteCategory(category.id)}
                            className="p-1 border border-neutral-300 rounded hover:bg-red-50 text-[#d9383a]"
                            title="Supprimer la catégorie"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                          <button 
                            onClick={() => handleAddNewItem(category.id)}
                            className="px-2 py-0.5 bg-[#1a1a1a] text-white text-[9px] font-mono font-bold rounded"
                            title="Ajouter un produit"
                          >
                            {t.adminAddProductBtn}
                          </button>
                        </div>
                      </div>

                      {/* Items loop */}
                      {catItems.length === 0 ? (
                        <div className="text-center py-4 bg-neutral-50 rounded text-neutral-400 font-mono text-[10px] uppercase">
                          Aucun produit sous cette catégorie
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {catItems.map((item) => (
                            <div 
                              key={item.id} 
                              onClick={() => setEditingItem(item)}
                              className={`flex items-center justify-between p-2 rounded border cursor-pointer transition-all ${
                                editingItem?.id === item.id 
                                  ? 'bg-amber-50/50 border-[#d9383a] ring-1 ring-[#d9383a]'
                                  : 'bg-white border-neutral-200 hover:border-[#1a1a1a]'
                              }`}
                            >
                              <div className="flex items-center space-x-2 rtl:space-x-reverse min-w-0 flex-1">
                                <img 
                                  src={item.image || getAutoFoodImage(item.name, item.category, item.id)} 
                                  alt={getItemName(item)} 
                                  className="w-10 h-10 rounded object-cover border border-black flex-none font-sans" 
                                  referrerPolicy="no-referrer"
                                />
                                <div className="truncate pr-2 pl-2">
                                  <span className="font-mono text-xs font-bold text-neutral-900 block leading-tight">{getItemName(item)}</span>
                                  <span className="text-[9px] text-neutral-400 font-mono uppercase">{item.price} Dhs</span>
                                </div>
                              </div>

                              <div className="flex items-center space-x-1.5 rtl:space-x-reverse flex-none" onClick={(e) => e.stopPropagation()}>
                                <button 
                                  onClick={() => setEditingItem(item)}
                                  className="p-1.5 border border-neutral-200 rounded hover:bg-neutral-100 text-neutral-500"
                                >
                                  <FileEdit className="w-3 h-3" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteItem(item.id)}
                                  className="p-1.5 border border-neutral-200 rounded hover:bg-red-50 text-[#d9383a]"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Integrated Live Item / Category / QR Designer Form Block */}
            <div className="w-full md:w-2/5 p-5 bg-neutral-50 overflow-y-auto no-scrollbar flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="font-mono text-xs font-black uppercase text-neutral-400 mb-2 tracking-wider">
                  {t.adminFormEditorTitle}
                </h3>

                {/* ITEM EDIT SUB-FORM */}
                {editingItem ? (
                  <form onSubmit={handleSaveItemForm} className="bg-white border-2 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_#1a1a1a] space-y-4 text-left">
                    <div className="flex justify-between items-center border-b border-neutral-100 pb-2 rtl:flex-row-reverse">
                      <span className="font-mono text-[10px] font-bold text-[#d9383a] uppercase">{t.adminFormEditorTitle}</span>
                      <button 
                        type="button" 
                        onClick={() => setEditingItem(null)} 
                        className="text-neutral-400 hover:text-black font-bold font-mono text-xs"
                      >
                        {t.adminFormCancel}
                      </button>
                    </div>

                    {/* Multilingual Name Block */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase text-neutral-400 mb-1">{t.adminFormProdName} (FR)</label>
                        <input 
                          type="text"
                          value={editingItem.name}
                          onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value.toUpperCase() })}
                          className="w-full text-xs font-bold border-2 border-black rounded p-2 focus:outline-none bg-neutral-50/30"
                          required
                          id="item-form-name"
                        />
                      </div>
                      <div dir="rtl">
                        <label className="block text-[10px] font-mono font-bold uppercase text-neutral-400 mb-1 text-right">(AR) الاسم بالعربية</label>
                        <input 
                          type="text"
                          value={editingItem.name_ar || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, name_ar: e.target.value })}
                          className="w-full text-xs font-bold border-2 border-black rounded p-2 focus:outline-none text-right bg-neutral-50/30"
                          placeholder="الاسم باللغة العربية..."
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase text-neutral-400 mb-1">(ES) Nombre en Español</label>
                        <input 
                          type="text"
                          value={editingItem.name_es || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, name_es: e.target.value.toUpperCase() })}
                          className="w-full text-xs font-bold border-2 border-black rounded p-2 focus:outline-none bg-neutral-50/30"
                          placeholder="Nombre en español..."
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase text-neutral-400 mb-1">(EN) Name in English</label>
                        <input 
                          type="text"
                          value={editingItem.name_en || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, name_en: e.target.value.toUpperCase() })}
                          className="w-full text-xs font-bold border-2 border-black rounded p-2 focus:outline-none bg-neutral-50/30"
                          placeholder="Name in English..."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase text-neutral-500 mb-1">{t.adminFormPrice}</label>
                        <input 
                          type="number"
                          value={editingItem.price}
                          onChange={(e) => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) || 0 })}
                          className="w-full text-xs border-2 border-black rounded p-2 focus:outline-none"
                          required
                          id="item-form-price"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase text-neutral-500 mb-1">{t.adminFormCategory}</label>
                        <select
                          value={editingItem.category}
                          onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                          className="w-full text-xs border-2 border-black rounded p-2 focus:outline-none bg-white font-mono"
                          id="item-form-category"
                        >
                          {lclCategories.map(cat => (
                            <option key={cat.id} value={cat.id}>{getCatName(cat)}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Multilingual Description Block */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase text-neutral-400 mb-1">{t.adminFormDesc} (FR)</label>
                        <textarea
                          value={editingItem.description || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                          className="w-full text-xs border-2 border-black rounded p-2 focus:outline-none min-h-[50px] bg-neutral-50/30"
                          placeholder="Ingrédients en français..."
                        />
                      </div>
                      <div dir="rtl">
                        <label className="block text-[10px] font-mono font-bold uppercase text-neutral-400 mb-1 text-right">(AR) الوصف والتفاصيل</label>
                        <textarea
                          value={editingItem.description_ar || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, description_ar: e.target.value })}
                          className="w-full text-xs border-2 border-black rounded p-2 focus:outline-none min-h-[50px] text-right bg-neutral-50/30"
                          placeholder="المكونات والتفاصيل بالعربية..."
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase text-neutral-400 mb-1">(ES) Descripción / Ingredientes</label>
                        <textarea
                          value={editingItem.description_es || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, description_es: e.target.value })}
                          className="w-full text-xs border-2 border-black rounded p-2 focus:outline-none min-h-[50px] bg-neutral-50/30"
                          placeholder="Ingredientes en español..."
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase text-neutral-400 mb-1">(EN) Description in English</label>
                        <textarea
                          value={editingItem.description_en || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, description_en: e.target.value })}
                          className="w-full text-xs border-2 border-black rounded p-2 focus:outline-none min-h-[50px] bg-neutral-50/30"
                          placeholder="Description in English..."
                        />
                      </div>
                    </div>

                    {/* Image Block */}
                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase text-neutral-500 mb-1">{t.adminFormImage}</label>
                      <div className="space-y-2">
                        <input 
                          type="text"
                          placeholder={t.adminFormImagePlaceholder}
                          value={editingItem.image || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                          className="w-full text-xs border-2 border-black rounded p-2 focus:outline-none"
                        />
                        
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <button 
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex-1 py-1.5 px-3 border border-dashed border-[#1a1a1a] rounded flex items-center justify-center space-x-1 bg-neutral-50 hover:bg-neutral-100 text-xs font-mono"
                          >
                            <Upload className="w-3.5 h-3.5 flex-none" />
                            <span>{t.adminFormUploadLocal}</span>
                          </button>
                          <input 
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </div>

                        {/* Preset picks for mock */}
                        <div className="border-t border-neutral-100 pt-2 text-left">
                          <span className="text-[8px] font-mono font-bold text-neutral-400 block mb-1">{t.adminFormQuickGallery}</span>
                          <div className="grid grid-cols-3 gap-1">
                            {QUALITY_FOOD_PRESETS.map((preset) => (
                              <button
                                key={preset.name}
                                type="button"
                                onClick={() => setEditingItem({ ...editingItem, image: preset.url })}
                                className="text-[8px] p-1 border rounded hover:bg-neutral-100 truncate text-neutral-600 block text-center"
                                title={preset.name}
                              >
                                {preset.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Interactive tags checkbox toggle array */}
                    <div className="text-left">
                      <span className="block text-[10px] font-mono font-bold uppercase text-neutral-500 mb-1">{t.adminFormBadges}</span>
                      <div className="flex flex-wrap gap-2">
                        {['NEW', 'MUST', 'POWER', 'VEGGIE'].map((tag) => {
                          const isActive = editingItem.tags?.includes(tag);
                          return (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => {
                                const currentTags = editingItem.tags || [];
                                const nextTags = currentTags.includes(tag) 
                                  ? currentTags.filter(t => t !== tag) 
                                  : [...currentTags, tag];
                                setEditingItem({ ...editingItem, tags: nextTags });
                              }}
                              className={`py-0.5 px-2 rounded font-mono text-[9px] font-bold border ${
                                isActive 
                                  ? 'bg-[#1a1a1a] text-white border-black' 
                                  : 'bg-white text-neutral-500 border-neutral-300 hover:border-black'
                              }`}
                            >
                              {tag}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#d9383a] text-white hover:bg-[#c12f31] font-mono text-xs font-black rounded-lg transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border-2 border-black"
                    >
                      {t.adminFormSaveLine}
                    </button>
                  </form>
                ) : editingCategory ? (
                  /* CATEGORY EDIT SUB-FORM */
                  <form onSubmit={handleSaveCategoryForm} className="bg-white border-2 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_#1a1a1a] space-y-4 text-left">
                    <div className="flex justify-between items-center border-b border-neutral-100 pb-2 rtl:flex-row-reverse">
                      <span className="font-mono text-[10px] font-bold text-[#d9383a] uppercase">{t.adminFormCatTitle}</span>
                      <button 
                        type="button" 
                        onClick={() => setEditingCategory(null)} 
                        className="text-neutral-400 hover:text-black font-bold font-mono text-xs"
                      >
                        {t.adminFormCancel}
                      </button>
                    </div>

                    {/* Multilingual category names */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase text-neutral-400 mb-1">{t.adminFormCatName} (FR)</label>
                        <input 
                          type="text"
                          value={editingCategory.name}
                          onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                          className="w-full text-xs font-bold border-2 border-black rounded p-2 focus:outline-none"
                          required
                        />
                      </div>
                      <div dir="rtl">
                        <label className="block text-[10px] font-mono font-bold uppercase text-neutral-400 mb-1 text-right">(AR) الاسم بالعربية</label>
                        <input 
                          type="text"
                          value={editingCategory.name_ar || ''}
                          onChange={(e) => setEditingCategory({ ...editingCategory, name_ar: e.target.value })}
                          className="w-full text-xs font-bold border-2 border-black rounded p-2 focus:outline-none text-right bg-neutral-50/30"
                          placeholder="الاسم بالعربية..."
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase text-neutral-400 mb-1">(ES) Nombre en Español</label>
                        <input 
                          type="text"
                          value={editingCategory.name_es || ''}
                          onChange={(e) => setEditingCategory({ ...editingCategory, name_es: e.target.value })}
                          className="w-full text-xs font-bold border-2 border-black rounded p-2 focus:outline-none bg-neutral-50/30"
                          placeholder="Nombre en español..."
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase text-neutral-400 mb-1">(EN) Name in English</label>
                        <input 
                          type="text"
                          value={editingCategory.name_en || ''}
                          onChange={(e) => setEditingCategory({ ...editingCategory, name_en: e.target.value })}
                          className="w-full text-xs font-bold border-2 border-black rounded p-2 focus:outline-none bg-neutral-50/30"
                          placeholder="Name in English..."
                        />
                      </div>
                    </div>

                    {/* Multilingual category descriptions */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase text-neutral-400 mb-1">{t.adminFormCatSlogan} (FR)</label>
                        <input 
                          type="text"
                          value={editingCategory.description || ''}
                          onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                          className="w-full text-xs border-2 border-black rounded p-2 focus:outline-none"
                          placeholder="Slogan / Légende..."
                        />
                      </div>
                      <div dir="rtl">
                        <label className="block text-[10px] font-mono font-bold uppercase text-neutral-400 mb-1 text-right">(AR) شعار القسم بالعربية</label>
                        <input 
                          type="text"
                          value={editingCategory.description_ar || ''}
                          onChange={(e) => setEditingCategory({ ...editingCategory, description_ar: e.target.value })}
                          className="w-full text-xs border-2 border-black rounded p-2 focus:outline-none text-right bg-neutral-50/30"
                          placeholder="شعار القسم بالعربية..."
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase text-neutral-400 mb-1">(ES) Eslogan / Leyenda</label>
                        <input 
                          type="text"
                          value={editingCategory.description_es || ''}
                          onChange={(e) => setEditingCategory({ ...editingCategory, description_es: e.target.value })}
                          className="w-full text-xs border-2 border-black rounded p-2 focus:outline-none bg-neutral-50/30"
                          placeholder="Eslogan en español..."
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase text-neutral-400 mb-1">(EN) Slogan / Legend in English</label>
                        <input 
                          type="text"
                          value={editingCategory.description_en || ''}
                          onChange={(e) => setEditingCategory({ ...editingCategory, description_en: e.target.value })}
                          className="w-full text-xs border-2 border-black rounded p-2 focus:outline-none bg-neutral-50/30"
                          placeholder="Slogan / Legend in English..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase text-neutral-500 mb-1 font-mono">{t.adminFormCatIcon}</label>
                      <select
                        value={editingCategory.icon || 'Utensils'}
                        onChange={(e) => setEditingCategory({ ...editingCategory, icon: e.target.value })}
                        className="w-full text-xs border-2 border-[#1a1a1a] rounded p-2 focus:outline-none bg-white font-mono"
                        id="cat-form-icon"
                      >
                        <option value="Cookie">{t.adminFormCatIconOpt1}</option>
                        <option value="Egg">{t.adminFormCatIconOpt2}</option>
                        <option value="Utensils">{t.adminFormCatIconOpt3}</option>
                        <option value="Salad">{t.adminFormCatIconOpt4}</option>
                        <option value="Pizza">{t.adminFormCatIconOpt5}</option>
                        <option value="Flame">{t.adminFormCatIconOpt6}</option>
                        <option value="CupSoda">{t.adminFormCatIconOpt7}</option>
                        <option value="Coffee">{t.adminFormCatIconOpt8}</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 bg-[#d9383a] text-white hover:bg-[#c12f31] font-mono text-xs font-black rounded-lg transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border-2 border-black"
                    >
                      {t.adminFormCatSave}
                    </button>
                  </form>
                ) : (
                  /* ========================================================
                     QR CODE INTEGRATION AND RESTAURANT SIGN CUSTOMIZER
                     ======================================================== */
                  <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_#1a1a1a] space-y-4 text-left">
                    <div className="flex items-center space-x-2 border-b border-neutral-100 pb-2 rtl:space-x-reverse">
                      <QrCode className="w-5 h-5 text-[#d9383a] flex-none" />
                      <span className="font-mono text-xs font-extrabold uppercase text-[#1a1a1a]">{t.adminQrCustomizerTitle}</span>
                    </div>

                    <div className="text-xs text-neutral-500 leading-relaxed font-sans">
                      {t.adminQrCustomizerDesc}
                    </div>

                    {/* QR Config Grid */}
                    <div className="grid grid-cols-2 gap-3 bg-neutral-50 p-2.5 rounded-lg border border-neutral-200">
                      <div>
                        <label className="block text-[9px] font-mono font-bold uppercase text-neutral-500 mb-0.5">{t.adminQrTableNum}</label>
                        <input 
                          type="text" 
                          value={tableNumber} 
                          onChange={(e) => setTableNumber(e.target.value)}
                          className="w-full p-1.5 border-2 border-black rounded text-xs bg-white text-center font-mono font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-mono font-bold uppercase text-neutral-500 mb-0.5">{t.adminQrColor}</label>
                        <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
                          <input 
                            type="color" 
                            value={qrColor} 
                            onChange={(e) => setQrColor(e.target.value)}
                            className="w-8 h-8 rounded border-2 border-black cursor-pointer bg-white"
                          />
                          <span className="font-mono text-[9px] font-bold">{qrColor.toUpperCase()}</span>
                        </div>
                      </div>

                      <div className="col-span-2">
                        <label className="block text-[9px] font-mono font-bold uppercase text-neutral-500 mb-0.5">{t.adminQrWifiSsid}</label>
                        <input 
                          type="text" 
                          value={wifiSsid} 
                          onChange={(e) => setWifiSsid(e.target.value)}
                          className="w-full p-1.5 border border-neutral-300 rounded text-xs bg-white font-mono"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="block text-[9px] font-mono font-bold uppercase text-neutral-500 mb-0.5">{t.adminQrWifiPass}</label>
                        <input 
                          type="text" 
                          value={wifiPass} 
                          onChange={(e) => setWifiPass(e.target.value)}
                          className="w-full p-1.5 border border-neutral-300 rounded text-xs bg-white font-mono"
                        />
                      </div>
                    </div>

                    {/* Interactive standalone stand mockup view */}
                    <div className="border-2 border-black rounded-xl p-4 bg-orange-50/20 text-center relative overflow-hidden flex flex-col items-center">
                      <span className={`absolute top-1 ${language === 'ar' ? 'left-2' : 'right-2'} text-[9px] text-[#d9383a] font-mono uppercase bg-red-100 border border-red-400 px-1.5 rounded-full font-bold`}>{t.adminQrApercuTable} {tableNumber}</span>
                      
                      <div className="font-serif text-lg font-black text-neutral-800 tracking-tight leading-none mt-2">Oh Crêpe!</div>
                      <div className="text-[8px] font-mono uppercase tracking-widest text-neutral-500 font-bold mb-3">{t.bistroSubtitle}</div>

                      <div className="bg-white p-2 border-2 border-black rounded shadow-sm inline-block mb-3">
                        <img 
                          src={qrCodeFinalSrc} 
                          alt="Dynamic Table QR" 
                          className="w-32 h-32" 
                        />
                      </div>

                      <div className="text-[9px] font-mono text-neutral-500 leading-snug">
                        🔑 {t.adminQrWifiLabel} <strong>{wifiSsid}</strong> | {t.adminQrMdpLabel} <strong>{wifiPass}</strong>
                      </div>
                      
                      <div className="flex gap-2 w-full mt-3.5 rtl:flex-row-reverse">
                        <button 
                          type="button"
                          onClick={triggerPrintSign}
                          className="flex-1 flex items-center justify-center space-x-1 border border-black bg-[#1a1a1a] text-white hover:bg-neutral-800 text-[10px] font-mono font-bold py-1.5 px-2 rounded shadow transition-colors"
                        >
                          <QrCode className="w-3.5 h-3.5 flex-none" />
                          <span>{t.adminQrPrintBtn}</span>
                        </button>
                        <button 
                          type="button"
                          onClick={handleDownloadClientQR}
                          className="flex-1 flex items-center justify-center space-x-1 border border-black bg-amber-500 text-white hover:bg-amber-600 text-[10px] font-mono font-bold py-1.5 px-2 rounded shadow transition-colors"
                          title={t.adminQrHdTitle}
                        >
                          <Globe className="w-3.5 h-3.5 flex-none" />
                          <span>{t.adminQrHdBtn}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Apply Bulk Changes Row */}
              <div className="pt-6 border-t-2 border-[#1a1a1a] mt-6 flex-shrink-0 text-center">
                <button
                  type="button"
                  onClick={handleApplyAllChanges}
                  className="w-full py-3 bg-emerald-500 text-white hover:bg-emerald-600 font-mono text-xs font-black uppercase tracking-widest transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black rounded-xl flex items-center justify-center space-x-2"
                >
                  <Save className="w-4 h-4 flex-none" />
                  <span>{t.adminApplyChanges}</span>
                </button>
                <div className="text-center mt-2.5 text-[10px] text-neutral-400 font-mono">
                  {t.adminApplyFooter}
                </div>
                {cloudId && (
                  <div className="bg-neutral-50 px-3 py-2 rounded-lg border border-neutral-200 text-left mt-3">
                    <span className="block text-[8px] font-sans leading-none tracking-wider text-neutral-400 uppercase font-bold">Base de données en ligne synchronisée</span>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mt-1 leading-normal">
                      <span className="font-mono text-[10.5px] text-[#d9383a] font-bold select-all bg-red-50/50 px-1.5 py-0.5 rounded border border-red-100">{cloudId}</span>
                      <span className="text-[8.5px] font-sans text-neutral-500">Définissez cette valeur dans la constante <code>CLOUD_DATABASE_ID</code> de <code>App.tsx</code> pour unifier globalement tous les appareils.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
