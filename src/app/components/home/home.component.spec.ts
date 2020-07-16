import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { By } from '@angular/platform-browser';
import { CommonService } from 'src/app/service/common.service';
import { Location } from '@angular/common';
import { TopicsComponent } from '../topics/topics.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        FormsModule,
        HttpClientModule,
        RouterTestingModule.withRoutes([
        ]),
        ToastrModule.forRoot()
      ],
      providers: [
        CommonService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // custom cases ::::
  it('should contains h1 tag with title', () => {
    const h1Elem = fixture.debugElement.query(By.css('h1'));
    // debugger;
    expect(h1Elem.nativeElement.textContent).toBe('Welcome Quiz Portal');
  });

  it('should have at least one button', () => {
    const buttonElem = fixture.debugElement.queryAll(By.css('button'));
    expect(buttonElem.length >= 1).toBeTruthy();
  });

  it('should have Lets Start content in the button', () => {
    const buttonElem = fixture.debugElement.queryAll(By.css('button'));
    const nativeElem: HTMLButtonElement = buttonElem[0].nativeElement;
    // tslint:disable-next-line:no-debugger
    // debugger;
    expect(nativeElem.textContent).toBe(`Let's Start`);
  });

  it('should check root component or not!', () => {
    const location = TestBed.get(Location);
    // tslint:disable-next-line:no-debugger
    // debugger;
    expect(location.path()).toBe('');

  });

  it('should routing on button', () => {
    const location = TestBed.get(Location);
    const buttonElem = fixture.debugElement.queryAll(By.css('button'));
    const nativeElem: HTMLButtonElement = buttonElem[0].nativeElement;
    nativeElem.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const temp = location.path();
      // debugger;
      expect(location.path()).toBe('/');
    });
  });
});
