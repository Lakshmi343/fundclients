
// import { useState, useEffect } from "react";
// import {
//   ActionIcon,
//   Anchor,
//   Button,
//   Checkbox,
//   Container,
//   Drawer,
//   DrawerProps,
//   Flex,
//   Group,
//   Image,
//   Loader,
//   NumberInput,
//   Paper,
//   PaperProps,
//   Popover,
//   Radio,
//   ScrollArea,
//   Slider,
//   Stack,
//   Text,
//   TextInput,
//   ThemeIcon,
//   Transition,
//   useMantineTheme,
// } from "@mantine/core";
// import {
//   IconBrandApple,
//   IconBrandGoogle,
//   IconCheck,
//   IconCreditCard,
//   IconCurrencyDollar,
//   IconInfoCircleFilled,
//   IconShieldCheckFilled,
//   IconX,
// } from "@tabler/icons-react";
// import { CountrySelect } from "./index";
// import { ICampaign } from "../types";
// import { notifications } from "@mantine/notifications";
// import axios from "axios";
// import { loadStripe } from "@stripe/stripe-js";

// interface IProps extends Pick<DrawerProps, "opened" | "onClose" | "size"> {
//   campaign?: ICampaign;
//   iconSize: number;
// }

// const DonationDrawer = ({ campaign, iconSize, ...others }: IProps) => {
//   const [payment, setPayment] = useState("");
//   const [donationAmount, setDonationAmount] = useState<number | undefined>(undefined);
//   const [tipPercentage, setTipPercentage] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const theme = useMantineTheme();

//   const paperProps: PaperProps = {
//     p: "md",
//     withBorder: true,
//     sx: { backgroundColor: theme.white },
//   };

//   // Calculate totals
//   const tipAmount = donationAmount ? (donationAmount * tipPercentage) / 100 : 0;
//   const totalAmount = donationAmount ? donationAmount + tipAmount : 0;

//   const handleDonation = async () => {
//     if (!donationAmount || donationAmount <= 0) {
//       notifications.show({
//         title: "Invalid Amount",
//         message: "Please enter a valid donation amount",
//         color: "red",
//         icon: <IconX />,
//       });
//       return;
//     }

//     if (!payment) {
//       notifications.show({
//         title: "Payment Method Required",
//         message: "Please select a payment method",
//         color: "red",
//         icon: <IconX />,
//       });
//       return;
//     }

//     setLoading(true);

//     try {
//       // First create a payment intent with Stripe
//       const stripeResponse = await axios.post(
//         "http://localhost:5000/api/payment/create-payment-intent",
//         {
//           amount: totalAmount * 100, // Convert to cents
//           currency: "usd",
//         }
//       );

//       const stripe = await loadStripe("your_stripe_publishable_key");
      
//       if (!stripe) {
//         throw new Error("Stripe failed to initialize");
//       }

//       const { error } = await stripe.confirmPayment({
//         clientSecret: stripeResponse.data.clientSecret,
//         // For card payments
//         elementsOptions: {
//           // If using Stripe Elements
//         },
//         confirmParams: {
//           return_url: window.location.href,
//           receipt_email: "user@example.com", // You should collect this from the form
//         },
//       });

//       if (error) {
//         throw error;
//       }

//       // If payment succeeds, record the investment
//       const investmentResponse = await axios.post(
//         `http://localhost:5000/api/invest/${campaign?._id}/invest`,
//         {
//           amount: donationAmount,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       setSuccess(true);
//       notifications.show({
//         title: "Success",
//         message: "Your donation was successful!",
//         color: "green",
//         icon: <IconCheck />,
//       });
//       others.onClose();
//     } catch (error) {
//       console.error("Donation error:", error);
//       notifications.show({
//         title: "Error",
//         message: "There was an error processing your donation",
//         color: "red",
//         icon: <IconX />,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (success) {
//     return (
//       <Drawer
//         position="bottom"
//         title="Donation Successful"
//         size="100%"
//         scrollAreaComponent={ScrollArea.Autosize}
//         {...others}
//       >
//         <Container>
//           <Stack align="center" justify="center" py="xl">
//             <ThemeIcon size="xl" radius="xl" color="green">
//               <IconCheck size={24} />
//             </ThemeIcon>
//             <Text size="xl" weight={600}>
//               Thank you for your donation!
//             </Text>
//             <Text align="center">
//               Your donation of ${donationAmount?.toFixed(2)} has been successfully processed.
//             </Text>
//             <Button onClick={others.onClose}>Close</Button>
//           </Stack>
//         </Container>
//       </Drawer>
//     );
//   }

//   return (
//     <Drawer
//       position="bottom"
//       title="Make a Donation"
//       size="100%"
//       scrollAreaComponent={ScrollArea.Autosize}
//       {...others}
//     >
//       <Container>
//         <Stack>
//           <Flex gap="xs" align="center">
//          <Image
//   src={campaign?.image?.startsWith("http") ? campaign.image : `http://localhost:5000${campaign?.image}`}
//   height={280}
//   // className={classes.image}  <-- If you don't have classes.image defined, remove it or define it
//   withPlaceholder
// />

//             <Text>
//               You&apos;re supporting <b>{campaign?.title}</b>
//             </Text>
//           </Flex>
//           <NumberInput
//             size="md"
//             label="Enter your donation"
//             precision={2}
//             min={1}
//             value={donationAmount}
//             onChange={setDonationAmount}
//             rightSection={<IconCurrencyDollar size={iconSize} />}
//           />
//           <Paper {...paperProps}>
//             <Text fw={500}>Tip Fund Harbour services</Text>
//             <Text size="sm" my="xs">
//               Fund Harbour has a 0% platform fee for organizers. Fund Harbour
//               will continue offering its services thanks to donors who will
//               leave an optional amount here:
//             </Text>
//             <Slider
//               value={tipPercentage}
//               onChange={setTipPercentage}
//               marks={[
//                 { value: 20, label: "20%" },
//                 { value: 50, label: "50%" },
//                 { value: 80, label: "80%" },
//               ]}
//               mb="lg"
//             />
//           </Paper>
//           <Paper {...paperProps}>
//             <Radio.Group
//               name="paymentMethod"
//               label="Payment method"
//               value={payment}
//               onChange={setPayment}
//               mb="md"
//             >
//               <Group mt="sm">
//                 <Radio
//                   value="gpay"
//                   label={
//                     <Group spacing="xs">
//                       <IconBrandGoogle size={iconSize} />
//                       <Text>Google Pay</Text>
//                     </Group>
//                   }
//                 />
//                 <Radio
//                   value="applepay"
//                   label={
//                     <Group spacing="xs">
//                       <IconBrandApple size={iconSize} />
//                       <Text>Apple Pay</Text>
//                     </Group>
//                   }
//                 />
//                 <Radio
//                   value="card"
//                   label={
//                     <Group spacing="xs">
//                       <IconCreditCard size={iconSize} />
//                       <Text>Credit or debit</Text>
//                     </Group>
//                   }
//                 />
//               </Group>
//             </Radio.Group>
//             <Transition
//               mounted={payment === "card"}
//               transition="scale-y"
//               duration={400}
//               timingFunction="ease"
//             >
//               {(styles) => (
//                 <Paper p="md" radius="sm" mt="sm" style={styles}>
//                   <Stack sx={{ width: "100%" }}>
//                     <TextInput label="Email address" required />
//                     <Group grow>
//                       <TextInput label="First name" required />
//                       <TextInput label="Last name" required />
//                     </Group>
//                     <Checkbox label="Use as billing name" />
//                     <NumberInput label="Card number" required hideControls />
//                     <Group grow>
//                       <NumberInput label="MM/YY" required hideControls />
//                       <NumberInput label="CVV" required hideControls />
//                     </Group>
//                     <TextInput label="Name on card" required />
//                     <Group grow>
//                       <CountrySelect required />
//                       <TextInput label="Postal code" required />
//                     </Group>
//                     <Checkbox label="Save card for future donations" />
//                   </Stack>
//                 </Paper>
//               )}
//             </Transition>
//           </Paper>
//           <Paper {...paperProps}>
//             <Stack>
//               <Group spacing={4}>
//                 <Checkbox label="Don't display my name publicly on the fundraiser." />
//                 <Popover width={200} position="bottom" withArrow shadow="md">
//                   <Popover.Target>
//                     <ActionIcon color="primary" variant="subtle">
//                       <IconInfoCircleFilled size={iconSize} />
//                     </ActionIcon>
//                   </Popover.Target>
//                   <Popover.Dropdown>
//                     <Text size="sm">
//                       Your name will only be visible to the organizer, any team
//                       members and the beneficiary
//                     </Text>
//                   </Popover.Dropdown>
//                 </Popover>
//               </Group>
//               <Checkbox label="Get occasional marketing updates from GoFundMe. You may unsubscribe at any time." />
//             </Stack>
//           </Paper>
//           <Paper {...paperProps}>
//             <Stack>
//               <Text fw={700} size="lg">
//                 Your donation
//               </Text>
//               <Group position="apart">
//                 <Text>Your donation</Text>
//                 <Text fw={500}>${donationAmount?.toFixed(2) || "0.00"}</Text>
//               </Group>
//               <Group position="apart">
//                 <Text>Fund Harbour tip</Text>
//                 <Text fw={500}>${tipAmount.toFixed(2)}</Text>
//               </Group>
//               <Group position="apart">
//                 <Text>Total due today</Text>
//                 <Text fw={500}>${totalAmount.toFixed(2)}</Text>
//               </Group>
//               <Button 
//                 size="lg" 
//                 onClick={handleDonation}
//                 disabled={loading}
//                 leftIcon={loading ? <Loader size="sm" /> : null}
//               >
//                 {loading ? "Processing..." : "Donate Now"}
//               </Button>
//             </Stack>
//           </Paper>
//           <Paper {...paperProps}>
//             <Stack>
//               <Text size="sm">
//                 By continuing, you agree with{" "}
//                 <Anchor>Fund Harbour terms</Anchor> and{" "}
//                 <Anchor>privacy notice.</Anchor>
//               </Text>
//               <Text size="sm">
//                 Learn more about <Anchor>pricing and fees.</Anchor>
//               </Text>
//               <Flex gap="sm">
//                 <ThemeIcon size="lg" variant="light" color="blue">
//                   <IconShieldCheckFilled size={18} />
//                 </ThemeIcon>
//                 <Text size="sm">
//                   We guarantee you a full refund for up to a year in the rare
//                   case that fraud occurs.&nbsp;
//                   <Anchor>See our Fund Harbour Giving Guarantee.</Anchor>
//                 </Text>
//               </Flex>
//             </Stack>
//           </Paper>
//         </Stack>
//       </Container>
//     </Drawer>
//   );
// };

// export default DonationDrawer;
import { useState, useEffect } from "react";
import {
  ActionIcon,
  Anchor,
  Button,
  Checkbox,
  Container,
  Drawer,
  DrawerProps,
  Flex,
  Group,
  Image,
  Loader,
  NumberInput,
  Paper,
  PaperProps,
  Popover,
  Radio,
  ScrollArea,
  Slider,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Transition,
  useMantineTheme,
} from "@mantine/core";
import {
  IconBrandApple,
  IconBrandGoogle,
  IconCheck,
  IconCreditCard,
  IconCurrencyDollar,
  IconInfoCircleFilled,
  IconShieldCheckFilled,
  IconX,
} from "@tabler/icons-react";
import { CountrySelect } from "./index";
import { ICampaign } from "../types";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

interface IProps extends Pick<DrawerProps, "opened" | "onClose" | "size"> {
  campaign?: ICampaign;
  iconSize: number;
}

const DonationDrawer = ({ campaign, iconSize, ...others }: IProps) => {
  const [payment, setPayment] = useState("");
  const [donationAmount, setDonationAmount] = useState<number | undefined>(undefined);
  const [tipPercentage, setTipPercentage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const theme = useMantineTheme();

  const paperProps: PaperProps = {
    p: "md",
    withBorder: true,
    sx: { backgroundColor: theme.white },
  };

  // Calculate totals
  const tipAmount = donationAmount ? (donationAmount * tipPercentage) / 100 : 0;
  const totalAmount = donationAmount ? donationAmount + tipAmount : 0;

  const handleDonation = async () => {
    if (!donationAmount || donationAmount <= 0) {
      notifications.show({
        title: "Invalid Amount",
        message: "Please enter a valid donation amount",
        color: "red",
        icon: <IconX />,
      });
      return;
    }

    if (!payment) {
      notifications.show({
        title: "Payment Method Required",
        message: "Please select a payment method",
        color: "red",
        icon: <IconX />,
      });
      return;
    }

    setLoading(true);

    try {
      // First create a payment intent with Stripe
      const stripeResponse = await axios.post(
        "http://localhost:5000/api/payment/create-payment-intent",
        {
          amount: totalAmount * 100, // Convert to cents
          currency: "usd",
        }
      );

      const stripe = await loadStripe("your_stripe_publishable_key");
      
      if (!stripe) {
        throw new Error("Stripe failed to initialize");
      }

      const { error } = await stripe.confirmPayment({
        clientSecret: stripeResponse.data.clientSecret,
        // For card payments
        elementsOptions: {
          // If using Stripe Elements
        },
        confirmParams: {
          return_url: window.location.href,
          receipt_email: "user@example.com", // You should collect this from the form
        },
      });

      if (error) {
        throw error;
      }

      // If payment succeeds, record the investment
      const investmentResponse = await axios.post(
        `http://localhost:5000/api/invest/${campaign?._id}/invest`,
        {
          amount: donationAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSuccess(true);
      notifications.show({
        title: "Success",
        message: "Your donation was successful!",
        color: "green",
        icon: <IconCheck />,
      });
      others.onClose();
    } catch (error) {
      console.error("Donation error:", error);
      notifications.show({
        title: "Error",
        message: "There was an error processing your donation",
        color: "red",
        icon: <IconX />,
      });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Drawer
        position="bottom"
        title="Donation Successful"
        size="100%"
        scrollAreaComponent={ScrollArea.Autosize}
        {...others}
      >
        <Container>
          <Stack align="center" justify="center" py="xl">
            <ThemeIcon size="xl" radius="xl" color="green">
              <IconCheck size={24} />
            </ThemeIcon>
            <Text size="xl" weight={600}>
              Thank you for your donation!
            </Text>
            <Text align="center">
              Your donation of ${donationAmount?.toFixed(2)} has been successfully processed.
            </Text>
            <Button onClick={others.onClose}>Close</Button>
          </Stack>
        </Container>
      </Drawer>
    );
  }

  return (
    <Drawer
      position="bottom"
      title="Make a Donation"
      size="100%"
      scrollAreaComponent={ScrollArea.Autosize}
      {...others}
    >
      <Container>
        <Stack>
          <Flex gap="xs" align="center">
            <Image
              src={campaign?.image}
              height={96}
              width={120}
              fit="contain"
              radius="sm"
            />
            <Text>
              You&apos;re supporting <b>{campaign?.title}</b>
            </Text>
          </Flex>
          <NumberInput
            size="md"
            label="Enter your donation"
            precision={2}
            min={1}
            value={donationAmount}
            onChange={setDonationAmount}
            rightSection={<IconCurrencyDollar size={iconSize} />}
          />
          <Paper {...paperProps}>
            <Text fw={500}>Tip Fund Harbour services</Text>
            <Text size="sm" my="xs">
              Fund Harbour has a 0% platform fee for organizers. Fund Harbour
              will continue offering its services thanks to donors who will
              leave an optional amount here:
            </Text>
            <Slider
              value={tipPercentage}
              onChange={setTipPercentage}
              marks={[
                { value: 20, label: "20%" },
                { value: 50, label: "50%" },
                { value: 80, label: "80%" },
              ]}
              mb="lg"
            />
          </Paper>
          <Paper {...paperProps}>
            <Radio.Group
              name="paymentMethod"
              label="Payment method"
              value={payment}
              onChange={setPayment}
              mb="md"
            >
              <Group mt="sm">
                <Radio
                  value="gpay"
                  label={
                    <Group spacing="xs">
                      <IconBrandGoogle size={iconSize} />
                      <Text>Google Pay</Text>
                    </Group>
                  }
                />
                <Radio
                  value="applepay"
                  label={
                    <Group spacing="xs">
                      <IconBrandApple size={iconSize} />
                      <Text>Apple Pay</Text>
                    </Group>
                  }
                />
                <Radio
                  value="card"
                  label={
                    <Group spacing="xs">
                      <IconCreditCard size={iconSize} />
                      <Text>Credit or debit</Text>
                    </Group>
                  }
                />
              </Group>
            </Radio.Group>
            <Transition
              mounted={payment === "card"}
              transition="scale-y"
              duration={400}
              timingFunction="ease"
            >
              {(styles) => (
                <Paper p="md" radius="sm" mt="sm" style={styles}>
                  <Stack sx={{ width: "100%" }}>
                    <TextInput label="Email address" required />
                    <Group grow>
                      <TextInput label="First name" required />
                      <TextInput label="Last name" required />
                    </Group>
                    <Checkbox label="Use as billing name" />
                    <NumberInput label="Card number" required hideControls />
                    <Group grow>
                      <NumberInput label="MM/YY" required hideControls />
                      <NumberInput label="CVV" required hideControls />
                    </Group>
                    <TextInput label="Name on card" required />
                    <Group grow>
                      <CountrySelect required />
                      <TextInput label="Postal code" required />
                    </Group>
                    <Checkbox label="Save card for future donations" />
                  </Stack>
                </Paper>
              )}
            </Transition>
          </Paper>
          <Paper {...paperProps}>
            <Stack>
              <Group spacing={4}>
                <Checkbox label="Don't display my name publicly on the fundraiser." />
                <Popover width={200} position="bottom" withArrow shadow="md">
                  <Popover.Target>
                    <ActionIcon color="primary" variant="subtle">
                      <IconInfoCircleFilled size={iconSize} />
                    </ActionIcon>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <Text size="sm">
                      Your name will only be visible to the organizer, any team
                      members and the beneficiary
                    </Text>
                  </Popover.Dropdown>
                </Popover>
              </Group>
              <Checkbox label="Get occasional marketing updates from GoFundMe. You may unsubscribe at any time." />
            </Stack>
          </Paper>
          <Paper {...paperProps}>
            <Stack>
              <Text fw={700} size="lg">
                Your donation
              </Text>
              <Group position="apart">
                <Text>Your donation</Text>
                <Text fw={500}>${donationAmount?.toFixed(2) || "0.00"}</Text>
              </Group>
              <Group position="apart">
                <Text>Fund Harbour tip</Text>
                <Text fw={500}>${tipAmount.toFixed(2)}</Text>
              </Group>
              <Group position="apart">
                <Text>Total due today</Text>
                <Text fw={500}>${totalAmount.toFixed(2)}</Text>
              </Group>
              <Button 
                size="lg" 
                onClick={handleDonation}
                disabled={loading}
                leftIcon={loading ? <Loader size="sm" /> : null}
              >
                {loading ? "Processing..." : "Donate Now"}
              </Button>
            </Stack>
          </Paper>
          <Paper {...paperProps}>
            <Stack>
              <Text size="sm">
                By continuing, you agree with{" "}
                <Anchor>Fund Harbour terms</Anchor> and{" "}
                <Anchor>privacy notice.</Anchor>
              </Text>
              <Text size="sm">
                Learn more about <Anchor>pricing and fees.</Anchor>
              </Text>
              <Flex gap="sm">
                <ThemeIcon size="lg" variant="light" color="blue">
                  <IconShieldCheckFilled size={18} />
                </ThemeIcon>
                <Text size="sm">
                  We guarantee you a full refund for up to a year in the rare
                  case that fraud occurs.&nbsp;
                  <Anchor>See our Fund Harbour Giving Guarantee.</Anchor>
                </Text>
              </Flex>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Drawer>
  );
};

export default DonationDrawer;