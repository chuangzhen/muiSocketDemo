import {
    TextField,
    FormHelperText,
    FormControl,
    FormGroup,
    FormLabel,
} from "@mui/material";
import { ReactElement } from "react";
import { useFormContext, useController } from "react-hook-form";

interface TextFieldProps {
    name: string
    value?: string
    label?: string | ReactElement
    rules?: FormPropsNameSpace.RegisterOptions
    helperText?: string | ReactElement
    placeholder?: string
    /**使用useControl时才有defaultValue属性 */
    defaultValue?: string
    direction?: 'row' | 'column'
    [x: string]: any
}

function MuiTextField(props: TextFieldProps) {
    const { name, label, direction = 'column', value = '', rules = {}, helperText, placeholder, ...rest } = props

    // const { register, formState: { defaultValues, errors },getValues } = useFormContext()

    // const { ref, ...fields } = register(`${name}`, { value: value, ...rules })

    const {
        field: { ref, ...fields },
        fieldState
    } = useController({ name, rules })
    return (
        // error={!!errors?.name}
        <FormControl sx={{ m: 2, width: 250 }} required={rules?.required} component="fieldset" variant="standard">
            <FormGroup row={direction === 'row'}>
                <FormLabel component="legend" sx={direction == 'column' ? { display: 'flex', alignItems: 'center', marginRight: 1 } : {}}>{label}</FormLabel>
                <TextField
                    fullWidth
                    {...rest}
                    {...fields}
                    onChange={(e) => {
                        fields?.onChange && fields?.onChange(e)
                        rest?.onChange && rest?.onChange(e)
                    }}
                    inputRef={ref}
                    // label={label}
                    placeholder={placeholder}
                    // error={!!errors?.name}
                    // helperText={<>{errors?.name?.message || helperText}</>}
                    sx={{
                        flex: 1,
                        width: 'maxContent', ...rest?.sx
                    }}
                />
            </FormGroup>
            {/* <FormHelperText error={!!errors?.name} id="my-helper-text">
                <>{
                    !!errors?.name ? errors?.name?.message || 'this item is required' : helperText || ''
                }</>
            </FormHelperText> */}
        </FormControl>

    )
}

export default MuiTextField