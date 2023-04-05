const SliderModel = require('../db/models/slider');

class SliderService {
  async addSliderData(data) {
    return await SliderModel.create(data);
  }
  
}

module.exports = new SliderService();