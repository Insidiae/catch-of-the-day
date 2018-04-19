import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

// Every react component comes from a class
class StorePicker extends React.Component {
  static propTypes = {
    history: PropTypes.object
  };

  // This will create an empty ref which can be set later.
  myInput = React.createRef();

  // To bind the component's this keyword to a function, define the function as a property of the component, binding the function to the instances of the component.
  goToStore = event => {
    event.preventDefault();
    const storeName = this.myInput.value.value;
    // the push() function lets us change the page's URL without actually having to reload the page.
    this.props.history.push(`/store/${storeName}`);
  };
  // Every single class needs at least one method inside of it
  // render() actually renders the content (HTML) to the page
  render() {
    // JSX lets us write HTML code inside a JS file, with a couple of gotchas here and there.
    //   classes are defined with className="insertClassHere"
    //   You also can't return sibling elements (multiple elements at once)
    return (
      // If you really wanna return sibling elements with no wrapper, you can wrap then instead in <React.Fragment> tags.
      <Fragment>
        {/* Comments in JSX look like this! */}
        <form className="store-selector" onSubmit={this.goToStore}>
          <h2>Please Enter a Store</h2>
          {/* To provide a default value to an input tag, simply set a defaultValue prop. */}
          {/* To be able to access the submitted value of these inputs, they must be referenced using the ref prop. */}
          <input
            type="text"
            required
            ref={this.myInput}
            placeholder="Store name"
            defaultValue={getFunName()}
          />
          <button type="submit">Visit Store →</button>
        </form>
      </Fragment>
    );
  }
}

// StorePicker can now be seen on other files that import from StorePicker.js
export default StorePicker;
