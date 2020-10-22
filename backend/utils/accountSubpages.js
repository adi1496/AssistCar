

exports.createEditProfile = (file, user) => {
    let outFile = file.replace('{%firstName%}', user.firstName);
    outFile = outFile.replace('{%lastName%}', user.lastName);
    outFile = outFile.replace('{%email%}', user.email);
    outFile = outFile.replace('{%phone%}', user.phone || '');
    outFile = outFile.replace('{%address%}', user.address || '');
    outFile = outFile.replace('{%city%}', user.city || '');
    outFile = outFile.replace('{%state%}', user.state || '');
    outFile = outFile.replace('{%zipCode%}', user.zipCode || '');
    outFile = outFile.replace('{%country%}', user.country || '');
    
    if(user.photo) {
        outFile = outFile.replace('{%user-image%}', `/img/user-img/${user.photo}`);
    }else {
        outFile = outFile.replace('{%user-image%}', '/img/user-img/user.jpg')
    }
    
    return outFile;
}