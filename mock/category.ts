import mockjs from 'mockjs';
import { categories } from './../data';

function getCategory(req, res) {
  const result = mockjs.mock(categories);
  return res.json(result);
}

export default {
  'GET /api/categories': getCategory,
  // 'GET /api/questions': getQuestions,
  // 'GET /api/test/paper': getTestPaper,
  // 'POST /api/test/result': postTestResult,
};
