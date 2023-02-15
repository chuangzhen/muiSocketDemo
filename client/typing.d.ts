declare namespace FormPropsNameSpace {
    type RegisterOptions = Partial<{
        required: Message | ValidationRule<boolean>;
        min: ValidationRule<number | string>;
        max: ValidationRule<number | string>;
        maxLength: ValidationRule<number | string>;
        minLength: ValidationRule<number | string>;
        pattern: ValidationRule<RegExp>;
        validate: Validate | Record<string, Validate>;
    }>;


    type BaseFormFieldProps = {
        name: string;
        required?: boolean
        placeholder?: string;
        // value?: string;
        label?: string | ReactElement;
        rules?: RegisterOptions;
        helperText?: string;
        /**label和inputemelent的布局方向 */
        direction?: 'row' | 'column';
    }



}