import Product from "./Product";
import { Box, Grid } from "@chakra-ui/react";

export default function ProductList({ producten }) {
  return (
    <Grid templateColumns="repeat(5, minmax(250px, 1fr))" gap={3}>
      {producten.map((p, index) => (
        <Box key={index} p={2} data-cy="product_item">
          <Product key={p.ID} {...p} />
        </Box>
      ))}
    </Grid>
  );
}
