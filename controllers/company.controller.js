import { Company } from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import datauri from "../utils/datauri.js";

export const registerCompany = async (req, res) => {
  // console.log(req)
  try {
    const { companyName } = req.body;
    console.log(companyName)
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "Can't register same company again",
        success: false,
      });
    }
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });
    return res.status(201).json({
      message: "Company registered successfully",
      company,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};
export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    // console.log(userId)
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(400).json({
        message: "Companies not found.",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(400).json({
        message: "Companies not found.",
        success: false,
      });
    }
    return res.status(201).json({
      company,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};
export const updateCompany = async (req, res) => {
  try {
      const { name, description, website, location } = req.body;

      const file = req.file;
      // idhar cloudinary ayega
      const fileUri = datauri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      const logo = cloudResponse.secure_url;
  
      const updateData = { name, description, website, location, logo };

      const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

      if (!company) {
          return res.status(404).json({
              message: "Company not found.",
              success: false
          })
      }
      return res.status(200).json({
          message:"Company information updated.",
          success:true
      })

  } catch (error) {
      console.log(error);
  }
}
