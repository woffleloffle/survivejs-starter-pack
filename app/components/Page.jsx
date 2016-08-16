import React from 'react';

var mydata = [{
    "client": "Nam Interdum Enim Ltd",
    "job-number": 1,
    "job-name": "HB",
    "due": "2014-07-20 05:34:16",
    "status": "closed"
  }];

  function display(){
    return <div> {mydata[0].client}
  </div>;
  }

export default () => display(); 
  