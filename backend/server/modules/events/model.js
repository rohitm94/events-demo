import mongoose, { Schema } from 'mongoose';

const EventSchema= mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    hostId: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: false
    },
    eventTime: {
        type: Date,
        required: false
    },
    seats: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
},{collection:'event'});

export default mongoose.model('event', EventSchema);