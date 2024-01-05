export default class Calculator {
  private numberAssembler: Function;
  private number: Function;
  private chain: string[];
  private stringFn: Function;
  public operate: boolean;

  constructor(numberAssembler: Function, stringFn: Function) {
    this.numberAssembler = numberAssembler;
    this.number = numberAssembler("0");
    this.chain = [];
    this.stringFn = stringFn;
    this.operate = false;
  }

  set current(number: string) {
    this.number = this.numberAssembler(number);
  }

  get current(): string {
    return this.number("");
  }

  public addToCurrent(digit: string) {
    this.operate = false;

    this.number(digit);
  }

  public init(): void {
    this.number = this.numberAssembler("0");
  }

  public addOperation(operator: string): void {
    this.operate = true;

    this.chain.push(this.current);
    this.chain.push(operator);
  }

  public changeOperation(operator: string): void {
    this.chain.pop();
    this.chain.push(operator);
  }

  public delete(): void {
    this.current = this.current.slice(0, -1);

    if (this.current.length == 0)
      this.current = "0";
  }

  public reset(): void {
    this.operate = false;

    this.number = this.numberAssembler("0");
    this.chain = [];
  }

  public result(): string {
    if (this.operate)
      return String(
        eval(
          this.stringFn.call(this.chain.slice(0, -1))
        )
      );

    return this.current;
  }

  public final(): string {
    if (this.operate)
      return String(
        eval(
          this.stringFn.call(this.chain.concat(
            [this.result()]
          ))
        )
      );

    return String(
      eval(
        this.stringFn.call(this.chain.concat(
          [this.current]
        ))
      )
    );
  }

  public brace(operator: string): void {
    if (this.chain[this.chain.length - 2] == ")") return;

    this.chain = ["("].concat(this.chain.slice(0, -1).concat([")", operator]));
  }

  public toString(tail: string = ""): string {
    return this.stringFn.call(this.chain.concat([tail]));
  }
}
