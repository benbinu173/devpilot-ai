import { Injectable, inject , signal} from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, tap } from 'rxjs';



import { LoginRequest } from '../models/login-request.interface';
import { RegisterRequest } from '../models/register-request.interface';
import { LoginResponse } from '../models/login-response.interface';
import { environment } from '../../environments/environment';
import { CurrentUserResponse } from '../models/current-user-response.interface';
import { CurrentUser } from '../models/current-user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'devpilot_token';

  private http = inject(HttpClient);

  private api = `${environment.apiUrl}/auth`;

  login(data: LoginRequest): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(

      `${this.api}/login`,

      data

    ).pipe(

      tap(response => {

        this.saveToken(response.token);

      })

    );

  }

  register(data: RegisterRequest): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(

      `${this.api}/register`,

      data

    ).pipe(

      tap(response => {

        this.saveToken(response.token);

      })

    );

  }

  saveToken(token: string): void {

    localStorage.setItem(

      this.TOKEN_KEY,

      token

    );

  }

  getToken(): string | null {

    return localStorage.getItem(

      this.TOKEN_KEY

    );

  }

 logout(): void {

  this.currentUser.set(null);

  localStorage.removeItem(

    this.TOKEN_KEY

  );

}

  isLoggedIn(): boolean {

    return !!this.getToken();

  }

  

currentUser = signal<CurrentUser | null>(null);

getCurrentUser() {

  return this.http.get<CurrentUserResponse>(

    `${this.api}/me`

  ).pipe(

    tap(response => {

      this.currentUser.set(

        response.user

      );

    })

  );

}

}