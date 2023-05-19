import React from 'react'
import Navbar from '../Components/Navbar'
import "../Styles/Dashboard.css"
const Dashboard = () => {
  return (
    <div id='mainPage'>
        <Navbar/>
        <div id='main'>
            <div id='pText'>
                <p>Start New Documents</p>
                <p>Template Gallery</p>
            </div>

            <div id='templates'>
                <button id='blank'><img src="	https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png" alt="" /></button>
            </div>
        </div>
    </div>
  )
}

export default Dashboard