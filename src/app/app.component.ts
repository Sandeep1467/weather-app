import { animation } from '@angular/animations';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{

 source: any;
 destination: any;

  title = 'weather-app';
  @ViewChild('mapContainer', {static: false}) gmap!: ElementRef;
  @ViewChild('myBtn', {static: false}) btnElement!: ElementRef;

  map!: google.maps.Map;
  lat = 40.730610;
 lng = -73.935242;
  formattedAddress: string;

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
    // icon: '../assets/markerIcon.png'
    icon: 'http://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
  });
  
  ngAfterViewInit(){
    this.mapInitializer();
    this.marker;
    this.marker.setAnimation(google.maps.Animation.DROP);

    this.btnElement.nativeElement.addEventListener('click',()=>{
      this.myFunction()
    })

    // let btn =  document.getElementById("btnElement");

    // btn.addEventListener("click", () =>{
    //   this.myFunction();
    // });
  }

  myFunction(){
    document.getElementById("demo").innerHTML = "It's Working!";
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
  getSourceMarker($event){
    console.log($event)
    this.source=$event;
  }
  getDestinationMarker($event){
    console.log($event)
    this.destination=$event;
  }
  showDirection(){
    console.log("show direction working")
  
    let origin = this.source;
    console.log(origin);
    let destination = this.destination;
    console.log(destination);
    let directionsService: google.maps.DirectionsService = new google.maps.DirectionsService();
    let request: google.maps.DirectionsRequest = {
      origin: new google.maps.LatLng(this.source.lat, this.source.lng),
      destination: new google.maps.LatLng(this.destination.lat, this.destination.lng),
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
    };
    directionsService.route(request, (response, status) => {
      if (status.toString() == "OK") {
        console.log(response)
        let directionRenderer = new google.maps.DirectionsRenderer();
        directionRenderer.setMap(this.map);
        directionRenderer.setDirections(response);
        // this.jobMapService.renderRoute(response);
        // this.form.get('googleMapsDirectionsResult').setValue(JSON.stringify(response));
        let legs = response.routes[0].legs;
        /* this.distance = (legs.reduce((sum, current) => sum + current.distance.value, 0));
         let distanceKm = (this.distance * 0.001);
         this.distanceText = distanceKm + " Km";
         this.estimatedDuration = (legs.reduce((sum, current) => sum + current.duration.value, 0));
         let num = this.estimatedDuration / 60;
         let hours = (num / 60);
         let rhours = Math.floor(hours);
         let minutes = (hours - rhours) * 60;
         let rminutes = Math.round(minutes);
         this.estimatedDurationText = rhours + " h " + rminutes + " m";
         this.form.get('distance').setValue(this.distance);
         this.form.get('estimatedDuration').setValue(this.estimatedDuration);*/
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
    );
  }

}
 
 

 