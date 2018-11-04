const expect = require('expect');
const request = request('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');

const { users, populateUsers } = require('./seed/seed');

beforeEach(populateUsers);
