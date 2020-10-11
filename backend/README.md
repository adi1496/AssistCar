# AssistCar


### TODO

- [x] Setup Server
- [x] Setup Express App
- [x] Config .env file
- [x] Setup connection to Database
- [ ] Create the routes and controllers:
    - [x] cars
        ###TODO
        - [x] getAllCars
        - [x] getOneCar
        - [x] createNewCar
        - [x] updateCar
        - [x] deleteCar

    - [ ] users
        ###TODO
        - [ ] getAllUsers
        - [ ] getOneUser
        - [ ] createNewUser
        - [ ] updateUser
        - [ ] deleteUser
        - [x] create drivers (leaders only)

    - [ ] views
        ###TODO
        - [ ] sendPage

    - [ ] %future features%
- [ ] Create Models:
    - [x] cars + pre/post middlewares
    - [x] users
    - [ ] %future features%
- [ ] Error handler
    ###TODO
    - [x] create AppError class
    - [x] catchAsync function to avoid using try-catch
    - [x] handle sending production errors vs development errors
    - [x] unhandledRejection
    - [x] uncaughtException
    - [x] SIGTERM
- [ ] Authentication, authorisation and security
    ###TODO
    - [x] signUp
    - [x] login with JWT
    - [x] check if user is logged (also if user changed password after login)
    - [x] forgot Password
    - [x] resetPassword
    - [x] user restriction
    - [x] update password by user
- [ ] Rendering front end
- [ ] Add features
    ###TODO
    - [x] Create and send emails for development
    - [ ] Create and send emails for production
    - [x] Create ObjectIds: owner for vehicles and company owners + drivers
    - [x] Create ObjectIds: drivers for company leader