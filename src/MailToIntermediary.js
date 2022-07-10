import React, { useState, useRef } from "react";
// import {Editor, EditorState} from 'draft-js';
// import 'draft-js/dist/Draft.css';
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { Button, Grid, TextField, Typography, Paper } from "@mui/material";

function MailToIntermediary() {
  const [editorState, seteditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [editorHtml, SetEditorHtml] = useState();

  const onEditorStateChange = (editorState) => {
    seteditorState(editorState);
    const currentContent = editorState.getCurrentContent();
    const contentRaw = convertToRaw(currentContent);
    const value = currentContent.hasText() ? draftToHtml(contentRaw) : "";
    SetEditorHtml(value);
  };
  const editorRef = useRef();
  const [outputText, setOutputText] = useState();

  const buttonDefinition = () => {
    console.log("Editor Content in HTML \n", editorHtml);
    setOutputText(editorHtml);
    //   console.log("Editor contetn from ref \n",editorRef.current.editor.editor.innerText);
  };

  return (
    <><Paper>
      <Grid container >
        
          <Grid item xs={1}>
            <Typography>Mail Body</Typography>
          </Grid>

          <Grid item xs={11}>
          
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onEditorStateChange}
              ref={editorRef}
            />
          </Grid>
        
  
      </Grid>
      </Paper>
      <button onClick={buttonDefinition}>Log the editor body</button>
      {outputText && <p>{outputText}</p>}
      
    </>
  );
}

export default MailToIntermediary;
