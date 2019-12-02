import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MaterialsService } from '../materials.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Material } from '../material.model';

@Component({
  selector: 'app-material-edit',
  templateUrl: './material-edit.page.html',
  styleUrls: ['./material-edit.page.scss'],
})
export class MaterialEditPage implements OnInit {

  form: FormGroup;
  loadedMaterial: Material;

  constructor(private materialService: MaterialsService, private route: ActivatedRoute, private navCtrl: NavController, private toastController: ToastController, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('materialId')) {
        this.navCtrl.navigateBack('/material');
      }
      this.materialService.getMaterial(paramMap.get('materialId')).subscribe(material => {
        this.loadedMaterial = material;
        this.form = new FormGroup({
          title: new FormControl(this.loadedMaterial.name, {
            updateOn: 'change',
            validators: [Validators.required]
          }),
          description: new FormControl(this.loadedMaterial.description, {
            updateOn: 'change',
            validators: [Validators.required, Validators.maxLength(50)]
          }),
          quantity: new FormControl(this.loadedMaterial.quantity, {
            updateOn: 'change',
            validators: [Validators.required, Validators.min(1)]
          }),
        });
      });
    });
  }
  editMaterial() {
    this.materialService.updateMaterial(this.loadedMaterial.id, this.form.value.title, this.form.value.description, this.form.value.quantity)
    .subscribe( () => {
      this.toastController.create({
        animated: true,
        duration: 4000,
        position: 'top',
        showCloseButton: true,
        message: 'El elemento se edito correctamente'
      }).then(toastEl => {
        toastEl.present();
        this.router.navigate(['/material']);
      })
    });
  }
}
