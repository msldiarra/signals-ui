
// Model types
class User {}
class Login {}
class Contact {}
class ContactInfo {}
class Customer {}
class TankInAlert {}

// Mock data


// edges for user ?
var tanksInAlert = [
  {id: 1, tank: 'tank 1', customer: 'customer 1', station: 'station 1', liquidType: 'liquid type 1', fillingRate: '60'},
  {id: 2, tank: 'tank 2', customer: 'customer 1', station: 'station 2', liquidType: 'liquid type 2', fillingRate: '15'},
  {id: 3, tank: 'tank 3', customer: 'customer 1', station: 'station 3', liquidType: 'liquid type 3', fillingRate: '34'}
];

var login = new Login();
login.id = 1;
login.login = "login@";
login.password = "password";

var contactInfo = new ContactInfo();
contactInfo.id = 1;
contactInfo.email = 'name@email.co';

var contact = new Contact();
contact.id = 1;
contact.firstName = 'firstName';
contact.lastName = 'lastName';
contact.contactInfoId = 1;

var customer = new Customer();
customer.id = 1;
customer.name = 'customer 1';

var viewer = new User();
viewer.id = '1';
viewer.credentials = login;
viewer.contact = contact;
viewer.info= contactInfo;
viewer.company= customer;




module.exports = {
  // Export methods that your schema can use to interact with your database
  getUser: (id) => id === viewer.id ? viewer : null,
  getViewer: () => viewer,
  getTankInAlert: (id) => tanksInAlert.find(w => w.id === id),
  getTanksInAlert: () => tanksInAlert,
  User,
  Login,
  Contact,
  ContactInfo,
  Customer,
  TankInAlert
};
