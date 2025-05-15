import {
    Box,
    Button,
    Card,
    Container,
    createStyles,
    Flex,
    Group,
    Paper,
    PaperProps,
    rem,
    SimpleGrid,
    Stack,
    Text,
    Title,
    TitleProps
} from "@mantine/core";
import {
    IconArrowDownRight,
    IconArrowUpRight,
    IconFunction,
    IconPlus,
    IconReceipt2,
    IconTrophy
} from "@tabler/icons-react";
import {CampaignsTable, DonatorsTable, YearlyDonationChart} from "../components";
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import CampaignStats from "./adminPanel/CampaignStats";

const useStyles = createStyles((theme) => ({
    root: {
        padding: `calc(${theme.spacing.xl} * 1.5)`,
    },

    value: {
        fontSize: rem(24),
        fontWeight: 700,
        lineHeight: 1,
    },

    diff: {
        lineHeight: 1,
        display: 'flex',
        alignItems: 'center',
    },

    icon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
    },

    title: {
        fontWeight: 700,
        textTransform: 'uppercase',
    },
}));

const DashboardPage = () => {
    const {classes} = useStyles();

    const paperProps: PaperProps = {
        p: "md",
        shadow: "sm"
    }

    const subTitleProps: TitleProps = {
        size: 18,
        mb: "sm"
    }

    return (
        <>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <Box>
                <Container fluid my="xl">
                    <Stack spacing="xl">
                        
                        <SimpleGrid
                            cols={4}
                            breakpoints={[{maxWidth: 'md', cols: 2, spacing: 'md'}, {
                                maxWidth: 'sm',
                                cols: 1,
                                spacing: 'sm'
                            }]}
                        >
                                 </SimpleGrid>
                            <CampaignStats/>
                       
                        {/* // */}
                        <Paper {...paperProps}>
                            <Card.Section mb="lg">
                                <Flex align="center" justify="space-between">
                                    <Box>
                                        <Title {...subTitleProps}>Campaigns</Title>
                                        <Text size="sm">Let&apos;s manage your campaigns</Text>
                                    </Box>
                                    <Button
                                        leftIcon={<IconPlus size={18}/>}
                                        component={Link}
                                        to="/create-campaign"
                                    >
                                        Create a Campaign
                                    </Button>
                                </Flex>
                            </Card.Section>
                            <Card.Section>
                                <CampaignsTable/>
                            </Card.Section>
                        </Paper>
                       
                        <Paper {...paperProps}>
                            <Title {...subTitleProps}>Donations per Category</Title>
                            <YearlyDonationChart/>
                        </Paper>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

export default DashboardPage;
