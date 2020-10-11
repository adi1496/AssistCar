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
    console.log(this);
    
    activateAccount = crypto.createHash('sha256').update(randomStr).digest('hex');

    return {
        randomStr,
        activateAccount
    }
}