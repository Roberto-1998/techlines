import { Box, Stack, Heading, Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UsersTab from '../components/UsersTab';

const AdminConsolePage = () => {
  const user = useSelector((state) => state.user);

  const { userInfo } = user;

  return userInfo && userInfo.isAdmin === 'true' ? (
    <Box p={'20px'} minH={'100vh'}>
      <Stack direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
        <Stack pr={{ base: 0, md: 14 }} spacing={{ base: 8, md: 10 }} flex={'1.5'} mb={{ base: 12, md: 'none' }}>
          <Heading fontSize={'2xl'} fontWeight={'extrabold'}>
            Admin Console
          </Heading>
          <Tabs size={'md'} variant={'enclosed'}>
            <TabList>
              <Tab>Users</Tab>
              <Tab>Products</Tab>
              <Tab>Reviews</Tab>
              <Tab>Orders</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <UsersTab />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Stack>
    </Box>
  ) : (
    <Navigate to={'/login'} replace={true} />
  );
};

export default AdminConsolePage;
