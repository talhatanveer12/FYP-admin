import jwt from 'jsonwebtoken';


function auth(req,res,next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(400).send('access denied...')  

    try {
        const decoded = jwt.verify(token,process.env.PRIVATEKEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
    
}

export default auth;