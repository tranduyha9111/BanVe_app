import History from "@/app/profile/history/components/History";
import next from "next";

export default function page(){
    return( 
        <div className="min-h-screen bg-gray-50">
            <History/>
        </div>
    )
}