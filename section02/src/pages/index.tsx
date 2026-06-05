import style from './index.module.css';
import SearchableLayout from '@/components/searchable-layout';
import { ReactNode } from 'react';
import BookItem from '@/components/book-item';
import { InferGetStaticPropsType } from 'next';
import fetchBooks from '@/lib/fetch-books';
import fetchRandomBooks from '@/lib/fetch-random-books';
import Head from 'next/head';

export const getStaticProps = async () => {
  const [allBooks, recommandBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: {
      allBooks,
      recommandBooks,
    },
  };
};

export default function Home({
  allBooks,
  recommandBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>한입북스</title>
        {/* / 의 의미: 프로젝트의 public 디렉토리를 의미. */}
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스" />
        <meta
          property="og:description"
          content="한입북스에 등록된 도서들을 만나보세요."
        />
      </Head>

      <div className={style.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          {recommandBooks.map((book) => {
            return <BookItem key={book.id} {...book} />;
          })}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          {allBooks.map((book) => {
            return <BookItem key={book.id} {...book} />;
          })}
        </section>
      </div>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
