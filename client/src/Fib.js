import React, { Component } from "react";
import axios from "axios";

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ""
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    const values = await axios.get("/api/values/current");
    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get("/api/values/all");
    this.setState({ seenIndexes: seenIndexes.data });
  }

  handleSubmit = async event => {
    event.preventDefault();
    await axios.post("/api/values", { index: this.state.index });
    this.setState({ index: "" });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index :</label>
          <input
            value={this.state.index}
            onChange={event => this.setState({ index: event.target.value })}
          />
          <button>Submit</button>
        </form>

        <h4>Indices I have seen</h4>
        {this.state.seenIndexes.map(({ number }) => (
          <span>{number}, &nbsp;</span>
        ))}

        <h4>Calculated Values</h4>
        {Object.keys(this.state.values).map(key => {
          return (
            <p>
              For Index : {key} | Calculated Values :{this.state.values[key]}
            </p>
          );
        })}
      </div>
    );
  }
}

export default Fib;
