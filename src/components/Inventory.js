import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import base, { firebaseApp } from "../base";

class Inventory extends React.Component {
  static propTypes = {
    addFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    fishes: PropTypes.object
  };

  state = {
    uid: null,
    owner: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async authData => {
    // 1. Look up the store in the Firebase database
    const store = await base.fetch(this.props.storeId, { context: this });
    // 2. Claim it if there is no owner
    if (!store.owner) {
      // Save the store as the user's, if there's no owner yet
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }
    // 3. Set the state of Inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    console.log("Logging out...");
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    const logoutBtn = <button onClick={this.logout}>Log Out</button>;
    // Check if user is logged in
    if (!this.state.uid) return <Login authenticate={this.authenticate} />;
    // Also check if the current user is the owner of the store
    else if (this.state.uid !== this.state.owner)
      return (
        <div>
          <h2>Inventory</h2>
          <p>Sorry, only the owner can access the inventory!</p>
          {logoutBtn}
        </div>
      );
    // Only show the inventory controls to the owner
    else
      return (
        <div className="inventory">
          <h2>Inventory</h2>
          {logoutBtn}
          {Object.keys(this.props.fishes).map(fishId => (
            <EditFishForm
              updateFish={this.props.updateFish}
              deleteFish={this.props.deleteFish}
              key={fishId}
              index={fishId}
              fish={this.props.fishes[fishId]}
            />
          ))}
          <AddFishForm addFish={this.props.addFish} />
          <button onClick={this.props.loadSampleFishes}>
            Load Sample Fishes
          </button>
        </div>
      );
  }
}

export default Inventory;
