import React from 'react';
import '../css/Result.css'
export default class Result extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    const keys = Object.keys(this.props.obj);
    return (
      <div className="result_container">
        <div className="result_iframe" dangerouslySetInnerHTML={{ __html: this.props.obj.Link }}></div>
        <div className="result_information">
          {keys.map((key, index) => {
            if(this.props.obj[key] !== 0 && key !== "Link" && key !== "Name" && key !== "Servings" && key !== "display"
            && key !== "ProLink" && key !== "Price" && key !== "Price Per Serving") {
              const str = key + ": " + this.props.obj[key] + "mg";
              return <h6 className="ingredient_text">{str}</h6>
            } else if (key === "Name") {
              return <h5 className="name_text">{this.props.obj[key]}</h5>
            } else if (key === "Servings") {
              return <h6 className="ingredient_text">{key + ": " + this.props.obj[key]}</h6>
            } else if (key === "Price") {
              return <h6 className="price_text">{key + ": " + "$" + this.props.obj[key]}</h6>
            } else if (key === "Price Per Serving") {
              let amount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.props.obj[key]);
              return <h6 className="price_text">{"Price / Serving: " + amount}</h6>
            }
          })}
        </div>
      </div>
   );
 }
}
