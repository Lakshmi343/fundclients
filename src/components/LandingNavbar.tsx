
// import {
//   Box,
//   BoxProps,
//   Burger,
//   Button, 
//   ButtonProps,
//   Center,
//   Collapse,
//   Container,
//   createStyles,
//   Divider,
//   Drawer,
//   Flex,
//   getStylesRef,
//   Group,
//   Header,
//   HoverCard,
//   rem,
//   ScrollArea,
//   SimpleGrid,
//   Text,
//   ThemeIcon,
//   UnstyledButton,
//   Avatar,
//   LoadingOverlay,
//   Notification,
// } from '@mantine/core';
// import { useDisclosure, useMediaQuery } from '@mantine/hooks';
// import {
//   IconAugmentedReality,
//   IconCat,
//   IconChevronDown,
//   IconClipboardHeart,
//   IconDeviceTv,
//   IconFireHydrant,
//   IconHeartHandshake,
//   IconLeaf,
//   IconReportMoney,
//   IconSearch,
//   IconSos,
//   IconDashboard,
//   IconPlus,
//   IconUsers,
//   IconLogout,
//   IconCheck,
//   IconX,
// } from '@tabler/icons-react';
// import { useEffect, useState } from "react";
// import { BrandName, SearchDrawer } from "./index";
// import { Link, useNavigate } from "react-router-dom";
// import axios from 'axios';

// const useStyles = createStyles((theme) => ({
//   link: {
//     display: 'flex',
//     alignItems: 'center',
//     height: '100%',
//     paddingLeft: theme.spacing.md,
//     paddingRight: theme.spacing.md,
//     textDecoration: 'none',
//     color: theme.colorScheme === 'dark' ? theme.white : theme.black,
//     fontWeight: 500,
//     fontSize: theme.fontSizes.sm,

//     [theme.fn.smallerThan('md')]: {
//       height: rem(42),
//       display: 'flex',
//       alignItems: 'center',
//       width: '100%',
//     },

//     '&:hover': {
//       backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.primary[6],
//       color: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
//       fontWeight: 600,

//       [`& .${getStylesRef('icon')}`]: {
//         color: theme.colorScheme === 'dark' ? theme.black : theme.white,
//       },
//     },
//   },

//   subLink: {
//     width: '100%',
//     padding: `${theme.spacing.xs} ${theme.spacing.md}`,
//     borderRadius: theme.radius.md,

//     ...theme.fn.hover({
//       backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.primary[0],
//     }),

//     '&:active': theme.activeStyles,
//   },

//   dropdownFooter: {
//     backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
//     margin: `calc(${theme.spacing.md} * -1)`,
//     marginTop: theme.spacing.sm,
//     padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
//     paddingBottom: theme.spacing.xl,
//     borderTop: `${rem(1)} solid ${
//       theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
//     }`,
//   },

//   title: {
//     textAlign: 'center',
//     fontWeight: 800,
//     fontSize: rem(40),
//     letterSpacing: -1,
//     color: theme.colorScheme === 'dark' ? theme.white : theme.black,
//     marginBottom: theme.spacing.xs,

//     [theme.fn.smallerThan('sm')]: {
//       fontSize: rem(28),
//       textAlign: 'left',
//     },
//   },

//   highlight: {
//     color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6],
//   },

//   linkIcon: {
//     ref: getStylesRef('icon'),
//     color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.secondary[6],
//   },

//   hiddenMobile: {
//     [theme.fn.smallerThan('md')]: {
//       display: 'none',
//     },
//   },

//   hiddenDesktop: {
//     [theme.fn.largerThan('md')]: {
//       display: 'none',
//     },
//   },

//   userButton: {
//     display: 'block',
//     padding: theme.spacing.xs,
//     borderRadius: theme.radius.sm,
//     color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

//     '&:hover': {
//       backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
//     },
//   },

//   mobileDropdown: {
//     [theme.fn.largerThan('md')]: {
//       display: 'none',
//     },
//   },
// }));

// const mockdata = [
//   {
//     icon: IconClipboardHeart,
//     title: 'Medical',
//   },
//   {
//     icon: IconSos,
//     title: 'Emergency',
//   },
//   {
//     icon: IconLeaf,
//     title: 'Environment',
//   },
//   {
//     icon: IconHeartHandshake,
//     title: 'Nonprofit',
//   },
//   {
//     icon: IconReportMoney,
//     title: 'Financial emergency',
//   },
//   {
//     icon: IconCat,
//     title: 'Animals',
//   },
//   {
//     icon: IconFireHydrant,
//     title: 'Crisis Relief',
//   },
//   {
//     icon: IconAugmentedReality,
//     title: 'Technology',
//   },
//   {
//     icon: IconDeviceTv,
//     title: 'Film & Videos',
//   },
// ];

// interface IProps extends BoxProps {
//   compressed?: boolean;
// }

// const LandingNavbar = ({ compressed }: IProps) => {
//   const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
//   const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
//   const [searchOpened, { toggle: toggleSearchDrawer, close: closeSearchDrawer }] = useDisclosure(false);
//   const [roleRequestOpened, { toggle: toggleRoleRequest }] = useDisclosure(false);
//   const [loading, setLoading] = useState(false);
//   const [notification, setNotification] = useState<{
//     show: boolean;
//     success: boolean;
//     message: string;
//   }>({ show: false, success: false, message: '' });
//   const { classes, theme } = useStyles();
//   const [stickyClass, setStickyClass] = useState(false);
//   const matchesMobile = useMediaQuery('(max-width: 768px)');
//   const navigate = useNavigate();

//   // User state management
//   const isLoggedIn = localStorage.getItem('token');
//   const userId = localStorage.getItem('userId');
//   const userName = localStorage.getItem('userName') || 'User';
  
//   const userRole = localStorage.getItem('role') || 'user';
//   const requestRoleStatus = localStorage.getItem('requestRoleStatus');

//   const links = mockdata.map((item) => (
//     <UnstyledButton className={classes.subLink} key={item.title}>
//       <Group noWrap align="center">
//         <ThemeIcon size={34} variant="default" radius="md">
//           <item.icon size={rem(22)} stroke={1.5} color={theme.fn.primaryColor()} />
//         </ThemeIcon>
//         <div>
//           <Text size="sm" fw={500}>
//             {item.title}
//           </Text>
//         </div>
//       </Group>
//     </UnstyledButton>
//   ));

//   const buttonProps: ButtonProps = {
//     variant: "subtle",
//     radius: matchesMobile ? 'sm' : 0,
//   };

//   const stickNavbar = () => {
//     if (window !== undefined) {
//       const windowHeight = window.scrollY;
//       windowHeight > 240 ? setStickyClass(true) : setStickyClass(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userName');
//     localStorage.removeItem('userId');
//     localStorage.removeItem('role');
//     localStorage.removeItem('requestRoleStatus');
//     navigate('/login');
//   };

//   const requestRole = async (role: 'investor' | 'organizer') => {
//     try {
//       setLoading(true);
//       const response = await axios.post(
//         'http://localhost:5000/api/auth/request-role',
//         { userId, role },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//       );

//       localStorage.setItem('requestRoleStatus', 'pending');
//       setNotification({
//         show: true,
//         success: true,
//         message: `Successfully requested ${role} role. Waiting for admin approval.`,
//       });
//       toggleRoleRequest();
//     } catch (error: any) {
//       setNotification({
//         show: true,
//         success: false,
//         message: error.response?.data?.message || 'Failed to request role',
//       });
//     } finally {
//       setLoading(false);
//       setTimeout(() => setNotification({ ...notification, show: false }), 5000);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('scroll', stickNavbar);
//     return () => {
//       window.removeEventListener('scroll', stickNavbar);
//     };
//   }, []);

//   return (
//     <Box
//       mt={compressed ? (stickyClass ? 0 : 'xl') : 0}
//       sx={{
//         transition: 'all ease 150ms',
//         position: 'fixed',
//         top: '3%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         zIndex: 2,
//         margin: 'auto',
//         width: compressed ? (stickyClass ? '100%' : '85%') : '100%',
//         boxShadow: theme.shadows.sm,
//       }}
//     >
//       {notification.show && (
//         <Notification
//           icon={notification.success ? <IconCheck size={18} /> : <IconX size={18} />}
//           color={notification.success ? 'teal' : 'red'}
//           title={notification.success ? 'Success' : 'Error'}
//           onClose={() => setNotification({ ...notification, show: false })}
//           sx={{
//             position: 'fixed',
//             top: 20,
//             right: 20,
//             zIndex: 1000,
//             width: 300,
//           }}
//         >
//           {notification.message}
//         </Notification>
//       )}

//       <Header
//         height={60}
//         px="md"
//         sx={{
//           backgroundColor: stickyClass ? 'rgba(255, 255, 255, 0.9)' : theme.white,
//           backdropFilter: 'blur(4px)',
//           borderRadius: stickyClass ? 0 : theme.radius.sm,
//         }}
//       >
//         <Container size="lg" fluid={compressed} sx={{ height: '100%' }}>
//           <Flex justify="space-between" align="center" sx={{ height: '100%' }}>
//             <BrandName size={28} asLink />
//             <Flex align="center" gap="xs" sx={{ height: '100%' }} className={classes.hiddenMobile}>
//               <Button component={Link} to="/how-it-works" className={classes.link} {...buttonProps}>
//                 How it works
//               </Button>
//               <Button component={Link} to="/campaigns" className={classes.link} {...buttonProps}>
//                 Campaigns
//               </Button>
//               <HoverCard width={700} position="bottom" radius="sm" shadow="md" withinPortal>
//                 <HoverCard.Target>
//                   <a href="#" className={classes.link}>
//                     <Center inline>
//                       <Box component="span" mr={5}>
//                         Invest
//                       </Box>
//                       <IconChevronDown size={18} className={classes.linkIcon} />
//                     </Center>
//                   </a>
//                 </HoverCard.Target>

//                 <HoverCard.Dropdown sx={{ overflow: 'hidden' }}>
//                   <Group position="apart" px="md">
//                     <Text fw={500} color="dark">
//                       Categories
//                     </Text>
//                     <Button variant="default">See all</Button>
//                   </Group>

//                   <Divider
//                     my="sm"
//                     mx="-md"
//                     color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
//                   />

//                   <SimpleGrid cols={3} spacing={0}>
//                     {links}
//                   </SimpleGrid>
//                 </HoverCard.Dropdown>
//               </HoverCard>
//               <Button
//                 leftIcon={<IconSearch size={18} className={classes.linkIcon} />}
//                 onClick={toggleSearchDrawer}
//                 className={classes.link}
//                 {...buttonProps}
//               >
//                 Search
//               </Button>

//               {isLoggedIn ? (
//                 <HoverCard
//                   width={200}
//                   position="bottom"
//                   withArrow
//                   shadow="md"
//                   opened={roleRequestOpened}
//                   onClose={toggleRoleRequest}
//                 >
//                   <HoverCard.Target>
//                     <UnstyledButton className={classes.userButton} onClick={toggleRoleRequest}>
//                       <Group spacing={7}>
//                         <Avatar radius="xl" size={20} />
//                         <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
//                           {userName},{userId}
//                         </Text>
//                         <IconChevronDown size={12} />
//                       </Group>
//                     </UnstyledButton>
//                   </HoverCard.Target>
//                   <HoverCard.Dropdown>
//                     <LoadingOverlay visible={loading} overlayBlur={2} />

//                     <Button
//                       variant="light"
//                       fullWidth
//                       component={Link}
//                       to="/dashboard"
//                       leftIcon={<IconDashboard size={16} />}
//                     >
//                       Dashboard
//                     </Button>

//                     {userRole === 'user' && !requestRoleStatus && (
//                       <>
//                         <Button
//                           variant="light"
//                           fullWidth
//                           mt="sm"
//                           onClick={() => requestRole('organizer')}
//                           leftIcon={<IconUsers size={16} />}
//                         >
//                           Become Organizer
//                         </Button>
//                         <Button
//                           variant="light"
//                           fullWidth
//                           mt="sm"
//                           onClick={() => requestRole('investor')}
//                           leftIcon={<IconReportMoney size={16} />}
//                         >
//                           Become Investor
//                         </Button>
//                       </>
//                     )}

//                     {requestRoleStatus === 'pending' && (
//                       <Text size="sm" color="dimmed" mt="sm" align="center">
//                         Role request pending approval
//                       </Text>
//                     )}

//                     {userRole === 'organizer' && (
//                       <Button
//                         variant="light"
//                         fullWidth
//                         mt="sm"
//                         component={Link}
//                         to="/create-campaign"
//                         leftIcon={<IconPlus size={16} />}
//                       >
//                         Start Campaign
//                       </Button>
//                     )}

//                     {userRole === 'investor' && (
//                       <Button
//                         variant="light"
//                         fullWidth
//                         mt="sm"
//                         component={Link}
//                         to="/investor-dashboard"
//                         leftIcon={<IconDashboard size={16} />}
//                       >
//                         Investor Portal
//                       </Button>
//                     )}

//                     <Divider my="sm" />
//                     <Button
//                       variant="outline"
//                       fullWidth
//                       mt="sm"
//                       onClick={handleLogout}
//                       leftIcon={<IconLogout size={16} />}
//                     >
//                       Logout
//                     </Button>
//                   </HoverCard.Dropdown>
//                 </HoverCard>
//               ) : (
//                 <Button component={Link} to="/login" className={classes.link} {...buttonProps}>
//                   Login
//                 </Button>
//               )}
//             </Flex>
//             <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
//           </Flex>
//         </Container>
//       </Header>

//       <Drawer
//         opened={drawerOpened}
//         onClose={closeDrawer}
//         size="100%"
//         padding="md"
//         title="Navigation"
//         className={classes.hiddenDesktop}
//         zIndex={1000000}
//       >
//         <ScrollArea h={`calc(100vh - ${rem(0)})`} mx="-md">
//           <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

//           <Button component={Link} to="/" className={classes.link} {...buttonProps}>
//             Home
//           </Button>
//           <Button component={Link} to="/how-it-works" className={classes.link} {...buttonProps}>
//             How it works
//           </Button>
//           <Button component={Link} to="/campaigns" className={classes.link} {...buttonProps}>
//             Campaigns
//           </Button>
//           <UnstyledButton className={classes.link} onClick={toggleLinks}>
//             <Center inline>
//               <Box component="span" mr={5}>
//                 Invest
//               </Box>
//               <IconChevronDown size={16} className={classes.linkIcon} />
//             </Center>
//           </UnstyledButton>
//           <Collapse in={linksOpened}>{links}</Collapse>

//           {isLoggedIn ? (
//             <Box mt="md">
//               <LoadingOverlay visible={loading} overlayBlur={2} />

//               <Button
//                 fullWidth
//                 component={Link}
//                 to="/dashboard"
//                 leftIcon={<IconDashboard size={16} />}
//                 className={classes.link}
//                 {...buttonProps}
//               >
//                 Dashboard
//               </Button>

//               {userRole === 'user' && !requestRoleStatus && (
//                 <>
//                   <Button
//                     fullWidth
//                     mt="sm"
//                     onClick={() => requestRole('organizer')}
//                     leftIcon={<IconUsers size={16} />}
//                     className={classes.link}
//                     {...buttonProps}
//                   >
//                     Become Organizer
//                   </Button>
//                   <Button
//                     fullWidth
//                     mt="sm"
//                     onClick={() => requestRole('investor')}
//                     leftIcon={<IconReportMoney size={16} />}
//                     className={classes.link}
//                     {...buttonProps}
//                   >
//                     Become Investor
//                   </Button>
//                 </>
//               )}

//               {requestRoleStatus === 'pending' && (
//                 <Text size="sm" color="dimmed" mt="sm" align="center">
//                   Role request pending approval
//                 </Text>
//               )}

//               {userRole === 'organizer' && (
//                 <Button
//                   fullWidth
//                   mt="sm"
//                   component={Link}
//                   to="/create-campaign"
//                   leftIcon={<IconPlus size={16} />}
//                   className={classes.link}
//                   {...buttonProps}
//                 >
//                   Start Campaign
//                 </Button>
//               )}

//               {userRole === 'investor' && (
//                 <Button
//                   fullWidth
//                   mt="sm"
//                   component={Link}
//                   to="/investor-dashboard"
//                   leftIcon={<IconDashboard size={16} />}
//                   className={classes.link}
//                   {...buttonProps}
//                 >
//                   Investor Portal
//                 </Button>
//               )}

//               <Button
//                 fullWidth
//                 mt="sm"
//                 onClick={handleLogout}
//                 leftIcon={<IconLogout size={16} />}
//                 variant="outline"
//               >
//                 Logout
//               </Button>
//             </Box>
//           ) : (
//             <Button
//               fullWidth
//               mt="md"
//               component={Link}
//               to="/login"
//               className={classes.link}
//               {...buttonProps}
//             >
//               Login
//             </Button>
//           )}

//           <Button
//             leftIcon={<IconSearch size={18} />}
//             onClick={() => {
//               closeDrawer();
//               toggleSearchDrawer();
//             }}
//             className={classes.link}
//             {...buttonProps}
//             fullWidth
//             mt="md"
//           >
//             Search
//           </Button>
//         </ScrollArea>
//       </Drawer>

//       <SearchDrawer opened={searchOpened} onClose={closeSearchDrawer} />
//     </Box>
//   );
// };

// export default LandingNavbar;

import {
  Box,
  BoxProps,
  Burger,
  Button, 
  ButtonProps,
  Center,
  Collapse,
  Container,
  createStyles,
  Divider,
  Drawer,
  Flex,
  getStylesRef,
  Group,
  Header,
  HoverCard,
  rem,
  ScrollArea,
  SimpleGrid,
  Text,
  ThemeIcon,
  UnstyledButton,
  Avatar,
  LoadingOverlay,
  Notification,
  FileInput,
  Modal,
  TextInput,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
  IconAugmentedReality,
  IconCat,
  IconChevronDown,
  IconClipboardHeart,
  IconDeviceTv,
  IconFireHydrant,
  IconHeartHandshake,
  IconLeaf,
  IconReportMoney,
  IconSearch,
  IconSos,
  IconDashboard,
  IconPlus,
  IconUsers,
  IconLogout,
  IconCheck,
  IconX,
  IconUser,
  IconPhoto,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { BrandName, SearchDrawer } from './index';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface UserProfile {
  picture?: string;
  address?: string;
  state?: string;
  country?: string;
  bankDetails?: {
    accountNumber?: string;
    bankName?: string;
    ifscCode?: string;
  };
}

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  isApproved: boolean;
  profile?: UserProfile;
}

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('md')]: {
      height: rem(42),
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.primary[6],
      color: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      fontWeight: 600,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.black : theme.white,
      },
    },
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.primary[0],
    }),

    '&:active': theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  title: {
    textAlign: 'center',
    fontWeight: 800,
    fontSize: rem(40),
    letterSpacing: -1,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(28),
      textAlign: 'left',
    },
  },

  highlight: {
    color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6],
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.secondary[6],
  },

  hiddenMobile: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('md')]: {
      display: 'none',
    },
  },

  userButton: {
    display: 'block',
    padding: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  mobileDropdown: {
    [theme.fn.largerThan('md')]: {
      display: 'none',
    },
  },
}));

const mockdata = [
  {
    icon: IconClipboardHeart,
    title: 'Medical',
  },
  {
    icon: IconSos,
    title: 'Emergency',
  },
  {
    icon: IconLeaf,
    title: 'Environment',
  },
  {
    icon: IconHeartHandshake,
    title: 'Nonprofit',
  },
  {
    icon: IconReportMoney,
    title: 'Financial emergency',
  },
  {
    icon: IconCat,
    title: 'Animals',
  },
  {
    icon: IconFireHydrant,
    title: 'Crisis Relief',
  },
  {
    icon: IconAugmentedReality,
    title: 'Technology',
  },
  {
    icon: IconDeviceTv,
    title: 'Film & Videos',
  },
];

interface IProps extends BoxProps {
  compressed?: boolean;
}

const LandingNavbar = ({ compressed }: IProps) => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const [searchOpened, { toggle: toggleSearchDrawer, close: closeSearchDrawer }] = useDisclosure(false);
  const [roleRequestOpened, { toggle: toggleRoleRequest }] = useDisclosure(false);
  const [profileModalOpened, { open: openProfileModal, close: closeProfileModal }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [profileData, setProfileData] = useState<UserProfile>({});
  const [userData, setUserData] = useState<UserData | null>(null);
  const [notification, setNotification] = useState<{
    show: boolean;
    success: boolean;
    message: string;
  }>({ show: false, success: false, message: '' });
  const { classes, theme } = useStyles();
  const [stickyClass, setStickyClass] = useState(false);
  const matchesMobile = useMediaQuery('(max-width: 768px)');
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('token');
  const userId = localStorage.getItem('userId') || '';
  const userName = localStorage.getItem('userName') || 'User';
  const userRole = localStorage.getItem('role') || 'user';
  const requestRoleStatus = localStorage.getItem('requestRoleStatus');

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserProfile();
    }
  }, [isLoggedIn]);

  const fetchUserProfile = async () => {
    try {
      setProfileLoading(true);
      const response = await axios.get(`http://localhost:5000/api/auth/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUserData(response.data.user);
      setProfileData(response.data.user.profile || {});
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('profilePicture', file);

      const response = await axios.post(
        'http://localhost:5000/api/auth/profile/picture',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setUserData(response.data.user);
      setNotification({
        show: true,
        success: true,
        message: 'Profile picture updated successfully',
      });
      closeProfileModal();
    } catch (error) {
      setNotification({
        show: true,
        success: false,
        message: 'Failed to upload profile picture',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        'http://localhost:5000/api/auth/profile',
        {
          name: userData?.name,
          address: profileData?.address,
          state: profileData?.state,
          country: profileData?.country,
          accountNumber: profileData?.bankDetails?.accountNumber,
          bankName: profileData?.bankDetails?.bankName,
          ifscCode: profileData?.bankDetails?.ifscCode,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setUserData(response.data.user);
      setProfileData(response.data.user.profile || {});
      setNotification({
        show: true,
        success: true,
        message: 'Profile updated successfully',
      });
      closeProfileModal();
    } catch (error) {
      setNotification({
        show: true,
        success: false,
        message: 'Failed to update profile',
      });
    } finally {
      setLoading(false);
    }
  };

  const requestRole = async (role: 'investor' | 'organizer') => {
    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:5000/api/auth/request-role',
        { userId, role },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      localStorage.setItem('requestRoleStatus', 'pending');
      setNotification({
        show: true,
        success: true,
        message: `Successfully requested ${role} role. Waiting for admin approval.`,
      });
      toggleRoleRequest();
    } catch (error: any) {
      setNotification({
        show: true,
        success: false,
        message: error.response?.data?.message || 'Failed to request role',
      });
    } finally {
      setLoading(false);
      setTimeout(() => setNotification({ ...notification, show: false }), 5000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('requestRoleStatus');
    navigate('/login');
  };

  const stickNavbar = () => {
    if (typeof window !== 'undefined') {
      const windowHeight = window.scrollY;
      windowHeight > 240 ? setStickyClass(true) : setStickyClass(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', stickNavbar);
    return () => {
      window.removeEventListener('scroll', stickNavbar);
    };
  }, []);

  const buttonProps: ButtonProps = {
    variant: 'subtle',
    radius: matchesMobile ? 'sm' : 0,
  };

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group noWrap align="center">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={rem(22)} stroke={1.5} color={theme.fn.primaryColor()} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box
      mt={compressed ? (stickyClass ? 0 : 'xl') : 0}
      sx={{
        transition: 'all ease 150ms',
        position: 'fixed',
        top: '3%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
        margin: 'auto',
        width: compressed ? (stickyClass ? '100%' : '85%') : '100%',
        boxShadow: theme.shadows.sm,
      }}
    >
      {notification.show && (
        <Notification
          icon={notification.success ? <IconCheck size={18} /> : <IconX size={18} />}
          color={notification.success ? 'teal' : 'red'}
          title={notification.success ? 'Success' : 'Error'}
          onClose={() => setNotification({ ...notification, show: false })}
          sx={{
            position: 'fixed',
            top: 20,
            right: 20,
            zIndex: 1000,
            width: 300,
          }}
        >
          {notification.message}
        </Notification>
      )}

      <Header
        height={60}
        px="md"
        sx={{
          backgroundColor: stickyClass ? 'rgba(255, 255, 255, 0.9)' : theme.white,
          backdropFilter: 'blur(4px)',
          borderRadius: stickyClass ? 0 : theme.radius.sm,
        }}
      >
        <Container size="lg" fluid={compressed} sx={{ height: '100%' }}>
          <Flex justify="space-between" align="center" sx={{ height: '100%' }}>
            <BrandName size={28} asLink />
            <Flex align="center" gap="xs" sx={{ height: '100%' }} className={classes.hiddenMobile}>
              <Button component={Link} to="/how-it-works" className={classes.link} {...buttonProps}>
                How it works
              </Button>
              <Button component={Link} to="/campaigns" className={classes.link} {...buttonProps}>
                Campaigns
              </Button>
              <HoverCard width={700} position="bottom" radius="sm" shadow="md" withinPortal>
                <HoverCard.Target>
                  <a href="#" className={classes.link}>
                    <Center inline>
                      <Box component="span" mr={5}>
                        Invest
                      </Box>
                      <IconChevronDown size={18} className={classes.linkIcon} />
                    </Center>
                  </a>
                </HoverCard.Target>

                <HoverCard.Dropdown sx={{ overflow: 'hidden' }}>
                  <Group position="apart" px="md">
                    <Text fw={500} color="dark">
                      Categories
                    </Text>
                    <Button variant="default">See all</Button>
                  </Group>

                  <Divider
                    my="sm"
                    mx="-md"
                    color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
                  />

                  <SimpleGrid cols={3} spacing={0}>
                    {links}
                  </SimpleGrid>
                </HoverCard.Dropdown>
              </HoverCard>
              <Button
                leftIcon={<IconSearch size={18} className={classes.linkIcon} />}
                onClick={toggleSearchDrawer}
                className={classes.link}
                {...buttonProps}
              >
                Search
              </Button>

              {isLoggedIn ? (
                <HoverCard
                  width={200}
                  position="bottom"
                  withArrow
                  shadow="md"
                  opened={roleRequestOpened}
                  onClose={toggleRoleRequest}
                >
                  <HoverCard.Target>
                    <UnstyledButton className={classes.userButton} onClick={toggleRoleRequest}>
                      <Group spacing={7}>
                        <Avatar 
                          src={userData?.profile?.picture} 
                          radius="xl" 
                          size={20} 
                        />
                        <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                          {userName}
                        </Text>
                        <IconChevronDown size={12} />
                      </Group>
                    </UnstyledButton>
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    <LoadingOverlay visible={loading} overlayBlur={2} />

                    <Button
                      variant="light"
                      fullWidth
                      onClick={openProfileModal}
                      leftIcon={<IconUser size={16} />}
                    >
                      My Profile
                    </Button>

                    <Button
                      variant="light"
                      fullWidth
                      mt="sm"
                      component={Link}
                      to="/dashboard"
                      leftIcon={<IconDashboard size={16} />}
                    >
                      Dashboard
                    </Button>

                    {userRole === 'user' && !requestRoleStatus && (
                      <>
                        <Button
                          variant="light"
                          fullWidth
                          mt="sm"
                          onClick={() => requestRole('organizer')}
                          leftIcon={<IconUsers size={16} />}
                        >
                          Become Organizer
                        </Button>
                        <Button
                          variant="light"
                          fullWidth
                          mt="sm"
                          onClick={() => requestRole('investor')}
                          leftIcon={<IconReportMoney size={16} />}
                        >
                          Become Investor
                        </Button>
                      </>
                    )}

                    {requestRoleStatus === 'pending' && (
                      <Text size="sm" color="dimmed" mt="sm" align="center">
                        Role request pending approval
                      </Text>
                    )}

                    {userRole === 'organizer' && (
                      <Button
                        variant="light"
                        fullWidth
                        mt="sm"
                        component={Link}
                        to="/create-campaign"
                        leftIcon={<IconPlus size={16} />}
                      >
                        Start Campaign
                      </Button>
                    )}

                    {userRole === 'investor' && (
                      <Button
                        variant="light"
                        fullWidth
                        mt="sm"
                        component={Link}
                        to="/investor-dashboard"
                        leftIcon={<IconDashboard size={16} />}
                      >
                        Investor Portal
                      </Button>
                    )}

                    <Divider my="sm" />
                    <Button
                      variant="outline"
                      fullWidth
                      mt="sm"
                      onClick={handleLogout}
                      leftIcon={<IconLogout size={16} />}
                    >
                      Logout
                    </Button>
                  </HoverCard.Dropdown>
                </HoverCard>
              ) : (
                <Button component={Link} to="/login" className={classes.link} {...buttonProps}>
                  Login
                </Button>
              )}
            </Flex>
            <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
          </Flex>
        </Container>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(0)})`} mx="-md">
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <Button component={Link} to="/" className={classes.link} {...buttonProps}>
            Home
          </Button>
          <Button component={Link} to="/how-it-works" className={classes.link} {...buttonProps}>
            How it works
          </Button>
          <Button component={Link} to="/campaigns" className={classes.link} {...buttonProps}>
            Campaigns
          </Button>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Invest
              </Box>
              <IconChevronDown size={16} className={classes.linkIcon} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>

          {isLoggedIn ? (
            <Box mt="md">
              <LoadingOverlay visible={loading} overlayBlur={2} />

              <Button
                fullWidth
                component={Link}
                to="/dashboard"
                leftIcon={<IconDashboard size={16} />}
                className={classes.link}
                {...buttonProps}
              >
                Dashboard
              </Button>

              {userRole === 'user' && !requestRoleStatus && (
                <>
                  <Button
                    fullWidth
                    mt="sm"
                    onClick={() => requestRole('organizer')}
                    leftIcon={<IconUsers size={16} />}
                    className={classes.link}
                    {...buttonProps}
                  >
                    Become Organizer
                  </Button>
                  <Button
                    fullWidth
                    mt="sm"
                    onClick={() => requestRole('investor')}
                    leftIcon={<IconReportMoney size={16} />}
                    className={classes.link}
                    {...buttonProps}
                  >
                    Become Investor
                  </Button>
                </>
              )}

              {requestRoleStatus === 'pending' && (
                <Text size="sm" color="dimmed" mt="sm" align="center">
                  Role request pending approval
                </Text>
              )}

              {userRole === 'organizer' && (
                <Button
                  fullWidth
                  mt="sm"
                  component={Link}
                  to="/create-campaign"
                  leftIcon={<IconPlus size={16} />}
                  className={classes.link}
                  {...buttonProps}
                >
                  Start Campaign
                </Button>
              )}

              {userRole === 'investor' && (
                <Button
                  fullWidth
                  mt="sm"
                  component={Link}
                  to="/investor-dashboard"
                  leftIcon={<IconDashboard size={16} />}
                  className={classes.link}
                  {...buttonProps}
                >
                  Investor Portal
                </Button>
              )}

              <Button
                fullWidth
                mt="sm"
                onClick={handleLogout}
                leftIcon={<IconLogout size={16} />}
                variant="outline"
              >
                Logout
              </Button>
            </Box>
          ) : (
            <Button
              fullWidth
              mt="md"
              component={Link}
              to="/login"
              className={classes.link}
              {...buttonProps}
            >
              Login
            </Button>
          )}

          <Button
            leftIcon={<IconSearch size={18} />}
            onClick={() => {
              closeDrawer();
              toggleSearchDrawer();
            }}
            className={classes.link}
            {...buttonProps}
            fullWidth
            mt="md"
          >
            Search
          </Button>
        </ScrollArea>
      </Drawer>

      <Modal
        opened={profileModalOpened}
        onClose={closeProfileModal}
        title="My Profile"
        size="lg"
      >
        <LoadingOverlay visible={profileLoading} overlayBlur={2} />
        
        <FileInput
          label="Profile Picture"
          placeholder="Upload your profile picture"
          icon={<IconPhoto size={14} />}
          accept="image/png,image/jpeg"
          value={file}
          onChange={setFile}
        />

        {userData?.profile?.picture && !file && (
          <Box mt="sm">
            <Text size="sm" weight={500}>Current Picture:</Text>
            <Avatar 
              src={userData.profile.picture} 
              size="xl" 
              radius="xl" 
              mt="sm"
            />
          </Box>
        )}

        <Button 
          fullWidth 
          mt="md" 
          onClick={handleFileUpload}
          loading={loading}
          disabled={!file}
        >
          Upload Picture
        </Button>

        <Divider my="md" />

        <TextInput
          label="Name"
          value={userData?.name || ''}
          onChange={(e) => setUserData({...userData!, name: e.target.value})}
          mt="md"
        />

        <TextInput
          label="Address"
          value={profileData?.address || ''}
          onChange={(e) => setProfileData({...profileData, address: e.target.value})}
          mt="md"
        />

        <Group grow mt="md">
          <TextInput
            label="State"
            value={profileData?.state || ''}
            onChange={(e) => setProfileData({...profileData, state: e.target.value})}
          />
          <TextInput
            label="Country"
            value={profileData?.country || ''}
            onChange={(e) => setProfileData({...profileData, country: e.target.value})}
          />
        </Group>

        <Text size="sm" weight={500} mt="md">Bank Details</Text>
        <TextInput
          label="Account Number"
          value={profileData?.bankDetails?.accountNumber || ''}
          onChange={(e) => setProfileData({
            ...profileData, 
            bankDetails: {
              ...profileData.bankDetails,
              accountNumber: e.target.value
            }
          })}
          mt="sm"
        />

        <Group grow mt="sm">
          <TextInput
            label="Bank Name"
            value={profileData?.bankDetails?.bankName || ''}
            onChange={(e) => setProfileData({
              ...profileData, 
              bankDetails: {
                ...profileData.bankDetails,
                bankName: e.target.value
              }
            })}
          />
          <TextInput
            label="IFSC Code"
            value={profileData?.bankDetails?.ifscCode || ''}
            onChange={(e) => setProfileData({
              ...profileData, 
              bankDetails: {
                ...profileData.bankDetails,
                ifscCode: e.target.value
              }
            })}
          />
        </Group>

        <Button 
          fullWidth 
          mt="md" 
          onClick={updateProfile}
          loading={loading}
        >
          Save Profile
        </Button>
      </Modal>

      <SearchDrawer opened={searchOpened} onClose={closeSearchDrawer} />
    </Box>
  );
};

export default LandingNavbar;