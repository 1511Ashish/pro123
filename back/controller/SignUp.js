const User = require("../model/UserData");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.Signup = async(req, res) =>{
    
    try{
        const { fullName, email, contactNumber, password, cnfrmPassword} = req.body;
        if(!fullName || !email || !contactNumber || !password || !cnfrmPassword){
            return res.status(401).json({
                success:false,
                message:"All fields are required",
            });
        }
        const existUser = await User.findOne({email});
        if(existUser){
            return res.status(401).json({
                success:false,
                message:"User already exist",
            });
        }

        if(password !== cnfrmPassword){
            return res.status(401).json({
                success:false,
                message:"Confirm Password does not match",
            });
        }
        
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }catch(error){
            return res.status(500).json({
                success:false,
                message:"error in hashing password",
            });
        }

        const response = await User.create({fullName, email, contactNumber, password:hashedPassword});

        res.status(200).json({
            success:true,
            data:response,
            message:"Data added",
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Cannot add data",
        });
    }
}

exports.Login = async(req, res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(401).json({
                success:false,
                message:"All fields are required",
            });
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User not registered, Please register first",
            });
        }
        //Generate JWT and compare password
        if(await bcrypt.compare(password, user.password)){
            const token = jwt.sign(
                {email: user.email, id: user._id},
                process.env.JWT_SECRET,
                {
                    expiresIn: "24h",
                }
            );
            user.token = token;
            user.password = undefined;
            const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};
			res.cookie("token", token, options).status(200).json({
				success: true,
				token,
				user,
				message: `User Login Success`,
			});
		} else {
			return res.status(401).json({
				success: false,
				message: `Password is incorrect`,
			});
		}
        }
    catch(error){
        console.error(error);
		// Return 500 Internal Server Error status code with error message
		return res.status(500).json({
			success: false,
			message: `Login Failure Please Try Again`,
		});
    }
}
