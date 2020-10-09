import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JsonDataService } from '../../services/json-data.service';
import { BuilderType } from '../../models/builder-type.model';

@Component({
  selector: 'app-builders-list',
  templateUrl: './builders-list.component.html',
  styleUrls: ['./builders-list.component.scss']
})
export class BuildersListComponent implements OnInit {

  type: string;
  navBarChange: boolean;
  builders = [
    {
      firstName: 'Sanka',
      lastName: 'Sanjeeva',
      city: 'Badulla',
      address: {
        line1: 'Udawela Junction',
        line2: 'Nawela',
        line3: 'Mirahawatta'
      },
      phoneNumber: '077 ### ####',
      stars: 5,
      otherAbility: [108, 102, 105, 108, 102, 105]
    },
    {
      firstName: 'Jagath',
      lastName: 'Kumara',
      city: 'Kandy',
      address: {
        line1: 'No. 26',
        line2: 'Mathale Road',
        line3: 'Kulugammana'
      },
      phoneNumber: '071 ### ####',
      stars: 3,
      otherAbility: [103, 104, 108]
    },
    {
      firstName: 'Dilhara',
      lastName: 'Madhusha',
      city: 'Galle',
      address: {
        line1: 'Dikwatuna',
        line2: 'Thangalla Road',
        line3: 'Galle'
      },
      phoneNumber: '077 ### ####',
      stars: 1,
      otherAbility: [110, 102]
    },
    {
      firstName: 'Sanka',
      lastName: 'Sanjeeva',
      city: 'Badulla',
      address: {
        line1: 'Udawela Junction',
        line2: 'Nawela',
        line3: 'Mirahawatta'
      },
      phoneNumber: '077 ### ####',
      stars: 4,
      otherAbility: [118, 101, 105]
    },
    {
      firstName: 'Jagath',
      lastName: 'Kumara',
      city: 'Kandy',
      address: {
        line1: 'No. 26',
        line2: 'Mathale Road',
        line3: 'Kulugammana'
      },
      phoneNumber: '071 ### ####',
      stars: 3,
      otherAbility: [107, 114, 108]
    },
    {
      firstName: 'Dilhara',
      lastName: 'Madhusha',
      city: 'Galle',
      address: {
        line1: 'Dikwatuna',
        line2: 'Thangalla Road',
        line3: 'Galle'
      },
      phoneNumber: '077 ### ####',
      stars: 2,
      otherAbility: [100, 102, 103]
    }
  ];
  builderTypes: BuilderType[] = [];
  cities = [];
  selectedCity = {name: '', id: ''};
  searchLoading: boolean;

  constructor(private route: ActivatedRoute, private jsonData: JsonDataService) {
    this.navBarChange = false;
    this.searchLoading = false;
  }

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type');
    this.jsonData.getBuilderTypes().subscribe((res: BuilderType[]) => {
      this.builderTypes = res;
    });
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
