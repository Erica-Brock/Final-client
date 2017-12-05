import { Component, OnInit, Inject, ElementRef, NgZone, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  lat:number;
  lng: number;
  searchControl: FormControl;
  originControl: FormControl;
  zoom: number;
  places:any;
  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader:MapsAPILoader,
    private ngZone: NgZone
  ){}


  ngOnInit() {
    this.zoom= 4;
    this.lat=39.8282;
    this.lng= -98.5795;
    this.searchControl= new FormControl();
    this.originControl= new FormControl();
    //set current position
    this.setCurrentPosition();
    
        //load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
          let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
            types: ["address"]
          });
          autocomplete.addListener("place_changed", () => {
            this.ngZone.run(() => {
              //get the place result
              let place: google.maps.places.PlaceResult = autocomplete.getPlace();
    
              //verify result
              if (place.geometry === undefined || place.geometry === null) {
                return;
              }
    
              //set latitude, longitude and zoom
              this.lat = place.geometry.location.lat();
              this.lng = place.geometry.location.lng();
              this.zoom = 12;
            });
          });
        });
      }
    
      private setCurrentPosition() {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition((position) => {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            this.zoom = 15;
          });
        }
      }
    }
