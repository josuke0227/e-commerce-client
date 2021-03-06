import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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
import { getBrands } from "../services/brandsService";

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

const BrandAccordionFilter = ({ products }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [checkBoxState, setCheckBoxState] = useState(INITIAL_CHECKBOX_STATE);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const loadBrands = async () => {
      const { data } = await getBrands();
      const availableBrands = [];
      data.forEach((d) =>
        products.forEach((p) => {
          if (p.brand._id === d._id) {
            availableBrands.push(d);
          }
        })
      );
      setBrands(availableBrands);
    };
    loadBrands();
  }, [products]);

  useEffect(() => {
    const loadFilteredProducts = async (name, data) => {
      if (Object.keys(checkBoxState).length && !data.length) {
        dispatch({
          type: "RESET_QUERY",
          payload: { name },
        });
      } else if (data.length)
        dispatch({
          type: "SET_QUERY",
          payload: { name, data: [...data] },
        });
    };

    if (brands.length && Object.keys(checkBoxState).length) {
      const selectedBrands = [];
      brands.forEach((b) => {
        if (checkBoxState[b._id] === true) selectedBrands.push(b);
      });
      loadFilteredProducts("brand", selectedBrands);
    }
  }, [checkBoxState, brands, dispatch]);

  const handleChange = (event) => {
    setCheckBoxState({
      ...checkBoxState,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Brands</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup row>
            {brands.length > 0 &&
              brands.map((b) => (
                <FormControlLabel
                  key={b._id}
                  control={
                    <Checkbox
                      checked={checkBoxState[b.name]}
                      onChange={handleChange}
                      name={b._id}
                      color="primary"
                    />
                  }
                  label={b.name}
                />
              ))}
            <div className=""></div>
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default BrandAccordionFilter;
