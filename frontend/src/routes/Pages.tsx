import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import Loading from '@/components/Loading';

import routes from './index';

function Pages() {
  return (
    <Suspense fallback={<Loading />}>
    <Routes>
      {Object.values(routes).map(({ path, component: Component }) => {
        return <Route key={path} path={path} element={<Component />} />;
      })}
    </Routes>
    </Suspense>
  );
}

export default Pages;
