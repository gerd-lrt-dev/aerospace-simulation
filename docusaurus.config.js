// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Aerospace Simulation Platform',
  tagline: 'Open-source aerospace simulation and control systems',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  // WICHTIG: deine echte Domain
  url: 'https://www.aerospace-simulation.dev',

  // Bei Custom Domain IMMER '/'
  baseUrl: '/',

  // GitHub Pages
  organizationName: 'gerd-lrt-dev',        // dein GitHub-Username
  projectName: 'aerospace-simulation',     // Repo-Name
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
  ],

  themeConfig: {
    image: 'img/social-card.jpg',

    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },

    navbar: {
      title: 'Aerospace Simulation',
      items: [
        {to: '/docs/intro', label: 'Docs', position: 'left'},
        {to: '/about', label: 'About', position: 'left'},
        {
          href: 'https://github.com/gerd-lrt-dev/aerospace-simulation',
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
