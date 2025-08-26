import User from "../model/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
      const hashedPassword = await bcrypt.hash(password, 10);
    // create new user (isAdmin defaults to false)
    const newUser = new User(
        {
         fullname :fullname,
         email:email,
         password:hashedPassword,
         isAdmin: false
         }
        );
    await newUser.save();

    res.status(201).json({ message: "User created successfully", user: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        isAdmin: newUser.isAdmin
      }, });
  } catch (error) {
    console.log("Error in signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create admin user with secret key
export const createAdminWithKey = async (req, res) => {
  try {
    const { fullname, email, password, adminKey } = req.body;
    
    // Check if the admin key is correct (in a real app, this would be more secure)
    const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || "admin-secret-key-12345";
    if (adminKey !== ADMIN_SECRET_KEY) {
      return res.status(400).json({ message: "Invalid admin key" });
    }

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new admin user
    const newAdmin = new User({
      fullname: fullname,
      email: email,
      password: hashedPassword,
      isAdmin: true
    });
    
    await newAdmin.save();

    res.status(201).json({
      message: "Admin user created successfully",
      user: {
        id: newAdmin._id,
        fullname: newAdmin.fullname,
        email: newAdmin.email,
        isAdmin: newAdmin.isAdmin
      }
    });
  } catch (error) {
    console.log("Error in createAdminWithKey:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create admin user (special endpoint for creating first admin)
export const createAdmin = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new admin user
    const newAdmin = new User({
      fullname: fullname,
      email: email,
      password: hashedPassword,
      isAdmin: true
    });
    
    await newAdmin.save();

    res.status(201).json({
      message: "Admin user created successfully",
      user: {
        id: newAdmin._id,
        fullname: newAdmin.fullname,
        email: newAdmin.email,
        isAdmin: newAdmin.isAdmin
      }
    });
  } catch (error) {
    console.log("Error in createAdmin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        res.status(200).json({ message: "Login successful", user:{
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            isAdmin: user.isAdmin
        } });
        
    } catch (error) {
        console.log("Error in login:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}
