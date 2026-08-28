import React, { Component, Fragment } from 'react';
import Search from './Search';

const API = '/GaleriaEjemplos_API-IDEE/static/svg/API_IDEE.svg';

import './Header.css';

class Header extends Component {

  navigate = () => {
    window.location.href = '/GaleriaEjemplos_API-IDEE';
  }

  render() {

    const { showSearch = true, onSearch, title } = this.props;

    return (<Fragment>
      <header>
        <div id="cabecera">
          <div className="left">
            <img id="ignImg" src={API} height="100%" />
            {title && <span className="header-title">{title}</span>}
          </div>
          {showSearch && (
            <div className="right">
              <Search onSearch={onSearch} />
            </div>
          )}
        </div>
      </header>
    </Fragment>);
  }
}

export default Header;
