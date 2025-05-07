const CaptainModel = require("../models/captain.model");

module.exports.createCaptain = async ({
  fullname,
  email,
  password,
  vehicle,
  color,
  plate,
  capacity,
  vehicleType,
}) => {
    if(!fullname || !email || !password || !vehicle || !color || !plate || !capacity || !vehicleType) { 
        throw new Error("All fields are required");
    }

    const captain = await CaptainModel.create({
        fullname,
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType,
        },
    });

    return captain;
};
 