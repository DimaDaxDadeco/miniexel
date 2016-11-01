import angular from "angular";
import KeyboardService from "./keyboard/KeyboardService";
import LettersGeneratorFactory from "./letters-generator/LettersGeneratorFactory";

angular
    .module("services", [])
    .service("KeyboardService", KeyboardService)
    .factory("lettersGenerator", LettersGeneratorFactory);