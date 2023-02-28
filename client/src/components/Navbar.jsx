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
} from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import { GiTechnoHeart, GiHamburgerMenu } from 'react-icons/gi';
import { BsMoonFill, BsSun } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';

const links = [
  { linkName: 'Products', path: '/products' },
  { linkName: 'ShoppingCart', path: '/cart' },
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
          <Link as={ReactLink} to={'/'}>
            <Flex alignItems={'center'}>
              <Icon as={GiTechnoHeart} h={6} w={6} color={'orange.400'} />
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
