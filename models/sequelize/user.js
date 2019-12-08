module.exports = function (sequelize, DataTypes)
{
    return sequelize.define('user',
    {
        id:
        {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        status:
        {
            type: DataTypes.ENUM('user', 'developer', 'admin'),
            defaultValue: 'user'
        },
        username:
        {
            type: DataTypes.STRING(32),
            unique: true,
        },
        email:
        {
            type: DataTypes.STRING,
            validate:
            {
                isEmail: true
            }
        },
        hash:
        {
            type: DataTypes.TEXT,
            allowNull: false
        },
        salt:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_login:
        {
            type: DataTypes.DATE
        }
    });
};