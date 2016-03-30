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

import {
  // Import methods that your schema can use to interact with your database
    DB,
    User,
    Login,
    Contact,
    ContactInfo,
    Customer,
    getUser,
    getViewer,
    getTanksInAlert,
    getTankInAlert,
} from './database';

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
var {nodeInterface, nodeField} = nodeDefinitions(
    (globalId) => {
      var {type, id} = fromGlobalId(globalId);
      if (type === 'User') {return getUser(id); }
      else if (type === 'TankInAlert') { return DB.models.TanksInAlert.findOne({where: {id: id}}); }
      else { return null; }
    },
    (obj) => {
      if (obj instanceof User) { return userType; }
      else if (obj instanceof TankInAlert) { return tankInAlertType; }
      else { return null; }
    }
);

/**
 * Define your own types here
 */

var userType = new GraphQLObjectType({
  name: 'User',
  description: 'A person who uses our app',
  fields: () => ({
    id: globalIdField('User'),
    tanksInAlert: {
      type: tankInAlertConnection,
      description: 'A customer\'s collection of tanks in alert',
      args: connectionArgs,
      resolve: (_, args) => connectionFromPromisedArray(DB.models.TanksInAlert.findAll({where: {customer: 'Petrolium Limited SA'}}), args)
    }
  }),
  interfaces: [nodeInterface],
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

/**
 * Define your own connection types here
 */
var {connectionType: tankInAlertConnection} =
    connectionDefinitions({name: 'Widget', nodeType: tankInAlertType});

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
      resolve: () => getViewer(),
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
