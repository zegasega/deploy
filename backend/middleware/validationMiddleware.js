module.exports = function validateBody(schema) {
  return (req, res, next) => {
    if (!schema || typeof schema.validate !== 'function') {
      console.error("❌ Geçersiz Joi şeması:", schema);
      return res.status(500).json({ message: "Validation schema is invalid" });
    }

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        errors: error.details.map(detail => detail.message),
      });
    }

    next();
  };
};