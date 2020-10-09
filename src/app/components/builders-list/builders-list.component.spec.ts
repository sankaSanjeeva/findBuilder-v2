import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildersListComponent } from './builders-list.component';

describe('BuildersListComponent', () => {
  let component: BuildersListComponent;
  let fixture: ComponentFixture<BuildersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
