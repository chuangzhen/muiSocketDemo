import { ReactElement } from "react";
import { FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form";

interface FormProps<TFormValues extends object> {
    children: ReactElement | Array<ReactElement>,
    /** 表单提交函数 */
    onSubmit: (data: TFormValues) => void
    /** 通过react-hook-form 的useForm创建的对象实例 */
    form: UseFormReturn<TFormValues, any>

    direction?: 'row' | 'column'

    [rest: string]: any
}
/** 表单泛型组件Form - 接收一个表单域泛型对象接口 */
function Form<TFormValues extends object>(props: FormProps<TFormValues>) {

    //formMethods  = useForm()
    const { onSubmit, children, form ,...rest} = props

    return <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} {...rest}>
            {children}
        </form>
    </FormProvider>
}


export default Form