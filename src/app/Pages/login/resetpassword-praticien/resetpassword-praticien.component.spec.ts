import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpasswordPraticienComponent } from './resetpassword-praticien.component';

describe('ResetpasswordPraticienComponent', () => {
  let component: ResetpasswordPraticienComponent;
  let fixture: ComponentFixture<ResetpasswordPraticienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetpasswordPraticienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetpasswordPraticienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
