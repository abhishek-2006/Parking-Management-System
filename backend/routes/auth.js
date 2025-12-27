import express from "express";
import {connectDB } from "../db.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const db = await connectDB();
        const { email, password } = req.body;

        if (!email || !password)
        return res.status(400).json({ message: "Email & Password required" });

        const user = await db.collection("operators").findOne({ email });

        if (!user)
        return res.status(404).json({ message: "User not found" });

        if (user.password !== password)
        return res.status(401).json({ message: "Invalid credentials" });

        return res.json({
        message: "Login success",
        user: {
            email: user.email,
        }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});

router.post("/forgot-password", async (req, res) => {
    try {
        const db = await connectDB();
        const { email, newPassword } = req.body;

        if (!email || !newPassword)
        return res.status(400).json({ message: "Email & new password required" });

        const user = await db.collection("operators").findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });
        
        if (user.password === newPassword) {
            return res.status(400).json({   
                success: false,
                message: "New password cannot be same as current password"
            });
        }

        await db.collection("operators").updateOne(
        { email },
        { $set: { password: newPassword } }
        );

        return res.json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});


export default router;
