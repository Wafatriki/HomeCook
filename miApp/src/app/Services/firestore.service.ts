import { Injectable } from '@angular/core';
import {
  Firestore as AngularFirestore,
  collection,
  collectionData,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  getRecipes(): Observable<any[]> {
    const recipesCollection = collection(this.firestore, 'Recipes');
    return collectionData(recipesCollection, { idField: 'id' }) as Observable<any[]>;
  }

  getRecipeOfTheDay(): Promise<any> {
    const recipesCollection = collection(this.firestore, 'Recipes');
    return getDoc(doc(recipesCollection, '1')).then(docSnap =>
      docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null
    );
  }

  getRecipeTypes(): Observable<any[]> {
    const typesCollection = collection(this.firestore, 'RecipeTypes');
    return collectionData(typesCollection, { idField: 'id' }) as Observable<any[]>;
  }

  getIngredientTypes(): Observable<any[]> {
    const ingredientCollection = collection(this.firestore, 'IngredientTypes');
    return collectionData(ingredientCollection, { idField: 'id' }) as Observable<any[]>;
  }

  getRecipeById(id: string): Promise<any> {
    const recipeDoc = doc(this.firestore, `Recipes/${id}`);
    return getDoc(recipeDoc).then(docSnap =>
      docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null
    );
  }
}
