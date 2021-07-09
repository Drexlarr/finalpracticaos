import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Urgency} from "../../models/urgency";
import {NgForm} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UrgenciesApiService} from "../../services/urgencies-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GuardiansApiService} from "../../services/guardians-api.service";
import {Guardian} from "../../models/guardian";
import * as _ from 'lodash'

@Component({
  selector: 'app-urgencies',
  templateUrl: './urgencies.component.html',
  styleUrls: ['./urgencies.component.css']
})
export class UrgenciesComponent implements OnInit, AfterViewInit {

  @ViewChild('urgencyForm', { static: false }) urgencyForm!: NgForm;
  urgencyData: Urgency;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'title','summary', 'latitude', 'longitude','actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isFiltering = false;
  isEditMode = false;
  guardianData: Guardian = {} as Guardian;
  urgenciesData: Urgency[] = [];

  guardianId!: number;
  idguardian!: number;


  constructor(private guardiansApi: GuardiansApiService,  private urgenciesApi: UrgenciesApiService, private router: Router,  private route: ActivatedRoute) {
    this.urgencyData = {} as Urgency;

  }

  ngOnInit(): void {
    this.guardianId = Number(this.route.params.subscribe(params =>{
      if(params.id){
        const id = params.id;
        console.log(id)
        this.idguardian = id;
        return id;
      }
    }))
    console.log(this.route.params)
    this.getUrgenciesByGuardianId(this.idguardian);
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.isFiltering = !!filterValue;
  }
  getUrgenciesByGuardianId(id: number): void {
    this.guardiansApi.getUrgenciesByGuardianId(id).subscribe((response: any) => {
      console.log(id)
      this.dataSource.data = response;
      this.urgenciesData = response;
      console.log(response)
    });
  }
  editItem(element: any): void {
    console.log(element);
    this.urgencyData = _.cloneDeep(element);
    this.isEditMode = true;
  }
  cancelEdit(): void {
    this.isEditMode = false;
    this.urgencyForm.resetForm();
  }
  deleteItem(id: number): void {
    this.urgenciesApi.deleteUrgency(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: any) => {
        return o.id !== id ? o : false;
      });
    });
    console.log("eliminado");
  }
  addUrgency(): void {
    if(this.urgencyData.summary == null){
      this.urgencyData.summary = "";
    }
    const today = Date.now();
    const datenew = new Date(today);
    datenew.toLocaleDateString();
    this.urgencyData.reportedAt = datenew;
    console.log(this.urgencyData);
    const newStudent = {
      title: this.urgencyData.title, summary: this.urgencyData.summary, latitude: this.urgencyData.latitude, longitude: this.urgencyData.longitude, guardianId: this.idguardian, reportedAt: this.urgencyData.reportedAt};

    console.log(this.urgenciesData);
    if(this.validateDate()){
      this.urgenciesApi.addUrgency(newStudent).subscribe((response: any) => {
        this.dataSource.data.push({...response});
        this.dataSource.data = this.dataSource.data.map(o => o);
      });
    }
    else{
      console.log("Can't be added")
    }

  }
  updateStudent(): void {
    this.urgenciesApi.updateUrgency(this.urgencyData.id, this.urgencyData)
      .subscribe((response: Urgency) => {
        this.dataSource.data = this.dataSource.data.map((o: any) => {
          if (o.id === response.id) {
            o = response;
          }
          return o;
        });
        this.cancelEdit();
      });
  }
  onSubmit(): void {
    if (this.urgencyForm.form.valid) {
      if (this.isEditMode) {
        this.updateStudent();
      } else {
        this.addUrgency();
      }
    } else {
      console.log('Invalid Data');
    }
  }

  validateDate(): boolean{
    console.log(this.urgencyData.reportedAt.toLocaleDateString())
    for(let i = 0 ; i < this.urgenciesData.length; i++) {
      let newDate = new Date(this.urgenciesData[i].reportedAt)
      if(this.urgencyData.reportedAt.toLocaleDateString() == newDate.toLocaleDateString()
          && (this.urgencyData.title == this.urgenciesData[i].title)
          && (this.urgencyData.longitude == this.urgenciesData[i].longitude && this.urgencyData.latitude == this.urgenciesData[i].latitude)){
        return false;
      }
    }

    return true;
  }

}
