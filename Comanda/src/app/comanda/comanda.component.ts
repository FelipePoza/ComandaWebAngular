import { Component, OnInit } from '@angular/core';
import { Comanda } from 'src/model/comanda';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-comanda',
  templateUrl: './comanda.component.html',
  styleUrls: ['./comanda.component.scss']
})
export class ComandaComponent implements OnInit {
  displayedColumns: string[] = ['Codigo'];
  datasource: Comanda[];
  isLoadingResults = true;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.listarComandas()
    .subscribe(res=> {
      this.datasource = res;
      console.log(this.datasource);
      this.isLoadingResults = false;
    },
    err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

}
