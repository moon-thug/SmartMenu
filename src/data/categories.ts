import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'breakfast',
    name: 'Breakfast & Bowls',
    name_ar: 'الفطور والباول',
    name_en: 'Breakfast & Bowls',
    name_es: 'Desayunos & Bowls',
    description: 'Omelettes, bowls sains et viennoiseries',
    description_ar: 'بيض، أساي باول، وحلويات الصباح',
    description_en: 'Eggs, healthy bowls, and morning sweets',
    description_es: 'Huevos, boles saludables y dulces de la casa',
    icon: 'Coffee'
  },
  {
    id: 'entrees',
    name: 'Entrées & Tartines',
    name_ar: 'المقبلات والتارتين',
    name_en: 'Appetizers & Toast',
    name_es: 'Entradas & Tostas',
    description: 'Nems, soupes, tartines croustillantes et Tex-Mex',
    description_ar: 'سبرينغ رولز، حساء، تارتين لذيذة وتكس مكس',
    description_en: 'Spring rolls, soups, crispy toast, and Tex-Mex',
    description_es: 'Rollitos de primavera, sopas, tostadas crujientes y Tex-Mex',
    icon: 'Soup'
  },
  {
    id: 'salades',
    name: 'Salades Gourmet',
    name_ar: 'السلطات الراقية',
    name_en: 'Gourmet Salads',
    name_es: 'Ensaladas Gourmet',
    description: 'Fraîches, saines et signatures',
    description_ar: 'طازجة، صحية، ومحضرة باتقان',
    description_en: 'Fresh, healthy, and signature salads',
    description_es: 'Frescas, sanas y ensaladas de firma',
    icon: 'Salad'
  },
  {
    id: 'pates',
    name: 'Spaghetti & Penne',
    name_ar: 'باستا ومعكرونة',
    name_en: 'Pasta & Spaghetti',
    name_es: 'Espaguetis & Penne',
    description: 'La vita è una combinazione di pasta e magie',
    description_ar: 'الحياة مزيج من الباستا والسحر الإيطالي',
    description_en: 'Life is a combination of pasta and magic',
    description_es: 'La vida es una combinación de pasta y magia',
    icon: 'Utensils'
  },
  {
    id: 'pizza',
    name: 'Pizzas au Feu',
    name_ar: 'بيتزا على الحطب',
    name_en: 'Wood-Fired Pizzas',
    name_es: 'Pizzas al Horno',
    description: 'Margarita, 4 Fromages, Tartufo et fruits de mer',
    description_ar: 'مارغريتا، 4 أجبان، تارتوفو ومأكولات بحرية',
    description_en: 'Margarita, Four Cheese, Tartufo, and Seafood',
    description_es: 'Margarita, 4 Quesos, Tartufo y mariscos',
    icon: 'Pizza'
  },
  {
    id: 'burgers',
    name: "Burgers & B'Wich",
    name_ar: 'برجر و ب-ويتش',
    name_en: "Burgers & B'Wich",
    name_es: "Hamburguesas & B'Wich",
    description: 'Servis avec frites de pommes de terre maison',
    description_ar: 'تقدم مع البطاطس المقلية المقرمشة والسلطة',
    description_en: 'Served with crispy homemade fries and greens',
    description_es: 'Servidas con patatas frita caseras y ensalada',
    icon: 'Flame'
  },
  {
    id: 'plats',
    name: 'Plats Principaux',
    name_ar: 'الأطباق الرئيسية',
    name_en: 'Main Courses',
    name_es: 'Platos Principales',
    description: 'Volailles, viandes tendres, poissons et tajines',
    description_ar: 'دجاج، لحوم طرية، أسماك وطواجن مغربية',
    description_en: 'Chicken, tender beef, fish, and Moroccan specialities',
    description_es: 'Pollo, carnes tiernas, pescado y platos marroquíes',
    icon: 'Beef'
  },
  {
    id: 'pancakes',
    name: 'Pancakes Fluffy',
    name_ar: 'بانكيك أمريكي',
    name_en: 'Fluffy Pancakes',
    name_es: 'Pancakes Esponjosos',
    description: 'Nappés de chocolat, miel, amlou et garnitures',
    description_ar: 'شوكولاتة، عسل، أملو وفواكه طازجة',
    description_en: 'Topped with premium chocolate, honey, amlou, and fruits',
    description_es: 'Con chocolate, miel, amlou y aderezos',
    icon: 'Cake'
  },
  {
    id: 'crepes-sucrees',
    name: 'Crêpes Sucrées',
    name_ar: 'كريب حلو',
    name_en: 'Sweet Crêpes',
    name_es: 'Crepes Dulces',
    description: 'Gourmandes, cannelle, Nutella ou Amlou',
    description_ar: 'بالقرفة، نوتيلا، أملو وفواكه',
    description_en: 'Sweet, cinnamon, Nutella, or amlou pairings',
    description_es: 'Dulces, canela, Nutella o amlou',
    icon: 'Cookie'
  },
  {
    id: 'crepes-salees',
    name: 'Crêpes Salées',
    name_ar: 'كريب مالح',
    name_en: 'Savory Crêpes',
    name_es: 'Crepes Salados',
    description: 'Accompagnées de fromage fondant',
    description_ar: 'مع الجبنة الذائبة والصلصة الشهية',
    description_en: 'Served with delicious melted cheese',
    description_es: 'Acompañados de queso fundido',
    icon: 'Egg'
  },
  {
    id: 'hot-drinks',
    name: 'Boissons Chaudes',
    name_ar: 'المشروبات الساخنة',
    name_en: 'Hot Beverages',
    name_es: 'Bebidas Calientes',
    description: 'Expresso, Macchiato, Cappuccino, Thé & Chocolats',
    description_ar: 'إسبريسو، كابتشينو، شاي مغربي وشوكولاتة ساخنة دافئة',
    description_en: 'Espresso, Macchiato, Cappuccino, Organic Tea & Chocolates',
    description_es: 'Café expreso, macchiato, capuchino, té y chocolates calientes',
    icon: 'Coffee'
  },
  {
    id: 'drinks',
    name: 'Boissons Fraîches',
    name_ar: 'العصائر والمشروبات',
    name_en: 'Cold Drinks & Shakes',
    name_es: 'Bebidas Frías & Batidos',
    description: 'Smoothies, Mojitos, Jus de fruits et Milkshakes',
    description_ar: 'سموذي، موهيتو، عصائر طبيعية وميلك شيك منعش',
    description_en: '100% Squeezed juices, Smoothies, Mojitos, and Shakes',
    description_es: 'Zumos 100% naturales, batidos, mojitos y milkshakes',
    icon: 'CupSoda'
  }
];
