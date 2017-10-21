import { TestBed, inject } from '@angular/core/testing';
import { ComunicationApiService } from './comunication-api.service';

describe('ComunicationApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComunicationApiService]
    });
  });

  it('should be created', inject([ComunicationApiService], (service: ComunicationApiService) => {
    expect(service).toBeTruthy();
  }));
});
