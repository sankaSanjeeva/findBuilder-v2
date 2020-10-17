import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JsonDataService } from '../../services/json-data.service';
import { BuilderService } from '../../services/builder.service';
import { BuilderType } from '../../models/builder-type.model';
import { Builder } from '../../models/builder.model';

@Component({
  selector: 'app-builders-list',
  templateUrl: './builders-list.component.html',
  styleUrls: ['./builders-list.component.scss']
})
export class BuildersListComponent implements OnInit {

  type: string;
  navBarChange: boolean;
  builders: Builder[];
  builderTypes: BuilderType[] = [];
  cities = [];
  selectedCity = {name: '', id: ''};
  searchLoading: boolean;
  buildersLoading: boolean;

  constructor(
    private route: ActivatedRoute,
    private jsonData: JsonDataService,
    private builderService: BuilderService
    ) {
    this.navBarChange = false;
    this.searchLoading = false;
  }

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type');
    this.jsonData.getBuilderTypes().subscribe((res: BuilderType[]) => {
      this.builderTypes = res;
    });
    this.loadBuilders();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (window.scrollY > 150) {
      this.navBarChange = true;
    } else {
      this.navBarChange = false;
    }
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

  loadBuilders(): void {
    this.buildersLoading = true;
    this.builderService.getBuilders().subscribe((res: Builder[]) => {
      this.builders = res;
      this.buildersLoading = false;
    });
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

  getStarColor(stars): boolean[]{
    const array = [];
    for (let i = 0; i < 5; i++) {
      if (i < stars) {
        array.push(true);
      } else {
        array.push(false);
      }
    }
    return array;
  }

  getIconPath(id): object {
    return this.builderTypes.find(x => x.id === id);
  }
}
