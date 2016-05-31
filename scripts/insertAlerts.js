import Sequelize from 'sequelize';
import faker from 'Faker';
import _ from 'lodash';
import moment from 'moment';

const DB = new Sequelize(
    'signals',
    'postgres',
    '1234',
    {
        dialect: 'postgres',
        host: 'localhost',
        logging: console.log,
        omitNull: true
    }
);

// {"tankReference":"A00000000000003","level":90,"time":"2015-06-28'T'15:35:09.000Z"}

const Alert = DB.define('Alert', {
        tankreference: Sequelize.STRING,
        level: Sequelize.INTEGER,
        time: Sequelize.DATE
    }, {timestamps: false, tableName: 'alert'}
);

;

// Banankabougou
// Cuve essence
DB.sync({force: false}).then(() => _.times(10, () => {
        return Alert.create({
            tankreference: "A00000000000001",
            level: 200,
            time: moment().format()
        }).then(() => {
            return null;
        })
    })
);

// Cuve Gazoil SP 91
DB.sync({force: false}).then(() => _.times(10, () => {
        return Alert.create({
            tankreference: "A00000000000002",
            level: 1000,
            time: moment().format()
        }).then(() => {
            return null;
        })
    })
);

// Cuve Gazoil SP 95
DB.sync({force: false}).then(() => _.times(10, () => {
        return Alert.create({
            tankreference: "A00000000000003",
            level: 10000,
            time: moment().format()
        }).then(() => {
            return null;
        })
    })
);

// Badalabougou

// Cuve Essence
DB.sync({force: false}).then(() => _.times(10, () => {
        return Alert.create({
            tankreference: "A00000000000011",
            level: 25000,
            time: moment().format()
        }).then(() => {
            return null;
        })
    })
);


export default DB;







