import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import React from "react";

class CrimeOptions extends React.Component {
  render() {
    const { crimetype, handleCrimeOptionsType } = this.props;

    return(
      <div>
        <DropDownMenu value={crimetype} onChange={handleCrimeOptionsType} >
          <MenuItem value={"Total Crime"} primaryText="Total Crime" />
          <MenuItem value={"Break and Enter - Business"} primaryText="Break and Enter - Business" />
          <MenuItem value={"Break and Enter - Residence"} primaryText="Break and Enter - Residence" />
          <MenuItem value={"Shoplifting"} primaryText="Shoplifting" />
          <MenuItem value={"Theft from Motor Vehicle"} primaryText="Theft from Motor Vehicle" />
          <MenuItem value={"Theft of Motor Vehicle"} primaryText="Theft of Motor Vehicle" />
        </DropDownMenu>

      </div>
    );
  }
}
export default CrimeOptions
