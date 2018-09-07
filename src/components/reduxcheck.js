import React, { Component } from 'react';
import { connect } from 'react-redux';
import {addStop} from '../ducks/reducer';

class ReduxCheck extends Component {
    render(){
        return (
            <div>
                {this.props.hit}
                <button onClick={this.props.addStop}>dont hit the button</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        hit: state.timesButtonHasBeenHit
    }
}

const mapDispatchToProps = {
    addStop: addStop
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxCheck);