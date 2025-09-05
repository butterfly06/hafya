import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Creationcomptepraticien1Component } from './creationcomptepraticien1.component';

describe('Creationcomptepraticien1Component', () => {
  let component: Creationcomptepraticien1Component;
  let fixture: ComponentFixture<Creationcomptepraticien1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Creationcomptepraticien1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Creationcomptepraticien1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
