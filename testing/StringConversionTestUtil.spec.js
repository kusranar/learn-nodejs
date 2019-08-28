
function underscoreToCamelcase(underscore){
    newUnderscore = underscore.split("");
    result = "";
    for(let i = 0; i < newUnderscore.length; i++){
        if(newUnderscore[i] == ' '){
            throw new Error("String tidak boleh mengandung spasi");
        } else if(newUnderscore[i] == '_'){
            newUnderscore[i + 1] = newUnderscore[i + 1].toUpperCase();
        }
        result += newUnderscore[i] + "";
    }
    result = result.replace(/_/g, "");
    return result;
}

function camelCaseToUnderscored(camelCased){
    newCamelcased = camelCased.split("");
    result = "";
    for(let i = 0; i < newCamelcased.length; i++){
        if(newCamelcased[i] == ' '){
            throw new Error("String tidak boleh mengandung spasi");
        } else if(newCamelcased[i] == '_'){
            throw new Error("String tidak boleh mengandung underscore");
        } else if(i == 0){
            result += newCamelcased[i].toLowerCase();
            continue;
        } else if(i == newCamelcased.length - 1){
            if(newCamelcased[i] == newCamelcased[i].toUpperCase()){
                result += '_';
            } else if(newCamelcased[i] >= '0' && newCamelcased[i] <= '9'){
                result += '_';
            }
        } else if(newCamelcased[i] >= 0 && newCamelcased[i] <= 9){
            if(newCamelcased[i - 1] >= 0 && newCamelcased[i - 1] <= 9){
                result += newCamelcased[i].toLowerCase();
                continue;
            } else {
                result += "_";
                result += newCamelcased[i].toLowerCase();
                result += "_";
                continue;
            }
        } else if(newCamelcased[i] == newCamelcased[i].toUpperCase()){

        }
        result += newCamelcased[i].toLowerCase();
    }
    return result;
}

describe('Underscore to Camelcase', () => {
    it('testCamelCaseToUnderscoredContainSpaceBeforeAfter', ()=> {
        expect( () => {
            underscoreToCamelcase(" lastOpenedDate ");
        }).toThrowError("String tidak boleh mengandung spasi");
    });

    it('testUnderscoredToCamelCase', () => {
        expect(underscoreToCamelcase("last_opened_date")).toBe("lastOpenedDate");
    });

    it('testUnderscoredToCamelCaseConsecutiveUnderscore', () => {
        expect(underscoreToCamelcase("last__opened__date")).toBe("lastOpenedDate");
    });
})

describe('Camelcase To Underscore', () => {
    it('testCamelCaseToUnderscored', () => {
        expect(camelCaseToUnderscored("lastOpenedDate")).toBe("last_opened_date");
    });

    it('testCamelCaseToUnderscoredWithConsecutiveUpper', () => {
        expect(camelCaseToUnderscored("lastOpenedDateACCJenius")).toBe("last_opened_date_acc_jenius");
    });

    it('testCamelCaseToUnderscoredWithConsecutiveUpperAndNumber', () => {
        expect(camelCaseToUnderscored("ACCJenius1ACCTahapan123")).toBe("acc_jenius_1_acc_tahapan_123");
    });

    it('testCamelCaseToUnderscoredContainSpaceBeforeAfter', ()=> {
        expect( () => {
            camelCaseToUnderscored("last Opened Date");
        }).toThrowError("String tidak boleh mengandung spasi");
    });

    it('testCamelCaseToUnderscoredContainSpaceBeforeAfter', () => {
        expect( () => {
            camelCaseToUnderscored(" lastOpenedDate ")
        }).toThrowError("String tidak boleh mengandung spasi");
    });

    it('testCamelCaseToUnderscoredContainUnderscore', () => {
        expect( () => {
            camelCaseToUnderscored("last_Opened_Date")
        }).toThrowError("String tidak boleh mengandung underscore");
    });
})
