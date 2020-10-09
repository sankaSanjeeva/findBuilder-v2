import { Component, OnInit } from '@angular/core';
import { BuilderType } from 'src/app/models/builder-type.model';
import { JsonDataService } from 'src/app/services/json-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  builderTypes: BuilderType[] = [];

  constructor(private jsonData: JsonDataService) { }

  ngOnInit(): void {
    this.jsonData.getBuilderTypes().subscribe((res: BuilderType[]) => {
      this.builderTypes = res;
    });
  }

  goToCategory(): void {
    document.getElementById('category').scrollIntoView({behavior: 'smooth'});
  }

}
