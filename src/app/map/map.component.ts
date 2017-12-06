import { Component, OnInit, Inject, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { } from '@types/googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  lat: number;
  lng: number;
  searchControl: FormControl;
  originControl: FormControl;
  zoom: number;
  places: any;
  job: any = {
    title: "some job",
    location: "321 West Smithfield Dr. Dolomite, AL"
  };
  myLocation: google.maps.LatLng;
  mapOptions: any;

  @ViewChild("search")
  public searchElementRef: ElementRef;
  @ViewChild('map')
  public mapElement: ElementRef;
  infoWindow = new google.maps.InfoWindow
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsService = new google.maps.DirectionsService();
  map;

  constructor(
    private ngZone: NgZone,
  ) { }

  ngOnInit() {
    this.myLocation = new google.maps.LatLng(33.543682, -86.779633);
    this.mapOptions = {
      zoom: 7,
      center: this.myLocation
    }
    let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      types: ["address"]
    })
    this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
    this.directionsDisplay.setMap(this.map);
    this.setCurrentPosition();
  }

  calcRoute() {
    var request = {
      origin: '1500 first ave north Birmingham, AL',
      destination: this.job.location,
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsService.route(request, (result, status) => {
      console.log(result);
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(result);
      } else {
        alert("this shit sucks");
      }
    });
  }
  setCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        var pos: any = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.infoWindow.setPosition(pos);
        this.infoWindow.setContent("Your Current Location");
        this.infoWindow.open(this.map);
        this.map.setCenter(pos);
        this.map.setZoom(15);
      },()=>{this.locationErrorHandler(true, this.infoWindow, this.map.getCenter());
      });
    } else{
      //Browse doesn't have geolocation
      this.locationErrorHandler(false, this.infoWindow, this.map.getCenter());
    }
  }
  locationErrorHandler(hasGeoLocation, infoWindow, pos){
    infoWindow.setPosition(pos);
    infoWindow.setContent(hasGeoLocation ?
      "Error: The Geolocation service failed. " :
      "Error: Your browser doesn't support geolocation." );
    infoWindow.open(this.map);
  }
}
