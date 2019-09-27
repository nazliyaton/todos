import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';
import { FirebaseService } from '../service/firebase.service';
import {NavController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})

export class DetailsPage implements OnInit {
details:{title:string, desc:string};
detailId:any;

  constructor(
    private common : CommonService,
    private fb : FirebaseService,
    private navCtrl : NavController
  ) { }


initValue(){
this.detailId = this.common.getDetailId();
this.details = {title:"", desc:""};

}
  ngOnInit() {
    this.initValue();
    if(!(this.detailId=='0' || this.detailId == 0)){
      this.details = this.common.getReceipt();
    }
  }

 async save(){
   //await this.fb.create(this.details)
   //this.commonservice.presentAlert('Success', 'Your TODO is successfully saved');
   let loading = await this.common.loading();
   loading.present();
   switch(this.detailId){
     case 0:
     case "0":
     this.create(loading);
     break;
     default:
     this.update(loading);
     break;
   }
}
   async create(loading){

     try{
       const rec = await this.fb.create(this.details);
       console.log(rec);

       if(rec.success){
         loading.dismiss();
         this.common.presentAlert("success", "Todo details successfully saved");
         this.navCtrl.back;
       }else{
         loading.dismiss;
         this.common.presentAlert("error", rec.value);
       }
     }catch(err){
       loading.dismiss();
       this.common.presentAlert("Error", err.message);
     }
   }

   deleteIf(){
     return this.detailId == '0' ? false:true;
   }
   async update(loading){
     const update = await this.fb.update(this.details, this.detailId);
     if(update.success){
       loading.dismiss();
       this.common.presentAlert("success", "to details is successfully updated");
       this.navCtrl.back();
     }else{
       loading.dismiss();
       this.common.presentAlert("Error", update.value);
     }
     loading.dismiss();

   }

   async delete(){
     this.common.deleteConfirm(async()=>{
       let loading = await this.common.loading();
       loading.present();
       const update = await this.fb.delete(this.detailId);
       if(update.success){
         loading.dismiss();
         this.common.presentAlert("success", "to details is successfully deleted");
         this.navCtrl.back();
       }else{
         loading.dismiss();
         this.common.presentAlert("Error", update.value);
       }
       loading.dismiss();
     }, this.details.title);
   }


}
