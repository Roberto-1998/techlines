import { useEffect } from 'react';
import { Center, Wrap, WrapItem } from '@chakra-ui/react';
import ProductCard from '../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/actions/productActions';
import CustomSpinner from '../components/CustomSpinner';
import CustomAlert from '../components/CustomAlert';

const ProductsPage = () => {
  const dispatch = useDispatch();

  const productsList = useSelector((state) => state.products);

  const { loading, error, products } = productsList;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Wrap spacing={'30px'} justify={'center'} minHeight={'100vh'}>
      {loading ? (
        <CustomSpinner />
      ) : error ? (
        <CustomAlert error={error} status={'error'} title={'We are sorry!. '} />
      ) : (
        products.map((product) => (
          <WrapItem key={product._id}>
            <Center w={'250px'} h={'550px'}>
              <ProductCard product={product} />
            </Center>
          </WrapItem>
        ))
      )}
    </Wrap>
  );
};

export default ProductsPage;
