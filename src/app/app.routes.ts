import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { ZonesComponent } from './page/zones/zones.component';
import { BoothsComponent } from './page/booths/booths.component'; // นำเข้าคอมโพเนนท์ Booths
import { ManageBoothsComponent } from './page/manage-booths/manage-booths.component';
import { EditBoothDialogComponent } from './page/edit-booths/edit-booths.component';
import { EditZoneDialogComponent } from './page/edit-zones/edit-zones.component';
import { ManageZonesComponent } from './page/manage-zones/manage-zones.component';
import { ManageReservComponent } from './page/manage-reserv/manage-reserv.component';
export const routes: Routes = [
    { path: '', component: HomeComponent },              // เส้นทางหลักเป็นหน้าโฮมเพจ
    { path: 'login', component: LoginComponent },        // เส้นทางสำหรับ LoginComponent
    { path: 'register', component: RegisterComponent },   // เส้นทางสำหรับ RegisterComponent
    {path : 'zones' , component: ZonesComponent},
    { path: 'booths/:zoneId', component: BoothsComponent },
    { path: 'manage-booths', component: ManageBoothsComponent },
    {path: 'edit-Booths', component: EditBoothDialogComponent },
    {path: 'manage-zones', component: ManageZonesComponent },
    { path: 'edit-zones', component: EditZoneDialogComponent },
    {path: 'manage-reserv', component: ManageReservComponent}
];
