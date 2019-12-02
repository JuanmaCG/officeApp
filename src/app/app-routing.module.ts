import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/material', pathMatch: 'full' },
  {
    path: 'material',
    children: [
      {
        path: '',
        loadChildren: './material/material.module#MaterialPageModule'
      },
      {
        path: 'detail/:materialId',
        loadChildren: './material-detail/material-detail.module#MaterialDetailPageModule'
      },
      {
        path: 'edit/:materialId',
        loadChildren: './material-edit/material-edit.module#MaterialEditPageModule'
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
