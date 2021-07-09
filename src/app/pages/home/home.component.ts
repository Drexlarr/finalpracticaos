import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {NgForm} from "@angular/forms";
import * as _ from 'lodash';
import {Router} from "@angular/router";
import {Guardian} from "../../models/guardian";
import {GuardiansApiService} from "../../services/guardians-api.service";
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('guardianForm', { static: false }) guardianForm!: NgForm;
  guardianData: Guardian;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'username','email', 'firstName', 'lastName', 'gender', 'address','actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isFiltering = false;

  constructor(private guardiansApi: GuardiansApiService, private storageService: StorageService,private router: Router) {
    this.guardianData = {} as Guardian;
  }

  ngOnInit(): void {

    this.getAllGuardians();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  getAllGuardians(): void {
    this.guardiansApi.getAllGuardians().subscribe((response: any) => {
      this.dataSource.data = response;
      console.log(this.dataSource)
    });
  }


  refresh(): void {
    console.log('about to reload');
    this.getAllGuardians();
  }

  setCurrentGuardian(guardian: Guardian): void{
    this.storageService.saveGuardian(guardian);
    console.log(guardian.username);
    window.location.reload();
  }



}
