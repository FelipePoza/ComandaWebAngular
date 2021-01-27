import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/model/usuario';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  email: String = '';
  senha: String = '';
  dataSource: Usuario;
  isLoadResults = false;

  constructor(private router: Router,private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
         'email': [null,Validators.required],
         'senha':[null,Validators.required] 
      }
    );
  }

  adicionarLogin(form:NgForm){
    this.isLoadResults = true;
    this.api.Login(form).subscribe(
      res => {
      this.dataSource = res;
      localStorage.setItem("jwt",this.dataSource.token);
      this.isLoadResults = false;
      this.router.navigate(['/comanda']);
      },(err) => {
        console.log(err);
        this.isLoadResults = false;
      });
  }

}
