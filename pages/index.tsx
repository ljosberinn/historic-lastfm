import { GetServerSideProps } from 'next';

import { FOUND_MOVED_TEMPORARILY } from '../src/utils/statusCodes';

export default function Home() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  ctx.res
    .writeHead(FOUND_MOVED_TEMPORARILY, { Location: '/user/XHS207GA' })
    .end();

  return {
    props: {},
  };
};
