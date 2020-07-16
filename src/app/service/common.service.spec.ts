import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { CommonService } from './common.service';

describe('CommonService', () => {
  beforeEach(() => {TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      RouterModule,
      ToastrModule.forRoot()
    ],
    providers: [CommonService]
  })
  .compileComponents();
});

  it('should be created', () => {
    const service: CommonService = TestBed.get(CommonService);
    expect(service).toBeTruthy();
  });
});
