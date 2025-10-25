import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginpraticienComponent } from './loginpraticien.component';

describe('LoginpraticienComponent', () => {
  let component: LoginpraticienComponent;
  let fixture: ComponentFixture<LoginpraticienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginpraticienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginpraticienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
