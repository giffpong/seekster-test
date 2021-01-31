const model = (Sequelize, DataTypes) => {
  const form1 = Sequelize.define(
    'form1',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_card: {
        type: DataTypes.STRING(8),
      },
      name: {
        type: DataTypes.STRING(6),
      },
      date_of_birth: {
        type: DataTypes.STRING(25),
      },
    },
    {
      tableName: 'form1',
      freezeTableName: true,
      timestamps: true,
      createdAt: false,
      updatedAt: false,
    }
  );
  return form1;
};
module.exports = model;
