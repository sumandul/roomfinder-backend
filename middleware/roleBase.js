const authorizeRole = (requiredRoles) => {
    return (req, res, next) => {
      if (!requiredRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access forbidden' });
      }
      next();
    };
  };
  
  module.exports = authorizeRole;
  