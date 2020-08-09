import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "../redux";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

// user
import ProfilePage from "../pages/ProfilePage";
import FormProfile from "../pages/FormProfile";
import FormPassword from "../pages/FormPassword";
import RegisterPublisher from "../pages/RegisterPublisher";

// spots
import Spots from "../pages/SpotDetails";
import AllProductsList from "../pages/AllProductsList";
import SearchResult from "../pages/SearchResult";

// transaction
import Cart from "../pages/Cart";
import PostTransaction from "../pages/Transaction/PostTransaction";
import SuccessPage from "../pages/Transaction/SuccessPage";
import FailedPage from "../pages/Transaction/FailedPage";
import HistoryUser from "../pages/HistoryUsers/HistoryUser";

// dashboard publisher
import PublisherProfile from "../pages/DashboardPublisher/Profile";
import FormEditPublisher from "../pages/DashboardPublisher/EditPublisher";
import PublisherHome from "../pages/DashboardPublisher/Home";
import PublisherControl from "../pages/DashboardPublisher/Control";
import PublisherControlAddSpot from "../pages/DashboardPublisher/AddNewSpot";
import PublisherAnalysis from "../pages/DashboardPublisher/Analysis";
import EditAdsPublisher from "../pages/DashboardPublisher/EditAdsPublisher";

// dashboard admin
import AdminHome from "../pages/DashboardAdmin/Home";
import NewPublisher from "../pages/DashboardAdmin/NewPublisher";
import NewSpotDetail from "../pages/DashboardAdmin/NewSpotDetail";
import PublisherRequest from "../pages/DashboardAdmin/PublisherRequest";
import SpotRequest from "../pages/DashboardAdmin/SpotRequest";
import UserList from "../pages/DashboardAdmin/UserList";

const MainRoutes = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={Login} />

          {/* route for dashboard publisher */}
          <Route exact path="/dashboard/publisher" component={PublisherHome} />
          <Route
            exact
            path="/dashboard/publisher/control"
            component={PublisherControl}
          />
          <Route
            exact
            path="/dashboard/publisher/control/edit/:id"
            component={EditAdsPublisher}
          />
          <Route
            exact
            path="/dashboard/publisher/control/add"
            component={PublisherControlAddSpot}
          />
          <Route
            exact
            path="/dashboard/publisher/profile"
            component={PublisherProfile}
          />
          <Route
            exact
            path="/dashboard/publisher/analisis"
            component={PublisherAnalysis}
          />
          <Route
            exact
            path="/dashboard/publisher/profile/edit"
            component={FormEditPublisher}
          />

          {/* route for dashboard admin */}
          <Route exact path="/dashboard/admin" component={AdminHome} />
          <Route
            exact
            path="/dashboard/admin/publisher"
            component={PublisherRequest}
          />
          <Route
            exact
            path="/dashboard/admin/publisher/:id"
            component={NewPublisher}
          />
          <Route exact path="/dashboard/admin/spot" component={SpotRequest} />
          <Route
            exact
            path="/dashboard/admin/spot/:id"
            component={NewSpotDetail}
          />
          <Route exact path="/dashboard/admin/user" component={UserList} />

          {/* ROUTE FOR TRANSACTION */}
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/posttransaction" component={PostTransaction} />
          <Route exact path="/success" component={SuccessPage} />
          <Route exact path="/failed" component={FailedPage} />
          <Route exact path="/transaction/history" component={HistoryUser} />

          {/* ROUTE FOR USER */}
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/editprofile" component={FormProfile} />
          <Route exact path="/editpassword" component={FormPassword} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/allspots" component={AllProductsList} />
          <Route exact path="/allspots/search" component={SearchResult} />
          <Route
            exact
            path="/allspots/search/:keyword"
            component={SearchResult}
          />
          <Route
            exact
            path="/register/publisher"
            component={RegisterPublisher}
          />
          <Route exact path="/spot/:id" component={Spots} />
          <Route exact path="/category/:id" component={SearchResult} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default MainRoutes;
