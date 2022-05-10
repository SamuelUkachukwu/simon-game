/**
 * @jest-environment jsdom
 */

const {
    game,
    newGame,
    showScore,
    addTurn,
    lightsOn,
    showTurns
} = require("../game");

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

describe("game object contain correct keys", () => {
    test("score key exist", () => {
        expect("score" in game).toBe(true);
    });
    test("currentGame key exist", () => {
        expect("currentGame" in game).toBe(true);
    });
    test("playerMoves key exist", () => {
        expect("playerMoves" in game).toBe(true);
    });
    test("turnNumber key exist", () => {
        expect("turnNumber" in game).toBe(true);
    });
    test("choices key exist", () => {
        expect("choices" in game).toBe(true);
    });
    test("choices conatin the same ids", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"])
    })
});

describe("newGame works correctly", () => {
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ["button1", "button2"]
        game.currentGame = ["button1", "button2"]
        document.getElementById("score").innerText = "42";
        newGame()
    });
    test("should set game score to zero", () => {
        expect(game.score).toEqual(0)
    });
    test("should set turnNumber to zero", () => {
        expect(game.turnNumber).toEqual(0)
    });
    test("should clear player moves array", () => {
        expect(game.playerMoves.length).toBe(0)
    });
    test("should be one move in the computer's game array", () => {
        expect(game.currentGame.length).toBe(1)
    });
    test("should display 0 for the element with id 'score'", () => {
        expect(document.getElementById("score").innerText).toEqual(0)
    });
    test("expect data-listener to be true", ()=>{
        const elements = document.getElementsByClassName("circle");
        for(let element of elements){
            expect(element.getAttribute("data-listener")).toBe("true")
        }
    })
})

describe("game play works correctly", () => {
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test("addTurn add a new Turn to the game", ()=>{
        addTurn();
        expect(game.currentGame.length).toBe(2)
    });
    test("should add correct class to light up the button",()=>{
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light")
    });
    test("showTurns should update game.turnNumber", ()=>{
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
});