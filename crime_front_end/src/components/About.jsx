import React from "react";

class About extends React.Component {
  render() {
    const { crimetype, handleCrimeOptionsType, crimetime ,handleCrimeOptionsTime } = this.props;

    return(
      <div>
        Information about Dataset
         I have taken the dataset https://data.surrey.ca/dataset/rcmp-crime and
         manipulated the data into a format such that each HUNDRED_BLOCK (crime location) becomes a record, and that it has a timeseries of four different crime types () associated with it for the time period of 2011-2016.
         This process is documented in my Jupyter notebook: https://github.com/gurbraj/crime/blob/master/crime.ipynb.

         The goal is to:
           1) Make a data story of crime in Surrey with the given data.
           2) Create a friendly interface of the data for the general public.
           3) Create a friendly API of the data for developers.
           4) Use the data for classifcations and predictions by use of machine learning.

         I then proceed by taking the manipulated data and populate it into a mongoDB database.



      </div>
    );
  }
}
export default About
