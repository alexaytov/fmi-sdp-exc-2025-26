import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import path from 'path';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// Import the helper function to get slides data
const { getSlidesForNavbar } = require('./plugins/reveal-slides-plugin.js');

// Get all slides for navbar dropdown
const docsPath = path.join(__dirname, 'docs');
const slides = getSlidesForNavbar(docsPath);

// Generate navbar items for slides dropdown
const slidesDropdownItems = [
  ...slides.map(slide => ({
    label: `${String(slide.lectureNumber).padStart(2, '0')}. ${slide.lectureTitle}`,
    href: `pathname:///slides/${slide.lectureSlug}/`,
  })),
  {
    type: 'html' as const,
    value: '<hr style="margin: 4px 0;">',
  },
  {
    label: 'Всички презентации →',
    to: '/slides',
  },
];

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

  onBrokenLinks: 'warn', // Changed to warn for reveal.js slides (generated in postBuild)
  onBrokenMarkdownLinks: 'warn',
  trailingSlash: true, // Ensures URLs have trailing slashes (needed for slides/topic-name/)

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
          exclude: ['**/slides.md'],
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    './plugins/lectures-plugin.js',
    './plugins/reveal-slides-plugin.js',
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
          type: 'dropdown',
          label: 'Презентации',
          position: 'left',
          items: slidesDropdownItems,
        },
        {
          href: 'https://github.com/alexaytov/fmi-sdp-exc-2025-26',
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
              to: '/docs/complexity-big-o/lecture',
            },
            {
              label: 'Масиви и Двоично Търсене',
              to: '/docs/arrays-binary-search/lecture',
            },
            {
              label: 'Динамични Масиви',
              to: '/docs/dynamic-array/lecture',
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
