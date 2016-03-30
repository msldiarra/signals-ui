import Sequelize from 'sequelize';

const DB = new Sequelize(
    'signals',
    'postgres',
    '1234',
    {
      dialect: 'postgres',
      host: 'localhost'
    }
)

// Model types
class User {}
class Login {}
class Contact {}
class ContactInfo {}
class Customer {}
// Mock data

const TanksInAlert = DB.define('TanksInAlert', {
  tank: Sequelize.STRING,
  customer: Sequelize.STRING,
  station: Sequelize.STRING,
  liquidtype: Sequelize.STRING,
  unit: Sequelize.STRING,
  level: Sequelize.DECIMAL,
  fillingrate: Sequelize.DECIMAL,
    } , {timestamps: false, tableName: 'tanksinalert'}
);

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


DB.sync({force: false});

module.exports = {
  // Export methods that your schema can use to interact with your database
  getUser: (id) => id === viewer.id ? viewer : null,
  getViewer: () => viewer,
  DB,
  User,
  Login,
  Contact,
  ContactInfo,
  Customer
};