import { ActionIcon,   Avatar, Box, BoxProps, Burger, Button, Divider, Container, createStyles, Drawer, Group, Header, Menu, rem, ScrollArea, Text, UnstyledButton, FileInput, Modal, TextInput, LoadingOverlay, Notification,} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
    IconBell,
    IconChevronDown,
    IconHeart,
    IconLogout,
    IconMessage,
    IconSearch,
    IconSettings,
    IconStar,
    IconUser,
    IconPhoto,
    IconCheck,
    IconX,
} from '@tabler/icons-react';
import { useState, useEffect } from "react";
import { AppLinks, BrandName, SearchDrawer } from "./index";
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
    header: {
        backgroundColor: theme.colors.primary[6]
    },

    user: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[0],
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        transition: 'background-color 100ms ease',

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.primary[7],
            color: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        },

        [theme.fn.smallerThan('sm')]: {
            padding: 4
        },
    },

    userActive: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },

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

        [theme.fn.smallerThan('sm')]: {
            height: rem(42),
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        },

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.primary[0],
        }),
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

    drawerHeader: {
        backgroundColor: theme.colors.primary[6],
        color: theme.white
    },

    close: {
        color: theme.white
    },

    profileModal: {
        '.mantine-Modal-title': {
            fontWeight: 600,
            fontSize: rem(20),
        }
    }
}));

const ICON_SIZE = 18;

type IProps = BoxProps;

const AppNavbar = ({...others}: IProps) => {
    const { classes, theme, cx } = useStyles();
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [searchOpened, { toggle: toggleSearchDrawer, close: closeSearchDrawer }] = useDisclosure(false);
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
    const matchesMobile = useMediaQuery('(max-width: 600px)');

 
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserProfile();
        }
    }, []);

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

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        window.location.href = '/login';
    };

    return (
        <Box {...others}>
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
                height={{base: 50, md: 70}}
                className={classes.header}
            >
                <Container
                    fluid
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                    }}
                >
                    <Burger
                        opened={drawerOpened}
                        onClick={toggleDrawer}
                        className={classes.hiddenDesktop}
                        color="white"
                    />

                    <Group position="apart" sx={{width: '100%'}}>
                        <Group>
                            <BrandName
                                size={24}
                                ml={matchesMobile ? 'md' : 'xs'}
                                asLink
                                variant="grayscale"
                            />
                            <AppLinks className={classes.hiddenMobile}/>
                        </Group>
                        <Group>
                            <ActionIcon variant="filled" color={theme.white} onClick={toggleSearchDrawer}>
                                <IconSearch size={ICON_SIZE}/>
                            </ActionIcon>
                            <ActionIcon variant="filled" color={theme.white}>
                                <IconBell size={ICON_SIZE}/>
                            </ActionIcon>
                            <Menu
                                width={260}
                                position="bottom-end"
                                transitionProps={{transition: 'pop-top-right'}}
                                onClose={() => setUserMenuOpened(false)}
                                onOpen={() => setUserMenuOpened(true)}
                                withinPortal
                            >
                                <Menu.Target>
                                    <UnstyledButton
                                        className={cx(classes.user, {[classes.userActive]: userMenuOpened})}
                                    >
                                        <Group spacing={7}>
                                            <Avatar
                                                src={userData?.profile?.picture}
                                                alt={userData?.name}
                                                radius="xl"
                                                size={matchesMobile ? 18 : 20}
                                            />
                                            {!matchesMobile &&
                                                <>
                                                    <Text weight={500} size="sm" sx={{lineHeight: 1}} mr={3}>
                                                        {userData?.name || 'User'}
                                                    </Text>
                                                    <IconChevronDown size={rem(12)} stroke={1.5}/>
                                                </>}
                                        </Group>
                                    </UnstyledButton>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item
                                        icon={<IconUser size="0.9rem" stroke={1.5} />}
                                        onClick={openProfileModal}
                                    >
                                        My Profile
                                    </Menu.Item>
                                    <Menu.Item
                                        icon={<IconHeart size="0.9rem" color={theme.colors.red[6]} stroke={1.5} />}
                                    >
                                        Liked posts
                                    </Menu.Item>
                                    <Menu.Item
                                        icon={<IconStar size="0.9rem" color={theme.colors.yellow[6]} stroke={1.5}/>}
                                    >
                                        Saved posts
                                    </Menu.Item>
                                    <Menu.Item
                                        icon={<IconMessage size="0.9rem" color={theme.colors.blue[6]} stroke={1.5}/>}
                                    >
                                        Your comments
                                    </Menu.Item>

                                    <Menu.Label>Settings</Menu.Label>
                                    <Menu.Item icon={<IconSettings size="0.9rem" stroke={1.5}/>}>
                                        Account settings
                                    </Menu.Item>
                                    <Menu.Item
                                        icon={<IconLogout size="0.9rem" stroke={1.5}/>}
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </Group>
                    </Group>
                </Container>
            </Header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Navigation"
                className={classes.hiddenDesktop}
                classNames={{header: classes.drawerHeader, close: classes.close}}
                zIndex={1000000}
            >
                <ScrollArea h={`calc(100vh - ${rem(0)})`} mx="-md" sx={{backgroundColor: theme.colors.primary[6]}}>
                    <AppLinks direction='column'/>
                </ScrollArea>
            </Drawer>

            <Modal
                opened={profileModalOpened}
                onClose={closeProfileModal}
                title="My Profile"
                size="lg"
                classNames={{modal: classes.profileModal}}
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
                    label="Email"
                    value={userData?.email || ''}
                    disabled
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

            <SearchDrawer opened={searchOpened} onClose={closeSearchDrawer}/>
        </Box>
    );
}

export default AppNavbar;