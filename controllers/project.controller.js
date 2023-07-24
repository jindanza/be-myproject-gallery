const db = require("../models");
const Project = db.project;
const Op = db.Sequelize.Op;
const multer = require("multer");

// Konfigurasi multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Tentukan folder tempat menyimpan file gambar
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Tentukan nama file gambar yang disimpan (bisa disesuaikan dengan kebutuhan)
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// create
exports.create = (req, res) => {
  // Middleware untuk menghandle upload gambar
  upload.single("gambar")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Error dari multer
      return res.status(400).send({
        message: "Multer Error: " + err.message,
        code: 400,
        data: null,
      });
    } else if (err) {
      // Error lainnya
      return res.status(500).send({
        message: "Error while uploading the image: " + err.message,
        code: 500,
        data: null,
      });
    }

    if (!req.body.nama) {
      return res.status(400).send({
        message: "Content can not be empty!",
        code: 400,
        data: null,
      });
    }

    const project = {
      nama: req.body.nama,
      deskripsi: req.body.deskripsi,
      waktu_pengerjaan: req.body.waktu_pengerjaan,
      gambar: req.file.path, // Path file gambar yang telah diupload oleh multer
    };

    Project.create(project)
      .then((data) => {
        res.status(200).send({
          message: "Add project Successfully",
          code: 200,
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the project.",
          code: 500,
          data: null,
        });
      });
  });
};

// update
exports.update = (req, res) => {
  const id = req.params.id;

  // Middleware untuk menghandle upload gambar (jika ada)
  upload.single("gambar")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Error dari multer
      return res.status(400).send({
        message: "Multer Error: " + err.message,
        code: 400,
        data: null,
      });
    } else if (err) {
      // Error lainnya
      return res.status(500).send({
        message: "Error while uploading the image: " + err.message,
        code: 500,
        data: null,
      });
    }

    // Ambil data proyek yang ingin diupdate dari req.body
    const project = {
      nama: req.body.nama,
      deskripsi: req.body.deskripsi,
      waktu_pengerjaan: req.body.waktu_pengerjaan,
    };

    // Jika ada file gambar yang diunggah, tambahkan path gambar ke dalam data proyek
    if (req.file) {
      project.gambar = req.file.path;
    }

    // Lakukan proses update
    Project.update(project, {
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.status(200).send({
            message: "project was updated successfully",
            code: 200,
            data: null,
          });
        } else {
          res.status(204).send({
            message: `Cannot update project with id=${id}. Maybe project was not found or req.body is empty!`,
            code: 204,
            data: null,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating project with id=" + id,
          code: 500,
          data: null,
        });
      });
  });
};

//findall
exports.findAll = (req, res) => {
  const nama = req.query.nama;
  let condition = nama ? { nama: { [Op.iLike]: `%${nama}%` } } : null;

  Project.findAll({ where: condition })
    .then((data) => {
      res.status(200).send({
        message: "get all projects Successfully",
        code: 200,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving projects.",
        code: 500,
        data: null,
      });
    });
};

// findone
exports.findOne = (req, res) => {
  const id = req.params.id;

  Project.findByPk(id)
    .then((data) => {
      res.status(200).send({
        message: "get one project Successfully",
        code: 200,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving project with id=" + id,
        code: 500,
        data: null,
      });
    });
};

// delete
exports.delete = (req, res) => {
  const id = req.params.id;

  Project.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "project was deleted successfully!",
          code: 200,
          data: null,
        });
      } else {
        res.status(404).send({
          message: `Cannot delete project with id=${id}. Maybe project was not found!`,
          code: 404,
          data: null,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete project with id=" + id,
        code: 500,
        data: null,
      });
    });
};

// delete all
exports.deleteAll = (req, res) => {
  Project.destroy({
    where: {},
    truncate: false,
  })

    .then((num) => {
      res.status(200).send({
        message: `${nums} project were deleted successfully!`,
        code: 200,
        data: null,
      });
    })

    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all project.",
        code: 500,
        data: null,
      });
    });
};
