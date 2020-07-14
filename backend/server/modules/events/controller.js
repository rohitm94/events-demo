import Event from './model';

export const createEvent = async (req,res) => {
    const {id,hostId,imageUrl,name,description,location,eventDate,eventTime,seats} = req.body;
    const newEvent = new Event({id,hostId,imageUrl,name,description,location,eventDate,eventTime,seats});
    
    try{
        return res.status(201).json({ event: await newEvent.save() })
    }
    catch(e){
        return res.status(e.status).json({error: true,message: 'Error with Event create'});
        
    }
}

export const getALLEvents = async (req,res) => {
    try{
        const response = await Event.find();

        return res.status(200).json(response);
        
    }
    catch(e){
        return res.status(e.status).json({error: true,message: 'Error with get all Events'});
        
    }
}