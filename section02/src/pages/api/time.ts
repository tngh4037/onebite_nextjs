import type { NextApiRequest, NextApiResponse } from 'next'; // Next에서 자체적으로 제공하는 요청/응답 타입을 활용하자.

// api/time 호출 -> handler 함수 실행
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const date = new Date();
  res.json({ time: date.toLocaleDateString() });
}
