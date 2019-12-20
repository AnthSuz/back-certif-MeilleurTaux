const express = require("express");
const router = express.Router();
const mailgun = require("mailgun-js");

const API_KEY = process.env.API_KEY_MAILGUN;
const DOMAIN = process.env.DOMAIN_MAILGUN;

const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });

const uid2 = require("uid2");

const ProjetImmo = require("../models/models_projetImmo");

// ----- CREATE -----
router.post("/createprojet", async (req, res) => {
  try {
    const {
      ref,
      type,
      state,
      use,
      situation,
      country,
      city,
      amountProperty,
      amountWorks,
      notary,
      total,
      mail
    } = req.fields;

    const newProjetImmo = new ProjetImmo({
      ref: ref,
      type: type,
      state: state,
      use: use,
      situation: situation,
      country: country,
      city: city,
      amountProperty: amountProperty,
      amountWorks: amountWorks,
      notary: notary,
      total: total,
      mail: mail
    });
    newProjetImmo.ref = uid2(10);
    await newProjetImmo.save();
    res.json(`${newProjetImmo.ref}`);
    mg.messages().send(
      {
        from: "Mailgun Sandbox <postmaster@" + DOMAIN + ">",
        to: newProjetImmo.mail,
        subject: "MeilleurTaux.com - Réception de votre dossier.",
        text:
          "Bonjour," +
          "\n" +
          "\n" +
          "Nous avons bien réçu votre demande, si vous êtes pas trop pauvre on va peut être l'accepter !" +
          "\n" +
          "\n" +
          "Votre dossier est le : " +
          newProjetImmo.ref +
          "\n" +
          "\n" +
          "À bientôt sur MeilleurTaux.com"
      },
      (error, body) => {
        console.log(body);
      }
    );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ----- READ -----

router.get("/search", async (req, res) => {
  try {
    const readProjetImmo = await ProjetImmo.find();
    res.json(readProjetImmo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ---- READ BY REF ----

router.get("/search/:id", async (req, res) => {
  try {
    const searchProjetImmo = await ProjetImmo.findById(req.params.id);

    if (searchProjetImmo) {
      res.json(searchProjetImmo);
    } else {
      res.status(401).json({ message: "Dossier non trouvé" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ----- DELETE -----

router.post("/delete/:id", async (req, res) => {
  try {
    const deleteProjetImmo = await ProjetImmo.findById(req.params.id);

    if (deleteProjetImmo) {
      await deleteProjetImmo.remove();
      res.json({ message: "Dossier supprimé" });
    } else {
      res.status(401).json({ message: "Dossier non trouvé" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
