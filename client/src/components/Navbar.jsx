import {
  Box,
  Flex,
  HStack,
  Link,
  Icon,
  Text,
  useDisclosure,
  Button,
  useColorModeValue,
  useColorMode,
  Stack,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import { GiTechnoHeart, GiHamburgerMenu } from 'react-icons/gi';
import { MdLogout, MdOutlineAdminPanelSettings } from 'react-icons/md';
import { FaTruck } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { BiUserCircle, BiChevronDown } from 'react-icons/bi';
import { BsMoonFill, BsSun } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/userActions';

const ShoppingCartIcon = () => {
  const cartInfo = useSelector((state) => state.cart);
  const { cart } = cartInfo;

  return (
    <Flex>
      <Text fontStyle={'italic'} as='sub' fontSize={'xs'}>
        {cart.length}
      </Text>
      <Icon ml={'-1.5'} as={FiShoppingCart} h={'4'} w={'7'} alignSelf={'center'} />
      Cart
    </Flex>
  );
};

const links = [
  { linkName: 'Home', path: '/' },
  { linkName: 'Products', path: '/products' },
  { linkName: <ShoppingCartIcon />, path: '/cart' },
];

const NavLink = ({ path, children }) => (
  <Link
    as={ReactLink}
    to={path}
    px={2}
    py={2}
    rounded={'md'}
    _hover={{ textDecoration: 'none', bg: useColorModeValue('gray.200', 'gray.700') }}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const [isHovering, setIsHovering] = useState(false);
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const dispatch = useDispatch();
  const toast = useToast();

  const logoutHandler = () => {
    dispatch(logout());
    toast({
      description: 'You have been logged out. ',
      status: 'success',
      isClosable: true,
    });
  };

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Icon
          cursor={'pointer'}
          as={isOpen ? AiOutlineClose : GiHamburgerMenu}
          onClick={isOpen ? onClose : onOpen}
          display={{ md: 'none' }}
        />

        <HStack>
          <Link
            as={ReactLink}
            to={'/'}
            style={{
              textDecoration: 'none',
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Flex alignItems={'center'}>
              <Icon as={GiTechnoHeart} h={6} w={6} color={isHovering ? 'cyan.400' : 'orange.400'} />
              <Text fontWeight={'extrabold'}>Tech Lines</Text>
            </Flex>
          </Link>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }} align={'center'}>
            {links.map((link) => (
              <NavLink key={link.linkName} path={link.path}>
                {link.linkName}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          <NavLink>
            <Flex alignItems={'center'}>
              <Icon
                as={colorMode === 'light' ? BsMoonFill : BsSun}
                alignItems={'center'}
                onClick={() => toggleColorMode()}
              />
            </Flex>
          </NavLink>
          {userInfo ? (
            <>
              <Menu>
                <MenuButton px={'4'} py={'2'} transition={'all 0.3s'} as={Button}>
                  <Flex alignItems={'center'}>
                    {userInfo.name} <BiChevronDown />
                  </Flex>
                </MenuButton>
                <MenuList>
                  <MenuItem as={ReactLink} to='/profile'>
                    <BiUserCircle />
                    <Text ml={'2'}>Profile</Text>
                  </MenuItem>
                  <MenuItem as={ReactLink} to='/your-orders'>
                    <FaTruck />
                    <Text ml={'2'}>Your Orders</Text>
                  </MenuItem>
                  {userInfo.isAdmin === 'true' && (
                    <>
                      <MenuDivider />
                      <MenuItem as={ReactLink} to={'/admin-console'}>
                        <MdOutlineAdminPanelSettings />
                        <Text ml='2'>Admin Console</Text>
                      </MenuItem>
                    </>
                  )}
                  <MenuDivider />
                  <MenuItem onClick={logoutHandler}>
                    <MdLogout /> <Text ml={'2'}>Logout</Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <>
              <Button as={ReactLink} to={'/login'} p={2} fontSize={'sm'} fontWeight={400} variant={'link'}>
                Sign In
              </Button>
              <Button
                as={ReactLink}
                to={'/registration'}
                p={2}
                fontSize={'sm'}
                fontWeight={600}
                _hover={{ bg: 'orange.400' }}
                bg={'orange.500'}
                color={'white'}
                display={{ base: 'none', md: 'inline-flex' }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {links.map((link) => (
              <NavLink key={link.linkName} path={link.path}>
                {link.linkName}
              </NavLink>
            ))}
            <NavLink key={'sign up'} path={'/registration'}>
              Sign Up
            </NavLink>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
