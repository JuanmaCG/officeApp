import { Component, OnInit } from '@angular/core';
import { MaterialsService } from '../materials.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Material } from '../material.model';

@Component({
  selector: 'app-material-detail',
  templateUrl: './material-detail.page.html',
  styleUrls: ['./material-detail.page.scss'],
})
export class MaterialDetailPage implements OnInit {

  public loadedMaterial: Material;
  constructor(private materialService: MaterialsService, private route: ActivatedRoute, private navCtrl: NavController) { }


  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('materialId')) {
        this.navCtrl.navigateBack('/material');
        return;
      }
      this.materialService.getMaterial(paramMap.get('materialId')).subscribe(material => {
        this.loadedMaterial = material;
      });
    });
  }

}
