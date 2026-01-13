import { Component, OnInit, PLATFORM_ID, inject, afterNextRender } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page">
      <h1>Countries Widget Test</h1>
      
      <nav>
        <a [routerLink]="['/countries']" class="nav-link">Countries</a>
        <a [routerLink]="['/subdivisions']" class="nav-link">Subdivisions</a>
      </nav>

      <div class="content">
        <h2>Select a Country</h2>
        <p>
          Navigate to Subdivisions page to test widget reload between routes.
        </p>
        
        <select
          class="country-selection"
          data-name="country1"
        ></select>
      </div>
    </div>
  `,
  styles: [`
    .page {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    h1 {
      font-size: 2rem;
      margin-bottom: 1.5rem;
    }

    nav {
      margin-bottom: 2rem;
      display: flex;
      gap: 1rem;
    }

    .nav-link {
      padding: 0.5rem 1rem;
      text-decoration: none;
      border-radius: 6px;
      background-color: #2563eb;
      color: white;
      transition: opacity 0.2s;
    }

    .nav-link:hover {
      opacity: 0.9;
    }

    .content {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    h2 {
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }

    p {
      color: #4b5563;
      margin-bottom: 1rem;
      line-height: 1.6;
    }

    select {
      width: 100%;
      padding: 0.5rem 1rem;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 1rem;
    }
  `]
})
export class CountriesComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  constructor() {
    // Use afterNextRender for client-side only code (Angular 18+)
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.initWidget();
      }
    });
  }

  ngOnInit(): void {
    // This runs on both server and client
    // Widget initialization is handled in afterNextRender
  }

  private initWidget(): void {
    const publicKey = environment.countriesDbPublicKey;

    ;(window as any).CountriesDBConfig = {
      publicKey,
    };

    // Reload widget when navigating to this route
    if ((window as any).CountriesWidgetLoad) {
      (window as any).CountriesWidgetLoad({ reload: true });
    } else {
      import('@countriesdb/widget');
    }
  }
}
