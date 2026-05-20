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
            'чеддер и пармезан': { priceSmall: 150, priceBig: 300, calories: 50 }
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
const order = new Pizzeria('Пепперони', 'Маленькая');
order.addTopping('сырный борт');
const cartButton = document.getElementById('cartButton');
function updateCartButton() {
    const totalPrice = order.calculatePrice();
    const totalCalories = order.calculateCalories();
    cartButton.innerText = `Добавить в корзину за ${totalPrice}₽ (${totalCalories} кКалл)`;
}
function updateToppingPrices() {
    const isLargeSize = order.size === 'Большая';
    const allToppingElements = document.querySelectorAll('.addon');
    allToppingElements.forEach(toppingElement => {
        const toppingName = toppingElement.dataset.name;
        const priceSpan = toppingElement.querySelector('small');
        if (!priceSpan) return;
        if (toppingName === 'сливочная моцарелла') {
            priceSpan.innerText = '50₽';
        } else if (toppingName === 'сырный борт' || toppingName === 'чеддер и пармезан') {
            priceSpan.innerText = isLargeSize ? '300₽' : '150₽';
        }
    });
}
function refreshUI() {
    updateCartButton();
    updateToppingPrices();
}
const pizzaElements = document.querySelectorAll('.pizza-option');
pizzaElements.forEach(pizzaElement => {
    pizzaElement.onclick = function() {
        pizzaElements.forEach(p => p.classList.remove('selected'));
        this.classList.add('selected');
        order.type = this.dataset.type;
        refreshUI();
    };
});
const toppingElements = document.querySelectorAll('.addon');
toppingElements.forEach(toppingElement => {
    toppingElement.onclick = function() {
        const toppingName = this.dataset.name;
        this.classList.toggle('selected');
        if (this.classList.contains('selected')) {
            order.addTopping(toppingName);
        } else {
            order.removeTopping(toppingName);
        }
        refreshUI();
    };
});
const sizeRadioButtons = document.querySelectorAll('input[name="pizzaSize"]');
sizeRadioButtons.forEach(radioButton => {
    radioButton.onchange = function() {
        if (this.checked) {
            const newSize = this.value === 'маленькая' ? 'Маленькая' : 'Большая';
            order.size = newSize;
            refreshUI();
        }
    };
});
const defaultPizza = document.querySelector('.pizza-option[data-type="Пепперони"]');
if (defaultPizza) defaultPizza.classList.add('selected');
const defaultTopping = document.querySelector('.addon[data-name="сырный борт"]');
if (defaultTopping) defaultTopping.classList.add('selected');
const smallSizeRadio = document.getElementById('sizeSmall');
if (smallSizeRadio) smallSizeRadio.checked = true;
refreshUI();
