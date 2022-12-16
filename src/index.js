import React from "react";
import reactDom from "react-dom";
import App from './components/App';
import "./assets/css/reset.css";

const renderReactDom = () => {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root')
    );
}

//reactDom.render(<App/>, document.querySelector(".root"));

if (window.cordova) {
    document.addEventListener('deviceready', () => {
      renderReactDom();
    }, false);
  } else {
    renderReactDom();
}