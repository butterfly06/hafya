import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPraticienComponent } from './register-praticien.component';

describe('RegisterPraticienComponent', () => {
  let component: RegisterPraticienComponent;
  let fixture: ComponentFixture<RegisterPraticienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPraticienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPraticienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
