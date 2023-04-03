// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { UserProfrile } = initSchema(schema);

export {
  UserProfrile
};