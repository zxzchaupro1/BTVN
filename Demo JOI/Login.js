const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),

    role: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
       
})
    .with('username', 'password')
    // .xor('username', 'password') // chỉ 1 trong 2 trường
function Login (username,password){
    try {
        const {error} = schema.validate({username,password});
    }
    catch (error) { 
        return error.details[0].message;}
    return "Đăng nhập thành công";
}
console.log(Login('cu','12314'))