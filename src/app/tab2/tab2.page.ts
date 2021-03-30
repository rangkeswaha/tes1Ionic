import { Component } from '@angular/core';
import { FotoService } from '../service/foto.service';
import { AngularFireStorage } from '@angular/fire/storage';
// import { Console } from 'node:console';

export interface fileFoto {
  name : string; //filepath
  path : string; //webviewpath
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  urlImageStorage : string[] = [];
  nomor : string[] = ["1", "2"];
  a = 0;

  constructor(public fotoservice: FotoService,
    public fotoService : FotoService,
    private afStorage : AngularFireStorage) 
    {}

  tambahfoto(){
    this.fotoservice.tambahfoto();
  }

  async ngOnInit(){
    await this.fotoservice.loadFoto();
    this.tampilkanData();
  }

  hapusFoto(){
    var refImage = this.afStorage.storage.ref('imgStorage');
    refImage.listAll().then((res) => {
      res.items.forEach((itemRef) => {
        itemRef.delete().then(() => {
          //menampilkan data
          this.tampilkanData();
        });
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  tampilkanData(){
    this.urlImageStorage = [];
    var refImage = this.afStorage.storage.ref('imgStorage');
    refImage.listAll().then((res) => {
      res.items.forEach((itemRef) => {
        itemRef.getDownloadURL().then(url => {
          this.urlImageStorage.unshift(url)
        })
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  uploadFoto(){
    this.urlImageStorage = [];
    for (var index in this.fotoService.dataFoto){
      const imgFilepath = `imgStorage/${this.fotoService.dataFoto[index].filePath}`;

      this.afStorage.upload(imgFilepath, this.fotoService.dataFoto[index].dataImage).then(() => {
        this.afStorage.storage.ref().child(imgFilepath).getDownloadURL()
      });
    }
    this.a += 1;
  }

  clickfoto(i: any){
    const temp = i.toString();
    this.nomor.push(temp);
    this.a += 1;
  }

}
