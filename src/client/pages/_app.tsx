import { NextComponentType } from 'next';
import { AppContext, AppProps } from 'next/app';
import { css, Global } from '@emotion/react';
import { IsJsonable } from '~shared/types/types';
import { globalButtonReset } from '~client/features/styles/buttonReset';
import { setPathAndQuery } from '~client/features/server/serverSlice';
import { wrapper } from '~client/features/redux/store';

const globalBodyStyles = css`
  body {
    margin: 0;
  }
`;

export interface ModifiedAppIntialProps<A = Record<string, string>> {
  appProps: IsJsonable<A>;
}

export interface ExtendedAppProps<
  P = Record<string, string>,
  A = Record<string, string>
> extends AppProps<IsJsonable<P>>,
    ModifiedAppIntialProps<A> {}

const myApp: NextComponentType<
  AppContext,
  ModifiedAppIntialProps,
  ExtendedAppProps
> = ({ Component, pageProps, appProps }) => (
  <>
    <Global styles={[globalBodyStyles, globalButtonReset]} />
    <Component {...appProps} {...pageProps} />
  </>
);

myApp.getInitialProps = async ({ Component, ctx }) => {
  ctx.store.dispatch(
    setPathAndQuery({
      pathName: ctx.pathname,
      query: ctx.query,
    })
  );
  return {
    pageProps: {
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
    },
    appProps: { appInitialProcessEnv: process.env.APP_PROP },
  };
};

export default wrapper.withRedux(myApp);
