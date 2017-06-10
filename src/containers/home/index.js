import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import CrimeContainer from "../CrimeContainer"

const Home = props => (
  <div>
    <h1>Home</h1>
    <p>Welcome home!</p>
    <button onClick={() => props.changePage()}>Go to about page via redux</button>


    <CrimeContainer/>
  </div>
)

const changePageAction = {
  changePage: () => push('/about')
}


const mapDispatchToProps = dispatch => bindActionCreators({...changePageAction}, dispatch)

const mapStateToProps = state => {
  return ({
    data: state.data.data
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
