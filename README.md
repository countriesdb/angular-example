# CountriesDB Widget Angular Example

Example Angular 21 app with SSR/SSG demonstrating CountriesDB widget integration. Shows how to use `reload: true` option when navigating between routes to ensure the widget properly re-scans the DOM for select elements.

## Overview

This example demonstrates:
- Using the CountriesDB widget with Angular 21 and SSR/SSG
- Handling widget reload when navigating between routes
- Setting up environment configuration for the public key
- Using `afterNextRender` and `isPlatformBrowser` for SSR compatibility
- Creating multiple routes with country and subdivision selects

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Update the environment file `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  countriesDbPublicKey: 'YOUR_PUBLIC_KEY'
};
```

3. Run the development server:
```bash
npm start
```

4. Open your browser to [http://localhost:4200](http://localhost:4200)

## Routes

- **`/`** - Redirects to `/countries`
- **`/countries`** - Country select widget
- **`/subdivisions`** - Country and subdivision select widgets (linked)

Navigate between routes to test that the widget properly reloads on route changes.

## Key Code Pattern

```typescript
import { Component, PLATFORM_ID, inject, afterNextRender } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({...})
export class CountriesComponent {
  private platformId = inject(PLATFORM_ID);

  constructor() {
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.initWidget();
      }
    });
  }

  private initWidget(): void {
    const publicKey = environment.countriesDbPublicKey;

    ;(window as any).CountriesDBConfig = {
      publicKey,
    };

    if ((window as any).CountriesWidgetLoad) {
      (window as any).CountriesWidgetLoad({ reload: true });
    } else {
      import('@countriesdb/widget');
    }
  }
}
```

The `reload: true` option is important for client-side routing frameworks like Angular Router, as it ensures the widget re-scans the DOM for select elements after route navigation. The `isPlatformBrowser` check ensures the widget only initializes in the browser (not during SSR).

## Documentation Links

- [CountriesDB Documentation](https://countriesdb.com/docs)
- [CountriesDB Widget](https://countriesdb.com/docs/widgets)
- [Angular Documentation](https://angular.dev)

---

This example is maintained by **[NAYEE LLC](https://nayee.net)** (the publisher of CountriesDB).
