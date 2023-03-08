import {
  Box,
  Button,
  FormControl,
  Heading,
  Stack,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Flex,
  Card,
  CardHeader,
  CardBody,
  StackDivider,
  useToast,
  Alert,
} from '@chakra-ui/react';
import TextField from '../components/TextField';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { updateProfile, resetUpdateSuccess } from '../redux/actions/userActions';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userInfo, loading, error, updateSuccess } = user;
  const toast = useToast();

  useEffect(() => {
    if (updateSuccess) {
      toast({
        description: 'Profile saved.',
        status: 'success',
        isClosable: true,
      });
      dispatch(resetUpdateSuccess());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast, updateSuccess]);

  return (
    <Formik
      initialValues={{
        name: userInfo.name,
        email: userInfo.email,
        password: '',
        confirmPassword: '',
      }}
      validationSchema={Yup.object({
        name: Yup.string().required('A name is required.'),
        email: Yup.string().email('Invalid email.').required('An email address is required.'),
        password: Yup.string(),

        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Password must match. '),
      })}
      onSubmit={(values) => {
        dispatch(updateProfile(userInfo._id, values.name, values.email, values.password));
      }}
    >
      {(formik) => (
        <Box
          minH={'100vh'}
          minW={{ base: '1xl', lg: '5xl' }}
          mx={'auto'}
          px={{ base: '4', md: '8', lg: '12' }}
          py={{ base: '6', md: '8', lg: '12' }}
        >
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={'10'}
            justify={'center'}
            align={{ lg: 'flex-start' }}
          >
            <Stack spacing={'10'} flex={'1.5'} mb={{ base: '2xl', md: 'none' }} maxW={'700px'}>
              <Heading fontSize={'2xl'} fontWeight={'extrabold'}>
                Profile
              </Heading>
              <Stack spacing={'6'}>
                <Stack spacing={'6'} as={'form'} onSubmit={formik.handleSubmit}>
                  {error && (
                    <Alert
                      status='error'
                      flexDirection={'column'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      textAlign={'center'}
                    >
                      <AlertIcon />
                      <AlertTitle>We are sorry!</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Stack spacing={'5'}>
                    <FormControl>
                      <TextField
                        type={'text'}
                        name={'name'}
                        placeholder={'Your first and last name'}
                        label={'Full Name'}
                      />
                      <TextField type={'text'} name={'email'} placeholder={'you@example.com'} label={'Email'} />
                      <TextField type={'password'} name={'password'} placeholder={'your password'} label={'Password'} />
                      <TextField
                        type={'password'}
                        name={'confirmPassword'}
                        placeholder={'Confirm your password'}
                        label={'Confirm your password'}
                      />
                    </FormControl>
                  </Stack>
                  <Stack spacing={'6'}>
                    <Button colorScheme='orange' size={'lg'} fontSize={'md'} isLoading={loading} type='submit'>
                      Save
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <Flex direction={'column'} align={'center'} flex={'1'} _dark={{ bg: 'gray.900' }} maxW={'550px'}>
              <Card>
                <CardHeader>
                  <Heading size={'md'}>User Report</Heading>
                </CardHeader>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing={'4'}>
                    <Box pt={'2'} fontSize={'sm'}>
                      Registered on {new Date(userInfo.createdAt).toDateString()}
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            </Flex>
          </Stack>
        </Box>
      )}
    </Formik>
  );
};

export default ProfilePage;
