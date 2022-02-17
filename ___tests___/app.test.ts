import { db } from '../db/connection.js'
import * as testData from '../db/data/test-data/index'
import { seed } from '../db/seeds/seed.js'
import { app } from '../app.js'
import * as request from 'supertest'


// beforeEach(() => seed(testData))