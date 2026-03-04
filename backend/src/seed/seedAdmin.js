require("dotenv").config();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("../modules/auth/user.model");

const run = async () => {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI missing");

    const username = process.env.ADMIN_USERNAME || "admin";
    const password = process.env.ADMIN_PASSWORD || "admin123";

    await mongoose.connect(uri);

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await User.updateOne(
        { username },
        { $set: { username, passwordHash, role: "admin" } },
        { upsert: true }
    );

    console.log("Seeded admin:", { username, updated: result.modifiedCount, upserted: result.upsertedCount });
    await mongoose.disconnect();
};

run().catch((e) => {
    console.error(e);
    process.exit(1);
});