import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Container = styled.div`
  margin: 0 auto;
  color: white;
  width: 1450px;
  ${mixins.bp.md.max`
    width: 767px
  `};
  ${mixins.bp.sm.min`
    padding: 0 10px
  `};
  ${mixins.bp.xs.max`
    width: 350px
  `};
`;

export default Container;
