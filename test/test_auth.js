const chai = require('chai');
// WTF is this?
const { ObjectID } = require('mongodb');
const { app } = require('./../server');
// const { users, populateUsers } = require('./seed/seed');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

it("should return hello world response", (done) => {
    chai.request(app)
        .get('/')
        .then((res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.keys('error', 'name');
            expect(res).to.have.header('content-type', "application/json; charset=utf-8");
            return done()
        })
        .catch(err => done(err))
});



describe("Authentication: ", () => {

    it("should create new user", (done) => {
        chai.request(app)
            .post('/users')
            .send({ email: "azua@makeschool.com", password: "zxcqwe123" })
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-auth');
                expect(res.body).to.have.keys('_id', 'email');
                return done();
            })
            .catch(err => done(err))
    });

    it("should return 401 if user not authenticated", (done) => {

    });


});
