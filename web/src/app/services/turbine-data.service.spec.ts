import { TestBed, inject } from '@angular/core/testing';

import { TurbineDataService } from './turbine-data.service';

describe('TurbineDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TurbineDataService]
    });
  });

  it('should be created', inject([TurbineDataService], (service: TurbineDataService) => {
    expect(service).toBeTruthy();
  }));
});
