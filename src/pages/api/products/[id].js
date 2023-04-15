import { getProduct, updateProduct, deleteProduct } from "@/services/server.services";
import { withSessionRoute } from "@/utils/session";

// TODO handle this as middleware instead maybe
const validateOwnership = async (userId, productId) => {
    let [data, errors] = await getProduct(productId);
    if (data && data.UserId !== userId) {
        errors = { validated: false };
    }
    return [data, errors]
}

async function handler(req, res) {
    let data, errors;
    switch(req.method) {
        case "GET":
            [data, errors] = await getProduct(req.query.id);
            break;
        case "PUT" || "PATCH":
            [data, errors] = await validateOwnership(req.session.user.id, req.query.id);
            if (errors) break;
            [data, errors] = await updateProduct(req.query.id, req.body);
            break;
        case "DELETE":
            [data, errors] = await validateOwnership(req.session.user.id, req.query.id);
            if (errors) break;
            [data, errors] = await deleteProduct(req.query.id);
            break;
        default:
            return res.status(404).json({ message: "404 not found" });
    }
    if (errors) return res.status(400).json(errors);
    return res.json(data);
}

export default withSessionRoute(handler);