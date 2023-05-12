import { useState } from "react";

export const useForm = (initialstate = {} ) => {


    const [state, setstate] = useState(initialstate)

    const handleOnChange = ({target})=>
    {
        const {name, value} = target;

        setstate({
            ...state,
            [name] : value
        })
    }


    const handleOnReset = ()=>
    {
        setstate(initialstate);
    }

    return { ...state, state, handleOnChange, handleOnReset, setstate };

}

