const gurad= (key) => {
    return (req, res, next) => {
        const given = req.headers["access-token"];
  
        if (given === undefined) {
            return res.status(401).json({ message: "Unauthorized" });
          }
          const accessToken = Array.from(given).reverse().join("");
        
          if (accessToken !== key) {
            return res.status(401).json({ message: "Unauthorized" });
          }
        
          next();
    };
  };
  
  module.exports = gurad;
  