import React from "react";
import { GridList, GridTile } from "material-ui/GridList";
class DataStory extends React.Component {
  render() {


    return(
      <div id="data-story-div" >
        <h3> Data Story 2011-2016 (just my notes for now) </h3>

        I start of by plotting the different crimetypes in space (figure to left) and in a kind of space - time (figure to right).
        <br/>
        X-axis (Right hand coordinate system) is distance from the longitude on center of above map and y-axis is latitude. z-axis measures years where 0 represents 2011 and 6 represents 2017.
        <br/>
        It would be correct to say that the figure on the left is the projection of all the datapoints on the figure to the right on the space plane.
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
        A visual inspection shows that there is no immediate pattern that reveals itself; the cube-like shapes of the dataclouds on the figures on the right show that all the different crimetypes seem to be roughly uniformly distributed through time and space.
        <br/>
        However this is just a visual inspection, a closer look might reveal something else.
        <br/>
        <GridList cols={1} cellHeight={"auto"}>
          <GridTile cols={1}>
          <img src={require("../images/all_crime_all_years.png")} style={{width:"50%", height: "50%"}}/>

          </GridTile>

          <GridTile cols={1}>
          <img src={require("../images/empirical_density_functions.png")} style={{width:"80%", height: "80%"}}/>

          #if we plot the empirical probability density functions for all types we can see that they all are are roughly normal distributed but with different means and standard deviations.

          #The types BaE-B, BaE-R,Shoplifting have a low standard deviation, and a low mean. This means that each month, the number of occurences of these types is stable around the mean.

          #Total Crime has a higher mean and a higher variance. This is driven by TfMV (as stated earlier, tfMV accounts for approx half of all crime)

          Total Crime roughly seem to be normal distributed over the time period
          #this means that each month, on average, has about ~1400 crimes

          There are many datapoints in total, so this might be the central limit theorem in action. todo: plot year wise

          </GridTile>
          <GridTile cols={1}>
          <img src={require("../images/monthly_crime_aggregated.png")} style={{width:"80%", height: "80%"}}/>

            #above claims is supported by this graph. In addition, the graph shows crime is decreasing in the beginning of the year, and starts to increase at the end of the year.
            #To say more about the above statements, one needs more domain specific knowledge.
            #is still possible with for example weekday variability. but this can currently not be discerned due to the granularity of the datasets.

          </GridTile>

        </GridList>

      </div>
    );
  }
}
export default DataStory
