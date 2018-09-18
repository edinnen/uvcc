import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const SocialIcons = styled.div`
  position: relative;
  top: 50px;
  left: 50px;
  ${mixins.bp.sm.max`
    top: 15px;
    left: 15px;
  `};
`;

export default SocialIcons;
