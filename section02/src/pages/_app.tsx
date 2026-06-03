import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // useEffect 를 사용해서 컴포넌트가 마운트되는 시점에 prefetch 설정을 해주어야 한다.
  useEffect(() => {
    router.prefetch('/test');
  }, []);

  const onClickButton = () => {
    router.push('/test'); // 클라이언트 사이드 렌더링 방식으로 이동
  };

  return (
    <>
      <header>
        <Link href={'/'}>index</Link> &nbsp;
        <Link href={'/search'} prefetch={false}>search</Link> &nbsp;
        <Link href={'/book/1'}>book/1</Link> &nbsp;
        <div>
          <button onClick={onClickButton}>/test 페이지로 이동</button>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
}
