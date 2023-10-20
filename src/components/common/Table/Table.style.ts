import styled from 'styled-components';

export const TableContainer = styled.div<{ nested: boolean }>`
  margin: ${props => (props?.nested ? '30px 0' : '')};

  .ant-table.ant-table-small .ant-table-thead > tr > th {
    background: #e8eff6;
    font-size: 18px;
    padding: 8px 12px;
  }
  .ant-table-thead > tr > th svg {
    fill: #a9b9cb;
  }
  .ant-table-tbody > tr.ant-table-row:hover > td {
    background: #f3f9ff;
    .ant-table-expanded-row {
      background: #f9fcff;
    }
  }
  .ant-table-expanded-row:hover > * {
    background: #f9fcff;
  }
  .ant-table-expanded-row > * {
    background: #f9fcff;
  }

  .ant-table-tbody > tr.ant-table-row > td {
    font-size: 16px;
  }
  .ant-table-body {
    min-height: ${props => (props?.nested ? '100%' : 'calc(100vh - 280px)')};
    max-height: ${props => (props?.nested ? '100%' : 'calc(100vh - 280px)')};
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  .ant-table-tbody > tr.ant-table-row > td:last-child {
    position: relative;
  }
  .ant-table-tbody > tr.ant-table-row > td .actions {
    position: absolute;
    background: linear-gradient(
      269.22deg,
      #f3f9ff 58.36%,
      rgba(243, 249, 255, 0) 79.17%
    );
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    justify-content: flex-end;
    padding: 10px;
    display: none;
  }
  .ant-table-tbody > tr.ant-table-row:hover > td .actions {
    display: inline-flex;
  }
`;

export const SkeletonRow = styled.div<{ skeletonColumn: number[] | undefined }>`
  display: grid;
  grid-template-columns: ${props =>
    props.skeletonColumn
      ?.map(key => `${key}fr`)
      .toString()
      .replaceAll(',', ' ')};
  column-gap: 20px;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
`;
