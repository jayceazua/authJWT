const chai = require('chai');
// WTF is this?
const { ObjectID } = require('mongodb');
const { User } = require('./../models/user');
const { app } = require('./../server');
const { users, populateUsers } = require('./seed/seed');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

it("should return hello world response", (done) => {
    beforeEach(populateUsers)
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



describe("Users: ", () => {
    // Clean database of garbage data.
    after(() => {
        User.deleteMany({})
        .exec((err, users) => {
            users.remove()
        })
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
    });

    describe("Authorization: " , () => {
        it("should return 200 if user is authenticated", (done) => {
            chai.request(app)
                .get('/bananas')
                .set('x-auth', users[0].tokens[0].token)
                .then((res) => {
                    expect(res).to.have.status(200)
                    expect(res.body.email).to.equal(users[0].email)
                    return done();
                })
                .catch(err => done(err))
        });

        it("should return 401 if user not authenticated", (done) => {
            done()
        });
    }) ;

});
