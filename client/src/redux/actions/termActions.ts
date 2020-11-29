import axios from 'axios';
import { TERM_GET, TERM_CREATE, TERM_DELETE } from '../../services/term/term.service';

export const ALL_TERMS = "ALL_TERMS";
export const CREATE_TERM = "CREATE_TERM";
export const DELETE_TERM = "DELETE_TERM";

export const allTerms = (token: String, id: any, setLoading?: any) => {
    return async (dispatch: any) => {
        await axios.get(TERM_GET.url + `/${id}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(res => {
                dispatch({
                    type: ALL_TERMS,
                    payload: res.data,
                })
                if (setLoading) {
                    setLoading(false);
                }
                console.log("Fetching...");
                return res.data
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const addTerm = (token: String, addToast: any, data: object) => {
    return async (dispatch: any) => {
        axios.post(TERM_CREATE.url, data, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(response => {
                if (response.data?.question) {
                    if (addToast) {
                        dispatch({
                            type: CREATE_TERM,
                            payload: response.data,
                        })
                        addToast("addTerm success", {
                            appearance: "success",
                            autoDismiss: true
                        })
                    }
                    // setTimeout(() => {
                    //     window.location.replace("/overview");
                    // }, 1000)
                }
                else {
                    if (addToast) {
                        addToast("addTerm failed !", {
                            appearance: "error",
                            autoDismiss: true
                        })
                    }
                    // setTimeout(() => {
                    //     window.location.reload()
                    // }, 1500)
                }
            })
            .catch(e => {
                if (addToast) {
                    addToast("send addTerm failed !", {
                        appearance: "error",
                        autoDismiss: true
                    })
                }
                // setTimeout(() => {
                //     window.location.reload()
                // }, 1500)
            })
    }
}

export const deleteTerm = (token: String, addToast: any, module_id: any, term_id: any) => {
    return async (dispatch: any) => {
        let config = {
            headers: {
                "Authorization": "Bearer " + token
            }
        };
        axios.delete(TERM_DELETE.url + `/${module_id}/${term_id}`, config)
            .then(response => {
                if (response.data != null) {
                    if (addToast) {
                            dispatch({
                                type: DELETE_TERM,
                                payload: response.data,
                            })
                            addToast("delete term success", {
                                appearance: "success",
                                autoDismiss: true
                            })
                    }
    
                }
                else {
                    if (addToast) {
                        addToast("delete term failed !", {
                            appearance: "error",
                            autoDismiss: true
                        })
                    }
                }
            })
            .catch(e => {
                if (addToast) {
                    addToast("erro when send delete !", {
                        appearance: "error",
                        autoDismiss: true
                    })
                }
            })
    }
}