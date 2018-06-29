import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DividendsComponent } from './dividends/dividends.component';
import { AllTradesComponent } from './all-trades/all-trades.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'all-trades',
    component: AllTradesComponent
  },
  {
    path: 'dividends',
    component: DividendsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
