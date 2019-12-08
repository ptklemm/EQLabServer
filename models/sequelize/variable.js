module.exports = function (sequelize, DataTypes)
{
    return sequelize.define('variable',
    {
        name:
        {
            primaryKey: true,
            type: DataTypes.STRING(25),
            allowNull: false
        },
        value:
        {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        }
    },
    {
        timestamps: true,
        createdAt: false
    });
};