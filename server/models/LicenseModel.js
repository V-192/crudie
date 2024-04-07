import mongoose from "mongoose";

const LicenseModel = new mongoose.Schema({
  firmName: String, //Название фирмы
  docNumber: String, //Номер документа основания
  service: String, //Название услуги
  endDate: String, //Дата окончания договора
  docLink: String, //Ссылка на документы в fog
  comment: String //Комментарий
});

export default mongoose.model("license", LicenseModel);
