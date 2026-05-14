class Pizzeria {
    constructor(type, size) {
        this.pizzaTypes = {
            'Маргарита': { price: 500, calories: 300 },
            'Пепперони': { price: 800, calories: 400 },
            'Баварская': { price: 700, calories: 450 }
        };
        
        this.sizes = {
            'Большая': { price: 200, calories: 200 },
            'Маленькая': { price: 100, calories: 100 }
        };
        
        this.choiceToppings = {
            'сливочная моцарелла': { price: 50, calories: 20 },
            'сырный борт': { priceSmall: 150, priceBig: 300, calories: 50 },
            'чедер и пармезан': { priceSmall: 150, priceBig: 300, calories: 50 }
        };
        
        this.type = type;
        this.size = size;
        this.toppings = [];
    }
    
    addTopping(topping) {
        if (!this.choiceToppings[topping]) {
            return;
        }
        
        if (this.toppings.includes(topping)) {
            return;
        }
        
        this.toppings.push(topping);
    }
    
    removeTopping(topping) {
        const index = this.toppings.indexOf(topping);
        if (index === -1) {
            return;
        }
        
        this.toppings.splice(index, 1);
    }
    
    getToppings() {
        return this.toppings.length > 0 ? this.toppings : 'Нет добавок';
    }
    
    getType() {
        return this.type;
    }
    
    getSize() {
        return this.size;
    }
    
    getStuffing() {
        return this.size;
    }
    
    calculatePrice() {
        let price = this.pizzaTypes[this.type].price + this.sizes[this.size].price;
        
        for (let topping of this.toppings) {
            const toppingThis = this.choiceToppings[topping];
            
            if (toppingThis.price) {
                price += toppingThis.price;
            } else {
                price += this.size === 'Большая' ? toppingThis.priceBig : toppingThis.priceSmall;
            }
        }
        
        return price;
    }
    
    calculateCalories() {
        let calories = this.pizzaTypes[this.type].calories + this.sizes[this.size].calories;
        
        for (let topping of this.toppings) {
            const toppingThis = this.choiceToppings[topping];
            calories += toppingThis.calories;
        }
        
        return calories;
    }
}

const pizza = new Pizzeria('Баварская', 'Маленькая');
pizza.addTopping('чедер и пармезан');

console.log(`Пицца - ${pizza.getType()}(${pizza.getSize()}) \nДобавки - ${pizza.getToppings()} \nЦена - ${pizza.calculatePrice()} руб. \nВсего калорий: ${pizza.calculateCalories()}`);
