import React from "react";
import PropTypes from "prop-types";

// If your component consists of just a render() function (and some proptypes(?)),
// You can convert that component into a Stateless Functional Component that looks like this:

// Here, the props argument is destructured, so you just need to type "tagline" (or whatever other props are passed in) whenever you want to use them.
const Header = ({ tagline }) => (
  <header className="top">
    <h1>
      Catch
      <span className="ofThe">
        <span className="of">of</span>
        <span className="the">the</span>
      </span>
      Day
    </h1>
    <h3 className="tagline">
      {/* The props defined elsewhere can be accessed via this.props.propName */}
      {/* For stateless functional components, props are going to be passed in as a function argument, so no need for the this keyword */}
      {/* You can also destructure the props object passed in, so you simply just need to call the propName. */}
      <span>{tagline}</span>
    </h3>
  </header>
);

// proptypes for Stateless Functional Components are defined like this
Header.propTypes = {
  tagline: PropTypes.string.isRequired
};

export default Header;
