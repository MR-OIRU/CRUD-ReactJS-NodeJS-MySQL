// import

const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs');
const mysql = require('mysql2')

// connect mysql

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud'
})

//check page Login & page Register
function isLogin(req,res,next){
    const user = req.session.user
    if(user){
        if(user.Role === 'User'){
            return res.json({ message : 'Role : User'});
        }else{
            return res.json({ message : 'Role : Admin'});
        }
    }else{
        return next()
    }
}
// ------------------------------------- Register -------------------------------------

router.get('/register', isLogin, async (req,res) => {
    try{
    }catch(err){
        console.log(err)
        res.status(500).json({ message : 'Server Error!!'})
    }
})

router.post('/register', async (req,res) => {
    try{
        const { Role,Username,Email,FirstName,
                LastName,Sex,Phone,Password
            } = req.body
        const normalizedEmail = Email.toLowerCase();
        /* if(!Username){ return res.status(400).json({ message : 'Username is required!!' }) }
        // CheckEmail
        if(!normalizedEmail){ return res.status(400).json({ message : 'Email is required!!' }) }
        // CheckPassword
        if(!Password){
            return res.status(400).json({ message : 'Password is required!!' })
        }else{
            if( Password !== confirmPassword){
                return res.status(400).json({ message : 'password not match' })
            }
        }*/

        // Check in database
        const CheckMember = ' SELECT * FROM member WHERE Username = ? OR Email = ? '
        const [results] = await db.promise().query(CheckMember,[Username,normalizedEmail])
            if (results.length > 0) {
                const duplicateUsername = results.find(row => row.Username === Username);
                const duplicateEmail = results.find(row => row.Email === normalizedEmail);
                if (duplicateUsername) {
                    return res.status(400).json({ message: 'Username already exists!!' });
                }
                if (duplicateEmail) {
                    return res.status(400).json({ message: 'Email already exists!!' });
                }
            }

        //insetMember
        const insertMember = `  INSERT INTO member 
                                (Role, Username, Email, Password, FirstName, LastName, Sex, Phone) 
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?) `;
        const hashPassword = await bcrypt.hash(Password,10)
        await db.promise().query(insertMember, [Role, Username, normalizedEmail, hashPassword, FirstName, LastName, Sex, Phone]);

        return res.status(200).json({ message: 'Register success' });

    }catch(err){
        console.log(err)
        res.status(500).json({ message : 'Server Error!!'})
    }
})

// ------------------------------------- Login -------------------------------------

router.get('/', isLogin, async (req,res) => {
    try{
        
    }catch(err){
        console.log(err)
        res.status(500).json({ message : 'Server Error!!'})
    }
})
router.post('/login',async (req,res) => {
    try{
        const { Username , Password } = req.body
        if(!Username){ return res.status(400).json({ message : 'Username is required!!' }) }
        if(!Password){ return res.status(400).json({ message : 'Password is required!!' }) }
        const Check = 'SELECT * FROM member WHERE Username = ? OR Email = ? '
        const [results] = await db.promise().query(Check,[Username,Username])
        if (results.length > 0) {
            const passwordHash = results[0].Password;
            const checkPassword = await bcrypt.compare(Password,passwordHash)
            if(checkPassword){
                req.session.user = {
                    Role : results[0].Role,
                    Username : results[0].Username,
                    Login : true,
                }
                return res.status(200).json({message : 'Login Successfully!!'})
            }else{
                return res.status(400).json({message : 'Invalid password!!'})
            }
        } else {
            return res.status(400).json({message : 'Username Or Email not found!!'})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({ message : 'Server Error!!'})
    }
})

// ------------------------------------- Admin -------------------------------------

//check page Admin
function isAdmin(req,res,next){
    const user = req.session.user
    if(user){
        if(user.Role === 'Admin'){
            return next()
            
        }else{
            return res.json({ message : 'Role : User '});
        }
    }else{
        return res.json({ message : 'Role : None'});
    }
}

router.get('/admin' ,isAdmin, async (req,res) => {
    try{
        res.send('page Admin')
    }catch(err){
        console.log(err)
        res.status(500).json({ message : 'Server Error!!'})
    }
})

router.post('/admin', async (req,res) => {
    try{
        res.send('Hello admin')
    }catch(err){
        console.log(err)
        res.status(500).json({ message : 'Server Error!!'})
    }
})

router.get('/admin/member' , isAdmin , async (req,res) => {
    try{
        const queryMember = "SELECT * FROM Member"
        const [results] = await db.promise().query(queryMember)
        if (results.length > 0) {
            return res.status(200).json(results)
        }else{
            return res.status(400).json({ message : 'QueryMember Error!!'})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({ message : 'Server Error!!'})
    }
})

router.post('/admin/member/insert', async (req,res) => {
    try{
        const { Role,Username,Email,FirstName,
            LastName,Sex,Phone,Password,confirmPassword
        } = req.body
        const normalizedEmail = Email.toLowerCase();
        // CheckUsername
        if(!Username){ return res.status(400).json({ message : 'Username is required!!' }) }

        // CheckEmail
        if(!normalizedEmail){ return res.status(400).json({ message : 'Email is required!!' }) }

        // CheckPassword
        if(!Password){
            return res.status(400).json({ message : 'Password is required!!' })
        }else{
            if( Password !== confirmPassword){
                return res.status(400).json({ message : 'password not match' })
            }
        }

        // Check in database
        const CheckMember = ' SELECT * FROM member WHERE Username = ? OR Email = ? '
        const [results] = await db.promise().query(CheckMember,[Username,normalizedEmail])
            if (results.length > 0) {
                const duplicateUsername = results.find(row => row.Username === Username);
                const duplicateEmail = results.find(row => row.Email === normalizedEmail);
                if (duplicateUsername) {
                    return res.status(400).json({ message: 'Username already exists!!' });
                }
                if (duplicateEmail) {
                    return res.status(400).json({ message: 'Email already exists!!' });
                }
            }

        //insetMember
        const insertMember = `  INSERT INTO member 
                                (Role, Username, Email, Password, FirstName, LastName, Sex, Phone) 
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?) `;
        const hashPassword = await bcrypt.hash(Password,10)
        await db.promise().query(insertMember, [Role, Username, normalizedEmail, hashPassword, FirstName, LastName, Sex, Phone]);

        return res.status(200).json({ message: 'InsetMember success' });
    }catch(err){
        console.log(err)
        res.status(500).json({ message : 'Server Error!!'})
    }
})

router.post('/admin/member/edit', async (req,res) => {
    try{
        const { user } = req.body
        const queryMember = "SELECT * FROM Member WHERE Username = ?"
        const [results] = await db.promise().query(queryMember, [user])
        if (results.length > 0) {
            return res.status(200).json(results[0])
        }else{
            return res.status(400).json({ message : 'QueryMember By Username Error!!'})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({ message : 'Server Error!!'})
    }
})

router.post('/admin/member/update', async (req,res) => {
    try{
        const { OldEmail , newData } = req.body
        // CheckValue
        if(!newData.Role || !newData.Email || !newData.FirstName || !newData.LastName || !newData.Sex || !newData.Phone){ 
            return res.status(400).json({ message : 'Value is required!!' }) 
        }
        //Update
        const updateMember = `UPDATE member 
                                SET Role = ?, Email = ?, FirstName = ?, LastName = ?, Sex = ?, Phone = ? 
                                WHERE Username = ?`
        if(OldEmail === newData.Email){
            const [results] = await db.promise().query(updateMember, 
                [
                    newData.Role, newData.Email, newData.FirstName, 
                    newData.LastName, newData.Sex, 
                    newData.Phone, newData.Username
                ]);

            if (results.affectedRows > 0) {  // ตรวจสอบว่ามีการอัพเดตจริงหรือไม่
                return res.status(200).json({ message: 'Update Member By Username success!!' });
            } else {
                return res.status(400).json({ message: 'Update Member By Username Error!!' });
            }
        }else{
            const checkEmail = "SELECT * FROM member WHERE Email = ?"
            const [emailResults] = await db.promise().query(checkEmail,newData.Email)
            if(emailResults.length > 0){
                return res.status(400).json({ message: 'This email is already in use by another user in the system.' });
            }else{
                const [results] = await db.promise().query(updateMember, 
                    [
                        newData.Role, newData.Email, 
                        newData.FirstName, newData.LastName, 
                        newData.Sex, newData.Phone, 
                        newData.Username
                    ]);

                if (results.affectedRows > 0) {  // ตรวจสอบว่ามีการอัพเดตจริงหรือไม่
                    return res.status(200).json({ message: 'Update Member By Username success!!' });
                } else {
                    return res.status(400).json({ message: 'Update Member By Username Error!!' });
                }
            }
        }
    }catch(err){
        console.log(err)
        res.status(500).json({ message : 'Server Error!!'})
    }
})

router.post('/admin/member/delete', async (req,res) => {
    try{
        const { Username } = req.body
        const deleteMember = "DELETE FROM member WHERE Username = ?"
        const [results] = await db.promise().query(deleteMember,Username)
        if(results.affectedRows > 0){
            return res.status(200).json({ message : 'Delete Member Success!!'})
        }else{
            return res.status(400).json({ message : 'Delete Member Error!!'})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({ message : 'Server Error!!'})
    }
})

// ------------------------------------- Member -------------------------------------

//check page Member
function isMember(req,res,next){
    const user = req.session.user
    if(user){
        if(user.Role === 'User'){
            return next()
            
        }else{
            return res.json({ message : 'Role : Admin'});
        }
    }else{
        return res.json({ message : 'Role : None'});
    }
}
router.get('/member',isMember, async (req,res) => {
    try{
        console.log('page member')
    }catch(err){
        console.log(err)
        res.status(500).json({ message : 'Server Error!!'})
    }
})

router.post('/member', async (req,res) => {
    try{
        res.send('Hello Member')
    }catch(err){
        console.log(err)
        res.status(500).json({ message : 'Server Error!!'})
    }
})

// export
module.exports = router