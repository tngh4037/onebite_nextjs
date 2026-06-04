import style from './index.module.css'; // CSS Module
import SearchableLayout from '@/components/searchable-layout';
import { ReactNode } from 'react';
import books from '@/mock/books.json'; // @ : TypeScript 에서 src 폴더를 가리키는 경로이다.
import BookItem from '@/components/book-item';

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {books.map((book) => {
          return <BookItem key={book.id} {...book} />;
        })}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {books.map((book) => {
          return <BookItem key={book.id} {...book} />;
        })}
      </section>
    </div>
  );
}

// 이렇게하면, "/" 접속 시, App 컴포넌트의 Component 로 Home 컴포넌트가 전달될 때, getLayout도 같이 전달됨.
Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
