import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { TokenService } from 'src/app/services/token.service';
import { LoginFormInterface } from 'src/app/model/loginForm-Interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  limit: number;
  token: string;
  errorDescription: string;
  constructor(private http: HttpClient, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.token = this.tokenService.get();
    this.limit = 3;
  }
  onSubmit() {
    this.errorDescription = '';
    this.resetErrorForm();
    this.submitLogin();
  }
  setErrorForm(): void {
    this.loginForm.get('username').setErrors({incorrect: true});
    this.loginForm.get('password').setErrors({incorrect: true});
  }
  resetErrorForm(): void {
    this.loginForm.get('username').setErrors(null);
    this.loginForm.get('password').setErrors(null);
  }
  submitLogin(): void {
    const sendForm  = this.loginForm.value as LoginFormInterface;
    this.http.post('https://work.vint-x.net/api/login', sendForm, {observe: 'response'}).subscribe(
      (res) => {
        this.tokenService.set(res.headers.get('X-Test-App-Jwt-Token'));
      },
      (err) => {
        // repeat login after internal server error
        if (err.status === 500 && this.limit > 0) {
          this.submitLogin();
        } else {
          this.errorDescription = err.error.description;
          this.setErrorForm();
        }
      }
    );
  }
}
