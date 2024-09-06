// src/analytics.js
import ReactGA from "react-ga4";

export const initGA = () => {
  // Replace 'G-XXXXXXXXXX' with your Google Analytics 4 Measurement ID
  console.log('init');
  ReactGA.initialize('G-9F3XEBGWYL');
};

export const logPageView = (path) => {
    console.log('changed page' + path);
  ReactGA.send({ hitType: "pageview", page: path });
};