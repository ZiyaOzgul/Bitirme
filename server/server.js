import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import NotesSchema from "./schemas/NotesSchema.js";
import PlansSchema from "./schemas/PlansSchema.js";
import pkg from "body-parser";

const { json } = pkg;
const app = express();
dotenv.config();

app.use(cors());
app.use(json());
mongoose
  .connect(process.env.Mongo_Url)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("mongo connected listening port 3001");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/notes", (req, res) => {
  NotesSchema.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/notes", (req, res) => {
  const values = {
    title: req.body.title,
    note: req.body.note,
  };
  console.log(values);
  const Note = new NotesSchema(values);
  Note.save()
    .then(() => {
      console.log("not kaydedildi");
    })
    .catch((err) => {
      console.log("not kaydedilemedi", err);
    })
    .finally(() => {
      NotesSchema.find().then((result) => res.send(result));
    });
});

app.patch("/notes:id", (req, res) => {
  const id = req.params.id;
  const index = NotesSchema.findById(id);
  const values = {
    title: req.body.title,
    note: req.body.note,
  };
  if (index != "") {
    NotesSchema.findByIdAndUpdate(id, values, { new: true })
      .then(() => console.log("notlar güncellendi"))
      .catch((err) => {
        console.log("Güncelleme hatası :", err);
      })
      .finally(() => {
        NotesSchema.find().then((result) => {
          res.send(result);
        });
      });
  }
});

app.delete("/notes/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  NotesSchema.deleteOne({ _id: id })
    .then(() => {
      console.log("not silindi");
    })
    .catch((err) => {
      console.log("not silinemedi", err);
    })
    .finally(() => NotesSchema.find().then((result) => res.send(result)));
});

//!

app.get("/plans", (req, res) => {
  PlansSchema.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/plans", (req, res) => {
  const values = {
    title: req.body.title,
    plan: req.body.plan,
    planDate: req.body.planDate,
  };
  const Plan = new PlansSchema(values);
  Plan.save()
    .then(() => {
      console.log("plan kaydedildi");
    })
    .catch((err) => {
      console.log("plan kaydedilemedi", err);
    })
    .finally(() => {
      PlansSchema.find().then((result) => res.send(result));
    });
});

app.patch("/plans/:id", (req, res) => {
  const id = req.params.id;
  const index = PlansSchema.findById(id);
  const values = {
    title: req.body.title,
    plan: req.body.plan,
  };
  if (index != "") {
    PlansSchema.findByIdAndUpdate(id, values, { new: true })
      .then(() => {
        console.log("plan güncellendi");
      })
      .catch((err) => {
        console.log("plan güncellenemedi :", err);
      })
      .finally(() => {
        PlansSchema.find().then((result) => res.send(result));
      });
  }
});

app.delete("/plans/:id", (req, res) => {
  const delId = req.params.id;
  PlansSchema.deleteOne({ _id: delId })
    .then(() => console.log("plan silindi"))
    .catch((err) => console.log("plan silinemedi ", err))
    .finally(() => {
      PlansSchema.find().then((result) => res.send(result));
    });
});
