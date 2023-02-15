import {
    FormHelperText,
    FormControl,
    FormGroup,
    FormLabel,
    Input,
} from "@mui/material";
import { useState, ReactElement, HTMLInputTypeAttribute } from "react";
import { useFormContext } from "react-hook-form";


interface InputFieldProps extends FormPropsNameSpace.BaseFormFieldProps {
    /**使用useControl时才有defaultValue属性 */
    defaultValue?: string
    value?: string
    // labelPlacement?: 'top' | 'bottom' | 'start' | 'end'
    [x: string]: any
}

function InputField(props: InputFieldProps) {
    const { name, label, value = '', direction = 'column', rules = {}, helperText, placeholder, ...rest } = props

    const { register, formState: { defaultValues, errors }, getValues } = useFormContext()

    const { ref, ...fields } = register(`${name}`, { ...rules })
    return (
        <FormControl sx={{ m: 2, width: 250 }} error={!!errors?.name} required={rules.required} component="fieldset" variant="outlined">
            <FormGroup row={direction === 'row'}>
                <FormLabel component="legend" sx={direction == 'column' ? { display: 'flex', alignItems: 'center', marginRight: 1 } : {}} >{label}</FormLabel>
                <Input
                    fullWidth
                    inputRef={ref}
                    {...fields}
                    {...props}
                    sx={{
                        padding: '12px 14px',
                        flex: 1,
                        width: 'maxContent',
                        ...props?.sx
                    }}
                    onChange={(e) => {
                        fields?.onChange && fields?.onChange(e)
                        rest?.onChange && rest?.onChange(e)
                    }} />
            </FormGroup>
            <FormHelperText error={!!errors?.name} id="my-helper-text">
                <>{
                    !!errors?.name ? errors?.name?.message || 'this item is required' : helperText || ''
                }</>
            </FormHelperText>
        </FormControl>
    )
};


export default InputField