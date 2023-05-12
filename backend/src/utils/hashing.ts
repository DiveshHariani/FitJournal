import bcrypt from 'bcrypt';

export const createHash = async (password: string): Promise<string> => {
    const saltRounds = 1;
    let passwordHash: string;
    
    const passwordPromise = new Promise<string>((resolve, reject) => {
        bcrypt.genSalt(saltRounds, (err: Error | undefined, salt: string) => {
            if(err) reject(err);
            bcrypt.hash(password, salt, (err, hash) => {
                if(!err) {
                    resolve(hash);
                } else {
                    reject(err);
                }  
            });
        });
    })

    return passwordPromise;
};

export const checkPassword = async (password: string, hash: string): Promise<boolean> => {
    try {
        let res = await bcrypt.compare(password, hash);
        console.log(res);
        return Promise.resolve(res);
    } catch(err) {
        return Promise.reject(err);
    }
}
