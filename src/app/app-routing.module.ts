import { NgModule,LOCALE_ID} from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'account-recovery',
    loadChildren: () => import('./account-recovery/account-recovery.module').then( m => m.AccountRecoveryPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'beauty-details',
    loadChildren: () => import('./beauty-details/beauty-details.module').then( m => m.BeautyDetailsPageModule)
  },
  {
    path: 'my-booking',
    loadChildren: () => import('./my-booking/my-booking.module').then( m => m.MyBookingPageModule)
  },
  {
    path: 'modal-page',
    loadChildren: () => import('./modal-page/modal-page.module').then( m => m.ModalPagePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
    providers: [{ provide: LOCALE_ID, useValue: "it-IT" }]
})
export class AppRoutingModule {}
