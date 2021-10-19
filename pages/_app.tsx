import 'tailwindcss/tailwind.css'
import "../styles/global.css";
import React from 'react'
import { AppProps } from 'next/app';
import wrapper  from '../redux/store/store';
import { useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import { setUserInfo } from 'redux/store/actions';

 function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

App.getInitialProps = wrapper.getInitialAppProps(store => async ({ Component, ctx }) => {

  if(ctx.req && ctx.req.hasOwnProperty('identity')){
    store.dispatch(setUserInfo(ctx.req['identity']))
    // console.log("CTX-@-#-#AAAAAAAAAAAA",  ctx.req)
  }



  (store).runSaga();
  //   1. Wait for all page actions to dispatch
  const pageProps = {
      ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
      namespacesRequired: ['common']
  };

  //   2. Stop the saga if on server
  if (store && ctx.req) {
      store.dispatch(END);
      await (store).sagaTask.toPromise();
  }

  // 3. Return props
  return {
      pageProps
  };
});

export default wrapper.withRedux(App);