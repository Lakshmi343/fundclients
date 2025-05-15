import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Paper, Group, Text, SimpleGrid, createStyles } from '@mantine/core';
import {
  IconArrowUpRight,
  IconFunction,
  IconReceipt2,
  IconTrophy,
} from '@tabler/icons-react';

const API_URL = 'http://localhost:5000/api/campaigns/getAllCampaignsCount';

const useStyles = createStyles((theme) => ({
  title: {
    fontWeight: 700,
  },
  icon: {
    color: theme.colors.blue[6],
  },
  value: {
    fontSize: 24,
    fontWeight: 700,
  },
  diff: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },
}));

const CampaignStats = () => {
  const { classes } = useStyles();

  const [stats, setStats] = useState({
    totalCampaigns: 0,
    totalFundingGoal: 0,
    totalAchievedAmount: 0,
    totalInvestedAmount: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(API_URL);
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching campaign stats:', error);
      }
    };

    fetchStats();
  }, []);

  const averageDonation =
    stats.totalCampaigns > 0
      ? (stats.totalAchievedAmount / stats.totalCampaigns).toFixed(2)
      : '0.00';

  return (
    <SimpleGrid cols={4} spacing="lg" mt="md">
      <Paper withBorder p="md" radius="md">
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
            Total Donations
          </Text>
          <IconReceipt2 className={classes.icon} size="1.4rem" stroke={1.5} />
        </Group>
        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>${stats.totalAchievedAmount.toLocaleString()}</Text>
          <Text color="teal" fz="sm" fw={500} className={classes.diff}>
            <span>10%</span>
            <IconArrowUpRight size="1rem" stroke={1.5} />
          </Text>
        </Group>
        <Text fz="xs" c="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Paper>

      <Paper withBorder p="md" radius="md">
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
            Average Donation per Campaign
          </Text>
          <IconFunction className={classes.icon} size="1.4rem" stroke={1.5} />
        </Group>
        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>${averageDonation}</Text>
          <Text color="teal" fz="sm" fw={500} className={classes.diff}>
            <span>4.2%</span>
            <IconArrowUpRight size="1rem" stroke={1.5} />
          </Text>
        </Group>
        <Text fz="xs" c="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Paper>

      <Paper withBorder p="md" radius="md">
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
            Total Funding Goal
          </Text>
          <IconReceipt2 className={classes.icon} size="1.4rem" stroke={1.5} />
        </Group>
        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>${stats.totalFundingGoal.toLocaleString()}</Text>
          <Text color="teal" fz="sm" fw={500} className={classes.diff}>
            <span>6.3%</span>
            <IconArrowUpRight size="1rem" stroke={1.5} />
          </Text>
        </Group>
        <Text fz="xs" c="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Paper>

      <Paper withBorder p="md" radius="md">
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
            Active Campaigns
          </Text>
          <IconTrophy className={classes.icon} size="1.4rem" stroke={1.5} />
        </Group>
        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{stats.totalCampaigns}</Text>
          <Text color="teal" fz="sm" fw={500} className={classes.diff}>
            <span>11.1%</span>
            <IconArrowUpRight size="1rem" stroke={1.5} />
          </Text>
        </Group>
        <Text fz="xs" c="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    </SimpleGrid>
  );
};

export default CampaignStats;
