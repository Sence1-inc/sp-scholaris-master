import * as React from 'react';
import createCache from '@emotion/cache';
import { CacheProvider as DefaultCacheProvider } from '@emotion/react';
import type { EmotionCache, Options as OptionsOfCreateCache } from '@emotion/cache';

export type EmotionCacheProviderProps = {
  /** This is the options passed to createCache() from 'import createCache from "@emotion/cache"' */
  options: OptionsOfCreateCache;
  /** By default <CacheProvider /> from 'import { CacheProvider } from "@emotion/react"' */
  CacheProvider?: (props: {
    value: EmotionCache;
    children: React.ReactNode;
  }) => React.JSX.Element | null;
  children: React.ReactNode;
};

export function EmotionCacheProvider(props: EmotionCacheProviderProps) {
  const { options, CacheProvider = DefaultCacheProvider, children } = props;

  // Create a cache instance once for the component lifetime
  const [cache] = React.useState(() => {
    const cache = createCache(options);
    return cache;
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}