import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Creationcomptepatient1Component } from './creationcomptepatient1.component';

describe('Creationcomptepatient1Component', () => {
  let component: Creationcomptepatient1Component;
  let fixture: ComponentFixture<Creationcomptepatient1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Creationcomptepatient1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Creationcomptepatient1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
