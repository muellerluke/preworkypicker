import React from 'react';
import "../css/SearchLine.css";
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
     <div className="row searchRow">
      <div className="col-12">
        <Select options={this.props.columnNames} placeholder="Ingredient" id={"ingredient" + this.props.key } onChange={this.handleChangeIngredient} className="ingredient_input"/>
      </div>
      <div className="col-6">
        <Select options={SIGNS} placeholder="Sign" id={"sign" + this.props.key} onChange={this.handleChangeSign}/>
      </div>
      <div className="col-6">
        <input type="number" step="any" className= "value_input" placeholder="Value (mg)" onChange={this.handleChange} />
      </div>
     </div>
   );
 }
}
