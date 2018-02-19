module.exports = (db, DataTypes) => {
  const Company = db.define(
    "Company",
    {
      company_name: DataTypes.STRING,
      description: DataTypes.STRING,
      city: DataTypes.STRING,

      is_liked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      is_disliked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      is_favorited: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      tableName: "companies",
      defaultScope: {
        order: [["id", "ASC"]]
      }
    }
  );
  const Comment = db.import("./comment");

  Company.hasMany(Comment, {
    foreignKey: "company",
    sourceKey: "id"
  });
  return Company;
};
