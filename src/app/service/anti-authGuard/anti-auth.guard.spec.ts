import { TestBed, async, inject } from '@angular/core/testing';

import { AntiAuthGuard } from './anti-auth.guard';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

describe('AntiAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule,
        RouterTestingModule.withRoutes([]),
        ToastrModule.forRoot()
      ],
      providers: [AntiAuthGuard]
    });
  });

  it('should ...', inject([AntiAuthGuard], (guard: AntiAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
