import {Component, OnInit} from '@angular/core';
import {StorageService} from "./services/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'safetee-call';
  name:string = "";
  id: number = 1;
  constructor(private storageService: StorageService,private router: Router) {

  }

  ngOnInit(): void {
    this.name = this.storageService.getUsername().username;
    this.id = this.storageService.getUsername().id;
  }

  navigateUrgencies(){
    this.router.navigate([`/guardians/${this.id}/urgencies`])
      .then(() => console.log('Navigated to Urgencies'));
  }





}
