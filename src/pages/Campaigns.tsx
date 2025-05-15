import React, { useState, useEffect } from 'react';
import {
  Box, BoxProps, Container, Flex, Select, SimpleGrid, Stack,
  TextInput, Title, TitleProps
} from "@mantine/core";
import { Helmet } from "react-helmet";
import { useMediaQuery } from "@mantine/hooks";
import axios from 'axios';
import CampaignCard from '../components/CampaignCard'; // Ensure correct import path

const CampaignsPage = (): JSX.Element => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const matchesMobile = useMediaQuery('(max-width: 768px)');

  const boxProps: BoxProps = {
    mt: matchesMobile ? 4 : 24,
    mb: matchesMobile ? 4 : 48,
    py: matchesMobile ? 16 : 24
  };

  const titleProps: TitleProps = {
    size: 32,
    weight: 700,
    mb: "lg",
    transform: 'capitalize',
    sx: { lineHeight: '40px' }
  };

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/campaigns/campaigns');
        setCampaigns(response.data.campaigns); // Fixed access path
        setLoading(false);
      } catch (err) {
        setError('Failed to load campaigns');
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Construct campaign cards
  const items = campaigns.map((campaign) => {
    // Fix image URLs if relative
    const fullImageUrl = campaign.image?.startsWith('/uploads')
      ? `http://localhost:5000${campaign.image}`
      : campaign.image;

    const campaignWithImage = { ...campaign, image: fullImageUrl };

    return (
      <CampaignCard key={campaign._id} data={campaignWithImage} showActions={true} />
    );
  });

  return (
    <>
      <Helmet>
        <title>Discover campaigns to fund</title>
      </Helmet>
      <Box>
        <Container size="lg">
          <Stack>
            <Box {...boxProps}>
              <Title {...titleProps} align="center">Discover campaigns to fund</Title>
            </Box>
            <Flex
              justify="space-between"
              gap={{ base: 'sm', sm: 'lg' }}
              direction={{ base: 'column-reverse', sm: 'row' }}
            >
              <TextInput
                placeholder="search campaigns..."
                sx={{ width: 500 }}
              />
              <Flex align="center" gap="sm" justify={{ base: 'space-between', sm: 'flex-start' }}>
                <Select
                  label=""
                  placeholder="campaigns in"
                  defaultValue=""
                  data={[
                    { value: '10', label: 'show: 10' },
                    { value: '25', label: 'show: 25' },
                    { value: '50', label: 'show: 50' },
                    { value: '100', label: 'show: 100' },
                  ]}
                />
                <Select
                  label=""
                  placeholder="Explore"
                  defaultValue="featured"
                  data={[
                    { value: 'featured', label: 'sort by: featured' },
                    { value: 'popular', label: 'sort by: popular' },
                    { value: 'latest', label: 'sort by: latest' },
                  ]}
                />
              </Flex>
            </Flex>
            <SimpleGrid
              cols={3}
              spacing="lg"
              breakpoints={[
                { maxWidth: 'md', cols: 2, spacing: 'md' },
                { maxWidth: 'sm', cols: 1, spacing: 0 },
              ]}
            >
              {items}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default CampaignsPage;
