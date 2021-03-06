import React from 'react'
import axios from 'axios'

import SavedTableRow from './SavedTableRow'

import { getLocalStorageToken } from "../../utils/localStorage";

import './Dashboard.css';

class SavedDesigns extends React.Component {
    state = {
        savedDesigns: []
    }

    componentDidMount() {
        const token = getLocalStorageToken()
        axios.get(process.env.REACT_APP_BACKEND_URL + "/api/orders/my-saved-orders", { headers: {
            Authorisation: `Bearer ${token}`}})
        .then(response => {
            this.setState({savedDesigns: response.data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    mapTableData() {
        return this.state.savedDesigns.map(function(object, i){
           return <SavedTableRow order={object} key={i} />
        })
    }

    render() {
        return(
            <div className="saved-designs-header">
                <h4>My Saved Designs</h4>
                <div class="dashboard-grid">
                    { this.mapTableData() }
                </div>
            </div>
        )
    }
}

export default SavedDesigns