import { Injectable } from '@angular/core';
import {Guardian} from "../models/guardian";

const GUARDIAN = 'guardian_new';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public saveGuardian(guardian: Guardian): void{
    window.sessionStorage.removeItem(GUARDIAN);
    window.sessionStorage.setItem(GUARDIAN,JSON.stringify(guardian));
  }
  //@ts-ignore
  public getUsername = ():Guardian => JSON.parse(window.sessionStorage.getItem(GUARDIAN));
}
