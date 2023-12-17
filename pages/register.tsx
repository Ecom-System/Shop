import { useState } from 'react';
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
} from '@mantine/core';
import { axios } from 'src/lib/axios';
import { useForm } from '@mantine/form';
import router from 'next/router';
import Cookies from 'js-cookie';

const RegisterPage = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      repeatPassword: '',
      accountNumber: '',
      key: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length >= 6 ? null : 'Password must be at least 6 characters'),
      repeatPassword: (value, values) => (value === values.password ? null : 'Passwords do not match'),
      accountNumber: (value) => (/^\d+$/.test(value) ? null : 'Invalid account number'),
      key: (value) => (value.length >= 6 ? null : 'Key must be at least 6 characters'),
    },
  });

  const handleRegister = async (values : any) => {
    try {
      const response = await axios.post('/register', values);
      console.log("broo ")
      if (response.data.success) {
        // Registration successful
        router.push('/login');
      } else {
        console.log(response.data.message)
        console.log('Invalid!!');
      }
    } catch (error) {
      // Handle registration error
    }
  };

  return (
    <div className="main1" style={{marginTop: "-90px"}}>
      <form onSubmit={form.onSubmit(handleRegister)}>
        <Container size={520} my={60}>
          <Title
            align="center"
            sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 500 })}
          >
            <p style={{fontSize : "30px"}}>Create an account</p>
          </Title>
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Already have an account?{' '}
            <Anchor size="sm" component="button">
              Sign in
            </Anchor>
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput label="Email" placeholder="you@gmail.dev" required {...form.getInputProps('email')} />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mt="md"
              {...form.getInputProps('password')}
            />
            <PasswordInput
              label="Repeat Password"
              placeholder="Repeat password"
              required
              mt="md"
              {...form.getInputProps('repeatPassword')}
            />
            <TextInput
              label="Bank Account Number"
              placeholder="Your bank account number"
              required
              mt="md"
              {...form.getInputProps('accountNumber')}
            />
            <TextInput
              label="Key"
              placeholder="Your key"
              required
              mt="md"
              {...form.getInputProps('key')}
            />
            <Button fullWidth mt="xl" type="submit">
              Register
            </Button>
          </Paper>
        </Container>
      </form>
    </div>
  );
};

export default RegisterPage;
