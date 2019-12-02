import { Component, OnInit } from '@angular/core';
import { Material } from '../material.model';
import { MaterialsService } from '../materials.service';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-material',
  templateUrl: './material.page.html',
  styleUrls: ['./material.page.scss'],
})
export class MaterialPage implements OnInit {

  public loadedMaterials: Material[];

  constructor(private materialService: MaterialsService, private router: Router) { }

  ngOnInit() {
    this.materialService.materials.subscribe(materials => {
      this.loadedMaterials = materials;
    });
  }

  onEditOffer(materialId: string, slidingItem: IonItemSliding) {
    this.router.navigate(['/', 'material', 'edit', materialId]);
    slidingItem.close();
  }
}
