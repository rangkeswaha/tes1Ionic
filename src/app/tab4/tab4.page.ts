import { Component } from '@angular/core';
import { FotoService } from '../service/foto.service';
import { AngularFireStorage } from '@angular/fire/storage';

export interface fileFoto {
  name : string; //filepath
  path : string; //webviewpath
}

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  urlImageStorage : string[] = [];
  namafoto : string[] = [];

  constructor(private afStorage : AngularFireStorage,
    public fotoService : FotoService) {}

  async ionViewDidEnter(){
    await this.fotoService.loadFoto();
    this.tampilkanData();
  }

  tampilkanData(){
    this.urlImageStorage = [];
    this.namafoto = [];
    var refImage = this.afStorage.storage.ref('imgStorage');
    refImage.listAll().then((res) => {
      res.items.forEach((itemRef) => {
        itemRef.getMetadata().then(url => {
          this.namafoto.unshift(url)
          console.log(this.namafoto);
          
        })
        itemRef.getDownloadURL().then(url => {
          this.urlImageStorage.unshift(url)
        })
      });
    }).catch((error) => {
      console.log(error);
    });

    refImage.getMetadata()
      .then((metadata) => {
        this.namafoto.unshift(metadata)
      })

  }

}
