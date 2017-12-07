import { Component, OnInit, Inject, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MaterializeModule } from '../materialize/materialize.module'

import { JobsService } from '../services/jobs.service'

import { } from '@types/googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  searchControl: FormControl;
  originControl: FormControl;
  zoom: number;
  places: any;
  myLocation: google.maps.LatLng;
  mapOptions: any;
  infoWindow = new google.maps.InfoWindow();
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsService = new google.maps.DirectionsService();
  map;
  panel;
  pos;
  jobs;
  destination: string;
  @ViewChild("search")
  public searchElementRef: ElementRef;
  @ViewChild('map')
  public mapElement: ElementRef;
  @ViewChild('panel')
  public panelElement: ElementRef;
  @ViewChild('selection')
  public selectElementRef: ElementRef;

  job: any = {
    title: "some job",
    location: "321 West Smithfield Dr. Dolomite, AL"
  };



  constructor(
    private ngZone: NgZone,
    private jobsSvc: JobsService
  ) { }

  ngOnInit() {
    this.getJobs();
    this.setCurrentPosition();
    this.myLocation = new google.maps.LatLng(33.543682, -86.779633);
    this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(this.panelElement.nativeElement);
    this.mapOptions = {
      zoom: 7,
      center: this.myLocation
    }
    let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      types: ["address"]
    })

    // // let changeHandler = function(){
    // //   this.calcRoute(this.directionsService, this.directionsDisplay)
    // };
  }

  calcRoute() {
    var request = {
      origin: this.pos,
      destination: `${this.selectElementRef.nativeElement}`,
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(result);
        this.directionsDisplay.setPanel(this.panelElement.nativeElement)
      } else {
        alert("this shit sucks");
      }
      console.log(this.selectElementRef.nativeElement)
    });
  }

  setCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.infoWindow.setPosition(this.pos);
        this.infoWindow.setContent("Your Current Location");
        this.infoWindow.open(this.map);
        this.map.setCenter(this.pos);
        this.map.setZoom(15);
      }, () => {
        this.locationErrorHandler(true, this.infoWindow, this.map.getCenter());
      });
    } else {
      //Browse doesn't have geolocation
      this.locationErrorHandler(false, this.infoWindow, this.map.getCenter());
    }
  }


  locationErrorHandler(hasGeoLocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(hasGeoLocation ?
      "Error: The Geolocation service failed. " :
      "Error: Your browser doesn't support geolocation.");
    infoWindow.open(this.map);
  }


  getJobs(): void {
    this.jobsSvc.getJobs()
      .subscribe((response) => this.jobs = response);
  }
  select():void{
    console.log("working")
  }


}
