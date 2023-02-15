import { Box, Button, Grid, styled } from '@mui/material';
import React, { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { useForm, UseFormReturn } from 'react-hook-form'
import { Form, MuiTextField, InputField, TreeSelect } from 'src/components/Form';
import { useNavigate } from 'react-router-dom';

interface Props { socket: Socket<any, any> }


interface TFormValues {
  name: string
  age: number
  sex: string | string[]
  email: string
  [x: string]: any
}

const Container = styled(Box)(({ theme }) => ({
  padding: '20px',
  margin: '0 auto',
  width: 600,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.main,
  borderRadius: 4
}))

const GridContainer = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#fff',
  width: '90%',
  marginLeft: 0,
  padding: '10px',
  borderRadius: 4
}))

function App({ socket }: Props) {
  const form = useForm<TFormValues, any>({ defaultValues: {} })
  const navigate = useNavigate()
  const handleSubmit = (data: TFormValues) => {

    let params = {
      userName: data.username,
      socketID: socket.id
    }


    socket?.emit('newUser', params)


    navigate('/chat')

  }

  return (
    <>
      <Box
        component={'h1'}
        sx={{
          width: '100%',
          textAlign: 'center',
          '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >material ui + socket.io-client + react-hook-form</Box>

      <Container>
        <Box component={'h2'}>Login</Box>
        <GridContainer container spacing={2}>
          <Form<TFormValues> form={form} onSubmit={handleSubmit}>

            <Grid item xs={12}>
              <InputField
                name='username'
                label='Username'
                placeholder='Input username'
                rules={{ required: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name='password'
                label='Password'
                placeholder='Input password'
                rules={{ required: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TreeSelect
                name='sex'
                label='Sex'
                placeholder='Select sex'
                options={[
                  {
                    nodeId: 'male',
                    labelText: '男'
                  },
                  {
                    nodeId: 'female',
                    labelText: '女'
                  },
                  {
                    nodeId: 'others',
                    labelText: '其他',
                  },
                ]}

                rules={{ required: false }}
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: '250px', textAlign: 'center' }}
              >
                提交
              </Button>
            </Grid>

          </Form>
        </GridContainer>

      </Container>

    </>
  );
}

export default App;
