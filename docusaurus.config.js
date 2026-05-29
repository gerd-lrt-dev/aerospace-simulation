// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Spaceflight Dynamics Framework',
  tagline: 'Open-source spacecraft dynamics simulation and control systems',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  // Production domain
  url: 'https://www.aerospace-simulation.dev',

  // Custom domain deployment
  baseUrl: '/',

  // GitHub Pages
  organizationName: 'gerd-lrt-dev',
  projectName: 'aerospace-simulation',
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
        },

        blog: false,

        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  stylesheets: [
    '/css/hero.css',

    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-vZTG9CkD7F8F4s1Ttq2dXZkZ3YB+6+Jk6bXIpwM1KgiEkfK1pSvi8aF6F0B',
      crossorigin: 'anonymous',
    },
  ],

  themeConfig: {
    image: 'img/social-card.jpg',

    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },

    navbar: {
  title: 'SDF',

  items: [
    {
      to: '/about',
      label: 'About',
      position: 'left',
    },

    {
      to: '/simulation',
      label: 'Simulation',
      position: 'left',
    },

    {
      to: '/simulation/architecture',
      label: 'Architecture',
      position: 'left',
    },

    {
      to: '/docs',
      label: 'Mathematics',
      position: 'left',
    },

    {
      to: '/team',
      label: 'Team',
      position: 'left',
    },

    {
      to: '/recruiting',
      label: 'Recruiting',
      position: 'left',
    },

    {
      to: '/ai-assisted-engineering',
      label: 'AI-Assisted Engineering',
      position: 'left',
    },

    {
      href: 'https://github.com/gerd-lrt-dev/moonlander',
      label: 'GitHub',
      position: 'right',
    },
  ],
},

    footer: {
      style: 'dark',

      copyright: `Copyright © ${new Date().getFullYear()} Aerospace Simulation`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;