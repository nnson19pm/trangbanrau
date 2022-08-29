'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // order has a 1 to many relationship with a order detail foreignKey is order_id
            Order.hasMany(models.OrderDetails, {
                foreignKey: 'orderId',
                onDelete: 'cascade'
            });

            Order.belongsTo(models.User, {
                foreignKey: 'userId',
            });
        }
    }

    Order.init({
        full_name: DataTypes.STRING,
        address: DataTypes.STRING,
        phone_number: DataTypes.STRING,
        note: DataTypes.STRING,
        order_date: DataTypes.DATE,
        status: DataTypes.STRING,
        userId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Order',
        timestamps: true
    });
    return Order;
};

