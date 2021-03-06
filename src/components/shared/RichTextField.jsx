import React, { useEffect, useState } from "react";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Chip, Grid, makeStyles, Typography } from "@material-ui/core";
import { getRawInputData } from "../../util/getRawInputData";

const useStyles = makeStyles({
  charCounter: {
    margin: "0.5rem 0",
  },
});

const RichTextField = ({
  setValue,
  characters,
  count,
  success,
  label,
  error,
  defaultValue = "",
}) => {
  const classes = useStyles();

  const rawInputData = getRawInputData(characters);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(defaultValue))
    )
  );

  useEffect(() => {
    setValue(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  }, [editorState, setValue]);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  return (
    <>
      <Grid
        container
        className={classes.charCounter}
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography className={classes.formParts}>{label}</Typography>
        </Grid>
        <Grid item>
          {count && (
            <Chip
              label={`${count - rawInputData.length}  characters left`}
              color="default"
            />
          )}
        </Grid>
      </Grid>
      {!!error && (
        <Typography
          variant="caption"
          color="error"
          className={classes.formParts}
        >
          {error}
        </Typography>
      )}
      <Editor
        editorStyle={{
          border: "1px solid rgb(241, 241, 241)",
          borderRadius: "4px",
          minHeight: "400px",
          backgroundColor: "#fff",
          padding: "0 0.5rem",
          maxHeight: "50vh",
          overflowX: "scroll",
          marginBottom: "0.5rem",
        }}
        toolbarStyle={{
          borderRadius: "4px",
        }}
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "fontFamily",
            "list",
            "textAlign",
            "colorPicker",
            "link",
            "embedded",
            "emoji",
            "remove",
            "history",
          ],
        }}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
    </>
  );
};

export default RichTextField;
