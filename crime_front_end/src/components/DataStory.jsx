import React from "react";
import { GridList, GridTile } from "material-ui/GridList";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
class DataStory extends React.Component {
  render() {


    return(
      <div id="data-story-div" >
        <h3> Data Story 2011-2016 (just my notes for now) </h3>

        I start off by plotting the different crime types in space (figure to left) and in a kind of space - time (figure to right).
        <br/>
        x-axis (right-hand coordinate system) measures distance from the longitude on center of above map and y-axis measures latitude. z-axis measures years where 0 represents 2011 and 6 represents 2017.
        <br/>
        It would be correct to say that the figure on the left is the projection of all the data points on the figure to the right on the space-plane (xy-plane).
        <GridList cols={2} cellHeight={"auto"}>
          <GridTile cols={2}>
          <img src={require("../images/space_BreakandEnter-Business.png")} height="250" width="350" />
          <img src={require("../images/space_time_Break and Enter - Business.png")} height="250" width="350" />
          </GridTile>
          <GridTile cols={2}>
            <img src={require("../images/space_Break and Enter - Residence.png")} height="250" width="350" />
            <img src={require("../images/space_time_Break and Enter - Residence.png")} height="250" width="350" />

          </GridTile>
          <GridTile cols={2}>
            <img src={require("../images/space_Shoplifting.png")} height="250" width="350" />
            <img src={require("../images/space_time_Shoplifting.png")} height="250" width="350" />

          </GridTile>
          <GridTile cols={2}>
            <img src={require("../images/space_Theft from Motor Vehicle.png")} height="250" width="350" />
            <img src={require("../images/space_time_Theft from Motor Vehicle.png")} height="250" width="350" />

          </GridTile>
          <GridTile cols={2}>
            <img src={require("../images/space_Theft of Motor Vehicle.png")} height="250" width="350" />
            <img src={require("../images/space_time_Theft of Motor Vehicle.png")} height="250" width="350" />

          </GridTile>
        </GridList>
        A visual inspection shows that there is no immediate pattern that reveals itself; the box-like shapes of the data clouds on the figures to the right show that all the different crime types seem to be roughly uniformly distributed in time and space.
        <br/>
        However this is just a visual inspection, a closer look might reveal something else.
        <br/>
        <Card>

          <CardText>
          <br/>
          Below you'll find a plot of all crime over 2011-2016.
          <CardMedia>
          <img src={require("../images/all_crime_all_years.png")} style={{width:"80%", height: "80%"}}/>
          </CardMedia>
          From the plot, we can see that Theft from Motor Vehicle accounts for approx. half of Total crime, for the entire time period.
          We can also see that Total Crime levels is not increasing or decreasing. TODO: Check population growth.

          </CardText>

          <CardText>

          Below you'll find a plot of the empirical probability density functions for all crime types over 2011-2016.
          <img src={require("../images/empirical_density_functions.png")} style={{width:"80%", height: "80%"}}/>
          <br/>
          We can see that they all are roughly normal distributed but with different means and standard deviations. This is not so strange; There are many datapoints in total, so this might be the central limit theorem in action. TODO: plot year wise.
          <br/>
          The types BaE-B, BaE-R and Shoplifting have a low standard deviation and a low mean. This means that each month, the number of occurences of these types are stable around the mean, it does not fluctuate much.
          <br/>
          Total Crime has a higher mean and a higher variance, and it is more uniformly distributed. The higher mean and variance is driven by TfMV (as stated earlier, tfMV accounts for approx. half of all crime).

          </CardText>

          <CardText >
          Below you'll find a plot of the volume of all crime types according to which month of the year they occured over 2011-2016.
          <img src={require("../images/monthly_crime_aggregated.png")} style={{width:"80%", height: "80%"}}/>



            {/*The above claims from the empirical density functions is supported by this graph; it shows that BaE-B, BaE-R and Shoplifting
            <br/>
            It is still possible with for example weekday variation. but this can currently not be discerned due to the granularity of the datasets.*/}

          </CardText>

        </Card>

      </div>
    );
  }
}
export default DataStory
