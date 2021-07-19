import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core/";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { getSubCategories } from "../services/subCategoryServices";
import { filterByAttribute } from "../services/productServices";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const INITIAL_CHECKBOX_STATE = {};

const SubCategoryAccordionFilter = () => {
  const classes = useStyles();

  const [checkBoxState, setCheckBoxState] = useState(INITIAL_CHECKBOX_STATE);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadSubCategories();
  }, []);
  const loadSubCategories = async () => {
    const { data } = await getSubCategories();
    setSubCategories(data);
  };

  useEffect(() => {
    if (!subCategories.length) return;

    let checkBoxState = {};
    subCategories.forEach(
      (c) => (checkBoxState = { ...checkBoxState, [c._id]: false })
    );
    setCheckBoxState(checkBoxState);
  }, [subCategories]);

  useEffect(() => {
    const selectedCategory = [];
    subCategories.forEach((c) => {
      if (checkBoxState[c._id] === true) selectedCategory.push(c);
    });
    if (selectedCategory.length)
      loadFilteredProduct("subCategory", selectedCategory);
  }, [checkBoxState]);

  const loadFilteredProduct = async (name, data) => {
    const { data: response } = await filterByAttribute(name, data);
    setProducts(response);
  };

  const handleChange = (event) => {
    setCheckBoxState({
      ...checkBoxState,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <FilterOptions
      label="Sub category"
      options={subCategories}
      value={checkBoxState}
      handleChange={handleChange}
    />
  );
};

export default SubCategoryAccordionFilter;

const FilterOptions = ({ options, value, handleChange, label }) => {
  const classes = useStyles();
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} id="categorySelector">
        <Typography className={classes.heading}>{label}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormGroup row>
          {options.length > 0 &&
            options.map((o) => (
              <FormControlLabel
                key={o._id}
                control={
                  <Checkbox
                    checked={value[o.name]}
                    onChange={handleChange}
                    name={o._id}
                    color="primary"
                  />
                }
                label={o.name}
              />
            ))}
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
};