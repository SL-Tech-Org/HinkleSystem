import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: '<main><h1>Hinkle</h1><p role="status">{{ status() }}</p></main>',
})
export class App {
  protected readonly status = signal('Connecting…');

  constructor() {
    inject(HttpClient).get<{ status: string }>('/actuator/health').subscribe({
      next: result => this.status.set(result.status === 'UP' ? 'Connected' : 'Service unavailable'),
      error: () => this.status.set('Service unavailable'),
    });
  }
}
