import { Injectable } from '@angular/core';
import {AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private afstore: AngularFirestore,
  ) { }

  async create(details){
    try{
      const receipt = await this.afstore.collection('details').add(details);
      return {
        value: receipt.id,
        success: true
      }
    } catch(err) {
      return {
        value: err.message,
        success: false
      }
    }
   }

   async read(){
     try{
       const receipt = await this.afstore.collection('details').snapshotChanges();
       return {
         value: receipt,
         success: true
       }
     } catch(err) {
       return {
         value: err.message,
         success: false
       }
     }
    }

    async update(details, id){
      try{
        delete details.id;
        const rec = await this.afstore.doc('details/' + id).set(details);
        return {
          value: rec,
          success: true
        }
      }catch (err){
        return{
          value: err.message,
          success: false
        }
      }

    }

    async delete(id){
        try{
          const rec = await this.afstore.doc('details/' + id).delete();
          return {
            value: rec,
            success: true
          }
        }catch (err){
          return{
            value: err.message,
            success: false
          }
        }
    }
  }
