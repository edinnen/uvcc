import styled from 'styled-components';

const Img = styled.img`
  height: 250px;
  width: 255px;
  box-shadow: 0 2px 4px -2px rgba(0, 0, 0, 0.24),
    0 6px 10px 0 rgba(0, 0, 0, 0.12),
    16px -16px 0 0 ${props => (props.inModal ? 'rgb(255, 214, 0)' : 'rgba(88, 88, 88, 1)')};
  margin-bottom: 15px;
`;

export default Img;
