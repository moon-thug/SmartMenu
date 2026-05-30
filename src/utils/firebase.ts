import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDocFromServer, collection, writeBatch, getDocs } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { INITIAL_MENU_DATA } from '../data';
import { Category, MenuItem } from '../types';

// Initialize firebase app and firestore database
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

/**
 * Validates the Firestore connection on boot
 */
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration or network status.", error);
    }
  }
}
testConnection();

// Error response structure mandated by system Firestore Integration skill
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

/**
 * Seeding helper: If the Firestore database is empty, seeds default categories and items.
 */
export async function seedDatabaseIfEmpty() {
  try {
    const categoriesCol = collection(db, 'categories');
    const categoriesSnap = await getDocs(categoriesCol);
    
    if (categoriesSnap.empty) {
      console.log('Seeding initial categories and items into Firestore...');
      const batch = writeBatch(db);

      // Seed categories
      INITIAL_MENU_DATA.categories.forEach((cat) => {
        const docRef = doc(db, 'categories', cat.id);
        batch.set(docRef, {
          id: cat.id,
          name: cat.name,
          ...(cat.name_ar && { name_ar: cat.name_ar }),
          ...(cat.name_en && { name_en: cat.name_en }),
          ...(cat.name_es && { name_es: cat.name_es }),
          ...(cat.description && { description: cat.description }),
          ...(cat.description_ar && { description_ar: cat.description_ar }),
          ...(cat.description_en && { description_en: cat.description_en }),
          ...(cat.description_es && { description_es: cat.description_es }),
          ...(cat.icon && { icon: cat.icon })
        });
      });

      // Seed items
      INITIAL_MENU_DATA.items.forEach((item) => {
        const docRef = doc(db, 'items', item.id);
        batch.set(docRef, {
          id: item.id,
          name: item.name,
          price: item.price,
          category: item.category,
          available: item.available,
          ...(item.name_ar && { name_ar: item.name_ar }),
          ...(item.name_en && { name_en: item.name_en }),
          ...(item.name_es && { name_es: item.name_es }),
          ...(item.description && { description: item.description }),
          ...(item.description_ar && { description_ar: item.description_ar }),
          ...(item.description_en && { description_en: item.description_en }),
          ...(item.description_es && { description_es: item.description_es }),
          ...(item.image && { image: item.image }),
          ...(item.tags && { tags: item.tags })
        });
      });

      await batch.commit();
      console.log('Successfully seeded database with defaults.');
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'seed_operation');
  }
}
