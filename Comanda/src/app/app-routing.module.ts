import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import{ComandaComponent} from './comanda/comanda.component';
import{ComandaDetalheComponent} from './comanda-detalhe/comanda-detalhe.component';
import{ComandaEditarComponent} from './comanda-editar/comanda-editar.component';
import{ComandaNovaComponent} from './comanda-nova/comanda-nova.component';
import{LoginComponent} from './login/login.component';
import{LogoutComponent} from './logout/logout.component';


const routes: Routes = [
  {
    path:'login',
    component:LoginComponent,
    data:{title:'Login'}
  },
  {
    path:'logout',
    component:LogoutComponent,
    data:{title:'Logout'}
  },
  {
    path:'comanda',
    component: ComandaComponent,
    data:{title:'Lista de Comandas'}
  },
  {
    path:'comanda-detalhe/:id',
    component: ComandaDetalheComponent,
    data:{title:'Detalhe de Comanda'}
  },
  {
    path:'comanda-nova',
    component: ComandaEditarComponent,
    data:{title:'Adicionar Comanda'}
  },
  {
    path:'comanda-editar',
    component:ComandaNovaComponent,
    data:{title:'Editar a Comanda'}
  },
  {
    path:'',
    redirectTo: '/comanda',
    pathMatch:'full'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
