module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define(
    "project",
    {
      nama: {
        type: Sequelize.STRING,
      },
      deskripsi: {
        type: Sequelize.STRING,
      },
      waktu_pengerjaan: {
        type: Sequelize.STRING,
      },
      gambar: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamp: true,
      tableName: "projects",
    }
  );

  return Project;
};
