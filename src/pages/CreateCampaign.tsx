// import { Helmet } from "react-helmet";
// import {
//   ActionIcon,
//   Alert,
//   Anchor,
//   Box,
//   Button,
//   Checkbox,
//   Container,
//   Flex,
//   Group,
//   NumberInput,
//   Paper,
//   PaperProps,
//   Radio,
//   SegmentedControl,
//   Select,
//   SimpleGrid,
//   Stack,
//   Stepper,
//   Text,
//   TextInput,
//   Title,
//   TitleProps,
//   useMantineTheme,
// } from "@mantine/core";
// import { Link, RichTextEditor } from "@mantine/tiptap";
// import { useEditor } from "@tiptap/react";
// import Highlight from "@tiptap/extension-highlight";
// import StarterKit from "@tiptap/starter-kit";
// import Underline from "@tiptap/extension-underline";
// import TextAlign from "@tiptap/extension-text-align";
// import Superscript from "@tiptap/extension-superscript";
// import SubScript from "@tiptap/extension-subscript";
// import React, { forwardRef, useState } from "react";
// import { DateInput } from "@mantine/dates";
// import {
//   IconBrandApple,
//   IconBrandFacebook,
//   IconBrandGoogle,
//   IconBrandLinkedin,
//   IconBrandPaypal,
//   IconBrandTwitter,
//   IconBrandWhatsapp,
//   IconBrandYoutube,
//   IconCalendar,
//   IconCheck,
//   IconChevronLeft,
//   IconChevronRight,
//   IconCurrency,
//   IconCurrencyDollar,
//   IconInfoCircleFilled,
//   IconLink,
//   IconMail,
//   IconPlus,
//   IconTrash,
// } from "@tabler/icons-react";
// import {
//   CategorySelect,
//   CountrySelect,
//   CurrencySelect,
//   FileDropzone,
// } from "../components";
// import { randomId } from "@mantine/hooks";
// import { useForm } from "@mantine/form";

// interface ISocialProps {
//   icon: React.FC<any>;
//   title: React.ReactNode;
// }

// const SocialSelectItem = forwardRef<HTMLDivElement, ISocialProps>(
//   ({ title, icon: Icon, ...others }: ISocialProps, ref) => (
//     <div ref={ref} {...others}>
//       <Group noWrap>
//         <Icon size={18} stroke={1.5} />
//         <Text size="sm" transform="capitalize">
//           {title}
//         </Text>
//       </Group>
//     </div>
//   )
// );

// const CreateCampaignPage = () => {
//   const theme = useMantineTheme();
//   const [active, setActive] = useState(0);
//   const [target, setTarget] = useState("deadline");
//   const [deadlineDate, setDeadlineDate] = useState<Date | null>(null);
//   const [donationType, setDonationType] = useState("any");
//   const [minimumCheck, setMinimumCheck] = useState(false);
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Underline,
//       Link,
//       Superscript,
//       SubScript,
//       Highlight,
//       TextAlign.configure({ types: ["heading", "paragraph"] }),
//     ],
//     content: "",
//   });

//   const socialForm = useForm({
//     initialValues: {
//       employees: [{ name: "", active: false, key: randomId() }],
//     },
//   });

//   const nextStep = () =>
//     setActive((current: number) => (current < 4 ? current + 1 : current));
//   const prevStep = () =>
//     setActive((current: number) => (current > 0 ? current - 1 : current));

//   const socialFields = socialForm.values.employees.map((item, index) => (
//     <Group key={item.key} mt="xs">
//       <Select
//         aria-label="social"
//         data={[
//           { title: "Facebook", icon: IconBrandFacebook },
//           { title: "Whatsapp", icon: IconBrandWhatsapp },
//           { title: "LinkedIn", icon: IconBrandLinkedin },
//           { title: "Twitter", icon: IconBrandTwitter },
//           { title: "Youtube", icon: IconBrandYoutube },
//           { title: "Other links", icon: IconLink },
//         ].map((c) => ({ value: c.title, label: c.title, ...c }))}
//         itemComponent={SocialSelectItem}
//       />
//       <TextInput
//         placeholder="https://"
//         sx={{ flex: 1 }}
//         {...socialForm.getInputProps(`employees.${index}.name`)}
//       />
//       <ActionIcon
//         color="red"
//         onClick={() => socialForm.removeListItem("employees", index)}
//       >
//         <IconTrash size="1rem" />
//       </ActionIcon>
//     </Group>
//   ));

//   const titleProps: TitleProps = {
//     size: 24,
//     mb: "md",
//   };

//   const subTitleProps: TitleProps = {
//     size: 18,
//     mb: "sm",
//   };

//   const paperProps: PaperProps = {
//     p: "md",
//     withBorder: false,
//     shadow: "sm",
//     mb: "md",
//     sx: { backgroundColor: theme.white },
//   };

//   return (
//     <>
//       <Helmet>
//         <title>Create campaign</title>
//       </Helmet>
//       <Box>
//         <Container my={36}>
//           <Title mb="xl" align="center">
//             Create your campaign
//           </Title>
//           <Stepper active={active} onStepClick={setActive} breakpoint="sm">
//             <Stepper.Step
//               label="Get started"
//               description="Set essential fundraiser details such as fundraiser title, target and currency"
//             >
//               <Title {...titleProps}>Campaign information</Title>
//               <Paper {...paperProps}>
//                 <SimpleGrid

//                   breakpoints={[{ maxWidth: "sm", cols: 1 }]}
//                 >
//                   <TextInput label="Title" />
//                   <CategorySelect />
//                 </SimpleGrid>
//               </Paper>
//               <Paper {...paperProps}>
//                 <Title {...subTitleProps}>Campaign location</Title>
//                 <Text size="sm" mb="sm">
//                   Please select the country that we&apos;ll be sending funds to
//                   (typically where you&apos;re resident). This helps match you
//                   to the correct payment processors.
//                 </Text>
//                 <SimpleGrid
//                   cols={2}
//                   breakpoints={[{ maxWidth: "sm", cols: 1 }]}
//                 >
//                   <CountrySelect />
//                   <TextInput label="City" placeholder="city" />
//                 </SimpleGrid>
//               </Paper>
//               <Paper {...paperProps}>
//                 <Stack spacing="sm">
//                   <Title {...subTitleProps}>Donation information</Title>
//                   <CurrencySelect />
//                   <Radio.Group
//                     label="What kind of fundraiser would you like to create?"
//                     value={target}
//                     onChange={setTarget}
//                   >
//                     <Group mt="xs">
//                       <Radio
//                         value="deadline"
//                         label="Fundraiser with a specific end date?"
//                       />
//                       <Radio
//                         value="no-deadline"
//                         label="Ongoing (no deadline) fundraiser?"
//                       />
//                     </Group>
//                   </Radio.Group>
//                   <Paper {...paperProps}>
//                     {target === "deadline" ? (
//                       <Stack spacing="xs">
//                         <Text size="sm">
//                           Fundraiser with a specific end date?
//                         </Text>
//                         <Text size="sm">
//                           This creates urgency and should always be used when
//                           money is needed before a certain time.
//                         </Text>
//                         <DateInput
//                           value={deadlineDate}
//                           onChange={setDeadlineDate}
//                           label="Deadline"
//                           placeholder="Date input"
//                           icon={<IconCalendar size={18} />}
//                         />
//                         <NumberInput
//                           label="Target amount"
//                           icon={<IconCurrencyDollar size={18} />}
//                         />
//                         <Checkbox label="Allow your fundraiser to be funded over the needed amount?" />
//                       </Stack>
//                     ) : (
//                       <Stack spacing="xs">
//                         <Text size="sm">Ongoing (no deadline) fundraiser?</Text>
//                         <Text size="sm">
//                           This should be used if you are collecting money on a
//                           regular basis.
//                         </Text>
//                         <Checkbox
//                           checked={minimumCheck}
//                           onChange={(event) =>
//                             setMinimumCheck(event.currentTarget.checked)
//                           }
//                           label="Select this if you would like to set a specific a minimum financial target"
//                         />
//                         {minimumCheck && (
//                           <NumberInput
//                             label="Target amount"
//                             icon={<IconCurrencyDollar size={18} />}
//                           />
//                         )}
//                       </Stack>
//                     )}
//                   </Paper>
//                 </Stack>
//               </Paper>
//               <Paper {...paperProps}>
//                 <Title {...subTitleProps}>Donation type</Title>
//                 <SegmentedControl
//                   size="md"
//                   value={donationType}
//                   onChange={setDonationType}
//                   data={[
//                     { label: "Any (popular option)", value: "any" },
//                     { label: "Minimum", value: "minimum" },
//                     { label: "Fixed", value: "fixed" },
//                   ]}
//                   mb="sm"
//                 />
//                 {donationType === "minimum" ? (
//                   <NumberInput label="Minimum amount(s)" />
//                 ) : (
//                   <NumberInput label="Fixed amount(s)" />
//                 )}
//                 <Checkbox
//                   label="Would you like your fundraising page shown in more than one language?"
//                   mt="sm"
//                 />
//               </Paper>
//               <Paper {...paperProps}>
//                 <Stack spacing="sm">
//                   <Title {...subTitleProps}>Fund & Registration details</Title>
//                   <Text size="sm">
//                     *Name of the person receiving funds. For organizations, the
//                     legal representative name (this can be amended later).
//                   </Text>
//                   <SimpleGrid
//                     cols={2}
//                     breakpoints={[{ maxWidth: "sm", cols: 1 }]}
//                   >
//                     <TextInput label="First name" />
//                     <TextInput label="Last name" />
//                   </SimpleGrid>
//                   <FileDropzone
//                     label="Upload your profile picture"
//                     description="This picture will be shown next to your name"
//                   />
//                   <Checkbox
//                     label={
//                       <>
//                         I agree to the Fund Harbour{" "}
//                         <Anchor href="#" target="_blank">
//                           terms and conditions & privacy policy
//                         </Anchor>
//                       </>
//                     }
//                   />
//                 </Stack>
//               </Paper>
//             </Stepper.Step>

//            <Stepper.Step>
//               <Paper {...paperProps}>
//                 <Title {...subTitleProps}>Visibility</Title>
//                 <Stack spacing="sm">
//                   <Checkbox label="Allow your fundraiser to be shown under user created groups." />
//                   <Checkbox label="Check this box if you would like to hide your campaign on our site. Only those that you send the URL to will be able to find it and donate." />
//                   <Checkbox label="Check if you would like to stop search engines such as Google indexing this page." />
//                   <Checkbox label="Check if you would like to add a password to your fundraising page. Only those with the password will be able to view and donate to the campaign." />
//                 </Stack>
//               </Paper>
//               <Paper {...paperProps}>
//                 <Title {...subTitleProps}>Social media links</Title>
//                 <Text size="sm">
//                   Is this fundraiser shown in other places? If so, add links to
//                   those pages.
//                 </Text>
//                 <Box>
//                   {socialFields.length > 0 ? (
//                     <Flex mb="xs"></Flex>
//                   ) : (
//                     <Text color="dimmed" align="center" my="md">
//                       Add social media link
//                     </Text>
//                   )}

//                   {socialFields}

//                   <Group position="center" mt="md">
//                     <Button
//                       leftIcon={<IconPlus size={18} />}
//                       onClick={() =>
//                         socialForm.insertListItem("employees", {
//                           name: "",
//                           active: false,
//                           key: randomId(),
//                         })
//                       }
//                       variant="light"
//                     >
//                       Add new social link
//                     </Button>
//                   </Group>
//                 </Box>
//               </Paper>
//               <Paper {...paperProps}>
//                 <Select
//                   label="How did you hear about us?"
//                   data={[
//                     "Search engine",
//                     "Friends & family",
//                     "Social media",
//                     "Other",
//                   ]}
//                 />
//               </Paper>
//             </Stepper.Step>
//             <Stepper.Step label="Payment methods" description="Get full access">
//               <Title {...titleProps}>Fundraiser Payment Methods</Title>
//               <Paper {...paperProps}>
//                 <Stack spacing="sm">
//                   <Title {...subTitleProps}>
//                     Enable payment processors for your fundraising page
//                   </Title>
//                   <Alert icon={<IconCurrency size={18} />} color="blue">
//                     You can enable GGF Card Payments (powered by MangoPay) if
//                     you switch your currency from GBP to USD{" "}
//                   </Alert>
//                   <Text size="sm">Available payment methods</Text>
//                   <Group>
//                     <Button
//                       variant="light"
//                       leftIcon={<IconBrandPaypal size={18} />}
//                     >
//                       Connect with Paypal
//                     </Button>
//                     <Button
//                       variant="light"
//                       leftIcon={<IconBrandGoogle size={18} />}
//                     >
//                       Connect with Google Pay
//                     </Button>
//                     <Button
//                       variant="light"
//                       leftIcon={<IconBrandApple size={18} />}
//                     >
//                       Connect with Apple Pay
//                     </Button>
//                   </Group>
//                 </Stack>
//               </Paper>
//             </Stepper.Step>
//             <Stepper.Completed>
//               <Title {...titleProps} align="center" my="xl">
//                 Completed, take a seat while we finish setting up things for you
//               </Title>
//             </Stepper.Completed>
//           </Stepper>

//           <Group position="center" mt="xl">
//             <Button
//               variant="default"
//               onClick={prevStep}
//               leftIcon={<IconChevronLeft size={18} />}
//             >
//               Back
//             </Button>
//             {active < 4 ? (
//               <Button
//                 onClick={nextStep}
//                 leftIcon={<IconChevronRight size={18} />}
//               >
//                 Next step
//               </Button>
//             ) : (
//               <Button
//                 component="a"
//                 href="/dashboard"
//                 leftIcon={<IconCheck size={18} />}
//               >
//                 Launch campaign
//               </Button>
//             )}
//           </Group>
//         </Container>
//       </Box>
//     </>
//   );
// };

// export default CreateCampaignPage;
import { Helmet } from "react-helmet";
import {
  ActionIcon,
  Box,
  Button,
  Container,
  Group,
  NumberInput,
  Paper,
  PaperProps,
  Select,
  SimpleGrid,
  Stack,
  Stepper,
  Text,
  TextInput,
  Title,
  TitleProps,
  useMantineTheme,
  LoadingOverlay,
  Notification,
} from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import React, { forwardRef, useState } from "react";
import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandWhatsapp,
  IconLink,
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconCurrencyDollar,
  IconPlus,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { FileDropzone } from "../components";
import { randomId } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";

interface ISocialProps {
  icon: React.FC<any>;
  title: React.ReactNode;
}

const SocialSelectItem = forwardRef<HTMLDivElement, ISocialProps>(
  ({ title, icon: Icon, ...others }: ISocialProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Icon size={18} stroke={1.5} />
        <Text size="sm" transform="capitalize">
          {title}
        </Text>
      </Group>
    </div>
  )
);

const categories = [
  { value: "Medical", label: "Medical" },
  { value: "Emergency", label: "Emergency" },
  { value: "Environment", label: "Environment" },
  { value: "Nonprofit", label: "Nonprofit" },
  { value: "Financial emergency", label: "Financial emergency" },
  { value: "Animals", label: "Animals" },
  { value: "Crisis Relief", label: "Crisis Relief" },
  { value: "Technology", label: "Technology" },
  { value: "Film & Videos", label: "Film & Videos" },
];

const CreateCampaignPage = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      fundingGoal: 1000,
      category: "Technology",
      image: "",
      rewards: [],
      socialLinks: [],
    },
    validate: {
      title: (value) => (!value ? "Title is required" : null),
      description: (value) => (!value ? "Description is required" : null),
      fundingGoal: (value) =>
        value <= 0 ? "Funding goal must be at least $1" : null,
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      form.setFieldValue("description", editor.getHTML());
    },
  });

  const socialForm = useForm({
    initialValues: {
      links: [{ platform: "", url: "", key: randomId() }],
    },
  });

  const nextStep = () => {
    if (active === 0) {
      const { hasErrors } = form.validate();
      if (!hasErrors) setActive((current) => current + 1);
    } else {
      setActive((current) => (current < 3 ? current + 1 : current));
    }
  };

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      const socialLinks = socialForm.values.links.map((link) => ({
        platform: link.platform,
        url: link.url,
      }));

      const response = await fetch("http://localhost:5000/api/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          ...form.values,
          socialLinks,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create campaign");
      }

      setSuccess(true);
      setTimeout(() => navigate(`/campaigns/${data._id}`), 1500);
    } catch (err) {
      console.error("Error creating campaign:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const socialFields = socialForm.values.links.map((item, index) => (
    <Group key={item.key} mt="xs" align="flex-end">
      <Select
        label="Platform"
        data={[
          { title: "Facebook", icon: IconBrandFacebook },
          { title: "Whatsapp", icon: IconBrandWhatsapp },
          { title: "LinkedIn", icon: IconBrandLinkedin },
          { title: "Twitter", icon: IconBrandTwitter },
          { title: "Youtube", icon: IconBrandYoutube },
          { title: "Other", icon: IconLink },
        ].map((c) => ({ value: c.title, label: c.title, ...c }))}
        itemComponent={SocialSelectItem}
        {...socialForm.getInputProps(`links.${index}.platform`)}
      />
      <TextInput
        label="URL"
        placeholder="https://"
        sx={{ flex: 1 }}
        {...socialForm.getInputProps(`links.${index}.url`)}
      />
      <ActionIcon
        color="red"
        onClick={() => socialForm.removeListItem("links", index)}
        mb={4}
      >
        <IconTrash size="1rem" />
      </ActionIcon>
    </Group>
  ));

  const titleProps: TitleProps = {
    size: 24,
    mb: "md",
  };

  const subTitleProps: TitleProps = {
    size: 18,
    mb: "sm",
  };

  const paperProps: PaperProps = {
    p: "md",
    withBorder: false,
    shadow: "sm",
    mb: "md",
    sx: { backgroundColor: theme.white },
  };

  return (
    <>
      <Helmet>
        <title>Create campaign</title>
      </Helmet>
      <Box>
        <Container my={36}>
          <Title mb="xl" align="center">
            Create your campaign
          </Title>

          {error && (
            <Notification
              icon={<IconX size={18} />}
              color="red"
              title="Error"
              onClose={() => setError(null)}
              mb="md"
            >
              {error}
            </Notification>
          )}

          {success && (
            <Notification
              icon={<IconCheck size={18} />}
              color="teal"
              title="Success!"
              onClose={() => setSuccess(false)}
              mb="md"
            >
              Campaign created successfully! Redirecting...
            </Notification>
          )}

          <LoadingOverlay visible={loading} overlayBlur={2} />

          <Stepper active={active} onStepClick={setActive} breakpoint="sm">
            <Stepper.Step
              label="Basic info"
              description="Title, description and funding goal"
            >
              <Title {...titleProps}>Campaign information</Title>
              <Paper {...paperProps}>
                <Stack spacing="md">
                  <TextInput
                    label="Title"
                    placeholder="My Awesome Campaign"
                    required
                    {...form.getInputProps("title")}
                  />

                  <Select
                    label="Category"
                    data={categories}
                    required
                    {...form.getInputProps("category")}
                  />

                  <NumberInput
                    label="Funding Goal"
                    placeholder="1000"
                    required
                    min={1}
                    precision={2}
                    icon={<IconCurrencyDollar size={18} />}
                    {...form.getInputProps("fundingGoal")}
                  />

                  <Box>
                    <Text size="sm" weight={500} mb={4}>
                      Description
                    </Text>
                    <RichTextEditor editor={editor}>
                      <RichTextEditor.Toolbar sticky stickyOffset={60}>
                        <RichTextEditor.ControlsGroup>
                          <RichTextEditor.Bold />
                          <RichTextEditor.Italic />
                          <RichTextEditor.Underline />
                          <RichTextEditor.Strikethrough />
                          <RichTextEditor.ClearFormatting />
                          <RichTextEditor.Highlight />
                          <RichTextEditor.Code />
                        </RichTextEditor.ControlsGroup>

                        <RichTextEditor.ControlsGroup>
                          <RichTextEditor.H1 />
                          <RichTextEditor.H2 />
                          <RichTextEditor.H3 />
                          <RichTextEditor.H4 />
                        </RichTextEditor.ControlsGroup>

                        <RichTextEditor.ControlsGroup>
                          <RichTextEditor.Blockquote />
                          <RichTextEditor.Hr />
                          <RichTextEditor.Link />
                          <RichTextEditor.Unlink />
                        </RichTextEditor.ControlsGroup>
                      </RichTextEditor.Toolbar>

                      <RichTextEditor.Content />
                    </RichTextEditor>
                  </Box>

                  <FileDropzone
                    label="Upload campaign image"
                    onUpload={(files) =>
                      form.setFieldValue("image", files[0]?.name || "")
                    }
                  />
                </Stack>
              </Paper>
            </Stepper.Step>

            <Stepper.Step label="Rewards" description="Add backer rewards">
              <Title {...titleProps}>Reward Tiers</Title>
              <Paper {...paperProps}>
                <Stack>
                  {form.values.rewards.map((reward, index) => (
                    <Paper key={index} p="md" withBorder>
                      <Group position="apart">
                        <Title order={5}>Reward Tier {index + 1}</Title>
                        <ActionIcon
                          color="red"
                          onClick={() => form.removeListItem("rewards", index)}
                        >
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Group>
                      <SimpleGrid cols={2} mt="sm">
                        <TextInput
                          label="Tier Name"
                          placeholder="e.g. Bronze, Silver, Gold"
                          required
                          {...form.getInputProps(`rewards.${index}.tier`)}
                        />
                        <NumberInput
                          label="Amount"
                          min={1}
                          precision={2}
                          required
                          {...form.getInputProps(`rewards.${index}.amount`)}
                        />
                      </SimpleGrid>
                      <TextInput
                        label="Description"
                        mt="sm"
                        required
                        {...form.getInputProps(`rewards.${index}.description`)}
                      />
                    </Paper>
                  ))}

                  <Button
                    leftIcon={<IconPlus size={16} />}
                    variant="outline"
                    onClick={() =>
                      form.insertListItem("rewards", {
                        tier: "",
                        amount: 10,
                        description: "",
                      })
                    }
                  >
                    Add Reward Tier
                  </Button>
                </Stack>
              </Paper>
            </Stepper.Step>

            <Stepper.Step label="Social" description="Add social links">
              <Paper {...paperProps}>
                <Title {...subTitleProps}>Social media links</Title>
                <Text size="sm" mb="sm">
                  Add links to your social media profiles
                </Text>
                <Box>
                  {socialFields.length > 0 ? (
                    <Stack spacing="sm">{socialFields}</Stack>
                  ) : (
                    <Text color="dimmed" align="center" my="md">
                      No social links added yet
                    </Text>
                  )}

                  <Group position="center" mt="md">
                    <Button
                      leftIcon={<IconPlus size={18} />}
                      onClick={() =>
                        socialForm.insertListItem("links", {
                          platform: "",
                          url: "",
                          key: randomId(),
                        })
                      }
                      variant="light"
                    >
                      Add new social link
                    </Button>
                  </Group>
                </Box>
              </Paper>
            </Stepper.Step>

            <Stepper.Completed>
              <Title {...titleProps} align="center" my="xl">
                Review your campaign
              </Title>
              <Paper {...paperProps}>
                <Stack>
                  <Text size="lg" weight={500}>
                    Title: {form.values.title}
                  </Text>
                  <Text size="sm">Category: {form.values.category}</Text>
                  <Text size="sm">
                    Funding Goal: ${form.values.fundingGoal.toFixed(2)}
                  </Text>

                  <Box>
                    <Text size="sm" weight={500}>
                      Description:
                    </Text>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: form.values.description,
                      }}
                    />
                  </Box>

                  {form.values.rewards.length > 0 && (
                    <Box mt="md">
                      <Text size="sm" weight={500}>
                        Rewards:
                      </Text>
                      {form.values.rewards.map((reward, index) => (
                        <Paper key={index} p="sm" mt="sm" withBorder>
                          <Text>
                            {reward.tier} (${reward.amount.toFixed(2)})
                          </Text>
                          <Text size="sm" color="dimmed">
                            {reward.description}
                          </Text>
                        </Paper>
                      ))}
                    </Box>
                  )}

                  {socialForm.values.links.length > 0 && (
                    <Box mt="md">
                      <Text size="sm" weight={500}>
                        Social Links:
                      </Text>
                      {socialForm.values.links.map((link, index) => (
                        <Paper key={index} p="sm" mt="sm" withBorder>
                          <Text>{link.platform}</Text>
                          <Text size="sm" color="dimmed">
                            {link.url}
                          </Text>
                        </Paper>
                      ))}
                    </Box>
                  )}
                </Stack>
              </Paper>
            </Stepper.Completed>
          </Stepper>

          <Group position="center" mt="xl">
            {active > 0 && (
              <Button
                variant="default"
                onClick={prevStep}
                leftIcon={<IconChevronLeft size={18} />}
              >
                Back
              </Button>
            )}

            {active < 3 ? (
              <Button
                onClick={nextStep}
                leftIcon={<IconChevronRight size={18} />}
              >
                Next step
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                loading={loading}
                leftIcon={<IconCheck size={18} />}
              >
                Create Campaign
              </Button>
            )}
          </Group>
        </Container>
      </Box>
    </>
  );
};

export default CreateCampaignPage;
