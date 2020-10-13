const crypto = require('crypto');

exports.firstLetterBig = (element) => {
    let array = element.split('');
    array[0] = element[0].toUpperCase();
    element = '';
    array.forEach( el => element += el);
    return element
}

exports.setDatesTiresSeason = () => {
    let date1 = new Date();
    date2 = new Date();
    if(date1.getMonth() >= 0 && date1.getMonth() < 9) {
        date1.setMonth(2);
        date1.setDate(1);

        date2.setMonth(9);
        date2.setDate(1);
    }else {
        date1.setFullYear(date1.getFullYear() + 1)
        date1.setMonth(2);
        date1.setDate(1);

        date2.setFullYear(date2.getFullYear() + 1)
        date2.setMonth(9);
        date2.setDate(1);
    }

    let currentDate = new Date();
    let tiresType;
    if(currentDate.getMonth() >= 2 && currentDate.getMonth() < 9){
        tiresType = 'summer-tires';
    }else {
        tiresType = 'winter-tires';
    }

    return {
        date1,
        date2,
        tiresType
    }
}



exports.validateEmail = (email) => {
    email = email.split('');
    let at = [];
    email.forEach( (el, i) => {
        if(el === '@') {
            at.push(el);
            at.push(i);
        }
    });

    if(at === [] || at.length > 2) return false;

    let lettersAfterDot = 0;
    let dot = [];
    for(let i = email.length - 1; i > at[1]; i--) {
        if(email[i] !== '.') {
            lettersAfterDot++;
        }else if(email[i] === '.'){
            dot.push(email[i]);
            dot.push(i);
        }
    }

    if(dot === [] || lettersAfterDot < 2 || dot.length > 4) return false;

    return true;

}

exports.createActivateAccountToken = () => {
    const randomStr = crypto.randomBytes(32).toString('hex');
    
    activateAccount = crypto.createHash('sha256').update(randomStr).digest('hex');

    return {
        randomStr,
        activateAccount
    }
}

exports.set1970 = () => {
    return {
        validFrom: new Date('1970-02-17'),
        validTo: new Date('1970-02-20')
    }
}

exports.setAccountDetails = (file, user) => {
    let outFile = file.replace('{%firstName%}', user.firstName);
    outFile = outFile.replace('{%lastName%}', user.lastName);
    outFile = outFile.replace('{%email%}', user.email);
    outFile = outFile.replace('{%phone%}', user.phone || '');
    outFile = outFile.replace('{%address%}', user.address || '');
    outFile = outFile.replace('{%city%}', user.city || '');
    outFile = outFile.replace('{%state%}', user.state || '');
    outFile = outFile.replace('{%zipCode%}', user.zipCode || '');
    outFile = outFile.replace('{%country%}', user.country || '');

    return outFile;
}

exports.sortBody = (body) => {
    console.log(body);
    const newBody = {};
    for(let property in body) {
        if(property === 'firstName') newBody[property] = body[property];
        if(property === 'lastName') newBody[property] = body[property];
        if(property === 'phone') newBody[property] = body[property];
        if(property === 'address') newBody[property] = body[property];
        if(property === 'city') newBody[property] = body[property];
        if(property === 'state') newBody[property] = body[property];
        if(property === 'zipCode') newBody[property] = body[property];
        if(property === 'country') newBody[property] = body[property];
        if(property === 'photo') newBody[property] = body[property];
    }

    return newBody;
}