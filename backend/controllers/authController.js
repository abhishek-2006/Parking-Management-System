import {connectDB} from "../db.js";

export const login = async (req, res) => {
    try {
        const db = await connectDB();
        const { email, password } = req.body;

        const user = await db.collection("operators").findOne({ email });

        if (!email || !password)
            return res.status(400).json({ message: "Email & Password required" });
        if (!user) return res.status(404).json({ message: "User not found" });
        if (user.password !== password)
            return res.status(401).json({ message: "Invalid Login Credentials" });

        return res.json({ message: "Login success", user: { email: user.email } });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const db = await connectDB();
        const { username, email, newPassword } = req.body;
        if (!username || !email || !newPassword)
            return res.status(400).json({
                message: "Username, Email & new password required",
            });

        const emailUser = await db.collection("operators").findOne({ email });
        const usernameUser = await db.collection("operators").findOne({ username });
        
        if (!emailUser && !usernameUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Case 2 -> one invalid
        if (!emailUser || !usernameUser) {
            return res.status(400).json({ message: "Invalid Username or Email" });
        }

        // Case 3 -> both exist but must be SAME user
        const user = await db.collection("operators").findOne({ email, username });

        if (!user) {
            return res.status(400).json({ message: "Invalid Username or Email" });
        }

        if (!user) return res.status(404).json({ message: "Invalid Username or email" });
        if (user.password === newPassword) {
        return res.status(400).json({
            success: false,
            message: "New password cannot be same as current password",
        });
        }
        await db.collection("operators")
        .updateOne({ email }, { $set: { password: newPassword } });
        return res.json({ message: "Password updated successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
};