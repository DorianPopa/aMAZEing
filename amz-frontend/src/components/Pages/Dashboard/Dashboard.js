import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import typy from "typy";
import { withAlert } from "react-alert";

import { compose } from "redux";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "../../Common/Button";
import { Config } from "../../../base";
import StatCard from "../../Specific/Dashboard/StatCard";
import Icon from "../../Common/Icon";

import { ReactComponent as DashboardIllustration } from "../../../assets/images/dashboard_illustration.svg";
import MazeSelfCard from "../../Common/Maze/MazeSelfCard/MazeSelfCard";
import MazeCard from "../../Common/Maze/MazeCard/MazeCard";

import "./Dashboard.scss";

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      restrict: false,
    };
  }

  componentDidMount() {
    document.title = this.props.title;
    this.props.dispatch.doSagaFetchProfile(this.props.store.user);
    this.props.dispatch.doSagaFetchMazes(this.props.store.user);
  }

  render() {
    const mLoading = typy(this.props, "store.profile.flagMazes").safeBoolean;

    const mSelf = typy(this.props, "store.profile.mazesSelf").safeArray;
    const mPlayground = typy(this.props, "store.profile.mazesPlayground").safeArray;

    return (
      <div className="Dashboard" data-restrict={this.state.restrict}>
        <div className="PageLoader" data-visible={this.props.store.profile.flagProfile}>
          <CircularProgress size={30} />
        </div>
        <header>
          <div className="content stats">
            <div className="title">
              <h1>
                Welcome <span>@{typy(this.props, "store.user.username").safeString}</span>
              </h1>
            </div>
            <div className="cards">
              <StatCard
                title="Your Score"
                value={`${this.props.store.profile.score} pts`}
                onClick={() => {
                  console.log("Go to Leaderboards");
                }}
              >
                <div className="statCardButton">
                  <p className="title">See Leaderboards</p>
                  <Icon icon source="arrow_forward" family="round" />
                </div>
              </StatCard>

              <StatCard
                title="Your mazes"
                value={`${this.props.store.profile.mazeCount} maze${
                  this.props.store.profile.mazeCount === 1 ? "" : "s"
                }`}
              >
                <div className="statCardPlayers">
                  <p className="title">played by {this.props.store.profile.mazePlayers} users</p>
                </div>
              </StatCard>
            </div>
            <DashboardIllustration className="illustration" />
          </div>

          <div className="underlay">
            <div />
          </div>
        </header>
        <section className="content self">
          <div className="top">
            <div className="title">
              <h2>Your mazes</h2>
            </div>
            <div className="actions">
              <Button
                type="edged"
                theme="gray"
                icon={{
                  icon: true,
                  source: "show_chart",
                  family: "round",
                }}
                style={{}}
                title="See stats"
              />
              <Button
                type="edged"
                icon={{
                  icon: true,
                  source: "loupe",
                  family: "round",
                }}
                title="Create maze"
                to={Config.ROUTE_PAGE_MAZE_MANAGER_CREATE}
              />
            </div>
          </div>
          <div className="grid">
            {mLoading ? (
              <div className="loading">
                <CircularProgress size={20} />
              </div>
            ) : mSelf.length > 0 ? (
              mSelf.map((e, i) => <MazeSelfCard key={e.id} id={e.id} index={i} players={e.players} title={e.title} />)
            ) : (
              <div className="empty">
                <p>You have no mazes yet. Create your first one!</p>
              </div>
            )}
          </div>
        </section>

        <section className="content playground">
          <div className="top">
            <div className="title">
              <h2>Playground</h2>
            </div>
          </div>
          <div className="grid">
            {mLoading ? (
              <div className="loading">
                <CircularProgress size={20} />
              </div>
            ) : mPlayground.length > 0 ? (
              mPlayground.map((e, i) => (
                <MazeCard key={e.id} id={e.id} index={i} username={e.username} title={e.title} />
              ))
            ) : (
              <div className="empty">
                <p>There are no mazes on the platform.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }
}

Dashboard.propTypes = {
  title: PropTypes.string.isRequired,
  store: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string,
    }),
    profile: PropTypes.shape({
      score: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      mazeCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      mazePlayers: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

      flagMazes: PropTypes.bool,
      flagProfile: PropTypes.bool,
      mazesSelf: PropTypes.arrayOf(PropTypes.shape({})),
      mazesPlayground: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }).isRequired,

  dispatch: PropTypes.shape({
    doSagaFetchProfile: PropTypes.func,
    doSagaFetchMazes: PropTypes.func,
  }).isRequired,
};

export default compose(
  withAlert(),
  connect(
    (store) => {
      return {
        store: {
          user: store.auth.user,
          profile: store.data.profile,
        },
      };
    },
    (dispatch) => {
      return {
        dispatch: {
          doSagaFetchProfile: (user, onSuccess = () => {}, onError = () => {}) => {
            return dispatch({
              type: Config.SAGA_ACTION.USER_FETCH_PROFILE,
              payload: {
                user,
                onSuccess,
                onError,
                reset: true,
              },
            });
          },
          doSagaFetchMazes: (user, onSuccess = () => {}, onError = () => {}) => {
            return dispatch({
              type: Config.SAGA_ACTION.USER_FETCH_MAZES,
              payload: {
                user,
                onSuccess,
                onError,
                reset: true,
              },
            });
          },
        },
      };
    },
  ),
)(Dashboard);
