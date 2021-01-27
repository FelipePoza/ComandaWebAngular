import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comanda } from 'src/model/comanda';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-comanda-detalhe',
  templateUrl: './comanda-detalhe.component.html',
  styleUrls: ['./comanda-detalhe.component.scss']
})
export class ComandaDetalheComponent implements OnInit {
  comanda: Comanda = { Id: '', Codigo: ''};
  isLoadingResults = true;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
  }

  listarComanda(id) {
    this.api.listarComanda(id)
      .subscribe(data => {
        this.comanda = data;
           console.log(this.comanda);
             this.isLoadingResults = false;
      });
  }

  removerComanda(id) {
    this.isLoadingResults = true;
    this.api.removerComanda(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/comanda']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
