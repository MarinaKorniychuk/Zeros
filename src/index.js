module.exports = function zeros(expression) {

    // Return the power of prime in factorization of num!.
    // E.g. 25! = 2^22 × 3^10 × 5^6 × ...
    // Then primeInFactorial(2, 25) will be 22
    //  and primeInFactorial(5, 25) will be 6.
    function primeInFactorial(prime, num) {
        let a = 0;
        while (num) {
            num = Math.floor(num / prime);
            a += num;
        }
        return a;
    }

    // Return the power of 5 in factorization of num!,
    // but exclude numbers that are non-dividible by 10.
    // In other words, we imagine that 50! = 50 × 40 × 30 × ...
    // It allows to ignore odd numbers dividible by 5,
    // which is helpful in double factorial.
    function tensInFactorial(num) {
        num = Math.floor(num / 10);
        return num + primeInFactorial(5, num);
    }

    // Return the power of 2 and 5 in factorization of a number,
    // made up by multiplying factorials of all arr members with each other.
    function sFactorize(arr) {
        let twos = 0;
        let fives = 0;

        for (let a of arr) {
            twos += primeInFactorial(2, a);
            fives += primeInFactorial(5, a);
        }
        return {twos: twos, fives: fives};
    }

    // Return the power of 2 and 5 in factorization of a number,
    // made up by multiplying double factorials of all arr members with each other.
    function dFactorize(arr) {
        let twos = 0;
        let fives = 0;

        for (let a of arr) {
            if (a % 2) {
                fives += primeInFactorial(5, a);
                fives -= tensInFactorial(a);

            } else {
                // If even.
                twos += primeInFactorial(2, a);
                fives += tensInFactorial(a);
            }
        }
        return {twos: twos, fives: fives};
    }

    // Arrays for separation of single and double factorials.
    let sFactorials = [];
    let dFactorials = [];

    for (let num of expression.split('*')) {
        if (/!!/.test(num)) {
            dFactorials.push(+num.slice(0, -2));
        } else {
            sFactorials.push(+num.slice(0, -1));
        }
    }

    // Objects with twos and fives in factorization of multiplication of single/double factorials.
    let sFactorized = sFactorize(sFactorials);
    let dFactorized = dFactorize(dFactorials);

    let allTwos = sFactorized.twos + dFactorized.twos;
    let allFives = sFactorized.fives + dFactorized.fives;

    return allTwos > allFives ? allFives : allTwos;
}