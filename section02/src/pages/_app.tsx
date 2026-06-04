import GlobalLayout from '@/components/global-layout';
import SearchableLayout from '@/components/searchable-layout';
import '@/styles/globals.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactNode } from 'react';

// NextPageWithLayout 는, Next에서 제공하는 페이지 컴포넌트 타입에, getLayout 이라는 타입의 메서드가 추가된 타입이다.
// ㄴ App 컴포넌트가 전달받는 Component props 의 타입을 확장하기 위함.
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

export default function App({
  Component,
  pageProps,
}: AppProps & { Component: NextPageWithLayout }) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page); // Component.getLayout 이 undefined 일때는 "((page: ReactNode) => page)" 함수로 주입.

  return (
    <>
      <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>
    </>
  );
}
