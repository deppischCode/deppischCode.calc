export default class Calculator {
    numberAssembler;
    number;
    chain;
    stringFn;
    operate;
    constructor(numberAssembler, stringFn) {
        this.numberAssembler = numberAssembler;
        this.number = numberAssembler("0");
        this.chain = [];
        this.stringFn = stringFn;
        this.operate = false;
    }
    set current(number) {
        this.number = this.numberAssembler(number);
    }
    get current() {
        return this.number("");
    }
    addToCurrent(digit) {
        this.operate = false;
        this.number(digit);
    }
    init() {
        this.number = this.numberAssembler("0");
    }
    addOperation(operator) {
        this.operate = true;
        this.chain.push(this.current);
        this.chain.push(operator);
    }
    changeOperation(operator) {
        this.chain.pop();
        this.chain.push(operator);
    }
    delete() {
        this.current = this.current.slice(0, -1);
        if (this.current.length == 0)
            this.current = "0";
    }
    reset() {
        this.operate = false;
        this.number = this.numberAssembler("0");
        this.chain = [];
    }
    result() {
        if (this.operate)
            return String(eval(this.stringFn.call(this.chain.slice(0, -1))));
        return this.current;
    }
    final() {
        if (this.operate)
            return String(eval(this.stringFn.call(this.chain.concat([this.result()]))));
        return String(eval(this.stringFn.call(this.chain.concat([this.current]))));
    }
    brace(operator) {
        if (this.chain[this.chain.length - 2] == ")")
            return;
        this.chain = ["("].concat(this.chain.slice(0, -1).concat([")", operator]));
    }
    toString(tail = "") {
        return this.stringFn.call(this.chain.concat([tail]));
    }
}
