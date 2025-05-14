// import {
//     Anchor,
//     Button,
//     Checkbox,
//     Container,
//     Divider,
//     Group,
//     Paper,
//     PasswordInput,
//     Text,
//     TextInput,
//     Title,
// } from '@mantine/core';
// import {Helmet} from "react-helmet";
// import {IconBrandFacebook, IconBrandGoogle} from "@tabler/icons-react";

// const SignupPage = () => {
//     return (
//         <>
//             <Helmet>
//                 <title>Signup</title>
//             </Helmet>
//             <Container size={420} my={40}>
//                 <Title
//                     align="center"
//                     sx={() => ({fontWeight: 900})}
//                 >
//                     Welcome back!
//                 </Title>
//                 <Text color="dimmed" size="sm" align="center" mt={5}>
//                     Already have an account?{' '}
//                     <Anchor size="sm" component="button">
//                         Login
//                     </Anchor>
//                 </Text>

//                 <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    
//                     <Divider label="Or continue with email" labelPosition="center" my="lg" />
//                     <TextInput label="Name" placeholder="your name" required/>
//                     <TextInput label="Email" placeholder="your email" required mt="md"/>
//                     <PasswordInput label="Password" placeholder="your password" required mt="md"/>
//                     <Group position="apart" mt="lg">
//                         <Checkbox label="Remember me"/>
//                         <Anchor component="button" size="sm">
//                             Forgot password?
//                         </Anchor>
//                     </Group>
//                     <Button fullWidth mt="xl">
//                         Sign Up
//                     </Button>
//                 </Paper>
//             </Container>
//         </>
//     );
// }

// export default SignupPage;


import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  Notification
} from '@mantine/core';
import { useState } from 'react';
import axios from 'axios';
import { Helmet } from "react-helmet";

const SignupPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setMsg(null);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
        role: 'user', // default role
      });
      setMsg(res.data.msg);
    } catch (err) {
      setError(err.response?.data?.msg || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Signup</title>
      </Helmet>
      <Container size={420} my={40}>
        <Title align="center" sx={() => ({ fontWeight: 900 })}>
          Welcome!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Already have an account?{' '}
          <Anchor size="sm" component="a" href="/login">
            Login
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          {msg && <Notification color="green">{msg}</Notification>}
          {error && <Notification color="red">{error}</Notification>}

          <Divider label="Or continue with email" labelPosition="center" my="lg" />
          <TextInput
            label="Name"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Email"
            name="email"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
            required
            mt="md"
          />
          <PasswordInput
            label="Password"
            name="password"
            placeholder="Your password"
            value={form.password}
            onChange={handleChange}
            required
            mt="md"
          />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" onClick={handleSubmit} loading={loading}>
            Sign Up
          </Button>
        </Paper>
      </Container>
    </>
  );
};

export default SignupPage;
