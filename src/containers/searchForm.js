import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

import { fetchCategories } from "../actions";

class SearchForm extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  renderCategory(data) {
    return (
      <div className="form-group col-md-5">
        <label htmlFor="inputCategory">Category</label>
        <select name="category" className="form-control">
          {data
            .filter(key => key.is_hidden !== true)
            .map((e, key) => {
              return (
                <option key={key} value={e.id}>
                  {e.name}
                </option>
              );
            })}
        </select>
      </div>
    );
  }

  renderPostcode() {
    return (
      <div className="form-group col-md-5">
        <label htmlFor="inputPostcode">Postcode</label>
        <input type="text" name="postcode" className="form-control" />
      </div>
    );
  }
  render() {
    const data =
      this.props.categoriesReducer === undefined ||
      Object.keys(this.props.categoriesReducer).length === 0
        ? []
        : this.props.categoriesReducer;
    return (
      <form>
        <div className="form-row align-items-center">
          {this.renderCategory(data)}
          {this.renderPostcode()}
          <div className="form-group col-md-2">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCategories }, dispatch);
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchForm)
);
