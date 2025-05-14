import { Box, BoxProps, TextProps, Title, TitleProps } from '@mantine/core';
import { CampaignCard, TitleBadge } from "../../components";
import { Carousel } from "@mantine/carousel";
import { useEffect, useState } from "react";
import axios from 'axios';

// Define the types for the campaign data
interface ICampaign {
    _id: string;
    title: string;
    description: string;
    fundingGoal: number;
    category: string;
    image: string;
    rewards: Array<{
        tier: string;
        amount: number;
        description: string;
    }>;
    socialLinks: Array<{
        platform: string;
        url: string;
    }>;
    creator: {
        _id: string;
        name: string;
        email: string;
    };
    status: string;
    createdAt: string;
    updatedAt: string;
}

interface IProps {
    boxProps: BoxProps;
    titleProps?: TitleProps;
    subtitleProps?: TextProps;
}

const CampaignsSection = ({ boxProps, titleProps }: IProps) => {
    const [campaigns, setCampaigns] = useState<ICampaign[]>([]); // State to store campaigns
    const [loading, setLoading] = useState<boolean>(true); // State to track loading status
    const [error, setError] = useState<string | null>(null); // State to track error messages

    useEffect(() => {
        // Fetch campaigns from the API
        const fetchCampaigns = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/campaigns/');
                setCampaigns(response.data); // Set the fetched data to state
                setLoading(false);
            } catch (err) {
                setError("Failed to load campaigns.");
                setLoading(false);
            }
        };

        fetchCampaigns(); // Call the function to fetch campaigns
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Render loading state
    }

    if (error) {
        return <div>{error}</div>; // Render error state
    }

    const slides = campaigns.map(c => (
        <Carousel.Slide key={c._id}>
            <CampaignCard data={c} />
        </Carousel.Slide>
    ));

    return (
        <Box {...boxProps}>
            <TitleBadge title="Happening near you" />
            <Title {...titleProps}>Fundraisers in your community</Title>
            <Carousel
                slideSize="45%"
                align="start"
                slideGap="md"
                breakpoints={[
                    { maxWidth: 'md', slideSize: '45%' },
                    { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
                ]}
            >
                {slides}
            </Carousel>
        </Box>
    );
};

export default CampaignsSection;
