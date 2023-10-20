import styled from 'styled-components'
import { Drawer, Steps, Radio as AntRadio, Space, Tabs } from 'antd'
import { CheckOutlined } from '@ant-design/icons'

export const DrawerHeading = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`

export const CustomDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding: 20px 30px;
  }
`

export const RadioButton = styled(AntRadio.Button)`
  color: #405d6c;
  &.ant-radio-button-wrapper-checked:not(
      .ant-radio-button-wrapper-disabled
    ):hover,
  &.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
    background: ${props => (props.value === 'HIGH' ? '#E82A00' : '#76BE57')};
    border-color: ${props => (props.value === 'high' ? '#E82A00' : '#76BE57')};
  }
  &:hover {
    color: #405d6c;
  }
  &.ant-radio-button-wrapper-checked:not(
      .ant-radio-button-wrapper-disabled
    )::before,
  &.ant-radio-button-wrapper-checked:not(
      .ant-radio-button-wrapper-disabled
    ):hover::before {
    content: none;
  }
  &.ant-radio-button-wrapper-checked:not(
      [class*=' ant-radio-button-wrapper-disabled']
    ).ant-radio-button-wrapper {
    box-shadow: none;
  }
  &.ant-radio-button-wrapper-checked:not(
      [class*=' ant-radio-button-wrapper-disabled']
    ).ant-radio-button-wrapper:first-child {
    border-right-color: #e82a00;
  }
`

export const ConnectingLine = styled.div`
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 15px;
    left: 0;
    bottom: 15px;
    width: 7px;
    border: 1px solid #bbc6d3;
    border-right: none;
  }
`

export const DrawerFooter = styled(Space)`
  justify-content: space-between;
  width: 100%;
`

export const StyledSteps = styled(Steps)`
  background-color: #f9fcff;
  width: 100%;
  padding: 10px;
  display: grid;
  grid-template-columns: auto auto auto;
`
const { Step } = StyledSteps

export const StyledStep = styled(Step)`
  .ant-steps-item-title {
    font-size: 0.8rem;
    color: #0057b7;
    font-weight: 800;
    cursor: pointer;
  }

  &.ant-steps-item-process
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-title {
    color: #0057b7;
    font-weight: bold;
    border-bottom: 2px solid #0057b7;
    &::before {
      content: '${props => props.stepNumber}. ';
    }
  }
  &.ant-steps-item-wait
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-title {
    &::before {
      content: '${props => props.stepNumber}. ';
    }
  }

  &.ant-steps-item-finish {
    .ant-steps-item-title {
      cursor: pointer;
      &:hover {
        color: #0057b7 !important;
        text-shadow: 1px 0px 0px #0057b7;
        font-weight: normal;
      }
    }
    .ant-steps-icon {
      line-height: 2px;
      display: inline;
    }
  }
  .ant-steps-icon {
    display: none;
  }
`

export const StyledTab = styled(Tabs)`
  .ant-tabs-nav {
    background-color: #f9fcff;
    padding: 0 15px;
  }

  .ant-tabs-tab:nth-child(1) {
    .ant-tabs-tab-btn {
      &:before {
        content: '${props =>
          props.activeKey === '1' || props.activeKey === '2' ? '' : '1. '}';
      }
      & .anticon-check {
        display: ${props =>
          props.activeKey === '1' || props.activeKey === '2'
            ? 'inline'
            : 'none'};
      }
    }
  }
  .ant-tabs-tab:nth-child(2) {
    .ant-tabs-tab-btn {
      &:before {
        content: '${props => (props.activeKey === '2' ? '' : '2. ')}';
      }
      & .anticon-check {
        display: ${props => (props.activeKey === '2' ? 'inline' : 'none')};
      }
    }
  }
  .ant-tabs-tab:nth-child(3) {
    .ant-tabs-tab-btn {
      &:before {
        content: '${props => (props.activeKey === '3' ? '' : '3. ')}';
      }
      & .anticon-check {
        display: none;
      }
    }
  }
`

export const CustomCheckIcon = styled(CheckOutlined)`
  color: #76be57;
  font-size: 1rem;
`
