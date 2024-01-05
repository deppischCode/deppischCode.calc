export default function numberAssembler(number) {
    return (digit) => {
        switch (digit) {
            case ".":
                if (number.includes("."))
                    return number;
                break;
            case "del":
                number = number.substring(0, number.length - 1);
                if (number.length == 0)
                    number = "0";
                return number;
            default:
                break;
        }
        number += digit;
        if (number.match(/^0\d+/))
            number = number.substring(1);
        return number;
    };
}
