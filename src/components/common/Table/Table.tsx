import React from 'react'
import { Table as AntTable, Skeleton } from 'antd'
import { TableContainer, SkeletonRow } from './Table.style'
import type { ColumnsType } from 'antd/es/table'

/**
 *   loading: It receives a boolean and displays a spinner inside the table if set to true.
 *   dataSource: It receives an array of objects where each object has a record.
 *   columns: It receives an array of objects. It renders columns for the records.
 *   loadingData:  It receives a boolean and displays skeletons if set to true.
 *   skeletonRow: It receives an array of numbers that display a number of skeleton rows.
 *   skeletonColumn: It receives an array of numbers that display a number of skeleton columns.
 *   dataNotFound: It receives a component that is displayed if the data source is empty.
 *   rowSelection: It receives configuration about a selectable table where each row can be selected.
 *   expandable: It receives configuration about expandable rows where table rows can be expanded to show some content about a record.
 *   nested: It receives a boolean which tells if the expanded row has a nested table.
 */

export type TableProps = {
  loading?: boolean
  dataSource: any[]
  columns: ColumnsType<any>
  loadingData?: boolean
  skeletonColumn?: number[]
  skeletonRow?: number[]
  dataNotFound?: JSX.Element
  rowSelection?: any
  expandable?: any
  nested?: boolean
}
export default function Table({
  loading,
  dataSource,
  columns,
  loadingData,
  skeletonRow,
  skeletonColumn,
  dataNotFound,
  rowSelection,
  expandable,
  nested,
}: TableProps) {
  return loadingData ? (
    <>
      <Skeleton.Input active size="large" block />
      {skeletonRow?.map(row => (
        <SkeletonRow
          role="progressbar"
          skeletonColumn={skeletonColumn}
          key={row}
        >
          {skeletonColumn?.map(column => (
            <Skeleton.Button
              key={column}
              shape="round"
              active
              size="small"
              block
            />
          ))}
        </SkeletonRow>
      ))}
    </>
  ) : dataSource?.length > 0 ? (
    <TableContainer nested={!!nested}>
      <AntTable
        key={'1'}
        loading={loading}
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        rowSelection={rowSelection}
        scroll={{
          scrollToFirstRowOnChange: false,
          y: '',
        }}
        size="small"
        expandable={expandable}
      />
    </TableContainer>
  ) : (
    <>{dataNotFound}</>
  )
}
