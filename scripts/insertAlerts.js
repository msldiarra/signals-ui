import Sequelize from 'sequelize';
import faker from 'faker';
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

DB.sync({force: false}).then(() => _.times(100, () => {
        return Alert.create({
            tankreference: "A00000000000001",
            level: 200
            //time: moment().format()
        }).then(() => {
            return null;
        })
    })
);


export default DB;







