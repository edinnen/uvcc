/**
 *
 * Asynchronously loads the component for ExecutiveCard
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
