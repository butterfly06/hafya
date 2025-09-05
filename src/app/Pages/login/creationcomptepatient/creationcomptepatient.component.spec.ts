import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationcomptepatientComponent } from './creationcomptepatient.component';

describe('CreationcomptepatientComponent', () => {
  let component: CreationcomptepatientComponent;
  let fixture: ComponentFixture<CreationcomptepatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreationcomptepatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationcomptepatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
