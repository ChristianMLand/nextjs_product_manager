import { withSessionRoute } from "@/utils/session";
import { tryLogin } from "@/services/server.services";

async function handler(req, res) {
    switch (req.method) {
        case "GET":
            if (req.session.user) return res.json(req.session.user);
            return res.status(401).json({ validated: false })
        case "POST":
            const [data, errors] = await tryLogin(req.body);
            if (errors) return res.status(401).json(errors);
            req.session.user = data;
            await req.session.save();
            return res.json(data);
        case "DELETE":
            req.session.destroy();
            return res.json({ message: "success" });
        default:
            return res.status(404).json({ message: "404 not found" });
    }
}

export default withSessionRoute(handler);