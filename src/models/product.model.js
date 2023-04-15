import { DataTypes } from "sequelize";
import { sequelize } from "@/utils/connect";

const Product = sequelize.define("Product", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(45),
        allowNull: false, 
        validate: {
            len: {
                msg: "Title must be at least 3 characters.",
                args: [3, 45]
            }
        }
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isNumeric: {
                msg: "Price must be a Number."
            },
            min: {
                msg: "Price must be greater than or equal to 0.",
                args: [0]
            },
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                msg: "Description must be at least 5 characters.",
                args: [5, 255]
            }
        }
    }
}, { timestamps: true });

export default Product;