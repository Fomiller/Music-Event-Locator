# Ticket Master API Response

## Response object for events      
* returns response obj
    * response
* returns event obj
    * response._embedded
* returns array of events
    * response._embedded.events
* returns event array index position
    * response._embedded.events[0]
* returns event name
    * response._embedded.events[0].name
* returns event type
    * response._embedded.events[0].type
* returns event id
    * response._embedded.events[0].type
* returns url for ticketmaster.com to view event seats and prices
    * response._embedded.events[0].url

## Response object for venues
* returns event venue data
    * response._embedded.events[0]._embedded
* returns event venue array
    * response._embedded.events[0]._embedded.venues[0]
* returns event venue name
    * response._embedded.events[0]._embedded.venues[0].name
* returns event venue postal code
    * response._embedded.events[0]._embedded.venues[0].postalCode
* returns event venue city obj
    * response._embedded.events[0]._embedded.venues[0].city
* returns event venue city name === string
    * response._embedded.events[0]._embedded.venues[0].city.name
* returns event venue state obj
    * response._embedded.events[0]._embedded.venues[0].state
* returns event venue state name
    * response._embedded.events[0]._embedded.venues[0].state.name
* returns event venue state code; example === "TX", "CO";
    * response._embedded.events[0]._embedded.venues[0].state.stateCode
* returns event venue address obj
    * response._embedded.events[0]._embedded.venues[0].address
* returns event venue street address; example "1510 Polk St"
    * response._embedded.events[0]._embedded.venues[0].address.line1
* returns event venue address city and state; example "Houston, TX"
    * response._embedded.events[0]._embedded.venues[0].address.line2
* returns event venue location obj
    * response._embedded.events[0]._embedded.venues[0].location
* returns event venue longitude coordinate
    * response._embedded.events[0]._embedded.venues[0].location.longitude
* returns event venue latitude coordinate
    * response._embedded.events[0]._embedded.venues[0].location.latitude