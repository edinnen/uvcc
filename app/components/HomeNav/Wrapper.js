import styled from 'styled-components';

const Wrapper = styled.div`
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  transition: background-image 1s ease-in-out;
  height: 100%;
  width: 100%;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(0, 0, 0, 0) 20%,
      rgba(0, 0, 0, 0) 50%,
      rgba(0, 0, 0, 1) 100%
    );
    opacity: 1;
  }
  span#attribution {
    position: absolute;
    top: 8px;
    right: 16px;
    color: rgba(255, 255, 255, 0.5);
    writing-mode: vertical-rl;
    font-size: 9px;
  }
`;

export default Wrapper;
