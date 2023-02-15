import { FormProvider, useForm } from "react-hook-form";


const Form = (props) => {

    //formMethods  = useForm()
    const { onSubmit, children,...formMethods } = props


    return <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
            {children}
        </form>


    </FormProvider>
}


export default Form