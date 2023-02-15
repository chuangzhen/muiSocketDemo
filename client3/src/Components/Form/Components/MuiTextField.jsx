import { TextField } from "@mui/material";
import { useFormContext, useController } from "react-hook-form";



const MuiTextField = (props) => {
    const { name, label, defaultValue = '', value = '', rules = {}, helperText, placeholder, ...rest } = props


    const { register, formState: { errors } } = useFormContext()


    const { ref, ...fields } = register(`${name}`, { defaultValue: defaultValue, ...rules })

    console.log('MuiTextField')
    // const {
    //     field: { ref, ...fields },
    //     fieldState
    // } = useController({ name, defaultValue, rules })
    // console.log(fieldState,'fieldState')
    return (
        <TextField
            {...rest}
            {...fields}
            onChange={(e) => {
                fields?.onChange(e)
                rest?.onChange(e)
            }}
            inputRef={ref}
            label={label}
            placeholder={placeholder}
            error={errors?.name}
            helperText={errors?.name?.message || helperText}


        />
    )
}


export default MuiTextField