module.exports = {
  async up(db, client) {
    return db.collection("users").update(
      { admin: true },
      {
        $set: {
          name: "admin",
          admin: true,
          password: "admin",
          contact: "",
          email: "",
        },
      },
      { upsert: true }
    );
  },
  async down(db, client) {
  },
};
