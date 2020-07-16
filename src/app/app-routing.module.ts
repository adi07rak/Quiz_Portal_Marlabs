import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { TopicsComponent } from './components/topics/topics.component';

import { AuthGuard } from './service/authGuard/auth.guard';
import { AntiAuthGuard } from './service/anti-authGuard/anti-auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'topics', component: TopicsComponent, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: './auth/auth/auth.module#AuthModule', canActivate: [AntiAuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
