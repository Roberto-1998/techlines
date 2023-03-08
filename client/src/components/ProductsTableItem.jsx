import {
  Tr,
  Td,
  Button,
  Image,
  VStack,
  Textarea,
  Tooltip,
  Input,
  Flex,
  FormControl,
  FormLabel,
  Switch,
  Badge,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteProduct, updateProduct } from '../redux/actions/adminActions';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { AiOutlineCloudSync } from 'react-icons/ai';

import ConfirmRemovalAlert from './ConfirmRemovalAlert';

const ProductsTableItem = ({ product }) => {
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [brand, setBrand] = useState(product.brand);
  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [stock, setStock] = useState(product.stock);
  const [price, setPrice] = useState(product.price);
  const [productIsNew, setProductIsNew] = useState(product.productIsNew);
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState(product.image.substring(8));
  const dispatch = useDispatch();

  const onSaveProduct = () => {
    dispatch(updateProduct(brand, name, category, stock, price, product._id, productIsNew, description, image));
  };

  const openDeleteConfirmBox = () => {
    onOpen();
  };

  return (
    <>
      <Tr>
        <Td>
          <Input size={'sm'} value={image} onChange={(e) => setImage(e.target.value)} />
          <Tooltip label={product.image} fontSize={'sm'}>
            <Image src={product.image} boxSize={'100px'} fit={'contain'} />
          </Tooltip>
        </Td>
        <Td>
          <Textarea
            w={'270px'}
            h={'120px'}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            size={'sm'}
          />
        </Td>
        <Td>
          <Flex direction={'column'} gap={'2'}>
            <Input value={brand} size={'sm'} onChange={(e) => setBrand(e.target.value)} />
            <Input value={name} size={'sm'} onChange={(e) => setName(e.target.value)} />
          </Flex>
        </Td>
        <Td>
          <Flex direction={'column'} gap={'2'}>
            <Input value={category} size={'sm'} onChange={(e) => setCategory(e.target.value)} />
            <Input value={price} size={'sm'} onChange={(e) => setPrice(e.target.value)} />
          </Flex>
        </Td>
        <Td>
          <Flex direction={'column'} gap={'2'}>
            <Input value={stock} size={'sm'} onChange={(e) => setStock(e.target.value)} />
            <FormControl display={'flex'} alignItems={'center'}>
              <FormLabel htmlFor='productIsNewFlag' mb={'0'} fontSize={'sm'}>
                Enable
                <Badge rounded={'full'} px={'1'} fontSize={'0.8em'} colorScheme='green'>
                  {' '}
                  New
                </Badge>
                badge ?
              </FormLabel>
              <Switch id='productIsNewFlag' isChecked={productIsNew} onChange={(e) => setProductIsNew(!productIsNew)} />
            </FormControl>
          </Flex>
        </Td>
        <Td>
          <VStack>
            <Button colorScheme='orange' w={'160px'} variant={'outline'} onClick={() => onSaveProduct()}>
              <AiOutlineCloudSync style={{ marginRight: '5px' }} />
              Save
            </Button>
            <Button colorScheme='red' w={'160px'} variant={'outline'} onClick={openDeleteConfirmBox}>
              <RiDeleteBin5Fill style={{ marginRight: '5px' }} />
              Remove
            </Button>
          </VStack>
        </Td>
      </Tr>
      <ConfirmRemovalAlert
        cancelRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        itemToDelete={product}
        deleteAction={deleteProduct}
      />
    </>
  );
};

export default ProductsTableItem;
