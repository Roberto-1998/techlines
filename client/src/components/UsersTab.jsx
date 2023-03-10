import { Box, TableContainer, Th, Tr, Table, Td, Thead, Tbody, useDisclosure, Wrap, useToast } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUsers, resetErrorAndRemoval } from '../redux/actions/adminActions';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import ConfirmRemovalAlert from './ConfirmRemovalAlert';
import CustomSpinner from './CustomSpinner';
import CustomAlert from './CustomAlert';

const UsersTab = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [userToDelete, setUserToDelete] = useState('');
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const user = useSelector((state) => state.user);
  const { error, loading, userRemoval, userList } = admin;
  const { userInfo } = user;
  const toast = useToast();

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(resetErrorAndRemoval());

    if (userRemoval) {
      toast({
        description: 'User has been removed. ',
        status: 'success',
        isClosable: true,
      });
    }
  }, [dispatch, toast, userRemoval]);

  const openDeleteConfirmBox = (user) => {
    setUserToDelete(user);
    onOpen();
  };

  return (
    <Box>
      {error && <CustomAlert error={error} status={'error'} title={'Upps!'} />}

      {loading ? (
        <Wrap justify={'center'}>
          <CustomSpinner />
        </Wrap>
      ) : (
        <Box>
          <TableContainer>
            <Table variant={'simple'} size={'sm'}>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Registerd</Th>
                  <Th>Admin</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {userList &&
                  userList.map((user) => (
                    <Tr key={user._id}>
                      <Td>
                        {user.name} {user._id === userInfo._id ? '(You)' : ''}
                      </Td>
                      <Td>{user.email}</Td>
                      <Td>{user.name}</Td>
                      <Td>{new Date(user.createdAt).toDateString()}</Td>
                      <Td>{user.isAdmin === 'true' ? <BsFillCheckCircleFill color='#D47735' /> : ''}</Td>
                      <Td>
                        <button
                          disabled={user._id === userInfo._id}
                          onClick={() => openDeleteConfirmBox(user)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            border: '#F1F2F3 1px solid',
                            padding: '7px',
                            borderRadius: '5px',
                            cursor: user._id === userInfo._id ? 'not-allowed' : 'pointer',
                          }}
                        >
                          <RiDeleteBin5Fill /> Remove User
                        </button>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
          <ConfirmRemovalAlert
            cancelRef={cancelRef}
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            itemToDelete={userToDelete}
            deleteAction={deleteUser}
          />
        </Box>
      )}
    </Box>
  );
};

export default UsersTab;
