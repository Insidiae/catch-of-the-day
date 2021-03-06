import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func
  };

  renderOrder = orderId => {
    const fish = this.props.fishes[orderId];
    const count = this.props.order[orderId];
    const isAvailable = fish && fish.status === "available";
    const transitionOptions = {
      classNames: "order",
      key: orderId,
      timeout: { enter: 500, exit: 500 }
    };

    if (!fish) return null;

    if (isAvailable) {
      return (
        // Each list item in a list generated by iterating over some array/object/etc must have a unique identifier(key) so that React can find each list item faster.
        // To apply CSS transitions when these orders get added/updated/deleted, we use the TransitionGroup and CSSTransition components from react-transition-group.
        // CSS classes get added to these elements. They are animated as className-enter/exit -> className-enter/exit-active -> (no className)
        <CSSTransition {...transitionOptions}>
          <li key={orderId}>
            <span>
              <TransitionGroup component="span" className="count">
                <CSSTransition
                  classNames="count"
                  key={count}
                  timeout={{ enter: 500, exit: 500 }}
                >
                  <span>{count}</span>
                </CSSTransition>
              </TransitionGroup>
              lb{count === 1 ? "" : "s"} {fish.name}
              <button onClick={() => this.props.removeFromOrder(orderId)}>
                &times;
              </button>
            </span>
            <span className="price">{formatPrice(count * fish.price)}</span>
          </li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition {...transitionOptions}>
        <li key={orderId}>
          Sorry, {fish ? fish.name : "that fish"} is not available!
          <button onClick={() => this.props.removeFromOrder(orderId)}>
            &times;
          </button>
        </li>
      </CSSTransition>
    );
  };

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((acc, nxt) => {
      const fish = this.props.fishes[nxt];
      const count = this.props.order[nxt];
      const isAvailable = fish && fish.status === "available";

      acc = isAvailable ? acc + count * fish.price : acc;
      return acc;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
          {/* I just wrapped li.total in CSSTransition tags so that it doesn't throw any errors inside the TransitionGroup. */}
          <CSSTransition
            classNames="order"
            key="total"
            timeout={{ enter: 500, exit: 500 }}
          >
            <li className="total">
              Total:
              <strong>{formatPrice(total)}</strong>
            </li>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}

export default Order;
