import styled from 'styled-components';

const ArrowWrapper = styled.div`
  position: absolute;
  bottom: 15px;
  z-index: 50;
  width: 100%;
  svg {
    filter: invert(100%);
    font-size: 44px;
    &:hover {
      fill: black;
      filter: invert(88%) sepia(20%) saturate(6617%) hue-rotate(1deg)
        brightness(108%) contrast(102%);
      animation: upDown 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      perspective: 1000px;
    }

    @keyframes upDown {
      0% {
        transform: translateY(-10px);
      }
      25% {
        transform: translateY(5px);
      }
      50% {
        transform: translateY(-8px);
      }
      75% {
        transform: translateY(3px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  }
`;

export default ArrowWrapper;
