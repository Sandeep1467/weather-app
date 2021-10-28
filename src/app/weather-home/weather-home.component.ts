import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WeatherClientService } from '../weather-client.service';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: ['./weather-home.component.css']
})
export class WeatherHomeComponent implements OnInit {

  @Output() newCoord = new EventEmitter<any>();
  newCoordinates(value: any){
    this.newCoord.emit(value);
  }

  public city: string= "";
  weather: any;
  constructor(private weatherClient: WeatherClientService) {
  }

  ngOnInit(): void {
    console.log("ngOnInit from WeatherComponent");
  }
  
  getWeather(){
    this.weatherClient.getData(this.city).subscribe(response => {
      this.weather = response;
      console.log(this.weather);
      this.newCoordinates({ lat: this.weather.coord.lat, lng: this.weather.coord.lon});
    })
  }
}
