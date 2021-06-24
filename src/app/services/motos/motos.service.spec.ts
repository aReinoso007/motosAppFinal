import { TestBed } from '@angular/core/testing';

import { MotosService } from './motos.service';

describe('MotosService', () => {
  let service: MotosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
