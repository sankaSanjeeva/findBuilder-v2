import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonDataService {

  constructor(private http: HttpClient) { }

  getBuilderTypes(): Observable<object> {
    return this.http.get('/assets/json/builderTypes.json');
  }

  getCities(input: string): Observable<object> {
    // tslint:disable-next-line: max-line-length
    // https://maps.googleapis.com/maps/api/place/autocomplete/json?input=cityName&types=(cities)&location=7.8731,80.7718&radius=250000&strictbounds&key=AIzaSyBCik1npXG9X5lQvygz-TsCAG1KkoWscYE
    return this.http.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=(cities)&components=country:lk&key=AIzaSyBCik1npXG9X5lQvygz-TsCAG1KkoWscYE`);
  }
}
