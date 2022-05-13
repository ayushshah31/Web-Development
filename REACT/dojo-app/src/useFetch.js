import {useEffect , useState} from 'react';
function useFetch(url){
    const [data,setData] = useState(null);
    const [isPending , setPending] = useState(true);
    const [error , setError] = useState(null);

    useEffect(()=>{
        const abortCont = new AbortController();
        fetch(url)
            .then(res => {
                console.log(res);
                if(!res.ok){
                    throw Error('Could not fetch the blogs data');
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                setPending(false);
                setError(null);
            })
            .catch(err => {
                if(err.message === 'AbortError'){
                    console.log("Fetch Aborted");
                } else{
                    setError("error: "+err.message);
                    setPending(false);
                }
            });

            return abortCont.abort();
    },[url]);
    return {data,isPending,error};
}
export default useFetch;