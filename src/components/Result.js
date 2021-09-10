import React from 'react';
export default class Result extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
   return (
     <div dangerouslySetInnerHTML={{ __html: this.props.iframe }}>

     </div>
   );
 }
}
