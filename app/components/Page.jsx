import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

var mydata = [{
    "client": "Nam Interdum Enim Ltd",
    "job-number": 1,
    "job-name": "HB",
    "due": "2014-07-20 05:34:16",
    "status": "closed"
  }, {
    "client": "Blandit Mattis PC",
    "job-number": 2,
    "job-name": "Arkansas",
    "due": "2014-05-30 09:46:26",
    "status": "closed"
  }, {
    "client": "Egestas Nunc Sed Institute",
    "job-number": 3,
    "job-name": "South Island",
    "due": "2015-02-11 09:58:16",
    "status": "closed"
  }, {
    "client": "Erat Corporation",
    "job-number": 4,
    "job-name": "Noord Brabant",
    "due": "2014-03-27 16:36:10",
    "status": "closed"
  }, {
    "client": "Dolor Institute",
    "job-number": 5,
    "job-name": "Luxemburg",
    "due": "2014-05-31 05:00:45",
    "status": "closed"
  }, {
    "client": "Montes Nascetur Ridiculus Associates",
    "job-number": 6,
    "job-name": "PR",
    "due": "2015-01-30 13:07:40",
    "status": "closed"
  }, {
    "client": "Faucibus Corp.",
    "job-number": 7,
    "job-name": "Ontario",
    "due": "2014-07-11 00:36:20",
    "status": "closed"
  }, {
    "client": "Vulputate Associates",
    "job-number": 8,
    "job-name": "Istanbul",
    "due": "2016-01-05 21:58:28",
    "status": "closed"
  }, {
    "client": "Fringilla Incorporated",
    "job-number": 9,
    "job-name": "BU",
    "due": "2015-07-25 08:19:36",
    "status": "open"
  }, {
    "client": "Lectus Sit Associates",
    "job-number": 10,
    "job-name": "CA",
    "due": "2015-05-29 04:01:22",
    "status": "open"
  }, {
    "client": "Magna Malesuada Vel Company",
    "job-number": 11,
    "job-name": "Ontario",
    "due": "2014-10-15 00:27:04",
    "status": "open"
  }, {
    "client": "Magna Lorem Institute",
    "job-number": 12,
    "job-name": "HE",
    "due": "2014-11-11 17:11:00",
    "status": "open"
  }, {
    "client": "Arcu Vestibulum Ante Institute",
    "job-number": 13,
    "job-name": "Catalunya",
    "due": "2015-08-28 08:22:56",
    "status": "open"
  }, {
    "client": "Eros Incorporated",
    "job-number": 14,
    "job-name": "Ontario",
    "due": "2014-09-19 02:33:59",
    "status": "open"
  }, {
    "client": "Suspendisse Tristique Neque Corporation",
    "job-number": 15,
    "job-name": "Rio de Janeiro",
    "due": "2014-07-10 02:06:29",
    "status": "open"
  }, {
    "client": "Lorem Sit LLC",
    "job-number": 16,
    "job-name": "Veneto",
    "due": "2014-03-30 02:04:42",
    "status": "open"
  }, {
    "client": "Interdum Limited",
    "job-number": 17,
    "job-name": "VIC",
    "due": "2015-06-10 07:16:53",
    "status": "open"
  }, {
    "client": "In Tincidunt Congue Ltd",
    "job-number": 18,
    "job-name": "New South Wales",
    "due": "2014-06-04 04:41:24",
    "status": "open"
  }, {
    "client": "Vestibulum Ltd",
    "job-number": 19,
    "job-name": "NW",
    "due": "2016-09-13 14:22:02",
    "status": "open"
  }, {
    "client": "Aliquam Institute",
    "job-number": 20,
    "job-name": "WV",
    "due": "2014-08-14 01:32:43",
    "status": "open"
  }, {
    "client": "Purus Duis Company",
    "job-number": 21,
    "job-name": "Podkarpackie",
    "due": "2016-05-27 07:48:59",
    "status": "open"
  }, {
    "client": "At Augue Institute",
    "job-number": 22,
    "job-name": "Bursa",
    "due": "2015-04-23 21:09:14",
    "status": "open"
  }, {
    "client": "Gravida Sit Inc.",
    "job-number": 23,
    "job-name": "Vienna",
    "due": "2016-10-05 04:49:12",
    "status": "open"
  }, {
    "client": "Aptent Taciti Ltd",
    "job-number": 24,
    "job-name": "Zeeland",
    "due": "2014-09-14 16:47:31",
    "status": "open"
  }, {
    "client": "Odio Ltd",
    "job-number": 25,
    "job-name": "SL",
    "due": "2014-04-28 09:32:18",
    "status": "open"
  }, {
    "client": "Vel Turpis Aliquam LLP",
    "job-number": 26,
    "job-name": "South Island",
    "due": "2016-01-26 14:01:47",
    "status": "open"
  }, {
    "client": "Sem LLP",
    "job-number": 27,
    "job-name": "Michigan",
    "due": "2014-05-07 17:07:57",
    "status": "open"
  }, {
    "client": "Aenean Eget Magna Company",
    "job-number": 28,
    "job-name": "MI",
    "due": "2014-11-16 08:57:21",
    "status": "open"
  }, {
    "client": "Eleifend Vitae Associates",
    "job-number": 29,
    "job-name": "Maryland",
    "due": "2016-05-12 07:49:44",
    "status": "open"
  }, {
    "client": "Et Magnis Dis Corp.",
    "job-number": 30,
    "job-name": "Munster",
    "due": "2014-05-17 04:58:45",
    "status": "open"
  }];

  function display(){
    return <BootstrapTable data={mydata} striped={true} pagination={true} search={true}>
      <TableHeaderColumn dataField="job-number" isKey={true}>Job Num</TableHeaderColumn>
      <TableHeaderColumn dataField="client" >Client Name</TableHeaderColumn>
      <TableHeaderColumn dataField="job-name" >Job Name</TableHeaderColumn>
      <TableHeaderColumn dataField="due" >Due At </TableHeaderColumn>
      <TableHeaderColumn dataField="status" >Status</TableHeaderColumn>
  </BootstrapTable>;
  }

export default () => display(); 
  