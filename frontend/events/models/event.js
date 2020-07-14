class Event {
    constructor(id, hostId, imageUrl, name, description, location, eventDate, eventTime , seats) {
      this.id = id;
      this.hostId = hostId;
      this.imageUrl = imageUrl;
      this.name = name;
      this.description = description;
      this.location = location;
      this.eventDate = eventDate;
      this.eventTime =eventTime;
      this.seats = seats;
    }
  }
  
  export default Event;