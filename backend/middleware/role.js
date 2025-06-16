module.exports = function roleMiddleware(...allowedRoles) {
  return async (req, res, next) => {
    try {
      const user = req.user;

      if (!user || !user.role) {
        return res.status(403).json({ message: 'Role not found' });
      }

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({
          message: `Access denied. Required role(s): ${allowedRoles.join(', ')}`
        });
      }

      next();
    } catch (err) {
      return res.status(500).json({ message: 'Role check failed', error: err.message });
    }
  };
};
