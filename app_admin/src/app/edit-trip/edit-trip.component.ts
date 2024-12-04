import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { TripDataService } from '../services/trip-data.service';
import { DataUtilsService } from '../shared/utils/data-utils.service';
import {Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css'
})

export class EditTripComponent implements OnInit {

  public editForm!: FormGroup;
  trip!: Trip;
  submitted = false;
  message : string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService,
    private dataUtils: DataUtilsService,
  ) {}

  ngOnInit(): void {
    
    // Retrieve trip ID
    let tripCode = localStorage.getItem("tripCode");
    if (!tripCode) {
      alert("TripCode could not be found!");
      this.router.navigate(['']);
      return;
    }
    
    console.log('EditTripComponent::ngOnInit');
    console.log('tripcode:' + tripCode);
    
    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    })

    this.tripDataService.getTrip(tripCode)
      .subscribe({
        next: (value: any) => {
          this.trip = value[0];

          // Convert the start date to a Date object before patching
          let formattedTrip = { ...value[0] };
          if (formattedTrip.start) {
            formattedTrip.start = this.dataUtils.formatDate(new Date(formattedTrip.start));
          }

          // Populate record into form
          this.editForm.patchValue(formattedTrip);

          if (!value) {
            this.message = 'No Trip Retrieved!';
          }
          else {
            this.message = 'Trip: ' + tripCode + ' retrieved';
          }
          console.log(this.message);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
    })
  }

  public onSubmit() {
    this.submitted = true;

    if (this.editForm.valid) {
      
      // Explicitly Convert form start to ISO Format
      this.editForm.value.start = this.dataUtils.convertToISO(this.editForm.value.start);

      this.tripDataService.updateTrip(this.editForm.value)
        .subscribe({
          next: (value: any) => {
            console.log(value);
            this.router.navigate(['']);
          },
          error: (error: any) => {
            console.log('Error: ' + error);
          }
        });
    }
  }

    // Get form short name for access to the form fields
    get f() { return this.editForm.controls; }
}
