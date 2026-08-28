import React, { Component, Fragment } from 'react';
import Search from './Search';

const ignImg = '/galeriaejemplos/static/img/IGN-Header-Tittle.png';
const MinisterioImg = '/galeriaejemplos/static/img/LogoWEB-IGN-CNIG_h50.png';

import './Header.css';

class Header extends Component {

  navigate = () => {
    window.location.href = '/galeriaejemplos';
  }

  render() {

    const { showSearch = true, onSearch } = this.props;

    return (<Fragment>
      <header>
        <div id="cabecera">
          <div className="left">
            <a href="https://www.ign.es/web/inicio">
              <img id="MinisterioImg" src={MinisterioImg} height="100%" />
            </a>
            <img id="ignImg" src={ignImg} height="100%" />
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
