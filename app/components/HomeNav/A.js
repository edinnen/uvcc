import styled from 'styled-components';

const A = styled.a`
  img {
    filter: invert(100%);
    &:hover {
      filter: invert(88%) sepia(20%) saturate(6617%) hue-rotate(1deg)
        brightness(108%) contrast(102%);
      animation: wiggle 0.82s cubic-bezier(.36,.07,.19,.97) both;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      perspective: 1000px;
    }

    @keyframes wiggle {
      0% {transform: rotate(10deg);}
      25% {transform: rotate(-10deg);}
      50% {transform: rotate(15deg);}
      75% {transform: rotate(-5deg);}
      100% {transform: rotate(0deg);}
    }
`;

export default A;
