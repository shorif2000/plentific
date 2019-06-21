import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import React, { Component } from 'react';


const products = [ ... ];
const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price'
}];


class Table extends Component {

  render() {
   return (<div><BootstrapTable keyField='id' data={ products } columns={ columns } /></div>);
  }
}
export default Table;
