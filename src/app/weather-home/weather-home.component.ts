import { Component, OnInit, Output, ViewChild, ElementRef, EventEmitter, NgZone, Input } from '@angular/core';
import { WeatherClientService } from '../weather-client.service';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: ['./weather-home.component.css']
})
export class WeatherHomeComponent implements OnInit {

  @ViewChild('source', {static: false}) source!:  ElementRef;
  @ViewChild('destination', {static: false}) destination!:  ElementRef;

 
  @Output() sourceMarker = new EventEmitter<any>();
  @Output() destinationMarker = new EventEmitter<any>();
  @Output() searchClick = new EventEmitter();

  // newCoordinates(value: any){
  //   this.newCoord.emit(value);
  // }

  @Input() city: string="";
  weather: any; 
  constructor(private weatherClient: WeatherClientService,private ngZOne:NgZone) {
  }
  @Input() city2: string=""

  ngOnInit(): void {
    console.log("ngOnInit from WeatherComponent");
  }
  ngAfterViewInit():  void {
    this.googlePlaceAutoCompleteAttach();
    this.googlePlaceAutoCompleteAttach1();
  }
  
  getWeather(){
    this.weatherClient.getData(this.city).subscribe(response => {
      this.weather = response;
      console.log(this.weather);
      this.searchClick.emit();
      // this.newCoordinates({ lat: this.weather.coord.lat, lng: this.weather.coord.lon});
    })
  }
  pressButton(){
    document.getElementById("City")
    console.log("Press button is working")
  }

  private googlePlaceAutoCompleteAttach():void {
    let autocomplete =
    new google.maps.places.Autocomplete(this.source.nativeElement, { types: ["(cities)"] });
    
    autocomplete.addListener("place_changed",() => {
         
      this.ngZOne.run(() =>{

        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        if (place.geometry === undefined || place.geometry === null) {
          return;
        } else {
          console.log(place);
          this.sourceMarker.emit({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng()});
          // this.city = place.formatted_address;
        }
      });
    });
  }
  private googlePlaceAutoCompleteAttach1():void {
    let autocomplete =
    new google.maps.places.Autocomplete(this.destination.nativeElement, { types: ["(cities)"] });
    
    autocomplete.addListener("place_changed",() => {
         
      this.ngZOne.run(() =>{

        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        if (place.geometry === undefined || place.geometry === null) {
          return;
        } else {
          console.log(place);
          this.destinationMarker.emit({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng()});

          // this.city = place.formatted_address;
        }
      });
    });
  }
}
