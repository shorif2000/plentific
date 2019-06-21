import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Table from "./components/table";

class App extends Component {
  render() {
    const { ...other } = this.props;

    return (
      <div className="main">
        <Switch>
          <h1>Your Site</h1>
          <Route exact path="/" render={() => <Table {...other} />} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ...state };
}

// Anything returned from this function will end up as props
// on this container
function mapDispatchToProps(dispatch) {
  // Whenever getUser is called, the result should be passed
  // to all our reducers
  return bindActionCreators({}, dispatch);
}

// Promote component to a container - it needs to know
// about this new dispatch method, fetchActiveUser. Make it available
// as a prop
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
