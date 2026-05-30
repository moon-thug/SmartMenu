/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'fr' | 'ar' | 'en' | 'es';

export interface TranslationDict {
  bistroSubtitle: string;
  changeStyle: string;
  styleBento: string;
  stylePrint: string;
  qrTooltip: string;
  managerBtn: string;
  heroTitle: string;
  heroDesc: string;
  heroTag1: string;
  heroTag2: string;
  searchPlaceholder: string;
  filterLabel: string;
  filterAll: string;
  filterSpecials: string;
  filterNew: string;
  filterPower: string;
  carteComplete: string;
  noProductsFound: string;
  noProductsSub: string;
  resetFilters: string;
  qrModalTitle: string;
  qrModalSubtitle: string;
  qrModalDesc: string;
  qrModalTarget: string;
  qrModalFooter1: string;
  qrModalFooter2: string;
  // Admin Panel UI Translations
  adminTitle: string;
  adminClose: string;
  adminLoginTitle: string;
  adminLoginDesc: string;
  adminPassPlaceholder: string;
  adminIncorrectPass: string;
  adminDemoBtn: string;
  adminLoginBtn: string;
  adminDemoAdvice: string;
  adminTreeTitle: string;
  adminNewCat: string;
  adminNewCatDefault: string;
  adminNewCatDescDefault: string;
  adminNewItemDefault: string;
  adminNewItemDescDefault: string;
  adminCatAttachedWarning: string;
  adminDeleteConfirm: string;
  adminDeleteItemConfirm: string;
  adminAddProductBtn: string;
  adminFormEditorTitle: string;
  adminFormCancel: string;
  adminFormProdName: string;
  adminFormPrice: string;
  adminFormCategory: string;
  adminFormDesc: string;
  adminFormImage: string;
  adminFormImagePlaceholder: string;
  adminFormUploadLocal: string;
  adminFormQuickGallery: string;
  adminFormBadges: string;
  adminFormSaveLine: string;
  adminFormCatTitle: string;
  adminFormCatName: string;
  adminFormCatSlogan: string;
  adminFormCatIcon: string;
  adminFormCatIconOpt1: string;
  adminFormCatIconOpt2: string;
  adminFormCatIconOpt3: string;
  adminFormCatIconOpt4: string;
  adminFormCatIconOpt5: string;
  adminFormCatIconOpt6: string;
  adminFormCatIconOpt7: string;
  adminFormCatIconOpt8: string;
  adminFormCatSave: string;
  adminQrCustomizerTitle: string;
  adminQrCustomizerDesc: string;
  adminQrTableNum: string;
  adminQrColor: string;
  adminQrWifiSsid: string;
  adminQrWifiPass: string;
  adminQrApercuTable: string;
  adminQrWifiLabel: string;
  adminQrMdpLabel: string;
  adminQrPrintBtn: string;
  adminQrHdBtn: string;
  adminQrHdTitle: string;
  adminQrFooterText: string;
  adminApplyChanges: string;
  adminApplyDone: string;
  adminApplyFooter: string;
  // Multilingual labels for forms
  frenchLabel: string;
  arabicLabel: string;
  englishLabel: string;
  spanishLabel: string;
}

export const TRANSLATIONS: Record<Language, TranslationDict> = {
  fr: {
    bistroSubtitle: "Bistro & Crêperie Premium",
    changeStyle: "Changer de design",
    styleBento: "Style Bento",
    stylePrint: "Style Imprimé",
    qrTooltip: "Afficher le QR Code",
    managerBtn: "Manager ⚙️",
    heroTitle: "Oh Crêpe!",
    heroDesc: "Une combinaison exquise de crêpes sucrées et salées, burgers gourmets, pizzas croustillantes, pâtes fraîches et délicieux smoothies. Parcourez notre carte digitale interactive.",
    heroTag1: "100% Ingrédients Frais",
    heroTag2: "⚡ Livraison & Sur place",
    searchPlaceholder: "Rechercher une crêpe, un smoothie, une salade...",
    filterLabel: "Filtres :",
    filterAll: "Tout",
    filterSpecials: "Specials ✨",
    filterNew: "Nouveautés 🪅",
    filterPower: "Énergie ⚡",
    carteComplete: "🍽️ Carte Complète",
    noProductsFound: "Aucun produit trouvé",
    noProductsSub: "Vos filtres ou votre recherche ne correspondent à aucune option disponible. Essayez d'effacer les filtres.",
    resetFilters: "Réinitialiser les filtres",
    qrModalTitle: "Oh Crêpe! QR code",
    qrModalSubtitle: "Menu Digital de Table",
    qrModalDesc: "Scannez avec un téléphone pour voir, filtrer et explorer notre carte gourmande directement !",
    qrModalTarget: "Cible :",
    qrModalFooter1: "✨ 100% Sans contact",
    qrModalFooter2: "📱 Compatible iOS & Android",
    // Admin
    adminTitle: "Oh Crêpe! • Terminal de Gestion",
    adminClose: "Fermer le terminal",
    adminLoginTitle: "Accès Gérant",
    adminLoginDesc: "Veuillez saisir le code d'accès de votre restaurant pour éditer les prix, ajouter des produits ou modifier la carte.",
    adminPassPlaceholder: "Saisir le mot de passe...",
    adminIncorrectPass: "Mot de passe incorrect! Essayez \"1234\" ou \"admin\".",
    adminDemoBtn: "Démo Express 🚀",
    adminLoginBtn: "Connexion Gérant",
    adminDemoAdvice: "⭐ Conseil démo : Entrez le code 1234 ou cliquez sur \"Démo Express\".",
    adminTreeTitle: "Arborescence du Menu",
    adminNewCat: "+ Nouvelle Catégorie",
    adminNewCatDefault: "Nouveau Groupe",
    adminNewCatDescDefault: "Petites faims ou grands moments",
    adminNewItemDefault: "Nouveau Produit",
    adminNewItemDescDefault: "Délicieuse description faite maison.",
    adminCatAttachedWarning: "Impossible de supprimer! Cette catégorie contient des produits. Supprimez-les d'abord ou changez leur catégorie.",
    adminDeleteConfirm: "Supprimer cette catégorie définitivement ?",
    adminDeleteItemConfirm: "Êtes-vous sûr de vouloir supprimer ce produit ?",
    adminAddProductBtn: "+ Ajouter Produit",
    adminFormEditorTitle: "Éditeur de Produit",
    adminFormCancel: "Annuler",
    adminFormProdName: "Nom (FR / AR / EN / ES)",
    adminFormPrice: "Prix (Dhs)",
    adminFormCategory: "Catégorie",
    adminFormDesc: "Description (FR / AR / EN / ES)",
    adminFormImage: "Image du Produit",
    adminFormImagePlaceholder: "Coller l'URL d'une image...",
    adminFormUploadLocal: "Charger un fichier local",
    adminFormQuickGallery: "Galerie de presets rapides :",
    adminFormBadges: "Badges Spéciaux :",
    adminFormSaveLine: "Enregistrer cette ligne",
    adminFormCatTitle: "Éditeur de Catégorie",
    adminFormCatName: "Nom (FR / AR / EN / ES)",
    adminFormCatSlogan: "Slogan / Description (FR / AR / EN / ES)",
    adminFormCatIcon: "Icône Thématique",
    adminFormCatIconOpt1: "🍪 Biscuit / Sucré",
    adminFormCatIconOpt2: "🍳 œuf / Salé",
    adminFormCatIconOpt3: "🍴 Fourchette / Couteau",
    adminFormCatIconOpt4: "🥗 Salade Fraîche",
    adminFormCatIconOpt5: "🍕 Pizza Italienne",
    adminFormCatIconOpt6: "🔥 Grillade / Burger",
    adminFormCatIconOpt7: "🥤 Boisson Fraîche",
    adminFormCatIconOpt8: "☕ Café / Dej",
    adminFormCatSave: "Sauvegarder Catégorie",
    adminQrCustomizerTitle: "Concepteur de Supports QR",
    adminQrCustomizerDesc: "Imprimez de magnifiques chevalets de table pour vos clients. Ils accèdent instantanément à cette carte digitale en scannant le code QR.",
    adminQrTableNum: "Numéro de Table",
    adminQrColor: "Couleur QR",
    adminQrWifiSsid: "Wi-Fi SSID du Resto",
    adminQrWifiPass: "Mot de Passe Wi-Fi",
    adminQrApercuTable: "Aperçu Table",
    adminQrWifiLabel: "Wifi :",
    adminQrMdpLabel: "Mdp :",
    adminQrPrintBtn: "Imprimer Chevalet",
    adminQrHdBtn: "QR Client HD 📥",
    adminQrHdTitle: "Télécharger le QR Code client haute définition libre de paramètres admin",
    adminQrFooterText: "Scannez pour afficher notre carte digitale sur votre mobile.",
    adminApplyChanges: "Appliquer les modifications",
    adminApplyDone: "Félicitations! Les modifications de la carte ont été enregistrées avec succès.",
    adminApplyFooter: "Les données modifiées sont stockées localement de manière sécurisée et immédiate.",
    frenchLabel: "Français",
    arabicLabel: "العربية",
    englishLabel: "English",
    spanishLabel: "Español"
  },
  ar: {
    bistroSubtitle: "بيسترو ومحل كريب متميز",
    changeStyle: "تغيير التصميم",
    styleBento: "نمط بينتو المصور",
    stylePrint: "النمط الكلاسيكي ورقي",
    qrTooltip: "عرض رمز الـ QR",
    managerBtn: "المدير ⚙️",
    heroTitle: "أو كريب!",
    heroDesc: "مزيج فريد ورائع من الكريب الحلو والمالح، البرجر الفاخر، البيتزا، الباستا، والعصائر الطبيعية الطازجة. تصفح قائمتنا التفاعلية واكتشف أطباقنا اللذيذة.",
    heroTag1: "مكونات طازجة 100٪",
    heroTag2: "⚡ توصيل ومحلي",
    searchPlaceholder: "ابحث عن كريب، عصير، سلطة...",
    filterLabel: "تصفية :",
    filterAll: "الكل",
    filterSpecials: "المميز ✨",
    filterNew: "الجديد 🪅",
    filterPower: "طاقة ⚡",
    carteComplete: "🍽️ القائمة الكاملة",
    noProductsFound: "لم يتم العثور على أي منتج",
    noProductsSub: "خيارات البحث أو التصفية الحالية لا تطابق أي طبق متاح. جرب حذف الفلاتر.",
    resetFilters: "إعادة ضبط الفلاتر",
    qrModalTitle: "رمز QR أو كريب!",
    qrModalSubtitle: "قائمة الطاولة الرقمية",
    qrModalDesc: "امسح الرمز بهاتفك لعرض قائمتنا الرقمية اللذيذة مباشرة من مكانك بكل سهولة!",
    qrModalTarget: "الرابط :",
    qrModalFooter1: "✨ بدون تلامس 100٪",
    qrModalFooter2: "📱 متوافق مع نظامي iOS و Android",
    // Admin
    adminTitle: "لوحة التحكم والتحرير • أو كريب!",
    adminClose: "إغلاق لوحة التحكم",
    adminLoginTitle: "دخول المدير",
    adminLoginDesc: "يرجى إدخال رمز المرور الخاص بمطعمك لتعديل الأسعار وإضافة أطباق جديدة أو تحرير قائمة الطعام بالكامل.",
    adminPassPlaceholder: "رمز مرور المدير...",
    adminIncorrectPass: "رمز المرور غير صحيح! جرب \"1234\" أو \"admin\".",
    adminDemoBtn: "تجربة سريعة 🚀",
    adminLoginBtn: "تسجيل الدخول",
    adminDemoAdvice: "⭐ نصيحة: أدخل الرمز 1234 أو اضغط على تجربة سريعة للدخول.",
    adminTreeTitle: "تفرعات القائمة والمنتجات",
    adminNewCat: "+ قسم جديد",
    adminNewCatDefault: "قسم جديد",
    adminNewCatDescDefault: "وجبات خفيفة أو أوقات سعيدة مميزة",
    adminNewItemDefault: "منتج جديد",
    adminNewItemDescDefault: "وصف لذيذ ومحضر منزلياً بكل حب.",
    adminCatAttachedWarning: "لا يمكن الحذف! هذا القسم يحتوي على منتجات. يرجى حذفها أولاً أو نقلها إلى قسم آخر.",
    adminDeleteConfirm: "هل أنت متأكد من حذف هذا القسم نهائياً ؟",
    adminDeleteItemConfirm: "هل أنت متأكد من حذف هذا المنتج نهائياً ؟",
    adminAddProductBtn: "+ إضافة منتج",
    adminFormEditorTitle: "تعديل المنتج",
    adminFormCancel: "إلغاء",
    adminFormProdName: "الاسم (فرنسي / عربي / إنجليزي / إسباني)",
    adminFormPrice: "السعر (درهم)",
    adminFormCategory: "القسم",
    adminFormDesc: "الوصف والمكونات (فرنسي / عربي / إنجليزي / إسباني)",
    adminFormImage: "صورة المنتج",
    adminFormImagePlaceholder: "ضع رابط الصورة هنا...",
    adminFormUploadLocal: "تحميل ملف محلي",
    adminFormQuickGallery: "معرض الصور السريع :",
    adminFormBadges: "شارات خاصة :",
    adminFormSaveLine: "حفظ هذا المنتج",
    adminFormCatTitle: "تعديل القسم",
    adminFormCatName: "الاسم (فرنسي / عربي / إنجليزي / إسباني)",
    adminFormCatSlogan: "شعار / ترجمة القسم (فرنسي / عربي / إنجليزي / إسباني)",
    adminFormCatIcon: "أيقونة القسم",
    adminFormCatIconOpt1: "🍪 بسكويت / حلو",
    adminFormCatIconOpt2: "🍳 بيض / مالح",
    adminFormCatIconOpt3: "🍴 شوكة وسكين",
    adminFormCatIconOpt4: "🥗 سلطة طازجة",
    adminFormCatIconOpt5: "🍕 بيتزا إيطالية",
    adminFormCatIconOpt6: "🔥 برجر وشواء",
    adminFormCatIconOpt7: "🥤 مشروبات باردة",
    adminFormCatIconOpt8: "☕ قهوة وفطور",
    adminFormCatSave: "حفظ القسم",
    adminQrCustomizerTitle: "تصميم وطباعة كود QR الطاولات",
    adminQrCustomizerDesc: "اطبع ستاندات طاولة جميلة لعملائك ليمسحوا كود الـ QR ويصلوا لقائمة الطعام الرقمية بشكل فوري.",
    adminQrTableNum: "رقم الطاولة",
    adminQrColor: "لون رمز الـ QR",
    adminQrWifiSsid: "اسم شبكة الواي فاي",
    adminQrWifiPass: "كلمة مرور الواي فاي",
    adminQrApercuTable: "معاينة طاولة",
    adminQrWifiLabel: "الواي فاي :",
    adminQrMdpLabel: "كلمة المرور :",
    adminQrPrintBtn: "طباعة ستاند الطاولة",
    adminQrHdBtn: "رابط QR العميل فائق الجودة 📥",
    adminQrHdTitle: "تنزيل رمز الـ QR ذو الدقة العالية للعملاء خالي من استعلامات الإدارة",
    adminQrFooterText: "امسح الرمز لعرض قائمتنا الرقمية مباشرة من جوالك.",
    adminApplyChanges: "تطبيق وحفظ التغييرات العاجلة",
    adminApplyDone: "تهانينا! تم حفظ تفاصيل وتعديلات القائمة بنجاح وهي نشطة الآن للزبائن.",
    adminApplyFooter: "جميع البيانات المعدلة يتم حفظها محلياً وبشكل آمن ومباشر تزامناً مع استخدامك.",
    frenchLabel: "الفرنسية",
    arabicLabel: "العربية",
    englishLabel: "الإنجليزية",
    spanishLabel: "الإسبانية"
  },
  en: {
    bistroSubtitle: "Premium Bistro & Creperie",
    changeStyle: "Change layout",
    styleBento: "Bento Layout",
    stylePrint: "Classic Printed Layout",
    qrTooltip: "View QR Code",
    managerBtn: "Manager ⚙️",
    heroTitle: "Oh Crêpe!",
    heroDesc: "An exquisite combination of sweet & savory crêpes, gourmet burgers, pizzas, fresh pastas, and healthy smoothies. Browse our interactive digital menu.",
    heroTag1: "100% Fresh Ingredients",
    heroTag2: "⚡ Takeout & Dine-In",
    searchPlaceholder: "Search for a crepe, smoothie, salad, burger...",
    filterLabel: "Filters:",
    filterAll: "All",
    filterSpecials: "Specials ✨",
    filterNew: "New Items 🪅",
    filterPower: "Energy ⚡",
    carteComplete: "🍽️ Full Menu",
    noProductsFound: "No products found",
    noProductsSub: "No meals match your active filters or query. Please try clearing search filters.",
    resetFilters: "Reset filters",
    qrModalTitle: "Oh Crêpe! QR code",
    qrModalSubtitle: "Digital Table Menu",
    qrModalDesc: "Scan with your smartphone to instantly explore our gourmet digital menu from your seat!",
    qrModalTarget: "Target URL:",
    qrModalFooter1: "✨ 100% Contactless",
    qrModalFooter2: "📱 iOS & Android Compatible",
    // Admin
    adminTitle: "Oh Crêpe! • Management Dashboard",
    adminClose: "Close dashboard",
    adminLoginTitle: "Administrator Access",
    adminLoginDesc: "Please enter your restaurant access code to edit item listings, prices, images, and categories.",
    adminPassPlaceholder: "Enter access password...",
    adminIncorrectPass: "Incorrect password! Try using \"1234\" or \"admin\".",
    adminDemoBtn: "Express Demo 🚀",
    adminLoginBtn: "Admin Login",
    adminDemoAdvice: "⭐ Demo Tip: Enter 1234 or click \"Express Demo\" to sign in.",
    adminTreeTitle: "Menu Hierarchies",
    adminNewCat: "+ New Category",
    adminNewCatDefault: "New Category Group",
    adminNewCatDescDefault: "Light bites or wonderful dining highlights",
    adminNewItemDefault: "New Product Meal",
    adminNewItemDescDefault: "Freshly made standard delicious description.",
    adminCatAttachedWarning: "Cannot delete! This category contains active items. Please delete them or change their categories first.",
    adminDeleteConfirm: "Permanently delete this category?",
    adminDeleteItemConfirm: "Are you sure you want to delete this product?",
    adminAddProductBtn: "+ Add Product Item",
    adminFormEditorTitle: "Product Editor",
    adminFormCancel: "Cancel",
    adminFormProdName: "Product Name (FR / AR / EN / ES)",
    adminFormPrice: "Price (Dhs)",
    adminFormCategory: "Category",
    adminFormDesc: "Ingredients / Description (FR / AR / EN / ES)",
    adminFormImage: "Meal Picture / Image",
    adminFormImagePlaceholder: "Paste Unsplash or direct image URL...",
    adminFormUploadLocal: "Upload local file",
    adminFormQuickGallery: "Quick Preset Gallery:",
    adminFormBadges: "Special Badges:",
    adminFormSaveLine: "Save Product Line",
    adminFormCatTitle: "Category Editor",
    adminFormCatName: "Category Name (FR / AR / EN / ES)",
    adminFormCatSlogan: "Slogan / Description (FR / AR / EN / ES)",
    adminFormCatIcon: "Category Icon",
    adminFormCatIconOpt1: "🍪 Cookie / Sweet",
    adminFormCatIconOpt2: "🍳 Eggs / Savory",
    adminFormCatIconOpt3: "🍴 Fork & Knife / Meals",
    adminFormCatIconOpt4: "🥗 Fresh Salad",
    adminFormCatIconOpt5: "🍕 Italian Pizza",
    adminFormCatIconOpt6: "🔥 Flame Grill / Burgers",
    adminFormCatIconOpt7: "🥤 Cold Soda / Drinks",
    adminFormCatIconOpt8: "☕ Hot Coffee / Breakfast",
    adminFormCatSave: "Save Category",
    adminQrCustomizerTitle: "QR Design Studio",
    adminQrCustomizerDesc: "Print beautifully branded table stands for your clients. They access this digital catalog instantly by scanning the QR stand code.",
    adminQrTableNum: "Table ID/Number",
    adminQrColor: "QR Dot Color",
    adminQrWifiSsid: "Restaurant Wi-Fi Name",
    adminQrWifiPass: "Wi-Fi Password",
    adminQrApercuTable: "Table Preview",
    adminQrWifiLabel: "Wi-Fi Name:",
    adminQrMdpLabel: "Password:",
    adminQrPrintBtn: "Print Table Stand",
    adminQrHdBtn: "Client QR High-Res 📥",
    adminQrHdTitle: "Download clean high-definition client QR code separated from manager query properties",
    adminQrFooterText: "Scan to display our interactive digital menu.",
    adminApplyChanges: "Save Layout Changes",
    adminApplyDone: "Congratulations! Menu modifications have been successfully registered and are updated in real-time.",
    adminApplyFooter: "All altered data is securely saved in your local workspace instantly.",
    frenchLabel: "French",
    arabicLabel: "Arabic",
    englishLabel: "English",
    spanishLabel: "Spanish"
  },
  es: {
    bistroSubtitle: "Bistró & Crepería Premium",
    changeStyle: "Cambiar diseño",
    styleBento: "Estilo Bento",
    stylePrint: "Estilo Impreso",
    qrTooltip: "Mostrar código QR",
    managerBtn: "Administrar ⚙️",
    heroTitle: "Oh Crêpe!",
    heroDesc: "Exquisita combinación de crepes dulces y salados, hamburguesas gourmet, pizzas, pastas y batidos frescos. Explore nuestro menú digital interactivo.",
    heroTag1: "Ingredientes 100% Frescos",
    heroTag2: "⚡ Envío & En mesa",
    searchPlaceholder: "Buscar un crepe, un batido, una ensalada...",
    filterLabel: "Filtros:",
    filterAll: "Todo",
    filterSpecials: "Especiales ✨",
    filterNew: "Novedades 🪅",
    filterPower: "Energía ⚡",
    carteComplete: "🍽️ Menú Completo",
    noProductsFound: "Ningún producto encontrado",
    noProductsSub: "Sus filtros o búsqueda no coinciden con ninguna opción disponible. Intente limpiar los filtros.",
    resetFilters: "Restablecer filtros",
    qrModalTitle: "Oh Crêpe! Código QR",
    qrModalSubtitle: "Menú Digital de Mesa",
    qrModalDesc: "¡Escanee con un teléfono para ver y explorar nuestro menú digital de mesa directamente de su asiento!",
    qrModalTarget: "Destino:",
    qrModalFooter1: "✨ 100% Sin contacto",
    qrModalFooter2: "📱 Compatible con iOS & Android",
    // Admin
    adminTitle: "Oh Crêpe! • Terminal de Gestión",
    adminClose: "Cerrar terminal",
    adminLoginTitle: "Acceso Administrativo",
    adminLoginDesc: "Por favor, introduzca el código de acceso de su restaurante para editar precios, agregar platos o modificar el menú.",
    adminPassPlaceholder: "Contraseña...",
    adminIncorrectPass: "¡Contraseña incorrecta! Pruebe \"1234\" o \"admin\".",
    adminDemoBtn: "Demo Express 🚀",
    adminLoginBtn: "Acceso de Gerente",
    adminDemoAdvice: "⭐ Sugerencia: Ingrese 1234 o haga clic en \"Demo Express\".",
    adminTreeTitle: "Estructura del Menú",
    adminNewCat: "+ Nueva Categoría",
    adminNewCatDefault: "Nuevo Grupo",
    adminNewCatDescDefault: "Pequeños antojos o grandes momentos",
    adminNewItemDefault: "Nuevo Producto",
    adminNewItemDescDefault: "Deliciosa descripción casera.",
    adminCatAttachedWarning: "¡Incapaz de borrar! Esta categoría contiene productos. Elimínelos primero o cambie su categoría.",
    adminDeleteConfirm: "¿Eliminar esta categoría permanentemente?",
    adminDeleteItemConfirm: "¿Está seguro de que desea eliminar este producto?",
    adminAddProductBtn: "+ Agregar Producto",
    adminFormEditorTitle: "Editor de Producto",
    adminFormCancel: "Cancelar",
    adminFormProdName: "Nombre (FR / AR / EN / ES)",
    adminFormPrice: "Precio (Dhs)",
    adminFormCategory: "Categoría",
    adminFormDesc: "Descripción (FR / AR / EN / ES)",
    adminFormImage: "Imagen del Producto",
    adminFormImagePlaceholder: "Pegar URL de una imagen...",
    adminFormUploadLocal: "Cargar archivo local",
    adminFormQuickGallery: "Galería de presets rápidos:",
    adminFormBadges: "Etiquetas Especiales:",
    adminFormSaveLine: "Guardar esta línea",
    adminFormCatTitle: "Editor de Categoría",
    adminFormCatName: "Nombre (FR / AR / EN / ES)",
    adminFormCatSlogan: "Eslogan / Descripción (FR / AR / EN / ES)",
    adminFormCatIcon: "Icono Temático",
    adminFormCatIconOpt1: "🍪 Galleta / Dulce",
    adminFormCatIconOpt2: "🍳 Huevo / Salado",
    adminFormCatIconOpt3: "🍴 Tenedor / Cuchillo",
    adminFormCatIconOpt4: "🥗 Ensalada Fresca",
    adminFormCatIconOpt5: "🍕 Pizza Italiana",
    adminFormCatIconOpt6: "🔥 Parrilla / Hamburguesa",
    adminFormCatIconOpt7: "🥤 Bebida Fresca",
    adminFormCatIconOpt8: "☕ Café / Desayuno",
    adminFormCatSave: "Guardar Categoría",
    adminQrCustomizerTitle: "Diseñador de Soportes QR",
    adminQrCustomizerDesc: "Imprima hermosos caballetes de mesa para sus clientes. Ellos accederán al menú de forma inmediata al escanear el código QR.",
    adminQrTableNum: "Número de Mesa",
    adminQrColor: "Color de QR",
    adminQrWifiSsid: "SSID Wi-Fi del Resto",
    adminQrWifiPass: "Contraseña de Wi-Fi",
    adminQrApercuTable: "Vista de Mesa",
    adminQrWifiLabel: "Wifi:",
    adminQrMdpLabel: "Contraseña:",
    adminQrPrintBtn: "Imprimir Caballete",
    adminQrHdBtn: "Descargar QR HD Cliente 📥",
    adminQrHdTitle: "Descargar el código QR de alta definición libre de parámetros administrativos",
    adminQrFooterText: "Escanee el código QR para ver nuestro menú digital en su móvil.",
    adminApplyChanges: "Aplicar cambios del Menú",
    adminApplyDone: "¡Felicidades! Los cambios se han guardado con éxito.",
    adminApplyFooter: "Los datos editados se guardan localmente de forma segura e inmediata.",
    frenchLabel: "Francés",
    arabicLabel: "Árabe",
    englishLabel: "Inglés",
    spanishLabel: "Español"
  }
};
