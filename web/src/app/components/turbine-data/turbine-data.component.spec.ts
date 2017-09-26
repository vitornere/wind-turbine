import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurbineDataComponent } from './turbine-data.component';

describe('TurbineDataComponent', () => {
  let component: TurbineDataComponent;
  let fixture: ComponentFixture<TurbineDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurbineDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurbineDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
