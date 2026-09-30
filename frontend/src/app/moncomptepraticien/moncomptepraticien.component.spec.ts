import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoncomptepraticienComponent } from './moncomptepraticien.component';

describe('MoncomptepraticienComponent', () => {
  let component: MoncomptepraticienComponent;
  let fixture: ComponentFixture<MoncomptepraticienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoncomptepraticienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoncomptepraticienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
