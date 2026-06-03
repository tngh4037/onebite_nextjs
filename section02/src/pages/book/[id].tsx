import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  const id = router.query.id; // 동적 경로 값 가져오기
  // const {id} = router.query; // 이렇게 해도 됨.

  return <h1>Book {id} Page </h1>;
}
