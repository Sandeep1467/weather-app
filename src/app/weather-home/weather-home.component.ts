import { Component, OnInit, Output, ViewChild, ElementRef, EventEmitter, NgZone, Input } from '@angular/core';
import { WeatherClientService } from '../weather-client.service';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: ['./weather-home.component.css']
})
export class WeatherHomeComponent implements OnInit {

  @ViewChild('addresstext', {static: false}) addresstext!:  ElementRef;
  @Output() newCoord = new EventEmitter<any>();

  newCoordinates(value: any){
    this.newCoord.emit(value);
  }

  @Input() city: string="";
  weather: any;
  constructor(private weatherClient: WeatherClientService,private ngZOne:NgZone) {
  }

  ngOnInit(): void {
    console.log("ngOnInit from WeatherComponent");
  }
  ngAfterViewInit():  void {
    this.googlePlaceAutoCompleteAttach();
  }
  
  getWeather(){
    this.weatherClient.getData(this.city).subscribe(response => {
      this.weather = response;
      console.log(this.weather);
      this.newCoordinates({ lat: this.weather.coord.lat, lng: this.weather.coord.lon});
    })
  }

  private googlePlaceAutoCompleteAttach():void {
    let autocomplete =
    new google.maps.places.Autocomplete(this.addresstext.nativeElement, { types: ["(cities)"] });
    autocomplete.addListener("place_changed",() => {
         
      this.ngZOne.run(() =>{

        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        if (place.geometry === undefined || place.geometry === null) {
          return;
        } else {
          console.log(place);
          this.city = place.formatted_address;
          // this.address = place.formatted_address;
          // this.lat = place.geometry.location.lat();
          // this.lng = place.geometry.location.lng();
          // this.marker.setPosition(new google.maps.LatLng(place.geometry.location.lat(),place.geometry.location.lng()));
          // this.map.setCenter(new google.maps.LatLng(place.geometry.location.lat(),place.geometry.location.lng()));
        }

      });
       

    });
  }
}
