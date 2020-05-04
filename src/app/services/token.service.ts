import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { TokenInterface } from '../model/token-interface';

@Injectable({
  providedIn: 'root'
})

export class TokenService implements OnDestroy {
  private onSubject = new Subject<TokenInterface>();
  public changes: Observable<TokenInterface> = this.onSubject.asObservable().pipe(share());
  constructor() { }

  ngOnDestroy() {
    this.onSubject.complete();
  }
  get(): string {
    return localStorage.getItem('X-Test-App-Jwt-Token') || null;
  }
  set(token: string): void {
    localStorage.setItem('X-Test-App-Jwt-Token', token);
    this.onSubject.next({ token });
  }
  remove(): void {
    localStorage.removeItem('X-Test-App-Jwt-Token');
    this.onSubject.next({token: null});
  }
}
