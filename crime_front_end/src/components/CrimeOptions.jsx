import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import React from "react";

class CrimeOptions extends React.Component {
  render() {
    const { crimetype, handleCrimeOptionsType, crimetime ,handleCrimeOptionsTime } = this.props;

    return(
      <div>
        <DropDownMenu labelStyle={{color:"white"}} value={crimetype} onChange={handleCrimeOptionsType} >
          <MenuItem value={"Total Crime"} primaryText="Total Crime" />
          <MenuItem value={"Break and Enter - Business"} primaryText="Break and Enter - Business" />
          <MenuItem value={"Break and Enter - Residence"} primaryText="Break and Enter - Residence" />
          <MenuItem value={"Shoplifting"} primaryText="Shoplifting" />
          <MenuItem value={"Theft from Motor Vehicle"} primaryText="Theft from Motor Vehicle" />
          <MenuItem value={"Theft of Motor Vehicle"} primaryText="Theft of Motor Vehicle" />
        </DropDownMenu>
        <br/>

        <DropDownMenu labelStyle={{color:"white"}} value={crimetime} onChange={handleCrimeOptionsTime} >
          <MenuItem value={"All Years"} primaryText="All Years" />
          <MenuItem value={"2011"} primaryText="2011" />
          <MenuItem value={"2012"} primaryText="2012" />
          <MenuItem value={"2013"} primaryText="2013" />
          <MenuItem value={"2014"} primaryText="2014" />
          <MenuItem value={"2015"} primaryText="2015" />
          <MenuItem value={"2016"} primaryText="2016" />

        </DropDownMenu>


      </div>
    );
  }
}
export default CrimeOptions
