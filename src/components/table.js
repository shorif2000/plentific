import React from "react";
import BootstrapTable from "react-bootstrap-table-next";

import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import overlayFactory from "react-bootstrap-table2-overlay";

export const Table = ({
  data,
  page,
  sizePerPage,
  onTableChange,
  totalSize,
  columns,
  options,
  noDataIndication,
  loading
}) => (
  <BootstrapTable
    keyField="id"
    data={data}
    columns={columns}
    pagination={paginationFactory(options)}
    remote={{ pagination: true, filter: false, sort: false }}
    onTableChange={onTableChange}
    noDataIndication={noDataIndication}
    loading={loading} //only loading is true, react-bootstrap-table will render overlay
    overlay={overlayFactory({
      spinner: true,
      background: "rgba(192,192,192,0.3)"
    })}
  />
);
