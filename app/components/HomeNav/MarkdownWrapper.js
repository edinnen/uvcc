import styled from 'styled-components';

const MarkdownWrapper = styled.div`
  color: #4d4d4d;
  font-size: 16px;
  line-height: 26px;
  margin-bottom: 60px;
  h1 {
    font-size: 36px;
    font-weight: 300;
    letter-spacing: 3px;
    line-height: 45px;
    color: #ffd600;
    text-transform: uppercase;
  }
  img {
    margin-top: 8px;
    margin-bottom: 5px;
    width: 100%;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.24),
      14px -14px 0 0 rgba(255, 214, 0, 0.5) !important;
    + em {
      margin-top: 5px;
      color: #8d8d8d;
      font-size: 14px;
      line-height: 18px;
      font-style: normal;
    }
  }
  blockquote {
    p {
      color: #8d8d8d;
      font-size: 24px;
      font-style: italic;
      font-weight: 300;
      line-height: 34px;
    }
  }
  a {
    color: rgb(255, 214, 0) !important;
  }
`;

export default MarkdownWrapper;
