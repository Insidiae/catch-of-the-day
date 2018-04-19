import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Fish from "./Fish";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import base from "../base";

class App extends React.Component {
  // Initialize state as a property
  // It's best to initialize the state values as the same datatype they're going to be set to later.
  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object
  };

  // This runs at the moment the component has finished mounting to the page.
  componentDidMount() {
    // Get the stored state from firebase (we only need the fishes object for now!)
    const params = this.props.match.params;

    // Get the current store's order state from the browser's local storage
    const localStorageRef = localStorage.getItem(params.storeId);

    // Parse the order state in a JSON format, if it exists, and restore it to the App component's state.
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    // this.ref in this case is used for Firebase. NOT TO BE CONFUSED WITH REACT's REFS
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  // This runs when the component finishes updating.
  componentDidUpdate() {
    // This stores the current store's order state to the browser's local storage.
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  // This code runs as soon as the component starts to unmount.
  componentWillUnmount() {
    // This stops syncing the state once the component unmounts.
    base.removeBinding(this.ref);
  }

  // NOTE: The functions that update a component's state needs to be defined in the same component as the state's.
  addFish = fish => {
    // To update a state, first take a copy of that state
    const fishes = { ...this.state.fishes };
    // Then, you can modify the copy of that state variable
    fishes[`fish${Date.now()}`] = fish;
    // To apply your changes to the actual state, call the setState() function.
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  updateFish = (fishId, updatedFish) => {
    // Take a copy of the fishes state, then update the one fish that was changed
    const fishes = {
      ...this.state.fishes,
      [fishId]: updatedFish
    };
    this.setState({ fishes });
  };

  deleteFish = fishId => {
    // Take a copy of the fishes state
    const fishes = { ...this.state.fishes };
    // To remove a specific fish both from the state and also from Firebase, first set the selected fish to null
    fishes[fishId] = null;
    this.setState({ fishes });
  };

  addToOrder = orderId => {
    const order = { ...this.state.order };
    order[orderId] = order[orderId] + 1 || 1;
    this.setState({ order });
  };

  removeFromOrder = orderId => {
    const order = { ...this.state.order };
    delete order[orderId];
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          {/* You can use props as sort of like HTML attributes */}
          {/* Props can be accessed by that component */}
          {/* To pass in props with datatypes other than strings, use curly brackets like so: */}
          {/* nonStringTag={value} */}
          <Header tagline="Fresh Seafood Market" />
          <ul>
            {Object.keys(this.state.fishes).map(fish => (
              <Fish
                key={fish}
                index={fish}
                fish={this.state.fishes[fish]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        {/* To be able to call the App component's functions inside the children components, you can pass them down through props. */}
        <Inventory
          storeId={this.props.match.params.storeId}
          fishes={this.state.fishes}
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
        />
      </div>
    );
  }
}

export default App;
