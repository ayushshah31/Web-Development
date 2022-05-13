const initState = {
    projects: [
        {id:'1' , title:'Study Study Study' , content:'blah blah blah'},
        {id:'2' , title:'Complete redux' , content:'blah blah blah'},
        {id:'3' , title:'Hello this is Ayush' , content:'blah blah blah'}
    ]
};

const projectReducer = (state=initState,action) => {
    switch(action.type){
        default: 
            console.log('default');
            break;
        case 'CREATE_PROJECT':
            console.log('project created',action.project);
            break;
    }
    return state;
}

export default projectReducer;