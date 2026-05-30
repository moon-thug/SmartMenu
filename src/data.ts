import { MenuData } from './types';
import { CATEGORIES } from './data/categories';
import { BREAKFAST_ITEMS } from './data/items_breakfast';
import { ENTREES_ITEMS } from './data/items_entrees';
import { SALADES_ITEMS } from './data/items_salades';
import { PATES_ITEMS } from './data/items_pates';
import { PIZZA_ITEMS } from './data/items_pizza';
import { BURGERS_ITEMS } from './data/items_burgers';
import { PLATS_ITEMS } from './data/items_plats';
import { SWEET_CREPES_AND_PANCAKES } from './data/items_sweet_crepes_pancakes';
import { SAVORY_CREPES } from './data/items_savory_crepes';
import { DRINK_ITEMS } from './data/items_drinks';

export const INITIAL_MENU_DATA: MenuData = {
  categories: CATEGORIES,
  items: [
    ...BREAKFAST_ITEMS,
    ...ENTREES_ITEMS,
    ...SALADES_ITEMS,
    ...PATES_ITEMS,
    ...PIZZA_ITEMS,
    ...BURGERS_ITEMS,
    ...PLATS_ITEMS,
    ...SWEET_CREPES_AND_PANCAKES,
    ...SAVORY_CREPES,
    ...DRINK_ITEMS
  ]
};
