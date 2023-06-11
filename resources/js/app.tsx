import './bootstrap';

import React from 'react';
import { render } from 'react-dom';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { RouteContext } from '@/Hooks/useRoute';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { asset } from './Models/Helper';

const appName =
  window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
  title: title => `${title} - ${appName}`,
  resolve: name =>
    resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob('./Pages/**/*.tsx'),
    ),
  setup({ el, App, props }) {
    return render(
      <RouteContext.Provider value={(window as any).route}>
        <link rel="icon" type="image/svg+xml" href={asset('root', 'assets/images/icon_logo.png')} />
        <App {...props} />
      </RouteContext.Provider>,
      el,
    );
  },
});

InertiaProgress.init({ color: '#4B5563' });
