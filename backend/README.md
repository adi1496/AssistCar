# AssistCar

## BACKEND
### TODO

- [x] Setup Server
- [x] Setup Express App
- [x] Config .env file
- [x] Setup connection to Database
- [ ] Create the routes and controllers:
    - [x] cars
        #### TODO
        - [x] getAllCars
        - [x] getOneCar
        - [x] createNewCar
        - [x] updateCar
        - [x] deleteCar

    - [ ] users
        #### TODO
        - [ ] getAllUsers
        - [ ] getOneUser
        - [ ] createNewUser
        - [ ] updateUser
        - [ ] deleteUser
        - [x] create drivers (leaders only)
        - [x] add and remove drivers to a car

    - [ ] views
        #### TODO
        - [x] send Templates

    - [ ] %future features%
- [ ] Create Models:
    - [x] cars + pre/post middlewares
    - [x] users
    - [ ] %future features%
- [ ] Error handler
    #### TODO
    - [x] create AppError class
    - [x] catchAsync function to avoid using try-catch
    - [x] handle sending production errors vs development errors
    - [x] unhandledRejection
    - [x] uncaughtException
    - [x] SIGTERM
- [ ] Authentication, authorisation and security
    #### TODO
    - [x] signUp
    - [x] login with JWT
    - [x] check if user is logged (also if user changed password after login)
    - [x] forgot Password
    - [x] resetPassword
    - [x] user restriction
    - [x] update password by user
    - [x] activate account (drivers only)
- [ ] Add features
    #### TODO
    - [x] Create and send emails for development
    - [ ] Create and send emails for production
    - [x] Create ObjectIds: owner for vehicles and company owners + drivers
    - [x] Create ObjectIds: drivers for company leader
- [ ] Sending data to frontend

## FRONTEND

### TODO
- [x] Create and style home page for guests
- [x] Create and style login page
- [x] Create and style signup page
- [x] Create and style overview page
- [x] Create and style account settings page
- [ ] Create and style call-assistance page
- [x] Add loading screen on the begining
- [x] Create randering functions

### Functionality
- [x] Login page
- [x] Logout button
- [x] Sign Up page
    - [x] Added isCompany button + company name field
- [ ] Overview page
    - [x] Load details about insurance and others
    - [x] Progress bar working (changing css variable)
    - [x] Select-car button
- [x] Account settings
    - [x] Edit Profile
    - [x] Upload Photo
    - [x] Change Password
    - [ ] Notifications
    - [ ] Choose plan


## Other things to do
- [ ] Refactor code to eliminate repeating