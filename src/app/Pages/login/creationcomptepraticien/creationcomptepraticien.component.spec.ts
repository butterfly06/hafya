import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationcomptepraticienComponent } from './creationcomptepraticien.component';

describe('CreationcomptepraticienComponent', () => {
  let component: CreationcomptepraticienComponent;
  let fixture: ComponentFixture<CreationcomptepraticienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreationcomptepraticienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationcomptepraticienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
