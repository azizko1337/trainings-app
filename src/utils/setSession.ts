import type { NextApiRequest } from "next";
import type User from "@/types/User";

function setSession(req: NextApiRequest, userData: User){
    req.session.user = {
        id: userData.id,
    };
    return req.session.save();
}

export default setSession;