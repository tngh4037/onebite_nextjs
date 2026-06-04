import style from './searchable-layout.module.css';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

export default function SearchableLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [search, setSearch] = useState('');
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  const router = useRouter();
  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  // 새로고침시 검색바에 입력태그에 유지되도록.
  const q = router.query.q as string;
  useEffect(() => {
    setSearch(q || '');
  }, [q]);

  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          value={search}
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
          placeholder="검색어를 입력하세요."
        />
        <button onClick={onSubmit}>검색</button>
      </div>

      {children}
    </div>
  );
}
