import 'eazychart-css/css/style.css';
import './docs-root.css';

export const parameters = {
  // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
  actions: { argTypesRegex: '^on.*' },
  options: {
    storySort: {
      method: 'alphabetical',
      order: [
        'Get Started',
        [
          'Introduction',
          'Installation',
          'Your First Chart',
          'Essentials',
          ['Custom CSS', 'Responsive Charts', 'Common Props'],
        ],
        'React',
      ],
      locales: 'en-US',
    },
  },
};
