import { Component, HostListener, OnInit } from '@angular/core';
import { BuilderType } from 'src/app/models/builder-type.model';
import { JsonDataService } from 'src/app/services/json-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  searchLoading: boolean;
  showBuildingTypes: boolean;
  cities = [];
  selectedCity = {name: '', id: ''};
  builderTypes: BuilderType[];
  selectedBuilderTypes: BuilderType[] = [];

  constructor(private jsonData: JsonDataService) {
    this.searchLoading = false;
    this.jsonData.getBuilderTypes().subscribe((res: BuilderType[]) => {
      this.builderTypes = res;
    });


    this.showBuildingTypes = true;
  }

  ngOnInit(): void {
  }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event): void {
    const id = event.target.attributes.id;
    if (id) {
      if (id.value !== 'cityInput' && id.value !== 'city') {
        this.cities = [];
      }
    } else {
      this.cities = [];
    }
  }

  cityChanged(e): void {
    if (!this.searchLoading) {
      this.searchLoading = true;
      this.cities = [];
      this.jsonData.getCities(e).subscribe((res: any) => {
        if (res.predictions) {
          res.predictions.forEach(element => {
            this.cities.push({
              name: element.structured_formatting.main_text,
              id: element.place_id
            });
          });
        }
        this.searchLoading = false;
      });
    }
  }

  selectCity(city): void {
    this.selectedCity = city;
    this.cities = [];
  }

  selectBuilderType(type: BuilderType): void {
    this.selectedBuilderTypes.push(type);
    const index = this.builderTypes.indexOf(type);
    if (index > -1) {
      this.builderTypes.splice(index, 1);
    }
  }

  deSelectBuilderType(type): void {
    this.builderTypes.push(type);
    const index = this.selectedBuilderTypes.indexOf(type);
    if (index > -1) {
      this.selectedBuilderTypes.splice(index, 1);
    }
  }

}
