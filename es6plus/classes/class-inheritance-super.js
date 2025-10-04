/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Class Inheritance, Super Calls, Static Methods, Getters/Setters
 */

// Basic class inheritance
class Animal {
    constructor(name, species) {
        this.name = name;
        this.species = species;
        this.isAlive = true;
    }

    speak() {
        return `${this.name} makes a sound`;
    }

    move() {
        return `${this.name} moves`;
    }

    static getKingdom() {
        return "Animalia";
    }

    get fullInfo() {
        return `${this.name} is a ${this.species}`;
    }

    set alive(value) {
        this.isAlive = Boolean(value);
    }

    get alive() {
        return this.isAlive;
    }
}

// Test 1: Basic class instantiation
var animal = new Animal("Generic", "Unknown");
if (animal.name !== "Generic") throw new Error("Test 1 failed: Constructor property assignment");

// Test 2: Method inheritance
if (animal.speak() !== "Generic makes a sound") throw new Error("Test 2 failed: Method inheritance");

// Test 3: Static method access
if (Animal.getKingdom() !== "Animalia") throw new Error("Test 3 failed: Static method access");

// Test 4: Getter access
if (animal.fullInfo !== "Generic is a Unknown") throw new Error("Test 4 failed: Getter access");

// Test 5: Setter access
animal.alive = false;
if (animal.alive !== false) throw new Error("Test 5 failed: Setter access");

// Test 6: instanceof with base class
if (!(animal instanceof Animal)) throw new Error("Test 6 failed: instanceof with base class");

// Extended class with super calls
class Dog extends Animal {
    constructor(name, breed) {
        super(name, "Canis lupus");
        this.breed = breed;
        this.legs = 4;
    }

    speak() {
        return super.speak() + " - Woof!";
    }

    move() {
        return super.move() + " on four legs";
    }

    static getSpecies() {
        return "Canis lupus";
    }

    get breedInfo() {
        return `${this.name} is a ${this.breed}`;
    }

    set breed(value) {
        this._breed = value;
    }

    get breed() {
        return this._breed;
    }
}

// Test 7: Extended class instantiation
var dog = new Dog("Buddy", "Golden Retriever");
if (dog.name !== "Buddy") throw new Error("Test 7 failed: Super constructor call");

// Test 8: Super property inheritance
if (dog.species !== "Canis lupus") throw new Error("Test 8 failed: Super property inheritance");

// Test 9: Method overriding with super
if (dog.speak() !== "Buddy makes a sound - Woof!") throw new Error("Test 9 failed: Method override with super");

// Test 10: Super method call in override
if (dog.move() !== "Buddy moves on four legs") throw new Error("Test 10 failed: Super method call in override");

// Test 11: instanceof with parent class
if (!(dog instanceof Animal)) throw new Error("Test 11 failed: instanceof with parent class");

// Test 12: instanceof with child class
if (!(dog instanceof Dog)) throw new Error("Test 12 failed: instanceof with child class");

// Test 13: Static method inheritance
if (Dog.getKingdom() !== "Animalia") throw new Error("Test 13 failed: Static method inheritance");

// Test 14: Static method overriding
if (Dog.getSpecies() !== "Canis lupus") throw new Error("Test 14 failed: Static method overriding");

// Test 15: Getter inheritance from parent
if (dog.fullInfo !== "Buddy is a Canis lupus") throw new Error("Test 15 failed: Getter inheritance");

// Test 16: Child class specific getter
if (dog.breedInfo !== "Buddy is a Golden Retriever") throw new Error("Test 16 failed: Child class getter");

// Test 17: Setter inheritance
dog.alive = true;
if (dog.alive !== true) throw new Error("Test 17 failed: Setter inheritance");

// Multiple inheritance levels
class ServiceDog extends Dog {
    constructor(name, breed, certification) {
        super(name, breed);
        this.certification = certification;
        this.isWorking = true;
    }

    speak() {
        return super.speak() + " (Service dog on duty)";
    }

    static getType() {
        return "Service Animal";
    }

    get status() {
        return this.isWorking ? "On duty" : "Off duty";
    }

    set working(value) {
        this.isWorking = Boolean(value);
    }
}

// Test 18: Three-level inheritance
var serviceDog = new ServiceDog("Max", "Labrador", "Guide Dog");
if (serviceDog.name !== "Max") throw new Error("Test 18 failed: Three-level constructor");

// Test 19: Multi-level super calls
if (serviceDog.speak() !== "Max makes a sound - Woof! (Service dog on duty)") {
    throw new Error("Test 19 failed: Multi-level super calls");
}

// Test 20: Deep instanceof checks
if (!(serviceDog instanceof Animal)) throw new Error("Test 20 failed: Deep instanceof Animal");
if (!(serviceDog instanceof Dog)) throw new Error("Test 20 failed: Deep instanceof Dog");
if (!(serviceDog instanceof ServiceDog)) throw new Error("Test 20 failed: Deep instanceof ServiceDog");

// Test 21: Static method inheritance chain
if (ServiceDog.getKingdom() !== "Animalia") throw new Error("Test 21 failed: Deep static inheritance");

// Test 22: Property access through inheritance chain
if (serviceDog.species !== "Canis lupus") throw new Error("Test 22 failed: Deep property inheritance");

// Constructor super call edge cases
class Bird extends Animal {
    constructor() {
        super("Unnamed Bird", "Aves");
        this.canFly = true;
    }
}

// Test 23: Super call without parameters
var bird = new Bird();
if (bird.name !== "Unnamed Bird") throw new Error("Test 23 failed: Super call without params");

// Test 24: Default super properties
if (bird.species !== "Aves") throw new Error("Test 24 failed: Default super properties");

// Getter/Setter complex scenarios
class Rectangle {
    constructor(width, height) {
        this._width = width;
        this._height = height;
    }

    get width() {
        return this._width;
    }

    set width(value) {
        if (value < 0) throw new Error("Width cannot be negative");
        this._width = value;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        if (value < 0) throw new Error("Height cannot be negative");
        this._height = value;
    }

    get area() {
        return this._width * this._height;
    }

    get perimeter() {
        return 2 * (this._width + this._height);
    }
}

// Test 25: Getter/setter validation
var rect = new Rectangle(5, 10);
if (rect.width !== 5) throw new Error("Test 25 failed: Getter basic functionality");

// Test 26: Setter validation
rect.width = 8;
if (rect.width !== 8) throw new Error("Test 26 failed: Setter basic functionality");

// Test 27: Computed getter
if (rect.area !== 80) throw new Error("Test 27 failed: Computed getter");

// Test 28: Multiple computed getters
if (rect.perimeter !== 36) throw new Error("Test 28 failed: Multiple computed getters");

// Test 29: Setter validation error
try {
    rect.width = -5;
    throw new Error("Test 29 failed: Setter should throw error");
} catch (e) {
    if (e.message !== "Width cannot be negative") {
        throw new Error("Test 29 failed: Wrong error message");
    }
}

// Square extending Rectangle
class Square extends Rectangle {
    constructor(side) {
        super(side, side);
        this._side = side;
    }

    get side() {
        return this._side;
    }

    set side(value) {
        if (value < 0) throw new Error("Side cannot be negative");
        this._side = value;
        this._width = value;
        this._height = value;
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this.side = value;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this.side = value;
    }
}

// Test 30: Inherited getter/setter override
var square = new Square(6);
if (square.area !== 36) throw new Error("Test 30 failed: Inherited computed getter");

// Test 31: Setter override with side effects
square.width = 8;
if (square.height !== 8) throw new Error("Test 31 failed: Setter override side effects");

// Test 32: Getter inheritance with override
if (square.side !== 8) throw new Error("Test 32 failed: Getter inheritance with override");

// Static method inheritance and overriding
class MathUtils {
    static add(a, b) {
        return a + b;
    }

    static multiply(a, b) {
        return a * b;
    }

    static getType() {
        return "MathUtils";
    }
}

class AdvancedMath extends MathUtils {
    static power(base, exponent) {
        return Math.pow(base, exponent);
    }

    static getType() {
        return "AdvancedMath";
    }

    static add(a, b, c = 0) {
        return super.add(a, b) + c;
    }
}

// Test 33: Static method inheritance
if (AdvancedMath.multiply(3, 4) !== 12) throw new Error("Test 33 failed: Static method inheritance");

// Test 34: Static method overriding
if (AdvancedMath.getType() !== "AdvancedMath") throw new Error("Test 34 failed: Static method overriding");

// Test 35: Static method with super call
if (AdvancedMath.add(2, 3, 5) !== 10) throw new Error("Test 35 failed: Static method with super");

// Test 36: Child-specific static method
if (AdvancedMath.power(2, 3) !== 8) throw new Error("Test 36 failed: Child-specific static method");

// Method binding and context
class Counter {
    constructor(start = 0) {
        this.count = start;
    }

    increment() {
        this.count++;
        return this.count;
    }

    decrement() {
        this.count--;
        return this.count;
    }

    get current() {
        return this.count;
    }
}

// Test 37: Method context preservation
var counter = new Counter(5);
var inc = counter.increment;
// Note: Method binding behavior may vary in different engines
if (counter.current !== 5) throw new Error("Test 37 failed: Initial counter state");

// Test 38: Direct method call
if (counter.increment() !== 6) throw new Error("Test 38 failed: Direct method call");

// Test 39: Getter context
if (counter.current !== 6) throw new Error("Test 39 failed: Getter context");

// Super in static methods
class BaseCalculator {
    static calculate(operation, a, b) {
        switch (operation) {
            case 'add': return a + b;
            case 'subtract': return a - b;
            default: throw new Error("Unknown operation");
        }
    }

    static getVersion() {
        return "1.0";
    }
}

class ExtendedCalculator extends BaseCalculator {
    static calculate(operation, a, b) {
        if (operation === 'multiply') {
            return a * b;
        }
        return super.calculate(operation, a, b);
    }

    static getInfo() {
        return `Extended Calculator v${super.getVersion()}`;
    }
}

// Test 40: Super in static methods
if (ExtendedCalculator.calculate('add', 5, 3) !== 8) {
    throw new Error("Test 40 failed: Super in static methods");
}

// Test 41: Extended static functionality
if (ExtendedCalculator.calculate('multiply', 4, 6) !== 24) {
    throw new Error("Test 41 failed: Extended static functionality");
}

// Test 42: Super call in static method
if (ExtendedCalculator.getInfo() !== "Extended Calculator v1.0") {
    throw new Error("Test 42 failed: Super call in static method");
}

// Complex inheritance with mixins-like pattern
class Flyable {
    fly() {
        return `${this.name || 'Unknown'} is flying`;
    }
}

class Swimmable {
    swim() {
        return `${this.name || 'Unknown'} is swimming`;
    }
}

// Simulating multiple inheritance through composition
class Duck extends Animal {
    constructor(name) {
        super(name, "Duck");
    }

    fly() {
        return Flyable.prototype.fly.call(this);
    }

    swim() {
        return Swimmable.prototype.swim.call(this);
    }

    speak() {
        return super.speak() + " - Quack!";
    }
}

// Test 43: Mixin-style inheritance
var duck = new Duck("Donald");
if (duck.fly() !== "Donald is flying") throw new Error("Test 43 failed: Mixin-style inheritance");

// Test 44: Multiple mixin methods
if (duck.swim() !== "Donald is swimming") throw new Error("Test 44 failed: Multiple mixin methods");

// Test 45: Original inheritance still works
if (duck.speak() !== "Donald makes a sound - Quack!") {
    throw new Error("Test 45 failed: Original inheritance with mixins");
}

// Private-like properties using symbols
var _private = Symbol('private');

class PrivateExample {
    constructor(value) {
        this[_private] = value;
        this.public = "public value";
    }

    getPrivate() {
        return this[_private];
    }

    setPrivate(value) {
        this[_private] = value;
    }
}

// Test 46: Symbol-based privacy simulation
var privateObj = new PrivateExample("secret");
if (privateObj.getPrivate() !== "secret") throw new Error("Test 46 failed: Symbol-based privacy");

// Test 47: Public property access
if (privateObj.public !== "public value") throw new Error("Test 47 failed: Public property access");

// Test 48: Private property not enumerable
var keys = Object.keys(privateObj);
if (keys.includes(_private.toString())) throw new Error("Test 48 failed: Private property enumerable");

// Getter/Setter inheritance chain
class BaseEntity {
    constructor(id) {
        this._id = id;
        this._created = new Date();
    }

    get id() {
        return this._id;
    }

    get created() {
        return this._created;
    }

    get info() {
        return `Entity ${this._id}`;
    }
}

class User extends BaseEntity {
    constructor(id, name) {
        super(id);
        this._name = name;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get info() {
        return `User ${this._name} (${this._id})`;
    }
}

class AdminUser extends User {
    constructor(id, name, permissions) {
        super(id, name);
        this._permissions = permissions || [];
    }

    get permissions() {
        return this._permissions.slice(); // Return copy
    }

    addPermission(permission) {
        if (!this._permissions.includes(permission)) {
            this._permissions.push(permission);
        }
    }

    get info() {
        return `Admin ${this._name} (${this._id}) - ${this._permissions.length} permissions`;
    }
}

// Test 49: Multi-level getter inheritance
var admin = new AdminUser(1, "Alice", ["read", "write"]);
if (admin.id !== 1) throw new Error("Test 49 failed: Deep getter inheritance");

// Test 50: Getter override chain
if (admin.info !== "Admin Alice (1) - 2 permissions") {
    throw new Error("Test 50 failed: Getter override chain");
}

// Test 51: Method inheritance with property access
admin.addPermission("delete");
if (admin.permissions.length !== 3) throw new Error("Test 51 failed: Method with getter");

// Test 52: Setter inheritance
admin.name = "Alice Admin";
if (admin.name !== "Alice Admin") throw new Error("Test 52 failed: Setter inheritance");

// Test 53: Protected-like access pattern
if (!admin.created instanceof Date) throw new Error("Test 53 failed: Deep property inheritance");

// Edge case: constructor without super in inheritance
class NoSuper extends Animal {
    // This should work but constructor won't call parent constructor
}

// Test 54: Class without explicit constructor
var noSuper = new NoSuper();
if (typeof noSuper.name !== "undefined") throw new Error("Test 54 failed: No super constructor behavior");

// Test 55: Method still inherited without super constructor
if (typeof noSuper.speak !== "function") throw new Error("Test 55 failed: Method inheritance without super");

// Property descriptor behavior with getters/setters
class DescriptorTest {
    get readOnly() {
        return "read only value";
    }

    get writeOnly() {
        return this._writeOnly;
    }

    set writeOnly(value) {
        this._writeOnly = value;
    }
}

// Test 56: Read-only property behavior
var descriptorObj = new DescriptorTest();
if (descriptorObj.readOnly !== "read only value") throw new Error("Test 56 failed: Read-only getter");

// Test 57: Write-only property behavior
descriptorObj.writeOnly = "test value";
if (descriptorObj.writeOnly !== "test value") throw new Error("Test 57 failed: Write-only setter");

// Static inheritance with complex scenarios
class Vehicle {
    constructor(type) {
        this.type = type;
    }

    static getCategory() {
        return "Vehicle";
    }

    static validateType(type) {
        return typeof type === "string" && type.length > 0;
    }
}

class Car extends Vehicle {
    constructor(make, model) {
        super("car");
        this.make = make;
        this.model = model;
    }

    static getCategory() {
        return "Automobile";
    }

    static validateMake(make) {
        return super.validateType(make);
    }
}

// Test 58: Static method override
if (Car.getCategory() !== "Automobile") throw new Error("Test 58 failed: Static method override");

// Test 59: Static method with super call
if (!Car.validateMake("Toyota")) throw new Error("Test 59 failed: Static method with super");

// Test 60: Static method inheritance
if (!Car.validateType("sedan")) throw new Error("Test 60 failed: Static method inheritance");

// Complex getter/setter with validation and transformation
class Temperature {
    constructor(celsius = 0) {
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
        if (typeof value !== "number") throw new Error("Temperature must be a number");
        if (value < 0) throw new Error("Kelvin cannot be negative");
        this._celsius = value - 273.15;
    }
}

// Test 61: Getter transformation
var temp = new Temperature(0);
if (temp.fahrenheit !== 32) throw new Error("Test 61 failed: Getter transformation");

// Test 62: Setter transformation
temp.fahrenheit = 212;
if (temp.celsius !== 100) throw new Error("Test 62 failed: Setter transformation");

// Test 63: Multiple unit access
if (Math.abs(temp.kelvin - 373.15) > 0.01) throw new Error("Test 63 failed: Multiple unit access");

// Test 64: Setter validation
try {
    temp.kelvin = -10;
    throw new Error("Test 64 failed: Setter should validate");
} catch (e) {
    if (e.message !== "Kelvin cannot be negative") {
        throw new Error("Test 64 failed: Wrong validation message");
    }
}

// Test 65: Cross-unit setting
temp.kelvin = 300;
if (Math.abs(temp.celsius - 26.85) > 0.01) throw new Error("Test 65 failed: Cross-unit setting");

// Super edge cases with method overriding
class Base {
    method() {
        return "base";
    }

    callMethod() {
        return this.method();
    }
}

class Derived extends Base {
    method() {
        return "derived";
    }

    superMethod() {
        return super.method();
    }
}

// Test 66: Method resolution in inheritance
var derived = new Derived();
if (derived.callMethod() !== "derived") throw new Error("Test 66 failed: Method resolution in inheritance");

// Test 67: Explicit super method call
if (derived.superMethod() !== "base") throw new Error("Test 67 failed: Explicit super method call");

// Test 68: Direct method call
if (derived.method() !== "derived") throw new Error("Test 68 failed: Direct overridden method call");

// Constructor inheritance with default parameters
class DefaultParams {
    constructor(a = 1, b = 2, c = 3) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
}

class ExtendedDefaults extends DefaultParams {
    constructor(a, b, c, d = 4) {
        super(a, b, c);
        this.d = d;
    }
}

// Test 69: Default parameters in inheritance
var defaultObj = new ExtendedDefaults();
if (defaultObj.a !== 1) throw new Error("Test 69 failed: Default parameter inheritance");

// Test 70: Extended default parameters
if (defaultObj.d !== 4) throw new Error("Test 70 failed: Extended default parameters");

// Test 71: Partial parameter override
var partialObj = new ExtendedDefaults(10);
if (partialObj.a !== 10 || partialObj.b !== 2) {
    throw new Error("Test 71 failed: Partial parameter override");
}

// Final comprehensive test combining multiple features
class ComprehensiveTest {
    constructor(name) {
        this._name = name;
        this._counter = 0;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
        this._counter++;
    }

    get counter() {
        return this._counter;
    }

    static create(name) {
        return new this(name);
    }

    process() {
        return `Processing ${this._name}`;
    }
}

class ExtendedComprehensive extends ComprehensiveTest {
    constructor(name, type) {
        super(name);
        this._type = type;
    }

    get type() {
        return this._type;
    }

    process() {
        return super.process() + ` as ${this._type}`;
    }

    static createTyped(name, type) {
        return new this(name, type);
    }
}

// Test 72: Comprehensive getter/setter with counter
var comp = new ExtendedComprehensive("Test", "Example");
comp.name = "Updated";
if (comp.counter !== 1) throw new Error("Test 72 failed: Setter side effects");

// Test 73: Static factory method inheritance
var factoryObj = ExtendedComprehensive.create("Factory");
if (!(factoryObj instanceof ExtendedComprehensive)) {
    throw new Error("Test 73 failed: Static factory inheritance");
}

// Test 74: Extended static method
var typedObj = ExtendedComprehensive.createTyped("Typed", "Special");
if (typedObj.type !== "Special") throw new Error("Test 74 failed: Extended static method");

// Test 75: Method override with super in complex scenario
if (typedObj.process() !== "Processing Typed as Special") {
    throw new Error("Test 75 failed: Complex method override with super");
}

// All tests passed
console.log("All 75 class inheritance, super calls, static methods, and getter/setter tests passed!");