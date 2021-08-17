import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  // async checkAuthenticated(): Promise<boolean> {
  //   const authenticated = await this.authClient.session.exists();
  //   this.isAuthenticated.next(authenticated);
  //   return authenticated;
  // }

}
