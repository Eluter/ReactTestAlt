enum FormType {
    Kitten = 'K',
    Dog = 'D',
    Bird = 'B'
}

interface FormDataType {
    type: FormType
    fields: FormDataField[]
}

interface FormDataField {
    field: 'String' | 'Numeric',
    validator: (value: any) => { msg: string, valid: boolean }
}

export const FORM_DATA: FormDataType[] = [
    {
        type: FormType.Bird,
        fields: [
            {
                field: 'String',
                validator: (value) => !!value
            },
            {
                field: 'Numeric',
                validator: (value) => !!(value > 10)
            }
        ]
    }
]