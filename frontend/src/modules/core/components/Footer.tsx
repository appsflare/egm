import * as React from 'react';

export class Footer extends React.Component {
  render() {
    return (
      <footer className="app-footer">
        <span><a href="/">EGM</a> &copy; 2017 AppsFlare.</span>
        <span className="ml-auto">Powered by <a href="http://coreui.io">CoreUI</a></span>
      </footer>
    )
  }
}