import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Skeleton from "@material-ui/lab/Skeleton";
import CardActions from "@material-ui/core/CardActions";
import { getImages } from "../services/productServices";

import { Button, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    margin: theme.spacing(2),
  },
  media: {
    height: 190,
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  spacer: {
    paddingTop: "57%",
  },
}));

const ProductCardForEditing = ({
  product,
  user,
  loading,
  handleProductDelete,
}) => {
  // const images = [
  //   {
  //     _id: "60c768e293fe691d348a2277",
  //     public_id: "pnfsacgyfst1sn249cq5",
  //     url: "http://res.cloudinary.com/ymotoe-commerce/image/upload/v1623681250/pnfsacgyfst1sn249cq5.jpg",
  //     productId: "60c768df93fe691d348a2276",
  //     postedBy: "60c19ad573d9c63196cc4a0a",
  //     __v: 0,
  //   },
  // ];

  const classes = useStyles();
  const [images, setImages] = useState([]);

  useEffect(() => {
    loadImages();
  }, [user]);

  const loadImages = async () => {
    if (user === null) return;
    const { data } = await getImages(product._id, user);
    setImages(data);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        title={
          loading ? (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ margin: "0.7rem" }}
            />
          ) : (
            product.title
          )
        }
      />
      {!images.length ? (
        <Skeleton animation="wave" variant="rect" className={classes.media} />
      ) : (
        <CardMedia
          className={classes.media}
          image={images[0].url}
          title="Paella dish"
        />
      )}
      <CardActions>
        {loading ? (
          <Skeleton
            animation="wave"
            height={10}
            width="80%"
            style={{ margin: "1rem 0.5rem" }}
          />
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button variant="contained" color="default" fullWidth>
                Edit
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => handleProductDelete(product)}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        )}
      </CardActions>
    </Card>
  );
};

export default ProductCardForEditing;