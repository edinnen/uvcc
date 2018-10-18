import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Img = styled.img`
  display: block;
  margin: 0 auto;
  width: 200px;
  z-index: 50;
  @media all and (max-width: 768px) {
    width: 150px;
  }
  ${mixins.bp.sm.max`
    width: 100px;
  `};
`;

export default Img;
