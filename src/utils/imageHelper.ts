/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Clean special characters and accents, converting to latin searchable words
 */
function cleanSearchString(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents/diacritics
    .replace(/[^a-zA-Z0-9\s]/g, " ") // remove special characters but keep spaces
    .replace(/\s+/g, " ") // merge extra spaces
    .trim();
}

/**
 * Robust dynamic food image finder:
 * - Extracts clean keywords from the item's name
 * - Filters out boilerplate words (stopwords)
 * - Identifies foods or drinks to focus the query
 * - Constructs a bulletproof, high-quality, fully specific search URL using LoremFlickr or stable Unsplash presets
 */
export function getItemImage(itemName: string, itemCategory: string = ''): string {
  // If the user overrides with a custom direct image URL, keep it
  if (itemName.startsWith('http')) {
    return itemName;
  }

  const nameUpper = itemName.toUpperCase();

  // STABLE HIGH-QUALITY SEED PRESET MATCHES (To avoid any potential discrepancies for major highlight items)
  const LOWER = itemName.toLowerCase();

  const presets: Record<string, string> = {
    'viennoiserie': 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
    'harcha': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80',
    'pudding de chia': 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=600&q=80',
    'omelette nature': 'https://images.unsplash.com/photo-1494597564530-871f2b93ac55?auto=format&fit=crop&w=600&q=80',
    'omelette saumon': 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80',
    'tajine khlie': 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=600&q=80',
    'acai bowl': 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&q=80',
    'lasagne bolognaise': 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=600&q=80',
    'lasagna bolognaise': 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=600&q=80',
    'crevette pil-pil': 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    'crevettes pil-pil': 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    'gratin fruits de mer': 'https://images.unsplash.com/photo-1534080391025-a7db5eed778b?auto=format&fit=crop&w=600&q=80',
    'tartine italienne': 'https://images.unsplash.com/photo-1572448868306-147c34857477?auto=format&fit=crop&w=600&q=80',
    'tartine fermiere': 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=600&q=80',
    'tartine norvegienne': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    'quesadillas poulet': 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=600&q=80',
    'quesadillas viande': 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=600&q=80',
    'port-lyautey': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    'caesar': 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80',
    'mac & cheese': 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80',
    'bolognaise': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    'margarita': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    'margharita': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    'vegetarienne': 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
    '4 fromages': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    'al tartufo': 'https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=600&q=80',
    'cheesy classic': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    'pancake nutella': 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80',
    'crepe nutella': 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80',
    'espresso': 'https://images.unsplash.com/photo-1510972527409-cac184450064?auto=format&fit=crop&w=600&q=80',
    'mojito classic': 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    'pastilla poulet': 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80',
    'pastilla fruits de mer': 'https://images.unsplash.com/photo-1534080391025-a7db5eed778b?auto=format&fit=crop&w=600&q=80'
  };

  // Check matching in values
  for (const presetKey of Object.keys(presets)) {
    if (LOWER.includes(presetKey)) {
      return presets[presetKey];
    }
  }

  // Define broad category filters for the dynamic generator
  let primaryTheme = 'plate,food';
  const catLower = itemCategory.toLowerCase();

  if (
    catLower.includes('boisson') ||
    catLower.includes('drink') ||
    catLower.includes('juice') ||
    catLower.includes('jus') ||
    catLower.includes('shake') ||
    catLower.includes('mojito') ||
    catLower.includes('frappes') ||
    catLower.includes('tea') ||
    catLower.includes('detox') ||
    catLower.includes('cafe') ||
    catLower.includes('chocolate') ||
    catLower.includes('hot')
  ) {
    primaryTheme = 'beverage,drink,cup';
  } else if (catLower.includes('crepe') || catLower.includes('pancake')) {
    primaryTheme = 'crepe,pancake,dessert';
  } else if (catLower.includes('burger') || catLower.includes('hamburgers') || catLower.includes('sandwich') || catLower.includes('b\'wich')) {
    primaryTheme = 'burger,sandwich';
  } else if (catLower.includes('pizza')) {
    primaryTheme = 'pizza';
  } else if (catLower.includes('pasta') || catLower.includes('pates') || catLower.includes('spaghetti')) {
    primaryTheme = 'pasta,italian';
  } else if (catLower.includes('salad') || catLower.includes('salades')) {
    primaryTheme = 'salad,fresh';
  } else if (catLower.includes('omelette') || catLower.includes('oeuf')) {
    primaryTheme = 'omelette,egg';
  }

  // Extract clean keywords from the item's name
  const cleanName = cleanSearchString(itemName);
  const rawWords = cleanName.split(/\s+/).filter(w => w.length > 2);

  const stopwords = new Set([
    'avec', 'choix', 'supplements', 'sans', 'tout', 'toutes', 'veuillez', 'notre', 'nos', 
    'votre', 'servis', 'servi', 'style', 'fait', 'maison', 'complexe', 'complet', 'signature', 
    'lassortiment', 'lassortiments', 'duo', 'trio', 'les', 'des', 'une', 'under', 'from', 
    'with', 'sauce', 'speciale', 'nature', 'facile', 'frais', 'choix', 'parfums'
  ]);

  const filteredWords = rawWords.filter(w => !stopwords.has(w.toLowerCase()));
  const chosenWords = filteredWords.length > 0 ? filteredWords : rawWords;

  // Take the first 3 relevant words and append the focused food theme keywords
  const keywordQuery = [...chosenWords.slice(0, 3), primaryTheme].join(',');

  // Return a precise, locked, query-specific search URL using dynamic food-specific loremflickr.com
  return `https://loremflickr.com/600/450/${encodeURIComponent(keywordQuery)}?random=${encodeURIComponent(cleanName)}`;
}

/**
 * Retained for backwards compatibility with any existing files/stores.
 */
export function getAutoFoodImage(name: string, categoryId?: string, itemId?: string): string {
  return getItemImage(name, categoryId || '');
}
