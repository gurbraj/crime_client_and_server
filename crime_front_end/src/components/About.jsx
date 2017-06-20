import React from "react";

class About extends React.Component {
  render() {
    const { crimetype, handleCrimeOptionsType, crimetime ,handleCrimeOptionsTime } = this.props;

    return(
      <div>

        <h3>About</h3>

        <p>
         I have taken the dataset <a href="https://data.surrey.ca/dataset/rcmp-crime"> Crime and Collisions Incidents</a> from Surrey's Open Data Program and
         manipulated the data into a format such that each HUNDRED_BLOCK (crime location) becomes a record, and that each record get a timeseries of volumes of four different crime types (Break and Enter - Business, Break and Enter - Residence, Shoplifting, Theft from Motor Vehicle, Theft of Motor Vehicle) associated with it for the time period of 2011-2016.
         This process is documented in my <a href="https://github.com/gurbraj/crime/blob/master/crime.ipynb">Jupyter notebook</a>.
         I have then taken the manipulated data (is now panel data) and populated it into a database and built this webapp.
        </p>

        <br/>


        <ol>
        The goal is to:
          <li> Create a useful interface of the data for the general public. </li>
          <li> Make a data story of crime in Surrey with the given data.  </li>
          <li> Create a usful API of the data for developers. </li>
          <li> Use the data for classifications and predictions by use of machine learning. </li>
        </ol>


        <p>
        API endpoint

        http://localhost:4000/crime_yearly?year=2015
        </p>

        <p>
          Main technologies used: React, Redux, Node.js, MongoDB, Mongoose, Python.
        </p>

        <p>
          contact
        </p>


      </div>
    );
  }
}
export default About
