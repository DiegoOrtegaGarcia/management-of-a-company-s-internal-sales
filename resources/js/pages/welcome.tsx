import { userLogout } from "@/core/services/userLogout";
import { isUserAuthenticated } from "@/core/utils/userStatus";

export default function Welcome() {
    return (
        <>
        {isUserAuthenticated() ?
            <>
                <div className="flex flex-col m-auto max-w-10/12 items-center gap-2 p-2">
                    <p>Si Estoy autenticado</p>
                    <button onClick={userLogout} className="bg-red-600 p-1 rounded-xl max-w-5/12 w-full"> Logout</button>
                </div>

            </>
            :
            "No lo esta"
        }
        </>
    );
}
