import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} from 'graphql';

import {
    connectionArgs,
    connectionDefinitions,
    connectionFromArray,
    connectionFromPromisedArray,
    fromGlobalId,
    globalIdField,
    mutationWithClientMutationId,
    nodeDefinitions,
} from 'graphql-relay';

import DB from './database';


var {nodeInterface, nodeField} = nodeDefinitions(
    (globalId) => {
      var {type, id} = fromGlobalId(globalId);
      if (type === 'User') { return DB.models.user.findOne({where: {id: id}}); }
      if (type === 'Contact') { return DB.models.contact.findOne({where: {id: id}}); }
      if (type === 'ContactInfo') { return DB.models.contactInfo.findOne({where: {id: id}}); }
      if (type === 'Login') { return DB.models.login.findOne({where: {id: id}}); }
      if (type === 'Customer') { return DB.models.customer.findOne({where: {id: id}}); }
      if (type === 'TankMonitoring') { return DB.models.TankMonitoring.findOne({where: {id: id}}); }
      if (type === 'Stations') { return DB.models.Stations.findOne({where: {id: id}}); }
      if (type === 'StationTankView') { return DB.models.StationTankView.findOne({where: {id: id}}); }
      else if (type === 'TankInAlert') { return DB.models.TanksInAlert.findOne({where: {id: id}}); }
      else { return null; }
    },
    (obj) => {
      if (obj instanceof User) { return userType; }
      else if (obj instanceof Contact) { return contactType; }
      else if (obj instanceof Login) { return loginType; }
      else if (obj instanceof ContactInfo) { return contactInfoType; }
      else if (obj instanceof Customer) { return customerType; }
      else if (obj instanceof TankMonitoring) { return tankMonitoringType; }
      else if (obj instanceof Stations) { return stationsType; }
      else if (obj instanceof StationTankView) { return stationTankViewType; }
      else if (obj instanceof TankInAlert) { return tankInAlertType; }
      else { return null; }
    }
);

/**
 * Define your own types here
 */


const userType = new GraphQLObjectType({
  name: 'User',
  description: 'A person who uses our app',
  fields: () => {
    return {
      id: globalIdField('User'),
      credentials: { type: loginType, resolve(user) { return user.login } },
      contact: { type: contactType, resolve(user) { return user.login } },
      info: { type: contactInfoType, resolve(user) { return user.login } },
      company: { type: customerType, resolve(user) { return user.company } },
      tanksInAlert: {
        type: tankInAlertConnection,
        description: "A customer's collection of tanks in alert",
        args: connectionArgs,
        resolve: (_, args) => connectionFromPromisedArray(DB.models.TanksInAlert.findAll({where: {customer: 'Petrolium Limited SA'}}), args)
      },
      stations: {
        type: stationsConnection,
        description: "List of station belonging to customers",
        args: connectionArgs,
        resolve: (_, args) => connectionFromPromisedArray(DB.models.Stations.findAll({where: {customer: 'Petrolium Limited SA'}}), args)
      },
      monitoring: {
        type: tankMonitoringType,
        description: "Temporary, for demo purposes",
        resolve: () => DB.models.TankMonitoring.findOne({where: {id: 1}})
      }
    }
  },
  interfaces: [nodeInterface]
});

const customerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => {
    return {
      id: globalIdField('Customer'),
      name: { type: GraphQLString, resolve(customer) { return customer.name } },
      contacts: { type: new GraphQLList(contactType), resolve(customer) { return customer.getContacts() } }
    }
  },
  interfaces: [nodeInterface]
});

const contactType = new GraphQLObjectType({
  name: 'Contact',
  fields: () => {
    return {
      id: globalIdField('Contact'),
      firstName: { type: GraphQLString, resolve(contact) { return contact.firstname } },
      lastName: { type: GraphQLString, resolve(contact) { return contact.lastname } },
      credentials: { type: new GraphQLList(loginType), resolve(contact) { return contact.getLogins() } }
    }
  },
  interfaces: [nodeInterface]
});

const loginType = new GraphQLObjectType({
  name: 'Login',
  fields: () => {
    return {
      id: globalIdField('Login'),
      login: { type: GraphQLString, resolve(login) { return login.login } },
      password: { type: GraphQLString, resolve(login) { return login.password } },
      enabled: { type: GraphQLBoolean, resolve(login) { return login.enabled } }
    }
  },
  interfaces: [nodeInterface]
});

const contactInfoType = new GraphQLObjectType({
  name: 'ContactInfo',
  fields: () => {
    return {
      id: globalIdField('ContactInfo'),
      email: { type: GraphQLString, resolve(contactInfo) { return contactInfo.email } }
    }
  },
  interfaces: [nodeInterface]
});

var stationsType = new GraphQLObjectType({
  name: 'Stations',
  description: 'Alert on a tank',
  fields: () => ({
    id: globalIdField('Stations'),
    name: {
      type: GraphQLString,
      description: 'The name of the tank',
    },
    customer: {
      type: GraphQLString,
      description: 'customer'
    },
    reference:{
      type: GraphQLString,
      description: 'station reference'
    },
    tanks: {
      type: stationTankViewConnection,
      description: "A customer's specific station tank list information",
      args: connectionArgs,
      resolve: (stations, args) => connectionFromPromisedArray(DB.models.StationTankView.findAll({where: { stationreference: stations.reference } }), args)
    }
  }),
  interfaces: [nodeInterface]
});

var stationTankViewType = new GraphQLObjectType({
  name: 'StationTankView',
  description: 'Tank informations',
  fields: () => ({
    id: globalIdField('TankView'),
    stationid: {
      type: GraphQLInt,
      description: 'The id of station the tank belongs to',
    },
    stationreference:{
      type: GraphQLString,
      description: 'station reference'
    },
    tank: {
      type: GraphQLString,
      description: 'The name of the tank',
    },
    customer: {
      type: GraphQLString,
      description: 'customer'
    },
    station:{
      type: GraphQLString,
      description: 'station'
    },
    liquidtype: {
      type: GraphQLString,
      description: 'liquid in tank'
    },
    fillingrate: {
      type: GraphQLString,
      description: 'filling rate'
    }
  }),
  interfaces: [nodeInterface]
});

var tankInAlertType = new GraphQLObjectType({
  name: 'TankInAlert',
  description: 'Alert on a tank',
  fields: () => ({
    id: globalIdField('TankInAlert'),
    tank: {
      type: GraphQLString,
      description: 'The name of the tank',
    },
    customer: {
      type: GraphQLString,
      description: 'customer'
    },
    station:{
      type: GraphQLString,
      description: 'station'
    },
    liquidtype: {
      type: GraphQLString,
      description: 'liquid in tank'
    },
    fillingrate: {
      type: GraphQLString,
      description: 'filling rate'
    }
  }),
  interfaces: [nodeInterface]
});

var tankMonitoringType = new GraphQLObjectType({
  name: 'TankMonitoring',
  description: 'Status on tank gauge',
  fields: () => ({
    id: globalIdField('TankMonitoring'),
    measurecount: {
      type: GraphQLInt,
      description: 'total number of measure sent by tank gauge'
    },
    oldestmeasuretime: {
      type: GraphQLString,
      description: 'first registered measure'
    },
    latestmeasuretime:{
      type: GraphQLString,
      description: 'last registered measure'
    },
    latestmeasurelevel: {
      type: GraphQLFloat,
      description: 'last level sent by gauge'
    }
  }),
  interfaces: [nodeInterface]
});

/**
 * Define your own connection types here
 */
var {connectionType: tankInAlertConnection} =
    connectionDefinitions({name: 'Tanks', nodeType: tankInAlertType});
var {connectionType: stationsConnection} =
    connectionDefinitions({name: 'Stations', nodeType: stationsType});
var {connectionType: stationTankViewConnection} =
    connectionDefinitions({name: 'StationTankView', nodeType: stationTankViewType});

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    // Add your own root fields here
    viewer: {
      type: userType,
      args: {
        userID: {
          name: 'userID',
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: (root, {userID}) => DB.models.user.findOne({where: {id: userID}}),
    },
  }),
});

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
var mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // Add your own mutations here
  })
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export var Schema = new GraphQLSchema({
  query: queryType,
  // Uncomment the following after adding some mutation fields:
  // mutation: mutationType
});
