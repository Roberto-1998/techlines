import {
  Box,
  Th,
  Tr,
  Table,
  Thead,
  Tbody,
  Wrap,
  useToast,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, resetProductError } from '../redux/actions/productActions';

import ProductsTableItem from './ProductsTableItem';
import AddNewProduct from './AddNewProduct';
import CustomSpinner from './CustomSpinner';
import CustomAlert from './CustomAlert';

const ProductsTab = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const { error, loading } = admin;
  const productInfo = useSelector((state) => state.products);
  const { products, productUpdate } = productInfo;
  const toast = useToast();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(resetProductError());

    if (productUpdate) {
      toast({
        description: 'Product has been updated. ',
        status: 'success',
        isClosable: true,
      });
    }
  }, [dispatch, toast, productUpdate]);

  return (
    <Box>
      {error && <CustomAlert error={error} title={'Upps'} status={'error'} />}

      {loading ? (
        <Wrap justify={'center'}>
          <CustomSpinner />
        </Wrap>
      ) : (
        <Box>
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex={'1'} textAlign={'right'}>
                    <Box>
                      <Text mr={'8px'} fontWeight={'bold'}>
                        Add a new Product
                      </Text>
                    </Box>
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={'4'}>
                <Table>
                  <Tbody>
                    <AddNewProduct />
                  </Tbody>
                </Table>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Table variant={'simple'} size={'sm'}>
            <Thead>
              <Tr>
                <Th>Image</Th>
                <Th>Description</Th>
                <Th>Brand & Name</Th>
                <Th>Category & Price</Th>
                <Th>Stock & new Badge</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.length > 0 &&
                products.map((product) => <ProductsTableItem key={product._id} product={product} />)}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
};

export default ProductsTab;
