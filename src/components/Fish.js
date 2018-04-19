import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";

class Fish extends React.Component {
  // To help others working with your code to pass in the right type of data in the props, we can use PropTypes to display helpful messages in case the wrong type of data is displayed.
  // We define proptypes as static because it's going to be the same across ALL instances of this component.
  static proptypes = {
    fish: PropTypes.shape({
      image: PropTypes.string,
      desc: PropTypes.string,
      name: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    }),
    index: PropTypes.string,
    addToOrder: PropTypes.func.isRequired
  };

  render() {
    const { image, desc, name, price, status } = this.props.fish;

    const isAvailable = status === "available";

    return (
      <li className="menu-fish">
        <img src={image} alt={desc} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button
          disabled={!isAvailable}
          onClick={() => this.props.addToOrder(this.props.index)}
        >
          {isAvailable ? "Add to Order" : "Sold Out!"}
        </button>
      </li>
    );
  }
}

export default Fish;
