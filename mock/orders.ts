import mockjs from 'mockjs';
import { order } from './../data';
function getCategory(req, res) {
  const result = mockjs.mock(order);
  return res.json(result);
}

export default {
  'GET /api/orders': getCategory,
  // 'GET /api/questions': getQuestions,
  // 'GET /api/test/paper': getTestPaper,
  // 'POST /api/test/result': postTestResult,
};
