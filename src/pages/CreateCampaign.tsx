
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
  IconCalendar,
  IconWorld,
} from "@tabler/icons-react";
import { FileDropzone } from "../components";
import { randomId } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mantine/dates";
import countries from "../utils/countries";


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

interface RewardTier {
  tier: string;
  amount: number;
  description: string;
}

interface SocialLink {
  platform: string;
  url: string;
  key: string;
}

interface FormValues {
  title: string;
  description: string;
  fundingGoal: number;
  category: string;
  image: File | null;
  rewards: RewardTier[];
  socialLinks: Omit<SocialLink, 'key'>[];
  dueDate: Date | null;
  country: string;
}

const API_BASE_URL = "http://localhost:5000/api";

const CreateCampaignPage = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<FormValues>({
    initialValues: {
      title: "",
      description: "",
      fundingGoal: 1000,
      category: "Technology",
      image: null,
      rewards: [],
      socialLinks: [],
      dueDate: null,
      country: "",
    },
    validate: {
      title: (value) => (!value ? "Title is required" : null),
      description: (value) => (!value ? "Description is required" : null),
      fundingGoal: (value) =>
        value <= 0 ? "Funding goal must be at least $1" : null,
      category: (value) => (!value ? "Category is required" : null),
      dueDate: (value) => (!value ? "Due date is required" : null),
      country: (value) => (!value ? "Country is required" : null),
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
      links: [{ platform: "", url: "", key: randomId() }] as SocialLink[],
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

  const handleImageUpload = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      form.setFieldValue("image", file);
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      // Validate all forms
      const formErrors = form.validate();
      if (formErrors.hasErrors) {
        throw new Error("Please fill all required fields");
      }

      // Prepare form data
      const formData = new FormData();
      formData.append("title", form.values.title);
      formData.append("description", form.values.description);
      formData.append("fundingGoal", form.values.fundingGoal.toString());
      formData.append("category", form.values.category);
      
      if (form.values.image) {
        formData.append("image", form.values.image);
      }

      // Add rewards as JSON string
      formData.append("rewards", JSON.stringify(form.values.rewards));

      // Add social links as JSON string
      const validSocialLinks = socialForm.values.links
        .filter(link => link.platform && link.url)
        .map(({ key, ...rest }) => rest);
      formData.append("socialLinks", JSON.stringify(validSocialLinks));

      // Add additional fields
      if (form.values.dueDate) {
        formData.append("dueDate", form.values.dueDate.toISOString());
      }
      formData.append("country", form.values.country);

      // Check network connection
      if (!navigator.onLine) {
        throw new Error("No internet connection. Please check your network.");
      }

      const response = await fetch(`${API_BASE_URL}/campaigns/add`, {
        method: "POST",
        headers: {
          "x-auth-token": token,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Server error: ${response.statusText}`
        );
      }

      const data = await response.json();
      setSuccess(true);
      setTimeout(() => navigate(`/campaigns/${data._id}`), 1500);
    } catch (err) {
      console.error("Error creating campaign:", err);
      let errorMessage = "Failed to create campaign";
      
      if (err instanceof Error) {
        errorMessage = err.message;
        
        // Handle specific error cases
        if (err.message.includes("Failed to fetch")) {
          errorMessage = "Network error. Please check your connection.";
        } else if (err.message.includes("Server error")) {
          errorMessage = "Server error. Please try again later.";
        }
      }
      
      setError(errorMessage);
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

                  <DatePicker
                    label="Due Date"
                    placeholder="Pick a date"
                    required
                    icon={<IconCalendar size={16} />}
                    minDate={new Date()}
                    {...form.getInputProps("dueDate")}
                  />

                  <Select
                    label="Country"
                    placeholder="Select country"
                    required
                    icon={<IconWorld size={16} />}
                    data={countries.map(c => ({ value: c, label: c }))}
                    searchable
                    {...form.getInputProps("country")}
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
                    onUpload={handleImageUpload}
                    accept={["image/png", "image/jpeg", "image/webp"]}
                  />
                  {imagePreview && (
                    <Box mt="sm">
                      <Text size="sm" mb={4}>
                        Image Preview:
                      </Text>
                      <img
                        src={imagePreview}
                        alt="Campaign preview"
                        style={{ maxWidth: "100%", maxHeight: 200 }}
                      />
                    </Box>
                  )}
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
                  <Text size="sm">
                    Due Date: {form.values.dueDate?.toLocaleDateString()}
                  </Text>
                  <Text size="sm">Country: {form.values.country}</Text>

                  {imagePreview && (
                    <Box>
                      <Text size="sm" weight={500} mb={4}>
                        Campaign Image:
                      </Text>
                      <img
                        src={imagePreview}
                        alt="Campaign preview"
                        style={{ maxWidth: "100%", maxHeight: 200 }}
                      />
                    </Box>
                  )}

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

                  {socialForm.values.links.filter(l => l.platform && l.url).length > 0 && (
                    <Box mt="md">
                      <Text size="sm" weight={500}>
                        Social Links:
                      </Text>
                      {socialForm.values.links
                        .filter(link => link.platform && link.url)
                        .map((link, index) => (
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