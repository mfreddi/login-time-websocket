import { Component } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'login-time-websocket';
  token: string;
  constructor(private tokenService: TokenService) {
    this.token = this.tokenService.get();
    this.tokenService.changes.subscribe(({token}) => {
      this.token = token;
    });
  }
}
