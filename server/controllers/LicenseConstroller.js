import LicenseModel from "../models/LicenseModel.js";

export const createLicense = async (req, res) => {
  try {
    const doc = new LicenseModel(req.body);
    const firm = await doc.save();
    res.json(firm);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось добавить контракт!",
    });
  }
};

export const removeLicense = async (req, res) => {
  try {
    const licenseId = req.params.id;

    const license = await PostModel.findOneAndDelete({
      _id: licenseId,
    });

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось удалить контракт!",
    });
  }
};

export const fetchOne = async (req, res) => {
  try {
    const licenseId = req.params.id;

    const license = await LicenseModel.findById(licenseId);
    res.json({ license });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось найти контракт!",
    });
  }
};

export const fetchAll = async (req, res) => {
  try {
    const licenseId = req.params.id;
    
    const license = await LicenseModel.find();
    res.json({ license });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось найти контракты.!",
    });
  }
};

export const updateLicense = async (req, res) => {
  try {
    const licenseId = req.params.id;

    const { firmName, docNumber, service, endDate, docLink, comment } = req.body;
    await LicenseModel.findByIdAndUpdate(licenseId, {
      firmName,
      docNumber,
      service,
      endDate,
      docLink,
      comment
    });

    const license = await LicenseModel.findById(licenseId);
    res.json({ license });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось обновить"
    })
  }
}

export const deleteLicense = async (req, res) => {
  try {
    const licenseId = req.params.id;

    await LicenseModel.findOneAndDelete({ _id: licenseId })

    res.json({ message: "Контракт удален" })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось удалить"
    })
  }
}
