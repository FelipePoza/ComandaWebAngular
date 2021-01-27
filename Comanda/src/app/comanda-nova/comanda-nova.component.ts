import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-comanda-nova',
  templateUrl: './comanda-nova.component.html',
  styleUrls: ['./comanda-nova.component.scss']
})
export class ComandaNovaComponent implements OnInit {
  comandaForm: FormGroup;
  codigo: String = '';
  isLoadingResults = false;
  
  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.comandaForm = this.formBuilder.group({
      'codigo' : [null, Validators.required]
    });
  }

  adicionarComanda(form: NgForm) {
    this.isLoadingResults = true;
    this.api.adicionarComanda(form)
      .subscribe(res => {
          const id = res['id'];
          this.isLoadingResults = false;
          this.router.navigate(['/comanda']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
}
