export default function numberAssembler(template) {
    return (digit) => {
        switch (digit) {
            case ".":
                if (template.includes("."))
                    return template;
                break;
            case "del":
                template = template.substring(0, template.length - 1);
                if (template.length == 0)
                    template = "0";
                return template;
            default:
                break;
        }
        template += digit;
        if (template.match(/^0\d+/))
            template = template.substring(1);
        return template;
    };
}
