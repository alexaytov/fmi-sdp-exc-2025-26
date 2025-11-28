import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Структури от Данни и Програмиране',
  tagline: 'Курс по Структури от Данни и Алгоритми в C++',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://alexaytov.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/fmi-sdp-exc-2025-26/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'alexaytov', // Usually your GitHub org/user name.
  projectName: 'fmi-sdp-exc-2025-26', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/alexaytov/fmi-sdp-exc-2025-26/tree/main/docusaurus-site/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Структури от Данни и Програмиране',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Лекции',
        },
        {
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Лекции',
          items: [
            {
              label: 'Complexity - Big O',
              to: '/docs/complexity-big-o',
            },
            {
              label: 'Линейни Структури',
              to: '/docs/linear-structures',
            },
          ],
        },
        {
          title: 'Ресурси',
          items: [
            {
              label: 'ФМИ',
              href: 'https://www.fmi.uni-sofia.bg/',
            },
            {
              label: 'Moodle',
              href: 'https://learn.fmi.uni-sofia.bg/',
            },
          ],
        },
        {
          title: 'Код',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/alexaytov/fmi-sdp-exc-2025-26',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Курс по Структури от Данни и Програмиране, ФМИ. Всички права запазени.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
