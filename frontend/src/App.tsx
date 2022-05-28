import { BrowserRouter } from 'react-router-dom';
import AppErrorBoundaryFallback from '@/error-handling/AppErrorBoundaryFallback';
import Pages from '@/routes/Pages';
import { globalStyles } from '@/styles/base';
import { ErrorBoundary } from 'react-error-boundary';
import Header from '@/blocks/Header';

function App() {
  globalStyles();

  return <ErrorBoundary FallbackComponent={AppErrorBoundaryFallback}>
    <BrowserRouter>
      <Header />
      <main>
        <Pages />
      </main>
    </BrowserRouter>
  </ErrorBoundary>;
}

export default App;
