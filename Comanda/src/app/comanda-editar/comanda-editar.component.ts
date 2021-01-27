import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-comanda-editar',
  templateUrl: './comanda-editar.component.html',
  styleUrls: ['./comanda-editar.component.scss']
})
export class ComandaEditarComponent implements OnInit {
  Id: String = '';
  comandaForm: FormGroup;
  codigo: String = '';
  isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute,
     private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.listarComanda(this.route.snapshot.params['id']);
    this.comandaForm = this.formBuilder.group({
   'Id' : [null],  
   'codigo' : [null, Validators.required]
 });
}

listarComanda(id) {
  this.api.listarComanda(id).subscribe(data => {
    this.Id = data.Id;
    this.comandaForm.setValue({
      Id: data.Id,
      codigo: data.Codigo
    });
  });
}

atualizarComanda(form: NgForm) {
  this.isLoadingResults = true;
  this.api.atualizarComanda(this.Id, form)
    .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/comanda-detalhe/' + this.Id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
 }

}
