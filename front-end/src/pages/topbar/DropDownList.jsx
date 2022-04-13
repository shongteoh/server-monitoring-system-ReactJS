import React from "react";
export const CustomDropdown = (props) => (
  <div className="form-group">
    <strong>{props.server_name}</strong>
    <select 
      className="form-control"
      name="{props.username}"
      onChange={props.onChange}
    >
      <option defaultValue>Select {props.server_name}</option>
      {props.options.map((item, index) => (
        <option key={index} value={item.id}>
          {item.server_name}
        </option>
      ))}
    </select>
  </div>
);
export default class CustomListDropDown extends React.Component {
  constructor() {
    super();
    this.state = {
      collection: [],
      value: "",
    };
  }
  componentDidMount() {
    fetch("http://localhost:5000/server")
      .then((response) => response.json())
      .then((res) => this.setState({ collection: res }));
  }
  onChange = (event) => {
    this.setState({ value: event.target.value });
    console.log(event.target.value);
    
  };
  render() {
    return (

        
        <CustomDropdown
          name={this.state.server_name}
          options={this.state.collection}
          onChange={this.onChange}
          
        />

    );
  }
}
