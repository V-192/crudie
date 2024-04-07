import { Input } from '@chakra-ui/react'
import { useEffect, useState } from 'react'


const EditableCell = ({ getValue }) => {
    const initialValue = getValue()
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue])

    return (
        <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            variant='filled'
            size='sm'
            w='85%'
            overflow='hidden'
            textOverflow='ellipsis'
            whiteSpace='nowrap'
            focusBorderColor='white'
        />
    )
}
export default EditableCell;