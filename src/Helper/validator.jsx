export const handleInputValidation = (value, setStateValue, type) => {
    let alphabetOnly = /^[a-zA-Z]+$/;
    let alphabetAndSpace = /^[a-zA-Z\s]+$/;
    let numberOnly = /^[0-9]*$/;
    let numberAndSpace = /^[\d\s]+$/;
    let email = /^[a-zA-Z0-9@.]*$/;
    let decimal = /^[0-9.]*$/;
    let numberAndAlphabet = /^[a-zA-Z0-9\s]*$/;
    console.log(value, "addCat")

    switch (type) {
        case 0:
            if (alphabetOnly.test(value) || value === '') {
                setStateValue(value);
            }
            break;
        case 1:
            if (alphabetAndSpace.test(value) || value === '') {
                setStateValue(value);
            }
            break;
        case 2:
            if (numberOnly.test(value) || value === '') {
                if (value.length <= 10) {
                    setStateValue(value);
                }
            }
            break;
        case 3:
            if (numberAndSpace.test(value) || value === '') {
                if (value.length <= 12) {
                    setStateValue(value);
                }
            }
            break;
        case 4:
            if (email.test(value) || value === '') {
                setStateValue(value);
            }
            break;
        case 5:
            if (decimal.test(value) || value === '') {
                setStateValue(value);
            }
            break;
        case 6:
            if (numberAndAlphabet.test(value) || value === '') {
                setStateValue(value);
            }
            break;
        default:
            setStateValue(value);
            break;
    }
}
