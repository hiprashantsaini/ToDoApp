const user = require("../model/user");
const bcrypt = require('bcryptjs');

const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userInfo = await user.findOne({ email: email });
        if (userInfo) {
            return res.status(400).send({ status: false, message: "This account already exists." })
        }
        const hpassword = await bcrypt.hash(password, 10);
        console.log(req.body)
        const newUser = new user({
            name,
            email,
            password: hpassword
        })
        const info = await newUser.save();
        res.status(200).send({ status: true, info: info, message: "Your registration has been successful!" })
    } catch (error) {
        console.log("signupUser :", error.message);
        res.status(500).send({ status: false, message: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const User = await user.findOne({ email: email });
        if (!User) {
            return res.status(400).send({ status: false, message: "Invalid Email or Password!" });
        }
        const checkPass = await bcrypt.compare(password, User.password);
        if (!checkPass) {
            return res.status(400).send({ status: false, message: "Invalid Email or Password!" });
        }

        res.status(200).send({ status: true, info: User, message: "Login successful!" })
    } catch (error) {
        console.log("loginUser :", error.message);
        res.status(500).send({ status: false, message: error.message });
    }
}

const addToDo = async (req, res) => {
    try {
        const { email, todo } = req.body;
        const userData = await user.findOne({ email: email });

        userData.todoes.push({
            content: todo,
            done: false
        })

        const info = await userData.save();
        res.status(200).send({ status: true, info: info, message: "ToDo Added!" })
    } catch (error) {
        console.log("addToDo :", error.message);
        res.status(500).send({ status: false, message: error.message });
    }
}

const updateToDo = async (req, res) => {
    try {
        const { email, todo, todoId } = req.body;
        let userData = await user.findOne({ email: email });

        let udata = userData.todoes.filter((item) => item._id == todoId);
        udata[0].content = todo;
        udata[0].done = false;
        const info = await userData.save();
        res.status(200).send({ status: true, info: info, message: "ToDo Updated!" })
    } catch (error) {
        console.log("updateToDo :", error.message);
        res.status(500).send({ status: false, message: error.message });
    }
}

const doneToDo = async (req, res) => {
    try {
        const { email, todoId } = req.body;
        const userData = await user.findOne({ email: email });

        const udata = userData.todoes.filter((item) => item._id == todoId);
        udata[0].done = true;

        const info = await userData.save();

        res.status(200).send({ status: true, info: info, message: "ToDo Completed!" })
    } catch (error) {
        console.log("doneToDo :", error.message);
        res.status(500).send({ status: false, message: error.message });
    }
}

const deleteToDo = async (req, res) => {
    try {
        const { email, todoId } = req.body;
        let userData = await user.findOne({ email: email });

        userData.todoes = userData.todoes.filter((item) => item._id != todoId);
        const info = await userData.save();

        res.status(200).send({ status: true, info: info, message: "ToDo Deleted!" })
    } catch (error) {
        console.log("deleteToDo :", error.message);
        res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = {
    signupUser,
    loginUser,
    addToDo,
    updateToDo,
    doneToDo,
    deleteToDo
}