import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginpatientComponent } from './loginpatient.component';

describe('LoginpatientComponent', () => {
  let component: LoginpatientComponent;
  let fixture: ComponentFixture<LoginpatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginpatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
