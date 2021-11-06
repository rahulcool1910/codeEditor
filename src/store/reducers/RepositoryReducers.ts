import { RootObject, stateType } from "../actionTypes/types";

interface RespositaryState {
    loading: boolean;
    data?: RootObject;
    message?: string
}
export interface initialState {
    type: stateType.start_search;
}
export interface errorState {
    type: stateType.search_error;
    message: string;
}
export interface successState {
    type: stateType.search_success;
    payload: RootObject;
}


type Action = initialState | successState | errorState;



const initialState: RespositaryState = {
    loading: true
}

const RepositoryReduces = (
    state: RespositaryState = initialState,
    action: | initialState | successState | errorState
): RespositaryState => {
    switch (action.type) {
        case stateType.start_search:
            return { loading: true };
        case stateType.search_success:
            return { loading: false, data: action.payload };
        case stateType.search_error:
            return { loading: false, message: action.message };
        default:
            return state;
    }
};
export default RepositoryReduces;