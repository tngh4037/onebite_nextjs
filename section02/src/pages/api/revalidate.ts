import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await res.revalidate('/'); // 어떤 페이지를 revalidate 하려고 하는지 경로를 인자로 넣어주면 된다.
    return res.json({ revalidate: true });
  } catch (err) {
    res.status(500).send('Revalidation Failed');
  }
}

// /api/revalidate 로 요청 시, 위 handler 가 실행되어 res 객체에 revalidate 메서드가 호출되어서,
// 인수로 전달한 "/" 경로인 인덱스 페이지를 다시 생성한다.
// 그리고 페이지 재생성이 성공했다면, 응답에 revalidate 프로퍼티로 true를 응답한다.

// 즉 api(e.g. api/revalidate) 요청을 날려서, 특정 페이지를 다시 생성하도록 만드는 방식 => on-demand ISR 방식

// 사용자의 행동에 따라서 데이터가 업데이트 된다거나, 또는 특정 조건에 따라서 데이터가 업데이트 되어야하는 페이지를 정적페이지로서 유지하고 싶을때 이 방식을 사용하면 된다.
// ㄴ 실무에서 자주 사용된다.
