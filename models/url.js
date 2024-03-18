const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({ 
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  date: {
    type: String,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user']
  }
}, {
  timestamps: true
});

const Url = mongoose.model('Url', UrlSchema);
 
function validateUrl(url) {
  const schema = Joi.object({
    originalUrl: Joi.string().uri().required(),  
    customName: Joi.string().min(5).max(255), 
   });

  const validation = schema.validate(url);
  return validation
};

exports.Url = Url;
exports.validate = validateUrl;
