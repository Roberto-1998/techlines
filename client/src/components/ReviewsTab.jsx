import {
  Box,
  TableContainer,
  Th,
  Tr,
  Table,
  Td,
  Thead,
  Tbody,
  Alert,
  Stack,
  Spinner,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Wrap,
  useToast,
  Text,
  Flex,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Textarea,
  HStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeReview } from '../redux/actions/adminActions';
import { getProducts, resetProductError } from '../redux/actions/productActions';
import { AiFillStar } from 'react-icons/ai';

const ReviewsTab = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const { error, loading } = admin;
  const productInfo = useSelector((state) => state.products);
  const { products, reviewRemoval } = productInfo;
  const toast = useToast();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(resetProductError());

    if (reviewRemoval) {
      toast({
        description: 'Review has been removed. ',
        status: 'success',
        isClosable: true,
      });
    }
  }, [dispatch, toast, reviewRemoval, loading]);

  const onRemoveReview = (productId, reviewId) => {
    dispatch(removeReview(productId, reviewId));
  };

  return (
    <Box>
      {error && (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>Upps!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <Wrap justify={'center'}>
          <Stack direction={'row'} spacing={'4'}>
            <Spinner mt={'20px'} thickness='2px' speed='0.65s' emptyColor='gray.200' color='orange.500' size={'xl'} />
          </Stack>
        </Wrap>
      ) : (
        <Box>
          {products.length > 0 &&
            products.map((product) => (
              <Box key={product._id}>
                <Accordion allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex={'1'}>
                          <Flex justifyContent={'space-between'}>
                            <Text mr={'8px'} fontWeight={'bold'}>
                              {product.name}
                            </Text>

                            <Text mr={'8px'} fontWeight={'bold'} textAlign={'start'}>
                              ({product.reviews.length} Reviews)
                            </Text>
                          </Flex>
                        </Box>
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={'4'}>
                      <TableContainer>
                        <Table size={'sm'}>
                          <Thead>
                            <Tr>
                              <Th>Username</Th>
                              <Th>Rating</Th>
                              <Th>Title</Th>
                              <Th>Comment</Th>
                              <Th>Created</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {product.reviews.map((review) => (
                              <Tr key={review._id}>
                                <Td>{review.name}</Td>
                                <Td>
                                  <HStack spacing={'2px'}>
                                    <AiFillStar w={'14px'} color='#E19E73' />
                                    <AiFillStar w={'14px'} color={review.rating >= 2 ? '#E19E73' : '#EBEFF3'} />
                                    <AiFillStar w={'14px'} color={review.rating >= 3 ? '#E19E73' : '#EBEFF3'} />
                                    <AiFillStar w={'14px'} color={review.rating >= 4 ? '#E19E73' : '#EBEFF3'} />
                                    <AiFillStar w={'14px'} color={review.rating >= 5 ? '#E19E73' : '#EBEFF3'} />
                                  </HStack>
                                </Td>
                                <Td>{review.title}</Td>
                                <Td>
                                  <Textarea isDisabled value={review.comment} size={'sm'} />
                                </Td>
                                <Td>{new Date(review.createdAt).toDateString()}</Td>
                                <Td>
                                  <Button
                                    variant={'outline'}
                                    colorScheme='red'
                                    onClick={() => onRemoveReview(product._id, review._id)}
                                  >
                                    Remove Review
                                  </Button>
                                </Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>
            ))}
        </Box>
      )}
    </Box>
  );
};

export default ReviewsTab;
