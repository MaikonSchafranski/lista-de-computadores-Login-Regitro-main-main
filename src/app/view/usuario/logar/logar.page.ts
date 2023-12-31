  import { Component, OnInit } from '@angular/core';
  import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
  } from '@angular/forms';
  import { Router } from '@angular/router';
  import { Alert } from 'src/app/common/Alert';
  import { AuthService } from 'src/app/model/service/auth.service';

  @Component({
    selector: 'app-logar',
    templateUrl: './logar.page.html',
    styleUrls: ['./logar.page.scss'],
  })
  export class LogarPage implements OnInit {
    logar!: FormGroup;

    constructor(
      private router: Router,
      private alert: Alert,
      private authService: AuthService,
      private builder: FormBuilder
    ) {
      this.logar = new FormGroup({
        email: new FormControl(''),
        senha: new FormControl(''),
      });
    }

    ngOnInit() {
      this.logar = this.builder.group({
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required, Validators.minLength(6)]],
      });
    }

    get errorControl() {
      return this.logar.controls;
    }

    submitForm() {
      if (!this.logar.valid) {
        this.alert.presentAlert('ok', 'erro ao tentar logar');
      } else {
        this.login();
      }
    }

    private login() {
      this.authService
        .logar(this.logar.value['email'], this.logar.value['senha'])
        .then((res) => {
          this.alert.presentAlert('ok', 'seja bem-vindo');
          this.router.navigate(['/home']);
        })
        .catch((error) => {
          this.alert.presentAlert('ok', 'erro ao tentar logar! Tente novamente');
          console.log(error);
        });
    }

    logarComGmail() {}

    irParaCadastrar() {
      this.router.navigate(['/registrar']);
    }
  }
