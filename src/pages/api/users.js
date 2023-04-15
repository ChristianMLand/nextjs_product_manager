import { withSessionRoute } from "@/utils/session";
import { createUser } from "@/services/server.services";

async function handler(req, res) {
    switch (req.method) {
        case "POST":
            const [data, errors] = await createUser(req.body);
            if (errors) return res.status(400).json(errors);
            req.session.user = data;
            await req.session.save();
            return res.json(data);
        default:
            return res.status(404).json({ message: "404 not found" });
    }
}

export default withSessionRoute(handler);