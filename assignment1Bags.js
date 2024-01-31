const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("Welcoming"),
    TYPE:   Symbol("Type"),
    SIZE:   Symbol("Size"),
    TOPPINGS: Symbol("Toppings"),
    FRIES:  Symbol("Fries"),
    FTYPE:  Symbol("FType"),
    RECEIPT: Symbol("Receipt")
});

module.exports = class BagsOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sType = "";
        this.sSize = "";
        this.sToppings = "";
        this.sFries = "";
        this.sFType = "";
        this.price = 0;
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:

                this.stateCur = OrderState.TYPE;
                aReturn.push("Welcome to Conestoga's Food Court!");
                aReturn.push("Our menu is comprised of shawarma, sandwich, salad")
                aReturn.push("What item would you like?");
                break;

            case OrderState.TYPE:

                this.stateCur = OrderState.SIZE;
                this.sType = sInput.toLowerCase();

                aReturn.push(`For your ${sInput}, what size would you like (Small, Medium, Large)?`);
                break;

            case OrderState.SIZE:

                this.stateCur = OrderState.TOPPINGS;
                this.sSize = sInput.toLowerCase();

                if (this.sType == "shawarma")
                {
                    if (this.sSize == "small")
                        this.price += 4.99;
                    else if (this.sSize == "medium")
                        this.price += 6.99;
                    else if (this.sSize == "large")
                        this.price += 8.99;
                    
                }
                else if (this.sType == "sandwich")
                {

                    if (this.sSize == "small")
                        this.price += 3.99;
                    else if (this.sSize == "medium")
                        this.price += 4.99;
                    else if (this.sSize == "large")
                        this.price += 5.99;

                }
                else if (this.sType == "salad")
                {
                    if (this.sSize == "small")
                        this.price += 6.99;
                    else if (this.sSize == "medium")
                        this.price += 7.99;
                    else if (this.sSize == "large")
                        this.price += 8.99;
                }

                aReturn.push(`What toppings would you like on your ${this.sType}?`);
                break;

            case OrderState.TOPPINGS:

                this.sToppings = sInput.toLowerCase();
                this.stateCur = OrderState.FRIES;

                aReturn.push("Would you like to add fries with that (Yes / No)?");
                break;

            case OrderState.FRIES:

                this.sFries = sInput.toLowerCase();

                if(this.sFries != "no"){
                    this.stateCur = OrderState.RECEIPT;
                    this.price += 2.99;
                    aReturn.push(`For your fries, what type would you like (Cajun, Regular, Curly)?`);
                    break;
                }

            case OrderState.RECEIPT:

                if (this.sFries != "no")
                {
                    this.sFType = sInput.toLowerCase();

                    if (this.sFType == "regular")
                        this.price += 1.99;
                    else if (this.sFType == "cajun")
                        this.price += 2.99;
                    else if (this.sFType == "curly")
                        this.price += 3.99;
                }

                this.price = (this.price * 1.13).toFixed(2); 

                this.isDone(true);
            
                aReturn.push("Thank you for your order of:");
                aReturn.push(`A ${this.sSize} ${this.sType} with ${this.sToppings.toLowerCase()}`);

                if (this.sFries != "no") 
                    aReturn.push(`with a side of ${this.sFType} fries`);

                aReturn.push(`Your meal in total costs: $${this.price}`);

                break;

        }

        return aReturn;
    }
}