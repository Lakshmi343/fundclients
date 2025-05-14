
// import {
//   TextInput,
//   PasswordInput,
//   Checkbox,
//   Anchor,
//   Paper,
//   Title,
//   Text,
//   Container,
//   Group,
//   Button,
//   Divider,
//   Notification,
//   LoadingOverlay,
// } from '@mantine/core';
// import { Helmet } from "react-helmet";
// import { IconBrandFacebook, IconBrandGoogle, IconX, IconCheck } from "@tabler/icons-react";
// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const LoginPage = () => {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [loading, setLoading] = useState(false);
//   const [msg, setMsg] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async () => {
//     setLoading(true);
//     setMsg(null);
//     setError(null);

//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/login', {
//         email: form.email,
//         password: form.password,
//       });

//       if (res.data.token) {
//         localStorage.setItem('token', res.data.token);
//         localStorage.setItem('userName', res.data.user?.name || 'User');
//         // Store the userId from the response
//         localStorage.setItem('userId', res.data.user?._id || '');
//         // Store the user role if available
//         localStorage.setItem('role', res.data.user?.role || 'user');
//       }

//       setMsg(res.data.msg || 'Login successful');
//       setTimeout(() => {
//         navigate('/');
//       }, 1500);
//     } catch (err: any) {
//       setError(err.response?.data?.msg || 'Invalid credentials');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Helmet>
//         <title>Login</title>
//       </Helmet>
      
//       <Container size={420} my={40} style={{ position: 'relative' }}>
//         <LoadingOverlay visible={loading} overlayBlur={2} />
        
//         <Title align="center" sx={() => ({ fontWeight: 900 })}>
//           Welcome back!
//         </Title>
        
//         <Text color="dimmed" size="sm" align="center" mt={5}>
//           Do not have an account yet?{' '}
//           <Anchor size="sm" component="a" href="/signup">
//             Create account
//           </Anchor>
//         </Text>

//         <Paper withBorder shadow="md" p={30} mt={30} radius="md">
//           {msg && (
//             <Notification 
//               icon={<IconCheck size={18} />} 
//               color="green" 
//               mb="md"
//               onClose={() => setMsg(null)}
//             >
//               {msg}
//             </Notification>
//           )}
          
//           {error && (
//             <Notification 
//               icon={<IconX size={18} />} 
//               color="red" 
//               mb="md"
//               onClose={() => setError(null)}
//             >
//               {error}
//             </Notification>
//           )}

//           <Group grow mb="md" mt="md">
//             <Button leftIcon={<IconBrandGoogle size={16} />} variant="default">
//               Google
//             </Button>
//             <Button leftIcon={<IconBrandFacebook size={16} />} variant="default">
//               Facebook
//             </Button>
//           </Group>

//           <Divider label="Or continue with email" labelPosition="center" my="lg" />

//           <TextInput
//             label="Email"
//             name="email"
//             placeholder="you@example.com"
//             value={form.email}
//             onChange={handleChange}
//             required
//           />
          
//           <PasswordInput
//             label="Password"
//             name="password"
//             placeholder="Your password"
//             value={form.password}
//             onChange={handleChange}
//             required
//             mt="md"
//           />
          
//           <Group position="apart" mt="lg">
//             <Checkbox label="Remember me" />
//             <Anchor component="button" size="sm">
//               Forgot password?
//             </Anchor>
//           </Group>
          
//           <Button fullWidth mt="xl" onClick={handleLogin}>
//             Sign in
//           </Button>
//         </Paper>
//       </Container>
//     </>
//   );
// };

// export default LoginPage;
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Divider,
  Notification,
  LoadingOverlay,
} from '@mantine/core';
import { Helmet } from "react-helmet";
import { IconBrandFacebook, IconBrandGoogle, IconX, IconCheck } from "@tabler/icons-react";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setLoading(true);
    setMsg(null);
    setError(null);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email: form.email,
        password: form.password,
      });

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userName', res.data.user?.name || 'User');
        // Store the userId from the response
        localStorage.setItem('userId', res.data.user?._id || '');
        // Store the user role if available
        localStorage.setItem('role', res.data.user?.role || 'user');
      }

      setMsg(res.data.msg || 'Login successful');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      
      <Container size={420} my={40} style={{ position: 'relative' }}>
        <LoadingOverlay visible={loading} overlayBlur={2} />
        
        <Title align="center" sx={() => ({ fontWeight: 900 })}>
          Welcome back!
        </Title>
        
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor size="sm" component="a" href="/signup">
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          {msg && (
            <Notification 
              icon={<IconCheck size={18} />} 
              color="green" 
              mb="md"
              onClose={() => setMsg(null)}
            >
              {msg}
            </Notification>
          )}
          
          {error && (
            <Notification 
              icon={<IconX size={18} />} 
              color="red" 
              mb="md"
              onClose={() => setError(null)}
            >
              {error}
            </Notification>
          )}

          <Group grow mb="md" mt="md">
            <Button leftIcon={<IconBrandGoogle size={16} />} variant="default">
              Google
            </Button>
            <Button leftIcon={<IconBrandFacebook size={16} />} variant="default">
              Facebook
            </Button>
          </Group>

          <Divider label="Or continue with email" labelPosition="center" my="lg" />

          <TextInput
            label="Email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
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
          
          <Button fullWidth mt="xl" onClick={handleLogin}>
            Sign in
          </Button>
        </Paper>
      </Container>
    </>
  );
};

export default LoginPage;