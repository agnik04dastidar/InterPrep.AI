import genToken from "../config/token.js"
import User from "../models/user.model.js"


export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }

        user = await User.create({ name, email, password, credits: 100 })
        
        let token = await genToken(user._id)
        res.cookie("token", token, {
            http: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json(user)
    } catch (error) {
        return res.status(500).json({ message: `Register error: ${error}` })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        // Ensure user has credits (for existing users who might have 0)
        if (!user.credits || user.credits < 0) {
            user.credits = 100;
            await user.save();
        }

        let token = await genToken(user._id)
        res.cookie("token", token, {
            http: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: `Login error: ${error}` })
    }
}


export const googleAuth = async (req,res) => {
    try {
        const {name , email} = req.body
        let user = await User.findOne({email})
        if(!user){
            user = await User.create({
                name , 
                email,
                credits: 100
            })
        } else {
            // Ensure existing user has credits
            if (!user.credits || user.credits < 0) {
                user.credits = 100;
                await user.save();
            }
        }
        let token = await genToken(user._id)
        res.cookie("token" , token , {
            http:true,
            secure:false,
            sameSite:"lax",
            maxAge:7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json(user)



    } catch (error) {
        return res.status(500).json({message:`Google auth error ${error}`})
    }
    
}

export const logOut = async (req,res) => {
    try {
        await res.clearCookie("token")
        return res.status(200).json({message:"LogOut Successfully"})
    } catch (error) {
         return res.status(500).json({message:`Logout error ${error}`})
    }
    
}
