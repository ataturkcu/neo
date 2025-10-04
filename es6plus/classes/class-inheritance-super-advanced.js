/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Advanced Class Features - Inheritance, Super, Static Methods, Private Fields
 * Comprehensive testing of ES6+ class features including inheritance chains, super(),
 * static methods, private fields, getters/setters, class expressions, computed properties
 */

// Test 1-10: Basic Inheritance Chains
(function() {
    // Test basic class inheritance
    class Animal {
        constructor(name) {
            this.name = name;
            this.species = "generic";
        }

        speak() {
            return this.name + " makes a sound";
        }

        getInfo() {
            return "Name: " + this.name + ", Species: " + this.species;
        }
    }

    class Dog extends Animal {
        constructor(name, breed) {
            super(name);
            this.breed = breed;
            this.species = "canine";
        }

        speak() {
            return this.name + " barks";
        }

        fetch() {
            return this.name + " fetches the ball";
        }
    }

    var animal = new Animal("Generic");
    if (animal.speak() !== "Generic makes a sound") throw new Error("Base class method failed");
    if (animal.getInfo() !== "Name: Generic, Species: generic") throw new Error("Base class info failed");

    var dog = new Dog("Rex", "German Shepherd");
    if (dog.speak() !== "Rex barks") throw new Error("Inherited class method override failed");
    if (dog.fetch() !== "Rex fetches the ball") throw new Error("Inherited class new method failed");
    if (dog.getInfo() !== "Name: Rex, Species: canine") throw new Error("Inherited class super method failed");
    if (dog.breed !== "German Shepherd") throw new Error("Inherited class constructor failed");

    // Test instanceof
    if (!(dog instanceof Dog)) throw new Error("instanceof Dog failed");
    if (!(dog instanceof Animal)) throw new Error("instanceof Animal failed");
    if (!(dog instanceof Object)) throw new Error("instanceof Object failed");

    // Test prototype chain
    if (Object.getPrototypeOf(dog) !== Dog.prototype) throw new Error("Direct prototype failed");
    if (Object.getPrototypeOf(Dog.prototype) !== Animal.prototype) throw new Error("Prototype chain failed");
})();

// Test 11-20: Multi-level Inheritance
(function() {
    class Vehicle {
        constructor(type) {
            this.type = type;
            this.fuel = 100;
        }

        move() {
            return "Vehicle moves";
        }

        consume(amount) {
            this.fuel -= amount;
            return this.fuel;
        }
    }

    class LandVehicle extends Vehicle {
        constructor(type, wheels) {
            super(type);
            this.wheels = wheels;
            this.terrain = "land";
        }

        move() {
            return "Land vehicle drives on " + this.wheels + " wheels";
        }

        park() {
            return "Parked on land";
        }
    }

    class Car extends LandVehicle {
        constructor(brand, model) {
            super("car", 4);
            this.brand = brand;
            this.model = model;
            this.doors = 4;
        }

        move() {
            return this.brand + " " + this.model + " drives smoothly";
        }

        honk() {
            return "Beep beep!";
        }

        getFullInfo() {
            return super.move() + " with fuel: " + this.fuel;
        }
    }

    var car = new Car("Toyota", "Camry");
    if (car.move() !== "Toyota Camry drives smoothly") throw new Error("Multi-level inheritance override failed");
    if (car.honk() !== "Beep beep!") throw new Error("Multi-level inheritance new method failed");
    if (car.park() !== "Parked on land") throw new Error("Multi-level inheritance parent method failed");
    if (car.consume(20) !== 80) throw new Error("Multi-level inheritance grandparent method failed");
    if (car.wheels !== 4) throw new Error("Multi-level inheritance property failed");
    if (car.terrain !== "land") throw new Error("Multi-level inheritance parent property failed");

    // Test super() in complex chains
    if (!car.getFullInfo().includes("Land vehicle drives on 4 wheels")) throw new Error("Super call in chain failed");
    if (!car.getFullInfo().includes("fuel: 80")) throw new Error("Super property access failed");

    // Test instanceof with multi-level
    if (!(car instanceof Car)) throw new Error("Multi-level instanceof Car failed");
    if (!(car instanceof LandVehicle)) throw new Error("Multi-level instanceof LandVehicle failed");
    if (!(car instanceof Vehicle)) throw new Error("Multi-level instanceof Vehicle failed");
})();

// Test 21-30: Super() Functionality
(function() {
    class Base {
        constructor(value) {
            this.baseValue = value;
            this.constructed = "base";
        }

        method() {
            return "base method";
        }

        chainedMethod() {
            return "base";
        }

        static staticMethod() {
            return "base static";
        }
    }

    class Derived extends Base {
        constructor(value, derived) {
            super(value);
            this.derivedValue = derived;
            this.constructed += " derived";
        }

        method() {
            return super.method() + " extended";
        }

        chainedMethod() {
            return super.chainedMethod() + " -> derived";
        }

        callSuperMethod() {
            return super.method();
        }

        static staticMethod() {
            return super.staticMethod() + " extended";
        }

        static callSuperStatic() {
            return super.staticMethod();
        }
    }

    class DoubleDerived extends Derived {
        constructor(value, derived, double) {
            super(value, derived);
            this.doubleValue = double;
            this.constructed += " double";
        }

        method() {
            return super.method() + " double";
        }

        chainedMethod() {
            return super.chainedMethod() + " -> double";
        }

        static staticMethod() {
            return super.staticMethod() + " double";
        }
    }

    var derived = new Derived("base", "derived");
    if (derived.method() !== "base method extended") throw new Error("Super method call failed");
    if (derived.callSuperMethod() !== "base method") throw new Error("Super method via property failed");
    if (derived.constructed !== "base derived") throw new Error("Super constructor call failed");
    if (Derived.staticMethod() !== "base static extended") throw new Error("Super static method failed");
    if (Derived.callSuperStatic() !== "base static") throw new Error("Super static method call failed");

    var doubleDerived = new DoubleDerived("base", "derived", "double");
    if (doubleDerived.method() !== "base method extended double") throw new Error("Chained super method failed");
    if (doubleDerived.chainedMethod() !== "base -> derived -> double") throw new Error("Chained super calls failed");
    if (doubleDerived.constructed !== "base derived double") throw new Error("Chained super constructor failed");
    if (DoubleDerived.staticMethod() !== "base static extended double") throw new Error("Chained super static failed");

    // Test super property access
    class PropertyTest extends Base {
        get baseValueViaSuper() {
            return super.baseValue; // This would be undefined in real JS, testing concept
        }

        getBaseMethod() {
            return super.method;
        }
    }

    var propTest = new PropertyTest("test");
    if (typeof propTest.getBaseMethod() !== "function") throw new Error("Super method property access failed");
})();

// Test 31-40: Static Methods and Properties
(function() {
    class MathUtils {
        static PI = 3.14159;
        static version = "1.0";

        static add(a, b) {
            return a + b;
        }

        static multiply(a, b) {
            return a * b;
        }

        static getConstant(name) {
            return this[name];
        }

        static createInstance() {
            return new this();
        }

        constructor() {
            this.instanceValue = "instance";
        }

        getStaticValue() {
            return this.constructor.version;
        }
    }

    class AdvancedMath extends MathUtils {
        static E = 2.71828;
        static version = "2.0";

        static power(base, exp) {
            return Math.pow(base, exp);
        }

        static getPI() {
            return super.PI;
        }

        static calculate(a, b) {
            return super.add(a, b) * this.E;
        }
    }

    // Test static method calls
    if (MathUtils.add(2, 3) !== 5) throw new Error("Static method call failed");
    if (MathUtils.multiply(4, 5) !== 20) throw new Error("Static method call failed");
    if (AdvancedMath.power(2, 3) !== 8) throw new Error("Inherited static method failed");
    if (AdvancedMath.add(2, 3) !== 5) throw new Error("Inherited static method call failed");

    // Test static property access
    if (MathUtils.PI !== 3.14159) throw new Error("Static property access failed");
    if (MathUtils.version !== "1.0") throw new Error("Static property access failed");
    if (AdvancedMath.E !== 2.71828) throw new Error("Inherited static property failed");
    if (AdvancedMath.version !== "2.0") throw new Error("Static property override failed");

    // Test super in static methods
    if (AdvancedMath.getPI() !== 3.14159) throw new Error("Super static property access failed");
    var calculated = AdvancedMath.calculate(2, 3);
    if (Math.abs(calculated - 13.5914) > 0.001) throw new Error("Super static method call failed");

    // Test static method with this
    if (MathUtils.getConstant("PI") !== 3.14159) throw new Error("Static method this reference failed");

    // Test static factory method
    var instance = MathUtils.createInstance();
    if (!(instance instanceof MathUtils)) throw new Error("Static factory method failed");
    if (instance.instanceValue !== "instance") throw new Error("Static factory instance failed");

    // Test accessing static from instance
    var mathInstance = new AdvancedMath();
    if (mathInstance.getStaticValue() !== "2.0") throw new Error("Instance accessing static failed");
})();

// Test 41-50: Private Fields Simulation (using WeakMap)
(function() {
    // Simulate private fields using WeakMap
    var privateFields = new WeakMap();

    class BankAccount {
        constructor(balance) {
            privateFields.set(this, {
                balance: balance,
                accountNumber: Math.random().toString(36).substr(2, 9)
            });
            this.owner = "John Doe";
        }

        deposit(amount) {
            var privates = privateFields.get(this);
            privates.balance += amount;
            return privates.balance;
        }

        withdraw(amount) {
            var privates = privateFields.get(this);
            if (amount <= privates.balance) {
                privates.balance -= amount;
                return privates.balance;
            }
            throw new Error("Insufficient funds");
        }

        getBalance() {
            return privateFields.get(this).balance;
        }

        getAccountNumber() {
            return privateFields.get(this).accountNumber;
        }

        _validatePin(pin) {
            // Simulate protected method
            return pin === "1234";
        }
    }

    class SavingsAccount extends BankAccount {
        constructor(balance, interestRate) {
            super(balance);
            privateFields.set(this, {
                ...privateFields.get(this),
                interestRate: interestRate,
                lastInterestDate: new Date()
            });
        }

        addInterest() {
            var privates = privateFields.get(this);
            var interest = privates.balance * (privates.interestRate / 100);
            privates.balance += interest;
            privates.lastInterestDate = new Date();
            return privates.balance;
        }

        getInterestRate() {
            return privateFields.get(this).interestRate;
        }

        changePin(oldPin, newPin) {
            if (this._validatePin(oldPin)) {
                privateFields.get(this).pin = newPin;
                return true;
            }
            return false;
        }
    }

    var account = new BankAccount(1000);
    if (account.getBalance() !== 1000) throw new Error("Private field access failed");
    if (account.deposit(500) !== 1500) throw new Error("Private field modification failed");
    if (account.withdraw(200) !== 1300) throw new Error("Private field calculation failed");

    // Test private field isolation
    if (account.balance !== undefined) throw new Error("Private field should not be directly accessible");
    if (typeof account.getAccountNumber() !== "string") throw new Error("Private field method access failed");

    var savings = new SavingsAccount(2000, 2.5);
    if (savings.getBalance() !== 2000) throw new Error("Inherited private field failed");
    if (savings.getInterestRate() !== 2.5) throw new Error("Extended private field failed");

    var balanceBeforeInterest = savings.getBalance();
    var balanceAfterInterest = savings.addInterest();
    if (balanceAfterInterest <= balanceBeforeInterest) throw new Error("Private field calculation in inheritance failed");

    // Test protected method access
    if (!savings.changePin("1234", "5678")) throw new Error("Protected method access failed");

    // Test private field independence
    var account2 = new BankAccount(500);
    if (account2.getBalance() === account.getBalance()) throw new Error("Private fields should be instance-specific");
})();

// Test 51-60: Getters and Setters
(function() {
    class Temperature {
        constructor(celsius) {
            this._celsius = celsius;
        }

        get celsius() {
            return this._celsius;
        }

        set celsius(value) {
            if (typeof value !== "number") throw new Error("Temperature must be a number");
            this._celsius = value;
        }

        get fahrenheit() {
            return (this._celsius * 9/5) + 32;
        }

        set fahrenheit(value) {
            if (typeof value !== "number") throw new Error("Temperature must be a number");
            this._celsius = (value - 32) * 5/9;
        }

        get kelvin() {
            return this._celsius + 273.15;
        }

        set kelvin(value) {
            if (typeof value !== "number" || value < 0) throw new Error("Kelvin must be positive number");
            this._celsius = value - 273.15;
        }

        toString() {
            return this._celsius + "°C";
        }
    }

    class AdvancedTemperature extends Temperature {
        constructor(celsius, unit = "C") {
            super(celsius);
            this._unit = unit;
        }

        get unit() {
            return this._unit;
        }

        set unit(value) {
            if (!["C", "F", "K"].includes(value)) throw new Error("Invalid unit");
            this._unit = value;
        }

        get value() {
            switch (this._unit) {
                case "C": return this.celsius;
                case "F": return this.fahrenheit;
                case "K": return this.kelvin;
                default: return this.celsius;
            }
        }

        set value(temp) {
            switch (this._unit) {
                case "C": this.celsius = temp; break;
                case "F": this.fahrenheit = temp; break;
                case "K": this.kelvin = temp; break;
                default: this.celsius = temp;
            }
        }

        toString() {
            return this.value + "°" + this._unit;
        }
    }

    var temp = new Temperature(25);
    if (temp.celsius !== 25) throw new Error("Getter failed");
    if (Math.abs(temp.fahrenheit - 77) > 0.1) throw new Error("Calculated getter failed");
    if (Math.abs(temp.kelvin - 298.15) > 0.1) throw new Error("Calculated getter failed");

    temp.celsius = 30;
    if (temp.celsius !== 30) throw new Error("Setter failed");

    temp.fahrenheit = 100;
    if (Math.abs(temp.celsius - 37.78) > 0.1) throw new Error("Calculated setter failed");

    temp.kelvin = 300;
    if (Math.abs(temp.celsius - 26.85) > 0.1) throw new Error("Calculated setter failed");

    var advTemp = new AdvancedTemperature(20, "C");
    if (advTemp.value !== 20) throw new Error("Inherited getter failed");
    if (advTemp.toString() !== "20°C") throw new Error("Inherited method with getter failed");

    advTemp.unit = "F";
    if (Math.abs(advTemp.value - 68) > 0.1) throw new Error("Dynamic getter failed");
    if (advTemp.toString() !== "68°F") throw new Error("Dynamic toString failed");

    advTemp.value = 100;
    if (Math.abs(advTemp.celsius - 37.78) > 0.1) throw new Error("Dynamic setter failed");

    // Test setter validation
    try {
        temp.celsius = "not a number";
        var errorThrown = false;
    } catch (e) {
        var errorThrown = true;
    }
    if (!errorThrown) throw new Error("Setter validation failed");
})();

// Test 61-70: Class Expressions
(function() {
    // Named class expression
    var NamedClass = class MyClass {
        constructor(name) {
            this.name = name;
        }

        getName() {
            return this.name;
        }

        static getClassName() {
            return "MyClass";
        }
    };

    // Anonymous class expression
    var AnonymousClass = class {
        constructor(value) {
            this.value = value;
        }

        getValue() {
            return this.value;
        }
    };

    // Class expression with inheritance
    var ExtendedClass = class extends NamedClass {
        constructor(name, extra) {
            super(name);
            this.extra = extra;
        }

        getFullName() {
            return this.getName() + " " + this.extra;
        }
    };

    // Dynamic class creation
    function createClass(baseName) {
        return class {
            constructor() {
                this.baseName = baseName;
            }

            getBaseName() {
                return this.baseName;
            }
        };
    }

    var named = new NamedClass("Test");
    if (named.getName() !== "Test") throw new Error("Named class expression failed");
    if (NamedClass.getClassName() !== "MyClass") throw new Error("Named class static method failed");

    var anonymous = new AnonymousClass(42);
    if (anonymous.getValue() !== 42) throw new Error("Anonymous class expression failed");

    var extended = new ExtendedClass("John", "Doe");
    if (extended.getFullName() !== "John Doe") throw new Error("Class expression inheritance failed");
    if (extended.getName() !== "John") throw new Error("Class expression super method failed");

    var DynamicClass = createClass("Dynamic");
    var dynamic = new DynamicClass();
    if (dynamic.getBaseName() !== "Dynamic") throw new Error("Dynamic class creation failed");

    // Test class expression in different contexts
    var ClassArray = [
        class { method() { return "first"; } },
        class { method() { return "second"; } }
    ];

    var first = new ClassArray[0]();
    var second = new ClassArray[1]();
    if (first.method() !== "first") throw new Error("Class expression in array failed");
    if (second.method() !== "second") throw new Error("Class expression in array failed");

    // Class expression as parameter
    function processClass(ClassParam) {
        return new ClassParam("param");
    }

    var result = processClass(class {
        constructor(value) { this.value = value; }
        getValue() { return this.value; }
    });

    if (result.getValue() !== "param") throw new Error("Class expression as parameter failed");
})();

// Test 71-80: Computed Property Names
(function() {
    var methodName = "dynamicMethod";
    var propName = "dynamicProp";
    var symbolKey = Symbol("symbolMethod");

    class ComputedClass {
        constructor() {
            this.regularProp = "regular";
            this[propName] = "computed property";
        }

        [methodName]() {
            return "dynamic method called";
        }

        ["static" + "Method"]() {
            return "computed static method";
        }

        [symbolKey]() {
            return "symbol method called";
        }

        [propName + "Method"]() {
            return "computed property method";
        }

        get ["computed" + "Getter"]() {
            return this.regularProp + " via computed getter";
        }

        set ["computed" + "Setter"](value) {
            this.regularProp = value + " via computed setter";
        }

        static [methodName + "Static"]() {
            return "static computed method";
        }
    }

    class ExtendedComputed extends ComputedClass {
        [methodName + "Extended"]() {
            return "extended computed method";
        }

        ["override" + "Method"]() {
            return super[methodName]() + " extended";
        }
    }

    var computed = new ComputedClass();
    if (computed[methodName]() !== "dynamic method called") throw new Error("Computed method name failed");
    if (computed.staticMethod() !== "computed static method") throw new Error("Computed method concatenation failed");
    if (computed[symbolKey]() !== "symbol method called") throw new Error("Symbol computed method failed");
    if (computed[propName + "Method"]() !== "computed property method") throw new Error("Computed method with property failed");
    if (computed.computedGetter !== "regular via computed getter") throw new Error("Computed getter failed");

    computed.computedSetter = "new value";
    if (computed.regularProp !== "new value via computed setter") throw new Error("Computed setter failed");

    if (ComputedClass[methodName + "Static"]() !== "static computed method") throw new Error("Static computed method failed");

    var extended = new ExtendedComputed();
    if (extended[methodName + "Extended"]() !== "extended computed method") throw new Error("Extended computed method failed");
    if (extended.overrideMethod() !== "dynamic method called extended") throw new Error("Computed method with super failed");

    // Test computed property names with expressions
    var counter = 0;
    function getMethodName() {
        return "method" + (++counter);
    }

    class ExpressionClass {
        [getMethodName()]() { return "first method"; }
        [getMethodName()]() { return "second method"; }
    }

    var expr = new ExpressionClass();
    if (expr.method1() !== "first method") throw new Error("Computed expression method failed");
    if (expr.method2() !== "second method") throw new Error("Computed expression method failed");
})();

// Test 81-90: Mixin Patterns
(function() {
    // Mixin functions
    var Flyable = {
        fly() {
            return this.name + " is flying";
        },

        land() {
            return this.name + " has landed";
        },

        altitude: 0,

        setAltitude(alt) {
            this.altitude = alt;
            return this;
        }
    };

    var Swimmable = {
        swim() {
            return this.name + " is swimming";
        },

        dive() {
            return this.name + " is diving";
        },

        depth: 0,

        setDepth(d) {
            this.depth = d;
            return this;
        }
    };

    var Runnable = {
        run() {
            return this.name + " is running";
        },

        sprint() {
            return this.name + " is sprinting";
        },

        speed: 0,

        setSpeed(s) {
            this.speed = s;
            return this;
        }
    };

    // Mixin utility function
    function mixin(target, ...sources) {
        sources.forEach(source => {
            Object.getOwnPropertyNames(source).forEach(name => {
                if (name !== "constructor") {
                    Object.defineProperty(target.prototype, name,
                        Object.getOwnPropertyDescriptor(source, name));
                }
            });
        });
        return target;
    }

    // Base animal class
    class Animal {
        constructor(name) {
            this.name = name;
        }

        toString() {
            return "Animal: " + this.name;
        }
    }

    // Create Duck class with multiple mixins
    class Duck extends Animal {
        constructor(name) {
            super(name);
            this.type = "duck";
        }
    }

    mixin(Duck, Flyable, Swimmable, Runnable);

    // Create Fish class with single mixin
    class Fish extends Animal {
        constructor(name) {
            super(name);
            this.type = "fish";
        }
    }

    mixin(Fish, Swimmable);

    var duck = new Duck("Donald");
    if (duck.fly() !== "Donald is flying") throw new Error("Mixin method failed");
    if (duck.swim() !== "Donald is swimming") throw new Error("Multiple mixin method failed");
    if (duck.run() !== "Donald is running") throw new Error("Multiple mixin method failed");
    if (duck.setAltitude(100).altitude !== 100) throw new Error("Mixin method chaining failed");

    var fish = new Fish("Nemo");
    if (fish.swim() !== "Nemo is swimming") throw new Error("Single mixin method failed");
    if (fish.setDepth(50).depth !== 50) throw new Error("Mixin property access failed");

    // Test mixin method conflicts and inheritance
    if (typeof fish.fly === "function") throw new Error("Mixin should not add unwanted methods");
    if (fish.toString() !== "Animal: Nemo") throw new Error("Mixin should not override inheritance");

    // Test functional mixin
    function addLogging(target) {
        var originalMethods = {};

        Object.getOwnPropertyNames(target.prototype).forEach(name => {
            var descriptor = Object.getOwnPropertyDescriptor(target.prototype, name);
            if (typeof descriptor.value === "function" && name !== "constructor") {
                originalMethods[name] = descriptor.value;
                target.prototype[name] = function(...args) {
                    var result = originalMethods[name].apply(this, args);
                    this.lastAction = name;
                    return result;
                };
            }
        });

        return target;
    }

    class LoggedAnimal extends Animal {
        speak() {
            return this.name + " speaks";
        }
    }

    addLogging(LoggedAnimal);

    var logged = new LoggedAnimal("Logged");
    logged.speak();
    if (logged.lastAction !== "speak") throw new Error("Functional mixin logging failed");
})();

// Test 91-100: Abstract Classes and Interfaces Simulation
(function() {
    // Abstract class simulation
    class AbstractShape {
        constructor(color) {
            if (new.target === AbstractShape) {
                throw new Error("Cannot instantiate abstract class");
            }
            this.color = color;
        }

        getColor() {
            return this.color;
        }

        // Abstract methods (throw if not overridden)
        getArea() {
            throw new Error("Abstract method getArea must be implemented");
        }

        getPerimeter() {
            throw new Error("Abstract method getPerimeter must be implemented");
        }

        // Template method
        describe() {
            return "A " + this.color + " shape with area " + this.getArea() +
                   " and perimeter " + this.getPerimeter();
        }
    }

    class Rectangle extends AbstractShape {
        constructor(width, height, color) {
            super(color);
            this.width = width;
            this.height = height;
        }

        getArea() {
            return this.width * this.height;
        }

        getPerimeter() {
            return 2 * (this.width + this.height);
        }
    }

    class Circle extends AbstractShape {
        constructor(radius, color) {
            super(color);
            this.radius = radius;
        }

        getArea() {
            return Math.PI * this.radius * this.radius;
        }

        getPerimeter() {
            return 2 * Math.PI * this.radius;
        }
    }

    // Interface simulation using symbols
    var Drawable = {
        draw: Symbol("draw"),
        erase: Symbol("erase")
    };

    var Serializable = {
        serialize: Symbol("serialize"),
        deserialize: Symbol("deserialize")
    };

    function implementsInterface(obj, interfaceObj) {
        return Object.getOwnPropertySymbols(interfaceObj)
            .every(symbol => typeof obj[symbol] === "function");
    }

    class DrawableRectangle extends Rectangle {
        constructor(width, height, color) {
            super(width, height, color);
        }

        [Drawable.draw]() {
            return "Drawing rectangle: " + this.width + "x" + this.height;
        }

        [Drawable.erase]() {
            return "Erasing rectangle";
        }

        [Serializable.serialize]() {
            return JSON.stringify({
                type: "rectangle",
                width: this.width,
                height: this.height,
                color: this.color
            });
        }

        [Serializable.deserialize](data) {
            var obj = JSON.parse(data);
            this.width = obj.width;
            this.height = obj.height;
            this.color = obj.color;
            return this;
        }
    }

    // Test abstract class
    try {
        new AbstractShape("red");
        var abstractError = false;
    } catch (e) {
        var abstractError = true;
    }
    if (!abstractError) throw new Error("Abstract class instantiation should throw error");

    var rect = new Rectangle(5, 3, "blue");
    if (rect.getArea() !== 15) throw new Error("Concrete implementation failed");
    if (rect.getPerimeter() !== 16) throw new Error("Concrete implementation failed");
    if (!rect.describe().includes("blue shape with area 15")) throw new Error("Template method failed");

    var circle = new Circle(2, "red");
    if (Math.abs(circle.getArea() - 12.566) > 0.01) throw new Error("Concrete implementation failed");

    // Test abstract method enforcement
    class IncompleteShape extends AbstractShape {
        getArea() { return 0; }
        // Missing getPerimeter implementation
    }

    var incomplete = new IncompleteShape("green");
    try {
        incomplete.getPerimeter();
        var methodError = false;
    } catch (e) {
        var methodError = true;
    }
    if (!methodError) throw new Error("Abstract method should throw error");

    // Test interface implementation
    var drawableRect = new DrawableRectangle(4, 6, "yellow");
    if (!implementsInterface(drawableRect, Drawable)) throw new Error("Interface implementation check failed");
    if (!implementsInterface(drawableRect, Serializable)) throw new Error("Multiple interface implementation failed");
    if (drawableRect[Drawable.draw]() !== "Drawing rectangle: 4x6") throw new Error("Interface method call failed");

    var serialized = drawableRect[Serializable.serialize]();
    if (!serialized.includes('"width":4')) throw new Error("Interface serialization failed");
})();

// Test 101-110: Method Overriding and Polymorphism
(function() {
    class Animal {
        constructor(name, species) {
            this.name = name;
            this.species = species;
        }

        makeSound() {
            return this.name + " makes a generic animal sound";
        }

        move() {
            return this.name + " moves around";
        }

        eat(food) {
            return this.name + " eats " + food;
        }

        toString() {
            return this.species + " named " + this.name;
        }
    }

    class Dog extends Animal {
        constructor(name, breed) {
            super(name, "Dog");
            this.breed = breed;
        }

        makeSound() {
            return this.name + " barks: Woof!";
        }

        move() {
            return this.name + " runs on four legs";
        }

        fetch() {
            return this.name + " fetches the ball";
        }

        eat(food) {
            if (food === "chocolate") {
                return this.name + " cannot eat chocolate - it's toxic!";
            }
            return super.eat(food);
        }
    }

    class Cat extends Animal {
        constructor(name, color) {
            super(name, "Cat");
            this.color = color;
        }

        makeSound() {
            return this.name + " meows: Meow!";
        }

        move() {
            return this.name + " gracefully walks";
        }

        climb() {
            return this.name + " climbs up high";
        }

        eat(food) {
            if (food === "fish") {
                return this.name + " loves eating " + food + "!";
            }
            return super.eat(food);
        }
    }

    class Bird extends Animal {
        constructor(name, canFly) {
            super(name, "Bird");
            this.canFly = canFly;
        }

        makeSound() {
            return this.name + " chirps: Tweet!";
        }

        move() {
            return this.canFly ?
                this.name + " flies through the air" :
                this.name + " walks on the ground";
        }

        eat(food) {
            if (food === "seeds") {
                return this.name + " pecks at " + food;
            }
            return super.eat(food);
        }
    }

    // Test polymorphism
    var animals = [
        new Dog("Rex", "German Shepherd"),
        new Cat("Whiskers", "Orange"),
        new Bird("Tweety", true),
        new Bird("Penguin", false)
    ];

    // Test method overriding
    if (animals[0].makeSound() !== "Rex barks: Woof!") throw new Error("Dog sound override failed");
    if (animals[1].makeSound() !== "Whiskers meows: Meow!") throw new Error("Cat sound override failed");
    if (animals[2].makeSound() !== "Tweety chirps: Tweet!") throw new Error("Bird sound override failed");

    // Test polymorphic behavior
    var sounds = animals.map(animal => animal.makeSound());
    if (sounds.length !== 4) throw new Error("Polymorphic method call failed");
    if (!sounds[0].includes("barks")) throw new Error("Polymorphic method resolution failed");
    if (!sounds[1].includes("meows")) throw new Error("Polymorphic method resolution failed");

    var movements = animals.map(animal => animal.move());
    if (!movements[2].includes("flies")) throw new Error("Polymorphic method with state failed");
    if (!movements[3].includes("walks")) throw new Error("Polymorphic method with state failed");

    // Test super calls in overridden methods
    if (!animals[0].eat("meat").includes("Rex eats meat")) throw new Error("Super call in override failed");
    if (animals[0].eat("chocolate").includes("eats chocolate")) throw new Error("Override without super failed");
    if (!animals[1].eat("fish").includes("loves eating fish")) throw new Error("Conditional override failed");

    // Test method existence checks
    animals.forEach((animal, index) => {
        if (typeof animal.makeSound !== "function") throw new Error("Polymorphic method missing");
        if (typeof animal.move !== "function") throw new Error("Polymorphic method missing");
        if (typeof animal.toString !== "function") throw new Error("Inherited method missing");
    });

    // Test unique methods
    if (typeof animals[0].fetch !== "function") throw new Error("Dog-specific method missing");
    if (typeof animals[1].climb !== "function") throw new Error("Cat-specific method missing");
    if (typeof animals[1].fetch === "function") throw new Error("Method should not exist on Cat");
})();

// Test 111-120: Class Decorators Simulation
(function() {
    // Decorator functions
    function readonly(target, propertyKey, descriptor) {
        descriptor.writable = false;
        return descriptor;
    }

    function validate(validatorFn) {
        return function(target, propertyKey, descriptor) {
            var originalSetter = descriptor.set;
            descriptor.set = function(value) {
                if (!validatorFn(value)) {
                    throw new Error("Validation failed for " + propertyKey);
                }
                return originalSetter.call(this, value);
            };
            return descriptor;
        };
    }

    function logged(target, propertyKey, descriptor) {
        var originalMethod = descriptor.value;
        descriptor.value = function(...args) {
            console.log("Calling " + propertyKey + " with args:", args);
            var result = originalMethod.apply(this, args);
            console.log("Result:", result);
            return result;
        };
        return descriptor;
    }

    function memoize(target, propertyKey, descriptor) {
        var originalMethod = descriptor.value;
        var cache = new Map();

        descriptor.value = function(...args) {
            var key = JSON.stringify(args);
            if (cache.has(key)) {
                return cache.get(key);
            }
            var result = originalMethod.apply(this, args);
            cache.set(key, result);
            return result;
        };
        return descriptor;
    }

    // Manual decorator application
    class DecoratedClass {
        constructor() {
            this._value = 0;
            this._name = "default";
        }

        get value() {
            return this._value;
        }

        set value(val) {
            this._value = val;
        }

        get name() {
            return this._name;
        }

        set name(val) {
            this._name = val;
        }

        calculate(x, y) {
            return x * x + y * y;
        }

        process(data) {
            return "Processed: " + data;
        }

        getValue() {
            return this._value;
        }
    }

    // Apply decorators manually
    var valueDescriptor = Object.getOwnPropertyDescriptor(DecoratedClass.prototype, "value");
    if (valueDescriptor && valueDescriptor.set) {
        validate(val => typeof val === "number" && val >= 0)(DecoratedClass.prototype, "value", valueDescriptor);
        Object.defineProperty(DecoratedClass.prototype, "value", valueDescriptor);
    }

    var nameDescriptor = Object.getOwnPropertyDescriptor(DecoratedClass.prototype, "name");
    if (nameDescriptor && nameDescriptor.set) {
        validate(val => typeof val === "string" && val.length > 0)(DecoratedClass.prototype, "name", nameDescriptor);
        Object.defineProperty(DecoratedClass.prototype, "name", nameDescriptor);
    }

    var calculateDescriptor = Object.getOwnPropertyDescriptor(DecoratedClass.prototype, "calculate");
    if (calculateDescriptor) {
        memoize(DecoratedClass.prototype, "calculate", calculateDescriptor);
        Object.defineProperty(DecoratedClass.prototype, "calculate", calculateDescriptor);
    }

    var getValueDescriptor = Object.getOwnPropertyDescriptor(DecoratedClass.prototype, "getValue");
    if (getValueDescriptor) {
        readonly(DecoratedClass.prototype, "getValue", getValueDescriptor);
        Object.defineProperty(DecoratedClass.prototype, "getValue", getValueDescriptor);
    }

    var decorated = new DecoratedClass();

    // Test validation decorator
    decorated.value = 10;
    if (decorated.value !== 10) throw new Error("Decorated setter failed");

    try {
        decorated.value = -5;
        var validationError = false;
    } catch (e) {
        var validationError = true;
    }
    if (!validationError) throw new Error("Validation decorator failed");

    decorated.name = "test";
    if (decorated.name !== "test") throw new Error("String validation failed");

    try {
        decorated.name = "";
        var nameValidationError = false;
    } catch (e) {
        var nameValidationError = true;
    }
    if (!nameValidationError) throw new Error("String validation decorator failed");

    // Test memoization decorator
    var result1 = decorated.calculate(3, 4);
    var result2 = decorated.calculate(3, 4);
    if (result1 !== 25) throw new Error("Memoized method calculation failed");
    if (result2 !== 25) throw new Error("Memoized method cache failed");

    // Test readonly decorator
    var descriptor = Object.getOwnPropertyDescriptor(DecoratedClass.prototype, "getValue");
    if (descriptor && descriptor.writable !== false) throw new Error("Readonly decorator failed");

    // Class-level decorator simulation
    function Singleton(constructor) {
        var instance = null;
        return class extends constructor {
            constructor(...args) {
                if (instance) {
                    return instance;
                }
                super(...args);
                instance = this;
                return this;
            }
        };
    }

    var OriginalClass = class {
        constructor(value) {
            this.value = value;
        }
    };

    var SingletonClass = Singleton(OriginalClass);

    var instance1 = new SingletonClass("first");
    var instance2 = new SingletonClass("second");

    if (instance1 !== instance2) throw new Error("Singleton decorator failed");
    if (instance1.value !== "first") throw new Error("Singleton instance preservation failed");
})();

// Test 121-130: Advanced Inheritance Patterns
(function() {
    // Multiple inheritance simulation using proxy
    function MultipleInheritance(...parents) {
        return class {
            constructor(...args) {
                parents.forEach((Parent, index) => {
                    var parentInstance = new Parent(...args);
                    // Copy instance properties
                    Object.getOwnPropertyNames(parentInstance).forEach(prop => {
                        if (!this.hasOwnProperty(prop)) {
                            this[prop] = parentInstance[prop];
                        }
                    });
                    // Copy prototype methods
                    var proto = Object.getPrototypeOf(parentInstance);
                    while (proto && proto !== Object.prototype) {
                        Object.getOwnPropertyNames(proto).forEach(prop => {
                            if (prop !== 'constructor' && typeof proto[prop] === 'function' && !this[prop]) {
                                this[prop] = proto[prop].bind(this);
                            }
                        });
                        proto = Object.getPrototypeOf(proto);
                    }
                });
            }
        };
    }

    class Walker {
        constructor() {
            this.walkSpeed = 5;
        }

        walk() {
            return "Walking at speed " + this.walkSpeed;
        }
    }

    class Swimmer {
        constructor() {
            this.swimSpeed = 3;
        }

        swim() {
            return "Swimming at speed " + this.swimSpeed;
        }
    }

    class Flyer {
        constructor() {
            this.flySpeed = 10;
        }

        fly() {
            return "Flying at speed " + this.flySpeed;
        }
    }

    var Amphibian = MultipleInheritance(Walker, Swimmer);
    var amphibian = new Amphibian();

    if (amphibian.walk() !== "Walking at speed 5") throw new Error("Multiple inheritance walk failed");
    if (amphibian.swim() !== "Swimming at speed 3") throw new Error("Multiple inheritance swim failed");
    if (amphibian.walkSpeed !== 5) throw new Error("Multiple inheritance property failed");
    if (amphibian.swimSpeed !== 3) throw new Error("Multiple inheritance property failed");

    // Trait-based inheritance
    var Trackable = {
        track() {
            return "Tracking " + this.name;
        },

        getLocation() {
            return this.location || "unknown";
        },

        setLocation(loc) {
            this.location = loc;
            return this;
        }
    };

    var Nameable = {
        setName(name) {
            this.name = name;
            return this;
        },

        getName() {
            return this.name || "unnamed";
        }
    };

    function applyTraits(target, ...traits) {
        traits.forEach(trait => {
            Object.getOwnPropertyNames(trait).forEach(prop => {
                if (typeof trait[prop] === "function") {
                    target.prototype[prop] = trait[prop];
                }
            });
        });
        return target;
    }

    class Entity {
        constructor() {
            this.id = Math.random().toString(36).substr(2, 9);
        }
    }

    applyTraits(Entity, Trackable, Nameable);

    var entity = new Entity();
    entity.setName("TestEntity").setLocation("Home");

    if (entity.getName() !== "TestEntity") throw new Error("Trait application failed");
    if (entity.getLocation() !== "Home") throw new Error("Trait chaining failed");
    if (entity.track() !== "Tracking TestEntity") throw new Error("Trait interaction failed");

    // Diamond problem simulation and resolution
    class A {
        method() { return "A"; }
        commonMethod() { return "A-common"; }
    }

    class B extends A {
        method() { return "B"; }
        commonMethod() { return "B-common"; }
    }

    class C extends A {
        method() { return "C"; }
        commonMethod() { return "C-common"; }
    }

    // Manual diamond resolution
    class D {
        constructor() {
            this.bMixin = new B();
            this.cMixin = new C();
        }

        method() {
            return "D delegates to B: " + this.bMixin.method();
        }

        commonMethod() {
            // Explicit resolution of diamond problem
            return "D resolves: " + this.bMixin.commonMethod() + " and " + this.cMixin.commonMethod();
        }

        specificB() {
            return this.bMixin.method();
        }

        specificC() {
            return this.cMixin.method();
        }
    }

    var d = new D();
    if (d.method() !== "D delegates to B: B") throw new Error("Diamond delegation failed");
    if (!d.commonMethod().includes("B-common") || !d.commonMethod().includes("C-common")) {
        throw new Error("Diamond resolution failed");
    }
    if (d.specificB() !== "B") throw new Error("Specific delegation failed");
    if (d.specificC() !== "C") throw new Error("Specific delegation failed");
})();

// Test 131-140: Class Metadata and Reflection
(function() {
    // Metadata storage using WeakMap
    var classMetadata = new WeakMap();

    function setMetadata(target, key, value) {
        if (!classMetadata.has(target)) {
            classMetadata.set(target, new Map());
        }
        classMetadata.get(target).set(key, value);
    }

    function getMetadata(target, key) {
        var metadata = classMetadata.get(target);
        return metadata ? metadata.get(key) : undefined;
    }

    function hasMetadata(target, key) {
        var metadata = classMetadata.get(target);
        return metadata ? metadata.has(key) : false;
    }

    // Reflection utilities
    function getClassInfo(ClassConstructor) {
        var info = {
            name: ClassConstructor.name,
            methods: [],
            properties: [],
            staticMethods: [],
            prototype: ClassConstructor.prototype
        };

        // Get instance methods
        var proto = ClassConstructor.prototype;
        while (proto && proto !== Object.prototype) {
            Object.getOwnPropertyNames(proto).forEach(name => {
                if (name !== "constructor") {
                    var descriptor = Object.getOwnPropertyDescriptor(proto, name);
                    if (descriptor) {
                        if (typeof descriptor.value === "function") {
                            info.methods.push(name);
                        } else if (descriptor.get || descriptor.set) {
                            info.properties.push(name);
                        }
                    }
                }
            });
            proto = Object.getPrototypeOf(proto);
        }

        // Get static methods
        Object.getOwnPropertyNames(ClassConstructor).forEach(name => {
            if (name !== "prototype" && name !== "name" && name !== "length") {
                var descriptor = Object.getOwnPropertyDescriptor(ClassConstructor, name);
                if (descriptor && typeof descriptor.value === "function") {
                    info.staticMethods.push(name);
                }
            }
        });

        return info;
    }

    function callMethod(instance, methodName, ...args) {
        if (typeof instance[methodName] === "function") {
            return instance[methodName](...args);
        }
        throw new Error("Method " + methodName + " not found");
    }

    // Test class with metadata
    class MetadataClass {
        constructor(value) {
            this.value = value;
        }

        getValue() {
            return this.value;
        }

        setValue(val) {
            this.value = val;
        }

        get computedValue() {
            return this.value * 2;
        }

        set computedValue(val) {
            this.value = val / 2;
        }

        static createDefault() {
            return new MetadataClass(0);
        }

        static getVersion() {
            return "1.0";
        }
    }

    // Set metadata
    setMetadata(MetadataClass, "version", "1.0");
    setMetadata(MetadataClass, "author", "Test Author");
    setMetadata(MetadataClass, "description", "A test class");

    // Test metadata operations
    if (getMetadata(MetadataClass, "version") !== "1.0") throw new Error("Metadata get failed");
    if (!hasMetadata(MetadataClass, "author")) throw new Error("Metadata has check failed");
    if (hasMetadata(MetadataClass, "nonexistent")) throw new Error("Metadata negative check failed");

    // Test reflection
    var classInfo = getClassInfo(MetadataClass);
    if (classInfo.name !== "MetadataClass") throw new Error("Class name reflection failed");
    if (!classInfo.methods.includes("getValue")) throw new Error("Method reflection failed");
    if (!classInfo.methods.includes("setValue")) throw new Error("Method reflection failed");
    if (!classInfo.properties.includes("computedValue")) throw new Error("Property reflection failed");
    if (!classInfo.staticMethods.includes("createDefault")) throw new Error("Static method reflection failed");
    if (!classInfo.staticMethods.includes("getVersion")) throw new Error("Static method reflection failed");

    // Test dynamic method calling
    var instance = new MetadataClass(10);
    if (callMethod(instance, "getValue") !== 10) throw new Error("Dynamic method call failed");
    callMethod(instance, "setValue", 20);
    if (instance.getValue() !== 20) throw new Error("Dynamic method call with args failed");

    try {
        callMethod(instance, "nonexistentMethod");
        var methodError = false;
    } catch (e) {
        var methodError = true;
    }
    if (!methodError) throw new Error("Dynamic method error handling failed");

    // Inheritance reflection
    class ExtendedMetadata extends MetadataClass {
        constructor(value, extra) {
            super(value);
            this.extra = extra;
        }

        getExtra() {
            return this.extra;
        }

        getValue() {
            return super.getValue() + " (extended)";
        }
    }

    var extendedInfo = getClassInfo(ExtendedMetadata);
    if (!extendedInfo.methods.includes("getExtra")) throw new Error("Extended class method reflection failed");
    if (!extendedInfo.methods.includes("getValue")) throw new Error("Inherited method reflection failed");
    if (!extendedInfo.methods.includes("setValue")) throw new Error("Inherited method reflection failed");

    var extendedInstance = new ExtendedMetadata(5, "bonus");
    if (callMethod(extendedInstance, "getExtra") !== "bonus") throw new Error("Extended method call failed");
    if (callMethod(extendedInstance, "getValue") !== "5 (extended)") throw new Error("Overridden method call failed");
})();

// Test 141-150: Class Performance and Memory Patterns
(function() {
    // Object pooling pattern
    class ObjectPool {
        constructor(createFn, resetFn, initialSize = 10) {
            this.createFn = createFn;
            this.resetFn = resetFn;
            this.pool = [];
            this.used = new Set();

            // Pre-allocate initial objects
            for (var i = 0; i < initialSize; i++) {
                this.pool.push(this.createFn());
            }
        }

        acquire() {
            var obj;
            if (this.pool.length > 0) {
                obj = this.pool.pop();
            } else {
                obj = this.createFn();
            }
            this.used.add(obj);
            return obj;
        }

        release(obj) {
            if (this.used.has(obj)) {
                this.used.delete(obj);
                this.resetFn(obj);
                this.pool.push(obj);
                return true;
            }
            return false;
        }

        getPoolSize() {
            return this.pool.length;
        }

        getUsedCount() {
            return this.used.size;
        }
    }

    class PooledObject {
        constructor() {
            this.reset();
        }

        reset() {
            this.data = null;
            this.processed = false;
            this.timestamp = 0;
        }

        setData(data) {
            this.data = data;
            this.processed = false;
            this.timestamp = Date.now();
            return this;
        }

        process() {
            if (this.data) {
                this.processed = true;
                return "Processed: " + this.data;
            }
            return "No data to process";
        }

        isProcessed() {
            return this.processed;
        }
    }

    var pool = new ObjectPool(
        () => new PooledObject(),
        (obj) => obj.reset(),
        5
    );

    if (pool.getPoolSize() !== 5) throw new Error("Pool initialization failed");
    if (pool.getUsedCount() !== 0) throw new Error("Pool used count initialization failed");

    var obj1 = pool.acquire();
    var obj2 = pool.acquire();

    if (pool.getPoolSize() !== 3) throw new Error("Pool acquisition failed");
    if (pool.getUsedCount() !== 2) throw new Error("Pool used tracking failed");

    obj1.setData("test data");
    if (obj1.process() !== "Processed: test data") throw new Error("Pooled object functionality failed");

    if (!pool.release(obj1)) throw new Error("Pool release failed");
    if (pool.getPoolSize() !== 4) throw new Error("Pool release size failed");
    if (pool.getUsedCount() !== 1) throw new Error("Pool release tracking failed");

    var obj3 = pool.acquire();
    if (obj3.data !== null) throw new Error("Pool object reset failed");

    // Lazy initialization pattern
    class LazyClass {
        constructor() {
            this._expensive = null;
            this._computed = null;
        }

        get expensiveResource() {
            if (!this._expensive) {
                this._expensive = this.createExpensiveResource();
            }
            return this._expensive;
        }

        get computedValue() {
            if (this._computed === null) {
                this._computed = this.computeExpensiveValue();
            }
            return this._computed;
        }

        createExpensiveResource() {
            // Simulate expensive resource creation
            return {
                data: new Array(1000).fill(0).map((_, i) => i),
                timestamp: Date.now()
            };
        }

        computeExpensiveValue() {
            // Simulate expensive computation
            var sum = 0;
            for (var i = 0; i < 10000; i++) {
                sum += Math.sqrt(i);
            }
            return sum;
        }

        isResourceLoaded() {
            return this._expensive !== null;
        }

        isValueComputed() {
            return this._computed !== null;
        }
    }

    var lazy = new LazyClass();
    if (lazy.isResourceLoaded()) throw new Error("Lazy resource should not be loaded initially");
    if (lazy.isValueComputed()) throw new Error("Lazy value should not be computed initially");

    var resource = lazy.expensiveResource;
    if (!lazy.isResourceLoaded()) throw new Error("Lazy resource should be loaded after access");
    if (resource.data.length !== 1000) throw new Error("Lazy resource creation failed");

    var value = lazy.computedValue;
    if (!lazy.isValueComputed()) throw new Error("Lazy value should be computed after access");
    if (typeof value !== "number") throw new Error("Lazy computation failed");

    // Flyweight pattern
    var FlyweightFactory = (function() {
        var flyweights = new Map();

        return {
            getFlyweight: function(intrinsicState) {
                var key = JSON.stringify(intrinsicState);
                if (!flyweights.has(key)) {
                    flyweights.set(key, new Flyweight(intrinsicState));
                }
                return flyweights.get(key);
            },

            getCreatedCount: function() {
                return flyweights.size;
            },

            clear: function() {
                flyweights.clear();
            }
        };
    })();

    class Flyweight {
        constructor(intrinsicState) {
            this.intrinsicState = intrinsicState;
        }

        operation(extrinsicState) {
            return "Flyweight with intrinsic: " + JSON.stringify(this.intrinsicState) +
                   ", extrinsic: " + JSON.stringify(extrinsicState);
        }
    }

    var flyweight1 = FlyweightFactory.getFlyweight({ type: "A", color: "red" });
    var flyweight2 = FlyweightFactory.getFlyweight({ type: "A", color: "red" });
    var flyweight3 = FlyweightFactory.getFlyweight({ type: "B", color: "blue" });

    if (flyweight1 !== flyweight2) throw new Error("Flyweight sharing failed");
    if (flyweight1 === flyweight3) throw new Error("Flyweight differentiation failed");
    if (FlyweightFactory.getCreatedCount() !== 2) throw new Error("Flyweight creation count failed");

    var result1 = flyweight1.operation({ position: "top" });
    var result2 = flyweight2.operation({ position: "bottom" });

    if (!result1.includes("red") || !result1.includes("top")) throw new Error("Flyweight operation failed");
    if (!result2.includes("red") || !result2.includes("bottom")) throw new Error("Flyweight operation failed");

    // Memory-efficient inheritance
    class BaseClass {
        constructor() {
            // Shared prototype methods instead of instance methods
        }

        static sharedMethod() {
            return "shared";
        }
    }

    // Add methods to prototype instead of instances
    BaseClass.prototype.instanceMethod = function() {
        return "instance method";
    };

    BaseClass.prototype.getValue = function() {
        return this.value || "default";
    };

    class EfficientClass extends BaseClass {
        constructor(value) {
            super();
            this.value = value; // Only instance-specific data
        }
    }

    var instances = [];
    for (var i = 0; i < 100; i++) {
        instances.push(new EfficientClass("value" + i));
    }

    // Test that all instances share the same prototype methods
    if (instances[0].instanceMethod !== instances[99].instanceMethod) {
        throw new Error("Prototype method sharing failed");
    }

    if (instances[0].getValue() !== "value0") throw new Error("Instance-specific data failed");
    if (instances[99].getValue() !== "value99") throw new Error("Instance-specific data failed");
})();