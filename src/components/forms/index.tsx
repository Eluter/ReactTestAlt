enum FormType {
    Kitten = 'K',
    Dog = 'D',
    Bird = 'B'
}

interface FormProps {
    type: FormType
    Body: React.FC;
}

export const Form: FormProps = ({ type, Body }) => {
    const postKitten = usePostForm(FormType);

    if(type === FormType.Kitten){    
        <Body fields={} submit={postKitten} />
    } else if (type == FormType.Dog) {

    } else {

    }
}

interface FormField {
    fieldType: 
    validator: () => { msg: string, valid: bool }
}

interface FormBodyProps {
    fields: FormField[]
    submit: () => {}
}

export const FormBody: FormBodyProps = ({ fields }) => {
    return fields.map(() => {
        return <Field />
    })
}