import 'tailwindcss/tailwind.css'
import "../styles/global.css";
import React from 'react'
import { AppProps } from 'next/app';
import wrapper  from '../redux/store/store';
import { useDispatch } from 'react-redux';
import { END } from 'redux-saga';
// import { btnLoginClick } from 'redux/models/identity';



 function App({ Component, pageProps }) {
  // const dispatch = useDispatch()
  // dispatch(btnLoginClick({
  //     email: "user7.man@gmail.ru",
  //     password: "user12345"
  // }));
  return <Component {...pageProps} />;
}

App.getInitialProps = wrapper.getInitialAppProps(store => async ({ Component, ctx }) => {
  // if (store.getState().identity.id === '') {
  //   store.dispatch(btnLoginClick({
  //     email: "user7.man@gmail.ru",
  //     password: "user12345"
  //   }))
  // }

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