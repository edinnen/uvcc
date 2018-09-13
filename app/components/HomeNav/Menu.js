import styled from 'styled-components';

const Menu = styled.div`
  display: ${props => (props.hide ? 'none' : 'flex')};
  flex-direction: column;
  position: relative;
  top: 50px;
  left: 50px;
  color: white;
  text-shadow: 1px 1px 3px black;
  span.navItem {
    font-size: 6vmin;
    font-weight: 300;
    letter-spacing: 2.57px
    line-height: 25px;
    cursor: pointer;
    transition: margin-left 0.3s cubic-bezier(0.61, 0.33, 0, 1.82);
    &.selected {
      margin-left: 15px;
      color: #ffd600;
      text-shadow: 1px 1px 3px #00483d;
      &:hover {
        color: #ffd600;
      }
      &:focus {
        margin-left: 15px
        color: #ffd600;
      }
    }
    &:hover {
      margin-left: 15px;
      color: #ffd600;
    }
    &:focus {
      outline: none;
    }
  }
`;

export default Menu;
