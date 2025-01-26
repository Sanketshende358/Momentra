import sanket from "../../assets/sanket.jpg"
import { Link } from "react-router-dom";
function LeftSide (){
    return(
        <div className="gap-8 pl-10 h-[570px] mt-5 overflow-scroll no-scrollbar">
            <h2 className="text-2xl font-medium">Friend Suggestion</h2>

            <div className="flex flex-col ">

            <Link to="/userprofile">
            <div className="mt-10 flex gap-3">
                <img src={sanket} alt="" className="h-16 w-16 rounded-full"/>
                <div className="w-52 flex flex-col justify-center">
                    <h3 className="text-lg font-medium">Sanket_shende358</h3>
                    <p className="text-sm text-gray-300">Sanket Shende</p>
                </div>
            </div>
            </Link>

            
            <Link to="/userprofile">
            <div className="mt-10 flex gap-3">
                <img src={sanket} alt="" className="h-16 w-16 rounded-full"/>
                <div className="w-52 flex flex-col justify-center">
                    <h3 className="text-lg font-medium">Sanket_shende358</h3>
                    <p className="text-sm text-gray-300">Sanket Shende</p>
                </div>
            </div>
            </Link>
            
            <Link to="/userprofile">
            <div className="mt-10 flex gap-3">
                <img src={sanket} alt="" className="h-16 w-16 rounded-full"/>
                <div className="w-52 flex flex-col justify-center">
                    <h3 className="text-lg font-medium">Sanket_shende358</h3>
                    <p className="text-sm text-gray-300">Sanket Shende</p>
                </div>
            </div>
            </Link>
            
            <Link to="/userprofile">
            <div className="mt-10 flex gap-3">
                <img src={sanket} alt="" className="h-16 w-16 rounded-full"/>
                <div className="w-52 flex flex-col justify-center">
                    <h3 className="text-lg font-medium">Sanket_shende358</h3>
                    <p className="text-sm text-gray-300">Sanket Shende</p>
                </div>
            </div>
            </Link>
            
            <Link to="/userprofile">
            <div className="mt-10 flex gap-3">
                <img src={sanket} alt="" className="h-16 w-16 rounded-full"/>
                <div className="w-52 flex flex-col justify-center">
                    <h3 className="text-lg font-medium">Sanket_shende358</h3>
                    <p className="text-sm text-gray-300">Sanket Shende</p>
                </div>
            </div>
            </Link>
            </div>

        </div>
    )
}

export default LeftSide;