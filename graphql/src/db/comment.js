module.exports = (db, DataTypes) => {
  const Comments = db.define(
    "Comment",
    {
      text: DataTypes.STRING
    },
    {
      tableName: "companies_comments",
      defaultScope: {
        order: [["id", "ASC"]]
      }
    }
  );
  return Comments;
};
