import { useState } from "react";
import {
  ListItem,
  List,
  InputAdornment,
  makeStyles,
  LinearProgress,
} from "@material-ui/core";
import { SearchOutlined as SearchIcon } from "@material-ui/icons";
import SubCategoryListItem from "../components/SubCategoryListItem";
import TextInputGenerator from "../components/shared/TextInputGenerator";
import { getSearchResult } from "../util/getSearchResult";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles({
  alert: {
    margin: "1rem",
  },
});

const SubCategoryList = ({
  subCategories,
  doSubCategoryUpdate,
  setSubCategory,
  listItemLoading,
  setShowDialog,
  loading,
  category,
}) => {
  const [query, setQuery] = useState("");

  const classes = useStyles();

  const subCategoryFilterInput = [
    {
      id: "subCategoryQuery",
      onChange: (e) => setQuery(e.target.value),
      type: "text",
      value: query,
      InputProps: {
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      },
    },
  ];

  if (!category)
    return (
      <Alert severity="info">
        <p>Please select catergory.</p>
      </Alert>
    );

  const filteredSubCategory = getSearchResult(subCategories, query);

  return (
    <List className={classes.list}>
      {loading ? (
        <LinearProgress />
      ) : (
        <>
          <ListItem className={classes.searchBar}>
            <TextInputGenerator definitions={subCategoryFilterInput} />
          </ListItem>
          {category && !subCategories.length ? (
            <Alert severity="info" className={classes.alert}>
              <p>
                No Sub Category registered. <br />
              </p>
            </Alert>
          ) : (
            filteredSubCategory.map((c) => (
              <SubCategoryListItem
                key={c._id}
                subCategory={c}
                doSubCategoryUpdate={doSubCategoryUpdate}
                setSubCategory={setSubCategory}
                listItemLoading={listItemLoading}
                setShowDialog={setShowDialog}
              />
            ))
          )}
        </>
      )}
    </List>
  );
};

export default SubCategoryList;
