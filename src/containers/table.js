import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone
} from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

import StarRatingComponent from "react-star-rating-component";

import { fetchPro, fetchProCount } from "../actions/pro";

const reviewRatingFormatter = (cell, row) => {
  return (
    <>
      <StarRatingComponent
        name="rate1"
        starCount={5}
        value={cell}
        editing={false}
        emptyStarColor={"#eee"}
        starColor={"#000"}
      />
    </>
  );
};

const nameFormatter = (cell, row) => {
  const name = cell.substring(0, cell.lastIndexOf(" "));
  return <>{name}</>;
};

const columns = [
  {
    dataField: "id",
    text: "Id"
  },
  {
    dataField: "name",
    text: "Name",
    formatter: nameFormatter
  },
  {
    dataField: "main_address.postcode",
    text: "Postcode"
  },
  {
    dataField: "review_rating",
    text: "Review Rating",
    formatter: reviewRatingFormatter
  }
];

class Table extends Component {
  constructor(props) {
    super(props);
    this.optionsPagination = {
      page: 1,
      sizePerPage: 20,
      hideSizePerPage: true,
      totalSize: 0,
      firstPageText: "<<",
      lastPageText: ">>",
      withFirstAndLast: true,
      hidePageListOnlyOnePage: true,
      alwaysShowAllBtns: false
    };
  }
  componentDidMount() {
    //test on load
    //this.props.fetchPro(37, "sw11", 0, 20);
  }

  noDataOptions(text) {
    return <div>{text}</div>;
  }

  handleTableChange = (type, { page, sizePerPage }) => {
    const currentIndex = (page - 1) * sizePerPage;
    /*setTimeout(() => {
      this.setState(() => ({
        page,
        data: products.slice(currentIndex, currentIndex + sizePerPage),
        sizePerPage
      }));
    }, 2000);*/
    this.optionsPagination.page = page;
    console.log(type);
    console.log(page);
    console.log(sizePerPage);
    console.log(currentIndex);
    console.log(currentIndex + sizePerPage);
    const { category, postcode } = this.props.form.search_pros.values;
    const self = this;
    this.props.fetchProCount(category, postcode, 0).then(response => {
      const { proCountReducer } = self.props;
      if (proCountReducer > 0) {
        self.props.fetchPro(
          category,
          postcode,
          currentIndex,
          currentIndex + sizePerPage
        );
      } else {
        console.log("no data found");
      }
    });
  };

  render() {
    const data =
      this.props.proReducer === undefined ||
      Object.keys(this.props.proReducer).length === 0
        ? []
        : this.props.proReducer;
    const options = this.optionsPagination;
    const totalSize =
      this.props.proCountReducer !== undefined &&
      typeof this.props.proCountReducer === "number"
        ? this.props.proCountReducer
        : 0;
    console.log(this.props.proCountReducer);
    options.totalSize = totalSize;
    console.log(options);
    return (
      <div>
        <BootstrapTable
          keyField="id"
          data={data}
          columns={columns}
          pagination={paginationFactory(options)}
          //noDataIndication={this.noDataOptions(`Search to show results`)}
          remote={{ pagination: true, filter: false, sort: false }}
          onTableChange={this.handleTableChange}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    ...state
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPro, fetchProCount }, dispatch);
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Table)
);
