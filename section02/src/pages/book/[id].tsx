import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import style from './[id].module.css';
import fetchOneBook from '@/lib/fetch-one-book';
import { useRouter } from 'next/router';
import Head from 'next/head';

// e.g. book/{id}
// ㄴ 빌드 타임에 사전 렌더링에서 어떤 경로가 올지 알 수 없다. 따라서 이 페이지에 어떤 경로들이 존재할 수 있는지 설정하는 작업이 필요하다. ( 설정하는 함수: getStaticPaths )
//    ㄴ e.g. 백엔드 서버로부터 현재 데이터베이스에 등록된 도서들의 id목록을 받아온다던지,
//    ㄴ e.g. 임의로 몇개의 id를 설정한다던지 등
// ㄴ 그러면 사전 렌더링 과정에서는 설정한 모든 경로에 해당하는 페이지들을 각각 다 생성하게 된다. ( 각 개별 설정값 기준으로 각각 getStatisProps 를 호출 )
export const getStaticPaths = () => {
  // 현재 이 페이지에 어떤 PathVariable 경로들이 올 수 있는지를 배열로 반환. ( 배열안에 각 경로별 객체로 )
  return {
    paths: [
      { params: { id: '1' } }, // 경로 데이터는 반드시 문자열어야 함.
      { params: { id: '2' } },
      { params: { id: '3' } },
    ],
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));

  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      book,
    },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  {
    /* 페이지를 처음 요청했을때는 Fallback 상태로 인해, 메타태그가 적용되지 않는 이슈가 있기에, 기본적인 메타태그를 적용해주기위해 여기서도 해주었다. */
  }
  if (router.isFallback) {
    return (
      <>
        <Head>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="한입북스" />
          <meta
            property="og:description"
            content="한입북스에 등록된 도서들을 만나보세요."
          />
        </Head>
        <div>로딩중입니다...</div>
      </>
    );
  }

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
    <>
      {/* === 추가 START === */}
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      {/* === 추가 END === */}

      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${coverImgUrl}')` }}
        >
          <img src={coverImgUrl} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>
          {author} | {publisher}
        </div>
        <div className={style.description}>{description}</div>
      </div>
    </>
  );
}
