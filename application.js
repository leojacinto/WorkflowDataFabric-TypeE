import {navLayoutContext} from '@servicenow/aiux/aiux-components-nav';
import {i18n} from '@servicenow/aiux/aiux-services';
import {AppTheme} from './theme.js';
import {TOC_SECTIONS} from './constants/toc.js';

const mainExercises = TOC_SECTIONS.find(s => s.id === 'main-exercises');
const extendedExercises = TOC_SECTIONS.find(s => s.id === 'extended-exercises');
const conclusion = TOC_SECTIONS.find(s => s.id === 'conclusion');
const hungryForMore = TOC_SECTIONS.find(s => s.id === 'hungry-for-more');
const demoHub = TOC_SECTIONS.find(s => s.id === 'demo-hub');

function isActivePath(activeRoute, path) {
  return activeRoute === path || Boolean(activeRoute?.startsWith(`${path}/`));
}

function toChildItem(activeRoute, item) {
  return {
    icon: 'chevron-right',
    title: item.title(),
    action: {type: 'navigate', path: item.path},
    ...(isActivePath(activeRoute, item.path) && {active: true})
  };
}

function buildNavItems(activeRoute) {
  return [
    {
      icon: 'home',
      title: i18n.getMessage('Overview'),
      action: {type: 'navigate', path: '/home'},
      ...(isActivePath(activeRoute, '/home') && {active: true})
    },
    {
      icon: 'chart-sankey',
      title: i18n.getMessage('Data & Flow Diagrams'),
      action: {type: 'navigate', path: '/diagrams'},
      ...(isActivePath(activeRoute, '/diagrams') && {active: true})
    },
    {
      icon: 'list',
      title: mainExercises.label(),
      l2Nav: mainExercises.items.map(item => toChildItem(activeRoute, item))
    },
    {
      icon: 'lightbulb',
      title: extendedExercises.label(),
      l2Nav: extendedExercises.items.map(item => toChildItem(activeRoute, item))
    },
    {
      icon: 'flag',
      title: conclusion.label(),
      l2Nav: conclusion.items.map(item => toChildItem(activeRoute, item))
    },
    {
      icon: 'rocketship',
      title: hungryForMore.label(),
      l2Nav: hungryForMore.items.map(item => toChildItem(activeRoute, item))
    },
    {divider: true},
    {
      icon: 'gear',
      title: i18n.getMessage('Troubleshooting'),
      action: {type: 'navigate', path: '/troubleshooting'},
      ...(isActivePath(activeRoute, '/troubleshooting') && {active: true})
    },
    {
      icon: 'building',
      title: demoHub.label(),
      l2Nav: demoHub.items.map(item => toChildItem(activeRoute, item))
    }
  ];
}

export default {
  appTheme: AppTheme,
  applicationLayout: 'aiux-nav-layout',

  setup(ctx) {
    const activeRoute = ctx.app?.routes?.find(r => r.active)?.route;
    const current = navLayoutContext.get();
    navLayoutContext.set({
      ...current,
      appTitle: i18n.getMessage('WDF Lab'),
      features: {
        menus: false,
        logo: true,
        userSession: false,
        notifications: false,
        themeToggle: false,
        densityPicker: false,
        unifiedExperience: false,
        profile: true,
        helpPanel: true,
        chat: true
      },
      items: buildNavItems(activeRoute),
      defaultLogoFull: 'servicenow',
      defaultLogoIcon: 'servicenow'
    });
  },

  teardown() {
    navLayoutContext.set({
      items: [],
      defaultLogoFull: null,
      defaultLogoIcon: null
    });
  }
};
