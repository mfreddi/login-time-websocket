import { Component, OnInit, OnDestroy } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { SocketService } from 'src/app/services/socket-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.less']
})
export class MonitoringComponent implements OnInit, OnDestroy {
  time: any;
  connected: boolean;
  constructor(private tokenService: TokenService, private socket: SocketService, private http: HttpClient) { }
  ngOnDestroy() {
    this.socket.close();
  }
  ngOnInit() {
    this.subscribe();
  }
  subscribe() {
    this.http.get('https://work.vint-x.net/api/subscribe').subscribe((res: any) => {
      this.socket.init(res.url).subscribe(() => {
        this.connected = true;
      });
      this.socket.onclose().subscribe(() => {
        this.connected = false;
        this.subscribe();
      });
      this.socket.onmessage().subscribe((data) => {
        this.time = new Date(data.server_time * 1000);
      });
    });
  }
  logout(): void {
    this.tokenService.remove();
  }
}
