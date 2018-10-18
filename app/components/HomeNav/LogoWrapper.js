import styled from 'styled-components';

const LogoWrapper = styled.div`
  position: absolute;
  top: 45px;
  right: 80px;
  @media all and (max-width: 767px) {
    position: absolute;
    top: unset;
    right: unset;
    bottom: 100px;
    width: 100%;
  }
`;

export default LogoWrapper;
