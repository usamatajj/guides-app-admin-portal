import styled from "styled-components";
import { Layout, Avatar } from "antd";

export const HeaderLayout = styled(Layout.Header)`
  background-color: #fff;
  padding: 0 30px;
  box-shadow: 0px 0px 8px 0px #00000026;
  position: relative;
  z-index: 1;
`;
export const HeaderLogo = styled(Avatar)`
  width: 170px;
  img {
    object-fit: initial;
  }
`;
