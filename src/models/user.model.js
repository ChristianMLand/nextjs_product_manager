import { DataTypes, ValidationError, ValidationErrorItem } from "sequelize";
import { compare, hash } from "bcrypt";
import { sequelize } from "@/utils/connect";
import Product from "@/models/product.model";

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
        validate: {
            len: {
                msg: "Username must be at least 3 characters.",
                args: [3, 45]
            }
        }
    },
    email: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "Email format is invalid."
            },
            len: {
                msg: "Email must be at least 5 characters.",
                args: [5, 45]
            }
        }
    },
    passwordHash: DataTypes.CHAR(60),
    password: {
        type: DataTypes.VIRTUAL,
        allowNull: false,
        validate: {
            len: {
                msg: "Password must be at least 8 characters.",
                args: [8, 255]
            }
        }
    },
    confirmPassword: {
        type: DataTypes.VIRTUAL,
        validate: {
            matchesPassword(value) {
                if (value !== this.password) 
                    throw new Error("Confirm password must match Password.");
            }
        }
    }
}, { timestamps: true });

const InvalidCredentialsError = () => {
    const err = new ValidationErrorItem(
        "Invalid Credentials.", 
        "validation error", 
        "password"
    );
    return new ValidationError("", [err]);
}

User.validateLogin = async function({ email, password }) {
    if (!(email && password)) {
        throw InvalidCredentialsError();
    }
    const user = await User.findOne({ where: { email } });
    if (!(user && await compare(password, user.getDataValue("passwordHash")))) {
        throw InvalidCredentialsError();
    }
    return user
}

User.beforeCreate(async user => {
    user.setDataValue('passwordHash', await hash(user.getDataValue('password'), 10))
});

User.hasMany(Product, { 
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});

Product.belongsTo(User);

export default User;