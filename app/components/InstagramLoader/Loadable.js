/**
 *
 * Asynchronously loads the component for InstagramLoader
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
