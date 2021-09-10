import React from 'react';
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
      data.forEach((obj, i) => {
        obj['label'] = obj['COLUMN_NAME']; // Assign new key
      });
      this.setState({columnNames: data});
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

  getResults(arr) {
    var config = {
      method: 'post',
      url: 'https://preworkypicker.com:8080/search',
      headers: {
        'Content-Type': 'application/json'
      },
      data : arr
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
    this.getResults(this.state.searchArr).then((results) => {
      this.setState({results: results});
    });
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
     <div>
      <form onSubmit={this.handleSubmit}>
        {searchComp}
        <button type="button" onClick={this.handlePress}>+</button>
        <input type="submit" value="Submit" />
      </form>
      {
        this.state.results.length > 0 && this.state.results.map((obj, index) => {
          return <Result iframe={obj.Link} key={index} />
        })
      }
     </div>
   );
 }
}
