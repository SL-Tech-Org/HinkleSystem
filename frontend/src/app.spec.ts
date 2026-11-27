import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { App } from './app';

for (const [code, expected] of [[200, 'Connected'], [503, 'Service unavailable']] as const) {
  it('shows ' + expected, () => {
    TestBed.configureTestingModule({providers: [provideHttpClient(), provideHttpClientTesting()]});
    const fixture = TestBed.createComponent(App);
    TestBed.inject(HttpTestingController).expectOne('/actuator/health').flush({status: 'UP'}, {status: code, statusText: String(code)});
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role=status]').textContent).toBe(expected);
  });
}
