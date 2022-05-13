export const createProject = (project) => {
    return (dispatch , getState) => {
        // Some async call
        dispatch({type:'CREATE_PROJECT',project});
    }
}