import React from 'react';
import Select from 'react-select';

const SIGNS = [
  {label: "Greater than", value: ">="},
  {label: "Less than", value: "<="}
]

export default class SearchLine extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeIngredient = this.handleChangeIngredient.bind(this);
    this.handleChangeSign = this.handleChangeSign.bind(this);
  }

  handleChange(e) {
    const val = e.target.value;
    this.props.handleChange("value", val, this.props.index);
  }
  handleChangeIngredient(e) {
    this.props.handleChange("ingredient", e.label, this.props.index);
  }
  handleChangeSign(e) {
    this.props.handleChange("sign", e.value, this.props.index);
  }

  render() {
   return (
     <div>
      <Select options={this.props.columnNames} id={"ingredient" + this.props.key } onChange={this.handleChangeIngredient}/>
      <Select options={SIGNS} id={"sign" + this.props.key} onChange={this.handleChangeSign}/>
      <input type="number" onChange={this.handleChange} />
     </div>
   );
 }
}
