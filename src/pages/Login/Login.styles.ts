import styled from 'styled-components';
import { Card } from 'antd';

export const LoginCard = styled(Card)`
  .ant-card-head-title {
    font-size: 2rem;
    text-align: center;
  }
  border-radius: 15px;
  box-shadow: 36px 36px 74px #bebebe, -36px -36px 74px #ffffff;
  width: 20vw;
`;

export const LoginForm = styled.form`
  display: grid;
  row-gap: 1rem;
`;
