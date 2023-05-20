import React, { useState } from "react";

import { auth, db, logout } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import "../Styles/TextEditor.css"

import { FiStar,FiLink2 } from 'react-icons/fi'

import {FaHighlighter} from "react-icons/fa"
import { BsFolderSymlink, BsCloudCheck } from 'react-icons/bs'

import { RxCounterClockwiseClock } from 'react-icons/rx'

import {MdOutlineMessage, MdSpellcheck} from "react-icons/md";

import {SiGooglemeet} from "react-icons/si"

import {GiEarthAmerica} from 'react-icons/gi'

import {BiUndo,BiRedo,BiPrinter,BiPaintRoll, BiBold, BiItalic, BiUnderline,BiCommentAdd,BiImageAlt, BiAlignMiddle, BiAlignRight, BiAlignLeft, BiAlignJustify} from 'react-icons/bi'

import { TbTextColor } from "react-icons/tb"
import { DefaultDraftBlockRenderMap, Editor, EditorState } from "draft-js";


 
const TextEditor = () => {
  const [user, loading, error] = useAuthState(auth);
  console.log("user:", user);

  const [count,setCount] = useState(11);

  const UPPERCASE = {
    textTransform: 'uppercase',
  };
  
  const LOWERCASE = {
    textTransform: 'lowercase',
  };

  const state = { editorState: EditorState.createEmpty(),
    editTitle: false,
    inlineStyles: { UPPERCASE, LOWERCASE },
    fontSize: 12,
    currentUsers: [],
    lastSave: null,
  };

  // const myBlockTypes = DefaultDraftBlockRenderMap.merge(new Map({
  //   center: {
  //     wrapper: <div className={'center-align'} />,
  //   },
  //   right: {
  //     wrapper: <div className={'right-align'} />,
  //   },
  //   left: {
  //     wrapper: <div className={'left-align'} />,
  //   },
  //   justify: {
  //     wrapper: <div className={'justify-align'} />,
  //   },
  // }));
  return (
    <div>
      {/* Headers */}

      <div id="header">
        <div id="leftHeader">
          <img
            id="logo"
            title="google Doc"
            src="https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png"
            alt="logo"
          />
          <div id="headerTitleDiv">
            <div id="headerInputDiv">
              <input type="text" title="Rename"/>
              <FiStar title="Star"/>
              <BsFolderSymlink title="Move"/>
              <BsCloudCheck title="See Documents Status"/>
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


        <div id="rightHeader">
          <div id="timeMeet">
            <RxCounterClockwiseClock title="Last Edit"/>
            <MdOutlineMessage title="History "/>
            <SiGooglemeet title="Join a Call Here"/>
            
          </div>

          <button id="share"><span><GiEarthAmerica/></span>Share</button>
          <button id="profileButton"><img
              id="profile"
              src={user?.photoURL}
              alt="profile"
            /></button>
        </div>
      </div>
      {/* Tool Bar */}
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
        </div>
    </div>
  );
};

export default TextEditor;
