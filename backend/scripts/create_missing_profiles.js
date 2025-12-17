const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });

const User = require('../models/User');
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');
const Hod = require('../models/Hod');

async function main() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI not set in .env');
    process.exit(1);
  }

  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  const users = await User.find({});
  let created = { students: 0, faculty: 0, hod: 0 };

  for (const u of users) {
    try {
      if (u.role === 'STUDENT') {
        const exists = await Student.findOne({ user_id: u._id });
        if (!exists) {
          await Student.create({ user_id: u._id, college_email: u.college_email });
          created.students++;
          console.log(`Created Student profile for user ${u._id}`);
        }
      } else if (u.role === 'FACULTY') {
        const exists = await Faculty.findOne({ user_id: u._id });
        if (!exists) {
          await Faculty.create({ user_id: u._id, college_email: u.college_email });
          created.faculty++;
          console.log(`Created Faculty profile for user ${u._id}`);
        }
      } else if (u.role === 'HOD') {
        const exists = await Hod.findOne({ user_id: u._id });
        if (!exists) {
          await Hod.create({ user_id: u._id, college_email: u.college_email });
          created.hod++;
          console.log(`Created HOD profile for user ${u._id}`);
        }
      }
    } catch (err) {
      console.error('Error processing user', u._id, err.message);
    }
  }

  console.log('Done. Created:', created);
  await mongoose.disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
