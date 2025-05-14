import {
  Box,
  BoxProps,
  Button,
  Card,
  createStyles,
  Image,
  PaperProps,
  SimpleGrid,
  Stack,
  Text,
  TextProps,
  Title,
  TitleProps,
} from "@mantine/core";
import { TitleBadge } from "../../components";

const useStyles = createStyles((theme) => ({
  feature: {
    padding: theme.spacing.lg,
    backdropFilter: `blur(16px) saturate(180%)`,
    backgroundColor: `rgba(255, 255, 255, 0.75)`,
    border: `1px solid rgba(209, 213, 219, 0.3)`,
  },
}));

interface FeatureProps extends PaperProps {
  image: string;
  title: string;
  description: string;
  action: string;
}

const mockdata = [
  {
    image: "/images/hands.jpg",
    title: "Community",
    description:
      "Connect with a vibrant, like-minded community of founders and social changemakers who share your vision. Collaborate, learn, and grow together as you amplify your impact, exchange ideas, and drive real-world change. Find your tribe, unite around a common purpose, and unlock the power of collective action to turn your mission into a reality.",
    action: `Check out what's on`,
  },
  {
    image: "/images/work-team-digital-art.jpg",
    title: "Education",
    description: `Turn your dream project or social enterprise into reality. Gain the insights, tools, and guidance you need to succeed—while avoiding common pitfalls—by joining one of our programs and building alongside a supportive community of fellow founders.`,
    action: "Learn more about upcoming programs and opportunities",
  },
  {
    image: "/images/crowdfund.jpg",
    title: "Crowdfunding",
    description: `Ready to gather the support you need to make an impact? FundHarbor offers project-based, recurring, and debt crowdfunding solutions — and we’ll work with you to craft a compelling campaign that maximizes your chances of success.`,
    action: "See crowdfunding options",
  },
  {
    image: "/images/partnership.jpg",
    title: "Partnerships",
    description: `FundHarbor collaborates with top brands, institutions, and governments to empower changemakers. Through challenges, accelerators, and tailored funding programs, we help turn bold ideas into real-world impact—faster."`,
    action: "Find out how we can work together ",
  },
];

function Feature({ image, title, description, action }: FeatureProps) {
  const { classes, cx } = useStyles();

  return (
    <Card className={cx(classes.feature, "card")} shadow="md" radius="sm">
      <Card.Section>
        <Image src={image} height={240} fit="cover" />
      </Card.Section>
      <Stack spacing="sm" mt="md">
        <Title order={4}>{title}</Title>
        <Text size="sm">{description}</Text>
        <Button variant="subtle" color="secondary">
          {action}
        </Button>
      </Stack>
    </Card>
  );
}

interface IProps {
  boxProps: BoxProps;
  titleProps?: TitleProps;
  subtitleProps?: TextProps;
}

const FeaturesSection = ({ boxProps, subtitleProps }: IProps) => {
  const items = mockdata.map((item) => <Feature {...item} key={item.title} />);

  return (
    <Box {...boxProps}>
      <Box mb="lg">
        <TitleBadge title="what to expect" />
        <Text {...subtitleProps}>
          Fund Harbour exists to support social impact projects, enterprises and
          founders. What good can we help you start?
        </Text>
      </Box>
      <SimpleGrid
        cols={2}
        spacing="lg"
        breakpoints={[{ maxWidth: "md", cols: 2, spacing: "sm" }]}
      >
        {items}
      </SimpleGrid>
    </Box>
  );
};

export default FeaturesSection;
