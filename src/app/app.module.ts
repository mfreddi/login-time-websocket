import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { MonitoringComponent } from './component/monitoring/monitoring.component';
import { SocketService } from './services/socket-service.service';
import { HttpConfigInterceptor} from './interceptor/httpconfig.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MonitoringComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    SocketService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
