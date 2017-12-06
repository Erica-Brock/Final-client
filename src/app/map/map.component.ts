import { Component, OnInit, Inject, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import {} from '@types/googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  lat: number;
  lng: number;
  searchControl: FormControl;
  originControl: FormControl;
  zoom: number;
  places: any;
  job:any = {
      title: "some job",
      location: "321 West Smithfield Dr. Dolomite, AL"
    };

  @ViewChild("search")
  public searchElementRef: ElementRef;
  @ViewChild('map')
  public mapElement: ElementRef;

  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsService = new google.maps.DirectionsService();
  map;

  constructor(
    private ngZone: NgZone,
  ) { }

  ngOnInit() {
    // this.map= document.getElementById('map')
    // this.zoom = 4;
    // this.lat = 39.8282;
    // this.lng = -98.5795;
    // this.searchControl = new FormControl();
    // this.originControl = new FormControl();
    // this.setCurrentPosition();
    // this.job = {
    //   title: "some job",
    //   location: "321 West Smithfield Dr. Dolomite, AL"
    // };
    var birmingham = new google.maps.LatLng(33.543682, -86.779633);
    var mapOptions = {
      zoom:7,
      center: birmingham
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.directionsDisplay.setMap(this.map);
  }

   calcRoute() {
      var request = {
        origin: '1500 first ave north Birmingham, AL',
        destination: this.job.location,
        travelMode: google.maps.TravelMode.DRIVING
      };
      this.directionsService.route(request, (result, status) => {
        console.log(result);
          if (status === google.maps.DirectionsStatus.OK ){
            this.directionsDisplay.setDirections(result);
          } else{
            alert("this shit sucks");
          }
      });
    }

    //load Places Autocomplete
  //   this.mapsAPILoader.load().then(() => {
  //     let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
  //       types: ["address"]
  //     });

  //     autocomplete.addListener("place_changed", () => {
  //       this.ngZone.run(() => {
  //         //get the place result
  //         let place: google.maps.places.PlaceResult = autocomplete.getPlace();

  //         //verify result
  //         if (place.geometry === undefined || place.geometry === null) {
  //           return;
  //         }

  //         //set latitude, longitude and zoom
  //         this.lat = place.geometry.location.lat();
  //         this.lng = place.geometry.location.lng();
  //         this.zoom = 15;
  //       });
  //     });
  //   });
  // }

  // private setCurrentPosition() {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.lat = position.coords.latitude;
  //       this.lng = position.coords.longitude;
  //       this.zoom = 15;
  //     });
  //   }
  // }
  // private getDirection(job) {
  //   console.log('inside get directions');
  //     let directions:google.maps.DirectionsService = new google.maps.DirectionsService();
  //     let display:google.maps.DirectionsRenderer= new google.maps.DirectionsRenderer();
  
  //     display.setMap(new google.maps.Map(this.map));
  
  //     directions.route({
  //       origin: {
  //         lat:this.lat, 
  //         lng:this.lng
  //       },
  //       destination: job.location, 
  //       travelMode: google.maps.TravelMode.DRIVING
  //     }, (response, status) =>{
  
  //         if (status === google.maps.DirectionsStatus.OK ){
  //           display.setDirections(response);
  //         } else{
  //           alert("this shit sucks");
  //         }
  //     });
  // }
}