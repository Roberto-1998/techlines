import { useParams } from 'react-router-dom';
import {
  Box,
  Image,
  Text,
  Wrap,
  Stack,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Flex,
  Badge,
  Heading,
  HStack,
  SimpleGrid,
  useToast,
  Spinner,
  Tooltip,
  Button,
  Input,
  Textarea,
} from '@chakra-ui/react';

import { BiPackage, BiCheckShield, BiSupport } from 'react-icons/bi';
import { AiOutlineMinus, AiFillStar } from 'react-icons/ai';
import { GrAdd } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { createProductReview, getProductById, resetProductError } from '../redux/actions/productActions';
import { addCartItem } from '../redux/actions/cartActions';
import { useEffect, useState } from 'react';

const ProductPage = () => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);
  const [title, setTitle] = useState('');
  const [reviewBoxOpen, setReviewBoxOpen] = useState(false);

  const [amount, setAmount] = useState(1);
  let { id } = useParams();
  const toast = useToast();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const { loading, error, product, reviewSend } = products;

  const cartContent = useSelector((state) => state.cart);
  const { cart } = cartContent;

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  useEffect(() => {
    dispatch(getProductById(id));

    if (reviewSend) {
      toast({
        description: 'Product review saved.',
        status: 'success',
        isClosable: true,
      });
      dispatch(resetProductError());
      setReviewBoxOpen(false);
    }
  }, [dispatch, id, cart, reviewSend, toast]);

  const changeAmount = (input) => {
    if (input === 'plus') {
      setAmount(amount + 1);
    }
    if (input === 'minus') {
      setAmount(amount - 1);
    }
  };

  const hasUserReviewd = () => {
    return product.reviews.some((item) => item.user === userInfo._id);
  };

  const onSubmit = () => {
    dispatch(createProductReview(product._id, userInfo._id, comment, rating, title));
  };

  const addItem = () => {
    if (cart.some((item) => item.id === product._id)) {
      toast({
        description: 'This item is already in your cart. Go to your cart to change the amount.',
        status: 'error',
        isClosable: true,
      });
    } else {
      dispatch(addCartItem(product._id, amount));
      toast({
        description: 'Item has been added',
        status: 'success',
        isClosable: true,
      });
    }
  };
  return (
    <Wrap spacing={'30px'} justify={'center'} minH={'100vh'}>
      {loading ? (
        <Stack direction={'row'} spacing={4}>
          <Spinner mt={20} thickness='2px' speed='0.65s' emptyColor='gray.200' color='orange.500' size={'xl'} />
        </Stack>
      ) : error ? (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>We are sorry!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        product && (
          <Box
            maxW={{ base: '3xl', lg: '5xl' }}
            mx={'auto'}
            px={{ base: '4', md: '8', lg: '12' }}
            py={{ base: '6', md: '8', lg: '12' }}
          >
            <Stack direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
              <Stack
                pr={{ base: '0', md: '12' }}
                spacing={{ base: '8', md: '4' }}
                flex={'1.5'}
                mb={{ base: '12', md: 'none' }}
              >
                {product.productIsNew && (
                  <Badge rounded={'full'} w={'40px'} fontSize={'0.8em'} colorScheme='green'>
                    New
                  </Badge>
                )}
                {product.stock === 0 && (
                  <Badge rounded={'full'} w={'72px'} fontSize={'0.8em'} colorScheme='red'>
                    Sold out
                  </Badge>
                )}
                <Heading fontSize={'2xl'} fontWeight={'extrabold'}>
                  {product.name}
                </Heading>
                <Stack spacing={5}>
                  <Box>
                    <Text fontSize={'xl'}>{product.price} &euro;</Text>
                    <Flex>
                      <HStack spacing={'2px'}>
                        <AiFillStar w={'14px'} color='#E19E73' />
                        <AiFillStar w={'14px'} color={product.rating >= 2 ? '#E19E73' : '#EBEFF3'} />
                        <AiFillStar w={'14px'} color={product.rating >= 3 ? '#E19E73' : '#EBEFF3'} />
                        <AiFillStar w={'14px'} color={product.rating >= 4 ? '#E19E73' : '#EBEFF3'} />
                        <AiFillStar w={'14px'} color={product.rating >= 5 ? '#E19E73' : '#EBEFF3'} />
                      </HStack>
                      <Text fontSize={'md'} fontWeight={'bold'} ml={'4px'}>
                        {`${product.numberOfReviews} ${product.numberOfReviews === 1 ? 'Review' : 'Reviews'}`}
                      </Text>
                    </Flex>
                  </Box>
                  <Text>{product.description}</Text>
                  <Text fontWeight={'bold'}>Quantity</Text>
                  <Flex w={'170px'} p={'5px'} border={'1px'} borderColor={'gray.200'} alignItems={'center'}>
                    <button
                      style={{
                        padding: '12px 15px ',
                        backgroundColor: '#EDF2F7',
                        borderRadius: '5px',
                        cursor: amount <= 1 ? 'not-allowed' : 'pointer',
                      }}
                      onClick={() => changeAmount('minus')}
                      disabled={amount <= 1}
                    >
                      <AiOutlineMinus color='black' />
                    </button>
                    <Text mx={'30px'}>{amount}</Text>
                    <button
                      style={{
                        padding: '12px 15px ',
                        backgroundColor: '#EDF2F7',
                        borderRadius: '5px',
                        cursor: amount >= product.stock ? 'not-allowed' : 'pointer',
                      }}
                      onClick={() => changeAmount('plus')}
                      disabled={amount >= product.stock}
                    >
                      <GrAdd />
                    </button>
                  </Flex>
                  <button
                    colorScheme='orange'
                    onClick={() => addItem()}
                    disabled={product.stock === 0}
                    style={{
                      backgroundColor: product.stock === 0 ? '#F1C4A9' : '#DD6B20',
                      padding: '8px 15px ',
                      borderRadius: '5px',
                      color: 'white',
                      cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
                    }}
                  >
                    Add to cart
                  </button>
                  <Stack width={'270px'}>
                    <Flex alignItems={'center'}>
                      <BiPackage size={'20px'} />
                      <Text fontWeight={'medium'} fontSize={'sm'} ml={'2'}>
                        Free shipping if order is above 100 &euro;
                      </Text>
                    </Flex>
                    <Flex alignItems={'center'}>
                      <BiCheckShield size={'20px'} />
                      <Text fontWeight={'medium'} fontSize={'sm'} ml={'2'}>
                        2 years extended warranty
                      </Text>
                    </Flex>
                    <Flex alignItems={'center'}>
                      <BiSupport size={'20px'} />
                      <Text fontWeight={'medium'} fontSize={'sm'} ml={'2'}>
                        We're here for you 24/7
                      </Text>
                    </Flex>
                  </Stack>
                </Stack>
              </Stack>
              <Flex direction={'column'} align={'center'} flex={'1'} _dark={{ bg: 'gray.900' }}>
                <Image mb={'30px'} src={product.image} alt={product.name} w={{ base: '250px' }} />
              </Flex>
            </Stack>
            {userInfo && (
              <>
                <Tooltip label={hasUserReviewd() ? 'You have already reviewed this product. ' : ''} fontSize={'md'}>
                  <button
                    style={{
                      marginBottom: '10px',
                      padding: '8px 15px ',
                      borderRadius: '5px',
                      color: 'white',
                      backgroundColor: hasUserReviewd() ? '#F1C4A9' : '#DD6B20',
                      cursor: hasUserReviewd() ? 'not-allowed' : 'pointer',
                    }}
                    disabled={hasUserReviewd()}
                    onClick={() => setReviewBoxOpen(!reviewBoxOpen)}
                  >
                    Write a review
                  </button>
                </Tooltip>
                {reviewBoxOpen && (
                  <Stack mb={'20px'}>
                    <Wrap>
                      <HStack spacing={'2px'}>
                        <Button variant={'outline'} onClick={() => setRating(1)}>
                          <AiFillStar w={'14px'} color='#E19E73' />
                        </Button>
                        <Button variant={'outline'} onClick={() => setRating(2)}>
                          <AiFillStar w={'14px'} color={rating >= 2 ? '#E19E73' : '#EBEFF3'} />
                        </Button>
                        <Button variant={'outline'} onClick={() => setRating(3)}>
                          <AiFillStar w={'14px'} color={rating >= 3 ? '#E19E73' : '#EBEFF3'} />
                        </Button>
                        <Button variant={'outline'} onClick={() => setRating(4)}>
                          <AiFillStar w={'14px'} color={rating >= 4 ? '#E19E73' : '#EBEFF3'} />
                        </Button>
                        <Button variant={'outline'} onClick={() => setRating(5)}>
                          <AiFillStar w={'14px'} color={rating >= 5 ? '#E19E73' : '#EBEFF3'} />
                        </Button>
                      </HStack>
                    </Wrap>
                    <Input
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      placeholder='Review title (optional)'
                    />
                    <Textarea
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                      placeholder={`The ${product.name} is...`}
                    />
                    <Button w={'140px'} colorScheme='orange' onClick={() => onSubmit()}>
                      Publish review
                    </Button>
                  </Stack>
                )}
              </>
            )}
            <Stack>
              <Text fontSize={'xl'} fontWeight={'bold'}>
                Reviews
              </Text>
              <SimpleGrid minChildWidth={'300px'} spacingX={'40px'} spacingY={'20px'}>
                {product.reviews.map((review) => (
                  <Box key={review._id}>
                    <Flex spacing='2px' alignItems={'center'}>
                      <AiFillStar w={'14px'} color='#E19E73' />
                      <AiFillStar w={'14px'} color={review.rating >= 2 ? '#E19E73' : '#EBEFF3'} />
                      <AiFillStar w={'14px'} color={review.rating >= 3 ? '#E19E73' : '#EBEFF3'} />
                      <AiFillStar w={'14px'} color={review.rating >= 4 ? '#E19E73' : '#EBEFF3'} />
                      <AiFillStar w={'14px'} color={review.rating >= 5 ? '#E19E73' : '#EBEFF3'} />
                      <Text fontWeight={'semibold'} ml={'4px'}>
                        {review.title && review.title}
                      </Text>
                    </Flex>
                    <Box py={'12px'}>{review.comment}</Box>
                    <Text fontSize={'sm'} color={'gray.400'}>
                      by {review.name}, {new Date(review.createdAt).toDateString()}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Stack>
          </Box>
        )
      )}
    </Wrap>
  );
};

export default ProductPage;
