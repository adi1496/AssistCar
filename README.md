# AssistCar

## BACKEND
### TODO

- [x] Setup Server
- [x] Setup Express App
- [x] Config .env file
- [x] Setup connection to Database
### Create the routes and controllers:
- [x] cars
    #### TODO
    - [x] getAllCars
    - [x] getOneCar
    - [x] createNewCar
    - [x] updateCar
    - [x] deleteCar

- [x] users
    #### TODO
    - [ ] getAllUsers
    - [ ] getOneUser
    - [ ] createNewUser
    - [ ] updateUser
    - [ ] deleteUser
    - [x] create drivers (leaders only)
    - [x] add and remove drivers to a car

- [x] views
    #### TODO
    - [x] Templates
    - [x] Create Pages and send to the client

### Create Models:
- [x] cars + pre/post middlewares
- [x] users
- [ ] %future features%

#### Error handler
- [x] create AppError class
- [x] catchAsync function to avoid using try-catch
- [x] handle sending production errors vs development errors
- [x] unhandledRejection
- [x] uncaughtException
- [x] SIGTERM
- [x] browser rendering errors

#### Authentication, authorisation and security
- [x] signUp
- [x] login with JWT
- [x] check if user is logged (also if user changed password after login)
- [x] forgot Password
- [x] resetPassword
- [x] user restriction
- [x] update password by user
- [x] activate account (drivers only)
- [ ] Rate Limiting
- [ ] Preventing parameter pollution
- [ ] Security headers (helmet package)
- [ ] Encrypted Passwords (bcryptjs)
- [ ] Encrypted reset token (sha256)
- [ ] Maximum login attempts
- [ ] cookies http only + secure for https
- [ ] sanitize user input data
- [ ] mongo-sanitize (no sql injections)
- [ ] limit body payload in body parser
- [ ] confirm user e-mail after creaeting account
- [ ] two factor authentication
- [ ] prevent parameter polution causing uncaught exceptions (hpp package)

- [ ] Add features
    #### TODO
    - [x] Create and send emails for development (MailTrap)
    - [ ] Create and send emails for production (SendGrid)
    - [x] Create ObjectIds: owner for vehicles and company owners + drivers
    - [x] Create ObjectIds: drivers for company leader

## FRONTEND

### TODO
- [x] Create and style home page
- [x] Create and style login page
- [x] Create and style signup page
- [x] Create and style overview page
- [x] Create and style account settings page
- [ ] Create and style documents page
- [ ] Create and style call-assistance page
- [x] Add loading screen on the begining
- [x] Create randering functions

### Functionality
- [x] Header
    - [ ] Notification Dropdown (is created but without functionality)
    - [x] Add car button (create a full screen popup where can be added a car)
    - [x] User button

- [x] Login page
- [x] Logout button
- [x] Sign Up page
    - [x] Added isCompany button + company name field
- [ ] Overview page
    - [x] Load details about insurance and others
    - [x] Progress bar working (changing css variable)
    - [x] Select-car button
- [x] Account
    - [x] Edit Profile
    - [x] Upload Photo
    - [x] Change Password
    - [ ] Notifications
    - [ ] Choose plan
    - [x] Forgot Password
    - [x] Reset Password

- [ ] Add New Car popup (created only the popup)

## Other things to do
- [ ] Refactor code to eliminate repeating