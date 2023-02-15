import React from "react";
import { Input, TextField, Button, Box } from '@mui/material'
import { useForm, FormProvider } from 'react-hook-form'

import { Form, MuiTextField } from '../../Components/Form/index'

const MUIIndex = () => {
    const form = useForm({ defaultValues: { name: 'hhh' } })
    const form2 = useForm({ defaultValues: { name: 'hhh222' } })
    console.log(1)
    const onSubmit = data => {
        console.log('form data = ', data)
    }


    return <div>

        <h1>mui + react-hook-form</h1>

        <Box
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
        >
            <Form onSubmit={onSubmit} {...form}>
                <MuiTextField name='name' label='UserName'
                    helperText='123asd' placeholder='alllll'
                    rules={{
                        required: true,
                        maxLength: 4,
                        validate: value => value.length <= 4 && value.length > 0 || 'error message1111'
                    }}
                    onChange={(e) => {
                        console.log(e.target.value, '1111111')
                    }}

                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    提交
                </Button>
            </Form>

            <Form onSubmit={onSubmit} {...form2}>
                <MuiTextField name='name' label='UserName2'
                    helperText='2222222' placeholder='cccccc'
                    rules={{
                        required: true,
                        maxLength: 4,
                        validate: value => value.length <= 4 && value.length > 0 || 'error message1111'
                    }}
                    onChange={(e) => {
                        console.log(e.target.value, '2222222')
                    }}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    提交
                </Button>
            </Form>
        </Box>

    </div >
}

export default MUIIndex