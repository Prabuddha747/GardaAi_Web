import { renderToString } from 'react-dom/server';
import App from './App';
export { PATHS, SEO, SITE } from './routes';

export const render = (path: string) => renderToString(<App path={path} />);
