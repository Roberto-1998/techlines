import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  Button,
  Tooltip,
  Stack,
  Link,
  Text,
  useToast,
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { Link as ReactLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from '../redux/actions/cartActions';
import CustomRating from './CustomRating';

const Rating = ({ rating, numberOfReviews }) => {
  return (
    <Flex>
      <CustomRating value={rating} />
      <Text fontSize={'md'} fontWeight={'bold'} ml={'4px'}>
        {`${numberOfReviews} ${numberOfReviews === 1 ? 'Review' : 'Reviews'}`}
      </Text>
    </Flex>
  );
};

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const cartInfo = useSelector((state) => state.cart);
  const { cart } = cartInfo;

  const addItem = (id) => {
    if (cart.some((item) => item.id === id)) {
      toast({
        description: 'This item is already in your cart. Go to your cart to change the amount.',
        status: 'error',
        isClosable: true,
      });
    } else {
      dispatch(addCartItem(id, 1));
      toast({
        description: 'Item has been added. ',
        status: 'success',
        isClosable: true,
      });
    }
  };

  return (
    <Stack
      p={2}
      spacing={'3px'}
      bg={useColorModeValue('white', 'gray.800')}
      minW={'240px'}
      h={'400px'}
      borderWidth={'1px'}
      rounded={'lg'}
      shadow={'lg'}
      position={'relative'}
    >
      {product.productIsNew && <Circle size={'10px'} position={'absolute'} top={2} right={2} bg={'green.300'} />}
      {product.stock <= 0 && <Circle size={'10px'} position={'absolute'} top={2} right={2} bg={'red.300'} />}
      <Image src={product.image} alt={product.name} roundedTop={'lg'} />
      <Box flex={'1'} maxH={'5'} alignItems={'baseline'}>
        {product.stock <= 0 && (
          <Badge rounded={'full'} px={'2'} fontSize={'0.8em'} colorScheme='red'>
            Sold out
          </Badge>
        )}
        {product.productIsNew && (
          <Badge rounded={'full'} px={'2'} fontSize={'0.8em'} colorScheme='green'>
            New
          </Badge>
        )}
      </Box>
      <Flex mt={'1'} justifyContent={'space-between'} alignContent={'center'}>
        <Link as={ReactLink} to={`/product/${product._id}`} pt={'2'} cursor={'pointer'}>
          <Box fontSize={'2x1'} fontWeight={'semibold'} lineHeight={'tight'}>
            {product.name}
          </Box>
        </Link>
      </Flex>
      <Flex justifyContent={'space-between'} alignContent={'center'} py={'2'}>
        <Rating rating={product.rating} numberOfReviews={product.numberOfReviews} />
      </Flex>
      <Flex justify={'space-between'}>
        <Box fontSize={'2x1'} color={useColorModeValue('gray.800', 'white')}>
          {Number(product.price).toFixed(2)}
          <span> </span>
          <Box as='span' color={'gray.600'} fontSize={'lg'}>
            &euro;
          </Box>
        </Box>
        {product.stock > 0 ? (
          <Tooltip label='Add to cart' bg={'white'} placement='bottom' color={'gray.800'} fontSize={'1em'}>
            <Button
              variant={'ghost'}
              display={'flex'}
              disabled={product.stock < 1}
              onClick={() => addItem(product._id)}
            >
              <Icon as={FiShoppingCart} h={6} w={6} alignSelf={'end'} />
            </Button>
          </Tooltip>
        ) : null}
      </Flex>
    </Stack>
  );
};

export default ProductCard;
