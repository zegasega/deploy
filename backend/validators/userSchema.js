const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.base': 'Kullanıcı adı metin olmalıdır.',
      'string.empty': 'Kullanıcı adı boş bırakılamaz.',
      'string.min': 'Kullanıcı adı en az {#limit} karakter olmalıdır.',
      'string.max': 'Kullanıcı adı en fazla {#limit} karakter olabilir.',
      'any.required': 'Kullanıcı adı zorunludur.'
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.base': 'E-posta adresi metin olmalıdır.',
      'string.empty': 'E-posta adresi boş bırakılamaz.',
      'string.email': 'Geçerli bir e-posta adresi giriniz.',
      'any.required': 'E-posta adresi zorunludur.'
    }),

  password: Joi.string()
    .min(6)
    .max(50)
    .required()
    .pattern(new RegExp('[a-zA-Z0-9@#%!^&*()_+]+'))
    .messages({
      'string.base': 'Şifre metin olmalıdır.',
      'string.empty': 'Şifre boş bırakılamaz.',
      'string.min': 'Şifre en az {#limit} karakter olmalıdır.',
      'string.max': 'Şifre en fazla {#limit} karakter olabilir.',
      'string.pattern.base': 'Şifre özel karakterler içerebilir: @#%!^&*()_+',
      'any.required': 'Şifre zorunludur.'
    }),

  role: Joi.string()
    .valid('user', 'admin', 'superadmin')
    .default('user')
    .messages({
      'string.base': 'Rol metin olmalıdır.',
      'any.only': 'Rol sadece şu değerlerden biri olabilir: user, admin, superadmin.'
    })
});

module.exports = userSchema;
