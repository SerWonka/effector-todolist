import { createDomain } from 'effector';
import { GrommetProps } from 'grommet';

export const appDomain = createDomain('app');

export const changeTheme = appDomain.createEvent();

export enum Theme {
  dark = 'dark',
  light = 'light',
}

const defaultTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
  ? Theme.dark
  : Theme.light;

export const $theme = appDomain
  .createStore<GrommetProps['themeMode']>(defaultTheme)
  .on(changeTheme, (theme) => {
    if (theme === Theme.dark) {
      return Theme.light;
    }
    if (theme === Theme.light) {
      return Theme.dark;
    }
    return theme;
  });

export const $isDark = $theme.map((state) => state === Theme.dark);
