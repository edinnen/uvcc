import styled from 'styled-components';
import * as mixins from 'styles/mixins';
import browser from 'browser-detect';

const type = browser();

let isMobileSafari = false;
if (type.name === 'safari' && type.mobile) isMobileSafari = true;

const Container = styled.div`
  margin: 0 auto;
  color: white;
  width: 1450px;
  ${mixins.bp.md.max`
    width: 767px;
  `}
  ${mixins.bp.sm.min`
    padding: 0 10px;
  `}
  ${mixins.bp.sm.max`
    iframe {
      margin: 0 auto !important;
    }
  `}
  ${mixins.bp.xs.max`
    width: 100%;
    iframe {
      min-width: unset !important;
      width: ${isMobileSafari ? '65%' : '90%'} !important;
    }
    // span {
    //   transform: unset !important;
    // }
  `}
`;

export default Container;
