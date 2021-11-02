import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{

  title = 'weather-app';
  @ViewChild('mapContainer', {static: false}) gmap!: ElementRef;
  map!: google.maps.Map;
  lat = 40.730610;
 lng = -73.935242;
  formattedAddress: string;
//  startPoint = new google.maps.Marker({
//    map: this.map
//  });
//  endPoint = new google.maps.Marker({
//    map: this.map
//  });

 coordinates = new google.maps.LatLng(this.lat, this.lng);

 mapOptions: google.maps.MapOptions = {
   center: this.coordinates,
   zoom: 8
 };

  marker = new google.maps.Marker({
  animation: google.maps.Animation.DROP,
  position: this.coordinates,
  map: this.map,
  draggable:true,
});

  ngAfterViewInit(){
    this.mapInitializer();
  }
  mapInitializer(){
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.marker.setMap(this.map);
    this.marker.addListener('dragend',(coords)=>{
      this.onLocationChanged(coords);
    });
  }
  setMapCoordinates(place:any){
    console.log(place);
    this.coordinates = new google.maps.LatLng(place.lat, place.lng);
    this.marker.setPosition(this.coordinates);
    this.map.setCenter(this.coordinates);
  }
  onLocationChanged($event): void {
    let geocoder: google.maps.Geocoder = new google.maps.Geocoder();
    let request: google.maps.GeocoderRequest = {
      location: $event.latLng,
    };
    geocoder.geocode(request, (response, status) => {
      if (status.toString() == "OK") {
        var place = response[0];
        var formattedAddress = place.formatted_address;
        // var lat = place.geometry.location.lat();
        // var lng = place.geometry.location.lng();
        this.formattedAddress = formattedAddress;
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }
  
}
 
 

 