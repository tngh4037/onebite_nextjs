import SearchableLayout from '@/components/searchable-layout';
import { ReactNode, useState, useEffect } from 'react';

import fetchBooks from '@/lib/fetch-books';
import BookItem from '@/components/book-item';
import { useRouter } from 'next/router';
import { BookData } from '@/types';
import Head from 'next/head';

// SSG 사전 렌더링 과정에서는 쿼리스트링을 불러올 수 없다. ( 빌드타임에는 쿼리스트링으로 뭐가올지 알수없기 때문 )
// ㄴ 따라서 이 경우는, 이전에 React 앱에서 했던 방식대로 데이터 페칭을 진행해주어야 한다.

// 이제 이 search/index.tsx 는, GetStaticProps 나 GetServerSideProps 함수가 모두 없어졌으므로, 기본적으로는 SSG 방식으로 동작한다.
// 쿼리스트링으로 전달되는 값은 빌드타임에는 알 수 없으므로, 사전 렌더링 과정에서는 결국 이 search 페이지의 레이아웃 정도(검색결과를 제외한 div 태그 정도)만 렌더링을 하게 되고,
// 그리고 나서 검색결과 데이터는, 클라이언트측(브라우저측)에서 컴포넌트(Page)가 다시 실행되면서, 마운트된 이후에 직접 useEffect 에서 쿼리스트링을 기반으로 검색어를 불러와서 검색결과 데이터를 클라이언트 사이드 측에서 렌더링하게 되는 방식으로 동작한다.
export default function Page() {
  const [books, setBooks] = useState<BookData[]>([]);
  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };

  useEffect(() => {
    if (q) {
      // 검색 결과를 불러오는 로직
      fetchSearchResult();
    }
  }, [q]);

  return (
    <div>
      <Head>
        <title>한입북스 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스 - 검색결과" />
        <meta
          property="og:description"
          content="한입북스에 등록된 도서들을 만나보세요."
        />
      </Head>
      {books.map((book) => {
        return <BookItem key={book.id} {...book} />;
      })}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
