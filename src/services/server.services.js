import { sequelize } from "@/utils/connect";
import User from "@/models/user.model";
import Product from "@/models/product.model";

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection established successfully");
        await sequelize.sync();// add { force: true } if need to drop schemas and re-create
        console.log("All models were synchronized successfully");
    } catch(error) {
        console.error("Unable to connect:", error);
    }
})();

const errorHandler = func => {
    return async (...args) => {
        let data, error;
        try {
            data = await func(...args);
            data = JSON.parse(JSON.stringify(data));
        } catch({ errors }) {
            error = errors.reduce((prev, { path, message }) => ({ ...prev, [path]: message }), {});
        } finally {
            return [data, error];
        }
    }
};

export const createUser = errorHandler(
    async data => await User.create(data)
);

export const deleteUser = errorHandler(
    async () => await User.destroy({ truncate: true })
)
export const tryLogin = errorHandler(
    async data => await User.validateLogin(data)
);

export const createProduct = errorHandler(
    async data => await Product.create(data)
);

export const updateProduct = errorHandler(
    async (id, data) => await Product.update(data, { where: { id } })
);

export const deleteProduct = errorHandler(
    async id => await Product.destroy({ where: { id } })
);

export const getAllProducts = errorHandler(
    async () => await Product.findAll()
);

export const getProduct = errorHandler(
    async id => await Product.findOne({ where: { id }, include: User })
);

/* 
    NOTE to create with relationship just provide the foreign key as part of the data obj
    NOTE lazy loading can be done if we don't want to immediately fetch the relationship
    would be used like:
        const product = Product.findByPk(id);
        product.user = await product.getUser();
        console.log(product.user.username);

    NOTE if needing to include nested relationships can do something like User.findAll({ include: { all: true, nested: true }});
    otherwise can manually nest { include: Model } or { include: [ModelA, ModelB] }
*/
