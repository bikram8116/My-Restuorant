import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MenuList } from "../data/data";
import Layout from "./../components/Layout/Layout";
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography, Button, Grid } from "@mui/material";

// Action Types
const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY';
const DECREMENT_QUANTITY = 'DECREMENT_QUANTITY';

// Action Creators
const incrementQuantity = (menuName) => ({
  type: INCREMENT_QUANTITY,
  payload: menuName,
});

const decrementQuantity = (menuName) => ({
  type: DECREMENT_QUANTITY,
  payload: menuName,
});

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const quantities = useSelector((state) => state.cart.quantities);
  const dispatch = useDispatch();

  const handleIncrement = (menu) => {
    dispatch(incrementQuantity(menu.name));
  };

  const handleDecrement = (menu) => {
    dispatch(decrementQuantity(menu.name));
  };

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          objectFit: "cover",
        }}
      >
        {MenuList.map((menu) => (
          <Card
            key={menu.name}
            sx={{ maxWidth: "390px", display: "flex", m: 1 }}
          >
            <CardActionArea onClick={() => setSelectedMenu(menu)}>
              <CardMedia
                sx={{
                  height: "300px",
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: "14px",
                }}
                component={"img"}
                src={menu.image}
                alt={menu.name}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom component={"div"}>
                  {menu.name} <h6> ₹ {menu.price}</h6>
                </Typography>
                <Typography variant="body2">{menu.description}</Typography>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Grid item>
                    {quantities[menu.name] > 0 ? (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Button
                          variant="contained"
                          onClick={() => handleDecrement(menu)}
                          sx={{ minWidth: "40px" }}
                        >
                          -
                        </Button>
                        <Typography sx={{ mx: 2 }}>
                          {quantities[menu.name]}
                        </Typography>
                        <Button
                          variant="contained"
                          onClick={() => handleIncrement(menu)}
                          sx={{ minWidth: "40px" }}
                        >
                          +
                        </Button>
                      </Box>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={() => handleIncrement(menu)}
                      >
                        ADD
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Layout>
  );
};

export default Menu;
