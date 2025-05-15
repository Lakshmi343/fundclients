import { useEffect, useState } from "react";
import axios from "axios";
import { Box, BoxProps, TextProps, Title, TitleProps } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { CampaignCard, TitleBadge } from "../../components";

interface IProps {
  boxProps: BoxProps;
  titleProps?: TitleProps;
  subtitleProps?: TextProps;
}

interface Campaign {
  _id: string;
  title: string;
  description: string;
  fundingGoal: number;
  achievedAmount: number;
  dueDate: string;
  country: string;
  category: string;
  image: string;
  rewards: any[];
  socialLinks: any[];
  creator: {
    profile: {
      picture: string;
    };
    name: string;
    email: string;
  };
  status: string;
  investments: {
    investor: string;
    amount: number;
    investedAt: string;
  }[];
  createdAt: string;
}

const CampaignsSection = ({ boxProps, titleProps }: IProps) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/campaigns/campaigns");
        setCampaigns(response.data.campaigns);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchCampaigns();
  }, []);

  const slides = campaigns.map((c) => (
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
          { maxWidth: "md", slideSize: "45%" },
          { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
        ]}
      >
        {slides}
      </Carousel>
    </Box>
  );
};

export default CampaignsSection;
