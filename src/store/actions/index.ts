import { Dispatch } from "react"
import { stateType } from "../actionTypes"
import { errorState, initialState, successState } from "../reducers/RepositoryReducers"


const ActionCreator = (text: string) => {
    return ((dispatch: Dispatch< | initialState | successState | errorState>) => {
        dispatch({ type: stateType.start_search })
        try {
            fetch(`https://registry.npmjs.org/-/v1/search?text=${text}`)
                .then(res => {
                    return res.json()
                })
                .then(
                    data => {
                        dispatch({ type: stateType.search_success, payload: data })
                    }
                )
        } catch (error) {
            dispatch({ type: stateType.search_error,message: "not found"})
        }
    })
}


export default ActionCreator;