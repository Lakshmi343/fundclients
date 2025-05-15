// import { useEffect, useState } from "react";
// import { Avatar, Group, Text, ActionIcon, Tooltip } from "@mantine/core";
// import { DataTable, DataTableColumn } from "mantine-datatable";
// import { IconEdit } from "@tabler/icons-react";

// // Interfaces
// interface IReward {
//   tier: string;
//   amount: number;
//   description: string;
//   _id: string;
// }

// interface ISocialLink {
//   platform: string;
//   url: string;
//   _id: string;
// }

// interface ICreator {
//   _id: string;
//   name: string;
//   email: string;
//   profile: {
//     picture: string;
//   };
// }

// interface IInvestment {
//   investor: string;
//   amount: number;
//   _id: string;
//   investedAt: string;
// }

// export interface ICampaign {
//   _id: string;
//   title: string;
//   description: string;
//   fundingGoal: number;
//   achievedAmount: number;
//   dueDate: string;
//   country: string;
//   category: string;
//   image: string;
//   rewards: IReward[];
//   socialLinks: ISocialLink[];
//   creator: ICreator;
//   status: string;
//   investments: IInvestment[];
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

// // Constants
// const PAGE_SIZE = 10;
// const BASE_URL = "http://localhost:5000";

// const CampaignsTable = () => {
//   const [page, setPage] = useState(1);
//   const [records, setRecords] = useState<ICampaign[]>([]);
//   const [totalRecords, setTotalRecords] = useState(0);
//   const [loading, setLoading] = useState(false);

//   // Fetch campaigns
//   useEffect(() => {
//     const fetchCampaigns = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(`${BASE_URL}/api/campaigns/campaigns`);
//         const data = await response.json();
//         if (data.campaigns) {
//           setTotalRecords(data.campaigns.length);
//           const from = (page - 1) * PAGE_SIZE;
//           const to = from + PAGE_SIZE;
//           setRecords(data.campaigns.slice(from, to));
//         }
//       } catch (error) {
//         console.error("Error fetching campaigns:", error);
//       }
//       setLoading(false);
//     };

//     fetchCampaigns();
//   }, [page]);

//   // Handle Edit Click
//   const handleEdit = (campaignId: string) => {
//     console.log("Edit campaign", campaignId);
//     // e.g., navigate(`/campaigns/edit/${campaignId}`);
//   };

//   // Table Columns
//   const columns: DataTableColumn<ICampaign>[] = [
//     {
//       accessor: "creator",
//       title: "Created By",
//       render: ({ creator }) => (
//         <Group>
//           <Avatar
//             src={
//               creator?.profile?.picture
//                 ? `${BASE_URL}${creator.profile.picture}`
//                 : undefined
//             }
//             alt={`${creator.name} profile`}
//             size="sm"
//             radius="xl"
//           />
//           <Text>{creator.name}</Text>
//         </Group>
//       ),
//     },
//     { accessor: "title", title: "Title" },
//     { accessor: "category", title: "Category" },
//     {
//       accessor: "achievedAmount",
//       title: "Amount Raised",
//       render: ({ achievedAmount }) => `$${achievedAmount.toLocaleString()}`,
//     },
//     {
//       accessor: "fundingGoal",
//       title: "Goal",
//       render: ({ fundingGoal }) => `$${fundingGoal.toLocaleString()}`,
//     },
//     {
//       accessor: "investments",
//       title: "Contributors",
//       render: ({ investments }) => investments.length,
//     },
//     { accessor: "country", title: "Country" },
//     {
//       accessor: "edit",
//       title: "Edit",
//       render: ({ _id }) => (
//         <Tooltip label="Edit Campaign">
//           <ActionIcon onClick={() => handleEdit(_id)} color="blue" variant="light">
//             <IconEdit size={18} />
//           </ActionIcon>
//         </Tooltip>
//       ),
//     },
//   ];

//   return (
//     <DataTable
//       columns={columns}
//       records={records}
//       totalRecords={totalRecords}
//       recordsPerPage={PAGE_SIZE}
//       page={page}
//       onPageChange={setPage}
//       loading={loading}
//       highlightOnHover
//       verticalSpacing="sm"
//     />
//   );
// };

// export default CampaignsTable;
import { useEffect, useState } from "react";
import { Avatar, Group, Text, ActionIcon, Tooltip } from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";
import { IconEdit } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

// Interfaces
interface IReward {
  tier: string;
  amount: number;
  description: string;
  _id: string;
}

interface ISocialLink {
  platform: string;
  url: string;
  _id: string;
}

interface ICreator {
  _id: string;
  name: string;
  email: string;
  profile: {
    picture: string;
  };
}

interface IInvestment {
  investor: string;
  amount: number;
  _id: string;
  investedAt: string;
}

export interface ICampaign {
  _id: string;
  title: string;
  description: string;
  fundingGoal: number;
  achievedAmount: number;
  dueDate: string;
  country: string;
  category: string;
  image: string;
  rewards: IReward[];
  socialLinks: ISocialLink[];
  creator: ICreator;
  status: string;
  investments: IInvestment[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Constants
const PAGE_SIZE = 10;
const BASE_URL = "http://localhost:5000";

const CampaignsTable = () => {
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState<ICampaign[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch campaigns
  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/campaigns/campaigns`);
        const data = await response.json();

        if (data.campaigns) {
          setTotalRecords(data.campaigns.length);
          const from = (page - 1) * PAGE_SIZE;
          const to = from + PAGE_SIZE;
          setRecords(data.campaigns.slice(from, to));
        }
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [page]);

  // Edit handler
  const handleEdit = (campaignId: string) => {
    navigate(`/campaigns/edit/${campaignId}`);
  };

  // DataTable Columns
  const columns: DataTableColumn<ICampaign>[] = [
    {
      accessor: "creator",
      title: "Created By",
      render: ({ creator }) => (
        <Group spacing="sm">
          <Avatar
            src={creator?.profile?.picture ? `${BASE_URL}${creator.profile.picture}` : undefined}
            alt={creator?.name}
            size="sm"
            radius="xl"
          />
          <Text size="sm">{creator?.name || "Unknown"}</Text>
        </Group>
      ),
    },
    { accessor: "title", title: "Title" },
    { accessor: "category", title: "Category" },
    {
      accessor: "achievedAmount",
      title: "Amount Raised",
      render: ({ achievedAmount }) => `$${achievedAmount.toLocaleString()}`,
    },
    {
      accessor: "fundingGoal",
      title: "Goal",
      render: ({ fundingGoal }) => `$${fundingGoal.toLocaleString()}`,
    },
    {
      accessor: "investments",
      title: "Contributors",
      render: ({ investments }) => investments?.length ?? 0,
    },
    { accessor: "country", title: "Country" },
    {
      accessor: "edit",
      title: "Edit",
      render: ({ _id }) => (
        <Tooltip label="Edit Campaign">
          <ActionIcon
            onClick={() => handleEdit(_id)}
            color="blue"
            variant="light"
            aria-label="Edit"
          >
            <IconEdit size={18} />
          </ActionIcon>
        </Tooltip>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      records={records}
      totalRecords={totalRecords}
      recordsPerPage={PAGE_SIZE}
      page={page}
      onPageChange={setPage}
      loading={loading}
      highlightOnHover
      verticalSpacing="sm"
      striped
      withBorder
      borderRadius="md"
    />
  );
};

export default CampaignsTable;
