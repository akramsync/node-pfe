// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
router.post('/signup', async (req, res) => {
    try {
        console.log("aaaaaaaaaa");
        const newUser = new User({
            email: req.body.email,
            password: req.body.password
        });
        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: savedUser });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Vérifiez si l'utilisateur existe dans la base de données
      const user = await User.findOne({ email });
        
      if (!user) {
        return res
          .status(401)
          .json({ error: "Incorrect email or password." });
      }
  
      // Vérifiez si le mot de passe est correct
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ error: "Incorrect email or password." });
      }
  
      // Générez un jeton d'authentification JWT
      const token = jwt.sign(
        { userId: user._id },
        "your_secret_key",
        { expiresIn: "1h" }
      );
  
      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Server error" });
    }
  });

 // Route pour récupérer un utilisateur par son identifiant
router.get('/:id', async (req, res) => {
  try {
      const user = await User.findById(req.params.id);
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// Route pour changer le mot de passe
router.post('/changepassword', async (req, res) => {
  try {
      const { id, oldPassword, newPassword, confirmPassword } = req.body;

      // Vérification si les champs sont tous présents
      if (!id || !oldPassword || !newPassword || !confirmPassword) {
          return res.status(400).json({ error: 'Please provide all required fields' });
      }

      // Recherchez l'utilisateur dans la base de données par son identifiant
      const user = await User.findById(id);
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      // Vérifiez si l'ancien mot de passe correspond à celui stocké en base de données
      const passwordMatch = await bcrypt.compare(oldPassword, user.password);
      if (!passwordMatch) {
          return res.status(400).json({ error: 'Incorrect old password' });
      }

      // Vérifiez si le nouveau mot de passe correspond à la confirmation
      if (newPassword !== confirmPassword) {
          return res.status(400).json({ error: 'New password and confirm password do not match' });
      }

      // Mettez à jour le mot de passe dans la base de données
      const hashedPassword = await bcrypt.hash(newPassword, 10); // Hachage du nouveau mot de passe
      user.password = hashedPassword;
      console.log(hashedPassword);
      await user.save();

      res.status(200).json({ message: 'Password changed successfully' });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

module.exports = router;