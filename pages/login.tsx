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


const LoginPage = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });
  const handleLogin = async (values : any) => {
    try {
      const response = await axios.post('/login', values);
      console.log(response.data);
      if(response.data.success) {
        const tim = new Date(Date.now() + 1000000000);
        Cookies.set("account" , response.data.account, { expires: tim });
        Cookies.set("email" , values.email, { expires: tim });
        Cookies.set("secret_key", response.data.secret_key, { expires: tim });
        
        console.log(Cookies.get('secret_key')+" kslzdfgls");
        if(values.email == "admin@admin.com")
        {
          Cookies.set("supplier" , values.email, { expires: tim });
          router.push('./supplies') ;
        }
        else
        {
          router.push('./dashboard');
        }        
      } else {
        console.log("Invalid!!")
      }
    } catch (error) {
      // Handle login error
    }
  };

  return (
    <div className='main1'>
       <form onSubmit={form.onSubmit(handleLogin)}>
      <Container size={520} my={60}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 500 })}
      >
        <p style={{fontSize : "30px"}}>Welcome back!</p>
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="you@mantine.dev" required  {...form.getInputProps('email')} />
        <PasswordInput label="Password" placeholder="Your password" required mt="md"  {...form.getInputProps('password')} />
        <Group position="apart" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm" color="gray">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" type='submit'>
          Sign in
        </Button>
      </Paper>
    </Container>
    </form>
    </div>
  );
};

export default LoginPage;
