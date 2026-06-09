export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  console.log(q);
  return <div>Search 페이지</div>;
}
