import React, { useState, useRef } from "react";
// import {Editor, EditorState} from 'draft-js';
// import 'draft-js/dist/Draft.css';
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import { Button, Grid } from "@mui/material";

function MailToIntermediary() {
  const [editorState, seteditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [editorHtml,SetEditorHtml]=useState();

  const onEditorStateChange = (editorState) => {
    seteditorState(editorState);
    const currentContent = editorState.getCurrentContent();
    const contentRaw = convertToRaw(currentContent);
    const value = currentContent.hasText() ? draftToHtml(contentRaw) : '';
    SetEditorHtml(value);
  };
  const editorRef = useRef();

  const buttonDefinition = () => {
      console.log("Editor Content in HTML \n",editorHtml);
    //   console.log("Editor contetn from ref \n",editorRef.current.editor.editor.innerText);
  };

  return (
    <>
      <Grid>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
          ref={editorRef}
        />
      </Grid>
      <button onClick={buttonDefinition}>Log the editor body</button>
    </>
  );
}

export default MailToIntermediary;
