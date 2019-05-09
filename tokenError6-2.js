
class tokenError {
    isThisRealString(token) {
        let quotationMarks = '';
        let doubleQuotationMarks = "";
        token.split('').forEach(onePiece => {
            if (onePiece === "'") quotationMarks += onePiece;
            if (onePiece === '"') doubleQuotationMarks += onePiece;
        });
        if ((quotationMarks.length % 2) !== 0 || (doubleQuotationMarks.length % 2) !== 0) {
            throw new Error(`${token}은 올바른 문자열이 아닙니다.`)
        }
    }

    itIsUndefinedType(token) {
        throw new Error(`${token}은 알수 없는 타입입니다.`)
    }
}
