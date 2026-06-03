import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  const q = router.query.q; // 쿼리스트링 값 꺼내오기

  return <h1>Search {q}</h1>;
}
