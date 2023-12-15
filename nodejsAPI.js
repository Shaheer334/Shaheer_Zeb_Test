const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
mongoose.connect('mongodb://127.0.0.1:27017/schools', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const addressSchema = new mongoose.Schema({
    town: String,
    tehsil: String,
    district: String,
    state: String,
    address: String,
    latitude: Number,
    longitude: Number,
});
const organizationSchema = new mongoose.Schema({
    name: String,
});
const schoolSchema = new mongoose.Schema({
    name: String,
    status: String,
    startTime: String,
    endTime: String,
    shift: String,
    address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
    hasProjector: Boolean,
    hasLaptop: Boolean,
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
});
const Address = mongoose.model('Address', addressSchema);
const Organization = mongoose.model('Organization', organizationSchema);
const School = mongoose.model('School', schoolSchema);
app.use(bodyParser.json());
app.post('/api/school/:id?', async (req, res) => {
    try {
        const schoolId = req.params.id;
        const data = req.body;
        const address = await Address.findOneAndUpdate(
            {
                town: data.address.town,
                tehsil: data.address.tehsil,
                district: data.address.district,
                state: data.address.state,
                address: data.address.address,
                latitude: data.address.latitude,
                longitude: data.address.longitude,
            },
            { $setOnInsert: data.address },
            { upsert: true, new: true }
        );
        const organization = await Organization.findOneAndUpdate(
            { name: data.organization.name },
            { $setOnInsert: data.organization },
            { upsert: true, new: true }
        );
        const filter = schoolId ? { _id: schoolId } : { name: data.name };
        const update = {
            $set: {
                name: data.name,
                status: data.status,
                startTime: data.startTime,
                endTime: data.endTime,
                shift: data.shift,
                address: address._id,
                hasProjector: data.hasProjector,
                hasLaptop: data.hasLaptop,
                organization: organization._id,
            },
        };
        const options = { upsert: true, new: true };
        const updatedSchool = await School.findOneAndUpdate(filter, update, options);
        res.json({ message: 'Data processed successfully', school: updatedSchool });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get('/api/school/:id', async (req, res) => {
    try {
        const school = await School.findById(req.params.id)
            .populate('address')
            .populate('organization');

        if (!school) {
            return res.status(404).json({ error: 'School not found' });
        }
        res.json(school);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get('/api/schools', async (req, res) => {
    try {
        const schools = await School.find()
            .populate('address')
            .populate('organization');
        res.json(schools);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.delete('/api/school/:id', async (req, res) => {
    try {
        const schoolId = req.params.id;
        const deletedSchool = await School.findByIdAndDelete(schoolId);
        if (!deletedSchool) {
            return res.status(404).json({ error: 'School not found' });
        }
        await Promise.all([
            Address.findByIdAndDelete(deletedSchool.address),
            Organization.findByIdAndDelete(deletedSchool.organization),
        ]);
        res.json({ message: 'School and associated data deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.listen(PORT, () => {
  console.log(`Node.js server is running on port ${PORT}`);
});
