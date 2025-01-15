import React from "react";
import Layout from "./../components/Layout/Layout";
import { Box, Typography } from "@mui/material";

const About = () => {
  return (
    <Layout>
      <Box
        sx={{
          my: 15,
          textAlign: "center",
          p: 2,
          "& h4": {
            fontWeight: "bold",
            my: 2,
            fontSize: "2rem",
          },
          "& p": {
            textAlign: "justify",
          },
          "@media (max-width:600px)": {
            mt: 0,
            "& h4 ": {
              fontSize: "1.5rem",
            },
          },
        }}
      >
        <Typography variant="h4">Welcome To My Resturant</Typography>
        <p>
          Welcome to our vibrant restaurant where culinary artistry meets warm hospitality.
          Our menu showcases a symphony of flavors, crafted with the freshest ingredients
          and a passion for gastronomic excellence. Immerse yourself in a cozy ambiance
          that effortlessly blends modern aesthetics with timeless charm. From sizzling
          appetizers to decadent desserts, each dish tells a story of creativity and dedication
          to a memorable dining experience. Join us for a journey of exquisite tastes that redefine
          the essence of fine dining.
        </p>
        <br />
        <p>
          At our restaurant, we redefine dining as an immersive experience, offering a haven for food
          enthusiasts. Our chef-driven kitchen sources locally to create a diverse menu that caters
          to every palate. Step into an atmosphere where impeccable service meets the art of indulgence,
          ensuring each visit is a culinary celebration. Whether it's a casual meal or a special occasion,
          our commitment to quality and innovation shines through. Join us, and let your senses embark
          on a gastronomic adventure like no other.
        </p>
      </Box>
    </Layout>
  );
};

export default About;
