import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have the 'zoneless-calculator' title`, () => {
    expect(app.title).toEqual('Zoneless Calculator');
  });

  it('should render router-outlet', () => {
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should render router-outlet wrapped with classes', () => {
    const wrapper = compiled.querySelector('div');

    const mustHaveClasses =
      'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(
        ' '
      );
    const wrapperClasses = wrapper?.classList.value.split(' ');

    expect(wrapper).not.toBeNull();
    // const wrapperClasses = wrapper?.classList.forEach((className) => {
    //   expect(mustHaveClasses).toContain(className);
    // });

    mustHaveClasses.forEach((className) => {
      expect(wrapperClasses).toContain(className);
    });
  });
});
