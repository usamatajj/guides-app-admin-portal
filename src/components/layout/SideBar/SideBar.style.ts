import { Layout, Menu as AntMenu, Typography } from 'antd'
import styled from 'styled-components'

const { Sider } = Layout

export const Aside = styled(Sider)`
    border-radius: 0 0 30px 0;
    position: relative;
    overflow: hidden;
    &.ant-layout-sider-collapsed {
        .rights {
            display: none;
        }
        .ant-layout-sider-trigger {
            right: 40%;
        }
    }

    .ant-layout-sider-trigger {
        position: absolute;
        background: #0057b7;
        width: auto !important;
        right: 15%;
        height: 60px;
        .anticon {
            border: 1px solid #fff;
            padding: 2px;
        }
    }
`
export const Menu = styled(AntMenu)`
    border-radius: 0 0 40px 0;
    over-flow: hidden;
    margin: 0 0 30px;
    .ant-menu-submenu-open,
    .ant-menu-dark .ant-menu-submenu-selected,
    .ant-menu-inline.ant-menu-sub {
        background: #0150a8;
        position: relative;
    }
    .ant-menu-inline.ant-menu-sub:before {
        content: '';
        display: block;
        position: absolute;
        height: 90%;
        width: 1px;
        background: rgba(255, 255, 255, 0.29);
        left: 30px;
        top: -2px;
    }

    .ant-menu-inline.ant-menu-sub
        .ant-menu.ant-menu-inline.ant-menu-sub:before {
        content: '';
        display: block;
        position: absolute;
        height: 80%;
        width: 1px;
        background: rgba(255, 255, 255, 0.29);
        left: 60px;
        top: 10px;
    }

    .ant-menu-title-content {
        font-size: 18px;
    }

    .ant-menu-title-content .ant-btn {
        font-size: 18px;
        color: #fff;
        text-align: left;
        width: 100%;
        padding: 0;
    }

    .ant-menu-submenu .ant-menu .ant-menu-title-content {
        font-size: 16px;
        text-align: center;
        padding-left: 9px;
    }

    .ant-menu-submenu,
    > .ant-menu-item {
        color: #fff;
    }
    > .ant-menu-item .anticon {
        font-size: 20px;
    }
    .ant-menu-inline.ant-menu-sub .ant-menu-title-content .ant-btn {
        font-size: 16px;
        padding: 0 10px;
    }
    .ant-menu-inline.ant-menu-sub .ant-menu-item-selected {
        background: transparent;
    }

    .ant-menu-inline.ant-menu-sub
        .ant-menu-item-selected
        .ant-menu-title-content
        .ant-btn {
        background: #1f68b9;
        border-radius: 6px;
        line-height: 1;
    }
`

export const Text = styled(Typography.Text)`
    color: #fff;
    display: block;
    position: absolute;
    bottom: 20px;
    padding: 0 65px 0 20px;
`
