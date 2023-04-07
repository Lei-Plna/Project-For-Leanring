const AgencyInfoModel = require('../db/models/agencyInfo');

class AgencyInfoService {
  async addAgencyInfo(data) {
    const info = await AgencyInfoModel.findOne();
    if (info) {
      return AgencyInfoModel.update(data, {
        where: {
          id: info.id
        }
      });
    }
    return AgencyInfoModel.create(data);
  }  
}

module.exports = new AgencyInfoService();