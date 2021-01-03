import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicDashboardComponent } from './dynamic/dynamic-dashboard/dynamic-dashboard.component';
import { DynamicFormComponent } from './dynamic/dynamic-form/dynamic-form.component';
import { DynamicTableComponent } from './dynamic/dynamic-table/dynamic-table.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },

  { path: 'dt', component: DynamicTableComponent },
  { path: 'dt/:title', component: DynamicTableComponent },
  { path: 'dt/:title/:query', component: DynamicTableComponent },
  { path: 'dt/:title/:query/:provider', component: DynamicTableComponent },

  { path: 'dd', component: DynamicDashboardComponent },
  { path: 'dd/:title', component: DynamicDashboardComponent },
  { path: 'dd/:title/:query', component: DynamicDashboardComponent },
  { path: 'dd/:title/:query/:provider', component: DynamicDashboardComponent },

  { path: 'df', component: DynamicFormComponent },
  { path: 'df/:entity', component: DynamicFormComponent },
  { path: 'df/:entity/:id', component: DynamicFormComponent },
  { path: 'df/:entity/:id/:provider', component: DynamicFormComponent },

  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
