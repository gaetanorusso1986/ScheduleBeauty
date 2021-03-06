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
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'reservations-received',
    loadChildren: () => import('./reservations-received/reservations-received.module').then( m => m.ReservationsReceivedPageModule)
  },
  {
    path: 'myprofile',
    loadChildren: () => import('./myprofile/myprofile.module').then( m => m.MyprofilePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'mybeauty',
    loadChildren: () => import('./mybeauty/mybeauty.module').then( m => m.MybeautyPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'changepassword',
    loadChildren: () => import('./changepassword/changepassword.module').then( m => m.ChangepasswordPageModule)
  },
  {
    path: 'create-social',
    loadChildren: () => import('./create-social/create-social.module').then( m => m.CreateSocialPageModule)
  },
  {
    path: 'social',
    loadChildren: () => import('./social/social.module').then( m => m.SocialPageModule)
  },
  {
    path: 'update-social',
    loadChildren: () => import('./update-social/update-social.module').then( m => m.UpdateSocialPageModule)
  },
  {
    path: 'create-service',
    loadChildren: () => import('./create-service/create-service.module').then( m => m.CreateServicePageModule)
  },
  {
    path: 'service',
    loadChildren: () => import('./service/service.module').then( m => m.ServicePageModule)
  },
  {
    path: 'update-service',
    loadChildren: () => import('./update-service/update-service.module').then( m => m.UpdateServicePageModule)
  },
  {
    path: 'holidays',
    loadChildren: () => import('./holidays/holidays.module').then( m => m.HolidaysPageModule)
  },
  {
    path: 'create-holidays',
    loadChildren: () => import('./create-holidays/create-holidays.module').then( m => m.CreateHolidaysPageModule)
  },
  {
    path: 'prenotazione',
    loadChildren: () => import('./prenotazione/prenotazione.module').then( m => m.PrenotazionePageModule)
  },
  {
    path: 'service-list',
    loadChildren: () => import('./service-list/service-list.module').then( m => m.ServiceListPageModule)
  },
  {
    path: 'operator-list',
    loadChildren: () => import('./operator-list/operator-list.module').then( m => m.OperatorListPageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.module').then( m => m.CalendarPageModule)
  },
  {
    path: 'customers',
    loadChildren: () => import('./customers/customers.module').then( m => m.CustomersPageModule)
  },
  {
    path: 'invita-clienti',
    loadChildren: () => import('./invita-clienti/invita-clienti.module').then( m => m.InvitaClientiPageModule)
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
