import React from 'react';
import "../css/Home.css";
import SearchLine from "./SearchLine";
import Result from "./Result";
const axios = require('axios');

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: [1],
      columnNames: [{
        "COLUMN_NAME": "Caffeine"
      }],
      searchArr: [
        {
          ingredient: "",
          sign: "",
          value: ""
        }
      ],
      results: []
    };

    this.handlePress = this.handlePress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getColumnNames = this.getColumnNames.bind(this);
    this.getResults = this.getResults.bind(this);
  }

  componentDidMount() {
    this.getColumnNames().then((data) => {
      data.forEach((obj, index) => {
        obj['label'] = obj['COLUMN_NAME'];
      });
      this.setState({columnNames: data});
    });

    this.getResults().then((data) => {
      data.forEach((obj, i) => {
        obj.display = true;
      })
      this.setState({results: data, all: data});
    });

  }

  getColumnNames() {
    var config = {
      method: 'get',
      url: 'https://preworkypicker.com:8080/',
      headers: { }
    };

    return axios(config).then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return [];
    });
  }

  getResults() {
    var config = {
      method: 'get',
      url: 'https://preworkypicker.com:8080/search',
      headers: {
        'Content-Type': 'application/json'
      },
    };

    return axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return [];
    });
  }

  handlePress() {
    let a = this.state.params.slice(); //creates the clone of the state
    a.push(this.state.params.length + 1);
    let b = this.state.searchArr.slice();
    let defaultObj = {
      ingredient: "",
      sign: "",
      value: ""
    };
    b.push(defaultObj);
    this.setState({params: a, searchArr: b});
  }

  handleSubmit(event) {
    event.preventDefault();
    let validSearch = true;
    this.state.searchArr.forEach((obj, xxx) => {
      if (obj.ingredient === "" || obj.sign === "" || obj.value === "") {
        validSearch = false;
      }
    });
    if (validSearch) {
      let tempResults = this.state.all;
      tempResults.forEach((resultObj, resultI) => {
        resultObj.display = true;
        this.state.searchArr.forEach((searchObj, searchI) => {
          if (searchObj.sign === ">=") {
            if (resultObj[searchObj.ingredient] < searchObj.value) {
              resultObj.display = false;
            }
          } else {
            if (resultObj[searchObj.ingredient] > searchObj.value) {
              resultObj.display = false;
            }
          }
        })
      })
      this.setState({results: tempResults});
    }
  }

  handleChange(key, value, index) {
    let arr = this.state.searchArr;
    arr[index][key] = value;
    this.setState({searchArr: arr})
  }

  render() {
    let searchComp;
    if (this.state.columnNames.length > 1) {
      searchComp = this.state.params.map((e, index) => {
        return <SearchLine handleChange={this.handleChange} ingredient={this.state.searchArr[index].ingredient}
        sign={this.state.searchArr[index].sign} value={this.state.searchArr[index].value}
         columnNames={this.state.columnNames} index={index}></SearchLine>
      })
    } else {
      console.log("no data");
      searchComp = null;
    }
   return (
     <div className="home_body">
      <form onSubmit={this.handleSubmit}>
        {searchComp}
        <div className="row">
          <div className="col button_div">
            <button type="button" id="add_button" onClick={this.handlePress}>Add a Filter</button>
          </div>
        </div>
        <div className="row">
          <div className="col button_div">
            <input type="submit" id="submit_button" value="Submit" />
          </div>
        </div>
      </form>
      <div className="row resultsRow">
      {
        this.state.results.length > 0 && this.state.results.map((obj, index) => {
          if (obj.display) {
            if (index % 6 === 0 && window.innerWidth >= 992) {
              return (
                <div key={index} className="col-sm-12 col-md-6 col-lg-3 resultCol firstCol">
                  <Result obj={obj} key={index} />
                </div>
              )
            } else if (index % 5 === 0 && window.innerWidth >= 992) {
              return (
                <div key={index} className="col-sm-12 col-md-6 col-lg-3 resultCol lastCol">
                  <Result obj={obj} key={index} />
                </div>
              )
            } else {
              return (
                <div key={index} className="col-sm-12 col-md-6 col-lg-3 resultCol">
                  <Result obj={obj} key={index} />
                </div>
              )
            }
          }
        })
      }
      </div>
     </div>
   );
 }
}
