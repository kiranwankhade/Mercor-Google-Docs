import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'


import { Link, useNavigate } from 'react-router-dom'
import { Modal } from 'react-overlays'
import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'


import "../Styles/Dashboard.css"


const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);

  const [showModal, setShowModal] = useState(false);

  const [documentName,setDocumentName] = useState("");

  const [data,setData] = useState([]);


  //close Modal Function
  var handleClose = () => setShowModal(false); 
  
  //Success Modal Function
  var handleSuccess = async() => {
    console.log("success");

    console.log('documentName:', documentName)
          if (!documentName)
            return;

        let obj = {
          editorId: Date(),
          editorName: documentName,
          editorText:"",
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        }


        try{
          fetch('https://busy-peplum-fawn.cyclic.app/newDocumets', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
            mode: 'cors',
            body: JSON.stringify(obj),
          }).then((response) => {
            console.log(response);
            return response.json();
          })
  
          setDocumentName('');
          setShowModal(false);
          // nav("/textEditor")
          window.location.reload();
        }catch(err){
          console.log('err:', err)

        }
  };

  //back functionality
  const renderBackdrop = (props) => {
    return (
      <div className="backdrop" {...props} />
    )
  };

  //on blank click new modal open
  const handleBlank = ()=>{
      setShowModal(true)
  }

  
  const fetchData = async() =>{
    try{
        let res = await fetch('https://busy-peplum-fawn.cyclic.app/newDocumets');
        let data1 = await res.json();
        console.log('data1:', data1)
        setData(data1)
    }catch(err){
    console.log('err:', err)
    }
}
  useEffect(()=>{
    fetchData(); //getdata
  },[])
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


                {
                  data?.map((el)=>(
                   
                    <Link to={`/textEditor/${el.id}`} style={{
                      textDecoration:'none'
                    }}>
                        <div className='newDocblank' key={el.id}>
                          <button><img src="https://brand.18f.gov/assets/img/Save-18F-styles-as-default.png" alt="" /></button>
                          <p>{el.editorName}</p>
                          <p>Document</p>
                        </div>
                  </Link>
              
                  ))
                }

            </div>
        </div>
          {/* new document modal */}
        <Modal
        className="modal"
        show={showModal}
        onHide={handleClose}
        renderBackdrop={renderBackdrop}
      >
        <div>
          <div className="modal-header">
            <div className="modal-title">Create New Doc</div>
            <div>
              <span className="close-button" onClick={handleClose}>
                x
              </span>
            </div>
          </div>
          <div className="modal-desc">
              <input id='modalInput' type="text" placeholder='Enter Name of document' onChange={(e)=> setDocumentName(e.target.value)}/>
          </div>
          <div className="modal-footer">
            <button className="secondary-button" onClick={handleClose}>
              Close
            </button>
            <button className="primary-button" onClick={handleSuccess}>
              Create
            </button>
          </div>
        </div>
        </Modal>
    </div>
  )
}

export default Dashboard