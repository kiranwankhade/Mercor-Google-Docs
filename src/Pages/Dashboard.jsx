import React from 'react'
import Navbar from '../Components/Navbar'

import "../Styles/Dashboard.css"
import { Link, useNavigate } from 'react-router-dom'
const Dashboard = () => {

  let nav  = useNavigate()

  const handleBlank = ()=>{
      nav("/textEditor")
  }
  return (
    <div id='mainPage'>
        <Navbar/>
        <div id='main'>
            <div id='pText'>
                <p>Start New Documents</p>
                <p>Template Gallery</p>
            </div>

            <div id='templates'>
                <div className='blank'>
                  <button onClick={handleBlank}><img src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png" alt="" /></button>
                  <p>Blank</p>
                  <p></p>
                </div>

                <div className='blank'>
                  <button><img src="https://images.sampletemplates.com/wp-content/uploads/2016/11/Blank-Resume-Template1.jpg" alt="" /></button>
                  <p>Letter</p>
                  <p>Spearmint</p>
                </div>

                <div className='blank'>
                  <button><img src="https://images.sampletemplates.com/wp-content/uploads/2016/11/Blank-Resume-Template1.jpg" alt="" /></button>
                  <p>Resume</p>
                  <p>Serif</p>
                </div>

                <div className='blank'>
                <button><img src="https://images.sampletemplates.com/wp-content/uploads/2016/11/Blank-Resume-Template1.jpg" alt="" /></button>
                <p>Resume</p>
                <p>Coral</p>
                </div>

                <div className='blank'>
                <button><img src="https://ssl.gstatic.com/docs/templates/thumbnails/1XykI9TfWo4IoUqGLjQ-D8NIU4jZ1Ml9OI8-Euj5FrA0_400_3.png" alt="" /></button>
                <p>Project Proposal</p>
                <p>Tropic</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard