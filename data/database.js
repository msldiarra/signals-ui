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

const Customer = DB.define('customer', {
      name: Sequelize.STRING
    } , {timestamps: false, freezeTableName: true,}
);

const Contact =  DB.define('contact', {
      firstname: Sequelize.STRING,
      lastname: Sequelize.STRING,
    } , {timestamps: false, freezeTableName: true,}
);

const Login = DB.define('login', {
      login: Sequelize.STRING,
      password: Sequelize.STRING,
      enabled: Sequelize.BOOLEAN
    } , {timestamps: false, freezeTableName: true,}
);

const ContactInfo = DB.define('contactInfo', {
      email: Sequelize.STRING
    } , {timestamps: false, freezeTableName: true,}
);

const CustomerContact = DB.define('customercontact', {
      customerid: Sequelize.INTEGER,
      contactid: Sequelize.INTEGER
    } , {timestamps: false, freezeTableName: true,}
);

const ContactLogin = DB.define('contactlogin', {
      contactid: Sequelize.INTEGER,
      loginid: Sequelize.INTEGER
    } , {timestamps: false, freezeTableName: true,}
);

Customer.belongsToMany(Contact, { through: CustomerContact, foreignKey: 'customerid' });
Contact.belongsToMany(Customer, { through: CustomerContact, foreignKey: 'contactid' });

Contact.belongsToMany(Login, { through: ContactLogin, foreignKey: 'contactid' });
Login.belongsToMany(Contact, { through: ContactLogin, foreignKey: 'loginid' });

/*
 * User view for UI display need
 * */
DB.define('user', {
      firstname: Sequelize.STRING,
      lastname: Sequelize.STRING,
      login: Sequelize.STRING,
      password: Sequelize.STRING,
      email: Sequelize.STRING,
      enabled: Sequelize.BOOLEAN,
      company: Sequelize.STRING
    } , {timestamps: false, tableName: 'users'}
);

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

DB.sync({force: false});

export default DB;
