import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { showSignupModal, showLoginModal } from '../Auth/AuthActions';

// Import Style
import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import SignupModal from '../Auth/components/SignupModal';
import LoginModal from '../Auth/components/LoginModal';

// Import Actions
import { toggleAddPost } from './AppActions';
import { switchLanguage } from '../../modules/Intl/IntlActions';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }

  toggleAddPostSection = () => {
    this.props.dispatch(toggleAddPost());
  };

  showLoginModal = () => {
    this.props.dispatch(showLoginModal());
  }

  showSignupModal = () => {
    this.props.dispatch(showSignupModal());
  }

  render() {
    return (
      <div>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        <div>
          <Helmet
            title="MERN Starter - Blog App"
            titleTemplate="%s - Blog App"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          />
          <Header
            switchLanguage={lang => this.props.dispatch(switchLanguage(lang))}
            intl={this.props.intl}
            toggleAddPost={this.toggleAddPostSection}
            isAuthenticated = {this.props.isAuthenticated}
            showLoginModal = {this.showLoginModal}
            showSignupModal = {this.showSignupModal}
          />
          <SignupModal />
          <LoginModal />
          <div className={styles.container}>
            {this.props.children}
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

// Retrieve data from store as props
function mapStoreToProps(store) {
  return {
    intl: store.intl,
    isAuthenticated: store.auth.isAuthenticated
  };
}

export default connect(mapStoreToProps)(App);
