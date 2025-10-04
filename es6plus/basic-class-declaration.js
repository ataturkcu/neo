/*
 * Neo JavaScript Engine Test Suite
 * Copyright (c) 2025 Ata Türkçü. All rights reserved.
 * Licensed under the BSD-3-Clause License
 *
 * Test: Basic Class Declaration (ES6+)
 */

// Test basic class declaration
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        return "Hello, I'm " + this.name;
    }

    getAge() {
        return this.age;
    }
}

// Test class instantiation
var person = new Person("John", 30);
if (!(person instanceof Person)) throw new Error("person should be instance of Person");
if (person.name !== "John") throw new Error("person.name should be 'John'");
if (person.age !== 30) throw new Error("person.age should be 30");

// Test class methods
if (person.greet() !== "Hello, I'm John") throw new Error("greet method failed");
if (person.getAge() !== 30) throw new Error("getAge method failed");

// Test inheritance
class Student extends Person {
    constructor(name, age, grade) {
        super(name, age);
        this.grade = grade;
    }

    study() {
        return this.name + " is studying";
    }
}

var student = new Student("Alice", 20, "A");
if (!(student instanceof Student)) throw new Error("student should be instance of Student");
if (!(student instanceof Person)) throw new Error("student should be instance of Person");
if (student.study() !== "Alice is studying") throw new Error("study method failed");