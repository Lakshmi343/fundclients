// import {ICampaign} from "../types";
// import {Avatar, Group, Text} from "@mantine/core";
// import campaignsData from "../data/Campaigns.json";
// import {DataTable} from "mantine-datatable";
// import {useEffect, useState} from "react";

// const PAGE_SIZE = 10;

// const CampaignsTable = () => {
//     const [page, setPage] = useState(1);
//     const [records, setRecords] = useState(campaignsData.data.slice(0, PAGE_SIZE));

//     useEffect(() => {
//         const from = (page - 1) * PAGE_SIZE;
//         const to = from + PAGE_SIZE;
//         setRecords(campaignsData.data.slice(from, to));
//     }, [page]);

//     return (
//         <DataTable
//             columns={[
//                 {
//                     accessor: 'createdBy',
//                     render: ({createdBy, createdByImage}: ICampaign) =>
//                         <Group>
//                             <Avatar src={createdByImage} alt={`${createdBy} profile avatar`} size="sm" radius="xl"/>
//                             <Text>{createdBy}</Text>
//                         </Group>
//                 },
//                 {accessor: 'title'},
//                 {accessor: 'category'},
//                 {accessor: 'amountRaised'},
//                 {accessor: 'goal'},
//                 {accessor: 'contributors'},
//                 {accessor: 'country'}
//             ]}
//             records={records}
//             totalRecords={campaignsData.data.length}
//             recordsPerPage={PAGE_SIZE}
//             page={page}
//             onPageChange={(p) => setPage(p)}
//             highlightOnHover
//             verticalSpacing="sm"
//         />
//     );
// };

// export default CampaignsTable;
import { useEffect, useState } from "react";
import { Avatar, Group, Text } from "@mantine/core";
import { DataTable } from "mantine-datatable";

const PAGE_SIZE = 10;

const CampaignsTable = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [records, setRecords] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/campaigns/");
        const data = await res.json();

        // If the API sends data like { data: [...] }, use data.data
        const campaignsArray = Array.isArray(data) ? data : data.data || [];

        setCampaigns(campaignsArray);
        setRecords(campaignsArray.slice(0, PAGE_SIZE));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  // Handle pagination
  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(campaigns.slice(from, to));
  }, [page, campaigns]);

  return (
    <DataTable
      withBorder
      withColumnBorders
      highlightOnHover
      verticalSpacing="sm"
      fetching={loading}
      columns={[
        {
          accessor: "title",
          title: "Campaign Title",
        },
        {
          accessor: "category",
        },
        {
          accessor: "currentFunding",
          title: "Amount Raised",
          render: (row) => row.currentFunding || 0, // Add actual logic to calculate amount raised if needed
        },
        {
          accessor: "fundingGoal",
          title: "Goal",
        },
        {
          accessor: "creator",
          title: "Created By",
          render: ({ creator }) => (
            <Group>
              <Avatar
                src={
                  creator?.image ||
                  "https://ui-avatars.com/api/?name=Anonymous&background=random"
                }
                radius="xl"
                size="sm"
              />
              <Text>{creator?.name || "Anonymous"}</Text>
            </Group>
          ),
        },
        {
          accessor: "country",
          title: "Country",
          render: () => "N/A", // Placeholder for country data
        },
      ]}
      records={records}
      totalRecords={campaigns.length}
      recordsPerPage={PAGE_SIZE}
      page={page}
      onPageChange={setPage}
    />
  );
};

export default CampaignsTable;
