export interface Category {
  id: string;
  name: string;
  name_ar?: string;
  name_en?: string;
  name_es?: string;
  description?: string;
  description_ar?: string;
  description_en?: string;
  description_es?: string;
  icon?: string; // Lucide icon name, e.g., 'Coffee', 'Egg', 'Cookie', 'Pizza'
}

export interface MenuItem {
  id: string;
  name: string;
  name_ar?: string;
  name_en?: string;
  name_es?: string;
  description?: string;
  description_ar?: string;
  description_en?: string;
  description_es?: string;
  price: number;
  category: string; // references Category.id
  image?: string; // url or base64 representation
  tags?: string[]; // e.g. ["NEW", "MUST", "SPICY", "POWER", "VEGGIE"]
  available: boolean;
}

export interface MenuData {
  categories: Category[];
  items: MenuItem[];
}
