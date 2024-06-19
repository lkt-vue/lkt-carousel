import { Settings } from '../settings/Settings';

export const debugLktCarousel = (state: boolean = true): void => {
  Settings.debugEnabled = state;
};

export const debug = (...args: any[]): void => {
  if (Settings.debugEnabled) console.info('[LktCarousel] ', ...args);
};

