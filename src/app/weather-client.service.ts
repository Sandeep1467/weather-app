import { getLocaleDateFormat } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherClientService {
  constructor(private http: HttpClient) { }

  getData(location: string){
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=70c0073e5219d4f15aa6fe4203513d3d`);
  }
}