import { collection, Firestore, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react"
import { TClubData } from "../interfaces/clubData"

const ClubData = ({data, db}: {data: TClubData | undefined; db: Firestore}) => {
    console.log(data)
    const [proposals, setProposals] = useState<{proposal?:number, nombre:string, club:string}[] | undefined>(undefined)
    useEffect(()=>{
        const fetchData = async () => {
            if(data){
                const q = query(collection(db, "users"), where("club", "==", data.id));
                const querySnapshot = await getDocs(q);
                const results: {proposal?:number, nombre:string, club:string}[] = []
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, doc.data())
                    results.push(doc.data() as {proposal?: number, nombre:string, club:string})
                });
                return results
            }
        }
        fetchData().then(data=>setProposals(data))

    },[data, db])

    return <h1>Club data</h1>
}
export default ClubData