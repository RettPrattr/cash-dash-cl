export default function findValue(entireObj, keyToFind, valToFind) { // TASK Вынести в utils
    let foundObj;
    JSON.stringify(entireObj, (_, nestedValue) => {
        // console.log('NESTED VALUE', nestedValue)
        if (nestedValue && nestedValue[keyToFind]) {
            foundObj = nestedValue[keyToFind];
            // console.log('FOUND VALUE', foundObj)
            return foundObj
        }
        return nestedValue
    });
    return foundObj
};