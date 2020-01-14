import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withAlert } from "react-alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { compose } from "redux";
import { connect } from "react-redux";
import Icon from "../../Common/Icon";
import "./Leaderboards.scss";
import { Config, Network } from "../../../base";

class Leaderboards extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isListLoading: false,
      list: [],
    };
  }

  componentDidMount() {
    document.title = this.props.title;
    this.fetchList();
  }

  fetchList = async () => {
    this.setState({ isListLoading: true });
    const response = await Network.fetchLeaderboards(this.props.store.user);

    const { status } = response;
    const result = await response.json();

    console.log(status, result);

    if (!this.isMounted) return;

    switch (status) {
      case Config.HTTP_STATUS.OK: {
        break;
      }
      case Config.HTTP_STATUS.NOT_FOUND:
      case Config.HTTP_STATUS.BAD_REQUEST: {
        this.props.alert.show("We're having some issues. Please refresh the page.", {
          type: "warn",
          timeout: 3000,
          isClosable: false,
        });
        break;
      }
      case Config.HTTP_STATUS.UNAUHTORIZED: {
        Network.EMERGENCY();
        break;
      }
      default:
        break;
    }
  };

  render() {
    let i = 0;
    return (
      <div className="Leaderboards">
        <div className="PageLoader" data-visible={this.state.isListLoading}>
          <CircularProgress size={30} />
        </div>
        <section className="content">
          <div className="top">
            <div className="title">
              <h2>Top players</h2>
            </div>
          </div>
          <div className="list">
            <div className="labels">
              <div className="placeLabel label">
                <p>Place</p>
              </div>
              <div className="iconLabel label">
                <p>Icon</p>
              </div>
              <div className="nameLabel label">
                <p>Name</p>
              </div>
              <div className="playedLabel label">
                <p>Played</p>
              </div>
              <div className="scoreLabel label">
                <p>Accuracy</p>
              </div>
            </div>
            {this.state.list.map((player, index) => (
              <div key={player.id} className="playerScore">
                <div className="place cell">
                  <p>{index + 1}</p>
                </div>
                <div className="box cell">
                  <Icon icon source="check" />
                </div>
                <div className="name cell">
                  <p>{player.name}</p>
                </div>
                <div className="played cell">
                  <p>2</p>
                </div>
                <div className="score cell">
                  <p>{player.score}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }
}

Leaderboards.propTypes = {
  title: PropTypes.string.isRequired,
  alert: PropTypes.shape({
    show: PropTypes.func,
    removeAll: PropTypes.func,
  }).isRequired,
  store: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  dispatch: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func,
    push: PropTypes.func,
  }).isRequired,
};

Leaderboards.defaultProps = {};

export default compose(
  withAlert(),
  connect(
    (store) => {
      return {
        store: {
          user: store.auth.user,
        },
      };
    },
    () => {
      return {
        dispatch: {},
      };
    },
  ),
)(Leaderboards);
