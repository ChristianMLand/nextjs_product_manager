import { withSessionRoute } from "@/utils/session";
import { getAllProducts, createProduct } from "@/services/server.services";

async function handler(req, res) {
    let data, errors;
    switch (req.method) {
        case "GET":
            [data, errors] = await getAllProducts();
            break;
        case "POST":
            console.log(req.session.user);
            [data, errors] = await createProduct({ ...req.body, UserId: req.session.user.id });
            break;
        default:
            return res.status(404).json({ message: "404 not found" });
    }
    if (errors) return res.status(400).json(errors);
    return res.json(data);
}

export default withSessionRoute(handler);