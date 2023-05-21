import React, { useCallback, useEffect, useState } from "react";

import { auth, db, logout } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";


// Icons-React
import { FiStar, FiLink2, FiSettings } from "react-icons/fi";

// import {FaHighlighter} from "react-icons/fa"
import { BsFolderSymlink, BsCloudCheck, BsLink } from "react-icons/bs";

import { RxCounterClockwiseClock } from "react-icons/rx";

import { MdOutlineMessage, MdSpellcheck } from "react-icons/md";

import { SiGooglemeet } from "react-icons/si";

import { AiOutlineLock } from "react-icons/ai";

import { GiEarthAmerica } from "react-icons/gi";
import { BiHelpCircle, BiPrinter } from "react-icons/bi";
import { BsPrinter } from "react-icons/bs";


import { Modal } from "react-overlays";

// import {BiUndo,BiRedo,BiPrinter,BiPaintRoll, BiBold, BiItalic, BiUnderline,BiCommentAdd,BiImageAlt, BiAlignMiddle, BiAlignRight, BiAlignLeft, BiAlignJustify} from 'react-icons/bi'

// import { TbTextColor } from "react-icons/tb"
// import { DefaultDraftBlockRenderMap, Editor, EditorState } from "draft-js";

import { useParams } from "react-router-dom";


// Quill Import
import Quill from "quill";
import "quill/dist/quill.snow.css"; //quill css

import "../Styles/TextEditor.css";


//ToolBar Options
const TOOLBAR_OPTIONS = [
  ["undo", "redo"],
  ["print"],
  ["spellChecker"],
  ["paint"],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];


//All Icons Of Quill
var icons = Quill.import("ui/icons");

icons["undo"] = `<svg viewbox="0 0 18 18">
    <polygon class="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10"></polygon>
    <path class="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"></path>
  </svg>`;

icons["redo"] = `<svg viewbox="0 0 18 18">
    <polygon class="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10"></polygon>
    <path class="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"></path>
  </svg>`;

icons[
  "print"
] = `<span class="svg-icon"><!--begin::Svg Icon | path:/var/www/preview.keenthemes.com/metronic/releases/2021-05-14-112058/theme/html/demo8/dist/../src/media/svg/icons/Devices/Printer.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <rect x="0" y="0" width="24" height="24"/>
      <path d="M16,17 L16,21 C16,21.5522847 15.5522847,22 15,22 L9,22 C8.44771525,22 8,21.5522847 8,21 L8,17 L5,17 C3.8954305,17 3,16.1045695 3,15 L3,8 C3,6.8954305 3.8954305,6 5,6 L19,6 C20.1045695,6 21,6.8954305 21,8 L21,15 C21,16.1045695 20.1045695,17 19,17 L16,17 Z M17.5,11 C18.3284271,11 19,10.3284271 19,9.5 C19,8.67157288 18.3284271,8 17.5,8 C16.6715729,8 16,8.67157288 16,9.5 C16,10.3284271 16.6715729,11 17.5,11 Z M10,14 L10,20 L14,20 L14,14 L10,14 Z" fill="#444444"/>
      <rect fill="#444444" opacity="0.3" x="8" y="2" width="8" height="2" rx="1"/>
  </g>
</svg><!--end::Svg Icon--></span>`;

icons[
  "spellChecker"
] = `<img  src='https://cdn.iconscout.com/icon/free/png-16/free-spellcheck-1779475-1513170.png'/>`;

icons[
  "paint"
] = `<span class="svg-icon"><!--begin::Svg Icon | path:/var/www/preview.keenthemes.com/metronic/releases/2021-05-14-112058/theme/html/demo8/dist/../src/media/svg/icons/Tools/Roller.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <rect x="0" y="0" width="24" height="24"/>
      <rect fill="#444444" x="3" y="2" width="15" height="5" rx="1"/>
      <rect fill="#444444" x="9" y="12" width="4" height="10" rx="1"/>
      <path d="M12,12 L10,12 L10,11 C10,9.8954305 10.8954305,9 12,9 L19,9 L19,5.5 L18,5.5 L18,3.5 L19,3.5 C20.1045695,3.5 21,4.3954305 21,5.5 L21,9 C21,10.1045695 20.1045695,11 19,11 L12,11 L12,12 Z" fill="#444444" fill-rule="nonzero" opacity="0.3"/>
  </g>
</svg><!--end::Svg Icon--></span>`;

// Editor Function Component (to get access of text i took this in one file)
const Editor = ({ setSavedText }) => {
  // if we useRef  then its give error while in useEffect for rendering tells objects are not exist
  // so thats the reason I am using useCallback here to get proper value and render as such

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) {
      return;
    }
    const editor = document.createElement("div");

    wrapper.append(editor);

    console.log("editor:", editor);

    //some theme set every new doc created
    var quill = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: TOOLBAR_OPTIONS,
      },
    });

    console.log("wrapper:", wrapper);
    quill.on("text-change", function () {
      var delta = quill.getContents();
      var text = quill.getText();
      var justHtml = quill.root.innerText;
      setSavedText(justHtml); //get data from editor with its tag
    });
  }, []);
  // Editor body with toolbar
  return <div className="textContainer" ref={wrapperRef}></div>;
};

const TextEditor = () => {
  const [user] = useAuthState(auth);

  console.log("user:", user);

  const [showModal, setShowModal] = useState(false);

  const [savedText, setSavedText] = useState("");
  console.log("text:", savedText);

  const { id } = useParams();

  console.log("id:", id);

  var handleClose = () => setShowModal(false);

  var handleSuccess = async () => {
    try {
      alert("Link Copied");
      setShowModal(false);
    } catch (err) {
      console.log("err:", err);
    }
  };

  const renderBackdrop = (props) => {
    return <div className="backdrop" {...props} />;
  };

  const [data, setData] = useState([]);

  const [access, setAccess] = useState("restrict");

  const fetchData = async () => {
    try {
      let res = await fetch(
        `https://busy-peplum-fawn.cyclic.app/newDocumets/${id}`
      );
      let data1 = await res.json();
      console.log("data1:", data1);
      setData(data1);
    } catch (err) {
      console.log("err:", err);
    }
  };

  const shareFunction = async () => {
    let documentDetail = {
      editorId: data.editorId,
      editorName: data.editorName,
      editorText: savedText,
      uid: data.uid,
      name: data.name,
      authProvider: "google",
      email: data.email,
      id: data.id,
    };

    console.log("documentDetail", documentDetail);

    try {
      await fetch(
        `https://busy-peplum-fawn.cyclic.app/newDocumets/${data.id}`,
        {
          method: "PATCH",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          mode: "cors",
          body: documentDetail,
        }
      );

      setShowModal(true);
      console.log("Document shared successfully");
    } catch (err) {
      console.log("err:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [savedText]);

  return (
    <div>
      {/* Headers */}

      <div id="header">
        {/* header left part */}
        <div id="leftHeader">
          <img
            id="logo"
            title="google Doc"
            src="https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png"
            alt="logo"
          />
          <div id="headerTitleDiv">
            <div id="headerInputDiv">
              {/* <input type="text" title="Rename" value={data.editorName}/> */}
              <h3>{data.editorName}</h3>
              <FiStar title="Star" />
              <BsFolderSymlink title="Move" />
              <BsCloudCheck title="See Documents Status" />
            </div>
            <div id="headerMenuDiv">
              <p>File</p>
              <p>Edit</p>
              <p>View</p>
              <p>Format</p>
              <p>Tools</p>
              <p>Extensions</p>
              <p>Help</p>
            </div>
          </div>
        </div>

        {/* header Right part */}
        <div id="rightHeader">
          <div id="timeMeet">
            <RxCounterClockwiseClock title="Last Edit" />
            <MdOutlineMessage title="History " />
            <SiGooglemeet title="Join a Call Here" />
          </div>

          <button id="share" onClick={shareFunction}>
            <span>
              <GiEarthAmerica />
            </span>
            Share
          </button>
          <button id="profileButton">
            <img id="profile" src={user?.photoURL} alt="profile" />
          </button>
        </div>
      </div>

      {/* Toolbar all UI Designs */}
      {/* Tool Bar
      <div id="toolbar">
          <button title="Undo"><BiUndo/></button>
          <button title="Redo"><BiRedo/></button>
          <button title="Print"><BiPrinter/></button>
          <button title="Grammar Check"><MdSpellcheck/></button>
          <button title="Paint"><BiPaintRoll/></button>

          <select name="percentage" id="percentage" placeholder="100%">
            <option value="">100 %</option>
            <option value="Fits">Fits</option>
            <hr />
            <option value="50 %">50 %</option>
            <option value="75 %">75 %</option>
            <option value="90 %">90 %</option>
            <option value="">100 %</option>
            <option value="125 %">125 %</option>
            <option value="150 %">150 %</option>
            <option value="200 %">200 %</option>
          </select>

          <span>|</span>

          <select name="text" id="text">
            <option value="">Normal Text</option>
            <option value="Title">Title</option>
            <option value="Sub Title">Sub Title</option>
            <option value="Heading 1">Heading 1</option>
            <option value="Heading 2">Heading 2</option>
            <option value="Heading 3">Heading 3</option>
            <option value="Option">Option</option>
          </select>

          <select name="fontStyle" id="fontStyle">
            <option value="">Arial</option>
            <option value="Impact">Impact</option>
            <option value="Lobster">Lobster</option>
            <option value="Times New Roman">Times New Roman </option>
            <option value="Roboto">Roboto</option>
            <option value="Verdana">Verdana</option>
          </select>

          <span>|</span>
          
          <div id="fontSize">
            <button >-</button>
            {count}
            <button>+</button>
          </div>

          <span>|</span>

          <button><BiBold/></button>
          <button><BiItalic/></button>
          <button><BiUnderline/></button>
          <button><TbTextColor/></button>
          <button><FaHighlighter/></button>

          <span>|</span>

          <button><FiLink2/></button>
          <button><BiCommentAdd/></button>
          <button><BiImageAlt/></button>

          <span>|</span>
          <button><BiAlignJustify/></button>
          <button><BiAlignLeft/></button>
          <button><BiAlignMiddle/></button>
          <button><BiAlignRight/></button>
      <div>

      </div>
      </div>

      <div className={'editorHolder'}>
          <div className={'editor'}>
            <Editor
              editorState={state.editorState}
              customStyleMap={state.inlineStyles}
              // onChange=}
              // blockRenderMap={myBlockTypes}
              // onTab={this.onTab}
              spellCheck={true}
            />
          </div>
        </div> */}

      {/* Text Editor */}
      <Editor setSavedText={setSavedText} />

      {/* share Modal */}
      <Modal
        className="shareModal"
        show={showModal}
        onHide={handleClose}
        renderBackdrop={renderBackdrop}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              margin: "5px",
              background: "none",
            }}
          >
            <span className="shareModelClose-button" onClick={handleClose}>
              x
            </span>
          </div>

          <div className="shareModal-title">
            <h3>Share "{data.editorName}"</h3>
            <div className="iconDiv">
              <BiHelpCircle />
              <FiSettings fontSize={"18px"} />
            </div>
          </div>

          <div className="shareModal-desc">
            <input
              id="shareModalInput"
              type="text"
              placeholder="Add People and Group"
            />
          </div>
          <div className="shareModal-access">
            <p>People with access</p>
            <div className="shareModalDetailOwner">
              <div>
                <img src={user?.photoURL} alt="" />
                <div>
                  <p>{data.name}(You)</p>
                  <p>{user?.email}</p>
                </div>
              </div>
              <p>Owner</p>
            </div>
          </div>
          <div className="shareModalGeneralAccess">
            <p>General Access</p>
            {access === "restrict" ? (
              <div className="restrictAccess">
                <div className="anyoneAccess">
                  <div
                    style={{ backgroundColor: "grey", borderRadius: "20px" }}
                  >
                    <AiOutlineLock
                      style={{
                        color: "black",
                        border: "none",
                        fontSize: "25px",
                        padding: "8px",
                      }}
                    />
                  </div>
                  <div className="accessLink">
                    <select
                      name="access"
                      value={access}
                      onChange={(e) => setAccess(e.target.value)}
                    >
                      <option value="anyone">Anyone With the Link</option>
                      <option value="restrict">Restricted</option>
                    </select>
                    <p>Only people with access can open with the link</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="accessSelect">
                <div className="anyoneAccess">
                  <div
                    style={{ backgroundColor: "#c4eed0", borderRadius: "20px" }}
                  >
                    <GiEarthAmerica
                      style={{
                        color: "green",
                        border: "none",
                        borderRadius: "15px",
                        fontSize: "25px",
                        padding: "8px",
                      }}
                    />
                  </div>
                  <div className="accessLink">
                    <select
                      name="access"
                      value={access}
                      onChange={(e) => setAccess(e.target.value)}
                    >
                      <option value="restrict">Restricted</option>
                      <option value="anyone">Anyone With the Link</option>
                    </select>
                    <p>Anyone on the internetwith link can View</p>
                  </div>
                </div>
                <select name="viewer" id="selectViewer">
                  <p>ROLE</p>
                  <option value="Viewer">Viewer</option>
                  <option value="Commenter">Commenter</option>
                  <option value="Editor">Editor</option>
                </select>
              </div>
            )}
          </div>
          <div className="shareModal-footer">
            <button className="primary-button" onClick={handleSuccess}>
              <span id="linkIcon">
                <BsLink />
              </span>{" "}
              Copy Link
            </button>
            <button className="secondary-button" onClick={handleClose}>
              Done
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TextEditor;
