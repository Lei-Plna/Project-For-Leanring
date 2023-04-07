const RecommendCourseModel = require('../db/models/recommendCourse');

class RecommendCourseService {
  async addRecommendCourse(data) {
    const cid = data.cid;
    const result = await RecommendCourseModel.findOne({
      where: {
        cid
      }
    });
    if (result) {
      return result.update(data);
    }
    return RecommendCourseModel.create(data);
  }  
}

module.exports = new RecommendCourseService();